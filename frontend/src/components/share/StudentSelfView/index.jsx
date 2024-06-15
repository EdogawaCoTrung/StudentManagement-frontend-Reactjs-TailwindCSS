import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import CloseIcon from "@mui/icons-material/Close"
import bcrypt from "bcryptjs"
import { httpClient } from "../../../services"
import { jwtDecode } from "jwt-decode"
import Avatar from "@mui/material/Avatar"
import { studentApi } from "../../../apis"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { accountApi } from "../../../apis"

export default function StudentSelfView({ id }) {
  console.log(id)
  const [className, setClass] = React.useState("10A2")
  const [grade, setGrade] = React.useState("10")
  const [student, setStudent] = React.useState({})
  const [user, setUser] = React.useState({})

  async function getStudent() {
    const res = await studentApi.getStudentById(id)
    setStudent(res.DT)
    const classdata = await studentApi.getAllClassByStudentId(id)
    setClass(classdata.DT[0].class.classname)
    const gradeId = classdata.DT[0].class.gradeId
    if (gradeId === 1) {
      setGrade("10")
    } else if (gradeId === 2) {
      setGrade("11")
    } else {
      setGrade("12")
    }
  }

  async function getUser() {
    const userId = student.userId
    console.log(userId)
    setUser(await accountApi.getAccountById(userId))
  }

  React.useEffect(() => {
    getStudent()
  }, []) // Runs once on mount

  React.useEffect(() => {
    if (student && student.userId) {
      getUser(student.userId)
    }
  }, [student])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

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
        <div className="flex h-fit w-auto flex-row">
          <div className="flex items-center p-4">
            <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
              <div className="flex h-fit w-auto flex-row">
                {user.image != null ? (
                  <img className="mr-3 h-36 w-36 rounded-full object-cover" src={user.image}></img>
                ) : (
                  <Avatar
                    src="/student.png"
                    alt="Student"
                    sx={{ height: 140, width: 140, marginRight: "12px", border: "solid" }}
                  />
                )}
                <div className="flex flex-col">
                  <h4 className="pl-10" style={{ fontSize: "28px", marginTop: "20px" }}>{`${student.studentname}`}</h4>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-row justify-between">
                  <div className=" flex flex-col">
                    <p
                      style={{ fontSize: "18px", marginTop: "40px" }}
                    >{`Ngày sinh: ${formatDate(student.birthDate)}`}</p>
                    <p
                      style={{ fontSize: "18px", marginTop: "20px" }}
                    >{`Giới tính: ${student.gender === "1" ? "Nam" : "Nữ"}`}</p>
                    <div className="flex flex-row">
                      <p
                        style={{ fontSize: "18px", marginTop: "20px" }}
                      >{`Ngày nhập học: ${formatDate(student.startDate)}`}</p>
                    </div>
                  </div>
                  <div className="flex  flex-col">
                    <p style={{ fontSize: "18px", marginTop: "40px" }}>{`User name: ${user.username}`}</p>
                    <p style={{ fontSize: "18px", marginTop: "20px" }}>{`Email: ${user.email}`}</p>
                    <p style={{ fontSize: "18px", marginTop: "20px" }}>{`Địa chỉ: ${student.address}`}</p>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}
