import EditIcon from "@mui/icons-material/Edit"
import ListAltIcon from "@mui/icons-material/ListAlt"
import PreviewIcon from "@mui/icons-material/Preview"
import { Button, Stack } from "@mui/material"
import { NextRouter } from "next/router"

interface ActionButtonsProps {
  id: string,
  organizationId: string,
  router: NextRouter,
  hideOverviewButton?: boolean,
  hideEditButton?: boolean,
  hidePreviewButton?: boolean,
  extraActionButtons?: JSX.Element
}

const ActionButtons = (props: ActionButtonsProps) => {

  const navigateToOverview = () => {
    props.router.push("/auth/configurators")
  }

  const navigateToView = () => {
    props.router.push(`/auth/configurators/${props.id}`)
  }

  const navigateToEdit = () => {
    props.router.push(`/auth/configurators/${props.id}/edit`)
  }

  const navigateToPreview = () => {
    props.router.push(`/auth/configurators/${props.id}/preview`)
  }

  return <Stack direction='row' spacing={2}>
    {!props.hideOverviewButton && <Button
      variant='contained'
      color='primary'
      onClick={navigateToOverview}
      startIcon={<ListAltIcon />}
    >
      Overview
    </Button>
    }

    {!props.hideEditButton && <Button
      variant='contained'
      color='primary'
      onClick={navigateToEdit}
      startIcon={<EditIcon />}
    >
      Edit
    </Button>
    }

    {!props.hidePreviewButton && <Button
      variant='contained'
      color='primary'
      onClick={navigateToPreview}
      startIcon={<PreviewIcon />}
    >
      Preview
    </Button>
    }

    {props.extraActionButtons}

  </Stack>
}

export default ActionButtons