import Grid from '@mui/material/Grid';

import Sidebar from './components/sidebar';

import { useState } from 'react';

function App() {
  var [page, setPage] = useState('home');

  return (
    <Grid container spacing={0}>
      <Grid item xs={1}>
        <Sidebar page={page} setPage={setPage} />
      </Grid>
      <Grid item xs={11}>
        <div className="content">
          Hello
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
