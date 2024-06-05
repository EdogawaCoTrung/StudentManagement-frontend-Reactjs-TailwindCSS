import UpdatePasswordModal from "../../../components/share/UpdatePasswordModal"
import StudentProfileView from "../../../components/share/StudentProfileView"

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



export default function StudentProfile() {
  const [value, setValue] = React.useState('profileView');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', paddingTop: '40px'  }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          centered
          sx={{
            backgroundColor: 'whitesmoke',
            marginLeft: '20vw',
            marginRight: '20vw',
            borderRadius: '20px',
          }}
        >
          <Tab
            value="profileView"
            label="Thông tin tài khoản"
            onClick={() => setValue('profileView')}
            sx = {{
              fontSize: '20px',
              fontWeight: 'medium',
              color: "black",
              textTransform: 'none',
            }}
          />
          <Tab
            value="updatePassword"
            label="Đổi mật khẩu"
            onClick={() => setValue('updatePassword')}
            sx = {{
              fontSize: '20px',
              fontWeight: 'medium',
              color: "black",
              textTransform: 'none',
            }}
          />
        </Tabs>
      </Box>
      {value === 'updatePassword' && <UpdatePasswordModal />}
      {value === 'profileView' && <StudentProfileView />}
    </div>
  );
}
