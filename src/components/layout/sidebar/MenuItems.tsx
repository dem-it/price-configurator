import DashboardIcon from "@mui/icons-material/Dashboard"
import HandymanIcon from "@mui/icons-material/Handyman"
import StyleIcon from "@mui/icons-material/Style" // Importing an icon for CSS adjustments

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
  },
  {
    id: uniqueId(), // Generating a unique ID for the new MenuItem
    title: "CSS Adjustments", // Setting the title to "CSS Adjustments"
    icon: StyleIcon, // Setting an icon for the new MenuItem
    href: "/auth/configurators/css", // Setting the href to "/auth/configurators/css"
  }
]

export default Menuitems
