import React from "react";
import "./index.css";

const TextInput: React.FC<{
  onChange: (value: string) => void;
  value: string;
  label: string;
}> = ({ onChange, value, label }) => (
  <div className="form-input-container">
    <label className="input-label">{label}</label>
    <input
      type="text"
      onChange={(event) => onChange(event.target.value)}
      value={value}
    />
  </div>
);

const FormButton: React.FC<{ onClick: () => void }> = ({
  children,
  onClick,
}) => <button onClick={onClick}>{children}</button>;

const Form: React.FC = ({ children }) => {
  return <div className="form">{children}</div>;
};

export { Form, TextInput, FormButton };
