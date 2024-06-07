import { useEffect, useState } from "react"
import Dropdown from "../../../components/share/Dropdown"
import { assignmentApi, gradeApi } from "../../../apis"
import { toast } from "react-toastify"
import AssignmentTable from "../../../components/share/AssignmentTable"
export default function Assignment() {
  let [data, setData] = useState("")
  let [checkReLoading, setCheckReLoading] = useState(false)
  let [selectYear, setSelectYear] = useState("")
  function maxGradeYear(year) {
    console.log("goi maxGradeYear")
    let maxYear = year[0].year
    for (let i = 0; i < year.length; i++) {
      if (year[i].year > maxYear) maxYear = year[i].year
    }
    return maxYear
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
  const fetchAllAssignment = async () => {
    let res = await assignmentApi.getAllAssignmentByYear(selectYear)
    if (res.EC != 1) {
      setData(res.DT)
    }
  }
  useEffect(() => {
    if (selectYear != "") {
      fetchAllAssignment()
    }
  }, [selectYear, checkReLoading])
  return (
    <div className="mx-14 mb-0 flex h-screen flex-col overflow-hidden p-0">
      <div className="mt-10 flex items-center justify-between">
        <p className="animate-fade-up font-Manrope text-2xl font-bold">Assignment</p>
        <Dropdown selectYear={selectYear} setSelectYear={setSelectYear}></Dropdown>
      </div>
      <div className="mt-10 h-screen">
        <AssignmentTable data={data}></AssignmentTable>
      </div>
    </div>
  )
}
