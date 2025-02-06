import { useEffect } from 'react';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

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

  return (
    <>
      <Header />
      <ToastContainer position="top-center" theme={theme} />
      <main className="pt-20 mx-auto p-4">
        <h1>Kamehameha!</h1>
      </main>
    </>
  );
};

export default Home;
