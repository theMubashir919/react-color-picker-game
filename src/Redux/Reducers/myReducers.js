import {ADD_CurrScore} from '../Types/Types'
import {SET_HighScore} from '../Types/Types'
import {RESET_CurrScore} from '../Types/Types'
import {ADD_History} from '../Types/Types'

export const myReducers = (state=[],action) =>{

switch(action.type){

  case ADD_CurrScore : 
  return {
    ...state,
    currScore: state.currScore + 1,    
    }

  case SET_HighScore : 
  return {
    ...state,
    highScore: action.payload.data,
    }

  case RESET_CurrScore :
    return {
      ...state,
      currScore: 0,
    }

    case ADD_History :
      return {
        ...state,
        playeHistory: action.payload.data,
      }
  

  default: return state
}

}

