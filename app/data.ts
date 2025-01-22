////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://live.staticflickr.com/3253/2790866885_0d84239dd8_b.jpg",
    first: "Osmoon",
    last: "Gatos",
    twitter: "@Pandilla de Gatos",
  },
  {
    avatar:
      "https://live.staticflickr.com/5099/5507451122_8289a407ac_b.jpg",
    first: " dhammza",
    last: "Gatos",
    twitter: "@El Gato araña",
  },
  {
    avatar:
      "https://cdn.pixabay.com/photo/2018/07/13/10/20/kittens-3535404_1280.jpg",
    first: "Conger",
    last: "Design",
    twitter: "@¡Gatitos!",
  },
  {
    avatar:
      "https://live.staticflickr.com/7298/10441689695_9b9369204a_b.jpg",
    first: "Juan",
    last: "Montiel",
    twitter: "@Un Gato para el recuerdo",
  },
  {
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Gato_enervado_pola_presencia_dun_can.jpg",
    first: "Luis",
    last: "Bugallo",
    twitter: "@Gato enojado",
  },
  {
    avatar:
      "https://live.staticflickr.com/7272/7462594512_2bcfa6bc28_b.jpg",
    first: "Dando",
    last: "Una vuelta",
    twitter: "@Los Gatos de Macondo",
  },
  {
    avatar:
      "https://live.staticflickr.com/4469/37324541261_8b393212c6_b.jpg",
    first: "Antonio",
    last: "Marín",
    twitter: "@Gato en gallinero",
  },
  {
    avatar:
      "https://live.staticflickr.com/1635/25804518896_ba7fe23f5e_b.jpg",
    first: "Gabriel",
    last: "FR",
    twitter: "@Otro Gato de Macondo",
  },
  {
    avatar:
      "https://live.staticflickr.com/4139/4825352058_86600ebb81.jpg",
    first: "Tony",
    last: "Madrid",
    twitter: "@¡Los gatos también hacen la cuchara!",
  },
  {
    avatar:
      "https://media.istockphoto.com/id/1885866215/photo/veterinarian-examines-the-pet.jpg?s=1024x1024&w=is&k=20&c=DWeap7EdY2UsFVXF0MHLa3AafZ1-P-xEc9dZyVIpy1w=",
    first: "¡Stock",
    last: "Mix media",
    twitter: "@Gato en el veterinario",
  },

].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
