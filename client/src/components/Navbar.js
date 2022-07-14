import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import { NavLink } from 'react-router-dom';
import { isEmpty } from '../Utils';

export default function Navbar() {

    const userData = useSelector(state => state.userReducers);

    const [load, setLoad] = useState(false);

    useEffect(() => {
      if(!isEmpty(userData)){
        setLoad(true)
      }
    }, [userData]);
    

  return (
    <>
        {load && (
            <nav className='nav-main'>
                <div className="one-third">
                    <div className="log"><p>Nexagram</p></div>
                </div>
                
                <div className="one-third">
                    <div className="search"><span><i className="fa-solid fa-magnifying-glass"></i></span><input type="text" placeholder='Rechercher'/></div>
                </div>
                <div className="one-third">
                    <div className="icons">
                        <NavLink exact="true" to="/" className={"nav-item"}>
                            <i className="fa-regular fa-house-blank"></i>
                        </NavLink>
                        <NavLink exact="true" to="/direct" className={"nav-item"}>
                            <i className="fa-regular fa-paper-plane"></i>
                        </NavLink>
                        <NavLink exact="true" to="/post" className={"nav-item"}>
                            <i className="fa-regular fa-square-plus"></i>
                        </NavLink>
                        <NavLink exact="true" to="/explore" className={"nav-item"}>
                            <i className="fa-regular fa-compass"></i>
                        </NavLink>
                        <NavLink exact="true" to="/activity" className={"nav-item"}>
                            <i className="fa-regular fa-heart"></i>
                        </NavLink>
                        <NavLink exact="true" to="/profile" className={"nav-item"}>
                            <img src={process.env.PUBLIC_URL + userData.userPic} alt="PP" className='nav-pp' />
                        </NavLink>
                    </div>
                </div>
            </nav>
        )}
    </>
  )
}
