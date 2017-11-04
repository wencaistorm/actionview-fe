import * as t from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = { ecode: 0, collection: [], item: {}, indexLoading: false, loading: false, itemLoading: false, selectedItem: {} };
console.log('hello')
export default function board(state = initialState, action) {
  switch (action.type) {
    case t.BOARD_CONFIG_INDEX:
      return { ...state, indexLoading: true, collection: [] };

    case t.BOARD_CONFIG_INDEX_SUCCESS:
      if (action.result.ecode === 0) {
        state.collection = action.result.data.contents && action.result.data.contents.steps ? action.result.data.contents.steps : [];
        state.collection2JSON = JSON.stringify(state.collection);
        state.workflowId = action.result.data.id;
        state.workflowName = action.result.data.name;
        state.options = action.result.options;
      }
      return { ...state, indexLoading: false, ecode: action.result.ecode };

    case t.BOARD_CONFIG_INDEX_FAIL:
      return { ...state, indexLoading: false, error: action.error };
      
    case t.BOARD_CONFIG_SAVE:
      return { ...state, indexLoading: true, collection: [] };

    case t.BOARD_CONFIG_SAVE_SUCCESS:
      if (action.result.ecode === 0) {
        state.collection = action.result.data;
      }
      return { ...state, indexLoading: false, ecode: action.result.ecode };

    case t.BOARD_CONFIG_SAVE_FAIL:
      return { ...state, indexLoading: false, error: action.error };

    default:
      return state;
  }
}
