import React,{useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Card from "./components/card/card";
import FormDialog from "./components/dialogForm/dialogForm";

function App() {

  const [listClientes, setListClientes] = useState([]);
  
  useEffect(()=> {
      Axios.get("http://localhost:3001/getCards").then((response)=>{
        setListClientes(response.data);
      })
  },[]);


  return (
    <div className="App">
      <div className="app-container">
      <Box sx={{ 
        width: '100%',
        height: '100%', 
        flexGrow: 1 }}>
      <AppBar position="static"
      sx={{
        backgroundColor: '#01579b'
        
      }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{fontSize:'calc(0.6em + 0.9vw)', flexGrow: 1 }}>
            Sistema de Clientes
          </Typography>
          <FormDialog
            listCard={listClientes} 
            setListClientes={setListClientes}
          />
        </Toolbar>
      </AppBar>
    </Box>
    <Box
    sx={{
      width: '100%',
      height: '100%',
      minHeight:'100vh',
      backgroundColor: '#e3f2fd',
      textAlign:'center'
      
    }}
    >
       <Typography variant="h3" component="div" sx={{ fontSize:'calc(1em + 2vw)', mt:5,mb:3, flexGrow: 1,color:'#003b6b' }}>
            Lista de Clientes
        </Typography>
    
      {listClientes.map((value)=>(
          <Card 
          key={value.idclientes}
          listCard={listClientes} setListClientes={setListClientes}
          dataCard={value}>
          </Card>
        ))}
      </Box>
      </div>
    </div>
    
  );
}

export default App;
