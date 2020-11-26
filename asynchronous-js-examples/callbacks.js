const request = require('request');

const { baseUrl } = require('./pokeapiBits');


const pokeList = [];


request(baseUrl + '/1', { json: true }, (err, res, body) => {


    pokeList.push(body.name);
    console.log(pokeList);
});
















// request(baseUrl + '/1', { json: true }, (err, res, body) => {

//     pokeList.push(body.name);
//     console.log(pokeList);

//     request(baseUrl + '/2', { json: true }, (err, res, body) => {

//         pokeList.push(body.name);
//         console.log(pokeList);

//         request(baseUrl + '/3', { json: true }, (err, res, body) => {

//             pokeList.push(body.name);
//             console.log(pokeList);

//             request(baseUrl + '/4', { json: true }, (err, res, body) => {

//                 pokeList.push(body.name);
//                 console.log(pokeList);

//                 request(baseUrl + '/5', { json: true }, (err, res, body) => {

//                     pokeList.push(body.name);
//                     console.log(pokeList);

//                     request(baseUrl + '/6', { json: true }, (err, res, body) => {

//                         pokeList.push(body.name);
//                         console.log(pokeList);

//                         request(baseUrl + '/7', { json: true }, (err, res, body) => {

//                             pokeList.push(body.name);
//                             console.log(pokeList);

//                             request(baseUrl + '/8', { json: true }, (err, res, body) => {

//                                 pokeList.push(body.name);
//                                 console.log(pokeList);

//                                 request(baseUrl + '/9', { json: true }, (err, res, body) => {

//                                     pokeList.push(body.name);
//                                     console.log(pokeList);

//                                     request(baseUrl + '/10', { json: true }, (err, res, body) => {

//                                         pokeList.push(body.name);
//                                         console.log(pokeList);

//                                     })
//                                 })
//                             })
//                         })
//                     })

//                 })

//             })

//         })

//     })

// })