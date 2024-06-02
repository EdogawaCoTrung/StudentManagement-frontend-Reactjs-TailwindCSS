
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
  const name = "Nguyễn Văn A";
  const username = "bgh1";
  const className = "10A2";
  const dob = "1/1/2005";
  const createdAt = "2/2/2022";
  const address = "Thu Duc, Ho Chi Mnh";
  const parentName = "Nguyen Thi C";
  const parentPhone = "50249485603";
  const gender = "Nam";


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
            <h3 className="pl-10" style={{ fontSize: "24px", marginTop: "20px" }}>{className}</h3>
          </div>
          <div className='flex flex-col pt-10 ml-10'>
            <h2 style={{ fontSize: "20px", marginLeft: "25%", marginTop: "-6%" }}>{`Tên tài khoản: ${username}`}</h2>
          </div>
        </div>
          <div>
            <div className="flex flex-row">
              <p className="pl-10" style={{ fontSize: "20px", marginTop: "40px" }}>{`Ngày sinh: ${dob}`}</p> 
              <div className = "ml-40">
              <p className="pl-10" style={{ fontSize: "20px", marginTop: "38px", marginLeft: "10px" }}>{`Giới tính: ${gender}`}</p> 
              </div>
            </div>
            <p className="pl-10" style={{ fontSize: "20px", marginTop: "20px" }}>{`Ngày nhập học: ${createdAt}`}</p>
            <p className="pl-10" style={{ fontSize: "20px", marginTop: "20px" }}>{`Địa chỉ: ${address}`}</p>
            <p className="pl-10" style={{ fontSize: "20px", marginTop: "20px" }}>{`Tên phụ huynh: ${parentName}`}</p>
            <p className="pl-10" style={{ fontSize: "20px", marginTop: "20px" }}>{`Số điện thoại phụ huynh: ${parentPhone}`}</p>
            <div className="p-10">
            </div>
          </div>
          <div>
            
          </div>
          </div>
    </Box>
  );
}