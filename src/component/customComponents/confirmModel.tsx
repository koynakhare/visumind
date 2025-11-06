"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { WarningAmberRounded } from "@mui/icons-material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  content?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  fullScreen?: boolean;
  loading?: boolean;
  Component?: React.ReactNode; // ✅ Add this
  hideActions?: boolean; // ✅ Allow hiding footer buttons for view mode
}

export default function ConfirmDialog({
  open,
  title = "",
  content = "",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onClose,
  onConfirm,
  loading = false,
  Component,
  fullScreen,
  hideActions = false,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
             fullWidth={fullScreen}
      maxWidth={fullScreen && 'xl'}
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          background:
            "linear-gradient(to bottom right, #ffffff, #f9fafb, #f1f5f9)",
     
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontWeight: 600,
          fontSize: "1.2rem",
        }}
      >
        {!Component && <WarningAmberRounded color="warning" sx={{ fontSize: 28 }} />}
        {title}
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ pt: 0.5 }}>
        {Component ? (
          Component
        ) : (
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
        )}
      </DialogContent>

      {/* Actions */}
      {!hideActions && (
        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
            disabled={loading}
            sx={{ textTransform: "none", borderRadius: 2, px: 2.5 }}
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            color="error"
            variant="contained"
            disabled={loading}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 2.5,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 2px 10px rgba(239,68,68,0.3)",
              },
            }}
            startIcon={
              loading ? <CircularProgress size={18} color="inherit" /> : null
            }
          >
            {loading ? "Processing..." : confirmLabel}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
