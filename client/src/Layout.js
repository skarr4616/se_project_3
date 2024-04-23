import React, {useEffect} from 'react'
import Navbar from './components/Navbar'

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.loadUser();
    }, [])

    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    )
}

export default Layout
