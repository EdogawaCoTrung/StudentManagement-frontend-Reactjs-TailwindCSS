import { toast } from "react-toastify"
import { Tab } from "@headlessui/react"
import { useEffect, useState } from "react"
import { summaryApi } from "../../../apis"
import SummariesStudent from "../../../components/share/SummariesStudent"
import { Avatar, MenuItem, TextField } from "@mui/material"
import Overall from "../../../components/share/SummariesStudent/Overall"
const grades = [
  {
    id: 1,
    name: "10",
  },
  {
    id: 2,
    name: "11",
  },
  {
    id: 3,
    name: "12",
  },
]
export default function StudentSummariesTable() {
  const [data, setData] = useState([])
  const [grade, setGradeValue] = useState("10")
  let [checkReLoading, setCheckReLoading] = useState(false)
  let [dataTerm1, setDataTerm1] = useState(null)
  console.log("dataTerm1", dataTerm1)
  let [dataTerm2, setDataTerm2] = useState(null)
  let [birthDay, setBirthDay] = useState("")
  let [startDay, setStartDay] = useState("")
  const [tabSelect, setTabSelect] = useState(1)
  const handleListTabClick = (index) => {
    setTabSelect(index)
  }
  function convertDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const formattedDate = `${day}-${month}-${year}`
    return formattedDate
  }
  const changeGrade = (gradename) => {
    setGradeValue(gradename)
  }
  console.log("HOCBA", data, typeof data)
  const id = localStorage.getItem("studentId")
  const fetchAllOverallByGrade = async () => {
    console.log("VAOfetchAllOverallByGrade")
    let res = await summaryApi.getSummariesById(id, grade)
    console.log("MANGSUBJECT", res.DT.subjects)
    if (res.EC == 1) {
      toast.error(res.EM)
    } else if (res.EC != 1) {
      setData(res.DT.subjects)
    }
  }
  const fetchAllSummariesByTerm1 = async () => {
    let res = await summaryApi.getSummariesByIdAndGrade(id, grade, 1)
    if (res.EC == 1) {
      toast.error(res.EM)
    } else if (res.EC != 1) {
      setDataTerm1(res.DT)
      let birthDayFormat = convertDate(res.DT[0]?.student.birthDate)
      let startDateFormat = convertDate(res.DT[0]?.student.startDate)
      setBirthDay(birthDayFormat)
      setStartDay(startDateFormat)
    }
  }
  const fetchAllSummariesByTerm2 = async () => {
    let res = await summaryApi.getSummariesByIdAndGrade(id, grade, 2)
    if (res.EC == 1) {
      toast.error(res.EM)
    } else if (res.EC != 1) {
      setDataTerm2(res.DT)
    }
  }
  useEffect(() => {
    fetchAllOverallByGrade()
    fetchAllSummariesByTerm1()
    fetchAllSummariesByTerm2()
  }, [checkReLoading, grade])
  function SummaryData(data) {
    let FilterSummaries = data
    console.log("CHAYVAOSUMMAY")
    if (FilterSummaries) {
      return FilterSummaries.map((item, index) => (
        <SummariesStudent
          data={[item]}
          listSubjectResult={item.summaries[0].subjectresults}
          key={id}
          id={id}
        ></SummariesStudent>
      ))
    } else {
      return
    }
  }
  const result1 = SummaryData(dataTerm1)
  const result2 = SummaryData(dataTerm2)
  return (
    <div className="mb-0 ml-14 flex h-screen flex-col overflow-y-auto pr-14">
      <div className="mt-10 flex items-center justify-between">
        <div className="flex">
          <p className="animate-fade-down font-Manrope text-2xl font-bold text-gradeTitle">Điểm số</p>
        </div>
        <TextField
          value={grade}
          onChange={(newValue) => changeGrade(newValue.target.value)}
          id="outlined-select-concurrency"
          select
          label="Khối"
          defaultValue="10"
          sx={{
            width: "10vw",
            marginLeft: 4,
          }}
        >
          {grades.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {dataTerm1 && (
        <div className="mt-10 flex w-full items-center rounded-lg bg-white shadow-xl">
          {dataTerm1[0]?.student.User.image != null ? (
            <img
              className="m-5 mr-10 h-40 w-40 flex-shrink rounded-full object-cover"
              src={dataTerm1[0]?.student.User.image}
            ></img>
          ) : (
            <Avatar
              src="/student.png"
              alt="Student"
              sx={{ height: 160, width: 160, marginRight: "12px", border: "solid" }}
            />
          )}
          <div className="flex flex-1 flex-col pr-5">
            <p className="font-Manrope text-4xl font-bold">{dataTerm1[0]?.student.studentname}</p>
            <div className="mt-3 flex flex-row items-center justify-between">
              <div className="mr-2 flex w-full flex-col rounded-lg border-2 p-2">
                <p className="font-Manrope text-base">
                  <span className="mr-3 font-bold">Email:</span> {dataTerm1[0]?.student.User.email}
                </p>
                <p className="font-Manrope text-base">
                  <span className="mr-3 font-bold">Classname:</span>
                  {dataTerm1[0]?.class.classname}
                </p>
                <p className="font-Manrope text-base">
                  <span className="mr-3 font-bold">Grade:</span>
                  {grade}
                </p>
                <p className="font-Manrope text-base">
                  <span className="mr-3 font-bold">Year:</span>
                  {dataTerm1[0]?.class.grade.year}
                </p>
              </div>
              <div className="flex w-full flex-col rounded-lg border-2 p-2">
                <p className="font-Manrope text-base">
                  <span className="mr-3 font-bold">Address:</span>
                  {dataTerm1[0]?.student.address}
                </p>
                <p className="font-Manrope text-base">
                  <span className="mr-3 font-bold">Gender:</span>
                  {dataTerm1[0]?.student.gender == 1 ? <span>Nam</span> : <span>Nữ</span>}
                </p>
                <p className="font-Manrope text-base">
                  <span className="mr-3 font-bold">Date of Birth:</span>
                  {birthDay}
                </p>
                <p className="font-Manrope text-base">
                  <span className="mr-3 font-bold">Date of Start:</span>
                  {startDay}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="relative mt-10 flex flex-col">
        <Tab.Group>
          <Tab.List className="absolute flex w-full">
            <Tab
              autoFocus
              onClick={() => handleListTabClick(1)}
              className={
                tabSelect == 1
                  ? "group z-0 flex h-14 w-fit -translate-y-2 flex-row rounded-none bg-backgroundplus px-3 transition-all duration-300"
                  : "z-0 flex h-14 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300"
              }
            >
              <div className="mt-2 flex flex-row items-center justify-center  align-top">
                <p
                  className={
                    tabSelect == 1
                      ? "group-text font-Manrope text-base font-semibold text-white duration-0"
                      : "group-text font-Manrope text-base font-semibold duration-0"
                  }
                >
                  HKI
                </p>
              </div>
            </Tab>
            <Tab
              onClick={() => handleListTabClick(2)}
              className={
                tabSelect == 2
                  ? "group z-0 flex h-14 w-fit -translate-y-2 flex-row rounded-none bg-backgroundplus px-3 transition-all duration-300"
                  : "z-0 flex h-14 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300"
              }
            >
              <div className="mt-2 flex flex-row items-center justify-center  align-top">
                <p
                  className={
                    tabSelect == 2
                      ? "group-text font-Manrope text-base font-semibold text-white duration-0"
                      : "group-text font-Manrope text-base font-semibold duration-0"
                  }
                >
                  HKII
                </p>
              </div>
            </Tab>
            <Tab
              onClick={() => handleListTabClick(3)}
              className={
                tabSelect == 3
                  ? "group z-0 flex h-14 w-fit -translate-y-2 flex-row rounded-none bg-backgroundplus px-3 transition-all duration-300"
                  : "z-0 flex h-14 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300"
              }
            >
              <div className="mt-2 flex flex-row items-center justify-center  align-top">
                <p
                  className={
                    tabSelect == 3
                      ? "group-text font-Manrope text-base font-semibold text-white duration-0"
                      : "group-text font-Manrope text-base font-semibold duration-0"
                  }
                >
                  Cả năm
                </p>
              </div>
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>{result1}</Tab.Panel>
            <Tab.Panel>{result2}</Tab.Panel>
            <Tab.Panel>{data && <Overall listSubjectResult={data}></Overall>}</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
