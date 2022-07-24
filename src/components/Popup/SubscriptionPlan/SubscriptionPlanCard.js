import React from 'react';
import { Typography, Paper, Box, List, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import SubscriptionFeature from './SubscriptionFeature';

const SubscriptionPlanCard = (props) => {
  const theme = useTheme();
  const highlightcolor = props.isPremium
    ? '#6dcc97'
    : theme.palette.primary.main;
  const features = props.subscription.features;

  return (
    <Paper elevation={2}>
      <Box
        sx={{
          minHeight: 550,
          pl: 1,
          pr: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box padding={1}>
          <Typography
            variant="h5"
            color={theme.palette.primary.main}
            sx={{ fontWeight: 'bold' }}
          >
            {props.subscription.title}
          </Typography>
          <Typography
            variant="h5"
            color={theme.palette.primary.main}
            sx={{ fontWeight: 'bold' }}
          >
            PLAN
          </Typography>
        </Box>

        <Box
          sx={{
            height: 64,
          }}
        >
          <Typography>{props.description}</Typography>{' '}
        </Box>

        <Box
          sx={{
            height: 64,
          }}
        >
          <Typography
            variant="h5"
            color={highlightcolor}
            sx={{ fontWeight: 'bold' }}
          >
            {props.subscription.cost}
          </Typography>
          <Typography
            variant="h5"
            color={highlightcolor}
            sx={{ fontWeight: 'bold' }}
          >
            per month
          </Typography>
        </Box>

        <List>
          {features.map((feature) => (
            <ListItem key={feature.title}>
              <SubscriptionFeature feature={feature} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default connect()(SubscriptionPlanCard);
