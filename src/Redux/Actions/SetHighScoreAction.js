import {SET_HighScore} from '../Types/Types'

export const setHighScore = (data) =>{

 return{
    type:SET_HighScore,
    payload:{
     data
    }
 }
}
