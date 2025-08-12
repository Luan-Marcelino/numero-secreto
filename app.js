let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

//função para exibir texto na tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});//Vai ler o que tiver na tag
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

mensagemInicial();

//O onClick está no HTML
function verificarChute() {
    let chute = document.querySelector('.container__input').value;
    
    if(chute == numeroSecreto) {
        let mensagemTentativa = tentativa > 1 ? `Você descobriu o número secreto com ${tentativa} tentativas.` : `Você descobriu o número secreto com ${tentativa} tentativa.`;

        exibirTextoNaTela('h1', 'Você Acertou!!');
        exibirTextoNaTela('p', mensagemTentativa);
        //Remove o disabled do button
        document.querySelector('#reiniciar').removeAttribute('disabled');

    } else {
        //Dando dica
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }

        tentativa++;
        limparCampo();
    }
    
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosNaLista = listaNumerosSorteados.length;

    //quando todos os numeros forem sorteados, vai limpar a lista
    if(quantidadeElementosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('.container__input');
    chute.value = '';
    chute.focus();
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    mensagemInicial()
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}


