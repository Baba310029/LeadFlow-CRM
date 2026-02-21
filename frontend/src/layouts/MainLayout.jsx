import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { useState } from "react"

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-cream dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-[#111827] flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col md:ml-64">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout