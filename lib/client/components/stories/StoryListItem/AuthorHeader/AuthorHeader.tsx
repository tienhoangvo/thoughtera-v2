import { Group, Box, Avatar, Text } from '@mantine/core'
import Link from 'next/link'

type AuthorHeaderType = {
  userData: {
    name: string
    username: string
    avatar: string
  }
}

const AuthorHeader = ({ userData }: AuthorHeaderType) => {
  return (
    <Group>
      <Link href={`/@${userData.username}`} passHref>
        <Box
          component="a"
          sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
        >
          <Group>
            <Avatar
              src={userData.avatar}
              alt={userData.name}
              size="lg"
              radius="xl"
            />
            <Box>
              <Text>{userData.name}</Text>
              <Text size="sm" color="dimmed">
                @{userData.username}
              </Text>
            </Box>
          </Group>
        </Box>
      </Link>
    </Group>
  )
}

export default AuthorHeader
