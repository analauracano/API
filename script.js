document.addEventListener('DOMContentLoaded', () => {

    // --------- Extrato bancário ---------
    const dadosExtrato = {
        saldo: 15000,
        transferencias: [
            {tipo: 'venda', descricao: 'Venda - Fone Bluetooth Te', valor: 280.00},
            {tipo: 'venda', descricao: 'Venda - Notebook Gamer', valor: 10000.00},
            {tipo: 'pix', descricao: 'Pagamento Fornecedor', valor: -2000.00},
            {tipo: 'cashback', descricao: 'Cashback - Compra Supermercado', valor: 100.00},
            {tipo: 'compra', descricao: 'Compra - Supermercado XYZ', valor: -150.00},
            {tipo: 'taxas', descricao: 'Taxa de Manutenção Mensal', valor: -20.99},
            {tipo: 'venda', descricao: 'Venda - Mouse sem fio', valor: 210.00},
            {tipo: 'pix', descricao: 'Pagamento Cliente', valor: 369.00},
            {tipo: 'reembolso', descricao: 'Reembolso - Produto devolvido', valor: -258.74},
            {tipo: 'servico', descricao: 'Assinatura TechMarket', valor: -49.90}
        ]
    };

    const saldoElement = document.getElementById('saldo-conta');
    const listaTransferenciasElement = document.getElementById('lista-transferencias');

    saldoElement.textContent = `Saldo: R$ ${dadosExtrato.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

    const fragment = document.createDocumentFragment();

    dadosExtrato.transferencias.forEach(transacao => {
        const itemLista = document.createElement('li');
        itemLista.classList.add('transacao');

        if(Math.abs(transacao.valor) >= 5000){
            itemLista.classList.add('destaque');
        }

        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(transacao.valor);

        const classeValor = transacao.valor < 0 ? 'negativo' : 'positivo';

        itemLista.innerHTML = `
            <div class="transacao-info">
                <span class="descricao">${transacao.descricao}</span>
                <span class="transacao-valor ${classeValor}">${valorFormatado}</span>
            </div>
        `;

        fragment.appendChild(itemLista);
    });

    listaTransferenciasElement.appendChild(fragment);

    // --------- Formatação de CPF e Telefone ---------
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');

    cpfInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g,'');
        if(v.length > 11) v = v.slice(0,11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = v;
    });

    telefoneInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g,'');
        if(v.length > 11) v = v.slice(0,11);
        if(v.length > 10){
            v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if(v.length > 5){
            v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if(v.length > 2){
            v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
        e.target.value = v;
    });

    // --------- Validação de formulário ---------
    const form = document.getElementById('form-conta');
    const errosDiv = document.getElementById('erros');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        errosDiv.innerHTML = '';
        const erros = [];

        const cpf = cpfInput.value.replace(/\D/g,'');
        if(cpf.length !== 11) erros.push('CPF deve conter 11 dígitos.');

        const dataNascimento = document.getElementById('data-nascimento').value;
        const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if(!regexData.test(dataNascimento)){
            erros.push('Data de nascimento deve estar no formato dd/mm/aaaa.');
        } else {
            const [dia, mes, ano] = dataNascimento.split('/').map(n => parseInt(n,10));
            const nascimento = new Date(ano, mes-1, dia);
            const hoje = new Date();
            let idade = hoje.getFullYear() - nascimento.getFullYear();
            if(hoje.getMonth() < nascimento.getMonth() || (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())){
                idade--;
            }
            if(idade < 18) erros.push('Você deve ter pelo menos 18 anos.');
        }

        const telefone = telefoneInput.value.replace(/\D/g,'');
        if(telefone.length < 10 || telefone.length > 11) erros.push('Telefone deve conter 10 ou 11 números.');

        if(erros.length > 0){
            errosDiv.innerHTML = erros.map(err => `<div style="color:red;">${err}</div>`).join('');
        } else {
            errosDiv.innerHTML = '<div style="color:green;">Formulário enviado com sucesso!</div>';
        }
    });

});
