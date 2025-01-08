import React, { useState } from 'react'
import googleLogo from '../images/google.png';
import { auth, googleProvider, db } from '../Config/Config'
import { Link } from 'react-router-dom'

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'No account found with this email address.';
            case 'auth/wrong-password':
                return 'Invalid password. Please try again.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/user-disabled':
                return 'This account has been disabled. Contact support.';
            default:
                return 'Wrong credentials!';
        }
    };

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            props.history.push('/');
        }).catch(err => setError(getErrorMessage(err.code)));
    }

    const loginWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                const user = result.user;
                if (user) {
                    db.collection('SignedUpUsersData')
                        .doc(user.uid)
                        .set({
                            Name: user.displayName,
                            Email: user.email,
                        }, { merge: true }); 
                }
                props.history.push('/');
            })
            .catch((err) => setError(getErrorMessage(err.code)));
    };

    return (
        <div className='container'>
            <br />
            <h1 className="centered-title">Log-In to Real Estate Website</h1>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email:</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                {error && <span className='error-msg'>{error}</span>}
                <br/>
                <div className="half-br"></div>
                <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
            </form>
            
            
            <button onClick={loginWithGoogle} className="btn btn-md mybtn"  style={{ backgroundColor: '#d1cfcf', color: '#fff', border: 'none' }}>
                <img
                    src={googleLogo}
                    alt="Google Logo"
                    style={{ width: '20px', marginRight: '10px' }}
                />

                LOGIN WITH GOOGLE
            </button>
            <br />
            <br/>
            <span>Don't have an account? Register
                <Link to="signup"> Here</Link>
            </span>

            
        </div>
    )
}
