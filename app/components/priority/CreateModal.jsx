import React, { PropTypes, Component } from 'react';
import { reduxForm, getValues } from 'redux-form';
import { Modal, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import _ from 'lodash';
import { notify } from 'react-notify-toast';
import { SketchPicker } from 'react-color'

const img = require('../../assets/images/loading.gif');

const validate = (values, props) => {
  const errors = {};
  if (!values.name) {
    errors.name = '必填';
  } else if (_.findIndex(props.collection || [], { name: values.name }) !== -1) {
    errors.name = '该名称已存在';
  }

  if (values.color) {
    const pattern = new RegExp(/^#[0-9a-fA-F]{6}$/);
    if (!pattern.test(values.color))
    {
      errors.color = '格式错误';
    }
  }

  return errors;
};

@reduxForm({
  form: 'priority',
  fields: ['name', 'color', 'description'],
  validate
})
export default class CreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0, displayColorPicker: false, backgroundColor: '', colorValue: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    values: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
  }

  async handleSubmit() {
    const { values, create, close } = this.props;
    const ecode = await create(values);
    if (ecode === 0) {
      this.setState({ ecode: 0 });
      close();
      notify.show('新建完成。', 'success', 2000);
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

  handlerHideColorPicker() {
    this.setState({ displayColorPicker: false })
  }

  handlerShowColorPicker(ev) {
    this.setState({ displayColorPicker: true })
  }
  
  handleColorPickChangeComplete(pickerColor) {
    this.setState({ backgroundColor: pickerColor.hex, colorValue: pickerColor.hex })
  }

  render() {
    const { i18n: { errMsg }, fields: { name, color, description }, handleSubmit, invalid, submitting } = this.props;
    let colorStyle = { backgroundColor: this.state.colorValue || color.value || '#cccccc', marginTop: '10px', marginRight: '8px' };

    return (
      <Modal { ...this.props } onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>创建优先级</Modal.Title>
        </Modal.Header>
        <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
        <Modal.Body>
          <FormGroup controlId='formControlsText' validationState={ name.touched && name.error ? 'error' : '' }>
            <ControlLabel><span className='txt-impt'>*</span>名称</ControlLabel>
            <FormControl disabled={ submitting } onClick={ this.handlerHideColorPicker.bind(this) } type='text' { ...name } placeholder='优先级名'/>
            { name.touched && name.error && <HelpBlock style={ { float: 'right' } }>{ name.error }</HelpBlock> }
          </FormGroup>
          <FormGroup controlId='formControlsText' validationState={ color.touched && color.error ? 'error' : '' }>
            <ControlLabel>图案颜色</ControlLabel>
            <FormControl disabled={ submitting } onClick={ this.handlerShowColorPicker.bind(this) } type='text' { ...color } value={ this.state.colorValue || color.value } placeholder='#cccccc'/>
            <FormControl.Feedback>
              <span className='circle' style={ colorStyle }/>
            </FormControl.Feedback>
            { color.touched && color.error && <HelpBlock style={ { float: 'right' } }>{ color.error }</HelpBlock> }
            { this.state.displayColorPicker && <SketchPicker color={ this.state.backgroundColor } onChangeComplete={ this.handleColorPickChangeComplete.bind(this) } /> }
          </FormGroup>
          <FormGroup controlId='formControlsText'>
            <ControlLabel>描述</ControlLabel>
            <FormControl disabled={ submitting }  onClick={ this.handlerHideColorPicker.bind(this) } type='text' { ...description } placeholder='描述'/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
          <Button disabled={ submitting || invalid } type='submit'>确定</Button>
          <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel }>取消</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
