import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import sw from './sw.json';
import ha from './ha.json';
import eto from './eto.json';
import bas from './bas.json';
import dua from './dua.json';
import ewo from './ewo.json';
import bafang from './bafang.json';
import bagangte from './bagangte.json';
import bamoun from './bamoun.json';
import yo from './yo.json';
import zu from './zu.json';

export const translations = {
  en,
  fr,
  es,
  sw,
  ha,
  eto,
  bas,
  dua,
  ewo,
  bafang,
  bagangte,
  bamoun,
  yo,
  zu,
} as const;

export type Language = keyof typeof translations;