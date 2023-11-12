import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { URL_HOME } from '../constants/urls/urlFrontEnd';
import Login from './../components/account/Login';
import { selectIsLogged } from './../redux-store/authenticationSlice';

const LoginView = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsLogged);

    useEffect(() => {
        if (isAuthenticated) navigate(URL_HOME);
    }, []);

    return (
        <div className="mx-auto max-w-screen-xl w-full bg-white sm:px-7">
            <Login className="" />
        </div>
    );
};

export default LoginView;
