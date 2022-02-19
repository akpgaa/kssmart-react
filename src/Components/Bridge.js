import http from "../Config/http"
import { ACCESS_POINT } from "../Config"


const DataUpdate = async (table, data, id = 'id') => {
  const result = await http.put(ACCESS_POINT + `/web/DataUpdate/${table}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
};

const loginCheck = async (name, pass) => {
  let array = { name, pass };
  const result = await http.put(ACCESS_POINT + "/web/loginCheck", array);
  return result.data;
};

const DataUpdate1 = async (table, data, id = 'id') => {
  const result = await http.put(ACCESS_POINT + `/web/DataUpdate/${table}/${id}`, data)
  return result;
};

const GetData = async (type, data) => {
  const result = await http.post(ACCESS_POINT + `/web/GetData/${type}`, data)
  return result.data
}

const Delete = async (data) => {
  const result = await http.post(ACCESS_POINT + `/web/delete`, data)
  return result.data
}



export default {
  DataUpdate,
  DataUpdate1,
  GetData,
  Delete,
  loginCheck
}