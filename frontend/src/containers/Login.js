import React, { useState } from 'react'
import { Link, redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { login, isAuthenticated } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
    )

    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        login(email, password)
        console.log('Success')
    }

    // If user authenticated, redirect to homepage 
    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        type='email' 
                        className='form-control' 
                        placeholder='Email Address' 
                        name='email' 
                        value={email} 
                        onChange={e => onChange(e)} 
                        required 
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type='password' 
                        className='form-control' 
                        placeholder='Password' 
                        name='password' 
                        minLength={8}
                        value={password} 
                        onChange={e => onChange(e)} 
                        required 
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p>
                Forgot your password? <Link to='/reset-password'>Reset Password</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)