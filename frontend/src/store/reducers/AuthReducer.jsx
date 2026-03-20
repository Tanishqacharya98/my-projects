const initialState = {
  auth: {
    user: null,
    token: null,
  },
  errorMessage: "",
  successMessage: "",
  showLoading: false,
};

export function AuthReducer(state = initialState, action) {

  if (action.type === "[signup action] confirmed signup") {
    return {
      ...state,
      auth: {
        user: action.payload.user,
        token: action.payload.token
      },
      errorMessage: "",
      successMessage: "Signup Successfully Completed",
      showLoading: false,
    };
  }

  if (action.type === "[login action] confirmed login") {
    return {
      ...state,
      auth: {
        user: action.payload.user,
        token: action.payload.token
      },
      errorMessage: "",
      successMessage: "Login Successfully Completed",
      showLoading: false,
    };
  }

  if (action.type === "[Logout action] logout action") {
    return {
      ...state,
      auth: {
        user: null,
        token: null
      },
      errorMessage: "",
      successMessage: "",
    };
  }

  if (
    action.type === "[signup action] failed signup" ||
    action.type === "[login action] failed login"
  ) {
    return {
      ...state,
      errorMessage: action.payload,
      successMessage: "",
      showLoading: false,
    };
  }

  if (action.type === "[Loading action] toggle loading") {
    return {
      ...state,
      showLoading: action.payload,
    };
  }

  return state;
}