import DashboardIcon from "@mui/icons-material/Dashboard"
import HandymanIcon from "@mui/icons-material/Handyman"

import { uniqueId } from "lodash"

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: DashboardIcon,
    href: "/auth",
  },
  {
    navlabel: true,
    subheader: "Configurators",
  },
  {
    id: uniqueId(),
    title: "Configurators",
    icon: HandymanIcon,
    href: "/auth/configurators",
  }
]

export default Menuitems
