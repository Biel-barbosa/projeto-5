"use client"

import styled from "styled-components"
import { useAppSelector } from "../hooks/redux"
import ContactItem from "./ContactItem"

const ListContainer = styled.div`
  margin-top: 2rem;
`

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const ListTitle = styled.h2`
  color: #2c3e50;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`

const ContactCount = styled.span`
  background: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
`

const EmptyStateTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #95a5a6;
`

const EmptyStateText = styled.p`
  margin: 0;
  font-size: 1rem;
`

export default function ContactList() {
  const contacts = useAppSelector((state) => state.contacts.contacts)

  if (contacts.length === 0) {
    return (
      <ListContainer>
        <ListHeader>
          <ListTitle>Lista de Contatos</ListTitle>
          <ContactCount>0 contatos</ContactCount>
        </ListHeader>
        <EmptyState>
          <EmptyStateTitle>Nenhum contato encontrado</EmptyStateTitle>
          <EmptyStateText>Adicione seu primeiro contato usando o formulário acima.</EmptyStateText>
        </EmptyState>
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      <ListHeader>
        <ListTitle>Lista de Contatos</ListTitle>
        <ContactCount>
          {contacts.length} {contacts.length === 1 ? "contato" : "contatos"}
        </ContactCount>
      </ListHeader>

      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ListContainer>
  )
}
