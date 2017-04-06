import { push } from 'react-router-redux';
import { asyncFuncCreator } from '../utils';
import { SESSION_DESTROY, SESSION_INVALIDATE } from '../constants/ActionTypes';

export function create(values) {
  return asyncFuncCreator({
    constant: 'SESSION_CREATE',
    promise: (client) => client.request({ url: '/session', method: 'post', data: values })
  });
}

export function destroy() {
  return asyncFuncCreator({
    constant: 'SESSION_DESTROY',
    promise: (client) => client.request({ url: '/session', method: 'delete' })
  });
}

export function invalidate() {
  return { type: SESSION_INVALIDATE };
}
