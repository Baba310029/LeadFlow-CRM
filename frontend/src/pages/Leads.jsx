import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import API from "../services/api"
import { useLeads } from "../context/LeadContext"
import MainLayout from "../layouts/MainLayout"

function Leads() {
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    source: "",
    followUpDate: ""
  })
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [selectedLead, setSelectedLead] = useState(null)
  const [newNote, setNewNote] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [leadToDelete, setLeadToDelete] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  
  const { leads, fetchLeads, loading } = useLeads()

  const leadsPerPage = 6
  const filteredLeads = leads
    .filter((lead) =>
      activeFilter === "all" ? true : lead.status === activeFilter
    )
    .filter((lead) =>
      [lead.name, lead.email, lead.source]
        .join(" ")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    )

  const indexOfLastLead = currentPage * leadsPerPage
  const indexOfFirstLead = indexOfLastLead - leadsPerPage
  const currentLeads = filteredLeads.slice(
    indexOfFirstLead,
    indexOfLastLead
  )

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null)
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, debouncedSearch])

  const createLead = async () => {
    try {
      await API.post("/leads", newLead)
      setNewLead({ name: "", email: "", source: "", followUpDate: "" })
      await fetchLeads()
    } catch (error) {
      console.log(error)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}/status`, { status })
      await fetchLeads()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLead = async () => {
    if (!leadToDelete) return
    try {
      await API.delete(`/leads/${leadToDelete._id}`)
      await fetchLeads()
      setLeadToDelete(null)
      setSelectedLead(null)
    } catch (error) {
      console.log(error)
    }
  }

  const addNote = async () => {
    if (!newNote.trim() || !selectedLead) return
    try {
      await API.post(`/leads/${selectedLead._id}/notes`, { text: newNote })
      setNewNote("")
      await fetchLeads()
    } catch (error) {
      console.log(error)
    }
  }

  const getStatusColor = (status) => {
    if (status === "new") return "bg-accentOrange text-cream"
    if (status === "contacted") return "bg-primary text-cream"
    if (status === "converted") return "bg-accentRed text-cream"
  }

  const getFollowUpStatus = (date) => {
    if (!date) return null

    const today = new Date()
    const followUp = new Date(date)

    today.setHours(0,0,0,0)
    followUp.setHours(0,0,0,0)

    if (followUp < today)
      return { label: "Overdue", color: "bg-accentRed text-cream" }

    if (followUp.getTime() === today.getTime())
      return { label: "Today", color: "bg-accentOrange text-cream" }

    return { label: "Upcoming", color: "bg-primary text-cream" }
  }

  const exportToCSV = () => {
    if (filteredLeads.length === 0) return

    const headers = ["Name","Email","Source","Status","Follow Up Date"]

    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.source,
      lead.status,
      lead.followUpDate
        ? new Date(lead.followUpDate).toLocaleDateString()
        : ""
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)

    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "leads.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <MainLayout>
      {/* ADD LEAD FORM */}
      <div className="mb-8 bg-white dark:bg-[#1e293b] dark:shadow-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-semibold text-primary dark:text-cream mb-4 tracking-wide">
          Add New Lead
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Name"
            value={newLead.name}
            onChange={(e) =>
              setNewLead({ ...newLead, name: e.target.value })
            }
            className="
              w-full
              border border-primary/20 dark:border-white/10
              bg-white dark:bg-[#0f172a]
              text-primary dark:text-cream
              placeholder:text-primary/50 dark:placeholder:text-white/40
              focus:ring-2 focus:ring-accentOrange
              focus:border-accentOrange
              outline-none
              p-2
              rounded-lg
              transition
            "
          />

          <input
            type="email"
            placeholder="Email"
            value={newLead.email}
            onChange={(e) =>
              setNewLead({ ...newLead, email: e.target.value })
            }
            className="
              w-full
              border border-primary/20 dark:border-white/10
              bg-white dark:bg-[#0f172a]
              text-primary dark:text-cream
              placeholder:text-primary/50 dark:placeholder:text-white/40
              focus:ring-2 focus:ring-accentOrange
              focus:border-accentOrange
              outline-none
              p-2
              rounded-lg
              transition
            "
          />

          <input
            type="text"
            placeholder="Source"
            value={newLead.source}
            onChange={(e) =>
              setNewLead({ ...newLead, source: e.target.value })
            }
            className="
              w-full
              border border-primary/20 dark:border-white/10
              bg-white dark:bg-[#0f172a]
              text-primary dark:text-cream
              placeholder:text-primary/50 dark:placeholder:text-white/40
              focus:ring-2 focus:ring-accentOrange
              focus:border-accentOrange
              outline-none
              p-2
              rounded-lg
              transition
            "
          />

          <input
            type="date"
            value={newLead.followUpDate}
            onChange={(e) =>
              setNewLead({ ...newLead, followUpDate: e.target.value })
            }
            className="
              w-full
              border border-primary/20 dark:border-white/10
              bg-white dark:bg-[#0f172a]
              text-primary dark:text-cream
              placeholder:text-primary/50 dark:placeholder:text-white/40
              focus:ring-2 focus:ring-accentOrange
              focus:border-accentOrange
              outline-none
              p-2
              rounded-lg
              transition
              dark:[color-scheme:dark]
            "
          />
          <button
            onClick={createLead}
            className="w-full bg-primary text-cream py-2 rounded-lg hover:bg-accentOrange transition duration-300 active:scale-95"
          >
            Add
          </button>

        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="relative max-w-md">

          <input
            type="text"
            placeholder="Search by name, email, or source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2
              border border-primary/20 dark:border-white/10
              bg-white dark:bg-[#0f172a]
              text-primary dark:text-cream
              placeholder:text-primary/50 dark:placeholder:text-white/40
              rounded-lg
              focus:ring-2 focus:ring-accentOrange
              focus:border-accentOrange
              outline-none
              text-sm
              transition
            "
          />

          {/* Search Icon */}
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-primary dark:text-cream/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-4.65a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">

      {/* FILTER TABS */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {["all", "new", "contacted", "converted"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-4 py-2 text-sm rounded-lg capitalize transition-all duration-200 active:scale-95
                ${
                  activeFilter === status
                    ? "bg-primary text-cream"
                    : "bg-white dark:bg-[#1e293b] dark:shadow-lg border border-primary/20 hover:bg-primary/40 hover:text-primary dark:text-cream"
                }
              `}
            >
              {status}
            </button>
          ))}
        </div>

        <button
          onClick={exportToCSV}
          className="px-4 py-2 text-sm rounded-lg bg-primary text-cream hover:bg-accentOrange transition active:scale-95"
        >
          Export CSV
        </button>

      </div>

      {/* LEADS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

        {currentLeads.map((lead) => (
          <div
            key={lead._id}
            onClick={(e) => {
              if (e.target.closest("button")) return
              setSelectedLead(lead)
            }}
            className="
            bg-white dark:bg-[#1e293b] dark:shadow-lg border
              border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 shadow-sm
              hover:shadow-xl hover:-translate-y-1 
              transition-all duration-300 
              rounded-xl p-5 flex flex-col 
              justify-between cursor-pointer
            "
          >

            {/* Top Section — Lead Info */}
            <div>
              <h3 className="text-lg font-bold text-primary dark:text-cream tracking-wide">
                {lead.name}
              </h3>

              <p className="text-sm text-primary dark:text-cream/70 mt-1">
                {lead.email}
              </p>

              <p className="text-sm text-primary dark:text-cream/70 mt-1">
                Source: {lead.source}
              </p>
            </div>

            {/* Follow-Up Section */}
            {lead.followUpDate && (
              <div className="mt-4 pt-3 border-t border-primary/10 dark:border-white/10">
                <p className="text-xs text-primary dark:text-cream/70">
                  Follow-up:{" "}
                  {new Date(lead.followUpDate).toLocaleDateString()}
                </p>

                {(() => {
                  const followStatus = getFollowUpStatus(lead.followUpDate)
                  return (
                    <span
                      className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${followStatus.color}`}
                    >
                      {followStatus.label}
                    </span>
                  )
                })()}
              </div>
            )}

            {/* Status Section */}
            <div className="mt-4 pt-3 border-t border-primary/10 dark:border-white/10 relative">

              {/* Current Status Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenDropdownId(openDropdownId === lead._id ? null : lead._id)
                }}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg border border-primary/20 bg-white dark:bg-[#1e293b] dark:shadow-lg transition hover:bg-primary/5`}
              >
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(lead.status)}`}
                >
                  {lead.status}
                </span>

                <span className="text-primary dark:text-cream/50 ml-2">▼</span>
              </button>

              {/* Dropdown Menu */}
              {openDropdownId === lead._id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 mt-2 w-full bg-white dark:bg-[#1e293b] dark:shadow-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 rounded-lg shadow-lg z-50 animate-fadeIn"
                >
                  {["new", "contacted", "converted"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        updateStatus(lead._id, status)
                        setOpenDropdownId(null)
                      }}
                      className="flex items-center justify-between w-full px-3 py-2 text-xs hover:bg-primary/5 transition active:scale-95"
                    >
                      <span
                        className={`px-2 py-1 rounded-full ${getStatusColor(status)}`}
                      >
                        {status}
                      </span>
                    </button>
                  ))}
                </div>
              )}

            </div>

            

          </div>
        ))}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-8 flex-wrap gap-4">
        <p className="text-sm text-primary dark:text-cream/60">
          Showing {indexOfFirstLead + 1}–
          {Math.min(indexOfLastLead, filteredLeads.length)} of {filteredLeads.length}
        </p>

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2">

            {/* Previous */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="
                px-3 py-1 text-sm rounded-lg dark:text-cream shadow-md
                bg-white dark:bg-[#1e293b]
                border border-primary/20 dark:border-white/10
                hover:bg-primary/10
                disabled:opacity-40
                active:scale-95
              "
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`
                  px-3 py-1 text-sm rounded-lg transition active:scale-95
                  ${
                    currentPage === i + 1
                      ? "bg-primary text-cream shadow-md"
                      : "bg-white dark:bg-[#1e293b] border border-primary/20 dark:border-white/10 hover:bg-primary/10"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="
                px-3 py-1 text-sm rounded-lg dark:text-cream shadow-md
                bg-white dark:bg-[#1e293b]
                border border-primary/20 dark:border-white/10
                hover:bg-primary/10
                disabled:opacity-40
                active:scale-95
              "
            >
              Next
            </button>

          </div>
        )}
      </div>

      {/* LEAD DETAIL DRAWER */}
      {selectedLead && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setSelectedLead(null)}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Drawer Panel */}
          <div
            className={`
              fixed right-0 top-0 h-full
              w-full sm:w-96
              bg-white dark:bg-[#1e293b]
              border-l border-primary/10 dark:border-white/10
              shadow-2xl dark:shadow-black/40
              z-50
              p-6
              overflow-y-auto
              transform transition-transform duration-300 ease-out
              ${selectedLead ? "translate-x-0" : "translate-x-full"}
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-primary dark:text-cream">
                Lead Details
              </h2>

              <button
                onClick={() => setSelectedLead(null)}
                className="text-primary dark:text-cream/60 hover:text-primary dark:text-cream active:scale-95"
              >
                ✕
              </button>
            </div>

            {/* Lead Info */}
            <div className="space-y-4">

              <div>
                <p className="text-sm text-primary dark:text-cream/60">Name</p>
                <p className="font-medium text-primary dark:text-cream">
                  {selectedLead.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-primary dark:text-cream/60">Email</p>
                <p className="font-medium text-primary dark:text-cream">
                  {selectedLead.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-primary dark:text-cream/60">Source</p>
                <p className="font-medium text-primary dark:text-cream">
                  {selectedLead.source}
                </p>
              </div>

              {selectedLead.followUpDate && (
                <div>
                  <p className="text-sm text-primary dark:text-cream/60">Follow-up</p>
                  <p className="font-medium text-primary dark:text-cream">
                    {new Date(selectedLead.followUpDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* NOTES SECTION */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-primary dark:text-cream mb-3">
                  Notes Timeline
                </h3>

                {/* Add Note Input */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="
                      flex-1 px-3 py-2 text-sm rounded-lg
                      border border-primary/20 dark:border-white/10
                      bg-white dark:bg-[#0f172a]
                      text-primary dark:text-cream
                      placeholder:text-primary/50 dark:placeholder:text-white/40
                      focus:ring-2 focus:ring-accentOrange
                      outline-none
                    "
                  />

                  <button
                    onClick={addNote}
                    className="px-4 py-2 text-sm rounded-lg bg-primary text-cream hover:bg-accentOrange transition active:scale-95"
                  >
                    Add
                  </button>
                </div>

                {/* DELETE BUTTON */}
                <div className="my-8">
                  <button
                    onClick={() => setLeadToDelete(selectedLead)}
                    className="
                      w-full py-2 rounded-lg
                      bg-accentRed
                      text-cream
                      hover:opacity-90
                      transition
                      dark:bg-accentRed/90
                      active:scale-95
                    "
                  >
                    Delete Lead
                  </button>
                </div>

                {/* Timeline */}
                <div className="relative pl-4 border-l-2 border-primary/20 dark:border-white/10 space-y-4">
                  {(selectedLead.notes || []).map((note, index) => (
                    <div key={index} className="relative">

                      {/* Dot */}
                      <span className="absolute -left-[9px] top-1 w-3 h-3 bg-primary rounded-full"></span>

                      <div className="bg-cream p-3 dark:bg-[#0f172a] p-3 rounded-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 shadow-sm">
                        <p className="text-sm text-primary dark:text-cream">
                          {note.text}
                        </p>
                        <p className="text-xs text-primary dark:text-cream/40 mt-1">
                          {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIVITY LOG */}
              <div className="mt-10">
                <h3 className="text-sm font-semibold text-primary dark:text-cream mb-3">
                  Activity
                </h3>

                <div className="relative pl-4 border-l-2 border-primary/20 dark:border-white/10 space-y-4">
                  {(selectedLead.activity || []).map((activity, index) => (
                    <div key={index} className="relative">

                      <span className="absolute -left-[9px] top-1 w-3 h-3 bg-primary rounded-full"></span>

                      <div className="bg-cream p-3 dark:bg-[#0f172a] p-3 rounded-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 shadow-sm">
                        <p className="text-sm text-primary dark:text-cream">
                          {activity.text}
                        </p>
                        <p className="text-xs text-primary/60 dark:text-white/40 mt-1">
                          {new Date(activity.createdAt).toLocaleString()}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {leadToDelete && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setLeadToDelete(null)}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#1e293b] dark:shadow-lg w-full max-w-md rounded-xl shadow-2xl p-6 animate-modal">

              <h3 className="text-lg font-semibold text-primary dark:text-cream mb-4">
                Confirm Deletion
              </h3>

              <p className="text-sm text-primary dark:text-cream/70 mb-6">
                Are you sure you want to delete this lead?
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setLeadToDelete(null)}
                  className="px-4 py-2 text-sm rounded-lg border border-primary/20 bg-white dark:bg-[#1e293b] dark:shadow-lg hover:bg-primary/5 active:scale-95"
                >
                  Cancel
                </button>

                <button
                  onClick={deleteLead}
                  className="px-4 py-2 text-sm rounded-lg bg-accentRed text-cream hover:opacity-90 active:scale-95"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </>
      )}
    </MainLayout>

  )
}

export default Leads