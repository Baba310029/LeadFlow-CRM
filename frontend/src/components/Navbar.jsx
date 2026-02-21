import { useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"

function Navbar({ setSidebarOpen }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="flex justify-between items-center bg-white dark:bg-[#1e293b] dark:shadow-lg dark:bg-[#1e293b] dark:shadow-lg border-b border-primary/10 dark:border-white/10 dark:border-white/10 px-4 sm:px-6 py-3">

    {/* Left Section */}
    <div className="flex items-center gap-3">
      
      {/* Mobile Hamburger */}
      <Menu
        className="md:hidden cursor-pointer text-primary dark:text-cream dark:text-cream"
        onClick={() => setSidebarOpen(true)}
      />

      <h1 className="text-lg sm:text-xl font-semibold text-primary dark:text-cream dark:text-cream">
        Admin Dashboard
      </h1>
      </div>

      {/* Right Section */}
      <button
        onClick={handleLogout}
        className="bg-accentRed text-cream px-3 py-1.5 rounded-lg hover:opacity-90 transition text-sm active:scale-95"
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar