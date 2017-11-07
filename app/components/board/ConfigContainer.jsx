import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BoardConfigActions from 'redux/actions/BoardconfigActions';

const Header = require('./ConfigHeader');
const List = require('./ConfigList');

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BoardConfigActions, dispatch)
  };
}

@connect(({ boardconfig }) => ({ boardconfig }), mapDispatchToProps)
export default class ConfigContainer extends Component {
  constructor(props) {
    super(props);
    this.pid = '';
    this.id = '';
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    boardconfig: PropTypes.object.isRequired
  }

  async index() {
    console.log( 'config-index', this.props.actions );
    await this.props.actions.index(this.pid, this.id);
    return this.props.boardconfig.ecode;
  }

  async save(values) {
    await this.props.actions.save(this.pid, this.id, values);
    return this.props.boardconfig.ecode;
  }

  componentWillMount() {
    const { location: { pathname='' } } = this.props;
    if (/^\/admin\/scheme/.test(pathname)) {
      this.pid = '$_sys_$';
    } else {
      const { params: { key } } = this.props;
      this.pid = key;
    }
    const { params: { id } } = this.props;
    this.id = id;
  }

  render() {
    const { location: { pathname='' } } = this.props;
    return (
      <div>
        <Header 
          pathname={ pathname }
          { ...this.props.boardconfig }/>
        <List 
          index={ this.index.bind(this) } 
          select={ this.props.actions.select } 
          { ...this.props.boardconfig }/>
      </div>
    );
  }
}
