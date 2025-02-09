import {
  faChevronDown,
  faChevronRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const TransactionList = ({ data, onDelete }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  if (!Array.isArray(data)) {
    return <p>Expenses will appear here!</p>;
  }
  return (
    <div className="flex flex-col dark:bg-gray-500 p-2 rounded shadow-md">
      <div className="flex items-center justify-between w-72">
        <span>Expenses</span>
        <span>
          Total: ${data.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)}
        </span>
        <button className="w-4" onClick={toggleList}>
          <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} />
        </button>
      </div>

      {isOpen && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <div className="flex w-72 my-1 justify-between pl-2 dark:bg-gray-300 rounded shadow-md">
                <span>{item.name}</span>
                <span>
                  ${item.amount}
                  <button onClick={() => onDelete(item.id)}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="px-2 text-red-500 hover:text-red-700"
                    />
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
