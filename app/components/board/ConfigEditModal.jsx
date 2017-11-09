import React, { PropTypes, Component } from 'react';
import { Modal, Button, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';

const img = require('../../assets/images/loading.gif');

export default class ConfigEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      type: '', 
      assignee: '', 
      reporter: '', 
      watcher: '', 
      state: '', 
      priority: '', 
      resolution: '', 
      module: '', 
      resolve_vesion: '', 
      created_at: '', 
      updated_at: '', 
      title: '' };
  }
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    query: PropTypes.object,
    searchShow: PropTypes.bool,
    options: PropTypes.object,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    // handleSubmit: PropTypes.func.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    getOptions: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { getOptions, query={} } = this.props;
    // getOptions();
    this.state.title = query.title || ''; 
    this.state.type = query.type || ''; 
    this.state.assignee = query.assignee || ''; 
    this.state.reporter = query.reporter || ''; 
    this.state.watcher = query.watcher || ''; 
    this.state.state = query.state || ''; 
    this.state.resolution = query.resolution || ''; 
    this.state.priority = query.priority || ''; 
    this.state.module = query.module || ''; 
    this.state.resolve_version = query.resolve_version || ''; 
    this.state.created_at = query.created_at || ''; 
    this.state.updated_at = query.updated_at || ''; 
  }

  componentWillReceiveProps(nextProps) {
    const newQuery = nextProps.query || {};
    this.setState({ 
      title: newQuery.title ? newQuery.title : '',
      type: newQuery.type ? newQuery.type : '',
      assignee: newQuery.assignee ? newQuery.assignee : '',
      reporter: newQuery.reporter ? newQuery.reporter : '',
      watcher: newQuery.watcher ? newQuery.watcher : '',
      state: newQuery.state ? newQuery.state : '',
      resolution: newQuery.resolution ? newQuery.resolution : '',
      priority: newQuery.priority ? newQuery.priority : '',
      module: newQuery.module ? newQuery.module : '',
      resolve_version: newQuery.resolve_version ? newQuery.resolve_version : '',
      created_at: newQuery.created_at ? newQuery.created_at : '',
      updated_at: newQuery.updated_at ? newQuery.updated_at : ''
    });
  }
  async handleSubmit() {
    // const { values, update, close } = this.props;

    // const ecode = await update(values);
    // if (ecode === 0) {
    //   this.setState({ ecode: 0 });
    //   close();
    //   notify.show('更新完成。', 'success', 2000);
    // } else {
    //   this.setState({ ecode: ecode });
    // }
  }

  handleCancel() {
    const { close } = this.props;
    // if (submitting) {
    //   return;
    // }
    // this.setState({ ecode: 0 });
    close();
  }

  clean() {
    this.setState({ type: '', assignee: '', reporter: '', watcher: '', state: '', priority: '', resolution: '', module: '', resolve_version: '', created_at: '', updated_at: '', title: '' });
  }

  search() {
    const { query={}, refresh } = this.props;

    const newQuery = {};
    if (this.state.type) {  newQuery.type = this.state.type; }
    if (this.state.assignee) { newQuery.assignee = this.state.assignee; }
    if (this.state.reporter) { newQuery.reporter = this.state.reporter; }
    if (this.state.watcher) { newQuery.watcher = this.state.watcher; }
    if (this.state.state) { newQuery.state = this.state.state; }
    if (this.state.resolution) { newQuery.resolution = this.state.resolution; }
    if (this.state.priority) { newQuery.priority = this.state.priority; }
    if (this.state.module) { newQuery.module = this.state.module; }
    if (this.state.resolve_version) { newQuery.resolve_version = this.state.resolve_version; }
    if (this.state.created_at) { newQuery.created_at = this.state.created_at; }
    if (this.state.updated_at) { newQuery.updated_at = this.state.updated_at; }
    if (this.state.title) { newQuery.title = this.state.title; }

    if (query.orderBy) { newQuery.orderBy = query.orderBy; }

    refresh(newQuery);
  }

  render() {
    const { indexLoading, invalid, submitting, dirty, searchShow=false, hide, options: { types=[], states=[], priorities=[], resolutions=[], modules=[], versions=[], users=[] } } = this.props;

    const typeOptions = _.map(types, (val) => { return { label: val.name, value: val.id } });
    const userOptions = _.map(users, (val) => { return { label: val.name + '(' + val.email + ')', value: val.id } });
    userOptions.unshift({ value: 'me', label: '当前用户' });
    const stateOptions = _.map(states, (val) => { return { label: val.name, value: val.id } });
    const priorityOptions = _.map(priorities, (val) => { return { label: val.name, value: val.id } });
    const resolutionOptions = _.map(resolutions, (val) => { return { label: val.name, value: val.id } });
    const dateOptions = [{ label: '一周内', value: '1w' }, { label: '两周内', value: '2w' }, { label: '一月内', value: '1m' }, { label: '一月外', value: '-1m' }];
    const moduleOptions = _.map(modules, (val) => { return { label: val.name, value: val.id } });
    const versionOptions = _.map(versions, (val) => { return { label: val.name, value: val.id } });

    return (
      <Modal { ...this.props } onHide={ this.handleCancel.bind(this) } backdrop='static' aria-labelledby='contained-modal-title-sm'>
      <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
        <Modal.Title id='contained-modal-title-la'>{ '编辑看板 - ' }</Modal.Title>
      </Modal.Header>
      <form onSubmit={ this.handleSubmit.bind(this) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
      <Modal.Body style={ { overflow: 'auto', maxHeight: '450px' } }>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>主题/NO</ControlLabel>
            <FormControl
              type='text'
              value={ this.state.title }
              onChange={ (e) => { this.setState({ title: e.target.value }) } }
              placeholder={ '输入关键字或编号' } />
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>类型 </ControlLabel>
            <Select
              simpleValue
              multi
              placeholder='选择类型'
              value={ this.state.type }
              onChange={ (newValue) => { this.setState({ type: newValue }); } }
              options={ typeOptions }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>状态</ControlLabel>
            <Select
              simpleValue
              multi
              placeholder='选择状态'
              value={ this.state.state }
              onChange={ (newValue) => { this.setState({ state: newValue }); } }
              options={ stateOptions }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>经办人</ControlLabel>
            <Select
              simpleValue
              multi
              placeholder='选择经办人'
              value={ this.state.assignee } 
              onChange={ (newValue) => { this.setState({ assignee: newValue }) } }
              options={ userOptions }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>优先级</ControlLabel>
            <Select
              simpleValue
              multi
              placeholder='选择优先级'
              value={ this.state.priority }
              onChange={ (newValue) => { this.setState({ priority: newValue }); } }
              options={ priorityOptions }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>解决结果</ControlLabel>
            <Select
              simpleValue
              multi
              placeholder='选择解决结果'
              value={ this.state.resolution }
              onChange={ (newValue) => { this.setState({ resolution: newValue }); } }
              options={ resolutionOptions }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>报告人</ControlLabel>
            <Select
              simpleValue
              multi
              placeholder='选择报告人'
              value={ this.state.reporter }
              onChange={ (newValue) => { this.setState({ reporter: newValue }); } }
              options={ userOptions }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>模块</ControlLabel>
            <Select
              simpleValue
              multi
              placeholder='选择模块'
              value={ this.state.module }
              onChange={ (newValue) => { this.setState({ module: newValue }); } }
              options={ moduleOptions }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>解决版本 </ControlLabel>
            <Select
              simpleValue
              multi
              placeholder='选择解决版本'
              value={ this.state.resolve_version }
              onChange={ (newValue) => { this.setState({ resolve_version: newValue }); } }
              options={ versionOptions }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>关注者</ControlLabel>
            <Select
              simpleValue
              multi
              placeholder='选择关注者'
              value={ this.state.watcher }
              onChange={ (newValue) => { this.setState({ watcher: newValue }); } }
              options={ [ { value: 'me', label: '当前用户' } ] }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>创建时间</ControlLabel>
            <Select
              simpleValue
              placeholder='选择时间段'
              value={ this.state.created_at }
              onChange={ (newValue) => { this.setState({ created_at: newValue }); } }
              options={ dateOptions }/>
          </FormGroup>
          <FormGroup controlId='formControlsLabel'>
            <ControlLabel><span className='txt-impt'>*</span>更新时间</ControlLabel>
            <Select
              simpleValue
              placeholder='选择时间段'
              value={ this.state.updated_at }
              onChange={ (newValue) => { this.setState({ updated_at: newValue }); } }
              options={ dateOptions }/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ !dirty || submitting || invalid } type='submit'>确定</Button>
          <Button 
            style={ { marginTop: '0px', marginRight: '0px' } } 
            className='create-btn' 
            onClick={ this.clean.bind(this) }>
            清空 
            <i className='fa fa-undo'></i>
            </Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel.bind(this) }>取消</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
