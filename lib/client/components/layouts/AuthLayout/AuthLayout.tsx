import {
  Button,
  Card,
  CardSection,
  Container,
  Space,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import { BookOpen } from 'phosphor-react'
import { ReactNode } from 'react'

type AuthLayoutProps = {
  title: string
  children: ReactNode
}
const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <Container size="xs" p="lg">
      <Card
        p={50}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'light'
              ? theme.colors.gray['0']
              : theme.colors.dark[6],
        })}
        radius="lg"
      >
        <CardSection mb="lg">
          <Link href="/" passHref>
            <Button
              component="a"
              leftIcon={<BookOpen />}
              fullWidth
              variant="subtle"
              size="lg"
            >
              ThoughtEra
            </Button>
          </Link>
        </CardSection>
        <Title align="center">{title}</Title>
        <Space h="lg" />
        {children}
      </Card>
    </Container>
  )
}

export default AuthLayout
