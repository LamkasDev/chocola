import { lightTheme, darkTheme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'chocola-light') return lightTheme;
  else if (name === 'chocola-dark') return darkTheme;
  return lightTheme;
};
