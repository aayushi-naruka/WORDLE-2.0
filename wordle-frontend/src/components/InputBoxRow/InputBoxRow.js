import {React, useEffect} from 'react'
import axios from 'axios'
import { InputBox } from './InputBox/InputBox'
const InputBoxRow = ({wordLength}) => {

    useEffect(()=>{

    },[])

    return (
        <>
          <div>
            {Array.from({length: wordLength}, (_, index) => index).map((item,index) =>{
              return <InputBox key ={index}/>
            })}
          </div>
        </>
    )
}

export {InputBoxRow}