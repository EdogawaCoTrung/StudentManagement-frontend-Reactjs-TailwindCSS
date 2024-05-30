import BarchartAdmin from "../../../components/share/BarchartAdmin"
import AreaProgressChart from "../../../components/share/ProgressBarAdmin"
import RankingStudentTable from "../../../components/share/RankingStudentTable"
import { classApi } from "../../../apis"
import DashboardCard from "../../../components/share/DashboardCard"
import { useEffect, useState } from "react"
export default function Dashboard() {
  const [data, setData] = useState("")
  const fetchAllStudentByClassId = async () => {
    let getData = await classApi.getAllStudentByClassId(5)
    setData(getData.DT)
  }
  useEffect(() => {
    fetchAllStudentByClassId()
  }, [])
  return (
    <div className="mb-0 ml-10 flex h-screen flex-col overflow-y-auto p-0 pr-4">
      <div className="mt-10 flex items-center justify-between">
        <p className="animate-fade-up font-Manrope text-2xl font-bold">Dashboard</p>
      </div>
      <div className="mt-5 grid w-full grid-cols-3 gap-4">
        <DashboardCard></DashboardCard>
        <DashboardCard></DashboardCard>
        <DashboardCard></DashboardCard>
      </div>
      <div className="mt-5 flex w-full">
        <BarchartAdmin></BarchartAdmin>
        <AreaProgressChart></AreaProgressChart>
      </div>
      <div className="mt-5">
        <RankingStudentTable data={data}></RankingStudentTable>
      </div>
    </div>
  )
}
