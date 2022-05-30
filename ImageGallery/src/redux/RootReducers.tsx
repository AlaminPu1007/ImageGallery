import {combineReducers} from 'redux';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
//bring dashboard reducer(which came form home component)
import dashboardReducer from './dashboardRedux/DashboardReducer';

// our all reducer goes here,
//create Reducers will give you ability to work with one to more reducers with
//their action
const rootReducers = combineReducers({
  // dashboard reducer
  dashboardReducer,
});

export default rootReducers;
//This RootState is required to use useSelector later on
export type RootState = ReturnType<typeof rootReducers>;
// made a custom app selector to grab state value from reducer
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
