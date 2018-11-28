import {SET_SEARCHNAME} from "../actions/ActionTypes"


export function searchName(state = '', action) {
  switch(action.type){
    case SET_SEARCHNAME:
      return action.data
    default:
      return state
  }
}