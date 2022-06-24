import * as React from 'react';
import { Container, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TransactionTable from './TransactionTable';
import VisualizationToggleGroup from './ToggleButton';

export default function ApplicationContentContainer() {
  return (
    <Container>
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
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            New Transaction
          </Button>
        </Box>
        <TransactionTable />
      </Box>
    </Container>
  );
}
