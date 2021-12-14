import { useCallback, useEffect, useState } from "react"
import { NormalText } from "./utils/typography"
import { useApollo } from "./services/apollo"
import { ApolloProvider } from "@apollo/client"
import Main from "./pages/main"
import Navbar from "./components/Navbar"
import "../node_modules/bulma/css/bulma.css"

export default function App() {
  const apolloClient = useApollo()
  const [IP, setIP] = useState(null)

  const handleGetIP = useCallback(async () => {
    const res = await fetch("https://tool.everyday.in.th/ip?format=text")
    if (res.status !== 200) {
      setTimeout(handleGetIP, 1000)
      return
    }
    const txt = await res.text()
    setIP(txt)
  }, [setIP])

  useEffect(() => {
    handleGetIP()
  }, [handleGetIP])

  return (
    <ApolloProvider client={apolloClient}>
      <NormalText>
        <Navbar />
        <Main IP={IP} />
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
