import CONFIG from "./config";

const request = async (path) => {
  if(path.slice(0, 1) !== "/")
    path = "/" + path;

  let response = await fetch(`${CONFIG.endpoint}${path}`);
  if(!response.ok)
    throw Error(response.statusText);
  response = await response.json();
  return response;
}

export default request;
