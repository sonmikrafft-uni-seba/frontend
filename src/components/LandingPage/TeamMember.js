import React from 'react';
import {
  Avatar,
  Grid,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';

const TeamMember = (props) => {
  const theme = useTheme();

  return (
    <Grid container justify="flex-end" align="right" padding={1}>
      <ListItemText
        primaryTypographyProps={{
          fontSize: '18px',
          fontWeight: 'bold',
          pr: 4,
        }}
        secondaryTypographyProps={{ fontSize: '14px', pr: 4 }}
        primary={props.member.name}
        secondary={props.member.study_programm}
      />
      <ListItemAvatar>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            border: 2,
            borderColor: 'primary.main',
          }}
          src={props.member.img_src}
          component={Paper}
          elevation={2}
        />
      </ListItemAvatar>
    </Grid>
  );
};

export default connect()(TeamMember);
