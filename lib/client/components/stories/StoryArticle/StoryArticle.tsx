import {
  Badge,
  Card,
  Group,
  Image,
  Space,
  Text,
  TypographyStylesProvider,
  useMantineTheme,
} from '@mantine/core'

import { StoryDetailsType } from '../../../../server/services/mongodb/queries'

type StoryArticleProps = {
  story: StoryDetailsType
}

type StoryTagsProps = {
  tags: Array<string>
}

const StoryTags = ({ tags }: StoryTagsProps) => {
  return (
    <Group>
      {tags.map((tag) => (
        <Badge key={tag}>#{tag}</Badge>
      ))}
    </Group>
  )
}

const tags = ['work', 'status', 'success']

const StoryArticle = ({ story }: StoryArticleProps) => {
  const theme = useMantineTheme()
  return (
    <Card
      component="article"
      p={100}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'light'
            ? theme.colors.gray['0']
            : theme.colors.dark[6],
      })}
    >
      <StoryTags tags={story.tags} />
      <Text
        component="h1"
        sx={{ fontSize: '30px', margin: 0, lineHeight: 1.2 }}
      >
        {story.title}
      </Text>
      <Text component="p" color="dimmed">
        {story.excerpt}
      </Text>
      <Card.Section>
        <Image
          height="400px"
          src={story.thumbnail}
          alt={story.title}
          withPlaceholder
          sx={(theme) => ({
            border: '1px solid #888',
            boxShadow: theme.shadows.lg,
          })}
        />
      </Card.Section>
      <Space h="lg" />
      <TypographyStylesProvider
        sx={(theme) => ({
          color:
            theme.colorScheme === 'light'
              ? theme.colors.dark[6]
              : theme.colors.dark[0],
          lineHeight: 1.6,
        })}
      >
        {<div dangerouslySetInnerHTML={{ __html: story.content }} />}
      </TypographyStylesProvider>
    </Card>
  )
}

export default StoryArticle
