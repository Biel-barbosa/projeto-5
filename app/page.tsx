"use client"

import styled from "styled-components"
import ContactForm from "../components/ContactForm"
import ContactList from "../components/ContactList"

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const AppHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`

const AppTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const AppSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
`

const ContentWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`

export default function HomePage() {
  return (
    <Container>
      <AppHeader>
        <AppTitle>Lista de Contatos</AppTitle>
        <AppSubtitle>Gerencie seus contatos de forma simples e eficiente</AppSubtitle>
      </AppHeader>

      <ContentWrapper>
        <ContactForm />
        <ContactList />
      </ContentWrapper>
    </Container>
  )
}
