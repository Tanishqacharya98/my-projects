import axiosInstance from "./AxiosInstance";

export const getUsers = (page, search) => {
  return axiosInstance.get(`/admin/users?page=${page}&search=${search}`);
};

export const createUser = (data) => {
  return axiosInstance.post("/admin/users", data);
};

export const updateUser = (id, data) => {
  return axiosInstance.put(`/admin/users/${id}`, data);
};

export const deleteUser = (id) => {
  return axiosInstance.delete(`/admin/users/${id}`);
};

export const toggleBlockUser = (id) => {
  return axiosInstance.patch(`/admin/users/${id}/block`);
};

export const impersonateUser = (id) => {
  return axiosInstance.post(`/admin/users/${id}/impersonate`);
};

export const endImpersonation = (logId) => {
  return axiosInstance.post(`/admin/users/impersonate/end/${logId}`);
};