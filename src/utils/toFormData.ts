/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
export const toFormData = (data: { [key: string]: any }) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};
