import React, { useState } from "react";
import { Form, FormButton, TextInput } from "../../components/Form";

const useCreateContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  return {
    name,
    setName,
    email,
    setEmail,
    address,
    setAddress,
    validate: () => validateCreateContact({ name, email, address }),
  };
};

const validateCreateContact = ({
  name,
  email,
  address,
}: {
  name?: string;
  email?: string;
  address?: string;
}) => {
  return !!(name && email && address);
};

export const CreateContact: React.FC = () => {
  const { setName, setEmail, setAddress, validate } = useCreateContact();
  const handleCreateContact = () => {
    if (validate()) {
      alert("valid");
    } else {
      alert("fill out all fields please");
    }
  };
  return (
    <Form>
      <TextInput onChange={setName} label="Name" />
      <TextInput onChange={setEmail} label="Email" />
      <TextInput onChange={setAddress} label="Address" />
      <FormButton onClick={handleCreateContact}>Create Contact</FormButton>
    </Form>
  );
};
