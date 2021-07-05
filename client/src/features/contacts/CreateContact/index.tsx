import React, { useState } from "react";
import { createContact } from "../../../api";
import { Form, FormButton, TextInput } from "../../../components/Form";
import validate from "validate.js";

const constraints = {
  name: {
    presence: { allowEmpty: false },
    type: "string",
  },
  email: {
    presence: { allowEmpty: false },
    type: "string",
    email: true,
  },
  address: {
    type: "string",
  },
};

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
    validate: () => validate({ name, email, address }, constraints),
  };
};

export const CreateContact: React.FC = () => {
  const { name, setName, email, setEmail, address, setAddress, validate } =
    useCreateContact();
  const handleCreateContact = async () => {
    const validationErrors = validate();
    if (!validationErrors) {
      try {
        await createContact({ name, email, address });
        alert("created contact");
      } catch (e) {
        alert("error creating contact");
      }
    } else {
      alert(JSON.stringify(validationErrors));
    }
  };
  return (
    <Form>
      <TextInput value={name} onChange={setName} label="Name" />
      <TextInput value={email} onChange={setEmail} label="Email" />
      <TextInput value={address} onChange={setAddress} label="Address" />
      <FormButton onClick={handleCreateContact}>Create Contact</FormButton>
    </Form>
  );
};
