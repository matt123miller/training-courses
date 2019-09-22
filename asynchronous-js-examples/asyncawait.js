const request = require('request-promise-native');
const fs = require('fs');

const { pagingUrls, baseUrl } = require('./pokeapiBits');


let pokeList = [];


async function asyncAwaitExampleOne() {

        const limit = 20;

        const group1 = await request(baseUrl + '?limit=' + limit + '&offset=0', { json: true })

        console.log(group1);
}

asyncAwaitExampleOne();


// second, longer example

// async function asyncAwaitExampleTwo() {

//     try {

//         const limit = 20;

//         const group1 = await request(baseUrl + '?limit=' + limit + '&offset=0', { json: true })

//         const group2 = await request(group1.next, { json: true })

//         const group3 = await request(group2.next, { json: true })

//         if(group3.results.length < limit){

//             throw new Error('errors in async/await');
//         }

//         const group4 = await request(group3.next, { json: true })

//         const group5 = await request(group4.next, { json: true })

//         pokeList = [ group1, group2, group3, group4, group5 ].map(group => {
//             return group.results;
//         })
//         // this flattens the 2d array into a longer array
//         pokeList = [].concat(...pokeList);


//     }
//     catch (error) {
//         console.log(error);
//     }

//     //this is my finally code

//     // it is the equivalentt of putting code in a Promise.finally() because it runs after the try ... catch

//     console.log(pokeList);

//     return pokeList;
// }

// // you have to call the function for it to run.
// const resultOfAsync = asyncAwaitExampleTwo().then(result => {

//     console.log(result);
// });

