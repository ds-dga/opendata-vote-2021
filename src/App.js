import { useState } from "react";
import First from "./components/first";
import { NormalText } from "./utils/typography";
import { useCookies } from "react-cookie";
import DatasetPicker from "./components/DatasetPicker";

export default function App() {
  const [cookies] = useCookies(["mode", "email", "phone"]);
  const [Mode, SetMode] = useState({
    mode: cookies.mode || "",
    email: cookies.email || "",
    phone: cookies.phone || "",
  });
  /* mode
    '' -> First step
    'lottery', 'anonymous' --> Second step
    'confirm' --> Third
    'done' ---> done
  */

  return (
    <NormalText>
      {Mode.mode === "" && <First HandleModeChange={SetMode} />}
      {["lottery", "anonymous"].includes(Mode.mode) && (
        <DatasetPicker mode={Mode} HandleModeChange={SetMode} />
      )}
    </NormalText>
  );
}
