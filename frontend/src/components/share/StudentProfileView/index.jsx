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

export default function StudentProfileView({ isOpenStudentProfileView, closeStudentProfileView, id }) {
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
      getUser()
    }
  }, [student])

  console.log("STUDENT", student)
  console.log("USER", user)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <Transition appear show={isOpenStudentProfileView} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeStudentProfileView}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center align-middle ">
          <div className="">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Thông tin học sinh
                </Dialog.Title>
                <div className="flex items-center p-4">
                  <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                    <div className="flex h-fit w-auto flex-row">
                      {student.User?.image != null ? (
                        <img className="mr-3 h-36 w-36 rounded-full object-cover" src={student.User.image}></img>
                      ) : (
                        <Avatar
                          src="/student.png"
                          alt="Student"
                          sx={{ height: 150, width: 150, marginRight: "12px", border: "solid" }}
                        />
                      )}
                      <div className="flex flex-col">
                        <h4
                          className="pl-10"
                          style={{ fontSize: "28px", marginTop: "20px" }}
                        >{`${student.studentname}`}</h4>
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <div className="flex w-full justify-between">
                        <div className="mr-5 flex flex-col">
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
                        <div className="flex flex-col">
                          <p style={{ fontSize: "18px", marginTop: "40px" }}>{`User name: ${user.username}`}</p>
                          <p style={{ fontSize: "18px", marginTop: "20px" }}>{`Email: ${user.email}`}</p>
                          <p style={{ fontSize: "18px", marginTop: "20px" }}>{`Địa chỉ: ${student.address}`}</p>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
