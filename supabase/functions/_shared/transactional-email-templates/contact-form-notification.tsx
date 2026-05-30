import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Tapeçaria Marzorati'

interface ContactFormNotificationProps {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const ContactFormNotificationEmail = ({
  name,
  email,
  phone,
  message,
}: ContactFormNotificationProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Nova mensagem do formulário de contato — {name || 'Cliente'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nova mensagem de contato</Heading>
        <Text style={subtitle}>
          Você recebeu uma nova mensagem pelo site da {SITE_NAME}.
        </Text>

        <Hr style={hr} />

        <Section style={section}>
          <Text style={label}>Nome</Text>
            <Text style={value}>{name || '—'}</Text>

          <Text style={label}>Email</Text>
            <Text style={value}>{email || '—'}</Text>

          <Text style={label}>Telefone</Text>
            <Text style={value}>{phone || '—'}</Text>

          <Text style={label}>Mensagem</Text>
            <Text style={messageBox}>{message || '—'}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          Esta mensagem foi enviada automaticamente pelo formulário de contato do site {SITE_NAME}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactFormNotificationEmail,
  subject: (data: Record<string, any>) =>
    `Nova mensagem de contato — ${data?.name || 'Cliente'}`,
  to: 'Moraxari@gmail.com',
  displayName: 'Notificação de contato',
  previewData: {
    name: 'Maria Silva',
    email: 'maria@example.com',
    phone: '(11) 99999-0000',
    message: 'Olá! Gostaria de orçar a reforma de um sofá de 3 lugares.',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Lato, Arial, sans-serif',
}
const container = {
  padding: '24px',
  maxWidth: '600px',
  margin: '0 auto',
}
const h1 = {
  fontFamily: 'Playfair Display, Georgia, serif',
  fontSize: '24px',
  fontWeight: '700',
  color: '#5a3a1f',
  margin: '0 0 8px',
}
const subtitle = {
  fontSize: '14px',
  color: '#6b5b4a',
  margin: '0 0 16px',
}
const section = { margin: '16px 0' }
const label = {
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  color: '#a68b65',
  margin: '12px 0 4px',
  fontWeight: '700',
}
const value = {
  fontSize: '15px',
  color: '#2a1f15',
  margin: '0 0 8px',
}
const messageBox = {
  fontSize: '15px',
  color: '#2a1f15',
  margin: '0 0 8px',
  padding: '12px 14px',
  backgroundColor: '#f7f1e8',
  borderLeft: '3px solid #b35a30',
  borderRadius: '4px',
  whiteSpace: 'pre-wrap' as const,
}
const hr = {
  borderColor: '#e8ddc9',
  margin: '20px 0',
}
const footer = {
  fontSize: '12px',
  color: '#999999',
  margin: '12px 0 0',
}
