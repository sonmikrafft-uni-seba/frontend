import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';
export default function VisualizationToggleGroup() {
  const [alignment, setAlignment] = React.useState('table');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="table">Table</ToggleButton>
      <ToggleButton value="charts">Charts</ToggleButton>
      <ToggleButton value="insights">insights</ToggleButton>
    </ToggleButtonGroup>
  );
}
