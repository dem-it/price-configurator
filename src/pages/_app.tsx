import { SnackbarProvider } from "@/components/hoc/SnackbarContext"
import { baselightTheme } from "@/utils/theme/DefaultColors"
import { Auth0Provider } from "@auth0/auth0-react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import type { ReactElement, ReactNode } from "react"
import "../../public/styles/configurator.css"
import "../../public/styles/globals.css"
import Layout from "./layout"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return <>
    <Auth0Provider
      domain="https://dev-bha1i8wi67urwpal.eu.auth0.com"
      clientId="TBRlXGxqeLDzObi9xyytIiUre7d3h1Nf"
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : undefined,
      }}
    >
      <ThemeProvider theme={baselightTheme}>
        <SnackbarProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </Auth0Provider>
  </>
}
