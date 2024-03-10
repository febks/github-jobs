import * as ActionType from "../actions/ActionType";

const INITIAL_STATE = {
  filerData: null,
}

const FilterReducer = ( state = INITIAL_STATE, { type, payload} ) => {
  switch (type) {
    case ActionType.FILTER_DATA:
      return { ...state, filerData: payload };
    default:
      return state;
  }
}

export default FilterReducer;