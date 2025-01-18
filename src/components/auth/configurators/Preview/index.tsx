import { ConfigurationDto } from "@/api/tables/ConfigurationDto"

interface PreviewProps {
  configuration: ConfigurationDto
}

const Preview = (props: PreviewProps) => {
  const configuration = props.configuration

  return <>
    {configuration.name}
  </>
}

export default Preview