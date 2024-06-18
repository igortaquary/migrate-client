import { useEffect, useState, ChangeEvent } from "react";

interface IDebounceInput {
  handleDebouncedValue: (value: string) => any;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

export const DebounceInput = ({
  handleDebouncedValue,
  inputProps,
}: IDebounceInput) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleDebouncedValue(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500]);

  return (
    <input
      type='text'
      value={inputValue}
      onChange={handleInputChange}
      {...inputProps}
    />
  );
};
