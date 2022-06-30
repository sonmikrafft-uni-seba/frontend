import React, { useEffect } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Box,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';

export default function NewCategoryGroupForm(props) {
  const [categoryGroupName, setCategoryGroupName] = React.useState('');
  const [budgetLimit, setBudgetlimit] = React.useState('');
  const [budgetType, setBudgetType] = React.useState('MONTHLY');
  // const categories = useSelector((state) => state.user.user.categoryGroups.categories);
  const mockcategories = ['category 1', 'category 2'];
  const [includedCategories, setIncludedCategories] = React.useState([]);

  const onChangeCategoryGroupName = (e) => {
    setCategoryGroupName(e.target.value);
  };
  const onChangeBudgetLimit = (e) => {
    setBudgetlimit(e.target.value);
  };

  const onChangeBudgetType = (e) => {
    setBudgetType(e.target.value);
  };

  const onSave = () => {
    props.onSaveCategoryGroup(
      categoryGroupName,
      budgetLimit,
      budgetType,
      includedCategories
    );
  };
  useEffect(() => {
    if (props.notifySave) {
      onSave();
    }
  }, [props.notifySave]);

  return (
    <form>
      <Grid container spacing={0}>
        <Grid item sx={{ py: 1 }} xs={2}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            pt={2}
          >
            <Typography>Name of category group:</Typography>
          </Box>
        </Grid>
        <Grid item sx={{ py: 1 }} xs={10}>
          <TextField
            variant="outlined"
            required
            id="categoryName"
            label="Category group name"
            name="categoryGroupName"
            autoComplete=""
            value={categoryGroupName}
            onChange={onChangeCategoryGroupName}
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
        <Grid item sx={{ py: 3 }} xs={2}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            pt={2}
          >
            <Typography>Categories:</Typography>
          </Box>
        </Grid>
        <Grid item sx={{ py: 3 }} xs={6}>
          <Autocomplete
            multiple
            id="category"
            options={mockcategories}
            // options={categories}
            getOptionLabel={(option) => option}
            value={includedCategories}
            onChange={(event, newValue) => {
              setIncludedCategories(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Included Categories"
                placeholder="Add categories"
              />
            )}
          ></Autocomplete>
        </Grid>
      </Grid>
    </form>
  );
}
