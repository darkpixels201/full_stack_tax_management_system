import axios from "./axios";

export const addRateOfTax = async (payload) => {
  return await axios.post(`rate-of-tax/create-rate-of-tax`, payload);
};

export const getRateOfTax = async () => {
  return await axios.get(`rate-of-tax/all-rates-of-tax`);
};

export const updateRateOfTax = async (id, payload) => {
  return await axios.put(`rate-of-tax/update-rate-of-tax/${id}`, payload);
};

export const deleteRateOfTax = async (id) => {
  return await axios.delete(`rate-of-tax/delete-rate-of-tax/${id}`);
};
