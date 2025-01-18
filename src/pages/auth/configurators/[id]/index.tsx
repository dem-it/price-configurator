"use client"
import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ActionButtons from "@/components/auth/configurators/ActionButtons"
import PageContainer from "@/components/container/PageContainer"
import DashboardCard from "@/components/shared/DashboardCard"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

const ConfiguratorPage = () => {

  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth0()
  const [data, setData] = useState<ConfigurationDto | undefined>(undefined)

  useEffect(() => {
    if (!user || !id)
      return

    const fetchData = async () => {
      const response = await fetch(`/api/tables/configurations/${id}?organizationId=${user.organizationId}`)
      const result = await response.json() as ConfigurationDto
      setData(result)
    }

    fetchData()
  }, [user, id])

  const getTemplate = (content: JSX.Element) => {
    return (
      <PageContainer
        title={`Configurator: ${data?.name}`}>
        <DashboardCard
          title={`Configurator: ${data?.name}`}
          subtitle="Here you can see all your configurators"
          action={<ActionButtons id={id as string} organizationId={user?.organizationId} router={router} />}
          >
          {content}
        </DashboardCard>
      </PageContainer>
    )
  }

  if (!data)
    return getTemplate(<p>Loading...</p>)

  return getTemplate(<>
    <b>Name:</b> {data?.name}
  </>)
}

export default withAuthenticationRequired(ConfiguratorPage)

