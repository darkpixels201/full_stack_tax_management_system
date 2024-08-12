import axios from "./axios";

export const addCheque = async (payload) => {
  return await axios.post(`cheque/create-cheque`, payload);
};

export const chequeList = async () => {
  return await axios.get(`cheque/all-cheques`);
};

export const chequeByBankName = async (bankName, selectedUserId) => {
  console.log(" Selected Payload",selectedUserId)
  const payload = {bankName, selectedUserId}
  console.log("Tow Values From Payload",payload)
  return await axios.post(`cheque/by-bank`, payload)
  // return await axios.get(`cheque/by-bank/${bank}`, selectedUserId)
}

export const deleteCheque = async (id) => {
  return await axios.delete(`cheque/delete-cheque/${id}`)
}

export const updateCheque = async (id, payload) => {
  console.log("Service ID",id)
  return await axios.put(`cheque/update-cheque/${id}`, payload)
}




