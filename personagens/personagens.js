

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}


preencherTabelaPersonagens();


//async await: so uma requisiçao - PERSONAGENS
async function preencherTabelaPersonagens() {
  const response = await swapiGet("people/");
  const tableData = response.data.results;

  tableData.forEach((people) => {
    $("#personagensTable").append(`<tr>
        <td>${people.name}</td>
        <td>${people.gender}</td>
        <td>${people.birth_year}</td>
        <td>${people.hair_color}</td>    
        <td>${people.eye_color}</td>    
        <td>${people.mass} kg</td>    
        <td>${people.height} cm</td>    
    </tr>`);
  });
}




