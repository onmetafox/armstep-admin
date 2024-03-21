import Axios from "../../libs/axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL + "services"

export function createService({title, subtitle, icon, intro, detail, content, subcontent, category, status = 1}) {
  return Axios.post(baseUrl, {
    title,
    subtitle,
    icon,
    intro,
    detail,
    content,
    subcontent,
    category,
    status
  });
}

export function getServices(params) {
  return Axios.get(baseUrl, params);
}

export function getService(id) {
  return Axios.get(baseUrl + "?id=" + id);
}

export function updateService(id, data) {
  return Axios.put(baseUrl + "/" + id, data);
}

export function removeService(id) {
  return Axios.delete(baseUrl + "/" + id);
}

export function serviceFileUpload(file) {
  return Axios.post(baseUrl + "/upload", file)
}
