import { Avatar, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Star } from '@mui/icons-material';

function FeatureElement(props) {
  const theme = useTheme();

  return (
    <>
      <ListItemAvatar>
        <Avatar
          sx={{ width: 48, height: 48 }}
          src={props.feature.img_src}
          component={Paper}
          elevation={2}
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ fontSize: '20px', pl: 4 }}
        primary={props.feature.title}
      />
    </>
  );
}

export default connect()(FeatureElement);
