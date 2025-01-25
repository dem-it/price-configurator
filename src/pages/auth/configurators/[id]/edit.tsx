"use client"
import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ActionButtons from "@/components/auth/configurators/ActionButtons"
import Edit from "@/components/configurators/Edit"
import EditGroup from "@/components/configurators/Edit/Groups"
import PageContainer from "@/components/container/PageContainer"
import Loading from "@/components/display/Loading"
import DashboardCard from "@/components/shared/DashboardCard"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import EditIcon from "@mui/icons-material/Edit"
import { Stack, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ConfiguratorEditPage = () => {

  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth0()

  const [configuration, setConfiguration] = useState<ConfigurationDto>()
  const [configurationName, setConfigurationName] = useState<string>("")
  const [data, setData] = useState<ConfigurationData>()

  useEffect(() => {
    if (!user || !id)
      return

    const fetchData = async () => {
      const response = await fetch(`/api/tables/configurations/${id}?organizationId=${user.organizationId}`)
      const result = await response.json() as ConfigurationDto
      setConfiguration(result)
      setConfigurationName(result.name)

      const defaultData: ConfigurationData = { groups: [] }
      setData(result.data ? JSON.parse(result.data) : defaultData)
    }

    fetchData()
  }, [user, id])

  function saveToDatabase(updatedData: ConfigurationData) {
    if (configuration === undefined)
      return

    fetch(`/api/tables/configurations/${configuration.rowKey}/data?organizationId=${configuration.partitionKey}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }).then((response) => {

      setData({ ...updatedData })
    })
  }

  function saveNameToDatabase(name: string) {
    if (configuration === undefined)
      return

    fetch(`/api/tables/configurations/${configuration.rowKey}/name?organizationId=${configuration.partitionKey}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: name,
    }).then((response) => {
      setConfiguration({ ...configuration, name: name })
      setConfigurationName(name)
    })
  }

  const getTemplate = (content: JSX.Element, outerContent: JSX.Element | undefined = undefined) => {
    return (
      <PageContainer
        title={`Edit ${configuration?.name}`}>
        <DashboardCard
          title={<Stack direction="row" spacing={1}>
            <EditIcon />
            <span>Edit configurator:</span>
            <TextField
              variant="standard"
              value={configurationName}
              onChange={(e) => setConfigurationName(e.target.value)}
              onBlur={(e) => {
                saveNameToDatabase(e.target.value)
              }}
            />
          </Stack>}
          subtitle="Edit this configurator"
          action={<ActionButtons id={id as string} organizationId={user?.organizationId} router={router} hideEditButton={true} />}
        >
          {content}
        </DashboardCard>
        {outerContent ?? <></>}
      </PageContainer>
    )
  }

  if (!data)
    return getTemplate(<Loading />)

  const props = {
    configuration: configuration as ConfigurationDto,
    data: data,
    saveToDatabase: saveToDatabase
  }

  return getTemplate(<Edit {...props} />, <EditGroup {...props} />)
}

export default withAuthenticationRequired(ConfiguratorEditPage)

