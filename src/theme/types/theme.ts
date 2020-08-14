import { Palette } from './palette';
import { Typography } from './typography';
import { Indents } from './indents';

/**
 * Описание темы
 */
export interface Theme {
  palette: Palette;
  typography: Typography;
  indents: Indents;
}

/**
 * Shared themes options
 */
export interface ThemeDefaults extends Pick<Theme, 'typography' | 'indents'> {}
