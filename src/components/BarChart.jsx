import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ income, expenses }) => {
  const totalIncome = income
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
    .toFixed(2);
  const totalExpenses = expenses
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
    .toFixed(2);

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [totalIncome, totalExpenses],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'], // Green for income, red for expenses
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'], // Green for income, red for expenses
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Make bar chart horizontal
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: true,
        text: 'Monthly Income vs Expenses', // Chart title
        color: 'rgb(59, 130, 246)',
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Start the x-axis at 0
        ticks: {
          color: 'rgb(59, 130, 246)',
        },
      },
      y: {
        ticks: {
          color: 'rgb(59, 130, 246)',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
