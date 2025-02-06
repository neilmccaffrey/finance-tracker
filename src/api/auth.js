const API_URL = 'http://localhost:5151/api/users'; // Adjust for production

export const registerUser = async (username, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, passwordHash: password }),
  });

  return response.json();
};
