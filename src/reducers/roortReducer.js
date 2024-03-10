import { combineReducers } from "redux";
import FilterReducer from "./FilterReducer";

const appReducer = combineReducers({
  filterData: FilterReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
