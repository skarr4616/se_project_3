import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { login, reset, getUserInfo } from "../../actions/authSlice";
import { toast } from "react-toastify";
import "./LoginSignup.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };
        dispatch(login(userData));
    };

    const handleSignUp = () => {
        console.log("Sign Up");
        navigate("/signup");
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/");
        }

        dispatch(reset());
        dispatch(getUserInfo());
    }, [isError, isSuccess, user, navigate, dispatch]);

    return (
        <div className="login-signup-container">
            <div className="header">
                <div className="text">Log In</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="signup">
                New to Remote Labs? <span onClick={handleSignUp}>Sign Up</span>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={handleSubmit}>
                    Login
                </div>
            </div>
        </div>
    );
};

export default Login;
