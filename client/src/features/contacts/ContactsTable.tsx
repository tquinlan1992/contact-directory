import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Contact, getContacts } from "../../api";
import {
  Table,
  TableBody,
  TableHeaders,
  TableRow,
} from "../../components/Table";

export const ContactsTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
    getContacts().then((contacts) => {
      console.log("contacts", contacts);
      setContacts(contacts);
    });
  }, []);
  const rows = contacts.map(({ name, email, address }) => (
    <TableRow key={name} columns={[name, email, address || ""]} />
  ));
  return (
    <>
      <h1>ContactsTable</h1>
      <Table>
        <TableHeaders headers={["Name", "Email", "Address"]} />
        <TableBody>{rows}</TableBody>
      </Table>
    </>
  );
};
