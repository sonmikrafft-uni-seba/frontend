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
  const [formatCorrect, setFormatCorrect] = React.useState(true);
  const [validGroupName, setValidGroupName] = React.useState(true);
  const [includedCategoryNames, setIncludedCategoryNames] = React.useState([]);
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);

  // Categories are categories that are currently assigned with "No Group", and the category with name "Uncategorized" is our default category and cannot be reassigned
  const categories = categoryGroups[0].categories.flat();
  let categoryNames = categories.map((item) => item.name);
  categoryNames = categoryNames.filter(function (element) {
    return element !== 'Uncategorized';
  });

  // This regular expression only allows number with 2 digits
  const eurRegEx = /(^[0-9]+\.{0,1}[0-9]{0,2}$)/;

  useEffect(() => {
    props.setSaveable(
      categoryGroupName.length != 0 && formatCorrect && validGroupName
    );
  }, [categoryGroupName]);

  // I violently prevent group being named "No Group" here because it will lead to problems
  const onChangeCategoryGroupName = (e) => {
    setCategoryGroupName(e.target.value);
    if (e.target.value == 'No Group') {
      setValidGroupName(false);
    } else {
      setValidGroupName(true);
    }
  };
  const onChangeBudgetLimit = (e) => {
    if (e.target.value.match(eurRegEx) || e.target.value.trim().length == 0) {
      setBudgetlimit(e.target.value);
      setFormatCorrect(true);
    } else {
      setFormatCorrect(false);
    }
  };

  const onChangeBudgetType = (e) => {
    setBudgetType(e.target.value);
  };

  const onSave = () => {
    let includedCategories = [];
    includedCategoryNames.forEach((name) => {
      const index = categories.findIndex((category) => category.name === name);
      includedCategories.push(categories[index]);
    });

    props.onSaveCategoryGroup(
      categoryGroupName,
      budgetLimit,
      budgetType,
      includedCategories,
      includedCategoryNames
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
            options={categoryNames}
            getOptionLabel={(option) => option}
            value={includedCategoryNames}
            onChange={(event, newValue) => {
              setIncludedCategoryNames(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Add categories"
                placeholder="Add categories"
              />
            )}
          ></Autocomplete>
        </Grid>
      </Grid>
    </form>
  );
}
