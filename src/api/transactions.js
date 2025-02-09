const API_URL = 'http://localhost:5151/api/transactions'; // Adjust for production

export const addTransaction = async (name, amount, type, userId) => {
  const transaction = {
    name: name,
    amount: parseFloat(amount), // Convert amount to float
    type: type,
    userId: userId,
  };

  console.log(transaction);

  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });

  if (response.ok) {
    const addedTransaction = await response.json();
    console.log('Transaction added:', addedTransaction);
  } else {
    console.error('Failed to add transaction');
  }
};

//fetch expenses from DB
export const fetchUserExpenses = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}/expenses`);
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};
