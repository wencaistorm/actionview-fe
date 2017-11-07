import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Label, DropdownButton, MenuItem } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';

const ConfigEditModal = require('./ConfigEditModal');
const EditModal = require('./EditModal');
const DelNotify = require('./DelNotify');

var moment = require('moment');
const img = require('../../assets/images/loading.gif');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      options: {},
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
    configOptions: PropTypes.object.isRequired,
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
    index(() => { 
      _.each(this.props.collection, ( item ) => {
        this.state.options[ item.id ] = item.option;
      })
      this.setState({ options: this.state.options });
    });
  }

  editModalClose() {
    this.setState({ editModalShow: false });
  }

  delNotifyClose() {
    this.setState({ delNotifyShow: false });
  }

  edit(id) {
    this.setState({ editModalShow: true });
    const { select } = this.props;
    console.log(id, this.props)
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
    if (eventKey === '1') {
      this.edit(hoverRowId);
    } else if (eventKey === '2') {
      // goConfig(hoverRowId)
    }
  }

  handleSelectChange(id, value) {
    // this.state.options[id] = value;
    // this.setState({ options: this.state.options[id] });
  }

  setOptions(id) {

  }

  cancelSetOptions(id) {

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
      collection, 
      selectedItem, 
      indexLoading, 
      itemLoading, 
      del, 
      update } = this.props;
    const { hoverRowId, operateShow } = this.state;
    const node = ( <span><i className='fa fa-cog'></i></span> );

    const configs = [];
    const configNum = collection.length;
    const options = [ { label: 'xx', value: 'xx' }, { label: 'yy', value: 'yy' } ];
    for (let i = 0; i < configNum; i++) {
      configs.push({
        id: collection[i].id,
        name: ( 
          <div>
            <span className='table-td-title'>{ collection[i].name }</span>
            { collection[i].description && <span className='table-td-desc'>{ collection[i].description }</span> }
          </div>
        ),
        option: (
          <div>
            { true ?
            <div className='editable-list-field'>
              <div style={ { display: 'table', width: '100%' } }>
              { false ?
                <span>
                { _.map(options, function(v) { 
                  return (
                    <div style={ { display: 'inline-block', float: 'left', margin: '3px 3px 6px 3px' } }>
                      <Label style={ { color: '#007eff', border: '1px solid #c2e0ff', backgroundColor: '#ebf5ff', fontWeight: 'normal' } } key={ v.id }>{ v.name }</Label>
                   </div> ) }) }
                </span>
                :
                <span>
                  <div style={ { display: 'inline-block', margin: '3px 3px 6px 3px' } }>-</div>
                </span> }
                <span className='edit-icon-zone edit-icon' onClick={ this.setOptions.bind(this, collection[i].id) }>
                  <i className='fa fa-pencil'></i>
                </span>
              </div>
            </div> 
            :
            <div>
              <Select
                simpleValue
                multi
                placeholder='请选择'
                value={ this.state.options[ collection[i].id ] || '' }
                onChange={ this.handleSelectChange.bind(this, collection[i].id) }
                options={ options }/>
              <div style={ { float: 'right' } }>
                <Button className='edit-ok-button' onClick={ this.setOptions.bind(this, collection[i].id) }><i className='fa fa-check'></i></Button>
                <Button className='edit-ok-button' onClick={ this.cancelSetOptions.bind(this, collection[i].id) }><i className='fa fa-close'></i></Button>
              </div>
            </div>
            }
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
              <MenuItem eventKey='2'>重置</MenuItem>
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

    return (
      <div style={ { marginBottom: '30px' } }>
        <BootstrapTable data={ configs } bordered={ false } hover options={ opts } trClassName='tr-middle'>
          <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>名称</TableHeaderColumn>
          <TableHeaderColumn dataField='option'>选项</TableHeaderColumn>
          <TableHeaderColumn width='60' dataField='operation'/>
        </BootstrapTable>
        { this.state.editModalShow && 
          <ConfigEditModal 
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
          <ConfigEditModal 
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
