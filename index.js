'use strict'

const Twitter = require('twitter');
const Promise = require('promise')

const twitter = new Twitter({
    consumer_key: 'Xk0Amm1A181XR1N0to9aJUkuY',
    consumer_secret: 'c9KMGo4C499CwhX3bPeoKrAwpGv9biETgBUZ8gDqSFtUPl9Iza',
    access_token_key: '1556332994-mTdlKEoGy4A3ZxtAmtOI2h2kSKAFVRTdkZKIRcB',
    access_token_secret: 'XClcYPLkf6UHlUdwY28Cbn5u7xkPzXJIz4uvwRxCsl5KL'
});

const accounts = [
    'Jobspresso',
    'remote_co',
    'remote_ok',
    'workingnomads',
    'weworkremotely'
];

// Return array with object matched
function filterMatch(array, word) {

    if(!word){
        return array;
    }

    const regex = new RegExp(word, 'g', 'i');
    return array.filter(item => item.text.match(regex));
}

// Format array in object for better to see
function formatObject(array) {
    return array.map(item => {
        return {
            name: item.user.name,
            text: item.text,
            link: item.entities.urls[0].url
        }
    });
}
//
// var twitterPromises = accounts.map(account => {
//
//     const params = {
//         screen_name: account,
//         count: 20
//     };
//
//     return twitter.get('statuses/user_timeline', params);
// });
//
// Promise.all(twitterPromises)
//        .then((response) => {
//
//            let formated = []
//
//             response.forEach(function(tweets) {
//                 const jobs = filterMatch(tweets, 'developer');
//                 formated.push(formatObject(jobs));
//             });
//
//             console.log(formated)
//
//         .catch((error) => {
//             console.log(error)
//         })
//
// });

module.exports = function(context, callback){

    var twitterPromises = accounts.map(account => {

        const params = {
            screen_name: account,
            count: 20
        };

        return twitter.get('statuses/user_timeline', params);
    });

    Promise.all(twitterPromises)
           .then((response) => {

               let formated = []

                response.forEach(function(tweets) {
                    const jobs = filterMatch(tweets, 'developer');
                    formated.push(formatObject(jobs));
                });

                callback(formated)

            .catch((error) => {
                callback(error)
            })

    });
}
