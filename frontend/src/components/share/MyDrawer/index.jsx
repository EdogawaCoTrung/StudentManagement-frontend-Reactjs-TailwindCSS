import { useState } from 'react'; // For managing drawer state
import {MainTheme} from '../../../assets/Theme'
import {ThemeProvider} from '@mui/material/styles'
import Tabs from '@mui/material/Tabs';
import LinkTab from '@mui/material/Tab';
import { pagesName} from '../../../assets/PagesName/index'
import { publicRoutes } from '../../../routes';


const defaultTheme = MainTheme;


export default function MyDrawer() {

    const [selectedIndex, setSelectedIndex] = useState(null); 

    const handleListItemClick = (index) => {
        setSelectedIndex(index); 
    };

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Tabs
                    value = {selectedIndex}
                    orientation="vertical"
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    style ={{
                        position: "fixed",
                    }}
                >
                    {pagesName.map((text, index) => (
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
                            label={text} href= {publicRoutes[index+2].path}/>
                    ))}
                </Tabs>
            </ThemeProvider>
        </div>
    );
}


