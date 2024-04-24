import React, { useEffect } from "react";

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.loadUser();
    }, []);

    return <div>{props.children}</div>;
};

export default Layout;
