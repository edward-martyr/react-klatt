import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Alert, Snackbar } from '@mui/material';
import { Settings as Gear, PlayArrow } from '@mui/icons-material';

import FormantInput from './formant-input';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FormantName } from '../../redux/formants/types';
import { selectFormants } from '../../redux/formants';
import {
  selectLoading, selectVowel, updateVowelByFormants,
} from '../../redux/vowel';
import './style.scss';

const FormantForm = () => {
  const formantNames = ['f1', 'f2', 'f3'];
  const dispatch = useAppDispatch();
  const formantValues = useAppSelector(selectFormants);
  const loading = useAppSelector(selectLoading);
  const vowel = useAppSelector(selectVowel);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  // This effect is used to set the width of the formant min range labels
  useEffect(() => {
    const widestFormantMinLabel = (() => {
      const formantMinLabels = document.querySelectorAll('.min-formant-range-label');
      let widestLabel = 0;
      formantMinLabels.forEach((label) => {
        if (label.clientWidth > widestLabel) {
          widestLabel = label.clientWidth;
        }
      });
      return widestLabel;
    })();
    document.documentElement.style.setProperty('--min-formant-range-label-width', `${widestFormantMinLabel}px`);
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(updateVowelByFormants(formantValues)).then(({ success }) => {
      if (success) {
        if (formantValues.f1 > formantValues.f2 || formantValues.f2 > formantValues.f3) {
          setWarningOpen(true);
        } else {
          setSuccessOpen(true);
        }
      } else {
        setErrorOpen(true);
      }
    });
  };
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (vowel) {
      const audio = new Audio(vowel);
      audio.play();
    }
  };

  return (
    <form className="formant-form">
      {formantNames.map((formant) => (
        <FormantInput key={formant} formant={formant as FormantName} />
      ))}

      <div className="submit-buttons">
        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          endIcon={<Gear />}
          loading={loading}
        >
          Synthesise
        </LoadingButton>

        <Snackbar open={successOpen}
          autoHideDuration={6000}
          onClose={() => {
            setSuccessOpen(false);
          }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Successfully synthesised the vowel.
          </Alert>
        </Snackbar>
        <Snackbar open={errorOpen}
          autoHideDuration={6000}
          onClose={() => {
            setErrorOpen(false);
          }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            Unable to synthesise the vowel.
          </Alert>
        </Snackbar>
        <Snackbar open={warningOpen}
          autoHideDuration={6000}
          onClose={() => {
            setWarningOpen(false);
          }}
        >
          <Alert severity="warning" sx={{ width: '100%' }}>
            For a natural vowel, make sure F1 {'<'} F2 {'<'} F3.
          </Alert>
        </Snackbar>

        <LoadingButton
          variant="contained"
          color="secondary"
          type="button"
          onClick={handlePlay}
          endIcon={<PlayArrow />}
          disabled={!vowel}
          loading={loading}
        >
          Play
        </LoadingButton>
      </div>
    </form>
  );
};

export default FormantForm;
