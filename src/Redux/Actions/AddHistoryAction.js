import {ADD_History} from '../Types/Types'

export const addHistory = (data) =>{

 return{
    type:ADD_History,
    payload:{
     data
    }
 }
}

