import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import bcrypt from "bcryptjs";
import { httpClient } from "../../../services";
import { jwtDecode } from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { studentApi } from "../../../apis";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { accountApi } from "../../../apis";

export default function StudentSelfView({ id }) {

    console.log(id);
    const [className, setClass] = React.useState("10A2");
    const [grade, setGrade] = React.useState("10");
    const [student, setStudent] = React.useState({});
    const [user, setUser] = React.useState({});

    async function getStudent() {
        const res = await studentApi.getStudentById(id);
        setStudent(res.DT);
        const classdata = await studentApi.getAllClassByStudentId(id);
        setClass(classdata.DT[0].class.classname);
        const gradeId = classdata.DT[0].class.gradeId;
        if (gradeId === 1) {
            setGrade("10");
        } else if (gradeId === 2) {
            setGrade("11");
        } else {
            setGrade("12");
        }
    }

    async function getUser() {
        const userId = student.userId;
        console.log(userId);
        setUser(await accountApi.getAccountById(userId));
    }

    React.useEffect(() => {
        getStudent();
    }, []); // Runs once on mount

    React.useEffect(() => {
        if (student && student.userId) {
            getUser(student.userId);
        }
    }, [student]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        'height': '962px',
        'flex-shrink': '0',
        'border-radius': '20px',
        'background': '#FFF',
        'box-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        'alignItems': 'center',
        'paddingTop': '20px',
        'paddingLeft': '24%',
        'paddingRight': '24%',
        'paddingBottom': '40px'
      }}
      noValidate
      autoComplete="off"
    >
      <div className='flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all'>
        <div className="h-fit w-auto flex flex-row">
        <div className="flex items-center p-4">
            <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                <div className="flex h-fit w-auto flex-row">
                    <Avatar src="/student.png" alt="Student" sx={{ height: 150, width: 150, border: "solid" }} />
                    <div className="flex flex-col">
                        <h4 className="pl-10" style={{ fontSize: "28px", marginTop: "20px" }}>{`${student.studentname}`}</h4>
                        <h3 className="pl-10" style={{ fontSize: "22px", marginTop: "20px" }}>{className}</h3>
                    </div>
                    <div></div>
                </div>
                <div>
                    <div className="flex flex-row">
                        <p className="pl-10" style={{ fontSize: "18px", marginTop: "40px" }}>{`Ngày sinh: ${formatDate(student.birthDate)}`}</p>
                        <div className="ml-40">
                            <p className="pl-10" style={{ fontSize: "18px", marginTop: "36px" }}>{`Giới tính: ${student.gender === "0" ? "Nam" : "Nữ"}`}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row">
                            <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>{`Ngày nhập học: ${formatDate(student.startDate)}`}</p>
                            <p className="pl-10" style={{ fontSize: "18px", marginLeft: "160px", marginTop: "18px" }}>{`Khối:${grade}`}</p>
                        </div>
                        <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>{`User name: ${user.username}`}</p>
                        <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>{`Email: ${user.email}`}</p>
                        <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>{`Địa chỉ: ${student.address}`}</p>
                        <p className="pl-10" style={{ fontSize: "18px", marginTop: "20px" }}>{`Trạng thái trong năm: ${student.statusinyear === 0 ? "Chưa hoàn thành" : "Đã hoàn thành"}`}</p>
                        <div className="p-4"></div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
        </div>
    </div>
    </Box>
    );
}
