import * as React from 'react';

import { StyledProgress, StyledLabel } from './styles';

interface Props {
  background?: string;
  foreground?: string;
  type?: 'contained' | 'outlined';
  children?: any;
  style?: any;
  value?: number;
  maxValue?: number;
}

export const Progress = ({
  background,
  foreground,
  type,
  children,
  style,
  value,
  maxValue
}: Props) => (
  <StyledProgress
    className="button"
    background={background}
    foreground={foreground}
    type={type}
    style={style}
    value={value}
    max={maxValue}
  >
    <StyledLabel>{children}</StyledLabel>
  </StyledProgress>
);
