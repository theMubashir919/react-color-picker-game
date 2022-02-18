import {RESET_CurrScore} from '../Types/Types'

export const resetScore = (data) =>{

 return{
    type:RESET_CurrScore,
    payload:{
     data
    }
 }
}

