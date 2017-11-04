
import { asyncFuncCreator } from '../utils';

export function index(key) {
  const result = asyncFuncCreator({
    constant: 'BOARD_INDEX',
    promise: (client) => client.request({ url: '/project/' + key + '/board' })
  });
  return result;
}

export function create(key, values) {
  const result = asyncFuncCreator({ 
    constant: 'BOARD_CREATE',
    promise: (client) => client.request({ url: '/project/' + key + '/board', method: 'post', data: values })
  });
  return result;
}

export function update(key, values) {
  return asyncFuncCreator({
    constant: 'BOARD_UPDATE',
    promise: (client) => client.request({ url: '/project/' + key + '/board', method: 'post', data: values })
  });
}

export function select(id) {
  return { type: 'BOARD_SELECT', id: id };
}

export function del(key, id) {
  return asyncFuncCreator({
    constant: 'BOARD_DELETE',
    id,
    promise: (client) => client.request({ url: '/project/' + key + '/board/' + id, method: 'delete' })
  });
}
