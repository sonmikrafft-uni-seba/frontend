import {
  AppBar,
  Box,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { LandingPageTexts } from './text';
import FeatureElement from './FeatureElement';

function FeaturesPaper(props) {
  const theme = useTheme();

  return (
    <Paper elevation={10} sx={{ borderRadius: '16px' }}>
      <Box
        sx={{
          minHeight: 550,
          padding: 2,
          pt: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List>
          {LandingPageTexts.features.map((feature, i) => (
            <ListItem key={i}>
              <FeatureElement feature={feature} />
            </ListItem>
          ))}
        </List>

        <Box padding={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{
              maxHeight: '100px',
              minHeight: '75px',
              fontSize: '20px',
            }}
            onClick={props.onClickExploreNow}
          >
            EXPLORE NOW
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default connect()(FeaturesPaper);
