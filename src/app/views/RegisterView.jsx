import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { URL_HOME } from '../constants/urls/urlFrontEnd';
import Register from './../components/account/Register';
import { selectIsLogged } from './../redux-store/authenticationSlice';

const RegisterView = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsLogged);

    useEffect(() => {
        if (isAuthenticated) navigate(URL_HOME);
    }, []);

    return (
        <div className="mx-auto max-w-screen-xl w-full bg-white sm:px-7">
            <Register className="" />
        </div>
    );
};

export default RegisterView;
