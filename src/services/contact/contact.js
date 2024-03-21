import Axios from "../../libs/axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL + "contacts";

export function createContact({name, phone, email, duration, service, stack, about, status = 1}) {
  return Axios.post(baseUrl, {name, phone, email, duration, service, stack, about, status});
}

export function getContacts(params) {
  return Axios.get(baseUrl, params);
}

export function getContact(id) {
  return Axios.get(baseUrl + "?id=" + id);
}

export function updateContact(id, data) {
  return Axios.put(baseUrl + "/" + id, data);
}

export function removeContact(id) {
  return Axios.delete(baseUrl + "/" + id);
}
