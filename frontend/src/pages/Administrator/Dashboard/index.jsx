import BarchartAdmin from "../../../components/share/BarchartAdmin"
import AreaProgressChart from "../../../components/share/ProgressBarAdmin"
import RankingStudentTable from "../../../components/share/RankingStudentTable"
import { classApi } from "../../../apis"
import { gradeApi } from "../../../apis"
import DashboardCard from "../../../components/share/DashboardCard"
import { useEffect, useState } from "react"
import { dashboardApi } from "../../../apis"
import Dropdown from "../../../components/share/Dropdown"
export default function Dashboard() {
  const [data, setData] = useState("")
  const [compare3year, setCompare3Year] = useState("")
  let [selectYear, setSelectYear] = useState("")
  const [numberByTitle, setNumberByTitle] = useState("")
  const [excellentStudents, setExcellentStudents] = useState([])
  function maxGradeYear(year) {
    console.log("goi maxGradeYear")
    let maxYear = year[0].year
    for (let i = 0; i < year.length; i++) {
      if (year[i].year > maxYear) maxYear = year[i].year
    }
    return maxYear
  }
  const fetchExcellentStudent = async () => {
    let getData = await dashboardApi.getExcellentStudent(selectYear)
    console.log("fetchExcellentStudent", getData.DT)
    if (getData.EC != 1) {
      setExcellentStudents(getData.DT)
    }
  }
  const fetchTop10Students = async () => {
    let getData = await dashboardApi.getTop10Students(selectYear)
    if (getData.EC != 1) {
      setData(getData.DT)
    }
  }
  const fetchNumberOfStudentByTitle = async () => {
    let getData = await dashboardApi.getNumberOfStudentsWithType(selectYear)
    if (getData.EC != 1) {
      setNumberByTitle(getData.DT)
    }
  }
  const fetchECompare3Year = async () => {
    let getData = await dashboardApi.getCompare3year(selectYear)
    if (getData.EC != 1) {
      setCompare3Year(getData.DT)
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
      fetchExcellentStudent()
      fetchECompare3Year()
      fetchTop10Students()
      fetchNumberOfStudentByTitle()
    }
  }, [selectYear])
  function DashboardCardData(data) {
    let Students = data
    console.log("STUDENTS", Students)
    console.log(
      "StudentsMap",
      Students.map((item, index) => item?.NumberHSG),
    )
    return Students.map(
      (item, index) => (
        console.log("CHEKCSTUDENTSMAP", item?.NumberHSG),
        (
          <DashboardCard
            NumberHSG={item?.NumberHSG}
            NumberHSTotal={item?.NumberHSTotal}
            grade={item?.grade}
            key={index}
            id={index}
          ></DashboardCard>
        )
      ),
    )
  }
  const result = DashboardCardData(excellentStudents)
  return (
    <div className="mb-0 ml-10 flex h-screen flex-col overflow-y-auto p-0 pr-4">
      <div className="mt-10 flex items-center justify-between">
        <p className="animate-fade-up font-Manrope text-2xl font-bold">Dashboard</p>
        <Dropdown selectYear={selectYear} setSelectYear={setSelectYear}></Dropdown>
      </div>
      <div className="mt-5 grid w-full grid-cols-3 gap-4">{result}</div>
      <div className="mt-5 flex w-full">
        <BarchartAdmin compare3year={compare3year}></BarchartAdmin>
        <AreaProgressChart numberByTitle={numberByTitle}></AreaProgressChart>
      </div>
      <div className="mt-5">
        <RankingStudentTable data={data}></RankingStudentTable>
      </div>
    </div>
  )
}
