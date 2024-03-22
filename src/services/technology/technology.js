import Axios from "../../libs/axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL + "technologies"

export function createTechnology({title, logo, category, status = 1}) {
  return Axios.post(baseUrl, {
    title,
    logo,
    category,
    status
  });
}

export function getTechnologies(params) {
  return Axios.get(baseUrl, params);
}

export function getTechnology(id) {
  return Axios.get(baseUrl + "?id=" + id);
}

export function updateTechnology(id, data) {
  return Axios.put(baseUrl + "/" + id, data);
}

export function removeTechnology(id) {
  return Axios.delete(baseUrl + "/" + id);
}

export function techFileUpload(file) {
  return Axios.post(baseUrl + "/upload", file)
}
