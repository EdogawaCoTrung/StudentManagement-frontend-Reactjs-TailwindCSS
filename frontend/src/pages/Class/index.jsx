import CardClass from '../../components/share/CardClass';
import CardGrade from '../../components/share/CardGrade';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function Class() {
    return (
    <Box sx={{ flexGrow: 1 }}>
          <CardGrade/>
          <CardClass/>
    </Box>
    );
}