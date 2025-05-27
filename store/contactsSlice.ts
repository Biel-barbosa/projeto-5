import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Contact {
  id: string
  nomeCompleto: string
  email: string
  telefone: string
}

interface ContactsState {
  contacts: Contact[]
  editingContact: Contact | null
}

const initialState: ContactsState = {
  contacts: [
    {
      id: "1",
      nomeCompleto: "João Silva",
      email: "joao@email.com",
      telefone: "(11) 99999-9999",
    },
    {
      id: "2",
      nomeCompleto: "Maria Santos",
      email: "maria@email.com",
      telefone: "(11) 88888-8888",
    },
  ],
  editingContact: null,
}

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, "id">>) => {
      const newContact: Contact = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.contacts.push(newContact)
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload)
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload.id)
      if (index !== -1) {
        state.contacts[index] = action.payload
      }
    },
    setEditingContact: (state, action: PayloadAction<Contact | null>) => {
      state.editingContact = action.payload
    },
  },
})

export const { addContact, removeContact, updateContact, setEditingContact } = contactsSlice.actions
export default contactsSlice.reducer
