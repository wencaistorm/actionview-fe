import * as t from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = { ecode: 0, collection: [], item: {}, indexLoading: false, loading: false, itemLoading: false, selectedItem: {} };

export default function board(state = initialState, action) {
  switch (action.type) {
    case t.BOARD_INDEX:
      return { ...state, indexLoading: true, collection: [] };

    case t.BOARD_INDEX_SUCCESS:
      if (action.result.ecode === 0) {
        state.collection = action.result.data;
      }
      return { ...state, indexLoading: false, ecode: action.result.ecode };

    case t.BOARD_INDEX_FAIL:
      return { ...state, indexLoading: false, error: action.error };

    case t.BOARD_CREATE:
      return { ...state, loading: true };

    case t.BOARD_CREATE_SUCCESS:
      // console.log('BOARD_CREATE_SUCCESS')
      // console.log(state, action)
      // console.log('======')
      if ( action.result.ecode === 0 ) {
        state.collection.unshift(action.result.data);
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.BOARD_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.BOARD_UPDATE:
      return { ...state, loading: true };

    case t.BOARD_UPDATE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        const ind = _.findIndex(state.collection, { id: action.result.data.id });
        state.collection[ind] = action.result.data;
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.BOARD_UPDATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.BOARD_SELECT:
      const el = _.find(state.collection, { id: action.id });
      return { ...state, itemLoading: false, selectedItem: el };

    case t.BOARD_DELETE:
      return { ...state, itemLoading: true };

    case t.BOARD_DELETE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection = _.reject(state.collection, { id: action.id });
      }
      return { ...state, itemLoading: false, ecode: action.result.ecode };

    case t.BOARD_DELETE_FAIL:
      return { ...state, itemLoading: false, error: action.error };

    default:
      return state;
  }
}
