import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useLocation, Link } from "react-router-dom"

function Sidebar({ open, setOpen }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  )

  const location = useLocation()

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full 
          w-56 md:w-64
          bg-primary/95 backdrop-blur-sm text-cream p-4 md:p-6
          flex flex-col justify-between
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300 ease-in-out
          z-50
        `}
      >
        {/* TOP SECTION */}
        <div>
          {/* Close button mobile */}
          <div className="flex justify-between items-center md:hidden mb-6">
            <h2 className="text-xl font-bold">LeadFlow</h2>
            <X className="cursor-pointer" onClick={() => setOpen(false)} />
          </div>

          {/* Desktop logo */}
          <h2 className="hidden md:block text-2xl font-bold mb-10">
            LeadFlow
          </h2>

          <ul className="space-y-4 text-sm">
            <li>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-lg transition ${
                  location.pathname === "/dashboard"
                    ? "bg-accentOrange text-cream"
                    : "hover:bg-white dark:bg-[#1e293b] bg-cream dark:shadow-lg/10 text-[#1e293b] text-[#1e293b] dark:text-cream"
                }`}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/leads"
                className={`block px-3 py-2 rounded-lg transition ${
                  location.pathname === "/leads"
                    ? "bg-accentOrange text-cream"
                    : "hover:bg-white/60 dark:bg-[#1e293b] bg-cream dark:shadow-lg/10 hover:text-[#1e293b] text-[#1e293b] dark:text-cream"
                }`}
              >
                Leads
              </Link>
            </li>
          </ul>
        </div>

        {/* BOTTOM SECTION — THEME TOGGLE */}
        <div className="pt-6 border-t border-white/20">
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className="
              w-full
              flex items-center justify-center gap-2
              py-2
              rounded-lg
              bg-white dark:bg-[#1e293b] dark:shadow-lg/10 
              text-[#1e293b] dark:text-cream font-medium dark:font-normal
              hover:bg-white dark:bg-[#1e293b] dark:shadow-lg/20
              transition-all duration-300
              text-sm active:scale-95
            "
          >
            {theme === "light"
              ? "☾  Dark Mode"
              : "☀︎  Light Mode"}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar