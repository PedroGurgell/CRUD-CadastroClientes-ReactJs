import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormattedInputs from '../formControl/formControl';
import Axios from "axios";

import { IMaskInput } from 'react-imask';

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

export default function CardDialog(props) {
  
  const [erros, setErros] = useState({});
  const validate = () => {
    let temp = {}

    temp.nomeEmpresa = props.editValues.nomeEmpresa ? "" : "Nome da empresa deve ser preenchido!"
    temp.nomeResponsavel = props.editValues.nomeResponsavel ? "" : "Nome do responsável devem ser preenchido!"
    temp.cidade = props.editValues.cidade ? "" : "Cidade deve ser preenchido!"
    temp.estado = props.editValues.estado ? "" : "Estado deve ser preenchido!"
    temp.logradouro = props.editValues.logradouro ? "" : "Logradouro deve ser preenchidos!"
    temp.porte = props.editValues.porte ? "" : "Selecione um porte!"
    temp.numeroCasa = props.editValues.numeroCasa ? "" : "Número deve ser preenchido!"

    temp.email = (/$^|.+@.+..+/).test(props.editValues.email)?"":"O email está com a estrutura errada!"
    temp.identificador = props.editValues.identificador.length === 14 || props.editValues.identificador.length === 18 ? "" 
    : "CPF ou CNPJ incompletos!"
    temp.cep = props.editValues.cep.length === 9 ? "": "Cep Incompleto!"
    temp.telefone = props.editValues.telefone.length === 14 || props.editValues.telefone.length === 15 ? "" 
    : "Telefone incompleto!"

    setErros({...temp})
    console.log(temp);
    return Object.values(temp).every(x => x === "")
  }

    const handleEditCliente = () => {
      if(validate()){
        Axios.put("http://localhost:3001/edit", props.editValues)
        .then(() => {
          props.setListCard(
            props.listCard.map((value) => {
              return value.idclientes === props.editValues.idclientes
                ? props.editValues
                : value;
            })
          );
        });
        handleClose();
      }
      
    }


    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = value => {
      props.setEditValues(prevValues =>({
        ...prevValues,[value.target.id]: value.target.value,
      }));
    }
  return (
      <Dialog sx={{textAlign:'center'}} open={props.open} onClose={handleClose}>
        <DialogTitle sx={{color: '#1976d2',mb:1.5}} variant="h5" component="div">Editar Cliente</DialogTitle>
        <DialogContent>
        <FormattedInputs 
          id={"nomeEmpresa"}
          label={"Nome da empresa"}
          onChange={handleChangeValues}
          defaultValue={props.data.nomeEmpresa}
          error={erros.nomeEmpresa}
          />
          <FormattedInputs 
          id={"nomeResponsavel"}
          label={"Nome do responsável"}
          onChange={handleChangeValues}
          defaultValue={props.data.nomeResponsavel}
          error={erros.nomeResponsavel}
          />
          <FormattedInputs 
          id={"identificador"}
          label={"CPF ou CNPJ"}
          value={props.editValues.identificador}
          defaultValue={props.data.identificador}
          onChange={handleChangeValues}
          inputComponent={TextMaskIdentificador}
          error={erros.identificador}
          />
          <FormattedInputs 
            id={"email"}
            label={"Email"}
            error={erros.email}
            defaultValue={props.data.email}
            onChange={handleChangeValues}
            />
          <FormattedInputs 
            id={"telefone"}
            label={"Telefone"}
            defaultValue={props.data.telefone}
            error={erros.telefone}
            value={props.editValues.telefone}
            onChange={handleChangeValues}
            inputComponent={TextMaskTelefone}
          />
          <TextField
              margin="dense"
              id="porte"
              select
              label="Porte"
              defaultValue={props.data.porte}
              SelectProps={{
                native: true,
              }}
              fullWidth
              variant="standard"
              error={erros.porte}
              onChange={handleChangeValues}
            >
              <option >Escolha o tamanho</option>
              <option value='Pequeno'>Pequeno</option>
              <option value='Médio'>Médio</option>
              <option value='Grande'>Grande</option>
          </TextField>
          <FormattedInputs 
          id={"estado"}
          label={"Estado"}
          onChange={handleChangeValues}
          defaultValue={props.data.estado}
          error={erros.estado}
          />
          <FormattedInputs 
          id={"cep"}
          label={"CEP"}
          value={props.editValues.cep}
          defaultValue={props.data.cep}
          onChange={handleChangeValues}
          inputComponent={TextMaskCep}
          error={erros.cep}
          />
          <FormattedInputs 
          id={"cidade"}
          label={"Cidade"}
          onChange={handleChangeValues}
          defaultValue={props.data.cidade}
          error={erros.cidade}
          />
          <FormattedInputs 
          id={"logradouro"}
          label={"Logradouro"}
          onChange={handleChangeValues}
          defaultValue={props.data.logradouro}
          error={erros.logradouro}
          />
          <FormattedInputs 
          id={"numeroCasa"}
          label={"Número"}
          value={props.editValues.numeroCasa}
          defaultValue={props.data.numeroCasa}
          onChange={handleChangeValues}
          inputComponent={TextMaskNumero}
          error={erros.numeroCasa}
          />
        </DialogContent>
        <DialogActions sx={{padding:'20px'}}>
          <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleEditCliente}>Salvar</Button>
        </DialogActions>
      </Dialog>
  );
}