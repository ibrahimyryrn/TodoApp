interface InputProps {
  type: string;
  className: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  return (
    <input
      type={props.type}
      className={props.className}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};
export default Input;
