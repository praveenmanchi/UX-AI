import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import { Grid, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import './App.css';
import QuestionBox from './components/QuestionBox/QuestionBox';

const previousQuestions = [
  {
    title: 'What is design thinking',
  },
  {
    title:
      'How to use lean UX in Project implimentation',
  },
  {
    title:
      'what is mean by heuristic evaluation and how to use it',
  },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    maxWidth: '80%', // Adjust the width as needed
    borderRadius: theme.spacing(2),
    paddingBottom: '25px',
  },
}));

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchButtonClick = () => {
    fetchData();
    handleClickOpen();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const fetchData = React.useCallback(async () => {
    if (!searchValue.trim()) {
      return;
    }
    try {
      const response = await fetch(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${'rmEBLyJHFodtf3LjphNIT3BlbkFJlKOca9QF26VMv54zqwAd'}`,
          },
          body: JSON.stringify({
            prompt: searchValue,
            max_tokens: 100,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const result = await response.json();
      console.log('POST request result:', result);
    } catch (error) {
      console.error('Error making POST request:', error.message);
    }
  }, [searchValue]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Grid
        container
        className="main-container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/ux-ai-bg-img.jpeg)`,
          width: '100%',
          height: '100%',
        }}
      >
        <Grid item xs={12}>
          <Grid container justifyContent={'space-between'}>
            <Grid item>
              <img
                src={`${process.env.PUBLIC_URL}/images/ux-ai-logo.svg`}
                alt="i"
              />
            </Grid>
            <Grid item className="version-style">
              Beta V.02
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ height: '90vh', display: 'flex', alignItems: 'center' }}
        >
          <Grid
            container
            flexDirection={'row'}
            justifyContent={'center'}
            gap={'40px'}
          >
            <Grid item className="input-field-container" xs={7}>
              <Grid
                container
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Grid item xs={7} md={10}>
                  <input
                    placeholder="Ask me about UX "
                    className="input-field"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                </Grid>
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
            <Grid item xs={8}>
              <Grid
                container
                gap={'28px'}
                flexDirection={'row'}
                justifyContent={'space-between'}
              >
                {previousQuestions.map((eachCard, idx) => (
                  <Grid item xs={12} md={3.5} key={idx}>
                    <QuestionBox data={eachCard} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: 'center', marginTop: '100px' }}>
                We are training our model and feeding, tuning. Please expect
                some misleading information.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          flexDirection={'row'}
          justifyContent={'flex-end'}
          alignItems={'center'}
        >
          <Grid item>
            <img
              src={`${process.env.PUBLIC_URL}/images/ux-ai-logo.svg`}
              alt="i"
            />
          </Grid>
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
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
          <Grid
            container
            style={{
              backgroundColor: 'rgba(195, 195, 195, 0.14)',
              padding: '70px 32px 70px 18px',
              borderRadius: '12px',
            }}
          >
            <Typography gutterBottom sx={{ textAlign: 'center' }}>
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
              Ask me about UX Ask me about UX Ask me about UX Ask me about UX
            </Typography>
          </Grid>
        </DialogContent>
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