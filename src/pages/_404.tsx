import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../components/Link';
import ProTip from '../components/ProTip';
import Copyright from '../components/Copyright';

const Error: NextPage = ({ statusCode }: any) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Error caused by status code {statusCode}
        </Typography>
        <Box maxWidth="md">
          <div id="lipsum">

            <Box maxWidth="md">
              <div id="lipsum">
                <p>
                  {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}</p>
              </div>
            </Box>
          </div>
        </Box>
      </Box>
    </Container>
  );
};


Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error