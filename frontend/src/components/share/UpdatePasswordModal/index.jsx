
import { accountApi } from '../../../apis';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import bcrypt from 'bcryptjs';


export default function ValidationTextFields() {
  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');


  function handleClick() {


    let oldPass = document.getElementById('oldPass').value.toString();
    let newPass = document.getElementById('newPass').value.toString();
    let reNewPass = document.getElementById('reNewPass').value.toString();

    const userId = localStorage.getItem('userId');

    let matched = false;
    const hashedPassword = accountApi.getPasswordById(userId);

    // bcrypt.hash(oldPass, 10, (err, response) => {
    //   console.log(response);
    //   console.log(hashedPassword);
    //   if (hashedPassword == response) {
    //     matched = true;
    //   }});

    if (matched) {
      console.log('Passwords match! User authenticated successfully.');
      if (newPass !== reNewPass) {
        setMessage('Mật khẩu mới không khớp');
        setOpenErrorAlert(true);
      } else {
        setMessage('Đổi mật khẩu thành công');
        setOpenSuccessAlert(true);
      }
    } else {
      setMessage('Mật khẩu cũ không đúng');
      setOpenErrorAlert(true);
    } 
  } 

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50vw' },
        'height': '962px',
        'flex-shrink': '0',
        'border-radius': '20px',
        'background': '#FFF',
        'box-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
      noValidate
      autoComplete="off"
    >
      <Collapse in={openErrorAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenErrorAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
        </Collapse>
        <Collapse in={openSuccessAlert}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenSuccessAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
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
        marginRight: '33vw',
        marginTop: 2,
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
      }}>Lưu</Button>
    </Box>
  );
}