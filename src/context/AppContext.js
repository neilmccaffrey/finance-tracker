import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setExpenses([]);
        setIncome([]);
      }
      setToken(token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addExpense = (expenseName, expenseAmount, id) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { id, name: expenseName, amount: expenseAmount },
    ]);
    console.log('Updated Expenses:'); // log here
  };

  const addIncome = (incomeName, incomeAmount, id) => {
    setIncome((prevIncome) => [
      ...prevIncome,
      { id, name: incomeName, amount: incomeAmount },
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setExpenses([]);
    setIncome([]);
  };

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        expenses,
        setExpenses,
        income,
        setIncome,
        handleLogout,
        addExpense,
        addIncome,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
