import React, { useState } from 'react';
import './Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, logOut } from './firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [agreement, setAgreement] = useState(false);

    const logIn = e => {
        e.preventDefault();

        // logInWithEmailAndPassword(email, password);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user);
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorMessage);
                // console.log(errorCode);
                if (errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
                    alert('Incorrect email or password');
                } else {
                    alert(errorMessage);
                }
            })
        }
        
        const register = e => {
            e.preventDefault();
            
            if (!agreement) {
                alert('To Sign Up you must agree with the terms and conditions')
            } else {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert('Account created successfully')
                    // console.log(user);
                    logOut();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                })
            }
            
    }

    const handleChange = e => {
        setAgreement(e.target.checked);
        // console.log(agreement);
    }

  return (
    <div className='login'>
        <Link to='/'>
            <h1 className='login__backLogo'>memag</h1>
        </Link>
        <div className="login__card">
            <form action="">
                <h2 className='login__title'>Create an account</h2>
                <small>or log in if you already have one</small>
                <h4 className='login__email'>Email</h4>
                <input required={true} placeholder='example@domain.com' className='login__emailInput' value={email} onChange={e => setEmail(e.target.value)} type="text" />
                <h4 className='login__password'>Password</h4>
                <input required={true}className='login__passwordInput' value={password} onChange={e => setPassword(e.target.value)} type="password" />
                <button type='submit' onClick={logIn} className="login__logInButton" disabled={!email || !password}>Log In</button>
            </form>

            <div className="login__termsAndConditions">
                <input onChange={handleChange} type="checkbox" />
                <small>By signing-up I agree to the MEMAG Conditions of Use & Sale.</small>
            </div>

            <button onClick={register} className="login__signUpButton">Sign Up</button>
        </div>
    </div>
  )
}

export default Login
