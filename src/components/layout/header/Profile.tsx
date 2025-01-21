import LogoutButton from "@/components/auth/LogoutButton"
import Loading from "@/components/display/Loading"
import { useAuth0 } from "@auth0/auth0-react"
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  Typography
} from "@mui/material"
import { useState } from "react"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  const [anchorEl2, setAnchorEl2] = useState(null)
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }

  if (isLoading)
    return <Loading />

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={user!.picture}
          alt={user!.name}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "300px",
          },
        }}
      >
        <Box mt={1} py={1} px={2}>
          <Typography>
            Logged in as
          </Typography>
          <Typography color="textPrimary">
            {user!.name}
          </Typography>
        </Box>
        <Box mt={1} py={1} px={2}>
          <LogoutButton />
        </Box>
      </Menu>
    </Box>
  )
}

export default Profile
