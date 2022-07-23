import React from 'react';
import { Paper, Box, Stack, Divider } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { connect, useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from 'chart.js';
import { styled } from '@mui/material/styles';
import BalanceIndicator from './BalanceIndicator';
import VisualisationToggle from './VisualisationToggle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Charts = (props) => {
  const context = props.context();
  const [charts, setCharts] = React.useState(false);
  const categories = useSelector((state) =>
    state.user.user.categoryGroups.map((group) => group.categories).flat()
  );

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderOverviewCharts = () => {
    var last7days = [];

    for (var i = 14; i > 0; i--) {
      last7days.push(
        new Date(new Date().setDate(new Date().getDate() - i)).toISOString()
      );
    }

    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    const labels = last7days.map(
      (date) =>
        `${new Date(date).getDate() + 1}.${new Date(date).getMonth() + 1}`
    );

    var data = {
      labels,
      datasets: categories.map((category) => {
        return {
          label: category.name,
          data: last7days.map((date) => {
            return props.transactions
              .filter((transaction) => {
                return (
                  new Date(date) < new Date(transaction.valueDate) &&
                  new Date(transaction.valueDate) <
                    new Date().setDate(new Date(date).getDate() + 1) &&
                  category._id == transaction.categoryID
                );
              })
              .reduce((sum, transaction) => {
                return sum + transaction.transactionAmount;
              }, 0);
          }),

          backgroundColor: getRandomColor(),
        };
      }),
    };

    return (
      <Item sx={{ width: '100%', maxHeight: '200px' }}>
        <Bar options={options} data={data} />;
      </Item>
    );
  };

  const renderGroupCharts = () => {
    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
      },
      responsive: true,
    };

    var data = {
      labels: [],
      datasets: [
        {
          label: '# Sum of Costs',
          data: [],
          backgroundColor: [],
        },
      ],
    };

    if (context.group.categories <= 0) return;

    context.group.categories.forEach((category) => {
      data.labels.push(category.name);
      data.datasets[0].data.push(
        props.transactions.reduce((sum, transaction) => {
          if (transaction.categoryID == category._id) {
            return sum + transaction.transactionAmount;
          }
          return sum;
        }, 0)
      );
      data.datasets[0].backgroundColor.push(getRandomColor());
    });

    return (
      <Item>
        <Pie
          style={{ maxHeight: '200px', width: '100%' }}
          options={options}
          data={data}
        />
      </Item>
    );
  };

  const renderCategoryCharts = () => {
    var last7days = [];

    for (var i = 14; i > 0; i--) {
      last7days.push(
        new Date(new Date().setDate(new Date().getDate() - i)).toISOString()
      );
    }

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    const labels = last7days.map(
      (date) =>
        `${new Date(date).getDate() + 1}.${new Date(date).getMonth() + 1}`
    );

    var data = {
      labels,
      datasets: [
        {
          label: context.category.name,
          data: last7days.map((date) => {
            return props.transactions
              .filter((transaction) => {
                return (
                  new Date(date) < new Date(transaction.valueDate) &&
                  new Date(transaction.valueDate) <
                    new Date().setDate(new Date(date).getDate() + 1)
                );
              })
              .reduce((sum, transaction) => {
                return sum + transaction.transactionAmount;
              }, 0);
          }),

          backgroundColor: 'rgb(47, 98, 172)',
          stack: context.category.name,
        },
      ],
    };

    if (props.transactions.length > 0)
      return (
        <Item sx={{ width: '100%', maxHeight: '200px' }}>
          <Bar options={options} data={data} />;
        </Item>
      );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <BalanceIndicator
            transactions={props.transactions}
            viewedBudget={props.viewedBudget}
          />
          <Box sx={{ flexGrow: 1 }}></Box>
          <VisualisationToggle
            charts={charts}
            disabled={props.transactions.length == 0}
            setCharts={setCharts}
          />
        </Box>
        <Divider />
        {charts && (
          <Stack direction="row" spacing={2}>
            {context.category != null && renderCategoryCharts()}
            {context.category == null &&
              context.group != null &&
              renderGroupCharts()}
            {context.category == null &&
              context.group == null &&
              renderOverviewCharts()}
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

export default connect()(Charts);
