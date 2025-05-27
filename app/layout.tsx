"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "../store"
import StyledComponentsRegistry from "./registry"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Provider store={store}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  )
}


import './globals.css'