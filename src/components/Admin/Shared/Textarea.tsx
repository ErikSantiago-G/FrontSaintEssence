// components/Admin/Shared/Textarea.tsx
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({ value, onChange, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      {...props}
    />
  );
}