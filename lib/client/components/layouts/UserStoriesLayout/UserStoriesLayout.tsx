import { Box, Tabs } from '@mantine/core'
import { useRouter } from 'next/router'
import { FileDotted, UsersThree } from 'phosphor-react'
import { ReactElement } from 'react'
import type { TabsValue } from '@mantine/core'
type CurrentUserLayoutProps = {
  children?: ReactElement
}

const tabs = [
  {
    label: 'Published',
    icon: <UsersThree />,
    href: '/my-stories',
  },
  {
    label: 'Drafts',
    icon: <FileDotted />,
    href: '/my-stories/drafts',
  },
]

const UserStoriesLayout = ({ children }: CurrentUserLayoutProps) => {
  const router = useRouter()
  const activeTab = router.pathname
  const handleTabChange = (value: TabsValue) => {
    router.push(value ?? '/my-stories')
  }
  return (
    <Box>
      <Tabs value={activeTab} onTabChange={handleTabChange} mb="xs">
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.label} value={tab.href} {...tab}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      {children}
    </Box>
  )
}

export default UserStoriesLayout
