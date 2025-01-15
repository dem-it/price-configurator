import { useAuth0 } from "@auth0/auth0-react"
import { Box, Drawer, useMediaQuery } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Logo, Sidebar } from "react-mui-sidebar"
import SidebarItems from "./SidebarItems"
import { Upgrade } from "./Updrade"

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"))

  const [showSidebar, setShowSidebar] = useState(false)
  const { isAuthenticated } = useAuth0()

  const [isCollapsed, setIsCollapsed] = useState(true)

  useEffect(() => {
    //only show the desktop sidebar if the user is logged in
    if (isAuthenticated) {
      setShowSidebar(true)
      setIsCollapsed(true)
    }
  }, [isAuthenticated])

  const sidebarWidth = "270px"
  const sidebarCollapsedWidth = "100px"

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",

    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  }

  if (lgUp) {

    if (showSidebar === false) {
      return null
    }

    return (
      <Box
        sx={{
          width: isCollapsed ? sidebarCollapsedWidth : sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              ...scrollbarStyles,
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
          >
            <Sidebar
              width={isCollapsed ? sidebarCollapsedWidth : sidebarWidth}
              collapsewidth="100px"
              open={isSidebarOpen}
              isCollapse={isCollapsed}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}

              <Link href="/">
                <Logo img="/images/logos/logo-64x64.png" style={{
                  width: "32px",
                  height: "32px",
                }} />
              </Link>
              <Box>
                {/* ------------------------------------------- */}
                {/* Sidebar Items */}
                {/* ------------------------------------------- */}
                <SidebarItems isCollapsed={isCollapsed} />
                {!isAuthenticated && <Upgrade />}
              </Box>
            </Sidebar >
          </Box>
        </Drawer>
      </Box>
    )
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar Box */}
      {/* ------------------------------------------- */}
      <Box px={2}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}>
        <Sidebar
          width={"270px"}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}

          <Link href="/">
            <Logo img="/images/logos/logo-64x64.png" />
          </Link>
          {/* ------------------------------------------- */}
          {/* Sidebar Items */}
          {/* ------------------------------------------- */}
          <SidebarItems isCollapsed={isCollapsed} />
          <Upgrade />
        </Sidebar>
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}

    </Drawer>
  )
}

export default MSidebar
