import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import bcrypt from 'bcryptjs';
import { httpClient } from "../../../services";
import { jwtDecode } from "jwt-decode";
import Avatar from "@mui/material/Avatar"

export default function ViewProfile() {
    const className = "10A2";
    const [student, setStudent] = React.useState({});

    async function getStudent() {
        const id = localStorage.getItem("userId");
        console.log(id);
        setStudent(await httpClient.get(`/student/${id}`));
        console.log(student);
    }

    React.useEffect(() => {
        getStudent();
    }, []);

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
                height: '962px',
                'flex-shrink': '0',
                'border-radius': '20px',
                background: '#FFF',
                'box-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                alignItems: 'center',
                paddingTop: '40px',
                paddingLeft: '24%',
                paddingRight: '24%',
                paddingBottom: '40px'
            }}
            noValidate
            autoComplete="off"
        >
            <div className='flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all'>
                <div className="h-fit w-auto flex flex-row">
                    <Avatar src="/student.png" alt="Student" sx={{ height: 150, width: 150, border: "solid" }} />
                    <div className='flex flex-col'>
                        <h4 className="pl-10" style={{ fontSize: "30px", marginTop: "20px" }}>{`${student.studentname}`}</h4>
                        <h3 className="pl-10" style={{ fontSize: "24px", marginTop: "20px" }}>{className}</h3>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row">
                        <p className="pl-10" style={{ fontSize: "20px", marginTop: "40px" }}>{`Ngày sinh: ${formatDate(student.birthDate)}`}</p>
                        <div className="ml-40">
                            <p className="pl-10" style={{ fontSize: "20px", marginTop: "38px", marginLeft: "10px" }}>{`Giới tính: ${student.gender === "0" ? "Nam" : "Nữ"}`}</p>
                        </div>
                    </div>
                    <div>
                        <p className="pl-10" style={{ fontSize: "20px", marginTop: "20px" }}>{`Ngày nhập học: ${formatDate(student.startDate)}`}</p>
                        <p className="pl-10" style={{ fontSize: "20px", marginTop: "20px" }}>{`Địa chỉ: ${student.address}`}</p>
                        <p className="pl-10" style={{ fontSize: "20px", marginTop: "20px" }}>{`Trạng thái trong năm: ${student.statusinyear === 0 ? "Chưa hoàn thành" : "Đã hoàn thành"}`}</p>
                        <div className="p-10"></div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </Box>
    );
}
