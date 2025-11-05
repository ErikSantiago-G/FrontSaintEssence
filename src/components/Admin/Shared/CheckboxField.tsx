interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function CheckboxField({ checked, onChange, label }: CheckboxFieldProps) {
  return (
    <div className="form-group checkbox-group">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
    </div>
  );
}