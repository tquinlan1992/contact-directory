import React, { useContext, useState } from "react";
import { createContact } from "../../../api";
import { Form, FormButton, TextInput } from "../../../components/Form";
import validate from "validate.js";
import { ContactsPageContext } from "../ContactsPage";

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
    getContact: () => ({ name, email, address }),
  };
};

export const CreateContact: React.FC = () => {
  const { addContact } = useContext(ContactsPageContext);
  const {
    name,
    setName,
    email,
    setEmail,
    address,
    setAddress,
    validate,
    getContact,
  } = useCreateContact();
  const handleCreateContact = async () => {
    const validationErrors = validate();
    if (!validationErrors) {
      try {
        await createContact(getContact());
        addContact(getContact());
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
