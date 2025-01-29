import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

export interface AddConfigurationDialogProps {
    open: boolean
    onClose: (value?: boolean) => void
}

function AddConfigurationDialog(props: AddConfigurationDialogProps) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose(undefined)
  }

  const handleClick = (value?: boolean) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add new configuration</DialogTitle>
      <DialogContent>
                You can either add a new configuration with empty data or with example data. It is wise to choose with the example data, as this will help you get up to speed quick.
      </DialogContent>
      <Button variant='outlined' onClick={() => handleClick(false)}>Add with empty data</Button>
      <Button variant='contained' onClick={() => handleClick(true)}>Add with example data</Button>
    </Dialog>
  )
}

export default AddConfigurationDialog