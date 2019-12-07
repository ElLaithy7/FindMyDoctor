const initialState = {
  token: localStorage.getItem('token') || false
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'LOG_IN':
      newState.token = action.token;
      break;
    case 'LOG_OUT':
      newState.token = false;
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
