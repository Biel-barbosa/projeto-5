"use client"

import styled from "styled-components"
import { Edit2, Trash2, Mail, Phone, User } from "lucide-react"
import { useAppDispatch } from "../hooks/redux"
import { removeContact, setEditingContact, type Contact } from "../store/contactsSlice"

const ContactCard = styled.div`
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const ContactName = styled.h3`
  color: #2c3e50;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ContactActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button<{ variant?: "edit" | "delete" }>`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.variant === "delete"
      ? `
    background: #e74c3c;
    color: white;
    
    &:hover {
      background: #c0392b;
    }
  `
      : `
    background: #f39c12;
    color: white;
    
    &:hover {
      background: #e67e22;
    }
  `}

  &:active {
    transform: scale(0.95);
  }
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #34495e;
  font-size: 0.95rem;
`

const InfoIcon = styled.div`
  color: #3498db;
  display: flex;
  align-items: center;
`

const InfoText = styled.span`
  flex: 1;
`

interface ContactItemProps {
  contact: Contact
}

export default function ContactItem({ contact }: ContactItemProps) {
  const dispatch = useAppDispatch()

  const handleEdit = () => {
    dispatch(setEditingContact(contact))
  }

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja remover ${contact.nomeCompleto}?`)) {
      dispatch(removeContact(contact.id))
    }
  }

  return (
    <ContactCard>
      <ContactHeader>
        <ContactName>
          <User size={20} />
          {contact.nomeCompleto}
        </ContactName>
        <ContactActions>
          <ActionButton onClick={handleEdit} title="Editar contato">
            <Edit2 size={16} />
          </ActionButton>
          <ActionButton variant="delete" onClick={handleDelete} title="Remover contato">
            <Trash2 size={16} />
          </ActionButton>
        </ContactActions>
      </ContactHeader>

      <ContactInfo>
        <InfoItem>
          <InfoIcon>
            <Mail size={18} />
          </InfoIcon>
          <InfoText>{contact.email}</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoIcon>
            <Phone size={18} />
          </InfoIcon>
          <InfoText>{contact.telefone}</InfoText>
        </InfoItem>
      </ContactInfo>
    </ContactCard>
  )
}
