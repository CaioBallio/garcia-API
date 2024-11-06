document.addEventListener("DOMContentLoaded", () => {
    const characterContainer = document.getElementById('character-container');
    const generateButton = document.getElementById('generate-button');

    generateButton.addEventListener('click', () => {
        const randomId = Math.floor(Math.random() * 826) + 1; // ID vai de 1 a 826
        fetch(`https://rickandmortyapi.com/api/character/${randomId}`)
            .then(response => response.json())
            .then(character => {
                characterContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar um novo personagem

                const characterCard = document.createElement('div');
                characterCard.classList.add('character-card');

                characterCard.innerHTML = `
                    <img src="${character.image}" alt="${character.name}">
                    <h2>${character.name}</h2>
                    <p>Status: ${character.status}</p>
                    <p>Espécie: ${character.species}</p>
                    <p>Gênero: ${character.gender}</p>
                `;

                characterContainer.appendChild(characterCard);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    });
});