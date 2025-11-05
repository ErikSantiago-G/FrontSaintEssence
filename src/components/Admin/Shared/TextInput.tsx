interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({ value, onChange, ...props }: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}