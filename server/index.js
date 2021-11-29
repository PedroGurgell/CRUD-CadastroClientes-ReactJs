const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({ 
    host: "localhost",
    user: "root",
    password: "password",
    database: "crudclientes",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req,res)=>{
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const email = req.body.email;
    const estado = req.body.estado;
    const identificador = req.body.identificador;
    const logradouro = req.body.logradouro;
    const nomeEmpresa = req.body.nomeEmpresa;
    const nomeResponsavel = req.body.nomeResponsavel;
    const numeroCasa = req.body.numeroCasa;
    const porte = req.body.porte;
    const telefone = req.body.telefone;

    let SQL = "INSERT INTO clientes (cep,cidade,email,estado,identificador,logradouro,nomeEmpresa,nomeResponsavel,numeroCasa,porte,telefone) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    
    db.query(SQL,[cep,cidade, email, estado, identificador, logradouro, nomeEmpresa, nomeResponsavel, numeroCasa, porte, telefone],(err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    })

});

app.post("/search", (req, res) => {
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const email = req.body.email;
    const estado = req.body.estado;
    const identificador = req.body.identificador;
    const logradouro = req.body.logradouro;
    const nomeEmpresa = req.body.nomeEmpresa;
    const nomeResponsavel = req.body.nomeResponsavel;
    const numeroCasa = req.body.numeroCasa;
    const porte = req.body.porte;
    const telefone = req.body.telefone;

  
    let SQL =
      "SELECT * from clientes WHERE cep = ? AND cidade = ? AND email = ? AND estado = ? AND identificador = ? AND logradouro = ? AND nomeEmpresa = ? AND nomeResponsavel = ? AND numeroCasa = ? AND porte = ? AND telefone = ?";
      
    db.query(SQL, [cep,cidade, email, estado, identificador, logradouro, nomeEmpresa, nomeResponsavel, numeroCasa, porte, telefone], (err, result) => {
      if (err) res.send(err);
      res.send(result);
    });
  });

app.get("/getCards", (req,res) => {
    let SQL = "SELECT * from clientes";

    db.query(SQL, (err,result) =>{
        if(err) console.log(err);
        else res.send(result);

    })
});

app.put("/edit", (req,res)=>{
    const idclientes = req.body.idclientes;
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const email = req.body.email;
    const estado = req.body.estado;
    const identificador = req.body.identificador;
    const logradouro = req.body.logradouro;
    const nomeEmpresa = req.body.nomeEmpresa;
    const nomeResponsavel = req.body.nomeResponsavel;
    const numeroCasa = req.body.numeroCasa;
    const porte = req.body.porte;
    const telefone = req.body.telefone;


    let SQL = "UPDATE clientes SET cep = ?, cidade = ?,email = ?,estado = ?,identificador = ?,logradouro = ?,nomeEmpresa = ?,nomeResponsavel = ?,numeroCasa = ?,porte = ?,telefone = ? WHERE idclientes = ?";
    
    db.query(SQL,[cep,cidade, email, estado, identificador, logradouro, nomeEmpresa, nomeResponsavel, numeroCasa, porte, telefone,idclientes], (err,result) =>{
        if(err) console.log(err);
        else res.send(result);
    });

});

app.delete("/delete/:id", (req,res) =>{
    const idclientes = req.params.id;
    let SQL = "DELETE FROM clientes WHERE idclientes = ?";
    db.query(SQL, [idclientes],(err,result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})
app.listen(3001,()=>{
    console.log("rodando servidor")
});