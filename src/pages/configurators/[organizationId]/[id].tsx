"use client"
import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import Preview from "@/components/auth/configurators/Preview"
import PageContainer from "@/components/container/PageContainer"
import DashboardCard from "@/components/shared/DashboardCard"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

const ConfiguratorPage = () => {

  const router = useRouter()
  const { organizationId, id } = router.query
  const [data, setData] = useState<ConfigurationDto | undefined>(undefined)

  useEffect(() => {
    if (!organizationId || !id)
      return
    const fetchData = async () => {
      const response = await fetch(`/api/tables/configurations/${id}?organizationId=${organizationId}`)
      const result = await response.json() as ConfigurationDto
      setData(result)
    }

    fetchData()
  }, [organizationId, id])

  const getTemplate = (content: JSX.Element) => {
    return (
      <PageContainer
        title={`Configurator ${data?.name}`}>
        <DashboardCard
          title={`Configurator ${data?.name}`}
          subtitle="Here you can see all your configurators">
          {content}
        </DashboardCard>
      </PageContainer>
    )
  }

  if (!data)
    return getTemplate(<p>Loading...</p>)

  return getTemplate(<>
    <b>PREVIEW</b>
    <Preview configuration={data} />
  </>)
}

export default ConfiguratorPage

