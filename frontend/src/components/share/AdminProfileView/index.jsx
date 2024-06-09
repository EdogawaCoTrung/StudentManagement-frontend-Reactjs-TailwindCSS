
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import bcrypt from 'bcryptjs';
import { jwtDecode } from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { accountApi } from "../../../apis";
import { httpClient } from "../../../services";


export default function ViewProfile() {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [createdAt, setCreatedAt] = React.useState("");
  const [admin, setAdmin] = React.useState({});


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  async function getAdmin() {
    const id = localStorage.getItem("userId");
    setAdmin(await httpClient.get(`/account/${id}`));
    setName(admin.username);
    setEmail(admin.email);
    setCreatedAt(formatDate(admin.createdAt));
  }

  getAdmin();

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
        'paddingTop': '40px',
        'paddingLeft': '24%',
        'paddingRight': '24%',
        'paddingBottom': '40px'
      }}
      noValidate
      autoComplete="off"
    >
      <div className='flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all'>
        <div className="h-fit w-auto flex flex-row">
          <Avatar src="/student.png" alt="Student" sx={{ height: 150, width: 150, border: "solid", marginLeft: "10px" }} />
          <div className='flex flex-col'>
            <h4 className="pl-10" style={{ fontSize: "30px", marginTop: "20px" }}>{name}</h4>
            <h2 className='pl-10' style={{ fontSize: "20px", marginTop: "10px" }}>{`Email: ${email}`}</h2>
            <p className="pl-10" style={{ fontSize: "20px", marginTop: "20px" }}>{`Ngày tạo tài khoản: ${createdAt}`}</p>
          </div>
        </div>
          <div>
            
          </div>
          </div>
    </Box>
  );
}