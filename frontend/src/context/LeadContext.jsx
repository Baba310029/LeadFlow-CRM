import { createContext, useContext, useState, useEffect, useCallback } from "react"
import API from "../services/api"

const LeadContext = createContext()

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await API.get("/leads")
      setLeads(data.leads)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  return (
    <LeadContext.Provider value={{ leads, fetchLeads, loading }}>
      {children}
    </LeadContext.Provider>
  )
}

export const useLeads = () => useContext(LeadContext)