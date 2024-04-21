import axios from "./axios";

export const addCheque = async (payload) => {
  return await axios.post(`cheque/create-cheque`, payload);
};

export const chequeList = async () => {
  return await axios.get(`cheque/all-cheques`);
};

export const chequeByBankName = async (payload) => {
  return await axios.get(`cheque/by-bank/${payload}`)
}

export const deleteCheque = async (id) => {
  return await axios.delete(`cheque/delete-cheque/${id}`)
}

export const updateCheque = async (id, payload) => {
  console.log("Service ID",id)
  return await axios.put(`cheque/update-cheque/${id}`, payload)
}




