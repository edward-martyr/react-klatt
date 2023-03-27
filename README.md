# Klatt Grid Vowel Synthesis

## Frontend

The app is a TypeScript React app using Redux.

### Build

```bash
npm run build
```

### Run

```bash
npm run start
```

## Backend

The backend repo can be found [here](https://github.com/edward-martyr/klatt-api). It is built with Python and Flask.

## Usage

Of the various parameters one can pass to the <cite>KlattGrid Speech Synthesizer</cite>, this app exposes the three most important ones: F1, F2 and F3 (the first three formants of a vowel).

Use the sliders or the input fields to change the formant values.

The dot in the vowel space will move according to the F1 and F2 values you enter; this vowel space is only a lossy 2D representation of the vowel, and does not fully capture the vowel’s quality.

## Reference

Weenink, D. (2009) <cite>The klattgrid speech synthesizer.</cite> Proc. Interspeech 2009,
2059‒2062, <span style="font-variant: small-caps;">doi:</span> <a href="https://doi.org/10.21437/Interspeech.2009-591" target="_blank" rel="noreferrer">10.21437/Interspeech.2009-591</a>.
