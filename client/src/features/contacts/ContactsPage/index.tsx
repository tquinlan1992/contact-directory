import React from "react";
import { ContactsTable } from "../ContactsTable";
import { CreateContact } from "../CreateContact";
import "./index.css";

export const ContactsPage: React.FC = () => (
  <div className="contacts_page">
    <div className="contacts_page-create_contact">
      <CreateContact />
    </div>
    <ContactsTable />
  </div>
);
