import axiosInstance from "./AxiosInstance";

export const getProfile = () => {
  return axiosInstance.get("/user/profile");
};

export const updateProfile = (data) => {
  return axiosInstance.put("/user/profile", data);
};

export const changePassword = (data) => {
  return axiosInstance.put("/user/change-password", data);
};

export const uploadProfilePicture = (formData) => {
  return axiosInstance.post("/user/upload-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};