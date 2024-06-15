import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import CloseIcon from "@mui/icons-material/Close"
import bcrypt from "bcryptjs"
import { httpClient } from "../../../services"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "../../../hooks"
import { toast } from "react-toastify"
import { accountApi } from "../../../apis"
export default function ValidationTextFields() {
  const { logOut } = useAuth()

  const id = localStorage.getItem("userId")
  const [changePasswordInfo, setChangePasswordInfo] = React.useState({
    id: id,
    oldPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  })
  const handleChange = (name, value) => {
    setChangePasswordInfo((prevTuitionInfo) => ({
      ...prevTuitionInfo,
      [name]: value,
    }))
  }
  async function handleClick(e) {
    try {
      e.preventDefault() // Xóa sau
      const data = {
        id: changePasswordInfo.id,
        oldPassword: changePasswordInfo.oldPassword,
        newPassword: changePasswordInfo.newPassword,
        retypeNewPassword: changePasswordInfo.retypeNewPassword,
      }
      let res = await accountApi.changePassword(data)
      if (res.EC != 1) {
        toast.success("Đổi mật khẩu thành công!")
        setChangePasswordInfo({
          id: id,
          oldPassword: "",
          newPassword: "",
          retypeNewPassword: "",
        })
        logOut()
        setCheckReLoading(!checkReLoading)
      } else if (res.EC == 1) {
        toast.error(res.EM)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "40vw" },
        height: "962px",
        "flex-shrink": "0",
        "border-radius": "20px",
        background: "#FFF",
        "box-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        alignItems: "center",
        paddingLeft: "24%",
        paddingRight: "24%",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
      noValidate
      autoComplete="off"
    >
      <div className="flex h-fit transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
        <div>
          <TextField
            className="error outlined-error fullWidth"
            id="oldPass"
            label="Nhập mật khẩu cũ"
            type="password"
            value={changePasswordInfo.oldPassword}
            onChange={(event) => handleChange("oldPassword", event.target.value)}
          />
          <TextField
            className="outlined-error fullWidth"
            id="newPass"
            label="Nhập mật khẩu mới"
            type="password"
            defaultValue="Nhập mật khẩu mới"
            value={changePasswordInfo.newPassword}
            onChange={(event) => handleChange("newPassword", event.target.value)}
          />
          <TextField
            className="outlined-error fullWidth"
            id="reNewPass"
            label="Nhập lại mật khẩu mới"
            type="password"
            defaultValue="Nhập lại mật khẩu mới"
            value={changePasswordInfo.retypeNewPassword}
            onChange={(event) => handleChange("retypeNewPassword", event.target.value)}
          />
        </div>
        <Button
          variant="contained"
          onClick={handleClick}
          color="primary"
          className="float-right cursor-pointer"
          sx={{
            marginLeft: "90%",
            marginTop: 2,
            padding: "10px 20px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "bold",
            width: "10px",
          }}
        >
          Lưu
        </Button>
      </div>
    </Box>
  )
}
