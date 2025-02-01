"use client"
import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ActionButtons from "@/components/auth/configurators/ActionButtons"
import AddConfigurationDialog from "@/components/configurators/Overview/AddConfiguratorDialog"
import PageContainer from "@/components/container/PageContainer"
import Loading from "@/components/display/Loading"
import StyledTable from "@/components/layout/shared/StyledTable"
import DashboardCard from "@/components/shared/DashboardCard"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import AddIcon from "@mui/icons-material/Add"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Button } from "@mui/material"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ConfiguratorsPage = () => {
  const router = useRouter()
  const { user } = useAuth0()
  const [data, setData] = useState<ConfigurationDto[] | undefined>(undefined)

  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const handleClose = (value?: boolean) => {
    setAddDialogOpen(false)
    if(value !== undefined)
      addNewConfiguration(value)
  }

  useEffect(() => {
    if (!user)
      return

    const fetchData = async () => {
      const response = await fetch(`/api/tables/configurations?organizationId=${user.organizationId}`)
      const result = await response.json() as ConfigurationDto[]
      setData(result)
    }

    fetchData()
  }, [user])

  const addNewConfiguration = async (withDefaultData: boolean) => {
    if (!user) return

    const response = await fetch(`/api/tables/configurations?organizationId=${user.organizationId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.ok) {
      const result = await response.json()
      const id = result.id
      if(withDefaultData)
        await saveDefaultData(id)
      router.push(`/auth/configurators/${result.id}/edit`)
    } else {
      console.error("Failed to post data")
    }
  }

  const saveDefaultData = async (id: string) => {
    if (!user) return

    const defaultDataJson = { "groups":[{ "id":"vsstq79b","title":"Type bus","questions":[{ "id":"l2dlhfgp","title":"Kies je bus","description":"<p>VANQO helpt met de zoektocht naar een geschikte occasion bus of een nieuwe bus. Ook hebben we regelmatig zelf geschikte bussen op voorraad.</p><p>We bouwen compacte buscampers met lengte tot maximaal 5,41m (L2H2).</p><p>De volgende bussen zijn geschikt voor een VANQO inbouw:F iat Ducato, Citroen Jumper, Peugeot Boxer, het nieuwere model Opel Mavano</p>","type":"regular","answers":[{ "id":"oe98dqa7","title":"Gebruikte bus","description":"<p>Jong gebruikte zuinige Euro6 bus geleverd door VANQO</p>","surcharge":25000 },{ "id":"5kc6dno2","title":"Nieuwe bus","description":"<p>Nieuwe bus geleverd door VANQO.</p>","surcharge":61000 },{ "id":"6x2ayklv","title":"Eigen bus","description":"<p>Zelf een geschikte bus aanleveren.</p>","surcharge":0 }] }] },{ "id":"hvo2h4ri","title":"Indeling","questions":[{ "id":"s6d3419u","title":"Kies je indeling","description":"<p>Test</p>","type":"regular","answers":[{ "id":"5dv3nc0m","title":"Ivan","description":"<p><span style=\"color: var( --e-global-color-text );\">2 zitplaatsen&nbsp;voorin, verplaatsbaar 2e zitje, vast bed van 140cm breed</span></p>","surcharge":0 },{ "id":"g794x6if","title":"Berri","description":"<p><span style=\"color: rgb(122, 122, 122);\">3 zitplaatsen voorin, L-keuken, vast bed van 130cm breed</span></p>","surcharge":0 }] }] },{ "id":"c07r8p3u","title":"Afwerking","questions":[{ "id":"yhxvhx5r","title":"Kies de afwerking","description":"<p>Zowel Ivan als Berri kunnen geleverd worden in licht eiken of walnoot.</p>","type":"regular","answers":[{ "id":"9yja6njz","title":"Licht eiken","description":"","surcharge":0 },{ "id":"e05n7lbp","title":"Walnoot","description":"","surcharge":0 }] }] },{ "id":"p0a0iak5","title":"Inbouwpakket","questions":[{ "id":"eouel1eo","title":"Kies het inbouwpakket","description":"<p><strong style=\"background-color: initial;\">Let op:</strong>&nbsp;bij indeling Berri kook je op inductie en is de upgrade naar het Off-grid XL pakket vereist.&nbsp;</p>","type":"regular","answers":[{ "id":"2fnyu5g1","title":"Standaard","description":"<p><span style=\"color: rgb(47, 43, 67);\">Inclusief vast comfortabel bed, kookvoorziening, koelkast en toilet.</span></p><p><br></p><p><strong>Compressie koelkast</strong></p><p>Energiezuinig en betrouwbaar</p><p><br></p><p><strong>Ingebouwde Porta Potti</strong></p><p>Op ladegeleiders tot 120 kg</p><p><br></p><p><strong>Ruim comfortabel bed</strong></p><p>Berri 130 cm en Ivan 140 cm breed</p><p><br></p><p><strong><s>Off-grid pakket</s></strong></p><p><s>Sta dagen achter elkaar vrij</s></p><p><br></p><p><strong><s>Warm water</s></strong></p><p><s>Handig voor een afwas in de bus</s></p><p><br></p><p><strong><s>Buitendouche</s></strong></p><p><s>Warme douche, waar je ook gaat</s></p><p><br></p><p><strong><s>Standkachel</s></strong></p><p><s>Comfortabele en veilige kachel op diesel</s></p><p><br></p><p><strong><s>Vloerverwarming</s></strong></p><p><s>Infrarood vloerverwarming bij de zitjes</s></p>","surcharge":0 },{ "id":"bzd38b6v","title":"Compleet","description":"<p class=\"\">Sta 3-5 dagen off-grid, zonnepanelen, warm water, buitendouche.</p><p class=\"\"><br></p><p class=\"\"><strong>Compressie koelkast</strong></p><p class=\"\">Energiezuinig en betrouwbaar</p><p class=\"\"><br></p><p class=\"\"><strong>Ingebouwde Porta Potti</strong></p><p class=\"\">Op ladegeleiders tot 120 kg</p><p class=\"\"><br></p><p class=\"\"><strong>Ruim comfortabel bed</strong></p><p class=\"\">Berri 130 cm en Ivan 140 cm breed</p><p class=\"\"><br></p><p class=\"\"><strong>Off-grid pakket</strong></p><p class=\"\">Sta dagen achter elkaar vrij</p><p class=\"\"><br></p><p class=\"\"><strong>Warm water</strong></p><p class=\"\">Handig voor een afwas in de bus</p><p class=\"\"><br></p><p class=\"\"><strong>Buitendouche</strong></p><p class=\"\">Warme douche, waar je ook gaat</p><p class=\"\"><br></p><p class=\"\"><strong><s>Standkachel</s></strong></p><p class=\"\"><s>In no-time heerlijk comfortabel warm</s></p><p class=\"\"><br></p><p class=\"\"><strong><s>Vloerverwarming</s></strong></p><p class=\"\"><s>Infrarood vloerverwarming bij de zitjes</s></p>","surcharge":2500 },{ "id":"b4vysl5v","title":"Luxe","description":"<p>De meest uitgebreide VANQO, met standkachel en vloerverwarming</p><p><br></p><p><strong>Compressie koelkast</strong></p><p>Energiezuinig en betrouwbaar</p><p><br></p><p><strong>Ingebouwde Porta Potti</strong></p><p>Op ladegeleiders tot 120 kg</p><p><br></p><p><strong>Ruim comfortabel bed</strong></p><p>Berri 130 cm en Ivan 140 cm breed</p><p><br></p><p><strong>Off-grid pakket XL</strong></p><p>Sta dagen achter elkaar vrij</p><p><br></p><p><strong>Warm water</strong></p><p>Handig voor een afwas in de bus</p><p><br></p><p><strong>Buitendouche</strong></p><p>Warme douche, waar je ook gaat</p><p><br></p><p><strong>Standkachel</strong></p><p>In no-time heerlijk comfortabel warm</p><p><br></p><p><strong>Vloerverwarming</strong></p><p>Infrarood vloerverwarming bij de zitjes</p><p><br></p><p><strong>Afleverpakket</strong></p><p>Grote beurt, volle dieseltank</p>","surcharge":4900 }] }] },{ "id":"l67za9kc","title":"Extra opties","questions":[{ "id":"wa3yyv8m","title":"Kies voor extra opties","description":"","type":"multiple","answers":[{ "id":"q4trp3a3","title":"Upgrade  Off-grid XL","description":"<p><span style=\"color: rgb(122, 122, 122);\">3000 Watt omvormer en 300Ah LiFePO4 accu i.p.v. 2000 Watt omvormer en 200Ah accu. Ook laad je de accu weer sneller op met het XL pakket (sterkere laders)&nbsp;</span><strong style=\"color: rgb(122, 122, 122);\">– zit standaard in het Luxe pakket</strong></p>","surcharge":500,"optionHide": { "questionId":"eouel1eo","answerId":"b4vysl5v" } },{ "id":"cij7otlt","title":"Standkachel","description":"<p><span style=\"color: rgb(122, 122, 122);\">Standkachel met bedieningpaneel en thermostaat&nbsp;</span><strong style=\"color: rgb(122, 122, 122);\">– zit standaard in het Luxe pakket</strong></p>","surcharge":1330,"optionHide": { "questionId":"eouel1eo","answerId":"b4vysl5v" } },{ "id":"gq7jurkc","title":"Grote beurt","description":"<p><span style=\"color: rgb(122, 122, 122);\">Grote onderhoudsbeurt en volle diesel tank bij aflevering</span><strong style=\"color: rgb(122, 122, 122);\">&nbsp;– zit standaard in het Luxe pakket</strong></p>","surcharge":650 },{ "id":"1dm6qax3","title":"Vloerverwarming","description":"<p><span style=\"color: rgb(122, 122, 122);\">Infrarood vloerverwarming bij de zitjes op elektra voor extra comfort, kies voor een standkachel om de ruimte te verwarmen&nbsp;</span><strong style=\"color: rgb(122, 122, 122);\">– zit standaard in het Luxe pakket</strong></p>","surcharge":300 },{ "id":"23mw0k29","title":"Isotherm koelkast","description":"<p><span style=\"color: rgb(122, 122, 122);\">Vooral interessant bij indeling Berri, je krijgt dan een Isotherm koelkast van 85L inhoud i.p.v. 65L (van het merk Hyckes)</span></p>","surcharge":450 },{ "id":"rnqarqma","title":"Hordeur","description":"<p>Plissé hordeur bij de schuifdeur</p>","surcharge":695 },{ "id":"4dykzraa","title":"Luifelrail en tarpluifel","description":"<p><br></p>","surcharge":470 },{ "id":"5i32f2da","title":"Vaste cassetteluifel","description":"<p><br></p>","surcharge":1435 },{ "id":"b2v8g4e6","title":"Fietsenrek op deur","description":"","surcharge":790 }] },{ "id":"6941t996","title":"Dikte matras","description":"","type":"regular","answers":[{ "id":"7ow78n0i","title":"12 cm","description":"<p>Dunst</p>","surcharge":0 },{ "id":"cexptamx","title":"13 cm","description":"<p>Dun</p>","surcharge":0 },{ "id":"n3cp24mn","title":"14 cm","description":"<p>Dik</p>","surcharge":0 },{ "id":"vlvwla51","title":"15 cm","description":"<p>Dikker</p>","surcharge":0 },{ "id":"lvbigdrw","title":"16 cm","description":"<p><strong>Dikst</strong></p>","surcharge":0 }],"variant":"dropdown" },{ "id":"7aal6lk6","title":"Specifieke wensen","description":"<p>Vermeld uw specifieke wensen.</p>","type":"openText","answers":[] }] }] }
    await fetch(`/api/tables/configurations/${id}/data?organizationId=${user.organizationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(defaultDataJson),
    })
  }

  const removeConfigurator = (id: string) => {
    if (!user) return

    if (!confirm("Are you sure you want to remove this configurator?"))
      return

    fetch(`/api/tables/configurations/${id}?organizationId=${user.organizationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      if (response.ok) {
        setData(data?.filter(x => x.rowKey !== id))
      } else {
        console.error("Failed to remove configurator")
      }
    })
  }

  const ExtraActionButtons = ({ id }: { id: string }) => {
    return (
      <Button
        variant='contained'
        color='error'
        onClick={() => removeConfigurator(id)}
        startIcon={<RemoveCircleOutlineIcon />}
      >
        Remove
      </Button>
    )
  }

  return (
    <PageContainer title="Configurators">
      <DashboardCard
        title="Configurators"
        subtitle="Here you can see all your configurators"
        action={<Button
          variant='contained'
          color='primary'
          onClick={() => setAddDialogOpen(true)}
          startIcon={<AddIcon />}
        >Add a new configurator</Button>}>
        <>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data ? data.map((configuration, index) => (
                <TableRow key={index}>
                  <TableCell>{configuration.rowKey}</TableCell>
                  <TableCell>{configuration.name}</TableCell>
                  <TableCell>
                    <ActionButtons
                      router={router}
                      id={configuration.rowKey}
                      organizationId={user?.organizationId}
                      hideOverviewButton={true}
                      extraActionButtons={<ExtraActionButtons id={configuration.rowKey} />}
                    />
                  </TableCell>
                </TableRow>
              )) : <TableRow>
                <TableCell colSpan={3}>
                  <Loading />
                </TableCell>
              </TableRow>}
            </TableBody>
          </StyledTable>
        </>
      </DashboardCard>
      <AddConfigurationDialog open={addDialogOpen} onClose={handleClose} />
    </PageContainer>
  )
}

export default withAuthenticationRequired(ConfiguratorsPage)

