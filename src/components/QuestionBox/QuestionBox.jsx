import CallMadeIcon from '@mui/icons-material/CallMade';
import { Grid, IconButton } from '@mui/material';
import React from 'react';
import '../QuestionBox/QuestionBox.css';

const QuestionBox = ({ data }) => {
  return (
    <Grid container className="question-box-container">
      <Grid item className="question" xs={8}>
        {data.title}
      </Grid>
      <Grid item>
        <IconButton>
          <CallMadeIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default QuestionBox;
