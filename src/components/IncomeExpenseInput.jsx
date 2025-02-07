import { useState } from 'react';
import Button from './Button';

const IncomeExpenseInput = ({ onClick }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value) {
      value = (parseInt(value) / 100).toFixed(2); // Convert to currency format
    }
    setAmount(value);
  };

  return (
    <div className="flex items-center gap-2 dark:bg-gray-500 p-2 rounded shadow-md">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="pl-2 w-32 dark:bg-gray-300 rounded shadow-md"
      />
      <input
        value={amount}
        onChange={handleAmountChange}
        placeholder="$0.00"
        className="pl-2 w-16 dark:bg-gray-300 rounded shadow-md"
      />
      <Button onClick={onClick} variant="small">
        Add
      </Button>
    </div>
  );
};

export default IncomeExpenseInput;
