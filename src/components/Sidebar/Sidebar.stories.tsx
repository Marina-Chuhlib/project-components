import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarItem } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Components/Sidebar',
};
export default meta;

const items: SidebarItem[] = [
  { label: 'Home' },
  {
    label: 'Settings',
    children: [
      { label: 'Profile' },
      {
        label: 'Billing',
        children: [{ label: 'Payment Methods' }, { label: 'Invoices' }],
      },
    ],
  },
  { label: 'Help' },
];

export const Controlled: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(!open)}>
          {open ? 'Close Sidebar' : 'Open Sidebar'}
        </button>
        <Sidebar items={items} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};

export const AlwaysOpen: StoryObj = {
  render: () => (
    <Sidebar items={items} open={true} onClose={() => {}} />
  ),
};


