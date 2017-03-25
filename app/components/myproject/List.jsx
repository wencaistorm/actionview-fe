import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FormGroup, FormControl, Button, Label, DropdownButton, MenuItem } from 'react-bootstrap';
import Select from 'react-select';

const EditModal = require('./EditModal');
const CloseNotify = require('./CloseNotify');
const img = require('../../assets/images/loading.gif');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      createModalShow: false, 
      editModalShow: false, 
      closeNotifyShow: false, 
      operateShow: false, 
      hoverRowId: '', 
      limit: 3, 
      name: '', 
      status: '1' };

    this.editModalClose = this.editModalClose.bind(this);
    this.closeNotifyClose = this.closeNotifyClose.bind(this);
  }

  static propTypes = {
    collection: PropTypes.array.isRequired,
    selectedItem: PropTypes.object.isRequired,
    itemLoading: PropTypes.bool.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    index: PropTypes.func.isRequired,
    more: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { index } = this.props;
    index();
  }

  editModalClose() {
    this.setState({ editModalShow: false });
  }

  closeNotifyClose() {
    this.setState({ closeNotifyShow: false });
  }

  show(id) {
    this.setState({ editModalShow: true });
    const { show } = this.props;
    show(id);
  }

  closeNotify(id) {
    this.setState({ closeNotifyShow: true });
    const { show } = this.props;
    show(id);
  }

  operateSelect(eventKey) {
    const { hoverRowId } = this.state;

    if (eventKey === '1') {
      this.show(hoverRowId);
    } else if (eventKey === '2') {
      this.closeNotify(hoverRowId);
    }
  }

  more() {
    const { index, collection } = this.props;
    index({ status: this.state.status, name: this.state.name, offset_id: collection[collection.length - 1].id, limit: this.state.limit });
  }

  handleSelect(selectedKey) {
    this.setState({ status: selectedKey });

    const { index } = this.props;
    index({ status: selectedKey, name: this.state.name, limit: this.state.limit });
  }

  onRowMouseOver(rowData) {
    this.setState({ operateShow: true, hoverRowId: rowData.id });
  }

  onMouseLeave() {
    this.setState({ operateShow: false, hoverRowId: '' });
  }

  render() {
    const { collection, selectedItem, indexLoading, itemLoading, stop, edit } = this.props;
    const { hoverRowId, operateShow } = this.state;

    const node = ( <span><i className='fa fa-cog'></i></span> );

    const states = [];
    const stateNum = collection.length;
    for (let i = 0; i < stateNum; i++) {
      states.push({
        id: collection[i].id,
        name: ( 
          <div> 
            <span className='table-td-title'>{ collection[i].name }</span>
            { collection[i].description && <span className='table-td-desc'>{ collection[i].description }</span> }
          </div> ),
        key: collection[i].key,
        principal: collection[i].principal && collection[i].principal.name,
        operation: (
          <div>
          { operateShow && hoverRowId === collection[i].id && !itemLoading &&
            <DropdownButton pullRight bsStyle='link' style={ { textDecoration: 'blink' ,color: '#000' } } key={ i } title={ node } id={ `dropdown-basic-${i}` } onSelect={ this.operateSelect.bind(this) }>
              <MenuItem eventKey='1'>编辑</MenuItem>
              <MenuItem eventKey='2'>关闭</MenuItem>
            </DropdownButton> }
            <img src={ img } className={ (itemLoading && selectedItem.id === collection[i].id) ? 'loading' : 'hide' }/>
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
      <div className='doc-container'>
        <div>
          <div style={ { marginTop: '5px', height: '40px' } }>
            <FormGroup>
              <span style={ { float: 'left', width: '30%' } }>
                <FormControl
                  type='text'
                  value={ this.state.name }
                  onChange={ (e) => { this.setState({ name: e.target.value }) } }
                  placeholder={ '项目名称查询...' } />
              </span>
              <span style={ { float: 'left', width: '100px', marginLeft: '10px' } }>
                <Select
                  simpleValue
                  clearable={ false }
                  placeholder='选择项目状态'
                  value={ this.state.status }
                  onChange={ (newValue) => { this.setState({ status: newValue }); } }
                  options={ [{ value: '1', label: '活动中' }, { value: '2', label: '已关闭' }] }/>
              </span>
              <span style={ { float: 'left', width: '20%', marginLeft: '20px' } }>
                <Button bsStyle='success' onClick={ () => { this.setState({ createModalShow: true }); } } disabled={ indexLoading }><i className='fa fa-plus'></i>&nbsp;新建项目</Button>
              </span>
            </FormGroup>
          </div>
        </div>
        <div>
          <BootstrapTable data={ states } bordered={ false } hover options={ opts } trClassName='tr-middle'>
            <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>名称</TableHeaderColumn>
            <TableHeaderColumn dataField='key' width='170'>键值</TableHeaderColumn>
            <TableHeaderColumn dataField='principal' width='320'>责任人</TableHeaderColumn>
            <TableHeaderColumn width='60' dataField='operation'/>
          </BootstrapTable>
          { this.state.editModalShow && <EditModal show close={ this.editModalClose } edit={ edit } data={ selectedItem } collection={ collection }/> }
          { this.state.closeNotifyShow && <CloseNotify show close={ this.closeNotifyClose } data={ selectedItem } stop={ stop }/> }
        </div>
      </div>
    );
  }
}