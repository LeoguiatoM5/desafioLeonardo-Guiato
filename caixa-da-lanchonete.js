

 class CaixaDaLanchonete {
    cardapio = [
        { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
        { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
        { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
        { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
        { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
        { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    ];

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!['debito', 'credito', 'dinheiro'].includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        let mainItems = new Set();
        let extraItems = new Set();
        const extraToMainMap = {
            'chantily': 'cafe',
            'queijo': 'sanduiche',
                
        };

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');

            const parsedQuantidade = parseInt(quantidade);
            if (isNaN(parsedQuantidade) || parsedQuantidade <= 0) {
                return 'Quantidade inválida!';
            }

            const menuItem = this.cardapio.find(item => item.codigo === codigo);
            if (!menuItem) {
                return 'Item inválido!';
            }

            if (!menuItem.descricao.includes('extra')) {
                mainItems.add(codigo);
            } else {
                extraItems.add(codigo);
            }

            total += menuItem.valor * parsedQuantidade;
        }

        for (const extraItem of extraItems) {
            const mainItemCode = extraToMainMap[extraItem];
            if (!mainItemCode || !mainItems.has(mainItemCode)) {
                return 'Item extra não pode ser pedido sem o principal';
            }
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95; //  5% 
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03; // 3%
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

console.log(new CaixaDaLanchonete().calcularValorDaCompra('debito', ['chantily,1']));
console.log(new CaixaDaLanchonete().calcularValorDaCompra('debito', ['cafe,1','chantily,1']));
console.log(new CaixaDaLanchonete().calcularValorDaCompra('credito', ['combo1,1', 'cafe,2']));

export { CaixaDaLanchonete };
