document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.category');
    const items = document.querySelectorAll('.item');
    const showAllButton = document.getElementById('showAll');
    const catalogSection = document.getElementById('catalogo');

    function filterItems(category) {
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function resetActiveState() {
        categories.forEach(cat => {
            cat.classList.remove('active');
        });
    }

    function scrollToCatalog() {
        catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }

    categories.forEach(category => {
        category.addEventListener('click', function() {
            resetActiveState();
            this.classList.add('active');
            
            const selectedCategory = this.dataset.category || 'all';
            filterItems(selectedCategory);
            
            setTimeout(scrollToCatalog, 100);
        });
    });
    showAllButton.addEventListener('click', function() {
        resetActiveState();
        this.classList.add('active');
        filterItems('all');
        setTimeout(scrollToCatalog, 100);
    });
    filterItems('all');
    initializeCart();
});


/*carrinho */
function initializeCart(){
let carrinho = [];

        function adicionarProduto(produto) {
            const itemExistente = carrinho.find(item => item.nome === produto.nome);
            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push({...produto, quantidade:1});
            }
            atualizarCarrinho();
        }
        document.getElementById('fechar-carrinho').addEventListener('click', () => {
            document.getElementById('carrinho-modal').style.display = 'none';
        });
        function removerProduto(index) {
            if (carrinho[index].quantidade > 1) {
                carrinho[index].quantidade -= 1;
            } else {
                carrinho.splice(index, 1);
            }
            atualizarCarrinho();
        }
        

        function atualizarCarrinho() {
            const listaProdutos = document.getElementById('lista-produtos');
            listaProdutos.innerHTML = '';

            let total = 0;
            carrinho.forEach((produto, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${produto.nome}</span>
            <span>Quantidade: ${produto.quantidade}</span>
            <span>R$ ${(produto.preco * produto.quantidade).toFixed(2)}</span>
            <button class="remover-item" data-index="${index}">Remover</button>
                `;
                listaProdutos.appendChild(li);

                total += produto.preco * produto.quantidade;
            });

            

            document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
            document.getElementById('qtd-produtos').textContent = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
        }

        document.getElementById('lista-produtos').addEventListener('click', (e) => {
            if (e.target.classList.contains('remover-item')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                removerProduto(index);
            }
        });

    
            const modal = document.getElementById('carrinho-modal');
            modal.style.display = 'none';

        document.getElementById('carrinho-btn').addEventListener('click', () => {
            const modal = document.getElementById('carrinho-modal');
            modal.style.display = 'flex';
        });

        document.getElementById('carrinho-modal').addEventListener('click', (event) => {
            if (event.target === document.getElementById('carrinho-modal')) {
                document.getElementById('carrinho-modal').style.display = 'none';
            }
        });
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const produto = {
                    nome: button.getAttribute('data-name'),
                    preco: parseFloat(button.getAttribute('data-price')),
                };
                adicionarProduto(produto);
            });
        });

        document.getElementById('finalizar-compra').addEventListener('click', () => {
            alert('Compra finalizada! Total: R$ ' + document.getElementById('total').textContent.split('R$ ')[1]);
            carrinho = [];
            atualizarCarrinho();
            document.getElementById('carrinho-modal').style.display = 'none';
        });
       
    }
   