import BusinessIcon from "@mui/icons-material/Business"
import DashboardIcon from "@mui/icons-material/Dashboard"

import { uniqueId } from "lodash"

const Menuitems = [
  {
    id: uniqueId(),
    title: "Home",
    icon: DashboardIcon,
    href: "/auth",
  },
  {
    navlabel: true,
    subheader: "Organization stuff",
  },
  {
    id: uniqueId(),
    title: "Organization",
    icon: BusinessIcon,
    href: "/auth/organization",
  }
]

export default Menuitems
