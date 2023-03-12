const url = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const container = document.querySelector('#pokemon');
const errorMsg = document.querySelector('.error');

let pokeName, // nome do pokemon passado no input
pokemon, // guarda os dados da api
card; // recebe o html

function requestPoke(url, name) { // funcao para acessar a api
    fetch(url + name)
    .then(response => response.json())
    .then(data => {
        pokemon = data;
    }).then(() => {
        errorMsg.style.display = 'none'; // caso a busca seja sucedida, mostra o card
        container.style.display = 'flex';
        container.innerHTML = createCard();
    })
    .catch(error => {
        errorMsg.style.display = 'block'; // caso a busca de erro, mostra mensagem de erro
        container.style.display = 'none';
        console.log(error)
    }
        )
}

function createCard() { // cria o html com a imagem e as infos do pokemon
    card = `
        <div class="pokemon-picture">
            <img src="${pokemon.sprites.front_default}" alt="Imagem do ${pokemon.name}">
        </div>
        <div class="pokemon-info">
            <h1 class="name">Nome: ${pokemon.name}</h1>
            <h2 class="number">Nº: ${pokemon.id}</h2>
            <h2 class="type">Tipo: ${pokemon.types.map(item => ' ' + item.type.name).toString()}</h3>
            <h2 class="weight">Peso: ${pokemon.weight / 10}kg</h3>
            <h2 class="height">Altura: ${pokemon.height / 10}m</h3>
        </div>
            `;
        return card;
}

searchButton.addEventListener('click', (e) => { // evento de click no botao de busca
    e.preventDefault();
    pokeName = searchInput.value.toLowerCase();
    requestPoke(url, pokeName);
})


