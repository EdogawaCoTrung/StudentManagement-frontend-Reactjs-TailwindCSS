import BarchartAdmin from "../../../components/share/BarchartAdmin"
import AreaProgressChart from "../../../components/share/ProgressBarAdmin"
import RankingStudentTable from "../../../components/share/RankingStudentTable"
import { classApi } from "../../../apis"
import { gradeApi } from "../../../apis"
import DashboardCard from "../../../components/share/DashboardCard"
import { useEffect, useState } from "react"
import { dashboardApi } from "../../../apis"
import Dropdown from "../../../components/share/Dropdown"
import BarchartCompareGpaStudent from "../../../components/share/CompareGpaStudentChart"
import { MenuItem, TextField } from "@mui/material"
import BarchartCompareGpaClass from "../../../components/share/CompareGpaClassChart"
const terms = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
]
export default function StudentDashboard() {
  const [compare3year, setCompare3Year] = useState("")
  const [compareClass, setCompareClass] = useState()
  let [selectYear, setSelectYear] = useState("")
  const [term, setTerm] = useState("1")
  const studentId = localStorage.getItem("studentId")
  function maxGradeYear(year) {
    console.log("goi maxGradeYear")
    let maxYear = year[0].year
    for (let i = 0; i < year.length; i++) {
      if (year[i].year > maxYear) maxYear = year[i].year
    }
    return maxYear
  }
  const changeTerm = (gradename) => {
    setTerm(gradename)
  }
  const fetchECompare3Year = async () => {
    let getData = await dashboardApi.getGpaOfOneStudent(studentId)
    if (getData.EC != 1) {
      setCompare3Year(getData.DT)
    }
  }
  const fetchCompareGpaOfClass = async () => {
    let getData = await dashboardApi.getCompareGpaOfClass(studentId, term, selectYear)
    if (getData.EC != 1) {
      setCompareClass(getData.DT)
    }
  }
  const fetchAllYear = async () => {
    let year = await gradeApi.getAllYear()
    if (year.DT) {
      let maxYear = maxGradeYear(year.DT)
      setSelectYear(maxYear)
    }
  }
  useEffect(() => {
    fetchAllYear()
  }, [])
  useEffect(() => {
    if (selectYear != "") {
      fetchECompare3Year()
      fetchCompareGpaOfClass()
    }
  }, [selectYear, term])
  return (
    <div className="mb-0 ml-10 flex h-screen flex-col overflow-y-auto p-0 pr-8">
      <div className="mt-10 flex items-center justify-between">
        <p className="animate-fade-up font-Manrope text-2xl font-bold">Dashboard</p>
        <div className="flex items-center">
          <TextField
            value={term}
            onChange={(newValue) => changeTerm(newValue.target.value)}
            id="outlined-select-concurrency"
            select
            label="Semester"
            defaultValue="1"
            sx={{
              width: "5vw",
              background: "white",
              marginRight: "12px",
            }}
          >
            {terms.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <Dropdown selectYear={selectYear} setSelectYear={setSelectYear}></Dropdown>
        </div>
      </div>
      <div className="mt-5 flex w-full">
        <BarchartCompareGpaStudent compare3year={compare3year}></BarchartCompareGpaStudent>
        <BarchartCompareGpaClass compareClass={compareClass}></BarchartCompareGpaClass>
      </div>
    </div>
  )
}
