//contador
const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}

preencherContadores();
preencherTabela();

//grafico
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(desenharGrafico);

async function desenharGrafico() {
  const response = await swapiGet("vehicles/");

  const veiculosArray = response.data.results;
  console.log(veiculosArray);

  const dataArray = [];
  dataArray.push(["Veículos", "Passageiros"]);
  veiculosArray.forEach((veiculo) => {
    dataArray.push([veiculo.name, Number(veiculo.passengers)]);
  });

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Passageiros por Veiculos",
    pieHole: 0.4,
    legend: 'none'
    
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("donutchart")
  );
  chart.draw(data, options);
}



//promises: varias requisiçoes ao mesmo tempo, esperar todas para mostrar o resultado
function preencherContadores() {
  // personagensContador.innerHTML = swapiGet('people/')
  // console.log("primeiro")
  Promise.all([
    swapiGet("people/"),
    swapiGet("starships"),
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
    </tr>`);
  });
}
