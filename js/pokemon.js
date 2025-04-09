const urlParams = new URLSearchParams(window.location.search);
const pokemon = urlParams.get('name');

axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  .then(response => {
    const pokemonData = response.data;
    const pokemonId = pokemonData.id;
    const pokemonSalud = pokemonData.stats[0].base_stat;
    const pokemonAtaque = pokemonData.stats[1].base_stat;
    const pokemonDefensa = pokemonData.stats[2].base_stat;
    const pokemonAtaqueEspecial = pokemonData.stats[3].base_stat;
    const pokemonDefensaEspecial = pokemonData.stats[4].base_stat;
    const pokemonVelocidad = pokemonData.stats[5].base_stat;

    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then(response => {
        const pokemonSpeciesData = response.data;
        const description = pokemonSpeciesData.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text;
        const evolutions = pokemonSpeciesData.evolutions;

        const output = `
            <div>
              <div id="pokeFoto">
                <header>
                  <h2 id = "pokemonNombre"> N.º${pokemonData.id} - ${pokemonData.name}</h2>
                </header>
                <img id = "pokeFoto" src="${pokemonData.sprites.front_default}" width="200" height="200"> 
              </div>
              <div id="infoPoke">
                <div class="poke-data">
                  <label>Tipo:</label>
                  <span>${pokemonData.types.map(type => type.type.name).join(', ')}</span>
                  <br>
                  <label>Habilidades:</label>
                  <span> ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</span>
                  <br>
                  <label>Descripcion:</label>
                  <span> ${description}</span>
                  <br>
                  <label>Peso:</label>
                  <span>${pokemonData.weight} kg</span>
                  <br>
                  <label>Altura: </label>
                  <span>${pokemonData.height} m</span>
                  <br>
                  <label>HP:</label>
                  <span>${pokemonSalud}</span>
                  <br>
                  <label>Ataque:</label>
                  <span>${pokemonAtaque}</span>
                  <br>
                  <label>Defensa:</label>
                  <span>${pokemonDefensa}</span>
                  <br>
                  <label>Ataque Especial:</label>
                  <span>${pokemonAtaqueEspecial}</span>
                  <br>
                  <label>Defensa Especial:</label>
                  <span>${pokemonDefensaEspecial}</span>
                  <br>
                  <label>Velocidad:</label>
                  <span>${pokemonVelocidad}</span>
                </div>
              
              </div>
            </div>
         `;

        document.getElementById("pokemon-info").innerHTML = output;
      })
      .catch(error => {
        console.error(error);
      });

  })
  .catch(error => {
    console.error(error);
  });