// ====================== VARIÁVEIS E CONSTANTES INICIAIS ======================

const popup = document.querySelector('.popup');
const msgPopup = document.querySelector('.msg-popup');
const botaoFechar = document.querySelector('.fechar');
const botaoOkPopup = document.querySelector('.ok-popup');

const botaoSortear = document.querySelector('.botao-sorteio');
const textoDesconto = document.querySelector('.numero-desconto')
const informacao = document.querySelector('.informacao');
const instrucoes = document.querySelector('.container-instrucoes');
const botaoDica = document.querySelector('.letra-dicas');
const teclado = document.querySelector('.teclado');
const listaTeclado = document.querySelectorAll('.letra');
const palavraSorteada = document.querySelector('.palavra-secreta');
const listaDicas = document.querySelectorAll('.texto-dica');

var listaDePalavras = ['CAMISETA', 'CALCA', 'BONE', 'CACHECOL', 'RELOGIO', 'MEIA', 'CARTEIRA'];

// objeto contendo as palavras e as respectivas dicas.
let dicas = {
    "CAMISETA": [
      "Pode ser básica.",
      "Pode ser estampada.",
      "Vai do PP ao XG."
    ],
    "CALCA": [
        "Pode ser larga ou mais apertada.",
        "Aperta com cinto.",
        "Pode ser jeans.",
    ],
    "BONE": [
      "Se usa na cabeça.",
      "Protege do sol.",
      "Possui aba.",
    ],
    "CACHECOL": [
        "Se usa no pescoço.",
        "Usa no frio.",
        "Deixa o look elegante.",
    ],
    "RELOGIO": [
        "Usa no pulso.",
        "Não deixa você se atrasar.",
        "Ajuda em atividades físicas.",
    ],
    "MEIA": [
        "Pode ser usada com tênis ou sapado.",
        "Possui todas as cores.",
        "Pode ser social ou esportiva.",
    ],
    "CARTEIRA": [
        "Pode ser de couro.",
        "Coloca dinheiro dentro.",
        "Pode colocar na bolsa ou na calça.",
    ],
};
  
//contadores
var desconto = 50;
var palavraEscolhida = "";
var ganhou = false;
var charArray = [];

// ====================== EVENTOS ======================

// evento disparado ao clicar no botão "Sortear Palavra"
botaoSortear.addEventListener('click', function () {
    ganhou = false;
    reiniciaJogo();

});


// evento disparado ao clicar em algum botão do teclado
teclado.addEventListener('click', function (e) {
    // verificar se palavra já foi escolhida
    if (palavraEscolhida != '') {
        // verifica se o jogo já acabou
        if (ganhou == false) {
            // verifica se não há mais desconto a ganhar
            if (desconto == 0) {
                alertaPopup('Você perdeu :/!')
            
            // verifica se o elemento selecionado foi uma letra
            } else if (e.target.innerText != 'Solicitar dica' && e.target.innerText.length == 1) {
                verificaLetra(e);
            };
        } else {
            alertaPopup('Você ganhou ' + desconto + '% de desconto! Parabéns! Sorteie outra palavra para jogar novamente!');
        };
    } else {
        alertaPopup('Sorteie uma palavra para jogar!')
    };
});


// evento disparado ao clicar no botão "ok" do popup. Como resultado, o pop desaparece da tela
botaoOkPopup.addEventListener('click', function () {
    popup.classList.add('hide-popup')
});


// evento disparado ao clicar no botão "x" do popup. Como resultado, o pop desaparece da tela
botaoFechar.addEventListener('click', function () {
    popup.classList.add('hide-popup')
});


// evento disparado ao passar o mouse por cima do botão de instruções. Como resultado, mostra a lista de instruções e coloca o fundo vermelho do botão "instrucoes" 
hover(informacao, function () {
    instrucoes.classList.add('class-hover');
    informacao.classList.add('fundo-vermelho');
}, function () {
    instrucoes.classList.remove('class-hover');
    informacao.classList.remove('fundo-vermelho');
});


// evento disparado ao clicar no botão "Quero uma dica". Como resultado, a dica referente à palavra escolhida aparece no 1o campo vazio da área de dicas
botaoDica.addEventListener('click', function () {
    // verificar se palavra já foi escolhida
    if (palavraEscolhida != '') {
        // verifica se o jogo já acabou
        if (ganhou == false) {
            // verifica se não há mais desconto a ganhar
            if (desconto == 0) {
                alertaPopup('Você perdeu :/!')
            } else {
                verificaDica();
            }
        } else {
            alertaPopup('Você ganhou ' + desconto + '% de desconto! Parabéns! Sorteie outra palavra para jogar novamente!');
        }

    } else {
        alertaPopup('Sorteie uma palavra para jogar!')
    }
    
});


// ====================== FUNÇÕES ======================

// função responsável por gerar uma nova palavra
function geraPalavra() {
      
    // limpa o espaço onde a palavra será inserida
    palavraSorteada.innerText = "";
    
    // escolhe a palavra
    palavraEscolhida = listaDePalavras[Math.floor(Math.random() * listaDePalavras.length)];
    // coloca todas as letras em caixa alta
    palavraEscolhida = palavraEscolhida.toUpperCase();
  
    // transforma cada letra da palavra na estrutura de tag "span" e valor "_"
    let displayItem = palavraEscolhida.replace(/./g, '<span class="dashes">_</span>');
  
    // Armazena no estpaço destinado a palavra a estrutura de tags "span" e os respectivos valores "_"
    palavraSorteada.innerHTML = displayItem;
    
};


// função responsável por apresentar a dica.
function verificaDica () {
    // variável de apoio para que não sejam preenchidas todas as dicas de uma vez só
    var dicaOk = false;
    // percorre os campos destinados às dicas. A dica é inserida caso esteja vazia
    listaDicas.forEach(function (elemento, index) {
        if (elemento.innerHTML == '' && dicaOk == false) {
            // atribui ao campo vazio a respectiva dica
            elemento.innerHTML = `${dicas[palavraEscolhida][index]}`;
            // chama a função para reduzir o valor do desconto
            reduzDesconto(10);
            dicaOk = true;
        };
    });
    // condição responsável por verificar se o usuário já excedeu o nro de dicas
    if (dicaOk == false) {
        alertaPopup('Você já excedeu o número de dicas!')
    };
};


// função responsável por verificar se a letra está correta
function verificaLetra(e) {
    // armazena a qtd de letras da palavra sorteada
    const listaLetras = document.querySelectorAll('.dashes');
    // desabilita o teclado selecionado
    e.target.disabled = true;
    letraCerta = false;
    // armazena as letras da palavra em um vetor
    charArray = palavraEscolhida.split("");
    // percorre todas as letras da palavra sorteada
    charArray.forEach(function (elemento, index) {
        // verifica se alguma letra da palavra sorteada condiz com a letras selecionada
        if (e.target.innerText == elemento.toUpperCase()) {
            // preenche a palavra sorteada com a letra selecionada
            listaLetras[index].innerHTML = e.target.innerText;
            letraCerta = true
        };
    });
    
    // verifica se a letra selecionada está correta
    if (letraCerta == false) {
        e.target.classList.add('letra-errada');
        reduzDesconto(10);
    } else {
        e.target.classList.add('letra-certa');
    };

    ganhou = true;
    
    // iteração para verificar se a palavra já foi descoberta. Se um dos espaços destinado às letras da palavra contiver o caractere "_", significa que o jogo ainda não acabou
    listaLetras.forEach(function (e) {
        if (e.innerText == "_") {
            ganhou = false;
        }
    });

    if (ganhou == true) {
        alertaPopup('Você ganhou ' + desconto + '% de desconto! Parabéns! Sorteie outra palavra para jogar novamente!');
    };
};


// função responsável por atualizar o valor do desconto de acordo com o parâmetro "valorDesconto"
function reduzDesconto(valorDesconto) {
    // verificar se o valor do desconto após a redução é maior ou igual a zero
    if ((desconto - valorDesconto) >= 0) {
        // atualiza o valor do desconto
        desconto = desconto - valorDesconto;
        // armazena o novo valor do desconto no espaço a ele no html
        textoDesconto.innerHTML = `<p class="valor-desconto">${desconto}%</p>`;
    };

    // se, após aplicar a redução, o desconto for igual a zero, o usuário perdeu o jogo
    if (desconto == 0) {
        alertaPopup('Você perdeu :/!')
        // reiniciaJogo();
    };
};


// função responsável por preparar o ambiente para que o jogo possa ser reiniciado
function reiniciaJogo () {
    desconto = 50;
    textoDesconto.innerHTML = '50%'

    // limpa os campos das dicas
    listaDicas.forEach(function (elemento, index) {
        elemento.innerHTML = '';
    });
    
    // limpa o teclado
    listaTeclado.forEach( function (elemento) {
        elemento.classList.remove('letra-errada');
        elemento.classList.remove('letra-certa');
        elemento.disabled = false;
    });

    // chama a função para gerar uma nova palavra
    geraPalavra();

};


// função responsável por mostrar as instruções ao passar o mouse ('mouseenter') no botão de "dúvida"
function hover(elemento, enter, leave) {
    elemento.addEventListener('mouseenter', enter)
    elemento.addEventListener('mouseleave', leave)
};


//função responsável por mostrar o popup na tela
function alertaPopup(msg) {
    popup.classList.remove('hide-popup')
    msgPopup.innerHTML = `<p class="texto-popup"> ${msg}</p>`;
};