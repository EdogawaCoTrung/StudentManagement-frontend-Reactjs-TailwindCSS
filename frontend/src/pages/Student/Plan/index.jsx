import { Tab } from "@headlessui/react"
import { useEffect, useState } from "react"
import { PiStudentBold } from "react-icons/pi"
import { SiGoogleclassroom } from "react-icons/si"
import StudentTuitionTable from "../../../components/share/StudentTuitionTable"
import { gradeApi } from "../../../apis"
import { tuitionApi } from "../../../apis"
import { toast } from "react-toastify"
export default function StudentTuition() {
  let [selectYear, setSelectYear] = useState("")
  let [data, setData] = useState("")
  let [checkReLoading, setCheckReLoading] = useState(false)
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
    let tuitions = await tuitionApi.getAllTuitionByYear(selectYear)
    if (tuitions.EC == 1) {
      toast.error(tuitions.EM)
    } else if (tuitions.EC != 1) {
      setData(tuitions.DT)
    }
  }
  useEffect(() => {
    console.log("VAOFETCHNGOAIIF")
    if (selectYear != "") {
      console.log("VAOFETCH")
      fetchAllTuitionByYear()
    }
  }, [selectYear, checkReLoading])
  return (
    <div className="mx-14 mb-0 flex h-screen flex-col overflow-hidden p-0">
      <div className="animate-fade-up mt-10 flex items-center justify-between">
        <p className="font-Manrope text-2xl font-bold">Học phí</p>
      </div>
      <div className="relative mt-10">
        <Tab.Group>
          <Tab.List className="absolute flex w-full">
            <Tab
              autoFocus
              className="group z-0 flex h-14 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300 focus:-translate-y-2 focus:bg-backgroundplus active:-translate-y-2 active:bg-backgroundplus"
            >
              <div className="mt-2 flex flex-row items-center justify-center  align-top">
                <PiStudentBold className="mr-1 text-base font-semibold transition-none duration-0 group-focus:text-white" />
                <p className="group-text font-Manrope text-base font-semibold transition-none duration-0 group-focus:text-white">
                  Học sinh
                </p>
              </div>
            </Tab>
            <Tab className="group z-0 flex h-14 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300 focus:-translate-y-2 focus:bg-backgroundplus active:-translate-y-2 active:bg-backgroundplus">
              <div className="mt-2 flex flex-row items-center justify-center  align-top">
                <SiGoogleclassroom className="mr-1 text-base font-semibold duration-0 group-focus:text-white" />
                <p className="group-text font-Manrope text-base font-semibold duration-0 group-focus:text-white">Lớp</p>
              </div>
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <StudentTuitionTable
                data={data}
                checkReLoading={checkReLoading}
                setCheckReLoading={setCheckReLoading}
              ></StudentTuitionTable>
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
