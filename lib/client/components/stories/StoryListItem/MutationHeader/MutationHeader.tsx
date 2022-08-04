import { ActionIcon, Button, Group } from "@mantine/core"
import { PencilSimpleLine, Trash, UsersThree } from "phosphor-react"

type MutationHeaderProps = {
  published: boolean,
  onEditClick: () => void
  onDeleteClick: () => void
  onPrimaryClick?: () => void
}
const MutationHeader = ({
  published,
  onEditClick,
  onDeleteClick,
  onPrimaryClick
}: MutationHeaderProps) => {
  return (
    <Group position="apart" mb="md">
      <Group>
        <ActionIcon variant="light" color="orange" size="lg" onClick={onEditClick}><PencilSimpleLine /></ActionIcon>
        <ActionIcon variant="light" color="red" size="lg" onClick={onDeleteClick}><Trash /></ActionIcon>
      </Group>
      {
        !published && <Button color="teal" variant="light" radius="md" leftIcon={<UsersThree/>} onClick={onPrimaryClick}>Publish</Button>
      }
    </Group>
  )
}

export default MutationHeader