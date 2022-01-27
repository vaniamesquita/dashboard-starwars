function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}


preencherTabelaNaves();


//- PERSONAGENS
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


