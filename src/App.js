import { useState } from "react"
import First from "./components/First"
import { NormalText } from "./utils/typography"
import { useCookies } from "react-cookie"
import DatasetPicker from "./components/DatasetPicker"
import Thanks from "./components/Thanks"

export default function App() {
  const [cookies, setCookies] = useCookies(["mode", "email", "phone"])
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
    <NormalText>
      {Mode.mode === "" && <First HandleModeChange={SetMode} />}
      {["lottery", "anonymous"].includes(Mode.mode) && (
        <DatasetPicker Mode={Mode} HandleModeChange={SetMode} />
      )}
      {Mode.mode === "confirm" && (
        <Thanks HandleModeChange={SetMode} setCookies={setCookies} s/>
      )}
    </NormalText>
  )
}
