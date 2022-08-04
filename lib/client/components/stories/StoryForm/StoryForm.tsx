import {
  Stack,
  Button,
  Group,
  LoadingOverlay,
  Switch,
  Textarea,
  TextInput,
  Card,
  Input,
  MultiSelect,
  Badge,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { ArrowLeft, PaperPlaneRight } from 'phosphor-react'
import { ChangeEvent, useRef, useState } from 'react'
import type { StoryDetailsType } from '../../../../server/services/mongodb/queries'
import RichTextEditor from '../RichTextEditor'
import tagsData from './tagsData'

export type StorySubmitDataType = {
  title?: string
  excerpt?: string
  content?: string
  published?: boolean
  tags?: Array<string>
}

type StoryFormProps = {
  story?: StoryDetailsType
  onSave: (
    id: string,
    submitData: StorySubmitDataType,
    finishSaving?: () => void
  ) => void
}

const StoryForm = ({ story, onSave }: StoryFormProps) => {
  const getInitialValue = (
    field: 'content' | 'title' | 'excerpt' | 'published' | 'tags'
  ) => {
    if (story) {
      return story[field]
    }

    if (field === 'published') return false

    if (field === 'content') return '<p><br></p>'

    if (field === 'tags') return []

    return ''
  }
  const [content, setContent] = useState(getInitialValue('content') as string)
  const [title, setTitle] = useState(getInitialValue('title') as string)
  const [excerpt, setExcerpt] = useState(getInitialValue('excerpt') as string)
  const [published, setPublished] = useState(
    getInitialValue('published') as boolean
  )
  const [tags, setTags] = useState(getInitialValue('tags') as Array<string>)

  const [saving, setSaving] = useState(false)

  const storySubmitDataRef = useRef<StorySubmitDataType>({})
  const disabled =
    title.trim().length === 0 ||
    excerpt.trim().length === 0 ||
    content.trim() === '<p><br></p>' ||
    tags.length === 0
  const router = useRouter()
  const handleContentChange = (value: string) => {
    setContent(value)
    storySubmitDataRef.current.content = value
  }
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    storySubmitDataRef.current.title = event.target.value
  }

  const handleExcerptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setExcerpt(event.target.value)
    storySubmitDataRef.current.excerpt = event.target.value
  }

  const handlePublicSwitchChange = () => {
    setPublished(!published)
    storySubmitDataRef.current.published = !published
  }

  const handleTagsChange = (value: [string]) => {
    setTags(value)

    storySubmitDataRef.current.tags = value
  }

  const handelBackClick = () => {
    let href = '/my-stories'
    if (story) {
      if (!story.published) {
        href += '/drafts'
      }
    }
    router.push(href)
  }

  const finishSaving = () => {
    setSaving(false)
  }

  const handleSaveClick = () => {
    setSaving(true)

    if (story) {
      onSave(story._id, storySubmitDataRef.current, finishSaving)
      return
    }

    onSave('', storySubmitDataRef.current, finishSaving)
    storySubmitDataRef.current = {}
  }

  return (
    <Card
      p={50}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'light'
            ? theme.colors.gray['0']
            : theme.colors.dark[6],
      })}
    >
      <LoadingOverlay visible={saving} />
      <Stack spacing="lg">
        <Group position="apart">
          <Button
            onClick={handelBackClick}
            variant="subtle"
            leftIcon={<ArrowLeft />}
          >
            Back
          </Button>
          <Button
            disabled={disabled}
            onClick={handleSaveClick}
            variant="light"
            color="teal"
            rightIcon={<PaperPlaneRight />}
          >
            Save
          </Button>
        </Group>
        <TextInput
          variant="filled"
          label="Title"
          placeholder="Title of your story"
          value={title}
          onChange={handleTitleChange}
          size="lg"
          mb="lg"
          autoFocus
        />
        <Input.Wrapper
          size="md"
          label="Public"
          description="Publish your story so that people can see it or keep it as a draft now."
        >
          <Switch
            sx={{ '&>input[type="checkbox"]': { cursor: 'pointer' } }}
            onLabel="ON"
            offLabel="OFF"
            size="lg"
            checked={published}
            onChange={handlePublicSwitchChange}
          />
        </Input.Wrapper>
        <MultiSelect
          data={tagsData}
          variant="filled"
          size="md"
          mb="md"
          label="Tags"
          placeholder="Pick all that you like"
          value={tags}
          onChange={handleTagsChange}
          clearButtonLabel="Clear selection"
          clearable
        />
        <Textarea
          label="Excerpt"
          variant="filled"
          placeholder="Summarize the content of your article"
          value={excerpt}
          onChange={handleExcerptChange}
          size="md"
          mb="md"
          minRows={3}
          autosize
          maxRows={6}
        />
        <Input.Wrapper label="Content" size="md">
          <RichTextEditor
            value={content}
            onChange={handleContentChange}
            sx={(theme) => ({
              minHeight: '500px',
              backgroundColor: theme.colors.gray[1],
              border: 'none',
            })}
          />
        </Input.Wrapper>
      </Stack>
    </Card>
  )
}

export default StoryForm
