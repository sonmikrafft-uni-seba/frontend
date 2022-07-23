import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const VisualisationToggle = (props) => {
  return (
    <FormGroup sx={{ marginLeft: '10px' }}>
      <FormControlLabel
        control={<Switch />}
        label="Charts"
        labelPlacement="start"
        checked={props.charts}
        disabled={props.disabled}
        onChange={() => {
          props.setCharts(!props.charts);
        }}
      />
    </FormGroup>
  );
};

export default VisualisationToggle;
