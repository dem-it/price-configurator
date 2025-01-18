"use client"
import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ActionButtons from "@/components/auth/configurators/ActionButtons"
import Edit from "@/components/auth/configurators/Edit"
import PageContainer from "@/components/container/PageContainer"
import DashboardCard from "@/components/shared/DashboardCard"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

const ConfiguratorEditPage = () => {

  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth0()
  const [data, setData] = useState<ConfigurationDto | undefined>(undefined)

  useEffect(() => {
    if (!user)
      return

    const fetchData = async () => {
      const response = await fetch(`/api/tables/configurations/${id}?organizationId=${user.organizationId}`)
      const result = await response.json() as ConfigurationDto
      setData(result)
    }

    fetchData()
  }, [user])

  const getTemplate = (content: JSX.Element) => {
    return (
      <PageContainer
        title={`Edit ${data?.name}`}>
        <DashboardCard
        title={<><EditIcon /> Edit configurator: {data?.name}</>}
          subtitle="Edit this configurator"
          action={<ActionButtons id={id as string} organizationId={user?.organizationId} router={router} />}
        >
          {content}
        </DashboardCard>
      </PageContainer>
    )
  }

  if (!data)
    return getTemplate(<p>Loading...</p>)

  return getTemplate(<Edit configuration={data} />)
}

export default withAuthenticationRequired(ConfiguratorEditPage)

