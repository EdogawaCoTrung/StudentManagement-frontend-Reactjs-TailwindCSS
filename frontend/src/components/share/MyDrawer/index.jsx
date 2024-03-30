import { Drawer } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react'; // For managing drawer state
import {MainTheme} from '../../../assets/Theme'
import {ThemeProvider} from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu';

const defaultTheme = MainTheme;


const pages = ['Thống kê', 'Lớp', 'Học Sinh', 'Giáo Viên', 'Phong Trào', 'Kế Hoạch & Nhiệm Vụ', 'Doanh Thu', 'Đăng Xuất']

export default function MyDrawer() {

    const [selectedIndex, setSelectedIndex] = useState(null); 

    const handleListItemClick = (text, index) => {
        setSelectedIndex(index); 
    };
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        // Prevent bubbling if triggered from within the drawer
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Button onClick={toggleDrawer(true)}>
                    <MenuIcon/>
                </Button>
                <Drawer
                    anchor="left" // Position: 'left', 'right', 'top', 'bottom' 
                    open={isDrawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <List>
                    {pages.map((text, index) => (
                        <ListItemButton 
                            onClick = {() => handleListItemClick(text, index)}
                            sx={{
                                color: selectedIndex === index ? 'white' : 'dark-gray', 
                                backgroundColor: selectedIndex === index ? 'primary.main' : undefined,
                                '&:hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }} 
                            key={text}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    ))}
                    </List>
                </Drawer>
            </ThemeProvider>
        </div>
    );
}


