import React, { PropTypes, Component } from 'react';
import { Modal, Button, Form, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';

const img = require('../../assets/images/loading.gif');

export default class ConfigEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {  type: '' };
  }

  componentWillMount() {
    const { query={} } = this.props;
    this.state.type = query.type || ''; 
  }

  componentWillReceiveProps(nextProps) {
    const newQuery = nextProps.query || {};
    this.setState({ 
      type: newQuery.type ? newQuery.type : ''
    });
  }

  static propTypes = {
    refresh: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    query: PropTypes.object,
    searchShow: PropTypes.bool,
    options: PropTypes.object,
    indexLoading: PropTypes.bool.isRequired,
    collection: PropTypes.array.isRequired
  }

  clean() {
    this.setState({ type: '' });
  }
  handleCancel() {
    const { close } = this.props;
    this.setState({ ecode: 0 });
    close();
  }
  render() {
    const { collection } = this.props;
    const data = collection[0];
    const typeOptions = data.option;

    const hide = false;
    const submitting = false;
    const errMsg = {};
    const invalid = '';
    const handleSubmit = () => {}
    return (
      <Modal { ...this.props } onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
      <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
        <Modal.Title id='contained-modal-title-la'>{ data.name }</Modal.Title>
      </Modal.Header>
      <form onSubmit={ handleSubmit(this.handleSubmit) } onKeyDown={ (e) => { if (e.keyCode == 13) { e.preventDefault(); } } }>
      <Modal.Body>
        <Form horizontal style={ { marginTop: '10px', marginBottom: '15px', padding: '10px', backgroundColor: '#f5f5f5' } } >
          <FormGroup controlId='formControlsLabel'>
            <Col sm={ 12 }>
              <Select
                simpleValue
                multi
                placeholder='请选择'
                value={ this.state.type }
                onChange={ (newValue) => { this.setState({ type: newValue }); } }
                options={ typeOptions }/>
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <span className='ralign'>{ this.state.ecode !== 0 && !submitting && errMsg[this.state.ecode] }</span>
        <img src={ img } className={ submitting ? 'loading' : 'hide' }/>
        <Button disabled={ submitting || invalid } type='submit'>确定</Button>
        <Button bsStyle='link' disabled={ submitting } onClick={ this.handleCancel.bind(this) }>取消</Button>
      </Modal.Footer>
      </form>
    </Modal>
    );
  }
}
