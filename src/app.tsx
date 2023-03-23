import React from 'react';
import { Typography } from '@mui/material';

import {
  About, Footer, FormantForm, VowelSpace,
} from './components';

const App = () => {
  return (
    <div id="app">
      <main id="content">
        <Typography variant="h1"><span>Klatt Grid Vowel Synthesis</span></Typography>
        <FormantForm />
        <VowelSpace />
        <About />
        <Footer />
      </main>
    </div>
  );
};

export default App;
