import React from 'react';
import { Box, Button, Grid, Tooltip } from '@mui/material';
import ThemeButton from '../customComponents/button';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  disabled?: boolean;
  toolTip?: string;
  showButton?: boolean;
}

interface FormButtonsProps {
  handleSubmit: () => void;
  hideSubmitButton?: boolean;
  actionsButtons?: ActionButton[];
  onCancel: () => void;
  hideCancelButton?: boolean;
  submitButtonLabel?: string;
  disabledSubmit?: boolean;
  loading?: boolean;
  isStepper?: boolean;
  activeStep?: number;
  steps?: string[];
  handleBack?: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  handleSubmit,
  actionsButtons = [],
  submitButtonLabel,
  hideCancelButton,
  hideSubmitButton,
  onCancel,
  disabledSubmit,
  loading,
  isStepper,
  activeStep,
  steps,
  handleBack,
}) => {
  return (
    <Grid size={12}>
      <Box
        className="form-btn-wrapper"
        display="flex"
        justifyContent="flex-end"
        gap={2}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        {!hideCancelButton && (
          <ThemeButton
            variant="contained"
            color="error"
            onClick={onCancel}
          >
            Cancel
          </ThemeButton>
        )}

       
        {actionsButtons.map(
          (action, index) =>
            action?.showButton && (
              <Tooltip key={index} title={action?.toolTip || ''}>
                <span style={{ display: 'inline-block' }}>
                <ThemeButton
                  variant={action?.variant || 'contained'}
                  color={action?.color || 'primary'}
                  onClick={action?.onClick}
                  disabled={action?.disabled}
                >
                  {action?.label}
                </ThemeButton>
                </span>
              </Tooltip>
            )
        )}

        {!hideSubmitButton && (
          <ThemeButton
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={disabledSubmit || loading}
            loading={loading}
          >
            {submitButtonLabel || 'Submit'}
          </ThemeButton>
        )}
      </Box>
    </Grid>
  );
};

export default FormButtons;
