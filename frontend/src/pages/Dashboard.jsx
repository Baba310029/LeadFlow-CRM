import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import API from "../services/api"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts"
import { useLeads } from "../context/LeadContext"
import MainLayout from "../layouts/MainLayout"

function Dashboard() { 
  const { leads, loading } = useLeads()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const totalLeads = leads.length
  const newLeads = leads.filter(l => l.status === "new").length
  const contactedLeads = leads.filter(l => l.status === "contacted").length
  const convertedLeads = leads.filter(l => l.status === "converted").length

  const getStatusColor = (status) => {
    if (status === "new")
      return "bg-accentOrange text-cream"

    if (status === "contacted")
      return "bg-primary text-cream"

    if (status === "converted")
      return "bg-accentRed text-cream"
  }

  const chartData = [
    { name: "New", value: newLeads },
    { name: "Contacted", value: contactedLeads },
    { name: "Converted", value: convertedLeads }
  ]

  const COLORS = ["#f97316", "#1f3d2b", "#9a3412"]

  const conversionRate =
    totalLeads === 0
      ? 0
      : ((convertedLeads / totalLeads) * 100).toFixed(1)

  return (
    <MainLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 animate-fadeIn">

        <div className="bg-white dark:bg-[#1e293b] dark:shadow-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 rounded-xl p-5">
          <h4 className="text-sm text-primary dark:text-cream/60">Total Leads</h4>
          <p className="text-xl sm:text-2xl font-bold text-primary dark:text-cream mt-2">
            {totalLeads}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] dark:shadow-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 rounded-xl p-5">
          <h4 className="text-sm text-primary dark:text-cream/60">New</h4>
          <p className="text-xl sm:text-2xl font-bold text-accentOrange mt-2">
            {newLeads}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] dark:shadow-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 rounded-xl p-5">
          <h4 className="text-sm text-primary dark:text-cream/60">Contacted</h4>
          <p className="text-xl sm:text-2xl font-bold text-primary dark:text-cream mt-2">
            {contactedLeads}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] dark:shadow-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 rounded-xl p-5">
          <h4 className="text-sm text-primary dark:text-cream/60">Converted</h4>
          <p className="text-xl sm:text-2xl font-bold text-accentRed mt-2">
            {convertedLeads}
          </p>
        </div>

      </div>

      
      {/* ANALYTICS SECTION */}
      <div className="bg-white dark:bg-[#1e293b] dark:shadow-lg border border-primary/10 shadow-sm dark:shadow-lg dark:border-white/10 rounded-xl shadow-sm p-6 my-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">

          {/* Pie Chart */}
          <div className="w-full lg:w-1/2 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={90}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Info */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h3 className="text-lg font-semibold text-primary dark:text-cream mb-4">
              Conversion Rate
            </h3>

            <p className="text-4xl font-bold text-accentOrange">
              {conversionRate}%
            </p>

            <p className="text-sm text-primary dark:text-cream/60 mt-2">
              Percentage of leads converted into customers
            </p>
          </div>

        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] border border-primary/10 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-primary dark:text-cream">
            Recent Leads
          </h3>
        </div>

        <div className="space-y-3">
          {leads.slice(0, 5).map((lead) => (
            <div
              key={lead._id}
              className="flex justify-between items-center p-3 rounded-lg bg-cream dark:bg-[#0f172a] border border-primary/10 dark:border-white/10"
            >
              <div>
                <p className="text-sm font-medium text-primary dark:text-cream">
                  {lead.name}
                </p>
                <p className="text-xs text-primary/60 dark:text-white/40">
                  {lead.email}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  lead.status === "new"
                    ? "bg-accentOrange text-cream"
                    : lead.status === "contacted"
                    ? "bg-primary text-cream"
                    : "bg-accentRed text-cream"
                }`}
              >
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard