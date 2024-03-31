import Sidebar from './components/sidebar';
import Content from './components/content';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';

function App() {
  var theme = createTheme({
    palette: {
      sidebarUnselected: {
        main: '#0007',
        light: '#0007',
        dark: 'fff7',
        contrastText: '#111',
      },
    },
  });


  var [page, setPage] = useState('graph');

  return (
    <ThemeProvider theme={theme}>
      <Sidebar page={page} setPage={setPage} />
      <Content page={page} />
    </ThemeProvider>
  );
}

export default App;