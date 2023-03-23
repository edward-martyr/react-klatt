import React from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import './style.scss';

const About = () => {
  return (
    <aside id="about">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography>Usage Tips</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>
              Use the sliders or the input fields to change the formant values.
              For simplicity, I am only letting you change the first three formants,
              which are the most phonetically significant ones.
            </li>
            <li>
              You could enter a theoretically impossible formant value, e.g. F1 {'>'} F2,
              but the synthesiser will still produce a (strange) sound.
            </li>
            <li>
              The dot in the vowel space will move according to the F1, F2 values you enter;
              this vowel space is only a lossy 2D representation of the vowel,
              and does not fully capture the vowel&rsquo;s quality.
            </li>
            <li>
              For more control, you could use <cite>KlattGrid Speech Synthesizer</cite> from Praat directly.
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography>About <cite>KlattGrid Speech Synthesizer</cite></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            Klatt Grid Vowel Synthesis uses <cite>KlattGrid Speech Synthesizer</cite> from Praat as its
            backend to synthesise vowels.
          </p>
          <ul>
            <li>
              Weenink, D. (2009) <cite>The klattgrid speech synthesizer.</cite> Proc. Interspeech 2009,
              2059‒2062, <span className="sc">doi:</span> <a href="https://doi.org/10.21437/Interspeech.2009-591" target="_blank" rel="noreferrer">10.21437/Interspeech.2009-591</a>.
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </aside>
  );
};

export default About;
