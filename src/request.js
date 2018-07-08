const request = async (url) => {
  let response = await fetch(url);
  if(!response.ok)
    throw Error(response.statusText);
  response = await response.json();
  return response;
}
export default request;
