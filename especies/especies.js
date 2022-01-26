//contador
const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}

preencherContadores();
preencherTabelaEspecies();

//promises: varias requisiçoes ao mesmo tempo, esperar todas para mostrar o resultado
function preencherContadores() {
  // personagensContador.innerHTML = swapiGet('people/')
  // console.log("primeiro")
  Promise.all([
    swapiGet("people/"),
    swapiGet("starships/"),
    swapiGet("planets/"),
    swapiGet("vehicles/"),
  ]).then((results) => {
    personagensContador.innerHTML = results[0].data.count;
    luasContador.innerHTML = results[1].data.count;
    planetasContador.innerHTML = results[2].data.count;
    navesContador.innerHTML = results[3].data.count;
  });
}

//async await: so uma requisiçao - Espécies
async function preencherTabelaEspecies() {
  const response = await swapiGet("species/");
  const tableData = response.data.results;

  console.log("--->", tableData);

  tableData.forEach((species) => {
    $("#especieTable").append(`<tr>
        <td>${species.name}</td>
        <td>${species.language}</td>
        <td>${species.classification}</td>
        <td>${species.designation}</td>
        <td>${species.average_height}</td>    
        <td>${species.average_lifespan}</td>   
        
        
    </tr>`);
  });
}

//especies
