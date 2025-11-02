document.addEventListener('DOMContentLoaded', () => {
    const dadosExtrato = {
        saldo: 15000,
        transferencias: [
            {tipo: 'Venda', descricao: 'Venda - Fone Bluetooth Te', valor: 280.00},
            {tipo: 'Venda', descricao: 'Venda - Notebook Gamer', valor: 10000.00},
            {tipo: 'pix', descricao: 'Pagamento Fornecedor', valor: -2000.00},
            {tipo: 'cashback', descricao: 'Cashback - Compra Supermercado', valor: 100.00},
            {tipo: 'compra', descricao: 'Compra - Supermercado XYZ', valor: -150.00},
            {tipo: 'taxas', descricao: 'Taxa de Manutenção Mensal', valor: -20.99},
            {tipo: 'venda', descricao: 'Venda - Mouse sem fio', valor: 210.00},
            {tipo: 'pix', descricao: 'Pagamento Cliente', valor: 369.00},
            {tipo: 'reembolso', descricao: 'Reembolso - Produto devolvido', valor: -258.74},
            {tipo: 'serviço', descricao: 'Assinatura TechMarket', valor: -49.90}
        ]
    };


    const saldoElement = document.getElementById('saldo-conta');
    const listaTransferenciasElement = document.getElementById('lista-transferencias');

    saldoElement.textContent = `Saldo: R$ ${dadosExtrato.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'
    })}`;

    dadosExtrato.transferencias.forEach(transacao=>{
        const itemLista = document.createElement('li');
        itemLista.classList.add('transacao');

        if(Math.abs(transacao.valor) >= 5000){
            itemLista.classList.add('destaque');
        }

        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(transacao.valor);

        itemLista.innerHTML = `
        <div class="transacao-info">
        <span> ${transacao.descricao}</span>
        <small> ${transacao.valor}</small>
        <span class="transacao-valor ${transacao.valor > 0 ? 'negativo' : '' }"> ${valorFormatado}</span>
        </div>
        `;
        listaTransferenciasElement.appendChild(itemLista);
    })
})