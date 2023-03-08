const express = require('express');
const bodyParser = require('body-parser');
/**
 * ALTERE O ACESSO PARA AS CREDENCIAIS DO SEU BANCO LOCAL!!!!
 * ./database.js
 */
const sequelize = require('./database')

const app = express();
/**conf. padrão json */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usuariosRouter = require('./usuariosRouter');

app.use('/usuarios',usuariosRouter);


// Iniciar o servidor na porta 8000
app.listen(8000, () => {

  //https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
  /**
   * {alter: true} - faz apenas alterações: criando tabelas e colunasS
   * {force: true} - faz drop e todas as esrtutura e recria
   */
  sequelize.sync({alter: true})
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar modelo com o banco de dados:', error);
  });
});
