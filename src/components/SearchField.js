import React, { useEffect, useRef, useState } from "react"
import { useCookies } from "react-cookie"
import { throttle } from "lodash"
import Icon from "../icons"
import SearchIcon from "../icons/SearchIcon"
import SpinnerIcon from "../icons/Spinner"

export default function SearchField({
  currentQuery,
  handleQueryChange,
  loading,
}) {
  const [cookies, setCookie] = useCookies(["searchQuery"])
  const [q, setQ] = useState(cookies.searchQuery || "")
  const [typing, setTyping] = useState(false)
  const [progress, setProgress] = useState(false)
  const searchInput = useRef(null)
  const throttled = useRef(
    throttle((newValue) => {
      handleQueryChange(newValue)
      setTyping(false)
    }, 2000)
  )
  useEffect(() => throttled.current(q), [q])
  useEffect(() => {
    setProgress(loading || typing)
  }, [loading, typing])

  return (
    <div className="control has-icons-left has-icons-right">
      <input
        className="input is-medium mb-4"
        type="text"
        defaultValue={q}
        placeholder="Search..."
        onKeyPress={(e) => {
          const v = e.target.value.trim()
          if (e.key === "Enter") {
            setQ(v)
            handleQueryChange(q)
            setTyping(false)
          }
        }}
        onChange={(e) => {
          setTyping(true)
          const v = e.target.value.trim()
          setCookie("searchQuery", v, { maxAge: 60, sameSite: true })
          setQ(v)
        }}
        autoComplete="off"
        ref={searchInput}
      />
      <span className="icon is-medium is-left">
        <SearchIcon />
      </span>
      <span className="icon is-medium is-right">
        {progress && (
          <Icon
            style={{ animation: "rotate 3s linear infinite" }}
            color={"gray"}
            size={24}
            icon={SpinnerIcon}
          />
        )}
      </span>
    </div>
  )
}
