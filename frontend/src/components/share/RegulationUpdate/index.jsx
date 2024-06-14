import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { httpClient } from "../../../services"
import { Fragment, useState } from "react"
import { Button } from "@mui/material"
import { toast } from "react-toastify"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import AddYearModal from "../CreateYearModal"
import { gradeApi } from "../../../apis"
import { IoReload } from "react-icons/io5"

export default function RegulationUpdate() {
  let [regulation, setRegulation] = useState([])
  let [term, setTerm] = useState(2025)
  let [excellentCore, setExcellentCore] = useState(8)
  let [goodCore, setGoodCore] = useState(7)
  let [averageCore, setAverageCore] = useState(5)
  let [badCore, setBadCore] = useState(3)
  let [excellentDiscipline, setExcellentDiscipline] = useState(80)
  let [goodDiscipline, setGoodDiscipline] = useState(70)
  let [averageDiscipline, setAverageDiscipline] = useState(50)
  let [badDiscipline, setBadDiscipline] = useState(30)
  let [typeTerm, setTypeTerm] = useState(1)
  let [maxattendances, setMaxAttendances] = useState(40)
  let [maxtenthclasses, setMaxtenthClasses] = useState(10)
  let [maxeleventhclasses, setMaxeleventhClasses] = useState(10)
  let [maxtwelfthclasses, setMaxtwelfthClasses] = useState(10)
  let [maxage, setMaxage] = useState(20)
  let [minage, setMinage] = useState(15)
  let [checkReload, setCheckReload] = useState(false)
  let [isOpenAddYearModal, setIsOpenYearModal] = useState(false)
  const changeTerm = async () => {
    let res = await gradeApi.changeTerm()
    if (res.EC != 1) {
      setCheckReload(!checkReload)
    }
  }
  function closeAddYearModal() {
    setIsOpenYearModal(false)
  }
  function openAddYearModal() {
    setIsOpenYearModal(true)
  }
  async function handleSaveClick() {
    const data = {
      term: term,
      excellentcore: excellentCore,
      goodcore: goodCore,
      averagecore: averageCore,
      badcore: badCore,
      excellentdiscipline: excellentDiscipline,
      gooddiscipline: goodDiscipline,
      averagediscipline: averageDiscipline,
      baddiscipline: badDiscipline,
      typeterm: typeTerm,
      maxattendances: maxattendances,
      maxtenthclasses: maxtenthclasses,
      maxeleventhclasses: maxeleventhclasses,
      maxtwelfthclasses: maxtwelfthclasses,
      maxage: maxage,
      minage: minage,
    }

    const res = await httpClient.put("/params/update-params", data)
    if (res.EC === 0) {
      toast.success("Cập nhật thành công")
      setCheckReload(!checkReload)
    } else {
      toast.error(res.EM)
    }
  }

  async function getRegulation() {
    const res = await httpClient.get("/params")
    setRegulation(res.DT)
  }

  async function getValues() {
    regulation.forEach((value) => {
      if (value.paramName == "term") {
        setTerm(value.paramValue)
      } else if (value.paramName == "excellentcore") {
        setExcellentCore(value.paramValue)
      } else if (value.paramName.toLowerCase() === "goodcore") {
        setGoodCore(value.paramValue)
      } else if (value.paramName.toLowerCase() === "averagecore") {
        setAverageCore(value.paramValue)
      } else if (value.paramName.toLowerCase() === "badcore") {
        setBadCore(value.paramValue)
      } else if (value.paramName.toLowerCase() === "excellentdiscipline") {
        setExcellentDiscipline(value.paramValue)
      } else if (value.paramName.toLowerCase() === "gooddiscipline") {
        setGoodDiscipline(value.paramValue)
      } else if (value.paramName.toLowerCase() === "averagediscipline") {
        setAverageDiscipline(value.paramValue)
      } else if (value.paramName.toLowerCase() === "baddiscipline") {
        setBadDiscipline(value.paramValue)
      } else if (value.paramName.toLowerCase() === "typeterm") {
        setTypeTerm(value.paramValue)
      } else if (value.paramName.toLowerCase() === "maxattendances") {
        setMaxAttendances(value.paramValue)
      } else if (value.paramName.toLowerCase() === "maxtenthclasses") {
        setMaxtenthClasses(value.paramValue)
      } else if (value.paramName.toLowerCase() === "maxeleventhclasses") {
        setMaxeleventhClasses(value.paramValue)
      } else if (value.paramName.toLowerCase() === "maxtwelfthclasses") {
        setMaxtwelfthClasses(value.paramValue)
      } else if (value.paramName.toLowerCase() === "maxage") {
        setMaxage(value.paramValue)
      } else if (value.paramName.toLowerCase() === "minage") {
        setMinage(value.paramValue)
      }
    })
  }

  React.useEffect(() => {
    getRegulation()
  }, [checkReload])

  React.useEffect(() => {
    getValues()
  }, [regulation])

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
        height: "962px",
        "flex-shrink": "0",
        "border-radius": "20px",
        background: "#FFF",
        "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        alignItems: "center",
        paddingTop: "20px",
        paddingLeft: "24%",
        paddingRight: "24%",
        paddingBottom: "40px",
      }}
      noValidate
      autoComplete="off"
    >
      <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
        <div className="flex items-center p-4">
          <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
            <div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="mr-2 font-Manrope text-xl font-semibold text-black">Năm học và học kì</p>
                </div>
                <div className="mb-2 mt-2 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <Button
                      onClick={openAddYearModal}
                      sx={{ width: "7vw", marginBottom: "8px", marginLeft: "8px" }}
                      variant="contained"
                      color="success"
                      startIcon={<AddCircleRoundedIcon></AddCircleRoundedIcon>}
                    >
                      Year
                    </Button>
                    {isOpenAddYearModal && (
                      <AddYearModal
                        isOpenAddYearModal={isOpenAddYearModal}
                        closeAddYearModal={closeAddYearModal}
                        checkReRender={checkReload}
                        setCheckReRender={setCheckReload}
                      ></AddYearModal>
                    )}
                    <TextField label={`Năm`} value={term} disabled onChange={(e) => setTerm(e.target.value)} />
                  </div>
                  <div className="flex flex-col">
                    <Button
                      onClick={changeTerm}
                      sx={{ width: "7vw", marginBottom: "8px", marginLeft: "8px" }}
                      variant="contained"
                      color="secondary"
                      startIcon={<IoReload></IoReload>}
                    >
                      Term
                    </Button>
                    <TextField
                      disabled
                      label={`Học kỳ`}
                      value={typeTerm}
                      onChange={(e) => setTypeTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-t-2 border-dashed border-black">
                <div className="mt-2 flex items-center">
                  <p className="mr-2 font-Manrope text-xl font-semibold text-black">Học sinh và lớp</p>
                </div>
                <div className="mt-2 flex w-full justify-between gap-2">
                  <TextField label={`Tuổi tối đa`} value={maxage} onChange={(e) => setMaxage(e.target.value)} />
                  <TextField label={`Tuổi tối thiểu`} value={minage} onChange={(e) => setMinage(e.target.value)} />
                  <TextField
                    label={`Số học sinh tối đa`}
                    value={maxattendances}
                    onChange={(e) => setMaxAttendances(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full flex-row justify-between gap-2">
                <TextField
                  label={`Số lớp 10 tối đa`}
                  value={maxtenthclasses}
                  onChange={(e) => setMaxtenthClasses(e.target.value)}
                />
                <TextField
                  label={`Số lớp 11 tối đa`}
                  value={maxeleventhclasses}
                  onChange={(e) => setMaxeleventhClasses(e.target.value)}
                />
                <TextField
                  label={`Số lớp 12 tối đa`}
                  value={maxtwelfthclasses}
                  onChange={(e) => setMaxtwelfthClasses(e.target.value)}
                />
              </div>
              <div className="mt-2 flex items-center">
                <p className="mr-2 font-Manrope text-xl font-semibold text-black">Điểm số và hạnh kiểm</p>
              </div>
              <div className="mt-2 flex w-full flex-row justify-between gap-2">
                <TextField
                  label={`Điểm giỏi`}
                  value={excellentCore}
                  onChange={(e) => setExcellentCore(e.target.value)}
                />
                <TextField label={`Điểm khá`} value={goodCore} onChange={(e) => setGoodCore(e.target.value)} />
                <TextField
                  label={`Điểm trung bình`}
                  value={averageCore}
                  onChange={(e) => setAverageCore(e.target.value)}
                />
                <TextField label={`Điểm yếu`} value={badCore} onChange={(e) => setBadCore(e.target.value)} />
              </div>
              <div className="flex w-full flex-row justify-between gap-2">
                <TextField
                  label={`Hk tốt`}
                  value={excellentDiscipline}
                  onChange={(e) => setExcellentDiscipline(e.target.value)}
                />
                <TextField
                  label={`Hk khá`}
                  value={goodDiscipline}
                  onChange={(e) => setGoodDiscipline(e.target.value)}
                />
                <TextField
                  label={`Hk trung bình`}
                  value={averageDiscipline}
                  onChange={(e) => setAverageDiscipline(e.target.value)}
                />
                <TextField label={`Hk yếu`} value={badDiscipline} onChange={(e) => setBadDiscipline(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <Button variant="contained" color="success" onClick={handleSaveClick}>
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}
