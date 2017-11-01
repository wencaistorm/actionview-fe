import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import _ from 'lodash';
import DateTime from 'react-datetime';
import { notify } from 'react-notify-toast';
import Select from 'react-select';

var moment = require('moment');
const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.name) {
    errors.name = '必填';
  } else if (props.data.name !== values.name && _.findIndex(props.collection || [], { name: values.name }) !== -1) {
    errors.name = '该名称已存在';
  }

  if (values.start_time) {
    if (!moment(values.start_time).isValid()) {
      errors.start_time = '格式错误';
    }
  }

  if (values.end_time) {
    if (!moment(values.end_time).isValid()) {
      errors.end_time = '格式错误';
    }
  }

  if (values.start_time && values.end_time) {
    if (values.start_time > values.end_time)
    {
      errors.start_time = '开始时间要早于结束时间';
    }
  }

  return errors;
};

@reduxForm({
  form: 'version',
  fields: ['id', 'name', 'type', 'description'],
  validate
})
export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    initializeForm: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { initializeForm, data } = this.props;
    initializeForm({ ...data });
  }

  async handleSubmit() {
    const { values, update, close } = this.props;

    const ecode = await update(values);
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('更新完成。', 'success', 2000);
    } else {
      this.setState({ ecode: ecode });
    }
  }

  handleCancel() {
    const { close, submitting } = this.props;
    if (submitting) {
      return;
    }
    this.setState({ ecode: 0 });
    close();
  }

  render() {
    const { 
      i18n: { errMsg }, 
      fields: { id, name, type, description }, 
      handleSubmit, 
      invalid, 
      dirty, 
      submitting, 
      data } = this.props;
    console.log('------------');
    console.log(this.props);
    console.log('------------');
    const screenOptions = [ { label: '看板', value: 'kanban' }, { label: 'scrum', value: 'scrum', disabled: true } ]
    const typeval = 'kanban'
    return (
      <Modal { ...this.props } onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>{ '编辑看板 - ' + data.name }</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ name.touched && name.error ? 'error' : '' }>
            <ControlLabel><span className='txt-impt'>*</span>名称</ControlLabel>
            <FormControl type='hidden' { ...id }/>
            <FormControl disabled={ submitting } type='text' { ...name } placeholder='看板名'/>
          </FormGroup>
          <FormGroup controlId='formControlsSelect'>
            <ControlLabel><span className='txt-impt'>*</span>类型</ControlLabel>
            <Select 
              options={ screenOptions }
              value={ typeval }
              clearable={ false } 
              simpleValue 
              /* disabled={ submitting } */
              onChange={ newValue => { type.onChange(newValue) } }
              placeholder='请选择一个类型'/>
          </FormGroup>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>描述</ControlLabel>
            <FormControl disabled={ submitting } type='text' { ...description } placeholder='描述'/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ !dirty || submitting || invalid } type='submit'>确定</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>取消</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
