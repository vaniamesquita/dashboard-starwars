//contador
const personagensContador = document.getElementById("personagens");
const especiesContador = document.getElementById("especies");
const navesContador = document.getElementById("naves");
const veiculosContador = document.getElementById("veiculos");
const planetasContador = document.getElementById("planetas");

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}



//promises: varias requisiçoes ao mesmo tempo, esperar todas para mostrar o resultado
function preencherContadores() {
  // personagensContador.innerHTML = swapiGet('people/')
  // console.log("primeiro")
  Promise.all([
    swapiGet("people/"),
    swapiGet("species/"),
    swapiGet("starships/"),
    swapiGet("vehicles/"),
    swapiGet("planets/"),
  ]).then((results) => {
    personagensContador.innerHTML = results[0].data.count;
    especiesContador.innerHTML = results[1].data.count;
    navesContador.innerHTML = results[2].data.count;
    veiculosContador.innerHTML = results[3].data.count;
    planetasContador.innerHTML = results[4].data.count;
  });
}

//async await: so uma requisiçao
async function preencherTabela() {
  const response = await swapiGet("films/");
  const tableData = response.data.results;
  

  tableData.forEach((film) => {
    $("#filmsTable").append(`<tr>
        <td>${film.title}</td>
        <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
        <td>${film.director}</td>
        <td>${film.episode_id}</td>    
        <td>${film.characters.length}</td>    
        <td>${film.species.length}</td>    
        <td>${film.starships.length}</td>    
        <td>${film.vehicles.length}</td>    
    </tr>`);
  });
}


preencherContadores();
preencherTabela();