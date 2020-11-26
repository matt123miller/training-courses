
const pokeapiBase = 'https://pokeapi.co/api/v2/';
const pokemonEndpoint = 'pokemon-species';

const baseUrl = pokeapiBase + pokemonEndpoint;

const pagingUrls = [...Array(40).keys()].map(i => `${baseUrl}?limit=20&offset=${(i * 20)}`);



module.exports = {
    baseUrl,
    pagingUrls,
    pokeapiBase,
    pokemonEndpoint
}