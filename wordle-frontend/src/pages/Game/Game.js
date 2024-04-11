import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { InputBoxRow } from '../../components/InputBoxRow/InputBoxRow'
import config from '../../constants'
import './Game.css'
const Game = () => {

    const [rows, setRows] = useState(6)
    const [wordLength, setWordLength] = useState(5)
    useEffect(()=>{

    },[])

    return (
        <>
          <div>
            <div className='letter-container'>
               {
                config.letterWord.map((item, index) => {
                    return (
                        <>
                        <button key={index} className='letter-length' onClick={()=>{setWordLength(item)}}>{item}</button>
                        </>
                    )
                })
               }
            </div>
            <div className='input-container'>
                {Array.from({ length: rows }, (_, index) => index).map((item,index)=>{
                    return  <InputBoxRow wordLength={wordLength} key={index} />
                })}
            </div>
          </div>
        </>
    )
}

export {Game}