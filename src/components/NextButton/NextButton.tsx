import { Button } from '@mui/material';
import { FC } from 'react';
import { nextButtonStyle } from '@@/components/NextButton/styles';

type NextButtonProps = {
  formId: string;
  disabled: boolean;
  buttonText?: string;
  buttonType?: 'submit' | 'reset' | 'button';
};

export const NextButton: FC<NextButtonProps> = ({
  formId,
  disabled,
  buttonText = 'next',
  buttonType = 'submit',
}) => (
  <Button
    variant='contained'
    sx={nextButtonStyle}
    form={formId}
    type={buttonType}
    disabled={disabled}
  >
    {buttonText}
  </Button>
);
