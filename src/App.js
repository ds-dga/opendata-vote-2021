import { useState } from "react"
import First from "./components/First"
import { NormalText } from "./utils/typography"
import { useApollo } from "./services/apollo"
import { useCookies } from "react-cookie"
import DatasetPicker from "./components/DatasetPicker"
import Thanks from "./components/Thanks"
import { ApolloProvider } from "@apollo/client"

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
        {Mode.mode === "" && <First HandleModeChange={SetMode} />}
        {["lottery", "anonymous"].includes(Mode.mode) && (
          <DatasetPicker Mode={Mode} HandleModeChange={SetMode} />
        )}
        {Mode.mode === "confirm" && (
          <Thanks HandleModeChange={SetMode} setCookie={setCookie} />
        )}
      </NormalText>
    </ApolloProvider>
  )
}
