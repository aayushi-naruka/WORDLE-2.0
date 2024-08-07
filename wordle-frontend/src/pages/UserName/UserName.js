import { useEffect, useState } from "react"
import './UserName.css'
import { useNavigate } from "react-router-dom"
import { io } from 'socket.io-client';
import { useParams, useLocation }from 'react-router-dom';

export const UserName = () => {

    const navigate = useNavigate()
    const [name,setName]= useState('')
    const socket = io('http://localhost:3200')
    const id  = useParams();
    function onInput(e) {
        setName(e.target.value)
    }
    useEffect(()=> {

    },[])
    function submitForm () {
        sessionStorage.setItem('username', name)
        sessionStorage.setItem('roomID', id.id)
        if (id && name) {
            socket.emit('joinRoom',{ roomId: id.id , username: name } );
        }
        navigate(`/game/${id.id}`)
    }
    return (
        <div className="username-form-container">
           <div className="form">
            <input className="input-name" type="text" defaultValue={name} onChange={(e)=>{onInput(e)}} placeholder="Your Name"/>
            <button onClick={submitForm} className="submit-btn">Submit</button>
           </div>
        </div>
    )
}