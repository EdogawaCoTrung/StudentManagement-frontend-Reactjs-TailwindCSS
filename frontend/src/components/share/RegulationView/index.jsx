import * as React from "react"
import Box from "@mui/material/Box"
import { httpClient } from "../../../services"
import { Fragment, useState, useEffect } from "react"

export default function RegulationView() {
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

  async function getRegulation() {
    const res = await httpClient.get("/params")
    setRegulation(res.DT)
  }

  async function getValues() {
    regulation.forEach((value) => {
      if (value.paramName == "term") {
        setTerm(value.paramValue)
      } else if (value.paramName.toLowerCase() === "excellentcore") {
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

  useEffect(() => {
    getRegulation()
  }, [])

  useEffect(() => {
    getValues()
  }, [regulation])

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
        height: "962px",
        flexShrink: 0,
        borderRadius: "20px",
        background: "#FFF",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        alignItems: "center",
        paddingTop: "20px",
        paddingLeft: "24%",
        paddingRight: "24%",
        paddingBottom: "40px",
      }}
      noValidate
      autoComplete="off"
    >
      <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-4 text-left font-Manrope shadow-xl transition-all">
        <div className="flex items-center p-4">
          <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-4 text-left font-Manrope shadow-xl transition-all">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>
                  <span>
                    <b>Năm:</b>
                  </span>{" "}
                  {term}
                </p>
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>
                  <span>
                    <b>Tuổi tối đa:</b>
                  </span>{" "}
                  {maxage}
                </p>
              </div>
              <div className="flex flex-col"></div>
              <div className="flex flex-col">
                <p className="pl-10 pr-10" style={{ fontSize: "18px", marginTop: "20px", marginLeft: "135px" }}>
                  <span>
                    <b>Học kỳ:</b>
                  </span>{" "}
                  {typeTerm}
                </p>
                <p className="pl-10 pr-10" style={{ fontSize: "18px", marginTop: "20px", marginLeft: "134px" }}>
                  <span>
                    <b>Tuổi tối thiểu:</b>
                  </span>{" "}
                  {minage}
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>
                  <span>
                    <b>Điểm giỏi:</b>
                  </span>{" "}
                  {excellentCore}
                </p>
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>
                  <span>
                    <b>Điểm khá:</b>
                  </span>{" "}
                  {goodCore}
                </p>
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>
                  <span>
                    <b>Điểm trung bình:</b>
                  </span>{" "}
                  {averageCore}
                </p>
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>
                  <span>
                    <b>Điểm yếu:</b>
                  </span>{" "}
                  {badCore}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="pl-10" style={{ fontSize: "18px", marginLeft: "96px", marginTop: "20px" }}>
                  <span>
                    <b>Hạnh kiểm tốt:</b>
                  </span>{" "}
                  {excellentDiscipline}
                </p>
                <p className="pl-10" style={{ fontSize: "18px", marginLeft: "96px", marginTop: "20px" }}>
                  <span>
                    <b>Hạnh kiểm khá:</b>
                  </span>{" "}
                  {goodDiscipline}
                </p>
                <p className="pl-10" style={{ fontSize: "18px", marginLeft: "96px", marginTop: "20px" }}>
                  <span>
                    <b>Hạnh kiểm trung bình:</b>
                  </span>{" "}
                  {averageDiscipline}
                </p>
                <p className="pl-10" style={{ fontSize: "18px", marginLeft: "96px", marginTop: "20px" }}>
                  <span>
                    <b>Hạnh kiểm yếu:</b>
                  </span>{" "}
                  {badDiscipline}
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>
                  <span>
                    <b>Số học sinh tối đa mỗi lớp:</b>
                  </span>{" "}
                  {maxattendances}
                </p>
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>
                  <span>
                    <b>Số lớp 12 tối đa:</b>
                  </span>{" "}
                  {maxtwelfthclasses}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px", marginLeft: "2px" }}>
                  <span>
                    <b>Số lớp 10 tối đa:</b>
                  </span>{" "}
                  {maxtenthclasses}
                </p>
                <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px", marginLeft: "2px" }}>
                  <span>
                    <b>Số lớp 11 tối đa:</b>
                  </span>{" "}
                  {maxeleventhclasses}
                </p>
              </div>
            </div>
            <div className="p-4"></div>
            <div></div>
          </div>
        </div>
      </div>
    </Box>
  )
}
