import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { IconButton } from "@mui/material"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import { Button } from "@mui/material"
import "./index.css"
import AddSubjectModal from "../../../components/share/AddSubjectModal"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { subjectApi } from "../../../apis"
import SubjectCard from "../../../components/share/SubjectCard"
export default function Subject() {
  let [isOpenAddTuitionModal, setIsOpenAddTuitionModal] = useState(false)
  let [checkReLoading, setCheckReLoading] = useState(false)
  const [data, setData] = useState([])
  const [Query, setQuery] = useState("")
  const [inputQuery, setInputQuery] = useState("")
  const HandleInput = (event) => {
    setQuery(event.target.value)
  }
  const fetchAllSubject = async () => {
    const res = await subjectApi.getAllSubject()
    if (res.EC == 1) {
      toast.error(res.EM)
    }
    console.log("SUBJECT", res.DT)
    setData(res.DT)
  }
  useEffect(() => {
    console.log("VAOUSEEFFECT")
    fetchAllSubject()
  }, [checkReLoading])
  useEffect(() => {
    if (data != "" || data != [] || data != null) {
      const FilterItems = data.filter((Subject) => {
        let data = Query
        console.log("dataQuery", data.toLocaleLowerCase().toLocaleString())
        console.log("SubjectName", Subject.subjectname.toLowerCase().toLocaleString())
        return (
          Subject &&
          Subject.subjectname &&
          Subject.subjectname
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleString()
            .includes(data.toLocaleLowerCase().toLocaleString())
        )
      })
      setInputQuery(FilterItems)
    }
  }, [Query])
  function SubjectData(Query, data) {
    let FilterSubject = data
    console.log("FilterSubject", FilterSubject)
    if (Query) {
      FilterSubject = inputQuery
    }
    return FilterSubject.map(({ id, subjectname }) => (
      <SubjectCard
        setCheckReLoading={setCheckReLoading}
        checkReLoading={checkReLoading}
        subjectName={subjectname}
        key={id}
        id={id}
      ></SubjectCard>
    ))
  }
  const result = SubjectData(Query, data)
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }
  function openAddTuitionModal() {
    setIsOpenAddTuitionModal(true)
  }
  function closeAddTuitionModal() {
    setIsOpenAddTuitionModal(false)
  }
  return (
    <div className="mx-14 mb-0 mt-10 flex h-screen flex-col overflow-hidden p-0">
      <div className="animate-fade-left">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
            height: 50,
            marginBottom: "8px",
          }}
        >
          <IconButton sx={{ p: "10px", background: "#13313D", color: "white" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            value={Query}
            onKeyPress={handleKeyPress}
            onChange={HandleInput}
            sx={{
              ml: 2,
              flex: 1,
              borderWidth: 0,
              border: "none",
              borderRadius: 0,
              ":active": {
                border: "none",
                borderWidth: 0,
              },
              ":focus": {
                border: "none",
                borderWidth: 0,
              },
              appearance: "none",
            }}
            //   value={searchInput}
            //   onChange={(e) => onFilterChange("studentname", e.target.value)}
            placeholder="Search..."
          />
        </Paper>
      </div>
      <div className="mt-10 flex">
        <p className="mr-4 animate-fade-up font-Manrope text-2xl font-bold">Subject</p>
        <div className="animate-flip-down">
          <Button
            onClick={openAddTuitionModal}
            variant="contained"
            color="success"
            startIcon={<AddCircleRoundedIcon></AddCircleRoundedIcon>}
          >
            Add
          </Button>
        </div>
        <AddSubjectModal
          isOpenAddTuitionModal={isOpenAddTuitionModal}
          closeAddTuitionModal={closeAddTuitionModal}
          checkReLoading={checkReLoading}
          setCheckReLoading={setCheckReLoading}
        ></AddSubjectModal>
      </div>
      <div className="flex w-full flex-row flex-wrap">{result}</div>
    </div>
  )
}
