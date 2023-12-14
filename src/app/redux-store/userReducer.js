const initialState = {
    // ... autres états
    userInfo: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_INFO':
        return {
          ...state,
          userInfo: action.payload,
        };
      case 'CLEAR_USER_INFO':
        return {
          ...state,
          userInfo: null,
        };
      // ... autres cas
      default:
        return state;
    }
  };
  
  export default userReducer;
  