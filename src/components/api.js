const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "5dcf1aa1-8e2e-4665-9dbb-d84d3205566d",
    "Content-Type": "application/json",
  },
};

const checkResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => checkResult(res))
    .catch((err) => console.log(err));
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => checkResult(res))
    .catch((err) => console.log(err));
};

const editProfileData = (profileName, profileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    }),
  })
    .then((res) => checkResult(res))
    .catch((err) => console.log(err));
};

export { getInitialCards, getUserInfo, editProfileData };
