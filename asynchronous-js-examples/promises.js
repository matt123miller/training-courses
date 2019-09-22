const request = require('request-promise-native');
const fs = require('fs');

const {pagingUrls, baseUrl} = require('./pokeapiBits');


let pokeList = [];


request(baseUrl + '?limit=20&offset=0', { json: true })
    .then(data => {
        pokeList.push(...data.results)
        console.log(data);
        return data;
    })
    .finally( () => {
        // resetting our data for this example
        pokeList = [];
    })


    
    // request(baseUrl + '?limit=20&offset=0', { json: true })
    //     .then(data1 => {
    //         pokeList.push(...data1.results)
    //         console.log(data1);
            
    //         // How do I get the next set of data?
            
    //         request(baseUrl + '?limit=20&offset=20', { json: true })
    //             .then(data2 => {
                    
    //                 pokeList.push(...data2.results)
    //                 console.log(data2);
                    
    //                 request(baseUrl + '?limit=20&offset=40', { json: true })
    //                     .then(data3 => {
                            
    //                         pokeList.push(...data3.results)
    //                         console.log(data3);
    //                     }).catch(e => {
    //                         // handle the error
    //                     })
    //             }).catch(e => {
    //                 // handle the error
    //             })
    // }).catch(e => {
    //     // handle the error
    // })
    // so this is great, but it looks very similar to callbacks at the moment

    // this will keep making new promises and look like the callbacak hell version
    



request(baseUrl + '?limit=20&offset=0', { json: true })
    .then(data => {
        pokeList.push(...data.results)
        console.log(data);

        data.error = true;

        return data;
    })
    .then(data => {
        if (data.error === true) {

            throw new Error('an error has happened :(')
        }
        return data
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {

        console.log(error);

    })
    .finally(() => {
        // resetting our data for this example
        pokeList = [];
    })




// // this will properly return promises to keep it all neat
// request(baseUrl + '?limit=20&offset=0', { json: true })
//     .then(data => {
        
//         console.log(data.results[0]);
//         return request(data.next, {json:true})
//     })
//     .then(data => {

//         console.log(data.results[0])

//         return request(data.next, { json: true })
//     })
//     .catch(e => {
//         // handl the error
//     })
//     .then(data => {

//         console.log(data.results[0])

//         return request(data.next, { json: true })
//     })
//     .then(data => {

//         console.log(data.results[0])

//         return request(data.next, { json: true })
//     })
//     .catch(e => {
//         // handl the error
//     })
//     .then(data => {

//         console.log(data.results[0])

//         return request(data.next, { json: true })
//     })
//     .then(data => {

//         console.log(data.results[0])

//         return request(data.next, { json: true })
//     })
//     .then(data => {

//         console.log(data.results[0])

//         return request(data.next, { json: true })
//     })
//     .then(data => {

//         console.log(data.results[0])

//         return request(data.next, { json: true })
//     })
//     .catch(e => {
//         // handle the error
//     })



















// return Promise.all(pagingUrls.map(url => request(url, { json: true })))
//     .then(res => {
//         // map flat map
//         // cool!
//         const flattened = res
//             .map(data => data.results.map(d => d))
//             .flat() // flat is amazing!
//             .map((data, i) => {
//                 data.pokemonID = i + 1;
//                 return data;
//             })

//         return flattened
//     })
//     .then(combined => {
//         const jsonString = JSON.stringify(combined);

//         // can throw, will be caught by the Promise.catch()
//         fs.writeFileSync('public/pokemonData.json', jsonString, 'utf8');

//         return `File successfully written to /public/pokemonData.json. ${combined.length} pokemon were written to that file`;
//     })
//     .catch(e => {
//         return `Failed to scrape and save the pokemon data because: ${e.message}`;
//     })
//     .finally(result => {
//         console.info(result);
//     });