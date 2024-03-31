// import { Drawer } from '@mui/material';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react'; // For managing drawer state
import {MainTheme} from '../../../assets/Theme'
import {ThemeProvider} from '@mui/material/styles'
// import MenuIcon from '@mui/icons-material/Menu';
// import { ListItemIcon} from '@mui/material';
// import GroupsIcon from '@mui/icons-material/Groups';
import Tabs from '@mui/material/Tabs';
import LinkTab from '@mui/material/Tab';


const defaultTheme = MainTheme;


const pages = ['Thống kê', 'Lớp', 'Học Sinh', 'Giáo Viên', 'Phong Trào', 'Kế Hoạch & Nhiệm Vụ', 'Doanh Thu', 'Đăng Xuất']

export default function MyDrawer() {

    const [selectedIndex, setSelectedIndex] = useState(null); 

    const handleListItemClick = (text, index) => {
        setSelectedIndex(index); 
    };

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Tabs orientation="vertical"
                >
                    {pages.map((text, index) => (
                        <LinkTab
                            key={index}
                            onClick = {() => handleListItemClick(text, index)}
                            sx={{
                                width: 220,
                                paddingLeft: 3,
                                alignContent: 'center',
                                color: selectedIndex === index ? 'white' : 'dark-gray', 
                                backgroundColor: selectedIndex === index ? 'primary.main' : undefined,
                                '&:hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }} 
                            label={text} href= {`/${text}`}/>
                    ))}
                </Tabs>
            </ThemeProvider>
        </div>
    );
}


