import * as React from "react"
import { Fragment, useState } from "react"
import TextField from "@mui/material/TextField"
import { Dialog, Transition } from "@headlessui/react"
import Avatar from "@mui/material/Avatar"
import MenuItem from "@mui/material/MenuItem"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import Button from "@mui/material/Button"
import dayjs from "dayjs"
import { subjectApi, teacherApi } from "../../../apis"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import { MdCloudUpload } from "react-icons/md"
import SubjectComboBox from "../SubjectCombobox"
const genders = [
  {
    id: 1,
    name: "Nam",
  },
  {
    id: 2,
    name: "Nữ",
  },
]

export default function OnlyAddTeacherModal({
  isOpenOnlyAddTeacherModal,
  closeOnlyAddTeachertModal,
  setCheckReLoading,
}) {
  const [dateValue, setDateValue] = React.useState(dayjs())
  const [name, setNameValue] = React.useState("")
  const [gender, setGenderValue] = React.useState("Nam")
  const [email, setEmailValue] = React.useState("")
  const [avatar, setAvatar] = React.useState(null)
  const [preview, setPreview] = useState(null)
  const [subjectId, setSubjectId] = useState(null)
  const [subjectname, setSubjectName] = useState(null)
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
  async function getAllSubject() {
    let res = await subjectApi.getAllSubject()
    setSubjectId(res.DT[0].id)
    setSubjectName(res.DT[0].subjectname)
  }
  React.useEffect(() => {
    getAllSubject()
  }, [])
  const handleSaveClick = async () => {
    const formData = new FormData()

    // Thêm file hình ảnh vào FormData
    if (avatar) {
      formData.append("image", avatar)
    }

    // Thêm các dữ liệu khác vào FormData
    formData.append("teachername", name)
    formData.append("birthDate", dateValue.toISOString()) // Chuyển đổi sang chuỗi ISO
    formData.append("startDate", "2024-06-06")
    if (gender == "Nam") {
      formData.append("gender", 1)
    } else if (gender == "Nữ") {
      formData.append("gender", 2)
    }
    formData.append("email", email)
    formData.append("subjectId", subjectId)
    const res1 = await teacherApi.createTeacher(formData)
    console.log(res1)
    if (res1.EC === 0) {
      toast.success("Thêm giáo viên thành công!")
      closeOnlyAddTeachertModal()
    } else {
      toast.error(res1.EM)
    }
  }

  return (
    <Transition appear show={isOpenOnlyAddTeacherModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeOnlyAddTeachertModal}>
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
                  Thêm giáo viên
                </Dialog.Title>
                <div className="flex items-center p-4">
                  <div className="relative flex flex-col items-center justify-center">
                    {preview ? (
                      <Avatar
                        src={preview}
                        alt="Teacher"
                        sx={{ height: 200, width: 200, border: "solid", zIndex: 0, objectFit: "cover" }}
                      />
                    ) : (
                      <Avatar
                        src="/teacher.png"
                        alt="Teacher"
                        sx={{ height: 200, width: 200, border: "solid", zIndex: 0 }}
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
                  <div className="flex flex-col items-center">
                    <TextField
                      required
                      value={name}
                      onChange={(newValue) => setNameValue(newValue.target.value)}
                      id="outlined-required"
                      label="Họ tên"
                      defaultValue=""
                      sx={{
                        marginLeft: 4,
                        marginBottom: 5,
                        width: "22vw",
                      }}
                    />
                    <div className="flex">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ marginLeft: 4, width: "11vw" }}
                          label="Ngày sinh"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          defaultValue={dayjs("2022-04-17")}
                        />
                      </LocalizationProvider>
                      <TextField
                        value={gender}
                        onChange={(newValue) => setGenderValue(newValue.target.value)}
                        id="outlined-select-concurrency"
                        select
                        label="Giới tính"
                        defaultValue="Nam"
                        sx={{
                          width: "10vw",
                          marginLeft: 2,
                        }}
                      >
                        {genders.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <SubjectComboBox
                    setSubjectId={setSubjectId}
                    subjectId={subjectId}
                    subjectname={subjectname}
                  ></SubjectComboBox>
                </div>
                <div className="px-2">
                  <TextField
                    value={email}
                    onChange={(newValue) => setEmailValue(newValue.target.value)}
                    required
                    id="outlined-required"
                    label="email"
                    defaultValue=""
                    sx={{
                      width: "100%",
                      marginBlock: 2,
                      float: "center",
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="contained" color="success" onClick={handleSaveClick}>
                    Lưu
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: 4, marginRight: 4 }}
                    onClick={closeOnlyAddTeachertModal}
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
OnlyAddTeacherModal.propTypes = {
  isOpenOnlyAddTeacherModal: PropTypes.any,
  closeOnlyAddTeachertModal: PropTypes.any,
  setCheckReLoading: PropTypes.any,
  // columnFilters: PropTypes.any,
}
