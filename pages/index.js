// @flow

import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormButton from '../components/FormDialog';

export default function Index() {
  // eslint-disable-next-line no-alert
  const cb = (data) => alert(data);
  const data = ['name', 'surname', 'phone', 'email'];
  const selectedData = {
    name: 'Flavio',
    email: 'flaviobuccirentcompany@gmail.com',
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Please, press the button:
        </Typography>
        <FormButton options={data} selectedOptions={selectedData} callBack={cb} />
      </Box>
    </Container>
  );
}
