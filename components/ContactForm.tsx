"use client"

import type React from "react"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { addContact, updateContact, setEditingContact } from "../store/contactsSlice"

const FormContainer = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const FormTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 500;
  color: #34495e;
  font-size: 0.9rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &::placeholder {
    color: #95a5a6;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.variant === "secondary"
      ? `
    background: #95a5a6;
    color: white;
    
    &:hover {
      background: #7f8c8d;
    }
  `
      : `
    background: #3498db;
    color: white;
    
    &:hover {
      background: #2980b9;
    }
  `}

  &:active {
    transform: translateY(1px);
  }
`

export default function ContactForm() {
  const dispatch = useAppDispatch()
  const editingContact = useAppSelector((state) => state.contacts.editingContact)

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
  })

  useEffect(() => {
    if (editingContact) {
      setFormData({
        nomeCompleto: editingContact.nomeCompleto,
        email: editingContact.email,
        telefone: editingContact.telefone,
      })
    }
  }, [editingContact])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nomeCompleto || !formData.email || !formData.telefone) {
      alert("Por favor, preencha todos os campos!")
      return
    }

    if (editingContact) {
      dispatch(
        updateContact({
          ...editingContact,
          ...formData,
        }),
      )
      dispatch(setEditingContact(null))
    } else {
      dispatch(addContact(formData))
    }

    setFormData({
      nomeCompleto: "",
      email: "",
      telefone: "",
    })
  }

  const handleCancel = () => {
    dispatch(setEditingContact(null))
    setFormData({
      nomeCompleto: "",
      email: "",
      telefone: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <FormContainer>
      <FormTitle>{editingContact ? "Editar Contato" : "Adicionar Novo Contato"}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="nomeCompleto">Nome Completo</Label>
          <Input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            placeholder="Digite o nome completo"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite o e-mail"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
          />
        </InputGroup>

        <ButtonGroup>
          <Button type="submit">{editingContact ? "Atualizar" : "Adicionar"} Contato</Button>
          {editingContact && (
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          )}
        </ButtonGroup>
      </Form>
    </FormContainer>
  )
}
