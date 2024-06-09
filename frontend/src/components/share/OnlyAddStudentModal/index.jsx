import * as React from "react"
import { Fragment, useState } from "react"
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
import { gradeApi } from "../../../apis";
import { classApi } from "../../../apis";
import { toast } from "react-toastify";
import { KeyboardReturnOutlined } from "@mui/icons-material"
import { httpClient } from "../../../services";
import { studentApi } from "../../../apis";
import { accountApi } from "../../../apis";

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


export default function OnlyAddStudentModal({ isOpenOnlyAddStudentModal, closeOnlyAddStudentModal, year }) {
  const [grades, setGrades] = useState([]);
  const [classes, setClasses] = useState([]);
  const [dateValue, setDateValue] = React.useState(dayjs('2022-04-17'));
  const [name, setNameValue] = React.useState("");
  const [grade, setGradeValue] = React.useState("10");
  const [className, setClassValue] = React.useState("10A1");
  const [gradeId, setGradeId] = React.useState(1);
  const [classId, setClassId] = React.useState(1);
  const [gender, setGenderValue] = React.useState("Nam");
  const [genderId, setGenderId] = React.useState(0);
  const [address, setAddressValue] = React.useState("");
  const [parentName, setParentValue] = React.useState("");
  const [email, setEmailValue] = React.useState("");

  async function getAllGrades() {
    let res = await gradeApi.getAllGradeByYearService(year);
    const grades = res.DT.map((grade) => ({ id: grade.id, name: grade.gradename }));
    setGrades(grades);
  }
  async function getAllClasses() {
    let res = await classApi.getAllClassByGradeAndYear(grade, year);
    const classes = res.DT.map((className) => ({ id: className.id, name: className.classname }));
    setClasses(classes);
  }

  getAllGrades();
  getAllClasses();

  const handleSaveClick = async () => {
    console.log(classId);
    console.log(gradeId);

    const dataAccount = {
      username: name.trim(" "),
      password: "123456",
      email: email,
      groupId: 4
    }

    const resAccount = await accountApi.createAccount(dataAccount);
    console.log(resAccount);
    if (resAccount.EC === 0) {
      if (gender === "Nam") {
        setGenderId(0);
      } else {
        setGenderId(1);
      }
      const data = {
        image: null,
        studentname: name,
        birthDate: dateValue,
        startDate: "2024-06-06",
        gender: genderId,
        email: `${email}.edu.vn`
      }

      const res1 = await studentApi.createStudent(data);
      console.log(res1);
      if (res1.EC === 0) {
          toast.success("Thêm học sinh thành công!");
          closeOnlyAddStudentModal();
        } else {
        toast.error(res1.EM);
      }
    } else {
      toast.error(resAccount.EM);
    }
  }

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
                        onChange={(newValue) => {setGradeValue(newValue.target.value), setGradeId(newValue.target.key)}}
                        id="outlined-select-concurrency"
                        select
                        label="Khối"
                        defaultValue="10"
                        sx={{
                          width: "10vw",
                          marginLeft: 4,
                        }}
                      >
                        {grades.map((grade) => (
                          <MenuItem key={grade.id} value={grade.name}>
                            {grade.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        value={className}
                        onChange={(newValue) => {setClassValue(newValue.target.value), setClassId(newValue.target.key)}}
                        id="outlined-select-concurrency"
                        select
                        label="Lớp"
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
                    value={email}
                    onChange={(newValue) => setEmailValue(newValue.target.value)}
                    required
                    id="outlined-required"
                    label="email"
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
                    onClick={handleSaveClick}>
                    Lưu
                  </Button>
                  <Button variant="contained" color="error" sx={{ marginLeft: 4, marginRight: 4, }}
                    onClick={closeOnlyAddStudentModal}>
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
