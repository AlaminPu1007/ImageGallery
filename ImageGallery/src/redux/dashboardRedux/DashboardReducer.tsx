/**
 * In this file our all dashboard
 * reducer method will be define,
 * by this will happen after action called
 */
import {Action, ActionType} from './DashboardActionCreator';

/// DEFINE PROPS OF INITIAL STATE
export interface dashboardState {
  post: Array<object>;
}

/// INITIAL STATE OF DASHBOARD REDUCER
const initialState: dashboardState = {
  post: [],
};

/**
 * our actual dashboard will be define here
 * by this our all initial state will be
 * (CRUD) method happen
 */
const dashboardReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.STORE_DASHBOARD_DATA:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
