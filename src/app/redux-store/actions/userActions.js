import axios from "axios";

export const fetchUserInfo = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://localhost:8000/api/user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      console.log(response.data);
      dispatch(setUserInfo(data));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
};

export const setUserInfo = (userInfo) => ({
  type: "SET_USER_INFO",
  payload: userInfo,
});

export const clearUserInfo = () => ({
  type: "CLEAR_USER_INFO",
});
