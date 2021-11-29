import { useState } from "react";
import CardDialog from "../dialogCards/dialogCards";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Axios from "axios";


export default function CardClient(props) {
    const [open, setOpen] = useState(false);
    const handleClickCard= ()=> {
        setOpen(true);
    }

    const [editValues, setEditValues] = useState({
        idclientes: props.dataCard.idclientes,
        nomeEmpresa: props.dataCard.nomeEmpresa,
        nomeResponsavel: props.dataCard.nomeResponsavel,
        cidade: props.dataCard.cidade,
        estado: props.dataCard.estado,
        cep: props.dataCard.cep,
        logradouro: props.dataCard.logradouro,
        numeroCasa: props.dataCard.numeroCasa,
        identificador: props.dataCard.identificador,
        porte: props.dataCard.porte,
        telefone: props.dataCard.telefone,
        email: props.dataCard.email,
      });

      const handleDeleteCliente=() =>{
        Axios.delete(`http://localhost:3001/delete/${editValues.idclientes}`)
        .then(() => {
        props.setListClientes(
            props.listCard.filter((value) => {
              return value.idclientes !== editValues.idclientes;
            })
          );
        });
        handleClose();
      }
  
      const handleClose = () => {
          setOpen(false);
      };


  return (
    <>
     <CardDialog
            open={open} 
            setOpen={setOpen} 
            data={props.dataCard}
            listCard={props.listCard} 
            setListCard={props.setListClientes} 
            editValues={editValues}
            setEditValues={setEditValues}
        />
   
    <Box
        component="span"
        sx={{ 
        width: '100%',
        maxWidth:'1000px' 
    }}>
      <Box sx={{width:'100%',minWidth:'300px', maxWidth:'1000px',margin:'0 auto',transform: 'scale(0.8)'}}>
      <Accordion>
        <AccordionSummary
         sx={{
            backgroundColor: '#fafafa',
            '&:hover': {
                backgroundColor: '#f5f5f5',
            },
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
                <Typography variant="body2" gutterBottom color="text.secondary">
                    #{props.dataCard.idclientes}
                </Typography>
                <Box sx={{display:'flex',paddingX:'calc(0.4em + 1vw)',width:'90%',gap:'calc(0.8em + 1.5vw)',alignItems:'center'}}>
                <Typography sx={{ fontSize:'calc(0.8em + 0.8vw)'}}>
                {props.dataCard.nomeEmpresa}
                </Typography>
                <Typography sx={{ fontSize:'calc(0.6em + 0.8vw)'}} color="text.secondary">
                {props.dataCard.nomeResponsavel}
                </Typography>
                </Box>
        </AccordionSummary>
        <AccordionDetails sx={{textAlign:'left'}}
        >
        <Box sx={{display:'flex',paddingX:'20px',flexWrap:'wrap',width:'100%',textAlign:'left'}}>
            <Box sx={{width:'50%',minWidth:'280px',height:'150px'}}>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Dados da Empresa:
                </Typography>
                <Typography color="text.secondary">
                    CPF ou CNPJ: {props.dataCard.identificador}
                </Typography>
                <Typography color="text.secondary">
                    Porte: {props.dataCard.porte}
                </Typography>
                <Typography color="text.secondary">
                    Telefone: {props.dataCard.telefone}
                </Typography>
                <Typography color="text.secondary">
                    Email: {props.dataCard.email}
                </Typography>
            </Box>
            <Box sx={{width:'50%',height:'150px',minWidth:'280px'}}>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Endereço:
                </Typography>
                <Typography color="text.secondary">
                    Cidade: {props.dataCard.cidade}
                </Typography>
                <Typography color="text.secondary">
                    Estado: {props.dataCard.estado}
                </Typography>
                <Typography color="text.secondary">
                    CEP: {props.dataCard.cep}
                </Typography>
                <Typography color="text.secondary">
                    Logradouro: {props.dataCard.logradouro}
                </Typography>
                <Typography color="text.secondary">
                    Número da casa: {props.dataCard.numeroCasa}
                </Typography>
            </Box>
        </Box>
        <Box sx={{ mx: '2px',mt:3}}>
        <Button sx={{ marginRight:'5px' }}variant="outlined" color="error"
        onClick={()=> handleDeleteCliente()}>
            Excluir
        </Button>
        <Button variant="outlined" onClick={()=> handleClickCard()}>Editar</Button>
        </Box>
        </AccordionDetails>
      </Accordion>
    </Box>

  </Box>

    </>
  );
}