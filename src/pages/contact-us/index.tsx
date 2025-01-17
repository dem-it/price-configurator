"use client"
import PageContainer from "@/components/container/PageContainer"
import DashboardCard from "@/components/shared/DashboardCard"
import { useAuth0 } from "@auth0/auth0-react"
import { Typography } from "@mui/material"

const ContactUsPage = () => {

  const { user, isAuthenticated } = useAuth0()

  return (
    <PageContainer title="Contact us" description="this is Contact us page">
      <DashboardCard title="Contact us">
        <Typography>
          <b>Title:</b> Contact Us [TODO]
        </Typography>
      </DashboardCard>
    </PageContainer>
  )
}

export default ContactUsPage

