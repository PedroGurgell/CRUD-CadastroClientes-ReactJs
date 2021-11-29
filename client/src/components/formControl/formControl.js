import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

export default function FormattedInputs(props) {
    const {error=null} =props;
  return (
      <FormControl 
        margin="dense"
        variant="standard"
        fullWidth
        type="text"
        {...(error&&{error:true})}
      >
        <InputLabel htmlFor="formatted-text-mask-input">{props.label}</InputLabel>
        <Input
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          inputComponent={props.inputComponent}
        />
        {error &&  <FormHelperText>{error}</FormHelperText>}
      </FormControl>
  );
}