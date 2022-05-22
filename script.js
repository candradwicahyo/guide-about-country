window.onload = () => {
 
 const content = document.querySelector('.content');
 const input = document.querySelector('#search-input');
 const button = document.querySelector('#search-button');
 button.addEventListener('click', async () => {
   const value = input.value.toLowerCase();
   const data = await getDataCountry(value);
 });
 
 function addData(data) {
    const capital = data.capital[0];
    const image = data.flags.svg;
    const continents = data.continents[0];
    const curr = Object.keys(data.currencies)[0];
    const currencies = data.currencies[curr].name;
    const lang = Object.keys(data.languages);
    const population = data.population;
    const region = data.region;
    const languages = lang.join(', ');
    
    return updateCard(capital,image,continents,currencies,population,region,languages);
 }
 
 function getDataCountry(value = 'indonesia') {
   return fetch(`https://restcountries.com/v3.1/name/${value}?fullText=true`)
    .then(response => response.json())
    .then(response => {
      const data = response[0];
      content.innerHTML = addData(data);
    })
    .catch(() => {
      const message = 'country not found!';
      content.innerHTML = showError(message);
    });
 }
 
 function updateCard(capital,image,continents,currencies,population,region,languages) {
   return `
   <div class="card my-3">
      <div class="card-body">
        <div class="d-flex justify-content-center align-items-center">
          <img src="${image}" alt="image" class="img-fluid rounded mb-3">
        </div>
        <ul class="list-group">
          <li class="list-group-item p-3">
            <span class="fw-bold">Capital : </span>
            <span class="fw-light">${capital}</span>
          </li>
          <li class="list-group-item p-3">
            <span class="fw-bold">Continents : </span>
            <span class="fw-light">${continents}</span>
          </li>
          <li class="list-group-item p-3">
            <span class="fw-bold">Currencies : </span>
            <span class="fw-light">${currencies}</span>
          </li>
          <li class="list-group-item p-3">
            <span class="fw-bold">Languages : </span>
            <span class="fw-light">${languages}</span>
          </li>
          <li class="list-group-item p-3">
            <span class="fw-bold">Region : </span>
            <span class="fw-light">${region}</span>
          </li>
          <li class="list-group-item p-3">
            <span class="fw-bold">Population : </span>
            <span class="fw-light">${population}</span>
          </li>
        </ul>
      </div>
    </div>
   `;
 }
 
 function showError(message) {
   return `
   <div class="card my-3">
    <div class="card-body">
      <div class="bg-danger p-3 rounded">
        <span class="text-light">${message}</span>
      </div>
    </div>
  </div>
   `;
 }
  
}