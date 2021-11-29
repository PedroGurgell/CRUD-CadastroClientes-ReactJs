import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Axios from "axios";
import { IMaskInput } from 'react-imask';
import FormattedInputs from '../formControl/formControl';

const telefoneMask = "(00) 0000-0000";
const fixoMask = "(00) 00000-0000";
const cnpjMask = "00.000.000/0000-00";
const cpfMask = "000.000.000-00";
const telefoneChange = [{mask: telefoneMask} , {mask: fixoMask}];
const indetificadorChange = [{mask: cpfMask} , { mask: cnpjMask}];

const TextMaskTelefone = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={telefoneChange}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { id: props.id, value } })}
    />
  );
});

const TextMaskCep = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#0000-000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { id: props.id, value } })}
      overwrite
    />
  );
});
const TextMaskNumero = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { id: props.id, value } })}
      overwrite
    />
  );
});

const TextMaskIdentificador = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={indetificadorChange}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { id: props.id, value } })}
    />
  );
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: '#01579b',
  backgroundColor: '#e3f2fd',
  '&:hover': {
    backgroundColor: '#bbdefb',
  },
}));

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({nomeEmpresa:'', nomeResponsavel: '', cidade: '', estado: '', cep:'', identificador: '', telefone: '', email: '', logradouro: '', porte: '', numeroCasa: '',});
  const [erros, setErros] = useState({});
  const handleChangeValues = (value) => (
    setValues(prevValue=>({...prevValue, [value.target.id]: value.target.value,
    }))
  );
    const validate = () => {
      let temp = {}

      temp.nomeEmpresa = values.nomeEmpresa ? "" : "Nome da empresa deve ser preenchido!"
      temp.nomeResponsavel = values.nomeResponsavel ? "" : "Nome do responsável devem ser preenchido!"
      temp.cidade = values.cidade ? "" : "Cidade deve ser preenchido!"
      temp.estado = values.estado ? "" : "Estado deve ser preenchido!"
      temp.logradouro = values.logradouro ? "" : "Logradouro deve ser preenchidos!"
      temp.porte = values.porte ? "" : "Selecione um porte!"
      temp.numeroCasa = values.numeroCasa ? "" : "Número deve ser preenchido!"

      temp.email = (/$^|.+@.+..+/).test(values.email)?"":"O email está com a estrutura errada!"
      temp.identificador = values.identificador.length === 14 || values.identificador.length === 18 ? "" 
      : "CPF ou CNPJ incompletos!"
      temp.cep = values.cep.length === 9 ? "": "Cep Incompleto!"
      temp.telefone = values.telefone.length === 14 || values.telefone.length === 15 ? "" 
      : "Telefone incompleto!"

      setErros({...temp})
      console.log(temp);
      return Object.values(temp).every(x => x === "")
    }


  const handleClickButton = () => {
    if(validate()){
      Axios.post("http://localhost:3001/register",values)
      .then(() => {
        Axios.post("http://localhost:3001/search",values)
        .then((response) => {
          props.setListClientes([
            ...props.listCard,response.data[0],
          ]);
        });
      });
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues("");
  };

  return (
    <div>
      <ColorButton variant="contained" onClick={handleClickOpen}>
        Cadastrar Cliente
      </ColorButton>
      <Dialog sx={{textAlign:'center'}} open={open} onClose={handleClose}>
        <DialogTitle sx={{color: '#1976d2',mb:1.5}}>Cadastro de Cliente</DialogTitle>
        <DialogContent>
            <FormattedInputs 
            id={"nomeEmpresa"}
            label={"Nome da empresa"}
            error={erros.nomeEmpresa}
            onChange={handleChangeValues}
            />
            <FormattedInputs 
            id={"nomeResponsavel"}
            label={"Nome do responsável"}
            error={erros.nomeResponsavel}
            onChange={handleChangeValues}
            />
            <FormattedInputs
            id={"identificador"}
            label={"CPF ou CNPJ"}
            value={values.identificador}
            error={erros.identificador}
            onChange={handleChangeValues}
            inputComponent={TextMaskIdentificador}
            />
            <FormattedInputs 
              id={"email"}
              label={"Email"}
              error={erros.email}
              onChange={handleChangeValues}
            />
            <FormattedInputs 
              id={"telefone"}
              label={"Telefone"}
              value={values.telefone}
              onChange={handleChangeValues}
              inputComponent={TextMaskTelefone}
              error={erros.telefone}
            />
            <TextField
                margin="dense"
                id="porte"
                select
                label="Porte"
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="standard"
                onChange={handleChangeValues}
                error={erros.porte}
              >
                <option >Escolha o tamanho</option>
                <option value='Pequeno'>Pequeno</option>
                <option value='Médio'>Médio</option>
                <option value='Grande'>Grande</option>
              </TextField>
            <FormattedInputs 
            id={"estado"}
            label={"Estado"}
            error={erros.estado}
            onChange={handleChangeValues}
            />
            <FormattedInputs 
            id={"cep"}
            label={"CEP"}
            value={values.cep}
            error={erros.cep}
            onChange={handleChangeValues}
            inputComponent={TextMaskCep}
            />
            <FormattedInputs 
            id={"cidade"}
            label={"Cidade"}
            error={erros.cidade}
            onChange={handleChangeValues}
            />
            <FormattedInputs 
            id={"logradouro"}
            label={"Logradouro"}
            error={erros.logradouro}
            onChange={handleChangeValues}
            />
            <FormattedInputs 
            id={"numeroCasa"}
            label={"Número"}
            value={values.numeroCasa}
            error={erros.numeroCasa}
            onChange={handleChangeValues}
            inputComponent={TextMaskNumero}
            />
        </DialogContent>
        <DialogActions sx={{padding:'20px'}}>
          <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={()=>handleClickButton()}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}