import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      )

      localStorage.setItem("token", data.token)
      navigate("/dashboard")

    } catch (error) {
      alert("Invalid Credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">

      <div className="bg-white dark:bg-[#1e293b] dark:shadow-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 shadow-md rounded-2xl p-6 sm:p-8 w-full max-w-md mx-4">

        <h2 className="text-2xl font-bold text-primary dark:text-cream mb-6 text-center tracking-wide">
          LeadFlow Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-primary/20 rounded-lg 
                       focus:outline-none 
                       focus:ring-2 focus:ring-accentOrange 
                       focus:border-accentOrange 
                       transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-primary/20 rounded-lg 
                       focus:outline-none 
                       focus:ring-2 focus:ring-accentOrange 
                       focus:border-accentOrange 
                       transition"
          />

          <button
            type="submit"
            className="w-full bg-primary text-cream py-3 rounded-lg 
                       hover:bg-accentOrange 
                       transition duration-300 font-medium tracking-wide active:scale-95"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login