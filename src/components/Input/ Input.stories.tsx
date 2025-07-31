import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { InputProps } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/Input',
};

export default meta;
type Story = StoryObj<typeof Input>;

const placeholderMap: Record<string, string> = {
  text: 'Enter text',
  password: 'Enter password',
  number: 'Enter number',
};

const ControlledInput = (props: InputProps) => {
  const { placeholder, type, ...rest } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('');
  }, [placeholder, type]);

  return (
    <Input
      {...rest}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export const Interactive: Story = {
  args: {
    type: 'text',
    clearable: true,
  },
  render: args => <ControlledInput {...args} placeholder={placeholderMap[args.type || 'text']} />,
  argTypes: {
    type: {
      control: { type: 'select', options: ['text', 'password', 'number'] },
    },
  },
};
