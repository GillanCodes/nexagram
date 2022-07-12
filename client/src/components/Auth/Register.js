import axios from 'axios';
import React, { useState } from 'react'

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [NotificationDisplay, setNotificationDisplay] = useState(false);

    const registerHandle = (event) => {

        event.preventDefault();

        console.log(username, password)

        if (password != confirmPassword)
          return

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/auth/register`,
            data: {
                username,
                password,
                email
            },
            withCredentials: true
        }).then((res) => {
            console.log(res)
            if (res.data.errors) {
                console.log(res)
                //TODO
                // setNotificationDisplay(true);
                // const Error = document.querySelector('.log-error');
                // if (res.data.errors.username) return Error.innerHTML = res.data.errors.username;
                // if (res.data.errors.password) return Error.innerHTML = res.data.errors.password;
                // if (res.data.errors.ban) return Error.innerHTML = res.data.errors.ban;
            } else {
                // window.location = '/';
                console.log(res);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <div className='login-container'>
        
        <div className="content">
            <img src="" alt="RANDOM" />
        </div>
        <div className="content">
            <h2 className='subtitle'>S'enregistrer</h2>
            <div className="form">
                <form> 
                    <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" className='text-input' onChange={(e) => setUsername(e.target.value)}/>
                    <input type="email" name="email" id="email" placeholder="Email" className='text-input' onChange={(e) => setEmail(e.target.value)}/>
                    <div className="password-field">
                        <input type="password" name="password" id="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                        <i className="fa-solid fa-eye"></i>
                        <i className="fa-solid fa-eye-slash"></i>
                    </div>
                    <div className="password-field">
                        <input type="password" name="password" id="password" placeholder='Mot de passe' onChange={(e) => setConfirmPassword(e.target.value)} />
                        <i className="fa-solid fa-eye"></i>
                        <i className="fa-solid fa-eye-slash"></i>
                    </div>
                    
                    <input type="submit" value="Se Connecter" className='button-input' onClick={(e) => registerHandle(e)} />
                </form>
                <div className="spacer">
                    <span>OU</span>
                </div>
                <div className="googleLogin">
                    <p><i className="fa-brands fa-google"></i> Ce s'enregistrer avec Google</p>
                <div className="spacer">
                    <span></span>
                </div>
                <div className="register">
                    <a href="/">Je ai un compte</a>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
