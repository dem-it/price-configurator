import { GroupsProps } from "../../Properties"
import ConfiguratorEmail from "./ConfiguratorEmail"
import ConfiguratorEmailFrom from "./ConfiguratorEmailFrom"
import EmailTemplate from "./EmailTemplate"
import SendToCustomer from "./SendToCustomer"

const ConfigureQuoteRequest = (props: GroupsProps) => {

  return <>
    <h2>Request a quote</h2>
    <p>
      At the last page of the configurator, the user can request a quote. Please configure the following settings:
    </p>
    <ConfiguratorEmailFrom {...props} />
    <hr />
    <ConfiguratorEmail {...props} />
    <hr />
    <EmailTemplate {...props} />
    <hr />
    <SendToCustomer {...props} />
  </>
}

export default ConfigureQuoteRequest