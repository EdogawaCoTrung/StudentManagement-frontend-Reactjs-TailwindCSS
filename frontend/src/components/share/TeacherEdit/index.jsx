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
import { accountApi} from "../../../apis"
import Button from '@mui/material/Button';
import { toast } from "react-toastify"

export default function TeacherEdit ({ isOpenTeacherEdit, closeTeacherEdit, id }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const [name, setName] = React.useState("")
    const [gender, setGender] = React.useState("")
    const [startDate, setStartDate] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [statusInYear, setStatusInYear] = React.useState(0)
    const [subject, setSubject] = React.useState("")


    const [teacher, setTeacher] = React.useState({});
    const [user, setUser] = React.useState({});
    const [subjectObject, setSubjectObject] = React.useState({});

    async function getTeacher() {
        try {
            const res = await httpClient.get(`/teacher/${id}`);
            setTeacher(res.DT); // Set the teacher state with the fetched data
            setUser(res.DT.User); // Set the user state with the fetched data
            setSubjectObject(res.DT.subject);
            console.log(res.DT); // Log the response data to ensure it's correct
        } catch (error) {
            console.error("Failed to fetch teacher data:", error);
        }
    }

    React.useEffect(() => {
        if (id) {
            getTeacher(); // Fetch teacher data when the component mounts and id is available
        }
    }, [id]); // Dependency array includes id, so it runs when id changes


    function setValues() {
        setName(`${teacher.teachername}`);
        if (teacher.gender === 0) setGender("Nam")
        else setGender("Nữ")
        setStartDate(formatDate(teacher.startDate));
        setStatusInYear(teacher.statusInYear);
        setUsername(user.username);
        setSubject(subjectObject.subjectname);
    }

    React.useEffect(() => {
        if (teacher && user) {
          setValues();
        }
      }, [teacher, user]);

    async function handleSaveClick () {
        const data = {
            teachername: name,
            gender: "Nam" ? 0 : 1,
            startDate: startDate,
        }

        const res = await teacherApi.updateTeacher(id, data);
        console.log(res);
        if (res.EC === 0) {
            toast.success("Chỉnh sửa thông tin thành công")
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
                                    Sua thong tin hoc sinh
                                </Dialog.Title>
                                <div className="flex items-center p-4">
                                    <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                                        <div className="flex h-fit w-auto flex-row">
                                            <Avatar src="/teacher.png" alt="Student" sx={{ height: 150, width: 150, border: "solid" }} />
                                            <div className="flex flex-col">
                                                <TextField
                                                    label="Họ tên"
                                                    value={name}
                                                    onChange={(event) => setName(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "28px", marginTop: "20px", marginLeft: "80px" , width: "120%"}}
                                                />
                                                <TextField
                                                    label="Username"
                                                    className="pl-10" 
                                                    style={{ fontSize: "22px", marginTop: "20px", marginLeft: "80px", width: "120%" }}
                                                    value={username}
                                                    onChange={(event) => setClass(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex flex-row">
                                                <TextField
                                                    label="Ngày bắt đầu"
                                                    value={startDate}
                                                    onChange={(event) => setBirthDate(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "18px", marginTop: "40px", marginLeft: "20px" }}
                                                />
                                                <TextField
                                                    label="Giới tính"
                                                    value={gender}
                                                    onChange={(event) => setGender(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "18px", marginTop: "36px", marginRight: "20px", marginLeft: "120px" }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className = "flex flex-row">
                                                <TextField
                                                    label="Môn phụ trách"
                                                    value={subject}
                                                    onChange={(event) => setGrade(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "18px", marginLeft: "20px", marginTop: "18px" }}
                                                />
                                                <TextField
                                                    label="Trạng thái trong năm"
                                                    value={statusInYear === 0 ? "Chưa hoàn thành" : "Đã hoàn thành"}
                                                    onChange={(event) => setStatusInYear(event.target.value)}
                                                    className="pl-10"
                                                    style={{ fontSize: "18px", marginTop: "20px", marginLeft: "120px" }}
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
                                    <Button variant="contained" color="error" sx={{ marginLeft: 4, marginRight: 4, }}
                                        onClick={closeTeacherEdit}>
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
