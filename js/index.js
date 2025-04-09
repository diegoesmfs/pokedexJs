let siguientePagina = null;
const urlPagina = 'https://pokeapi.co/api/v2/pokemon/';

axios.get(urlPagina)
  .then(async function (response) {
    const pokemones = response.data.results;
    siguientePagina = response.data.next;
    let output = "";

    await Promise.all(pokemones.map(async pokemon => {
      const response = await axios.get(pokemon.url);
      const pokemonData = response.data;
      const imagenPokemon = pokemonData.sprites.front_default;
      output += `
        <tr>
          <td>
            <button onclick="buscar('${pokemon.name.toString()}', 'lista')">
              <img id="fotosPokemon" src="${imagenPokemon}" width="50" height="50">
              <label> ${pokemon.name} - N.º${pokemonData.id}</label>
            </button>
          </td>
        </tr>
      `;
    }));

    document.getElementById("pokemonesInformacion").innerHTML = output;
  })
  .catch(function (error) {
    console.error(error);
  });
async function buscar(pokemonNombre, origen) {

if (origen === 'buscar') {
  const pokemonInput = document.getElementById("pokemon").value;
  urlPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}/`;
} else if(origen === 'lista') {
  document.getElementById("pokemon").value = pokemonNombre;
  const pokemonInput = pokemonNombre
  urlPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}/`;
}

axios.get(urlPokemon)
.then(response =>{

    const pokemonData = response.data;
    const pokemonImagen = pokemonData.sprites.front_default;
    const output = `
          <tr>
            <td>
                <header>
                  <h2 id = "pokemonNombre"> N.º${pokemonData.id} - ${pokemonData.name}</h2>
                </header>
               <button onclick="window.location.href='./pokemon.html?name=${pokemon.value}'">
                <img id = "pokemonImagen" src="${pokemonImagen}" width="300" height="300">
              </button>
              <br>
               <label>Tipo:</label>
                  <span id="tipoPokemonBuscado">${pokemonData.types.map(type => type.type.name).join(', ')}</span>
            </td>
          </tr>
        `;
   
    const table = document.getElementById("pokemonBuscado");
    table.innerHTML = output;
    document.getElementById("pokemon").value = "";

})
.catch(error => {
    console.error(error);
  });

}

  async function verMas() {
    if (siguientePagina) {
      axios.get(siguientePagina)
        .then(async function (response) {
          const pokemones = response.data.results;
          siguientePagina = response.data.next;
          
          const table = document.getElementById("pokemonesInformacion");
          
          for (const pokemon of pokemones) {
            const response = await axios.get(pokemon.url);
            const pokemonData = response.data;
            const imagenPokemon = pokemonData.sprites.front_default;
            
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
              <td>
                 <button onclick="buscar('${pokemon.name.toString()}', 'lista')">
                  <img id="fotosPokemon" src="${imagenPokemon}" width="50" height="50">
                   <label> ${pokemon.name} - N.º${pokemonData.id}</label>
                </button>
              </td>
            `;
            table.appendChild(newRow);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }