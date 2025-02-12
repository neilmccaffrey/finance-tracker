import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import IncomeExpenseInput from '../components/IncomeExpenseInput';
import {
  addTransaction,
  deleteItem,
  fetchUserExpenses,
  fetchUserIncome,
} from '../api/transactions';
import { jwtDecode } from 'jwt-decode';
import TransactionList from '../components/TransactionList';
import { AppContext } from '../context/AppContext';
import BarChart from '../components/BarChart';
import { v4 as uuidv4 } from 'uuid';
import FinancialNews from '../components/FinancialNews';

const Home = () => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [incomeName, setIncomeName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [userId, setUserId] = useState('');
  const {
    income,
    setIncome,
    expenses,
    setExpenses,
    token,
    addExpense,
    addIncome,
    setToken,
  } = useContext(AppContext);
  const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; // Get current theme for toastcontainer
  const monthlyTotal = (
    income.reduce((acc, curr) => acc + parseFloat(curr.amount), 0) -
    expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
  ).toFixed(2);

  // get json web token on mount clear token from local storage if it is expired
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { exp, userId } = decodedToken;

        // Check if token is expired
        if (exp * 1000 < Date.now()) {
          localStorage.removeItem('token'); // Remove expired token
          setUserId(null); // Clear userId state
          setToken(null); //clear token
        } else {
          const parsedUserId = parseInt(userId, 10);
          setUserId(parsedUserId); // Set userId if token is valid
          //if valid token fetch expenses/income
          const getExpenses = async () => {
            setExpenses(await fetchUserExpenses(parsedUserId));
          };
          getExpenses();
          const getIncome = async () => {
            setIncome(await fetchUserIncome(parsedUserId));
          };
          getIncome();
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Remove if decoding fails
        setUserId(null);
      }
    }
  }, [userId]);

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
    const itemId = uuidv4();
    //if user is logged in add to DB
    if (userId) {
      addTransaction(expenseName, expenseAmount, type, userId, itemId);
    }

    addExpense(expenseName, expenseAmount, itemId); //update expense state in context

    setExpenseName('');
    setExpenseAmount('');
  };

  const handleAddIncome = () => {
    const type = 'Income';
    const itemId = uuidv4();
    //if user is logged in add to DB
    if (userId) {
      addTransaction(incomeName, incomeAmount, type, userId, itemId);
    }

    addIncome(incomeName, incomeAmount, itemId); //update income state in context

    setIncomeName('');
    setIncomeAmount('');
  };

  const handleOnDelete = (itemId, flag) => {
    //delete item
    if (userId) {
      deleteItem(itemId);
    }
    //update correct list based on flag
    if (flag === 'Income') {
      const updatedIncome = income.filter((item) => item.id !== itemId);
      setIncome(updatedIncome);
    }
    if (flag === 'Expenses') {
      const updatedExpenses = expenses.filter((item) => item.id !== itemId);
      setExpenses(updatedExpenses);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-center" theme={theme} />
      <main className="flex flex-col items-center mt-10 md:mt-20 mx-auto p-4">
        {!token ? (
          <span className="md:text-lg font-bold">
            Finance Tracker - Login or Register to save!
          </span>
        ) : (
          <span className="text-lg font-bold">Finance Tracker</span>
        )}
        <div className="flex w-full flex-col lg:flex-row">
          <div className="flex flex-col items-center self-start">
            <div className="flex flex-col items-center self-start">
              <span>Monthly Income</span>
              <IncomeExpenseInput
                onClick={handleAddIncome}
                name={incomeName}
                setName={setIncomeName}
                amount={incomeAmount}
                setAmount={setIncomeAmount}
              />
              <TransactionList
                data={income}
                flag={'Income'}
                onDelete={handleOnDelete}
              />
            </div>
            <div className="flex flex-col items-center self-start">
              <span>Monthly Expenses</span>
              <IncomeExpenseInput
                onClick={handleAddExpense}
                name={expenseName}
                setName={setExpenseName}
                amount={expenseAmount}
                setAmount={setExpenseAmount}
              />
              <TransactionList
                data={expenses}
                flag={'Expenses'}
                onDelete={handleOnDelete}
              />
            </div>
            <div className="flex self-end dark:bg-gray-500 p-2 rounded shadow-md mt-2">
              Monthly total:
              <span
                className={`ml-2
                  ${
                    monthlyTotal > 0
                      ? 'text-green-500'
                      : monthlyTotal < 0
                        ? 'text-red-500'
                        : 'text-gray-500'
                  }`}
              >
                {monthlyTotal}
              </span>
            </div>
          </div>
          <div className="w-full h-48 md:h-72 md:ml-16">
            <BarChart income={income} expenses={expenses} />
          </div>
          <div className="flex flex-col items-center mr-10">
            <span className="text-xl font-bold">Top Financial News</span>
            <FinancialNews />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
