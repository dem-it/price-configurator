import { Box, Card, CardContent, Stack, Typography } from "@mui/material"

type Props = {
  title?: JSX.Element | string;
  subtitle?: string;
  action?: JSX.Element;
  footer?: JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  middlecontent,
  footer
}: Props) => {
  return (
    <Card sx={{ padding: 0, marginBottom: 2 }} elevation={9} variant={undefined}>
 
        <CardContent sx={{ p: "30px" }}>
          {(title || subtitle || action) ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box>
                {title ? <h2>{title}</h2> : ""}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>

      {middlecontent}
      {footer}
    </Card>
  )
}

export default DashboardCard
