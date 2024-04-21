import axios from "./axios";

export const addCompany = async (payload) => {
  return await axios.post(`company/create-company`, payload);
};

export const companies = async () => {
  return await axios.get(`company/all-companies`);
};

export const updateCompany = async (id, payload) => {
  return await axios.put(`company/update-company/${id}`, payload);
};

export const companyDetail = async (id) => {
  return await axios.get(`company/company/${id}`);
};

export const deleteCompany = async (id) => {
  return await axios.delete(`company/delete-company/${id}`);
};

export const allUsersAndCompanies = async () => {
  return await axios.get(`company/all-users-and-companies`);
};

export const showToAdminStatus = async (id, payload) => {
  return await axios.put(`company/update-show-to-admin/${id}`, payload);
};

