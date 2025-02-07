import { useEffect, useState } from 'react';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import IncomeExpenseInput from '../components/IncomeExpenseInput';
import { addTransaction } from '../api/transactions';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState();

  const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; // Get current theme for toastcontainer

  //decode userid from token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(parseInt(decodedToken.userId, 10)); //convert to int
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('showLoginToast') === 'true') {
      toast.success('You are now logged in!');
      setTimeout(() => {
        localStorage.removeItem('showLoginToast'); //Remove flag after delay to ensure the toast fires
      }, 500);
    }
  }, []);

  const handleAddExpense = () => {
    const type = 'Expense';
    if (userId) {
      addTransaction(name, amount, type, userId);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-center" theme={theme} />
      <main className="flex flex-col items-center pt-20 mx-auto p-4">
        <span className="text-lg font-bold">
          Finance Tracker - Login or Register to save!
        </span>
        <div className="flex flex-col items-center self-start">
          <span>Monthly Expenses</span>
          <IncomeExpenseInput
            onClick={handleAddExpense}
            setName={setName}
            setAmount={setAmount}
            name={name}
            amount={amount}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
