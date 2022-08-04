import {
  ActionIcon,
  Box,
  Group,
  ThemeIcon,
  useMantineColorScheme,
} from '@mantine/core'
import { Moon, Sun } from 'phosphor-react'
import Logo from '../Logo'

const Brand = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const handleClick = () => {
    toggleColorScheme()
  }
  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group position="apart">
        <Logo />
        <ActionIcon onClick={handleClick}>
          <ThemeIcon
            color={colorScheme === 'dark' ? 'yellow' : 'violet'}
            variant="light"
          >
            {colorScheme === 'dark' ? <Sun /> : <Moon />}
          </ThemeIcon>
        </ActionIcon>
      </Group>
    </Box>
  )
}

export default Brand
