// import { Drawer } from '@mui/material';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import { useState } from 'react'; // For managing drawer state



// export default function MyDrawer() {
//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//     const toggleDrawer = (open) => (event) => {
//         // Prevent bubbling if triggered from within the drawer
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return;
//         }
//         setIsDrawerOpen(open);
//     };

//     return (
//         <div>
//             <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
//             <Drawer
//                 anchor="left" // Position: 'left', 'right', 'top', 'bottom' 
//                 open={isDrawerOpen}
//                 onClose={toggleDrawer(false)}
//             >
//                 <List>
//                    {['Item 1', 'Item 2', 'Item 3'].map((text) => (
//                        <ListItem button key={text}>
//                            <ListItemText primary={text} />
//                        </ListItem>
//                    ))}
//                 </List>
//             </Drawer>
//         </div>
//     );
// }


