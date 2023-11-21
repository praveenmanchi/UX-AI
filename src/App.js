// Importing necessary icons and components from Material-UI
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import { Grid, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { inject } from '@vercel/analytics';

// Importing CSS file and a custom component
import './App.css';
import QuestionBox from './components/QuestionBox/QuestionBox';

// Previous questions data
const previousQuestions = [
  {
    title: 'What is design thinking',
  },
  {
    title: 'How to use lean UX in Project implementation',
  },
  {
    title: 'What is meant by heuristic evaluation and how to use it',
  },
];

// Styling for the BootstrapDialog component
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // Styles for Dialog content
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  // Styles for Dialog actions
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  // Styles for Dialog paper
  '& .MuiDialog-paper': {
    maxWidth: '80%', // Adjust the width as needed
    borderRadius: theme.spacing(2),
    paddingBottom: '25px',
  },
}));

function App() {
  // State variables using React Hooks
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');

  // Function to handle input change in search bar
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle click on search button
  const handleSearchButtonClick = () => {
    fetchAssistantResponse(); // Call the function to fetch assistant response
    handleClickOpen();
  };

  // Function to handle key press (specifically 'Enter') in the search bar
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchAssistantResponse(); // Call the function to fetch assistant response
    }
  };

  

  // Function to fetch assistant response from OpenAI's API
  const fetchAssistantResponse = async () => {
    if (!searchValue.trim()) {
      return;
    }
  
    try {
      const response = await fetch('https://api.openai.com/v1/assistants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'sk-Uugj3kr4wInXFvb4fPvT3BIbkFJ3tdnjzu5WBPZ789iyfVY', // Replace with your API key
        },
        body: JSON.stringify({
          prompt: searchValue,
          max_tokens: 100,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
  
      const result = await response.json();
      console.log('POST request result:', result);
      setAssistantResponse(result.choices[0].text.trim());
    } catch (error) {
      console.error('Error making POST request:', error.message);
    }
  };
    // Call inject function to initiate analytics tracking
    inject();

  
  // The return statement contains JSX for the application layout
  return (
    <>
      {/* Main Grid container for the entire app */}
      <Grid
        container
        className="main-container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/ux-ai-bg-img.jpeg)`,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Grid item for the header */}
        <Grid item xs={12}>
          {/* Grid container for header content */}
          <Grid container justifyContent={'space-between'}>
            {/* Logo */}
            <Grid item>
              <img
                src={`${process.env.PUBLIC_URL}/images/ux-ai-logo.svg`}
                alt="i"
              />
            </Grid>
            {/* Version */}
            <Grid item className="version-style">
              Beta V.02
            </Grid>
          </Grid>
        </Grid>
        {/* Grid item for the main content */}
        <Grid
          item
          xs={12}
          sx={{ height: '90vh', display: 'flex', alignItems: 'center' }}
        >
          {/* Grid container for the main content layout */}
          <Grid
            container
            flexDirection={'row'}
            justifyContent={'center'}
            gap={'40px'}
          >
            {/* Search input container */}
            <Grid item className="input-field-container" xs={7}>
              <Grid
                container
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                {/* Search input field */}
                <Grid item xs={7} md={10}>
                  <input
                    placeholder="Ask me about UX "
                    className="input-field"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                </Grid>
                {/* Search button */}
                <Grid item className="enter-icon-container">
                  <IconButton onClick={handleSearchButtonClick}>
                    <SubdirectoryArrowLeftIcon
                      sx={{
                        color: 'white',
                        opacity: '0.5',
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            {/* Displaying previous questions */}
            <Grid item xs={8}>
              <Grid
                container
                gap={'28px'}
                flexDirection={'row'}
                justifyContent={'space-between'}
              >
                {previousQuestions.map((eachCard, idx) => (
                  <Grid item xs={12} md={3.5} key={idx}>
                    {/* Custom component to display previous questions */}
                    <QuestionBox data={eachCard} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {/* Text informing about model training */}
            <Grid item xs={4}>
              <Typography sx={{ textAlign: 'center', marginTop: '100px' }}>
              We are feeding, fine-tuning, and training our model. A little misleading information is to be expected.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Footer section */}
        <Grid
          container
          flexDirection={'row'}
          justifyContent={'flex-end'}
          alignItems={'center'}
        >
          {/* Logo in the footer */}
          <Grid item>
            <img
              src={`${process.env.PUBLIC_URL}/images/ux-ai-logo.svg`}
              alt="i"
            />
          </Grid>
          {/* Links in the footer */}
          <Link
            href="https://www.linkedin.com/in/praveenmanchi/"
            sx={{
              marginLeft: '18px',
              color: '#171717',
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            Made by Praveen
          </Link>
          <Link
            href="https://github.com/praveenmanchi/UX-AI"
            sx={{
              marginLeft: '18px',
              color: '#171717',
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            Github
          </Link>
        </Grid>
      </Grid>
      {/* BootstrapDialog component to display assistant response */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* Dialog content */}
        <DialogContent>
          {/* Grid container to display assistant response */}
          <Grid
            container
            style={{
              backgroundColor: 'rgba(195, 195, 195, 0.14)',
              padding: '70px 32px 70px 18px',
              borderRadius: '12px',
            }}
          >
            {/* Displaying assistant's response */}
            <Typography gutterBottom sx={{ textAlign: 'center' }}>
              {assistantResponse || 'Ask me about UX...'}
            </Typography>
          </Grid>
        </DialogContent>
        {/* DialogActions containing a button to ask again */}
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            autoFocus
            onClick={handleClose}
            variant="contained"
            sx={{
              background: '#1b1b1b',
              borderRadius: '24px',
              fontSize: '14px',
            }}
          >
            Ask again
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default App;
