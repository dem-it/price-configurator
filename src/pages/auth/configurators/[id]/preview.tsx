"use client"
import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ActionButtons from "@/components/auth/configurators/ActionButtons"
import Preview from "@/components/configurators/Preview"
import PageContainer from "@/components/container/PageContainer"
import Loading from "@/components/display/Loading"
import DashboardCard from "@/components/shared/DashboardCard"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import PreviewIcon from "@mui/icons-material/Preview"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ConfiguratorPreviewPage = () => {

  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth0()
  const [configuration, setConfiguration] = useState<ConfigurationDto | undefined>(undefined)
  const [data, setData] = useState<ConfigurationData | undefined>(undefined)

  useEffect(() => {
    if (!user || !id)
      return

    const fetchData = async () => {
      const response = await fetch(`/api/tables/configurations/${id}?organizationId=${user.organizationId}`)
      const result = await response.json() as ConfigurationDto
      setConfiguration(result)

      const defaultData: ConfigurationData = { questions: [] }
      setData(result.data ? JSON.parse(result.data) : defaultData)
    }

    fetchData()
  }, [user, id])

  const getTemplate = (content: JSX.Element, outerContent: JSX.Element | undefined = undefined) => {
    return (
      <PageContainer
        title={`Preview ${configuration?.name}`}>
        <DashboardCard
          title={<><PreviewIcon /> Preview configurator: {configuration?.name}</>}
          subtitle="A preview for your configurator"
          action={<ActionButtons id={id as string} organizationId={user?.organizationId} router={router} hidePreviewButton={true} />}
        >
          {content}
        </DashboardCard>
        {outerContent ?? <></>}
      </PageContainer>
    )
  }

  if (!configuration || !data)
    return getTemplate(<Loading />)

  return getTemplate(<></>, <Preview configuration={configuration} data={data} />)
}

export default withAuthenticationRequired(ConfiguratorPreviewPage)

