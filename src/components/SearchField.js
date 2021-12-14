import React, { useEffect, useRef, useState } from "react"
import { useCookies } from "react-cookie"
import SearchIcon from "../icons/SearchIcon"

export default function SearchField({ currentQuery, handleQueryChange }) {
  const [cookies, setCookie] = useCookies(["searchQuery"])
  const [q, setQ] = useState(cookies.searchQuery || "")
  const searchInput = useRef(null)

  useEffect(() => {
    if (q !== currentQuery) {
      if (currentQuery.length === 0) {
        handleQueryChange(q)
      }
    }
  }, [q, currentQuery, handleQueryChange])

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
          }
        }}
        onChange={(e) => {
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
        {/* <i className="fas fa-check"></i> */}
      </span>
    </div>
  )
}
