import * as React from "react"
import { Fragment } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Dialog, Transition } from "@headlessui/react"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import MenuItem from "@mui/material/MenuItem"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

const grades = [
  {
    id: 1,
    name: "10",
  },
  {
    id: 2,
    name: "11",
  },
  {
    id: 3,
    name: "12",
  },
]
const classes = [
  {
    id: 1,
    name: "10a1",
  },
  {
    id: 2,
    name: "11a2",
  },
  {
    id: 3,
    name: "12a3",
  },
]
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


export default function OnlyAddStudentModal({ isOpenOnlyAddStudentModal, closeOnlyAddStudentModal }) {

  const [dateValue, setDateValue] = React.useState(dayjs('2022-04-17'));
  const [name, setNameValue] = React.useState("");
  const [grade, setGradeValue] = React.useState("10");
  const [className, setClassValue] = React.useState("10a1");
  const [gender, setGenderValue] = React.useState("Nam");
  const [address, setAddressValue] = React.useState("");
  const [parentName, setParentValue] = React.useState("");
  const [parentPhone, setPhoneValue] = React.useState("");

  const handleSaveClick = () => {
    const day = dateValue.date();
    const month = dateValue.month();
    const year = dateValue.year();
    console.log(day, month, year);
  };
  const handleDiscardClick = () => {
      // Handle discard logic here
  };

  return (

    <Transition appear show={isOpenOnlyAddStudentModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeOnlyAddStudentModal}>
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
              <Dialog.Panel 
              className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Thêm học sinh
                </Dialog.Title>
                <div className="flex items-center p-4">
                  <Avatar src="/student.png" alt="Student" sx={{ height: 200, width: 200, border: "solid" }} />
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
                      <TextField
                        value={grade}
                        onChange={(newValue) => setGradeValue(newValue.target.value)}
                        id="outlined-select-concurrency"
                        select
                        label="Khối"
                        defaultValue="10"
                        sx={{
                          width: "10vw",
                          marginLeft: 4,
                        }}
                      >
                        {grades.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        value={className}
                        onChange={(newValue) => setClassValue(newValue.target.value)}
                        id="outlined-select-concurrency"
                        select
                        label="Lớp"
                        defaultValue="10a1"
                        sx={{
                          marginLeft: 2,
                          width: "10vw",
                        }}
                      >
                        {classes.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker 
                      sx={{marginLeft: '38%', width: "10vw"}} 
                      label="Ngày sinh" 
                      value={dateValue}
                      onChange={(newValue) => setDateValue(newValue)} 
                      defaultValue={dayjs('2022-04-17')} />
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
                <div>
                  <TextField
                    value={address}
                    onChange={(newValue) => setAddressValue(newValue.target.value)}
                    required
                    id="outlined-required"
                    label="Địa chỉ"
                    sx={{
                      width: "90%",
                      marginTop: 4,
                      float: "center",
                      marginLeft: "8%"
                    }}
                  >
                  </TextField>
                </div>
                <div>
                  <TextField
                    value={parentName}
                    onChange={(newValue) => setParentValue(newValue.target.value)}
                    required
                    id="outlined-required"
                    label="Họ tên phụ huynh"
                    defaultValue=""
                    sx={{
                      marginLeft: "10%",
                      marginBottom: 5,
                      width: "18vw",
                      marginTop: 4,
                    }}
                  />
                  <TextField
                    value={parentPhone}
                    onChange={(newValue) => setPhoneValue(newValue.target.value)}
                    required
                    id="outlined-required"
                    label="Số điện thoại phụ huynh"
                    defaultValue=""
                    sx={{
                      marginLeft: 2,
                      marginBottom: 5,
                      width: "auto",
                      marginTop: 4,
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="contained" color="success"
                    onClick={handleSaveClick()}>
                    Lưu
                  </Button>
                  <Button variant="contained" color="error" sx={{ marginLeft: 4, marginRight: 4 }}
                    onClick={handleDiscardClick()}>
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
