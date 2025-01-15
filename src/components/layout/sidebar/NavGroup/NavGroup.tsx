import PropTypes from "prop-types"
// mui imports
import { ListSubheader, styled, Theme } from "@mui/material"

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface NavGroupProps {
  item: NavGroup;
  isCollapsed: boolean;
}

const NavGroup = (props: NavGroupProps) => {
  const ListSubheaderStyle = styled((props: Theme | any) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: "700",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: "26px",
      padding: "3px 12px",
    }),
  )
  return (
    <ListSubheaderStyle>
      {props.isCollapsed ? <>
        {props.item.subheader?.substring(0, 3).replace(" ", "")}...
      </> : props.item.subheader}
    </ListSubheaderStyle>
  )
}

NavGroup.propTypes = {
  item: PropTypes.object,
}

export default NavGroup
