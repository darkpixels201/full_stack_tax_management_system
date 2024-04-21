import axios from "./axios";

export const addUnderSection = async (payload) => {
  return await axios.post(`under-section/create-under-section`, payload);
};

export const getUnderSection = async () => {
  return await axios.get(`under-section/all-under-sections`);
};

export const updateUnderSection = async (id, payload) => {
  return await axios.put(`under-section/update-under-section/${id}`, payload);
};

export const deleteUnderSection = async (id) => {
  return await axios.delete(`under-section/delete-under-section/${id}`);
};