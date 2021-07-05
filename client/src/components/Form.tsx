import React from "react";
import "./Form.css";

export const TextInput: React.FC<{
  onChange: (value: string) => void;
  label: string;
}> = ({ onChange, label }) => (
  <div className="form-input-container">
    <label className="input-label">{label}</label>
    <input type="text" onChange={(event) => onChange(event.target.value)} />
  </div>
);

export const FormButton: React.FC<{ onClick: () => void }> = ({
  children,
  onClick,
}) => <button onClick={onClick}>{children}</button>;

export const Form: React.FC = ({ children }) => {
  return <div className="form">{children}</div>;
};
