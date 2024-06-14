import RegulationUpdate from "../../../components/share/RegulationUpdate"
import RegulationView from "../../../components/share/RegulationView"

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";




export default function Regulation() {
  const [value, setValue] = React.useState('regulationView');

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
            value="regulationView"
            label="Thông tin quy định"
            onClick={() => setValue('regulationView')}
            sx = {{
              fontSize: '20px',
              fontWeight: 'medium',
              color: "black",
              textTransform: 'none',
            }}
          />
          <Tab
            value="updateRegulation"
            label="Cập nhật quy định"
            onClick={() => setValue('updateRegulation')}
            sx = {{
              fontSize: '20px',
              fontWeight: 'medium',
              color: "black",
              textTransform: 'none',
            }}
          />
        </Tabs>
      </Box>
      {value === 'updateRegulation' && <RegulationUpdate />}
      {value === 'regulationView' && <RegulationView />}
    </div>
  );
}
