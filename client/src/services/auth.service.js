import axios from "./axios";

export const singUp = async (payload) => {
  return await axios.post(`user/signup`, payload);
};

export const login = async (payload) => {
  return await axios.post(`user/login`, payload);
};

export const forgotPassword = async (payload) => {
  return await axios.post(`user/forgot-password`, payload);
};

export const resetPassword = async (payload) => {
  return await axios.post(`user/reset-password`, payload);
};



export const pendingUsers = async (payload) => {
  return await axios.get(`user/pending-users`, payload);
};

export const updateUserStatus = async (id, payload) => {
  return await axios.patch(`user/update-user-status/${id}`, payload);
};



export const deletePendingUsers = async (id) => {
  return await axios.delete(`user/pending-users/${id}`);
};

export const approvedUsers = async (payload) => {
  return await axios.get(`user/approved-users`, payload);
};

export const deleteApprovedUsers = async (id) => {
  return await axios.delete(`user/${id}`);
};

export const updateAccountStatus = async (id, payload) => {
  return await axios.put(`user/update-account-status/${id}`, payload);
};




