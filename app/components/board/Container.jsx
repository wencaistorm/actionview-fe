import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BoardActions from 'redux/actions/BoardActions';

const Header = require('./Header');
const List = require('./List');

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BoardActions, dispatch)
  };
}

@connect(({ i18n, project, board }) => ({ i18n, project, board }), mapDispatchToProps)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.pid = '';
  }

  static propTypes = {
    project: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  
  async index(cb) {
    await this.props.actions.index(this.pid);
    return this.props.board.ecode;
  }

  async create(values) {
    await this.props.actions.create(this.pid, values);
    return this.props.board.ecode;
  }

  async update(values) {
    await this.props.actions.update(this.pid, values);
    return this.props.board.ecode;
  }

  async del(id) {
    const { actions } = this.props;
    await actions.del(this.pid, id);
    return this.props.board.ecode;
  }

  goConfig(id) {
    const { location: { pathname='' } } = this.props;
    const uri = pathname + '/' + id;
    this.context.router.push({ pathname: uri });
  }

  componentWillMount() {
    const { params: { key } } = this.props;
    this.pid = key;
  }

  render() {
    const { project: { options={} } } = this.props;

    return (
      <div>
        <Header 
          create={ this.create.bind(this) } 
          options={ options }
          i18n={ this.props.i18n } 
          { ...this.props.board }/>
        <List 
          index={ this.index.bind(this) } 
          select={ this.props.actions.select } 
          update={ this.update.bind(this) } 
          goConfig={ this.goConfig.bind(this) } 
          del={ this.del.bind(this) } 
          delNotify={ this.props.actions.delNotify } 
          options={ options }
          i18n={ this.props.i18n }
          { ...this.props.board }/>
      </div>
    );
  }
}
