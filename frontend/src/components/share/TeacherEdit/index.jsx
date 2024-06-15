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
import { teacherApi } from "../../../apis"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import Button from "@mui/material/Button"
import { toast } from "react-toastify"
import { MdCloudUpload } from "react-icons/md"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
export default function TeacherEdit({ isOpenTeacherEdit, closeTeacherEdit, id, checkReLoading, setCheckReLoading }) {
  const [avatar, setAvatar] = React.useState(null)
  const [preview, setPreview] = useState(null)
  const [name, setName] = React.useState("")
  const [gender, setGender] = React.useState("")
  const [birthDate, setBirthDate] = React.useState(dayjs())
  const [email, setEmail] = React.useState("")
  console.log("NAME", name)
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
  const [teacher, setTeacher] = React.useState({})
  const [user, setUser] = React.useState("")
  const [subjectObject, setSubjectObject] = React.useState({})

  async function getTeacher() {
    try {
      const res = await httpClient.get(`/teacher/${id}`)
      setTeacher(res.DT) // Set the teacher state with the fetched data
      setUser(res.DT.User) // Set the user state with the fetched data
      setSubjectObject(res.DT.subject)
      console.log("TEACHER", res.DT) // Log the response data to ensure it's correct
    } catch (error) {
      console.error("Failed to fetch teacher data:", error)
    }
  }

  React.useEffect(() => {
    if (id) {
      getTeacher() // Fetch teacher data when the component mounts and id is available
    }
  }, [id]) // Dependency array includes id, so it runs when id changes

  function setValues() {
    setName(`${teacher.teachername}`)
    if (teacher.gender === "1") setGender("Nam")
    else setGender("Nữ")
    setBirthDate(dayjs(teacher.birthDate) || "")
    setEmail(user.email)
  }

  React.useEffect(() => {
    if (teacher && user) {
      setValues()
    }
  }, [teacher, user])

  async function handleSaveClick() {
    const formData = new FormData()

    if (avatar) {
      formData.append("image", avatar)
    }
    console.log("NAME", name)
    // Thêm các dữ liệu khác vào FormData
    formData.append("teachername", name)
    formData.append("birthDate", birthDate.toISOString()) // Chuyển đổi sang chuỗi ISO
    if (gender == "Nam") {
      formData.append("gender", 1)
    } else if (gender == "Nữ") {
      formData.append("gender", 2)
    }
    formData.append("email", user)
    const res = await teacherApi.updateTeacher(id, formData)
    console.log(res)
    if (res.EC === 0) {
      toast.success("Chỉnh sửa thông tin thành công")
      setCheckReLoading(!checkReLoading)
      closeTeacherEdit()
    } else {
      toast.error("Không thể chỉnh sủa thông tin")
    }
  }

  return (
    <Transition appear show={isOpenTeacherEdit} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeTeacherEdit}>
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
                  Chỉnh sửa thông tin giáo viên
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
                            src="/teacher.png"
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
                        <TextField
                          label="Email"
                          className="pl-10"
                          style={{ fontSize: "22px", marginTop: "20px", marginLeft: "80px" }}
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        <div className="ml-12 mt-5 flex flex-row items-center">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={{ marginLeft: 4, width: "11vw", marginRight: 2 }}
                              label="Ngày sinh"
                              value={birthDate}
                              onChange={(newValue) => setBirthDate(newValue)}
                            />
                          </LocalizationProvider>
                          <TextField
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
                </div>

                <div className="flex justify-end">
                  <Button variant="contained" color="success" onClick={handleSaveClick}>
                    Lưu
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: 4, marginRight: 4 }}
                    onClick={closeTeacherEdit}
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
