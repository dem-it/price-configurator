"use client"
import PageContainer from "@/components/container/PageContainer"
import { Typography } from "@mui/material"
// components
import DashboardCard from "@/components/shared/DashboardCard"

const Dashboard = () => {

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title="Welcome">
        <Typography>
          Welcome [ here some text and dashboard functionalities ]
        </Typography>
      </DashboardCard>
    </PageContainer>
  )
}

export default Dashboard
