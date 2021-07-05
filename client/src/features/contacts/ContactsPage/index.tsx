import React, { createContext, useState } from "react";
import { Contact } from "../../../api";
import { ContactsTable } from "../ContactsTable";
import { CreateContact } from "../CreateContact";
import "./index.css";

export const ContactsPageContext = createContext<{
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  setContacts: (contacts: Contact[]) => void;
}>({ contacts: [], addContact: () => {}, setContacts: () => {} });

export const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const addContact = (contact: Contact) => setContacts([...contacts, contact]);

  return (
    <div className="contacts_page">
      <ContactsPageContext.Provider
        value={{ contacts, addContact, setContacts }}
      >
        <div className="contacts_page-create_contact">
          <CreateContact />
        </div>
        <ContactsTable />
      </ContactsPageContext.Provider>
    </div>
  );
};
