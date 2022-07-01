const fetch = require('node-fetch');
const endpoint = "https://api.covid19api.com/summary"

// callback que pega os casos ativos
const serialize = ({ Country, TotalConfirmed, TotalRecovered }) => {
    return {
        Country, 
        activeCases: TotalConfirmed - TotalRecovered
    }
}

// callback que ordena o objeto a partir da chave activeCases
const order = (a, b) => {
    if (a.activeCases < b.activeCases) {
        return 1;
      }
      if (a.activeCases > b.activeCases) {
        return -1;
      }
      return 0;
}

module.exports = async () => {
    const res = await fetch(endpoint);
    const { Countries } = await res.json();
    
    if (!Countries) {
        return { message: "Internal Error" }
    }

    // retorna apenas os 10 primeiros elementos
    return Countries.map(serialize).sort(order).slice(0, 10);
}