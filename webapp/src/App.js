import Navbar from './components/navbar';
import Content from './components/content';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';

function App() {
  var theme = createTheme({});


  var [page, setPage] = useState('graph');

  return (
    <ThemeProvider theme={theme}>
      <Navbar page={page} setPage={setPage} />
      <Content page={page} />
    </ThemeProvider>
  );
}

export default App;