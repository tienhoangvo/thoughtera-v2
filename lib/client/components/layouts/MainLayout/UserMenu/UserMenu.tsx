import { Avatar, Box, Group, Menu, Text, UnstyledButton } from '@mantine/core'
import { SignOut } from 'phosphor-react'

import UserType from '../../../../../server/collectionTypes/UserType'
import { signout } from '../../../../services/auth'

type UserProps = {
  user: UserType
}
const UserMenu = ({ user }: UserProps) => {
  const handleSignoutClick = () => {
    signout().then(() => {
      if (typeof window !== undefined) {
        window.location.reload()
      }
    })
  }

  return (
    <Menu withArrow>
      <Menu.Target>
        <UnstyledButton
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            ':hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
            <Box sx={{ flex: 1 }}>
              <Text>{user?.name}</Text>
              <Text color="dimmed" size="xs">
                @{user?.username}
              </Text>
            </Box>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<SignOut />} onClick={handleSignoutClick}>
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
export default UserMenu
