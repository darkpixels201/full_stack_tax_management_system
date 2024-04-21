import axios from "./axios";

export const addLedger = async (payload) => {
  return await axios.post(`ledger/create-ledger`, payload);
};


export const editLedger = async (id, payload) => {
  return await axios.put(`ledger/update-ledger/${id}`, payload);
};


export const LedgerByCompany = async (payload) => {
  return await axios.get(`ledger/get-ledgers-by-company/${payload}`);
};

export const LedgerById = async (payload) => {
  return await axios.get(`ledger/ledgers-by-company/${payload}`);
};


export const deleteLedger = async (id) => {
  return await axios.delete(`ledger/delete-ledger/${id}`);
};


export const accessToDeleteLedger = async (id, payload) => {
  return await axios.put(`ledger/update-access/${id}`, payload);
};