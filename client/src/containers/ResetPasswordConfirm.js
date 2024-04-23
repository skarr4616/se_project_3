import React, { useState } from 'react'
import { Link, redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { isAuthenticated, reset_password_confirm } from '../actions/auth';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState(
        {
            new_password: '',
            re_new_password: ''
        }
    )

    const { new_password, re_new_password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true)
        console.log('Success')

    }

    // If user authenticated, redirect to homepage 
    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        type='email' 
                        className='form-control' 
                        placeholder='New Password' 
                        name='new_password' 
                        value={new_password} 
                        onChange={e => onChange(e)} 
                        required 
                    />
                </div>

                <div className='form-group'>
                    <input 
                        type='email' 
                        className='form-control' 
                        placeholder='Confirm New Password' 
                        name='re_new_password' 
                        value={re_new_password} 
                        onChange={e => onChange(e)} 
                        required 
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm)