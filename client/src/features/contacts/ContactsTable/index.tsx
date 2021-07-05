import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { getContacts } from "../../../api";
import {
  Table,
  TableBody,
  TableHeaders,
  TableRow,
} from "../../../components/Table";
import { ContactsPageContext } from "../ContactsPage";

export const ContactsTable: React.FC = () => {
  const { contacts, setContacts } = useContext(ContactsPageContext);
  useEffect(() => {
    getContacts()
      .then((newContacts) => {
        setContacts(newContacts);
      })
      .catch((e) => {
        alert(e);
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
