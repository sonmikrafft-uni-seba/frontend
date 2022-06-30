import React, { useEffect } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Autocomplete,
} from '@mui/material';

export default function NewCategoryForm(props) {
  const [categoryName, setCategoryName] = React.useState('');
  const [budgetLimit, setBudgetlimit] = React.useState('');
  const [budgetType, setBudgetType] = React.useState('MONTHLY');
  const [categoryGroup, setCategoryGroup] = React.useState('Food');
  const [keywords, setKeywords] = React.useState([]);
  const onChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
  };
  const onChangeBudgetLimit = (e) => {
    setBudgetlimit(e.target.value);
  };
  const onChangeBudgetType = (e) => {
    setBudgetType(e.target.value);
  };
  const onChangeCategoryGroup = (e) => {
    setCategoryGroup(e.target.value);
  };

  const onSave = () => {
    props.onSaveCategory(
      categoryName,
      budgetLimit,
      budgetType,
      keywords,
      categoryGroup
    );
  };

  useEffect(() => {
    if (props.notifySave) {
      onSave();
    }
  }, [props.notifySave]);
  return (
    <Grid container py={1} alignItems="flex-start" justifyContent="flex-start">
      <Grid item sx={{ py: 1 }} xs={2}>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          pt={2}
        >
          <Typography>Name of category:</Typography>
        </Box>
      </Grid>
      <Grid item sx={{ py: 1 }} xs={10}>
        <TextField
          variant="outlined"
          required
          id="categoryName"
          label="Category Name"
          name="categoryName"
          autoComplete=""
          value={categoryName}
          onChange={onChangeCategoryName}
        ></TextField>
      </Grid>
      <Grid item sx={{ py: 1 }} xs={2}>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          pt={2}
        >
          <Typography>Budget limit in €:</Typography>
        </Box>
      </Grid>
      <Grid item sx={{ py: 1 }} xs={3}>
        <TextField
          variant="outlined"
          id="budgetLimit"
          label="Budget limit"
          name="budgetLimit"
          autoComplete=""
          value={budgetLimit}
          onChange={onChangeBudgetLimit}
        ></TextField>
      </Grid>
      <Grid item sx={{ py: 1 }} xs={7}>
        <FormControl>
          <InputLabel id="budget-type-select-label">Budget type</InputLabel>
          <Select
            labelId="budget-type-select-label"
            id="budget-type-select"
            value={budgetType}
            label="Budget type"
            onChange={onChangeBudgetType}
          >
            <MenuItem value={'MONTHLY'}>
              <Typography>Monthly</Typography>
            </MenuItem>
            <MenuItem value={'YEARLY'}>
              <Typography>Yearly</Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ py: 1 }} xs={2}>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          pt={2}
        >
          <Typography>Part of group:</Typography>
        </Box>
      </Grid>
      <Grid item sx={{ py: 1 }} xs={10}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <FormControl>
            <InputLabel id="category-group-select-label">
              Choose a category group
            </InputLabel>
            <Select
              labelId="category-group-select-label"
              id="category-group-select"
              fullWidth
              value={categoryGroup}
              label="Category group"
              onChange={onChangeCategoryGroup}
            >
              <MenuItem value={'Food'}>
                <Typography>Food</Typography>
              </MenuItem>
              <MenuItem value={'Hobby'}>
                <Typography>Hobby</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item sx={{ py: 3 }} xs={2}>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          pt={2}
        >
          <Typography>Add Keyword:</Typography>
        </Box>
      </Grid>
      <Grid item sx={{ py: 3 }} xs={5}>
        <Autocomplete
          multiple
          freeSolo
          id="keywords"
          options={keywords}
          getOptionLabel={(option) => option}
          value={keywords}
          onChange={(event, newValue) => {
            setKeywords(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Keywords for filtering this category later on"
              placeholder="Type and press enter to add a keyword"
            />
          )}
        ></Autocomplete>
      </Grid>
    </Grid>
  );
}
