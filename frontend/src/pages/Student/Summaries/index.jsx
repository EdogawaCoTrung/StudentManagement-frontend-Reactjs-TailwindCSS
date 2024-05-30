import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { summaryApi } from "../../../apis"
import SummariesStudent from "../../../components/share/SummariesStudent"
export default function StudentSummaries() {
  const [data, setData] = useState([])
  console.log("HOCBA", data, typeof data)
  const id = localStorage.getItem("studentId")
  const fetchAllSummariesByStudentId = async () => {
    let res = await summaryApi.getSummariesById(id)
    if (res.EC == 1) {
      toast.error(res.EM)
    } else if (res.EC != 1) {
      setData(res.DT)
      console.log("subjectresults", res.DT[0].title, res.DT[0].teachercomment)
    }
  }
  useEffect(() => {
    fetchAllSummariesByStudentId()
  }, [])
  function SummaryData(data) {
    let FilterSummaries = data
    console.log(FilterSummaries.map((item, index) => console.log("FilterSummaries", item, index)))
    return FilterSummaries.map((item, index) => (
      <SummariesStudent data={[item]} listSubjectResult={item.subjectresults} key={id} id={id}></SummariesStudent>
    ))
  }
  const result = SummaryData(data)
  return (
    <div className="mb-0 ml-14 flex h-screen flex-col overflow-y-auto p-0">
      <div className="mt-10 flex items-center">
        <p className="ml-6 animate-fade-down font-Manrope text-2xl font-bold text-gradeTitle">Điểm số</p>
      </div>
      <div className="flex flex-col">{result}</div>
    </div>
  )
}
