export type Formant = number;
export type FormantName = 'f1' | 'f2' | 'f3';
export interface FormantsState {
  f1: Formant;
  f2: Formant;
  f3: Formant;
}
export interface OptionalFormantsState {
  f1?: Formant;
  f2?: Formant;
  f3?: Formant;
}
