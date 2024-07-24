
import React from "react"
import './Dashboard.css'
import image from '../../assets/images/wordle.png'
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {

    const navigate = useNavigate();

    function callPlay() {
        navigate('/game')
    }

    function createRoom () {

    }

    return (
        <div className="background-body">
        <div className="wordle-game-heading">
         Wordle 2.0
        </div>
        <div>
        <div>
            <img src={image} height="200px" width="200px" className="logo-bg" alt= "wordle logo"/>
        </div>
        <div className="dash-button-container">
            <div>
              <button onClick={callPlay} className="dashboard-button"> 
                Play 
              </button>
            </div>
            <div>
               <button onClick={createRoom} className="dashboard-button">
                Create Room
               </button>
            </div>
        </div>
        </div>
        </div>
    )
}