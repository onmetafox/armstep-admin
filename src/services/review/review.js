import Axios from "../../libs/axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL + "reviews"

export function createReview({logo, user, company, review, name, role, profile, status = 1}) {
  return Axios.post(baseUrl, {
    logo,
    user,
    company,
    review,
    name,
    role,
    profile,
    status
  });
}

export function getReviews(params) {
  return Axios.get(baseUrl, params);
}

export function getReview(id) {
  return Axios.get(baseUrl + "?id=" + id);
}

export function updateReview(id, data) {
  return Axios.put(baseUrl + "/" + id, data);
}

export function removeReview(id) {
  return Axios.delete(baseUrl + "/" + id);
}

export function reviewFileUpload(file) {
  return Axios.post(baseUrl + "/upload", file)
}
