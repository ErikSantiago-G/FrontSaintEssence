// components/Admin/Shared/FormGroup.tsx
import React from 'react';

interface FormGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({ label, children, className = 'form-group' }: FormGroupProps) {
  return (
    <div className={className}>
      <label>{label}</label>
      {children}
    </div>
  );
}