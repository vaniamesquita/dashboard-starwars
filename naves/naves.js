//contador
const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}

preencherContadores();
preencherTabelaNaves();

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
    console.log(results);
    personagensContador.innerHTML = results[0].data.count;
    luasContador.innerHTML = results[1].data.count;
    planetasContador.innerHTML = results[2].data.count;
    navesContador.innerHTML = results[3].data.count;
  });
}

//async await: so uma requisiçao - PERSONAGENS
async function preencherTabelaNaves() {
  const response = await swapiGet("starships/");
  const tableData = response.data.results;

  tableData.forEach((starships) => {
    $("#navesTable").append(`<tr>
        <td>${starships.name}</td>
        <td>${starships.model}</td>
        <td>${starships.cost_in_credits}</td>
        <td>${starships.crew}</td>    
         
        <td>${starships.manufacturer}</td>    
        <td>${starships.length}</td>    
        <td>${starships.starship_class}</td>    
    </tr>`);
  });
}

//naves
