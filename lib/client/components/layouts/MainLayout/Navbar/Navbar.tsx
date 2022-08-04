import { Navbar as MantineNavbar } from '@mantine/core'

import useCurrentUser from '../../../../hooks/useData/useCurrentUser'
import Brand from '../Brand'
import MainLinks from '../MainLinks'
import UserMenu from '../UserMenu'

const Navbar = () => {
  const { user } = useCurrentUser()

  return (
    <MantineNavbar
      width={{
        base: 300,
      }}
      position={{
        top: 0,
      }}
      height={'100vh'}
      p="xs"
    >
      <MantineNavbar.Section mt="xs">
        <Brand />
      </MantineNavbar.Section>

      <MantineNavbar.Section mt="md" grow>
        <MainLinks />
      </MantineNavbar.Section>
      {user && (
        <MantineNavbar.Section>
          <UserMenu user={user} />
        </MantineNavbar.Section>
      )}
    </MantineNavbar>
  )
}

export default Navbar
