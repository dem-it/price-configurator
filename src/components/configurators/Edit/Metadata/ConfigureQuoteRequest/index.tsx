import { GroupsProps } from "../../Properties"
import ConfiguratorEmail from "./ConfiguratorEmail"
import SendToCustomer from "./SendToCustomer"

const ConfigureQuoteRequest = (props: GroupsProps) => {

  return <>
    <p>
      At the end of the configurator, the user can request a quote. Please configure the following settings:
    </p>
    <ConfiguratorEmail {...props} />
    <SendToCustomer {...props} />
  </>
}

export default ConfigureQuoteRequest