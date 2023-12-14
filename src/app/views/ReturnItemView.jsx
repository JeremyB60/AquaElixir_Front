import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../redux-store/actions/userActions";
import { selectToken } from "../redux-store/authenticationSlice";
import { URL_AUTHFORM } from "../constants/urls/urlFrontEnd";
import { selectIsLogged } from "../redux-store/authenticationSlice";
import ReturnItem from "../components/account/ReturnItem";

const ReturnItemView = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsLogged);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const userInfo = useSelector((state) => state.user.userInfo); // Assurez-vous que 'user' correspond au nom de votre reducer

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchUserInfo(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (!isAuthenticated) navigate(URL_AUTHFORM);
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl p-5 w-full bg-white">
      <div>
        <p>Firstname: {userInfo.firstName}</p>
        <p>Lastname: {userInfo.lastName}</p>
      </div>
      <ReturnItem />
    </div>
  );
};

export default ReturnItemView;
