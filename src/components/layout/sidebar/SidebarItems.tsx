import { Box, List, useMediaQuery } from "@mui/material"
import { usePathname } from "next/navigation"
import { default as HeaderMenuItems } from "../header/MenuItems"
import Menuitems from "./MenuItems"
import NavGroup from "./NavGroup/NavGroup"
import NavItem from "./NavItem"

interface SidebarItemsProps
{
  isCollapsed: boolean;
}

const SidebarItems = (props: SidebarItemsProps) => {
  const pathname = usePathname()
  const pathDirect = pathname

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"))

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">

        {/* Only show the headermenu on mobile */}
        {!lgUp && HeaderMenuItems.map((item) => {
          return (
            <NavItem
              isCollapsed={props.isCollapsed}
              item={item}
              key={item.id}
              pathDirect={pathDirect}
            />
          )
        })}

        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup isCollapsed={props.isCollapsed} item={item} key={item.subheader} />

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem
                isCollapsed={props.isCollapsed}
                item={item}
                key={item.id}
                pathDirect={pathDirect}
              />
            )
          }
        })}
      </List>
    </Box>
  )
}
export default SidebarItems
