import { Chip, Stack } from "@mui/material"

interface IdentifierProps {
    id: string,
    description: string
}

const Identifier = (props: IdentifierProps) => {
    return <Stack direction="row" spacing={2} alignItems="center">
        <Chip label={props.id} variant="outlined" sx={{ width: '90px' }} />
        <span style={{ fontWeight: 'bold' }}>{props.description}</span>
    </Stack>
}

export default Identifier