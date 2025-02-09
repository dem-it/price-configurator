
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import { tableCellClasses } from "@mui/material/TableCell"

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 700,
  "th, td": {
    padding: "2px 16px",
    minHeight: "40px",
    height: "40px"
  },
  "& tr": {
    "&:nth-of-type(odd)": {
      backgroundColor: theme?.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
  [`& .${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette.primary.main,
    color: theme?.palette.common.white,
  },
  [`& .${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export default StyledTable