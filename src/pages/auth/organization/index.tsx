"use client"
import PageContainer from "@/components/container/PageContainer"
import DashboardCard from "@/components/shared/DashboardCard"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

const OrganizationPage = () => {

  const { user } = useAuth0()

  return (
    <PageContainer title="Organization" description="This is Organization page">
      <DashboardCard title="Organization">
        <>
          Welcome on the organization page
        </>
      </DashboardCard>
    </PageContainer>
  )
}

export default withAuthenticationRequired(OrganizationPage)

