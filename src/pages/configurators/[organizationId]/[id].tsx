"use client"
import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import Preview from "@/components/configurators/Preview"
import Loading from "@/components/display/Loading"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ConfiguratorPage = () => {

  const router = useRouter()
  const { organizationId, id } = router.query
  const [configuration, setConfiguration] = useState<ConfigurationDto | undefined>(undefined)
  const [data, setData] = useState<ConfigurationData | undefined>(undefined)

  useEffect(() => {
    if (!organizationId || !id)
      return
    const fetchData = async () => {
      const response = await fetch(`/api/tables/configurations/${id}?organizationId=${organizationId}`)
      const result = await response.json() as ConfigurationDto
      setConfiguration(result)

      const defaultData: ConfigurationData = { groups: [] }
      setData(result.data ? JSON.parse(result.data) : defaultData)
    }

    fetchData()
  }, [organizationId, id])

  useEffect(() => {
    if(!document)
      return

    document.body.classList.add("no-template")
    return () => {
      document.body.classList.remove("no-template")
    }
  }, [])

  if (!configuration || !data)
    return <Loading />

  return <Preview configuration={configuration} data={data} />
}

export default ConfiguratorPage

