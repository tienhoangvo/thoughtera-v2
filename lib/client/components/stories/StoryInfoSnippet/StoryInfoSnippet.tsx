import {
  Box,
  Button,
  Group,
  Text,
  useMantineTheme,
  Image,
  ThemeIcon,
  Badge,
} from '@mantine/core'
import Link from 'next/link'
import { ArrowArcRight, Calendar } from 'phosphor-react'
import { StoryListItemType } from '../../../../server/services/mongodb/queries'

type StoryInfoSnippetProps = {
  story: StoryListItemType
}

const StoryInfoSnippet = ({ story }: StoryInfoSnippetProps) => {
  const storyHref = `@${story.userData.username}/${story.slug}`
  const theme = useMantineTheme()

  const prefetch = story.published ? {} : { prefetch: false }
  return (
    <Box>
      <Group position="left" mb="md">
        {story.tags.map((tag) => (
          <Link key={tag} href={`#${tag}`} passHref {...prefetch}>
            <Badge sx={{ cursor: 'pointer' }} component="a" color="indigo">
              #{tag}
            </Badge>
          </Link>
        ))}
      </Group>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: theme.spacing.md,
        }}
      >
        <Link href={storyHref} passHref {...prefetch}>
          <a>
            <Image
              src={story.thumbnail}
              alt={story.title}
              width={213}
              height={120}
              radius="md"
            />
          </a>
        </Link>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.sm,
          }}
        >
          <Link href={storyHref} passHref {...prefetch}>
            <Box
              component="a"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <Text
                component="h4"
                sx={{
                  lineHeight: 1,
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 500,
                }}
              >
                {story.title}
              </Text>
            </Box>
          </Link>

          <Group>
            <ThemeIcon color="gray">
              <Calendar />
            </ThemeIcon>
            <Text size="sm" color="dimmed">
              {new Date(story.createdAt).toLocaleDateString()}
            </Text>
          </Group>
        </Box>
      </Box>
      <Text size="sm" color="dimmed" mt="md">
        {story.excerpt}
      </Text>
      <Group position="left" mt="md">
        <Link href={storyHref} passHref {...prefetch}>
          <Button
            component="a"
            color="teal"
            variant="light"
            radius="md"
            leftIcon={<ArrowArcRight />}
          >
            Read more
          </Button>
        </Link>
      </Group>
    </Box>
  )
}

export default StoryInfoSnippet
