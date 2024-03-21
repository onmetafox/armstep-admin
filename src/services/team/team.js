import Axios from "../../libs/axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL + "teams"

export function createTeam({name, role, imgUrl, upwork, linkedin, contra, about, stacks, status = 1}) {
  return Axios.post(baseUrl, {
    name,
    role,
    imgUrl,
    upwork,
    linkedin,
    contra,
    about,
    stacks,
    status
  });
}

export function getTeams(params) {
  return Axios.get(baseUrl, params);
}

export function getTeam(id) {
  return Axios.get(baseUrl + "?id=" + id);
}

export function updateTeam(id, data) {
  return Axios.put(baseUrl + "/" + id, data);
}

export function removeTeam(id) {
  return Axios.delete(baseUrl + "/" + id);
}

export function teamFileUpload(file) {
  return Axios.post(baseUrl + "/upload", file)
}
