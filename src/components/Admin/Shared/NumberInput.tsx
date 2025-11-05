// components/Admin/Shared/TextInput.tsx
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function NumberInput({ value, onChange, ...props }: TextInputProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}