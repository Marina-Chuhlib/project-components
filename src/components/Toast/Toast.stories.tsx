import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastType } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
};
export default meta;

const variants: ToastType[] = ['success', 'error', 'info', 'warning'];

export const AllTypes: StoryObj = {
  render: () => {
    const [openMap, setOpenMap] = useState<Record<ToastType, boolean>>({
      success: true,
      error: true,
      info: true,
      warning: true,
    });

    const handleClose = (type: ToastType) => {
      setOpenMap(prev => ({ ...prev, [type]: false }));
    };

    return (
      <>
        {variants.map((type, i) => (
          <Toast
            key={type}
            message={`This is a ${type} toast`}
            type={type}
            open={openMap[type]}
            onClose={() => handleClose(type)}
            offset={i * 60}
          />
        ))}
      </>
    );
  },
};
export const AutoDismissShort: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Toast
        message="Dismisses in 2s"
        type="info"
        duration={2000}
        open={open}
        onClose={() => setOpen(false)}
      />
    );
  },
};

export const ManualClose: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button onClick={() => setOpen(true)}>Show toast</button>
        <Toast
          message="Manually close me"
          type="warning"
          duration={10000}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
};
