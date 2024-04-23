import React, { useState } from 'react'
import { Link, redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { verify } from '../actions/auth';

const Activate = ({ verify }) => {
    
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if(verified){
        return <Redirect to='/' />
    }
    
    return (
        <div className='container'>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{marginTop:'200px'}}>
                <h1>Verify your Account</h1>
                <button onClick={verify_account} className='btn btn-primary' type='button' style={{ marginTop: '50px'}}>
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate)