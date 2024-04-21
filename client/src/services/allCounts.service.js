import axios from './axios'

export const allCounts = async () => {
    return await axios.get(`get_count`);
  };