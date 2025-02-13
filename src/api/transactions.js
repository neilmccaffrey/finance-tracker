const API_URL = process.env.REACT_APP_API_URL;

export const addTransaction = async (name, amount, type, userId, itemId) => {
  const transaction = {
    id: itemId,
    name: name,
    amount: parseFloat(amount), // Convert amount to float
    type: type,
    userId: userId,
  };

  const response = await fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    credentials: 'include',
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
    const response = await fetch(
      `${API_URL}/api/transactions/user/${userId}/expenses`
    );
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

//fetch income from DB
export const fetchUserIncome = async (userId) => {
  try {
    const response = await fetch(
      `${API_URL}/api/transactions/user/${userId}/income`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch income');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching income:', error);
    return [];
  }
};

//delete item
export const deleteItem = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/api/transactions/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Successfully deleted item
      console.log('Item deleted successfully');
    } else {
      // Handle error
      console.error('Error deleting item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
