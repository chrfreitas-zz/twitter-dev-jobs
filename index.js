
const Twitter = require('twitter');

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
    'weworkremotely',
];

accounts.forEach(account => {

    const params = {
        screen_name: account,
        count: 20
    };

    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (error) {
            console.log(error);
            return;
        }

        const jobs = filterMatch(tweets, 'developer');

        const formated = jobs.map(job => {
            return {
                name: job.user.name,
                text: job.text,
                link: job.entities.urls[0].url
            }
        });

        console.log(formated);
        console.log('----------------------------------');
    });
});

// Return array with object matched
function filterMatch(array, word) {
    const regex = new RegExp(word, 'g', 'i');

    return array.filter(item => {
        return item.text.match(regex)
    });
}

// module.exports = (context, callback) => {
//
//     accounts.forEach((item) => {
//
//         const params = {
//             screen_name: item.name
//         };
//
//         twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
//             if (error) {
//                 callback('Error');
//             }
//
//             callback(tweets);
//         });
//     })
//
// }
