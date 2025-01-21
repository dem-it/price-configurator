import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationData from "@/data/configurator/ConfigurationData"

interface PreviewProps {
  configuration: ConfigurationDto
  data: ConfigurationData
}

export default PreviewProps