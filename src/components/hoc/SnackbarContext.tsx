import Alert from '@mui/material/Alert'
import { AlertColor } from '@mui/material/Alert/Alert'
import Snackbar from '@mui/material/Snackbar'
import React, { createContext, useContext } from 'react'

type SnackbarContextActions = {
  showSnackbar: (text: string, typeColor: AlertColor) => void;
};

const SnackbarContext = createContext({} as SnackbarContextActions);

interface SnackbarContextProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider: React.FC<SnackbarContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [typeColor, setTypeColor] = React.useState<AlertColor>('info');

  const showSnackbar = (text: string, color: AlertColor) => {
    setMessage(text)
    setTypeColor(color)
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
    setTypeColor('info')
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeColor} variant="filled">
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

const useSnackbar = (): SnackbarContextActions => {
  const context = useContext(SnackbarContext)

  if (!context) {
    throw new Error('useSnackbar must be used within an SnackbarProvider')
  }

  return context
};

export { SnackbarProvider, useSnackbar }

