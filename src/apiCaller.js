import axios from "axios";
const endpoint = process.env.REACT_APP_API_ENDPOINT;

export async function getWithToken(url, token) {
  return await axios.get(endpoint + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function post(url, body) {
  return await axios.post(endpoint + url, body, {
    headers: {
      "Content-type": "application/json",
    },
  });
}
export async function postWithToken(url, body, token) {
  return await axios.post(endpoint + url, body, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function putWithToken(url, body, token) {
  return await axios.put(endpoint + url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
}

export async function putAvatar(url, body) {
  return await axios.put(endpoint + url, body, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
}

export async function postMessageFile(url, body, token) {
  return await axios.post(endpoint + url, body, {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function downloadMessageFile(url, token) {
  return await axios.get(endpoint + url, {
    headers: {
      responseType: "blob",
      Authorization: `Bearer ${token}`,
    },
  });
}
