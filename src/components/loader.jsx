import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <div style={{height:"100vh" ,width:"100%", paddingTop:"250px" , textAlign:"center"}}>
      <CircularProgress color="secondary" size="50px"/>
    </div>
  );
}