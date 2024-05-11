import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  let token = localStorage.getItem("token");
  if (token) return token;
  else return null;
};

export const getDecodedToken = () => {
  try {
    const token = getToken();
    if (!token) return null;
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

const GET = (url, body, config = {}) => {
  console.log("APIIIIIIIIIIIIIIIII GETTTTT", url, body, { ...config });
  return axiosApi.get(url, {
    ...config,
    headers: { authorization: "Bearer " + getToken() },
  });
};
const DELETE = (url, body, config = {}) => {
  return axiosApi.delete(url, {
    ...config,
    headers: { authorization: "Bearer " + getToken() },
  });
};
const POST = (url, body, config = {}) => {
  console.log("APIIIIIIIIIIIIIIIII", url, body, { ...config });
  return axiosApi.post(
    url,
    { ...body },
    {
      headers: { ...config, authorization: "Bearer " + getToken() },
    }
  );
};
const PostFile = (url, body, config = {}) => {
  return axiosApi.post(url, body, {
    ...config,
    headers: { authorization: "Bearer " + getToken() },
  });
};
export { GET, POST, DELETE, PostFile };
