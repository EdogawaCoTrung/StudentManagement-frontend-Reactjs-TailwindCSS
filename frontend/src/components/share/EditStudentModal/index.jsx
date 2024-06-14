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
import Button from "@mui/material/Button"
import { toast } from "react-toastify"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MdCloudUpload } from "react-icons/md"
export default function EditStudent({ isOpenEditStudent, closeEditStudent, id, checkReloading, setCheckReloading }) {
  const [preview, setPreview] = useState(null)
  const [student, setStudent] = React.useState({})
  const [user, setUser] = React.useState({})
  const [name, setName] = React.useState("")
  const [birthDate, setBirthDate] = React.useState(dayjs("2022-04-17"))
  const [gender, setGender] = React.useState("")
  const [avatar, setAvatar] = React.useState(null)
  const [address, setAddress] = React.useState("")
  const [gradeId, setGradeId] = React.useState(0)
  const handlePreviewAvatar = (e) => {
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(file)
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  React.useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])
  async function getStudent() {
    const res = await studentApi.getStudentById(id)
    setStudent(res.DT)
    const classdata = await studentApi.getAllClassByStudentId(id)
    setClassId(classdata.DT[0].class.id)
    setClass(classdata.DT[0].class.classname)
    setGradeId(classdata.DT[0].class.gradeId)
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

  React.useEffect(() => {
    if (student && user) {
      setName(student.studentname || "")
      setBirthDate(dayjs(student.birthDate) || "")
      setGender(student.gender === 1 ? "Nam" : "Nữ")
      setAddress(student.address || "")
    }
  }, [student, user])

  async function handleSaveClick() {
    const formData = new FormData()

    if (avatar) {
      formData.append("image", avatar)
    }

    // Thêm các dữ liệu khác vào FormData
    formData.append("studentname", name)
    formData.append("birthDate", birthDate.toISOString()) // Chuyển đổi sang chuỗi ISO
    if (gender == "Nam") {
      formData.append("gender", 1)
    } else if (gender == "Nữ") {
      formData.append("gender", 2)
    }
    formData.append("address", address)
    const res = await studentApi.updateStudent(student.id, formData)
    console.log(res)
    if (res.EC === 0) {
      toast.success("Chỉnh sửa thông tin thành công")
      setCheckReloading(!checkReloading)
    } else {
      toast.error("Không thể chỉnh sủa thông tin")
    }
  }

  return (
    <Transition appear show={isOpenEditStudent} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeEditStudent}>
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
                  Chỉnh sửa thông tin học sinh
                </Dialog.Title>
                <div className="flex items-center p-4">
                  <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                    <div className="flex h-fit w-auto flex-row">
                      <div className="relative flex flex-col items-center justify-center">
                        {preview ? (
                          <Avatar
                            src={preview}
                            alt="Student"
                            sx={{ height: 150, width: 150, border: "solid", zIndex: 0, objectFit: "cover" }}
                          />
                        ) : (
                          <Avatar
                            src="/student.png"
                            alt="Student"
                            sx={{ height: 150, width: 150, border: "solid", zIndex: 0, border: "solid" }}
                          />
                        )}
                        <label
                          htmlFor="upload-image"
                          className="mt-2 flex w-fit cursor-pointer items-center rounded-md bg-uploadBtn px-[12px] py-[6px] font-Manrope font-bold text-white decoration-0 transition-all visited:text-white hover:bg-blue-950 hover:text-white"
                        >
                          <MdCloudUpload className="mr-2" />
                          <p>Upload Image</p>
                        </label>
                        <input
                          onChange={handlePreviewAvatar}
                          type="file"
                          name="photo"
                          id="upload-image"
                          className="absolute -z-10 opacity-0"
                        ></input>
                      </div>
                      <div className="flex flex-col">
                        <TextField
                          label="Họ tên"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          className="pl-10"
                          style={{ fontSize: "28px", marginTop: "20px", marginLeft: "80px" }}
                        />
                        <div className="ml-12 mt-8 flex flex-row justify-between">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={{ marginLeft: 4, width: "11vw", marginRight: 2 }}
                              label="Ngày sinh"
                              value={birthDate}
                              onChange={(newValue) => setBirthDate(newValue)}
                              defaultValue={dayjs("2022-04-17")}
                            />
                          </LocalizationProvider>
                          <div className="">
                            <TextField
                              sx={{ width: "11vw" }}
                              label="Giới tính"
                              value={gender}
                              onChange={(event) => setGender(event.target.value)}
                              className="pl-10"
                              style={{ fontSize: "18px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <TextField
                          label="Địa chỉ"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                          className="pl-10"
                          style={{ fontSize: "18px", marginTop: "20px", width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="contained" color="success" onClick={handleSaveClick}>
                    Lưu
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ marginLeft: 4, marginRight: 4 }}
                    onClick={closeEditStudent}
                  >
                    Hủy
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
