
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import bcrypt from 'bcryptjs';
import { httpClient } from "../../../services";
import { jwtDecode } from "jwt-decode";
import {useAuth} from "../../../hooks";
import { toast } from "react-toastify"

export default function ValidationTextFields() {
  const { logIn } = useAuth();

  async function handleClick() {

    const token = localStorage.getItem("accessToken")
    const decode = jwtDecode(token)
    const oldPass = document.getElementById('oldPass').value.toString();
    const newPass = document.getElementById('newPass').value.toString();
    const reNewPass = document.getElementById('reNewPass').value.toString();
    let username = "";

    username = `${decode.payload.username}`;
    console.log(username.toString());

    try {
      await logIn({
        username: username,
        password: oldPass,
      })
      const role = localStorage.getItem("role")
      console.log("ROLELOGIN", role);

      if (newPass !== reNewPass) {
        toast.error('Mật khẩu mới không khớp');
        } else {
          toast.success('Đổi mật khẩu thành công');
        }
    } catch (error) {
      console.log(error);
      toast.error("Mật khẩu cũ không đúng")
    }
  } 

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40vw' },
        'height': '962px',
        'flex-shrink': '0',
        'border-radius': '20px',
        'background': '#FFF',
        'box-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        'alignItems': 'center',
        'paddingLeft': '24%',
        'paddingRight': '24%',
        'paddingTop': '40px',
        'paddingBottom': '40px'
      }}
      noValidate
      autoComplete="off"
    >
      <div className="flex h-fit transform flex-col rounded-2xl bg-white text-left p-6 font-Manrope shadow-xl transition-all">
        <div>
        <TextField
          className='error outlined-error fullWidth'
          id="oldPass"
          label="Nhập mật khẩu cũ"
          type="password"
        />
        <TextField
          className='outlined-error fullWidth'
          id="newPass"
          label="Nhập mật khẩu mới"
          type="password"
          defaultValue="Nhập mật khẩu mới"
        />
        <TextField
            className='outlined-error fullWidth' 
            id="reNewPass"
            label="Nhập lại mật khẩu mới"
            type="password"
            defaultValue="Nhập lại mật khẩu mới"
        />
        </div>
      <Button variant="contained" onClick={handleClick} color="primary" className='cursor-pointer float-right'
      sx={{
        marginLeft: '90%',
        marginTop: 2,
        padding: '10px 20px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        width: '10px',
      }}>Lưu</Button>
      </div>
    </Box>
  );
}