export const saveToken = (token) => {
  localStorage.setItem('token', token);
}

export const getToken = () => {
  return localStorage.getItem('token');
}

export const removeToken = () => {
  return localStorage.removeItem('token');
}

export const defaultValidation = (obj) => {
  return Object.values(obj).some(field => !field)
}
