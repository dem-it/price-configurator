"use client"
import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import PageContainer from "@/components/container/PageContainer"
import DashboardCard from "@/components/shared/DashboardCard"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useEffect, useState } from "react"

const ConfiguratorsPage = () => {

  const { user } = useAuth0()
  const [data, setData] = useState<ConfigurationDto[]>([])

  useEffect(() => {
    if(!user)
      return

    const fetchData = async () => {
      const response = await fetch(`/api/tables/configurations?organizationId=${user.organizationId}`)
      const result = await response.json() as ConfigurationDto[]
      setData(result)
    }

    fetchData()
  }, [user])

  return (
    <PageContainer title="Configurators" description="This is the configurators page">
      <DashboardCard title="Configurators">
        <>
          Here are all your configurators:
          <ul>
            {data.map((configuration, index) => (
              <li key={index}>{configuration.PartitionKey} - {configuration.Name}</li>
            ))}
          </ul>
        </>
      </DashboardCard>
    </PageContainer>
  )
}

export default withAuthenticationRequired(ConfiguratorsPage)

