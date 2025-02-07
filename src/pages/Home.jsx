import { useEffect } from 'react';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import IncomeExpenseInput from '../components/IncomeExpenseInput';

const Home = () => {
  const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; // Get current theme for toastcontainer

  useEffect(() => {
    if (localStorage.getItem('showLoginToast') === 'true') {
      toast.success('You are now logged in!');
      setTimeout(() => {
        localStorage.removeItem('showLoginToast'); //Remove flag after delay to ensure the toast fires
      }, 500);
    }
  }, []);

  const handleAddExpense = () => {
    return;
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
          <IncomeExpenseInput onClick={handleAddExpense} />
        </div>
      </main>
    </>
  );
};

export default Home;
