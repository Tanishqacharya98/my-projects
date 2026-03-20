import axiosInstance from "./AxiosInstance";
import swal from "sweetalert";
import { Logout } from "../store/actions/AuthActions";

export function signUp(data) {
    return axiosInstance.post("/auth/signup", data);
}

export function login(data) {
    return axiosInstance.post("/auth/login", data);
}

export function formatError(errorResponse) {
    swal("Error", errorResponse.response?.data?.message || "Something went wrong", "error");
}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        dispatch(Logout(navigate));
    }, timer);
}

export function saveTokenInLocalStorage(data) {

  localStorage.setItem(
    "userDetails",
    JSON.stringify({
      token: data.token,
      user: data.user
    })
  );
}