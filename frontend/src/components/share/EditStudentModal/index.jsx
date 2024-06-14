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
import { accountApi} from "../../../apis"
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function EditStudent ({ isOpenEditStudent, closeEditStudent, id }) {

    const [className, setClass] = React.useState("10A2")
    const [grade, setGrade] = React.useState("10")
    const [student, setStudent] = React.useState({})
    const [user, setUser] = React.useState({})
    const [name, setName] = React.useState("")
    const [birthDate, setBirthDate] = React.useState(dayjs("2022-04-17"))
    const [gender, setGender] = React.useState("")
    const [startDate, setStartDate] = React.useState(dayjs("2022-04-17"))
    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [statusInYear, setStatusInYear] = React.useState(0)
    const [classId, setClassId] = React.useState(0)
    const [gradeId, setGradeId] = React.useState(0)

    async function getStudent() {
        const res = await studentApi.getStudentById(id);
        setStudent(res.DT);
        const classdata = await studentApi.getAllClassByStudentId(id)
        setClassId(classdata.DT[0].class.id);
        setClass(classdata.DT[0].class.classname);
        setGradeId(classdata.DT[0].class.gradeId);
        if (gradeId === 1) {setGrade("10")}
        else if (gradeId === 2) {setGrade("11")}
        else  {setGrade("12")}
    }

    async function getUser() {
        const userId = student.userId
        console.log(userId)
        setUser(await accountApi.getAccountById(userId))
    }

    React.useEffect(() => {
        getStudent();
    }, []); // Runs once on mount
    
    React.useEffect(() => {
        if (student && student.userId) {
            getUser(student.userId);
        }
    }, [student]);

    React.useEffect(() => {
        if (student && user) {
          setName(student.studentname || "");
          setBirthDate(dayjs(student.birthDate) || "");
          setGender(student.gender === 0 ? "Nam" : "Nữ");
          setStartDate(dayjs(student.startDate) || "");
          setEmail(user.email || "");
          setAddress(student.address || "");
          setStatusInYear(student.statusInYear || 0);
          setUsername(user.username || "");
        }
      }, [student, user]);

    async function handleSaveClick () {
        const data = {
            studentname: name,
            birthDate: birthDate,
            gender: "Nam" ? 0 : 1,
            address: address,
            parentId: 0,
            gradeId: gradeId,
            classId: classId
        }

        const res = await studentApi.updateStudent(student.id, classId, data);
        console.log(res);
        if (res.EC === 0) {
            toast.success("Chỉnh sửa thông tin thành công")
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
                                            <Avatar src="/student.png" alt="Student" sx={{ height: 150, width: 150, border: "solid" }} />
                                            <div className="flex flex-col">
                                                <TextField
                                                    label="Họ tên"
                                                    value={name}
                                                    onChange={(event) => setName(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "28px", marginTop: "20px", marginLeft: "80px" , width: "120%"}}
                                                />
                                                <TextField
                                                    label="Lớp"
                                                    className="pl-10" 
                                                    style={{ fontSize: "22px", marginTop: "20px", marginLeft: "80px", width: "120%" }}
                                                    value={className}
                                                    onChange={(event) => setClass(event.target.value)}
                                                />
                                            </div>
                                            <div>
                                        </div>
                                        </div>
                                        <div>
                                            <div className="flex flex-row mt-8 ml-2">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                sx={{ marginLeft: 4, width: "11vw" }}
                                                label="Ngày sinh"
                                                value={birthDate}
                                                onChange={(newValue) => setBirthDate(newValue)}
                                                defaultValue={dayjs("2022-04-17")}
                                                />
                                            </LocalizationProvider>
                                                <div className="ml-40">
                                                    <TextField
                                                        label="Giới tính"
                                                        value={gender}
                                                        onChange={(event) => setGender(event.target.value)}
                                                        className="pl-10"
                                                        style={{ fontSize: "18px", marginRight: "20px" }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className = "flex flex-row mt-6 ml-2">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                    sx={{ marginLeft: 4, width: "11vw" }}
                                                    label="Ngày nhập học"
                                                    value={startDate}
                                                    onChange={(newValue) => setStartDate(newValue)}
                                                    defaultValue={dayjs("2022-04-17")}
                                                    />
                                                </LocalizationProvider>
                                                <TextField
                                                    label="Khối"
                                                    value={grade}
                                                    onChange={(event) => setGrade(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "18px", marginRight: "20px"}}
                                                />
                                                </div>
                                                <div>
                                                <TextField
                                                    label="User name"
                                                    value={username}
                                                    onChange={(event) => setUsername(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "18px", marginTop: "20px", marginLeft: "40px" }}
                                                />
                                                <TextField
                                                    label="Email"
                                                    value={email}
                                                    onChange={(event) => setEmail(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "18px", marginTop: "20px", marginLeft: "106px" }}
                                                />
                                                </div>
                                                <TextField
                                                    label="Địa chỉ"
                                                    value={address}
                                                    onChange={(event) => setAddress(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "18px", marginTop: "20px", marginLeft: "40px" }}
                                                />
                                                <TextField
                                                    label="Trạng thái trong năm"
                                                    value={statusInYear === 0 ? "Chưa hoàn thành" : "Đã hoàn thành"}
                                                    onChange={(event) => setStatusInYear(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "18px", marginTop: "20px", marginLeft: "106px" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="contained" color="success"
                                        onClick={handleSaveClick}>
                                        Lưu
                                    </Button>
                                    <Button variant="outlined" color="secondary" sx={{ marginLeft: 4, marginRight: 4, }}
                                        onClick={closeEditStudent}>
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
