import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const DateInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const inputRef = React.useRef<any>(ref);
    const handleDateClick = () => {
      try {
        if (inputRef?.current) {
          inputRef?.current?.showPicker();
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div onClick={() => handleDateClick()}>
        <input
          type={type}
          className={`cursor-pointer ${className}`}
          ref={inputRef}
          {...props}
        />
      </div>
    );
  }
);
DateInput.displayName = "Input";

export { DateInput };
