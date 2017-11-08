import * as t from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = { ecode: 0, collection: [], item: {}, indexLoading: false, loading: false, itemLoading: false, selectedItem: {} };
export default function board(state = initialState, action) {
  switch (action.type) {
    case t.BOARD_CONFIG_INDEX:
      return { ...state, indexLoading: true, collection: [] };

    case t.BOARD_CONFIG_INDEX_SUCCESS:
      if (action.result.ecode === 0) {
        state.collection = action.result.data && action.result.data.config ? action.result.data.config : [];
        state.configOptions = action.result.data && action.result.data.configOptions ? action.result.data.configOptions : [];
        state.collection2JSON = JSON.stringify(state.collection);
        state.boardId = action.result.data.id;
        state.boardName = action.result.data.name;
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

    case t.BOARD_CONFIG_SELECT:
      const el = _.find(state.collection, { id: action.id });
      return { ...state, itemLoading: false, selectedItem: el };

    default:
      return state;
  }
}
