const express = require('express');
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');

const port = 3000;
const app = express();

app.use(bodyParser.json());

const account = {
    '12345':{saldo: 10000},
    '67890':{saldo: 5000}
};

const transitions = [];

app.post('/api/transfer', (req, res) => {
const {fromAccount, toAccount, amount} = req.body;
if (!fromAccount || !toAccount || amount === undefined){
    return res.status(400).json({error: 'Dados incompletos'});
}

if (!account[fromAccount] || !account[toAccount]){
    return res.status(400).json({error: 'Conta origem ou conta destino inválida'});
}

if (amount <= 0){
    return res.status(400).json({error: 'Valor de transferência inválido'});
}

if (account[fromAccount].saldo < amount){
    return res.status(400).json({error: 'Saldo insuficiente na conta de origem'});
}

const transferId = uuidv4();
const newTransfer = {
    id: transferId,
    fromAccount,
    toAccount,
    amount,
    date: new Date().toISOString(),
    status: 'COMPLETED'
};

transitions.push(newTransfer);
account[fromAccount].saldo -= amount;
account[toAccount].saldo += amount;
return res.status(201).json({message: 'Transferência realizada com sucesso', transferId,
newSaldoFrom : account[fromAccount].saldo,
newSaldoTo: account[toAccount].saldo
});
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
})
