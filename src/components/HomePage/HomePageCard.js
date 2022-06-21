import * as React from 'react';
import { Container, Box } from '@material-ui/core';
import TransactionTable from './TransactionTable';
import VisualizationToggleGroup from './ToggleButton';
export default function HomePageCard() {
  return (
    <Container>
      <Box
        sx={{
          pl: 40,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            py: 6,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <VisualizationToggleGroup />
        </Box>
        <TransactionTable />
      </Box>
    </Container>
  );
}
