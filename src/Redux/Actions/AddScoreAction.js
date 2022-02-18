import {ADD_CurrScore} from '../Types/Types'

export const addScore = (data) =>{

 return{
    type:ADD_CurrScore,
    payload:{
     data
    }
 }
}

