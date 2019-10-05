const getErrorMessage = error => {
  const { message } = error.response.data || {};

  return message || error.toString();
};

export default getErrorMessage;
