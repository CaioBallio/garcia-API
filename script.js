document.addEventListener("DOMContentLoaded", () => {
    const containerPersonagem = document.getElementById('character-container');
    const botaoGerar = document.getElementById('generate-button');

    botaoGerar.addEventListener('click', buscarPersonagemAleatorio);

    function buscarPersonagemAleatorio() {
        const idAleatorio = Math.floor(Math.random() * 826) + 1; // ID vai de 1 a 826
        fetch(`https://rickandmortyapi.com/api/character/${idAleatorio}`)
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error('Resposta da rede não foi ok');
                }
                return resposta.json();
            })
            .then(personagem => {
                exibirPersonagem(personagem);
            })
            .catch(erro => {
                console.error('Erro ao buscar dados:', erro);
            });
    }

    function exibirPersonagem(personagem) {
        containerPersonagem.innerHTML = ''; // Limpa o contêiner antes de adicionar um novo personagem

        const cardPersonagem = criarCardPersonagem(personagem);
        containerPersonagem.appendChild(cardPersonagem);
    }

    function criarCardPersonagem(personagem) {
        const cardPersonagem = document.createElement('div');
        cardPersonagem.classList.add('character-card');

        const img = document.createElement('img');
        img.src = personagem.image;
        img.alt = personagem.name;

        const nomeElemento = document.createElement('h2');
        nomeElemento.id = "character-name";
        nomeElemento.textContent = personagem.name;

        const status = document.createElement('p');
        status.textContent = `Status: ${personagem.status}`;

        const especie = document.createElement('p');
        especie.textContent = `Espécie: ${personagem.species}`;

        const genero = document.createElement('p');
        genero.textContent = `Gênero: ${personagem.gender}`;

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('edit-button');
        botaoEditar.textContent = "Editar Nome";
        botaoEditar.addEventListener("click", () => editarNomePersonagem(cardPersonagem, nomeElemento));

        cardPersonagem.append(img, nomeElemento, status, especie, genero, botaoEditar);
        return cardPersonagem;
    }

    function editarNomePersonagem(cardPersonagem, nomeElemento) {
        const inputNome = document.createElement("input");
        inputNome.type = "text";
        inputNome.value = nomeElemento.textContent;
        nomeElemento.replaceWith(inputNome);

        const botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar";
        cardPersonagem.appendChild(botaoSalvar);

        botaoSalvar.addEventListener("click", () => {
            const novoNome = inputNome.value.trim();
            if (novoNome) { // Validação simples
                inputNome.replaceWith(nomeElemento);
                nomeElemento.textContent = novoNome;
            }
            botaoSalvar.remove();
        });
    }
});