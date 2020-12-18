import * as React from 'react';

import { StyledProgress, StyledLabel } from './styles';

interface Props {
  background?: string;
  foreground?: string;
  type?: 'contained' | 'outlined';
  children?: any;
  style?: any;
  onClick?: (pos: number) => void;
  value?: number;
  maxValue?: number;
  id?: string;
}

export const ProgressWithKnob = ({
  background,
  foreground,
  type,
  onClick,
  children,
  style,
  value,
  maxValue,
  id
}: Props) => (
  <StyledProgress
    className="button"
    background={background}
    foreground={foreground}
    onClick={(e) => {
      const pos = (e.pageX  - (e.currentTarget.offsetLeft + e.currentTarget.offsetLeft)) / e.currentTarget.offsetWidth;
      onClick(pos);
    }}
    type={type}
    style={style}
    value={value}
    max={maxValue}
    id={id}
  >
    <StyledLabel>{children}</StyledLabel>
  </StyledProgress>
);
