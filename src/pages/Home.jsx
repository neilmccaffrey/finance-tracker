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

  // get json web token on mount clear token from local storage if it is expired
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { exp, userId } = decodedToken;

        // Check if token is expired
        if (exp * 1000 < Date.now()) {
          localStorage.removeItem('token'); // Remove expired token
          setUserId(null); // Clear userId state
          console.log('Token expired and removed');
        } else {
          setUserId(parseInt(userId, 10)); // Set userId if token is valid
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Remove if decoding fails
        setUserId(null);
      }
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
