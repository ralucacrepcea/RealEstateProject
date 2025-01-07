import React, { useState } from 'react'
import googleLogo from '../images/google.png';
import { auth, googleProvider, db } from '../Config/Config'
import { Link } from 'react-router-dom'

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            props.history.push('/');
        }).catch(err => setError(err.message));
    }

    const loginWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                const user = result.user;
                if (user) {
                    // Save user details to Firestore if needed
                    db.collection('SignedUpUsersData')
                        .doc(user.uid)
                        .set({
                            Name: user.displayName,
                            Email: user.email,
                        }, { merge: true }); // Merge prevents overwriting existing data
                }
                props.history.push('/');
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className='container'>
            <br />
            <h1 className="centered-title">Log-In to Real Estate Website</h1>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            
            <button onClick={loginWithGoogle} className="btn btn-md mybtn"  style={{ backgroundColor: '#d1cfcf', color: '#fff', border: 'none' }}>
                <img
                    src={googleLogo}
                    alt="Google Logo"
                    style={{ width: '20px', marginRight: '10px' }}
                />

                Login with Google
            </button>
            <br />
            <br/>
            <span>Don't have an account? Register
                <Link to="signup"> Here</Link>
            </span>
        </div>
    )
}
