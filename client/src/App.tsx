import React from 'react';
import { getTestApi } from './api';
import { ContactsTable } from './features/contacts/ContactsTable';

getTestApi();

export default function App() {
  return (
    <div>
      <ContactsTable />
    </div>
  );
}