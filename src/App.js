import React, { useState } from 'react';
import { Grid, Typography, Button, DialogContent, DialogActions } from '@mui/material';
// Import your BootstrapDialog and QuestionBox components here
// Ensure these paths correctly match the location and names of your component files
import BootstrapDialog from './components/BootstrapDialog';
import QuestionBox from './components/QuestionBox';
import { SpeedInsights } from '@vercel/speed-insights/react';


const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const previousQuestions = [
    { title: 'What is design thinking' },
    { title: 'How to use lean UX in Project implementation' },
    { title: 'What is meant by heuristic evaluation and how to use it' },
  ];

  const fetchAssistantResponse = async () => {
    if (!searchValue.trim()) return;
    
    let updatedHistory = [...conversationHistory, { "role": "user", "content": searchValue }];
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: "gpt-4-vision-preview", messages: updatedHistory }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const result = await response.json();
      setAssistantResponse(result.choices[0].message.content);
      setConversationHistory(updatedHistory);

    } catch (error) {
      console.error('Error:', error.message);
      setAssistantResponse('An error occurred while fetching the response.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid container className="main-container">
        {/* Your grid layout and components here */}
      </Grid>

      <Grid container spacing={2} style={{ padding: '20px' }}>
        {previousQuestions.map((question, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <QuestionBox 
              data={question} 
              onClick={() => {
                setSearchValue(question.title);
                fetchAssistantResponse(); // Optional: Trigger a fetch when a question is clicked
              }} 
            />
          </Grid>
        ))}
      </Grid>

      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogContent>
          <Grid container>
            <Typography gutterBottom>
              {isLoading ? 'Loading...' : (assistantResponse || 'Ask me about UX...')}
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Ask again
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <SpeedInsights />
    </>
  );
}

export default App;
