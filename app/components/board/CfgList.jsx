import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

const EditModal = require('./EditModal');
const DelNotify = require('./DelNotify');

var moment = require('moment');
const img = require('../../assets/images/loading.gif');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editModalShow: false, 
      delNotifyShow: false, 
      configModalShow: false, 
      operateShow: false, 
      hoverRowId: '' };
    this.editModalClose = this.editModalClose.bind(this);
    this.delNotifyClose = this.delNotifyClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    selectedItem: PropTypes.object.isRequired,
    itemLoading: PropTypes.bool.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    index: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    goConfig: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { index } = this.props;
    console.log('index!')
    index();
  }

  editModalClose() {
    this.setState({ editModalShow: false });
  }

  delNotifyClose() {
    this.setState({ delNotifyShow: false });
  }

  edit(id) {
    // this.setState({ editModalShow: true });
    const { select } = this.props;
    select(id);
  }
  configModalClose() {
    this.setState({ configModalShow: false });
  }

  delNotify(id) {
    this.setState({ delNotifyShow: true });
    const { select } = this.props;
    select(id);
  }

  operateSelect(eventKey) {
    const { hoverRowId } = this.state;
    const { goConfig } = this.props;
    console.log(hoverRowId)
    console.log(hoverRowId)
    if (eventKey === '1') {
      this.edit(hoverRowId);
    } else if (eventKey === '2') {
      this.delNotify(hoverRowId);
    } else if (eventKey === '3') {
      console.log('goConfig: ', this.props)
      goConfig(hoverRowId)
    }
  }

  onRowMouseOver(rowData) {
    if (rowData.id !== this.state.hoverRowId) {
      this.setState({ operateShow: true, hoverRowId: rowData.id });
    }
  }

  onMouseLeave() {
    this.setState({ operateShow: false, hoverRowId: '' });
  }

  render() {
    const { 
      i18n, 
      options={}, 
      collection, 
      selectedItem, 
      indexLoading, 
      itemLoading, 
      del, 
      update } = this.props;
    console.log(this.props)
    console.log('this.state',this.state)
    const { hoverRowId, operateShow } = this.state;
    // console.log('selectedItem', selectedItem);
    const node = ( <span><i className='fa fa-cog'></i></span> );

    const versions = [];
    const versionNum = collection.length;
    for (let i = 0; i < versionNum; i++) {
      versions.push({
        id: collection[i].id,
        name: ( 
          <div>
            <span className='table-td-title'>{ collection[i].name }</span>
            { collection[i].description && <span className='table-td-desc'>{ collection[i].description }</span> }
          </div>
        ),
        type: ( 
          <div>
            <span>{ collection[i].type }</span>
          </div>
        ),
        operation: (
          <div>
            { operateShow && hoverRowId === collection[i].id && !itemLoading &&
            <DropdownButton 
              pullRight 
              bsStyle='link' 
              style={ { textDecoration: 'blink' ,color: '#000' } } 
              key={ i } 
              title={ node } 
              id={ `dropdown-basic-${i}` } 
              onSelect={ this.operateSelect.bind(this) }>
              <MenuItem eventKey='1'>编辑</MenuItem>
              { !collection[i].is_used && <MenuItem eventKey='2'>删除</MenuItem> }
              <MenuItem eventKey='3'>重置</MenuItem>
            </DropdownButton> }
            <img src={ img } className={ (itemLoading && selectedItem.id === collection[i].id) ? 'loading' : 'hide' }/>
          </div>
        )
      });
    }
    // console.log(versions)
    const opts = {};
    if (indexLoading) {
      opts.noDataText = ( <div><img src={ img } className='loading'/></div> );
    } else {
      opts.noDataText = '暂无数据显示。';
    }

    opts.onRowMouseOver = this.onRowMouseOver.bind(this);
    // opts.onMouseLeave = this.onMouseLeave.bind(this);

    return (
      <div style={ { marginBottom: '30px' } }>
        <BootstrapTable data={ versions } bordered={ false } hover options={ opts } trClassName='tr-middle'>
          <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>名称</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>类型</TableHeaderColumn>
          <TableHeaderColumn width='60' dataField='operation'/>
        </BootstrapTable>
        { this.state.editModalShow && 
          <EditModal 
            show 
            close={ this.editModalClose } 
            update={ update } 
            data={ selectedItem } 
            collection={ collection } 
            i18n={ i18n }/> }
        { this.state.delNotifyShow && 
          <DelNotify 
            show 
            close={ this.delNotifyClose } 
            data={ selectedItem } 
            del={ del } 
            i18n={ i18n }/> }
        { this.state.configModalShow && 
          <EditModal 
            show 
            close={ this.configModalClose.bind(this) } 
            update={ update } 
            data={ selectedItem } 
            collection={ collection } 
            i18n={ i18n }/> }
      </div>
    );
  }
}
