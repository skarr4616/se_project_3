import React, { useState } from 'react'
import { Link, redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { signup } from '../actions/auth';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(False);
    
    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: '',
            re_password:''
        }
    )

    const { name, email, password, re_password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        if (password === re_password) {
        signup(name, email, password, re_password)
        console.log('Success')
        }
    }

    // If user authenticated, redirect to homepage 
    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Name' 
                        name='name' 
                        value={email} 
                        onChange={e => onChange(e)} 
                        required 
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type='email' 
                        className='form-control' 
                        placeholder='Email' 
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
                <div className='form-group'>
                    <input 
                        type='password' 
                        className='form-control' 
                        placeholder='Enter Password again' 
                        name='re_password' 
                        minLength={8}
                        value={re_password} 
                        onChange={e => onChange(e)} 
                        required 
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Sign up</button>
            </form>
            <p className='mt-3'>
                Already have an account? <Link to='/login'>Sign in</Link>
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

export default connect(mapStateToProps, { signup })(Signup)