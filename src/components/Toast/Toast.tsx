'use client';

import React, { useEffect } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

type ToastProps = {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  open: boolean;
  offset?: number;
};

export function Toast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  open,
  offset = 0,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionComponent={Slide}
      sx={{ mb: `${offset}px` }}
    >
      <Alert onClose={onClose} severity={type} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
