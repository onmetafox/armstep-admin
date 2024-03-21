import Axios from "../../libs/axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL + "projects"

export function createProject({title, thumb, img, services, industry, platform, client, overview, link, team, duration, stacks, result, status = 1}) {
  return Axios.post(baseUrl, {
    title,
    thumb,
    img,
    services,
    industry,
    platform,
    client,
    overview,
    link,
    team,
    duration,
    stacks,
    result,
    status
  });
}

export function getProjects(params) {
  return Axios.get(baseUrl, params);
}

export function getProject(id) {
  return Axios.get(baseUrl + "?id=" + id);
}

export function updateProject(id, data) {
  return Axios.put(baseUrl + "/" + id, data);
}

export function removeProject(id) {
  return Axios.delete(baseUrl + "/" + id);
}

export function projectFileUpload(file) {
  return Axios.post(baseUrl + "/upload", file)
}
