import { Tab } from "@headlessui/react"
import { useEffect, useState } from "react"
import { PiStudentBold } from "react-icons/pi"
import { SiGoogleclassroom } from "react-icons/si"
import OneStudentTuitionTable from "../../../components/share/OneStudentTuitionTable"
import { gradeApi } from "../../../apis"
import { tuitionApi } from "../../../apis"
import { toast } from "react-toastify"
export default function StudentTuition() {
  let [selectYear, setSelectYear] = useState("")
  let [data, setData] = useState("")
  let [checkReLoading, setCheckReLoading] = useState(false)
  const [tabSelect, setTabSelect] = useState(1)
  const handleListTabClick = (index) => {
    setTabSelect(index)
  }
  const id = localStorage.getItem("studentId")
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
  const fetchAllTuitionByYear = async () => {
    console.log("VAOHAm")
    let tuitions = await tuitionApi.getTuitionById(id)
    console.log("TUITIONS", tuitions.DT)
    if (tuitions.EC == 1) {
      toast.error(tuitions.EM)
    } else if (tuitions.EC != 1) {
      setData(tuitions.DT)
    }
  }
  useEffect(() => {
    console.log("VAOFETCHNGOAIIF")
    if (selectYear != "") {
      console.log("VAOFETCHNE")
      fetchAllTuitionByYear()
    }
  }, [selectYear, checkReLoading])
  return (
    <div className="mx-14 mb-0 flex h-screen flex-col overflow-hidden p-0">
      <div className="mt-10 flex animate-fade-up items-center justify-between">
        <p className="font-Manrope text-2xl font-bold">Học phí</p>
      </div>
      <div className="relative mt-10">
        <Tab.Group>
          <Tab.List className="absolute flex w-full">
            <Tab
              autoFocus
              onClick={() => handleListTabClick(1)}
              className={
                tabSelect == 1
                  ? "group z-0 flex h-10 w-fit -translate-y-2 flex-row rounded-none bg-backgroundplus px-3 transition-all duration-300 focus:-translate-y-2"
                  : "group z-0 flex h-10 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300"
              }
            >
              <div className="mt-2 flex flex-row items-center justify-center align-top">
                <PiStudentBold
                  className={
                    tabSelect == 1
                      ? "mr-1 text-base font-semibold text-white transition-none duration-0"
                      : "mr-1 text-base font-semibold transition-none duration-0"
                  }
                />
                <p
                  className={
                    tabSelect == 1
                      ? "group-text font-Manrope text-base font-semibold text-white transition-none duration-0"
                      : "group-text font-Manrope text-base font-semibold transition-none duration-0"
                  }
                >
                  Học sinh
                </p>
              </div>
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <OneStudentTuitionTable
                data={data}
                checkReLoading={checkReLoading}
                setCheckReLoading={setCheckReLoading}
              ></OneStudentTuitionTable>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
