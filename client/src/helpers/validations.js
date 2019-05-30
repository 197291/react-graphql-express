export const defaultValidation = (obj) => {
  return Object.values(obj).some((field) => !field);
};
