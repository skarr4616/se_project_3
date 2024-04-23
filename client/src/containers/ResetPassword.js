import React, { useState } from 'react'
import { Link, redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { login, isAuthenticated, reset_password } from '../actions/auth';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState(
        {
            email: '',
        }
    )

    const { email } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        reset_password(email, password)
        setRequestSent(true)
        console.log('Success')

    }

    // If user authenticated, redirect to homepage 
    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Reset Password</h1>
            <p>Email to reset password</p>
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
                <button type='submit' className='btn btn-primary'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword)