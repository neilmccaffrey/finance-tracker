const API_URL = process.env.API_URL;

export const registerUser = async (username, password) => {
  console.log('API_URL', process.env.API_URL);
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
};
