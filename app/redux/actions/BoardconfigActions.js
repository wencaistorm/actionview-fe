import { asyncFuncCreator } from '../utils';

export function index(key, id) {
  const result = asyncFuncCreator({
    constant: 'BOARD_CONFIG_INDEX',
    promise: (client) => client.request({ url: '/project/' + key + '/board/' + id })
  });
  console.log(result)
  return result;
}

export function save(key, id, values) {
  return asyncFuncCreator({
    constant: 'BOARD_CONFIG_SAVE',
    promise: (client) => client.request({ url: '/project/' + key + '/board/' + id, method: 'put', data: values })
  });
}