import Axios from "../../libs/axios";

export function createCategory ({title, detail, icons, status = 1}){
  return Axios.post(process.env.REACT_APP_BACKEND_URL+"categories", {title, detail, icons, status});
}

export function getCategories (params){
  return Axios.get(process.env.REACT_APP_BACKEND_URL+"categories", params);
}

export function getCategory (id) {
  return Axios.get(process.env.REACT_APP_BACKEND_URL+"categories?id="+id);
}

export function updateCategory(id, data) {
  return Axios.put(process.env.REACT_APP_BACKEND_URL+"categories/"+id, data);
}

export function removeCategory(id) {
  return Axios.delete(process.env.REACT_APP_BACKEND_URL+"categories/"+id);
}

export function fileUpload(file) {
  return Axios.post(process.env.REACT_APP_BACKEND_URL+"categories/upload", file)
}
