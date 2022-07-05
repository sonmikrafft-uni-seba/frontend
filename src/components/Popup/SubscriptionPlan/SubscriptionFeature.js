import React from 'react';
import { Avatar, ListItemAvatar, ListItemText } from '@mui/material';
import {
  Star,
  Timeline,
  Edit,
  NotificationImportant,
  Campaign,
  AutoGraph,
  Settings,
  NotificationsActive,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';

const SubscriptionFeature = (props) => {
  const theme = useTheme();

  const avatarSelector = () => {
    switch (props.feature.avatarNumber) {
      case 0:
        return <Timeline />;
      case 1:
        return <Edit />;
      case 2:
        return <NotificationImportant />;
      case 3:
        return <Campaign />;
      case 4:
        return <AutoGraph />;
      case 5:
        return <Settings />;
      case 6:
        return <NotificationsActive />;
      case 7:
        return <Star />;
      default:
        return <Star />;
    }
  };

  return (
    <>
      <ListItemAvatar>
        <Avatar>{avatarSelector()}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ fontSize: '14px', fontWeight: 'bold' }}
        secondaryTypographyProps={{ fontSize: '10px' }}
        primary={props.feature.title}
        secondary={props.feature.description}
      />
    </>
  );
};

export default connect()(SubscriptionFeature);
