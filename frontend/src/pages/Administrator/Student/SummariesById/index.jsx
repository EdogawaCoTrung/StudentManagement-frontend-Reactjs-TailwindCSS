import { toast } from "react-toastify"
import { useParams } from "react-router"
import { GrLinkPrevious } from "react-icons/gr"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { summaryApi } from "../../../../apis"
import SummariesStudent from "../../../../components/share/SummariesStudent"
export default function StudentSummariesTable() {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const HandlePrevious = () => {
    navigate("/student")
  }
  console.log("HOCBA", data, typeof data)
  const { id } = useParams()
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
        <button
          onClick={HandlePrevious}
          className="flex h-9 w-9 animate-jump-in content-center items-center justify-center rounded-full bg-gradeTitle"
        >
          <GrLinkPrevious className="text-2xl text-white" />
        </button>
        <p className="ml-6 animate-fade-down font-Manrope text-2xl font-bold text-gradeTitle">Điểm số</p>
      </div>
      <div className="flex flex-col">{result}</div>
    </div>
  )
}
