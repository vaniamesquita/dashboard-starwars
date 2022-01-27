
function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}


preencherTabelaEspecies();


//async await: so uma requisiçao - Espécies
async function preencherTabelaEspecies() {
  const response = await swapiGet("species/");
  const tableData = response.data.results;



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


