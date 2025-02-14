import {
  faChevronDown,
  faChevronRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const TransactionList = ({ data, onDelete, flag }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col dark:bg-gray-500 p-2 rounded shadow-md w-full">
      <div className="flex items-center justify-between">
        <span>{flag}</span>
        <span>
          Total: $
          {data
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
            .toFixed(2)}
          {/* tofixed to ensure only 2 decimals */}
        </span>
        <button className="w-4" onClick={toggleList}>
          <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} />
        </button>
      </div>
      {isOpen && (
        <ul>
          {data.map((item) => {
            return (
              <li key={item.id}>
                <div className="flex w-72 my-1 justify-between pl-2 dark:bg-gray-300 rounded shadow-md">
                  <span>{item.name}</span>
                  <span>
                    {/* tofixed to ensure only 2 decimals */}$
                    {parseFloat(item.amount).toFixed(2)}
                    {/* send item id and flag to delete item and update list dynamically */}
                    <button onClick={() => onDelete(item.id, flag)}>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="px-2 text-red-500 hover:text-red-700"
                      />
                    </button>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
