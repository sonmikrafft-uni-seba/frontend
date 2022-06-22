import * as React from 'react';
import { Container, Box } from '@material-ui/core';
import TransactionTable from './TransactionTable';
import VisualizationToggleGroup from './ToggleButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@mui/material/styles';
import { outerTheme } from './HomePageTheme';
export default function HomePageCard() {
  return (
    <Container>
      <ThemeProvider theme={outerTheme}>
        <Box
          sx={{
            pl: 40,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              py: 4,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <VisualizationToggleGroup />
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              New Transaction
            </Button>
          </Box>
          <TransactionTable />
        </Box>
      </ThemeProvider>
    </Container>
  );
}
