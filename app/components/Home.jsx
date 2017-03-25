import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';

import * as ProjectActions from 'redux/actions/ProjectActions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProjectActions, dispatch)
  };
}

@connect(({ project }) => ({ project }), mapDispatchToProps)
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  }

  entry(pathname) {
    this.context.router.push({ pathname });
  }

  render() {
    const { location: { pathname='' }, project } = this.props;

    return (
      <div className='doc-main'>
        <Header project={ project } pathname={ pathname } entry={ this.entry.bind(this) }/>
        <Sidebar project={ project } pathname={ pathname }/>
        { this.props.children }
      </div>
    );
  }
}
