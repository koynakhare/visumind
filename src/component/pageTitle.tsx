import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CONFIG } from '@/config';

type PageTitleProps = {
  title?: string;
  showCrossIcon?: boolean;
  handleCancel?: () => void;
};

export default function PageTitle({ title, showCrossIcon, handleCancel }: PageTitleProps) {
  return (
    <>
      <title>{`${title} - ${CONFIG.appName}`}</title>

      <Box display="flex" justifyContent="space-between" alignItems="center" className="page-title-wrapper" mb={2}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        {showCrossIcon && (
          <IconButton aria-label="close" onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
}
