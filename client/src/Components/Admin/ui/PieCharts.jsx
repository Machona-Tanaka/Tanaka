import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  return <Pie options={options} data={data} />;
};

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default PieChart;