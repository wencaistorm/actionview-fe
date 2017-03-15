import React, { PropTypes, Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, DropdownButton, MenuItem, Label, Nav, NavItem } from 'react-bootstrap';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const $ = require('$');
const moment = require('moment');
const DelNotify = require('./DelNotify');
const DetailBar = require('./DetailBar');
const img = require('../../assets/images/loading.gif');
const PaginationList = require('./PaginationList');
const AddWorklogModal = require('./worklog/AddWorklogModal');
const CreateModal = require('./CreateModal');
const ConvertTypeModal = require('./ConvertTypeModal');
const MoveModal = require('./MoveModal');
const AssignModal = require('./AssignModal');
const ShareLinkModal = require('./ShareLinkModal');
const ResetStateModal = require('./ResetStateModal');
const CopyModal = require('./CopyModal');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      delNotifyShow: false, 
      operateShow: false, 
      barShow: false,
      addWorklogShow: false,
      editModalShow: false,
      createSubtaskModalShow: false,
      convertTypeModalShow: false,
      moveModalShow: false,
      assignModalShow: false,
      shareModalShow: false,
      resetModalShow: false,
      copyModalShow: false,
      selectedItem: {},
      hoverRowId: ''
    };
    this.delNotifyClose = this.delNotifyClose.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
  }

  static propTypes = {
    collection: PropTypes.array.isRequired,
    wfCollection: PropTypes.array.isRequired,
    wfLoading: PropTypes.bool.isRequired,
    viewWorkflow: PropTypes.func.isRequired,
    indexComments: PropTypes.func.isRequired,
    addComments: PropTypes.func.isRequired,
    editComments: PropTypes.func.isRequired,
    delComments: PropTypes.func.isRequired,
    commentsCollection: PropTypes.array.isRequired,
    commentsIndexLoading: PropTypes.bool.isRequired,
    commentsLoading: PropTypes.bool.isRequired,
    commentsItemLoading: PropTypes.bool.isRequired,
    commentsLoaded: PropTypes.bool.isRequired,
    indexWorklog: PropTypes.func.isRequired,
    addWorklog: PropTypes.func.isRequired,
    editWorklog: PropTypes.func.isRequired,
    delWorklog: PropTypes.func.isRequired,
    worklogOptions: PropTypes.object.isRequired,
    worklogCollection: PropTypes.array.isRequired,
    worklogIndexLoading: PropTypes.bool.isRequired,
    worklogLoading: PropTypes.bool.isRequired,
    worklogLoaded: PropTypes.bool.isRequired,
    indexHistory: PropTypes.func.isRequired,
    historyCollection: PropTypes.array.isRequired,
    historyIndexLoading: PropTypes.bool.isRequired,
    historyLoaded: PropTypes.bool.isRequired,
    itemData: PropTypes.object.isRequired,
    project: PropTypes.object,
    options: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    itemLoading: PropTypes.bool.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    index: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    query: PropTypes.object,
    show: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    setAssignee: PropTypes.func.isRequired,
    fileLoading: PropTypes.bool.isRequired,
    delFile: PropTypes.func.isRequired,
    addFile: PropTypes.func.isRequired,
    record: PropTypes.func.isRequired,
    forward: PropTypes.func.isRequired,
    cleanRecord: PropTypes.func.isRequired,
    visitedIndex: PropTypes.number.isRequired,
    visitedCollection: PropTypes.array.isRequired,
    createLink: PropTypes.func.isRequired,
    delLink: PropTypes.func.isRequired,
    linkLoading: PropTypes.bool.isRequired,
    doAction: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired
  }

  async componentWillMount() {
    const { index, query={} } = this.props;
    let ecode = await index(query);
    if (ecode === 0 && query.no) {
      const { collection, show, record } = this.props;
      if (collection.length > 0) {
        this.state.barShow = true;
        ecode = await show(collection[0].id); 
        if (ecode === 0) {
          record();
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const newQuery = nextProps.query || {};
    const { index, query } = this.props;
    if (JSON.stringify(newQuery) !== JSON.stringify(query)) {
      index(newQuery);
    }
  }

  delNotifyClose() {
    this.setState({ delNotifyShow: false });
  }

  async operateSelect(eventKey) {
    const { show, watch, collection } = this.props;

    const { hoverRowId } = this.state;
    const selectedItem = _.find(collection, { id: hoverRowId }) || {}; 
    this.setState({ selectedItem });

    let ecode = 0;
    if (eventKey === 'del') {
      this.setState({ delNotifyShow : true });
    } else if (eventKey === 'assign') {
      this.setState({ assignModalShow : true });
    } else if (eventKey === 'worklog') {
      this.setState({ addWorklogShow : true });
    } else if (eventKey === 'edit') {
      this.setState({ editModalShow : true });
    } else if (eventKey === 'createSubtask') {
      this.setState({ createSubtaskModalShow : true });
    } else if (eventKey === 'convert') {
      this.setState({ convertTypeModalShow : true });
    } else if (eventKey === 'move') {
      this.setState({ moveModalShow : true });
    } else if (eventKey === 'share') {
      this.setState({ shareModalShow : true });
    } else if (eventKey === 'reset') {
      this.setState({ resetModalShow : true });
    } else if (eventKey === 'copy') {
      this.setState({ copyModalShow : true });
    } else if (eventKey === 'watch') {
      ecode = await watch(selectedItem.id, !selectedItem.watching);
      if (ecode === 0) {
        if (selectedItem.watching) {
          notify.show('关注成功。', 'success', 2000);
        } else {
          notify.show('已取消关注。', 'success', 2000);
        }
      } else {
        if (selectedItem.watching) {
          notify.show('关注失败。', 'error', 2000);
        } else {
          notify.show('取消失败。', 'error', 2000);
        }
      }
    } else {
      // todo err notify
    }
  }

  onRowMouseOver(rowData) {
    this.setState({ operateShow: true, hoverRowId: rowData.id });
  }

  onMouseLeave() {
    this.setState({ operateShow: false, hoverRowId: '' });
  }

  orderBy(field) {
    const { query={}, refresh } = this.props;
    if (_.isEmpty(query) || !query.orderBy) {
      refresh(_.assign(query, { orderBy: field + ' asc', page: 1 }));
      return;
    }

    const newOrders = [];
    const orders = query.orderBy.toLowerCase().split(',');
    const ind = _.findIndex(orders, (val) => { return _.startsWith(_.trim(val), field) });
    if (ind === -1) {
      newOrders.push(field + ' asc');
    } else {
      newOrders.push(field + (_.endsWith(orders[ind], 'desc') ? ' asc' : ' desc'));
    }
    _.map(orders, (val, i) => {
      if (ind === i) {
        return;
      }
      newOrders.push(val);
    });

    refresh(_.assign(query, { orderBy: newOrders.join(','), page: 1 })); 
  }

  async show(e) {
    e.preventDefault();

    this.setState({ barShow: true }); 
    const { show, record } = this.props;
    const ecode = await show(this.state.hoverRowId);  //fix me
    if (ecode == 0) {
      record();
    }
  }

  componentDidUpdate() {
    const { itemData={} } = this.props;

    if (this.state.barShow) {
      $('.react-bs-container-body table tr').each(function(i) {
        if (itemData.id === $(this).find('td:first').text()) {
          $(this).css('background-color', '#eee');
        } else {
          $(this).css('background-color', '');
        }
      });
    }
  }

  closeDetail() {
    this.setState({ barShow: false });
    const { cleanRecord } = this.props;
    $('.react-bs-container-body table tr').each(function(i) {
      $(this).css('background-color', '');
    });
    cleanRecord();
  }

  render() {
    const { 
      collection, 
      itemData={}, 
      loading, 
      indexLoading, 
      itemLoading, 
      options={}, 
      show, 
      record, 
      forward,
      visitedIndex,
      visitedCollection, 
      del, 
      edit, 
      create, 
      setAssignee, 
      query, 
      refresh, 
      project, 
      delFile, 
      addFile, 
      fileLoading, 
      wfCollection, 
      wfLoading, 
      viewWorkflow, 
      indexComments, 
      commentsCollection, 
      commentsIndexLoading, 
      commentsLoading, 
      commentsLoaded, 
      addComments, 
      editComments, 
      delComments, 
      commentsItemLoading, 
      indexWorklog, 
      worklogCollection, 
      worklogIndexLoading, 
      worklogLoading, 
      worklogLoaded, 
      addWorklog, 
      editWorklog, 
      delWorklog, 
      worklogOptions, 
      indexHistory, 
      historyCollection, 
      historyIndexLoading, 
      historyLoaded, 
      createLink, 
      delLink, 
      linkLoading, 
      watch, 
      copy,
      doAction } = this.props;

    const { operateShow, hoverRowId, selectedItem } = this.state;
    const node = ( <span><i className='fa fa-cog'></i></span> );

    const mainOrder = {};
    if (!_.isEmpty(query) && query.orderBy) {
      let strFirstOrder = _.trim(query.orderBy.toLowerCase()).split(',').shift();
      let tmp = strFirstOrder.split(' ');
      mainOrder.field = tmp[0];
      mainOrder.order = _.trim(tmp[1] || 'asc');
    }

    const subtaskTypeOptions = [];
    _.map(options.types, (val) => {
      if (val.type == 'subtask' && !val.disabled) {
        subtaskTypeOptions.push(val);
      }
    });

    const issues = [];
    const issueNum = collection.length;
    for (let i = 0; i < issueNum; i++) {

      const priorityInd = collection[i].priority ? _.findIndex(options.priorities, { id: collection[i].priority }) : -1;
      const priorityStyle = { marginLeft: '14px' };
      if (priorityInd !== -1) {
        _.extend(priorityStyle, { backgroundColor: options.priorities[priorityInd].color });
      }

      issues.push({
        id: collection[i].id,
        type: (
          <span className='type-abb' title={ _.findIndex(options.types, { id: collection[i].type }) !== -1 ? _.find(options.types, { id: collection[i].type }).name : '' }>
            { _.findIndex(options.types, { id: collection[i].type }) !== -1 ? _.find(options.types, { id: collection[i].type }).abb : '-' }
          </span>),
        no: ( <a href='#' onClick={ this.show.bind(this) }>{ collection[i].no }</a> ),
        name: (
          <div>
            <a href='#' onClick={ this.show.bind(this) } style={ { whiteSpace: 'pre-wrap' } }>
              { collection[i].title ? collection[i].title : '-' }
            </a>
            { collection[i].reporter && <span className='table-td-issue-desc'>{ collection[i].reporter.name + '  |  ' + moment.unix(collection[i].created_at).format('YY/MM/DD HH:mm') }</span> }
            
          </div>
        ), 
        assignee: !_.isEmpty(collection[i].assignee) ? collection[i].assignee.name : '-',
        priority: priorityInd !== -1 ? <div className='circle' style={ priorityStyle } title={ options.priorities[priorityInd].name }/> : <div style={ priorityStyle }>-</div>,
        state: _.findIndex(options.states, { id: collection[i].state }) !== -1 ? _.find(options.states, { id: collection[i].state }).name : '-', 
        resolution: _.findIndex(options.resolutions, { id: collection[i].resolution }) !== -1 ? _.find(options.resolutions, { id: collection[i].resolution }).name : '-', 
        operation: (
          <div>
            { operateShow && hoverRowId === collection[i].id && !itemLoading &&
              <DropdownButton pullRight bsStyle='link' style={ { textDecoration: 'blink' ,color: '#000' } } title={ node } key={ i } id={ `dropdown-basic-${i}` } onSelect={ this.operateSelect.bind(this) }>
                <MenuItem eventKey='edit'>编辑</MenuItem>
                <MenuItem eventKey='assign'>分配</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey='share'>分享链接</MenuItem>
                <MenuItem eventKey='watch'>{ collection[i].watching ? '取消关注' : '关注' }</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey='worklog'>添加工作日志</MenuItem>
                <MenuItem divider/>
                { !collection[i].parent_id && <MenuItem disabled={ subtaskTypeOptions.length <= 0 } eventKey='createSubtask'>创建子任务</MenuItem> }
                { !collection[i].parent_id && <MenuItem disabled={ subtaskTypeOptions.length <= 0 } eventKey='createSubtask'>转换为子任务</MenuItem> }
                { collection[i].parent_id && <MenuItem eventKey='convert'>转换为标准问题</MenuItem> }
                <MenuItem divider/>
                { collection[i].parent_id && <MenuItem eventKey='move'>移动</MenuItem> }
                <MenuItem eventKey='copy'>复制</MenuItem>
                <MenuItem eventKey='reset'>重置状态</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey='del'>删除</MenuItem>
              </DropdownButton>
            }
          </div>
        )
      });
    }

    const opts = {};
    if (indexLoading) {
      opts.noDataText = ( <div><img src={ img } className='loading'/></div> );
    } else {
      opts.noDataText = '暂无数据显示。'; 
    } 

    opts.onRowMouseOver = this.onRowMouseOver.bind(this);
    opts.onMouseLeave = this.onMouseLeave.bind(this);

    return (
      <div>
        <BootstrapTable data={ issues } bordered={ false } hover options={ opts } trClassName='tr-top'>
          <TableHeaderColumn dataField='id' hidden isKey>ID</TableHeaderColumn>
          <TableHeaderColumn width='50' dataField='type'><span className='table-header' onClick={ this.orderBy.bind(this, 'type') }>类型{ mainOrder.field === 'type' && (mainOrder.order === 'desc' ? <i className='fa fa-arrow-down'></i> : <i className='fa fa-arrow-up'></i>) }</span></TableHeaderColumn>
          <TableHeaderColumn dataField='no' width='50'>NO</TableHeaderColumn>
          <TableHeaderColumn dataField='name'><span className='table-header' onClick={ this.orderBy.bind(this, 'title') }>主题 { mainOrder.field === 'title' && (mainOrder.order === 'desc' ? <i className='fa fa-arrow-down'></i> : <i className='fa fa-arrow-up'></i>) }</span></TableHeaderColumn>
          <TableHeaderColumn width='100' dataField='assignee'><span className='table-header' onClick={ this.orderBy.bind(this, 'assignee') }>经办人 { mainOrder.field === 'assignee' && (mainOrder.order === 'desc' ? <i className='fa fa-arrow-down'></i> : <i className='fa fa-arrow-up'></i>) }</span></TableHeaderColumn>
          <TableHeaderColumn width='70' dataField='priority'><span className='table-header' onClick={ this.orderBy.bind(this, 'priority') }>优先级 { mainOrder.field === 'priority' && (mainOrder.order === 'desc' ? <i className='fa fa-arrow-down'></i> : <i className='fa fa-arrow-up'></i>) }</span></TableHeaderColumn>
          <TableHeaderColumn width='100' dataField='state'><span className='table-header' onClick={ this.orderBy.bind(this, 'state') }>状态{ mainOrder.field === 'state' && (mainOrder.order === 'desc' ? <i className='fa fa-arrow-down'></i> : <i className='fa fa-arrow-up'></i>) }</span></TableHeaderColumn>
          <TableHeaderColumn width='100' dataField='resolution'><span className='table-header' onClick={ this.orderBy.bind(this, 'resolution') }>解决结果{ mainOrder.field === 'resolution' && (mainOrder.order === 'desc' ? <i className='fa fa-arrow-down'></i> : <i className='fa fa-arrow-up'></i>) }</span></TableHeaderColumn>
          <TableHeaderColumn width='60' dataField='operation'/>
        </BootstrapTable>
        { this.state.barShow &&
          <DetailBar 
            create={ create } 
            edit={ edit } 
            del={ del } 
            setAssignee={ setAssignee } 
            close={ this.closeDetail } 
            options={ options } 
            data={ itemData } 
            record={ record }
            forward={ forward }
            visitedIndex={ visitedIndex }
            visitedCollection={ visitedCollection }
            issueCollection={ collection } 
            show = { show }
            itemLoading={ itemLoading } 
            loading={ loading } 
            fileLoading={ fileLoading } 
            project={ project } 
            delFile={ delFile } 
            addFile={ addFile } 
            wfCollection={ wfCollection } 
            wfLoading={ wfLoading } 
            viewWorkflow={ viewWorkflow } 
            indexComments={ indexComments } 
            commentsCollection={ commentsCollection } 
            commentsIndexLoading={ commentsIndexLoading } 
            commentsLoading={ commentsLoading } 
            commentsItemLoading={ commentsItemLoading } 
            commentsLoaded={ commentsLoaded } 
            addComments={ addComments }
            editComments={ editComments }
            delComments={ delComments }
            indexWorklog={ indexWorklog }
            worklogOptions={ worklogOptions }
            worklogCollection={ worklogCollection }
            worklogIndexLoading={ worklogIndexLoading }
            worklogLoading={ worklogLoading }
            worklogLoaded={ worklogLoaded }
            addWorklog={ addWorklog }
            editWorklog={ editWorklog }
            delWorklog={ delWorklog }
            indexHistory={ indexHistory }
            historyCollection={ historyCollection }
            historyIndexLoading={ historyIndexLoading }
            historyLoaded={ historyLoaded } 
            linkLoading={ linkLoading }
            createLink={ createLink }
            delLink={ delLink }
            watch={ watch }
            copy={ copy }
            doAction={ doAction }/> }
        { options.total && options.total > 0 ? 
          <PaginationList 
            total={ options.total || 0 } 
            curPage={ query.page || 1 } 
            sizePerPage={ options.sizePerPage || 5 } 
            paginationSize={ 5 } 
            query={ query } refresh={ refresh }/> 
          : '' }
        { this.state.delNotifyShow && 
          <DelNotify show 
            close={ this.delNotifyClose } 
            data={ selectedItem } 
            loading = { itemLoading }
            del={ del }/> }
        { this.state.addWorklogShow &&
          <AddWorklogModal show
            issue={ selectedItem }
            close={ () => { this.setState({ addWorklogShow: false }) } }
            loading = { worklogLoading }
            add={ addWorklog }/> }
        { this.state.editModalShow && 
          <CreateModal show 
            close={ () => { this.setState({ editModalShow: false }); } } 
            options={ options } 
            loading={ loading } 
            project={ project } 
            edit={ edit }
            isSubtask={ selectedItem.parent_id && true }
            data={ selectedItem }/> }
        { this.state.createSubtaskModalShow && 
          <CreateModal show 
            close={ () => { this.setState({ createSubtaskModalShow: false }); } } 
            options={ options } 
            create={ create } 
            loading={ loading } 
            project={ project } 
            parent_id={ selectedItem.id } 
            isSubtask={ true }/> }
        { this.state.convertTypeModalShow &&
          <ConvertTypeModal show
            close={ () => { this.setState({ convertTypeModalShow: false }); } }
            options={ options }
            edit={ edit }
            loading={ loading }
            issue={ selectedItem }/> }
        { this.state.moveModalShow &&
          <MoveModal show
            close={ () => { this.setState({ moveModalShow: false }); } }
            options={ options }
            project={ project } 
            edit={ edit }
            loading={ loading }
            issue={ selectedItem }/> }
        { this.state.assignModalShow &&
          <AssignModal show
            close={ () => { this.setState({ assignModalShow: false }); } }
            options={ options }
            edit={ edit }
            loading={ loading }
            issue={ selectedItem }/> }
        { this.state.shareModalShow &&
          <ShareLinkModal show
            close={ () => { this.setState({ shareModalShow: false }); } }
            project={ project }
            issue={ selectedItem }/> }
        { this.state.resetModalShow &&
          <ResetStateModal show
            close={ () => { this.setState({ resetModalShow: false }); } }
            resetState={ edit }
            loading={ loading }
            issue={ selectedItem }/> }
        { this.state.copyModalShow &&
          <CopyModal show
            close={ () => { this.setState({ copyModalShow: false }); } }
            loading={ loading }
            copy={ copy }
            data={ selectedItem }/> }
      </div>
    );
  }
}
