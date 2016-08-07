import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import Login from './components/Login';
import Home from './components/Home';
import Project from './components/Project';
import Profile from './components/Profile';
import ProjectList from './components/ProjectList';

const TypeContainer = require('./components/type/Container');
const FieldContainer = require('./components/field/Container');
const ScreenContainer = require('./components/screen/Container');
const WorkflowContainer = require('./components/workflow/Container');
const StateContainer = require('./components/state/Container');
const ResultContainer = require('./components/result/Container');
const PriorityContainer = require('./components/priority/Container');
const RoleContainer = require('./components/role/Container');
const RoleactorContainer = require('./components/roleactor/Container');

export default (
  <Route path='/' component={ Layout }>
    <Route path='/login' component={ Login }/>
    <Route path='/home' component={ Home }>
      <IndexRoute component={ ProjectList }/>
      <Route path='/project/:key' component={ Project }>
        <IndexRoute component={ Profile }/>
        <Route path='/project/:key/profile' component={ Profile }/>
        <Route path='/project/:key/type' component={ TypeContainer }/>
        <Route path='/project/:key/field' component={ FieldContainer }/>
        <Route path='/project/:key/screen' component={ ScreenContainer }/>
        <Route path='/project/:key/workflow' component={ WorkflowContainer }/>
        <Route path='/project/:key/state' component={ StateContainer }/>
        <Route path='/project/:key/result' component={ ResultContainer }/>
        <Route path='/project/:key/priority' component={ PriorityContainer }/>
        <Route path='/project/:key/role' component={ RoleContainer }/>
        <Route path='/project/:key/roleactor' component={ RoleactorContainer }/>
      </Route>
    </Route>
  </Route>
);
