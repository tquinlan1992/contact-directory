const baseUrl = "http://localhost:8080";

export const getTestApi = async () => {
  const response = await fetch(`${baseUrl}/test`);
  console.log("response", response.body);
};

export interface Contact {
  name: string;
  email: string;
  address?: string;
}

export const getContacts = async (): Promise<Contact[]> => {
  const response = await fetch(`${baseUrl}/contacts`, { method: "GET" });
  if (response.ok) {
    return response.json();
  } else {
    throw `Error retreiving contacts with status code: ${response.status}`;
  }
};

export const createContact = async (contact: Contact): Promise<null> => {
  const response = await fetch(`${baseUrl}/contacts`, {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return null;
  } else {
    throw `Error retreiving contacts with status code: ${response.status}`;
  }
};
