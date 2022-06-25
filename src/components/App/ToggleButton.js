import * as React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function VisualizationToggleGroup() {
  const [selectedOption, setSelectedOption] = React.useState('table');
  const changeSelectedOption = (event, newOption) => {
    setSelectedOption(newOption);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={selectedOption}
      exclusive
      onChange={changeSelectedOption}
    >
      <ToggleButton value="table">Table</ToggleButton>
      <ToggleButton value="charts">Charts</ToggleButton>
      <ToggleButton value="insights">insights</ToggleButton>
    </ToggleButtonGroup>
  );
}
