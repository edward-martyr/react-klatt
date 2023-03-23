import React from 'react';
import {
  InputAdornment, InputLabel, OutlinedInput, Slider, Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  selectF1, selectF2, selectF3, updateFormantByName,
} from '../../../redux/formants';
import { Formant, FormantName } from '../../../redux/formants/types';
import { formantMaxes, formantMins } from '../../../constants';

const FormantInput = ({ formant }: { formant: FormantName }) => {
  const dispatch = useAppDispatch();
  const selectors = {
    f1: selectF1,
    f2: selectF2,
    f3: selectF3,
  };
  const formantValue = useAppSelector(selectors[formant]);
  const updateFormant = (value: Formant) => {
    dispatch(updateFormantByName(formant, value));
  };
  const minValue = formantMins[formant];
  const maxValue = formantMaxes[formant];

  return (
    <div className="formant-input">
      <div className="formant-range">
        <InputLabel htmlFor={`${formant}-range-input`} className="min-formant-range-label formant-range-label">{minValue}</InputLabel>
        <Slider
          id={`${formant}-range-input`}
          min={minValue}
          max={maxValue}
          value={formantValue}
          onChange={(e, v) => updateFormant(Number(v))}
          valueLabelDisplay="auto"
          className="formant-range-input"
          size="medium"
        />
        <InputLabel htmlFor={`${formant}-range-input`} className="max-formant-range-label formant-range-label">{maxValue}</InputLabel>
      </div>
      <div className="formant-number">
        <InputLabel htmlFor={`${formant}-number-input`} className="formant-number-label">
          <Typography color="textPrimary">{formant}&thinsp;=&thinsp;</Typography>
        </InputLabel>
        <OutlinedInput
          type="number"
          id={`${formant}-number-input`}
          value={formantValue}
          endAdornment={<InputAdornment position="end">Hz</InputAdornment>}
          onChange={(e) => updateFormant(Number(e.target.value))}
          className="formant-number-input"
          size="small"
        />
      </div>
    </div>
  );
};

export default FormantInput;
