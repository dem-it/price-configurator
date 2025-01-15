"use client"
import PageContainer from "@/components/container/PageContainer"
import DashboardCard from "@/components/shared/DashboardCard"
import BuildIcon from "@mui/icons-material/Build"
import HandymanIcon from "@mui/icons-material/Handyman"
import LinkIcon from "@mui/icons-material/Link"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount"
import Grid from "@mui/material/Grid"

const HowItWorksPage = () => {
  return (
    <PageContainer title="How It Works" description="This is How It Works page">
      <DashboardCard title="How It Works">
        <Grid container spacing={3} justifyItems="center" alignItems="center">
          <Grid item lg={12}>
            Our price configurator tool is designed to make customization easy and intuitive. Here is how you can get started in just a few simple steps:
          </Grid>

          <Grid item lg={1}>
            <SwitchAccountIcon color='primary' style={{ fontSize: "70px" }} />
          </Grid>
          <Grid item lg={11}>
            <h2>1. Create Your Account</h2>
            <p>
              Sign up to access the full functionality of our configurator tool. Once registered, you will gain access to a user-friendly dashboard where you can manage your projects with ease.
            </p>
          </Grid>
          <Grid item lg={1}>
            <HandymanIcon color='primary' style={{ fontSize: "70px" }} />
          </Grid>
          <Grid item lg={11}>
            <h2>2. Build Your Configurator</h2>
            <p>
              Use our step-by-step interface to design your custom price configurator. Define the products or services you want to showcase, set the configuration options, and tailor the pricing structure to suit your needs.
            </p>
          </Grid>
          <Grid item lg={1}>
            <LinkIcon color='primary' style={{ fontSize: "70px" }} />
          </Grid>
          <Grid item lg={11}>
            <h2>3. Get Your Unique URL</h2>
            <p>
              Each configurator you create will have its own unique URL. You can:
              <br />
              <br />
              Embed It on Your Website: Integrate the configurator directly into your site for seamless user experiences.
              <br />Use It as a Standalone Page: Share the URL with your customers to let them access the configurator independently.
            </p>
          </Grid>
          <Grid item lg={1}>
            <SupportAgentIcon color='primary' style={{ fontSize: "70px" }} />
          </Grid>
          <Grid item lg={11}>
            <h2>4. Engage Your Customers</h2>
            <p>
              Once live, your configurator allows users to explore options, make customizations, and instantly see pricing. It&apos;s the perfect way to empower your customers while saving time on manual quotes.
            </p>
          </Grid>
          <Grid item lg={1}>
            <BuildIcon color='primary' style={{ fontSize: "70px" }} />
          </Grid>
          <Grid item lg={11}>
            <h2>5. Manage and Update Anytime</h2>
            <p>
              Need to make changes? Log in to your account anytime to edit your configurator or update pricing details. The changes are reflected instantly, ensuring your configurator is always up to date.
            </p>
          </Grid>
          <Grid item lg={12}>
            Start creating your configurator today and elevate your customer experience!
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  )
}

export default HowItWorksPage

