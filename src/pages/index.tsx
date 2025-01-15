"use client"
import PageContainer from "@/components/container/PageContainer"
import DashboardCard from "@/components/shared/DashboardCard"
import { Box, Grid } from "@mui/material"
import Image from "next/image"

const Dashboard = () => {

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <DashboardCard>
          <Grid container spacing={3} justifyItems="top" alignItems="top">
            <Grid item lg={6}>
              <h2>Price configurator</h2>
              <p>
                  Your clients need an easy way for configurating your product
              </p>
            </Grid>

            <Grid item lg={6}>
              <Image
                src="/images/logos/banner.png"
                alt="Price configurator banner"
                width={609 / 3 * 2}
                height={921 / 3 * 2} />
            </Grid>
          </Grid>
        </DashboardCard>
      </Box>
    </PageContainer >
  )
}

export default Dashboard
