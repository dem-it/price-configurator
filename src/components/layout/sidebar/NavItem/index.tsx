import React from "react"
// mui imports
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material"
import Link from "next/link"

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
  isCollapsed?: boolean;
}

const NavItem = ({ item, level, pathDirect, onClick, onMouseEnter, onMouseLeave, isCollapsed }: ItemType) => {
  const theme = useTheme()

  const Icon = item.icon

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      ".MuiListItemIcon-root": {
        paddingLeft: "5px",
      },
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
  }))

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {item.icon && <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "inherit",
            }}
          >
            <Icon stroke={1.5} size="1.3rem" />
          </ListItemIcon>
          }
          {!isCollapsed && (
            <ListItemText>
              <>{item.title}</>
            </ListItemText>
          )}
        </ListItemButton>
      </ListItemStyled>
    </List>
  )
}

export default NavItem
