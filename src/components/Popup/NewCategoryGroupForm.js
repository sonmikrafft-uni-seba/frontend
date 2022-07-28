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
import { BudgetType, defaultCategoryName } from '../../constants';

export default function NewCategoryGroupForm(props) {
  const EDIT = props.categoryGroup != null;

  const [categoryGroupName, setCategoryGroupName] = React.useState(
    EDIT ? props.categoryGroup.name : ''
  );
  const [budgetLimit, setBudgetlimit] = React.useState(
    EDIT ? props.categoryGroup.budgetLimit : ''
  );
  const [budgetType, setBudgetType] = React.useState(
    EDIT ? props.categoryGroup.budgetType : BudgetType.MONTHLY
  );
  const [formatCorrect, setFormatCorrect] = React.useState(true);
  const [validGroupName, setValidGroupName] = React.useState(true);
  const [includedCategoryNames, setIncludedCategoryNames] = React.useState(
    EDIT ? props.categoryGroup.categories.map((cat) => cat.name).flat() : []
  );
  const categoryGroups = useSelector((state) => state.user.user.categoryGroups);
  const existingCategoryGroupNames = categoryGroups
    .map((group) => group.name)
    .flat();
  const categories = categoryGroups.map((group) => group.categories).flat();
  let categoryNames = categories
    .map((item) => item.name)
    .filter(function (element) {
      return element !== defaultCategoryName;
    });
  const initialCategories = EDIT ? props.categoryGroup.categories : [];

  // This regular expression only allows number with 2 digits
  const eurRegEx = /(^[0-9]+\.{0,1}[0-9]{0,2}$)/;

  useEffect(() => {
    props.setSaveable(
      categoryGroupName.length != 0 && formatCorrect && validGroupName
    );
  }, [categoryGroupName]);

  // Prohbit duplicate group names
  const onChangeCategoryGroupName = (e) => {
    setCategoryGroupName(e.target.value);
    if (existingCategoryGroupNames.includes(e.target.value)) {
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

    const excludedCategories = initialCategories.filter(
      (cat) => !includedCategoryNames.includes(cat.name)
    );

    props.onSaveCategoryGroup(
      categoryGroupName,
      budgetLimit,
      budgetType,
      includedCategories,
      includedCategoryNames,
      excludedCategories
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
            disabled={EDIT}
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
              <MenuItem value={BudgetType.MONTHLY}>
                <Typography>Monthly</Typography>
              </MenuItem>
              <MenuItem value={BudgetType.YEARLY}>
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
            onChange={(_, newValue) => {
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
