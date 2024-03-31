import { useEffect, useState } from 'react'; // For managing drawer state
import {MainTheme} from '../../../assets/Theme'
import {ThemeProvider} from '@mui/material/styles'
import Tabs from '@mui/material/Tabs';
import LinkTab from '@mui/material/Tab';
import { pagesName} from '../../../assets/PagesName/index'
import { publicRoutes } from '../../../routes';


const defaultTheme = MainTheme;


export default function Sidebar() {

    const [selectedIndex, setSelectedIndex] = useState(() => parseInt(localStorage.getItem('selectedIndex')) || 0); 
    const [currentTab, setCurrentTab] = useState(selectedIndex);
    useEffect(() => {
        localStorage.setItem('selectedIndex', selectedIndex);
      }, [selectedIndex]);

    const handleListItemClick = (index) => {
        setSelectedIndex(index); 
    };

    const handleTabSelection = () => {
        setCurrentTab(selectedIndex);
    }

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Tabs
                    value = {currentTab}
                    onClick={() => handleTabSelection()}
                    orientation="vertical"
                    textColor="white"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    style ={{
                        position: "fixed",
                    }}
                >
                    {pagesName.map((text, index) => (
                        <LinkTab
                            key={index}
                            onClick = {() => handleListItemClick(index)}
                            sx={{
                                width: 220,
                                alignContent: 'center',
                                color: selectedIndex === index ? 'white' : 'gray', 
                                fontWeight: 'bold',
                                backgroundColor: selectedIndex === index ? 'primary.main' : undefined,
                                '&:hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }} 
                            label={text} href= {publicRoutes[index+2].path}/>
                    ))}
                </Tabs>
            </ThemeProvider>
        </div>
    );
}

