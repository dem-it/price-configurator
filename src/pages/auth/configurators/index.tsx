"use client"
import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ActionButtons from "@/components/auth/configurators/ActionButtons"
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

  const addNewConfiguration = async () => {
    if (!user) return

    const response = await fetch(`/api/tables/configurations?organizationId=${user.organizationId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.ok) {
      const result = await response.json()
      router.push(`/auth/configurators/${result.id}`)
    } else {
      console.error("Failed to post data")
    }
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
          onClick={addNewConfiguration}
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
    </PageContainer>
  )
}

export default withAuthenticationRequired(ConfiguratorsPage)

