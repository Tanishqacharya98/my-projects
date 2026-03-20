import {
    formatError,
    login,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';


// SIGNUP
export function signupAction(name,email, password, navigate) {
    return (dispatch) => {
        signUp({
            name,
            email,
            password
        })
        .then((response) => {
            saveTokenInLocalStorage(response.data);
            dispatch(confirmedSignupAction(response.data));
            navigate('/login');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response?.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}


// LOGOUT
export function Logout(navigate) {
    localStorage.removeItem('userDetails');
    navigate('/login');
    return {
        type: LOGOUT_ACTION,
    };
}


// LOGIN
export function loginAction(email, password, navigate) {
    return (dispatch) => {
        login({
            email,
            password
        })
        .then((response) => {
            saveTokenInLocalStorage(response.data);
            dispatch(loginConfirmedAction(response.data));
            navigate('/');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response?.data);
            dispatch(loginFailedAction(errorMessage));
        });
    };
}


// LOGIN FAILED
export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}


// LOGIN SUCCESS
export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}


// SIGNUP SUCCESS
export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}


// SIGNUP FAILED
export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}


// LOADING
export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}