// @flow

import React, { Component } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  Typography,
  } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { UploadIcon, CloseIcon, ArrowsIcon } from '../src/icons';

const styles = () => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #F2F0F0',
    padding: '25px 29px',
  },
  titleText: {
    margin: '0 0 0 13px',
    fontSize: '14px',
    lineHeight: '17px',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  titleUpload: {
    width: '14px',
    height: '16px',
  },
  titleClose: {
    width: '14px',
    height: '16px',
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  contentTitle: {
    fontSize: '14px',
    lineHeight: '17px',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  contentParagraph: {
    fontSize: '12px',
    lineHeight: '17px',
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#99ABB4',
    padding: '16px 0 30px',
    '& span': {
      fontWeight: 'bold',
    },
    '& a': {
      color: '#1E88E5',
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
  },
  fieldBox: {
    display: 'flex',
  },
  fieldBoxInput: {
    flex: '4 4 20em',
    '& div': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
  },
  fieldBoxSelect: {
    flex: '1 1 10em',
    '& div': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
      color: '#1E88E5',
      fontWeight: '500',
    },
  },
});

type Props = any;
type State = { setOpen: boolean, result: {} };

class FormDialog extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    const { options } = this.props;
    const newResult = options.reduce((acc, item, i) => {
      acc[item] = i;
      return acc;
    }, {});

    this.state = {
      setOpen: false,
      result: newResult,
    };
  }

  toggleForm = (e: any) => {
    e.preventDefault();
    const { setOpen } = this.state;
    this.setState({ setOpen: !setOpen });
  };

  handleSelectChanged = (i: number) => (e: any) => {
    e.preventDefault();
    const { result } = this.state;
    const keyName = Object.keys(result)[i];
    this.setState({ result: { ...result, [keyName]: e.target.value } });
  };

  renderFields = () => {
    const { options, classes, selectedOptions } = this.props;

    return options.map((item, index) => {
      const { result } = this.state;
      const defaultInput = selectedOptions ? selectedOptions[item] : '';
      const label = `Field ${index + 1}`;

      return (
        <Box mb={2} key={`${item}:${index + 1}`} className={classes.fieldBox}>
          <TextField
            id="outlined-helperText"
            label={label}
            defaultValue={defaultInput}
            variant="outlined"
            className={classes.fieldBoxInput}
          />
          <FormControl
            variant="outlined"
            className={classes.fieldBoxSelect}
          >
            <Select
              value={result[Object.keys(result)[index]]}
              onChange={this.handleSelectChanged(index)}
            >
              {options.map((name, i) => (
                <MenuItem value={i} key={`${name}:${i + 1}`}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      );
    });
  }

  sendForm = (e: any) => {
    e.preventDefault();
    const { result } = this.state;
    const { callBack } = this.props;
    const resultValues = Object.values(result);
    let repeat = false;

    resultValues.forEach((item, i, arr) => {
      if (arr.includes(item, i + 1)) {
        repeat = true;
      }
    });

    // eslint-disable-next-line no-alert
    return repeat ? alert('You can not choose similar options') : callBack(JSON.stringify(result));
  }

  render() {
    const { classes } = this.props;
    const { setOpen } = this.state;

    return (
      <Box className={classes.wrapper}>
        <Button variant="outlined" color="primary" onClick={this.toggleForm}>
          Open form dialog
        </Button>
        <Dialog open={setOpen} onClose={this.toggleForm} aria-labelledby="form-dialog-title">
          <Box className={classes.title}>
            <UploadIcon viewBox="0 0 14 16" className={classes.titleUpload} />
            <Typography variant="h2" className={classes.titleText}>
              Import Customers Base
            </Typography>
            <CloseIcon viewBox="0 0 14 16" onClick={this.toggleForm} className={classes.titleClose} />
          </Box>
          <DialogContent>
            <Typography variant="h3" className={classes.contentTitle}>Fields from uploaded CSV file</Typography>
            <Typography className={classes.contentParagraph}>
              Please choose correct columns and click
              <span> Show Table Preview </span>
              to see your imported data.&nbsp;
              <Link href="/sendfile">
                <a href="true">Send us your base file</a>
              </Link>
              &nbsp;and we&apos;ll import it ourselves
              if you have any problems with that.
            </Typography>
            {this.renderFields()}
          </DialogContent>
          <DialogActions>
            <Button
              fullWidth
              onClick={this.sendForm}
              color="primary"
              variant="outlined"
              startIcon={<ArrowsIcon viewBox="0 0 20 14" />}
            >
              Show Table Preview
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);
