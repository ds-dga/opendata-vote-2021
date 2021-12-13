import { useState } from "react"
import { useCookies } from "react-cookie"
import { NormalText } from "./utils/typography"
import { useApollo } from "./services/apollo"
import { ApolloProvider } from "@apollo/client"
import Main from "./pages/main"
import Navbar from "./components/Navbar"
import "../node_modules/bulma/css/bulma.css"

export default function App() {
  const apolloClient = useApollo()
  const [cookies, setCookie] = useCookies(["mode", "email", "phone"])
  const [Mode, SetMode] = useState({
    mode: cookies.mode || "",
    email: cookies.email || "",
    phone: cookies.phone || "",
  })
  /* mode
    '' -> First step
    'lottery', 'anonymous' --> Second step
    'confirm' --> done
  */

  return (
    <ApolloProvider client={apolloClient}>
      <NormalText>
        <Navbar />
        <Main />
        {/* {Mode.mode === "" && <First HandleModeChange={SetMode} />}
        {["lottery", "anonymous"].includes(Mode.mode) && (
          <DatasetPicker Mode={Mode} HandleModeChange={SetMode} />
        )}
        {Mode.mode === "confirm" && (
          <Thanks HandleModeChange={SetMode} setCookie={setCookie} />
        )} */}
      </NormalText>
    </ApolloProvider>
  )
}
