
const Twitter = require('twitter');

const twitter = new Twitter({
    consumer_key: 'Xk0Amm1A181XR1N0to9aJUkuY',
    consumer_secret: 'c9KMGo4C499CwhX3bPeoKrAwpGv9biETgBUZ8gDqSFtUPl9Iza',
    access_token_key: '1556332994-mTdlKEoGy4A3ZxtAmtOI2h2kSKAFVRTdkZKIRcB',
    access_token_secret: 'XClcYPLkf6UHlUdwY28Cbn5u7xkPzXJIz4uvwRxCsl5KL'
});

const accounts = [
    {
        name: 'Jobspresso',
        lastPostId: 0
    },
    {
        name: 'remote_co',
        lastPostId: 0
    },
    {
        name: 'remote_ok',
        lastPostId: 0
    },
    {
        name: 'workingnomads',
        lastPostId: 0
    },
    {
        name: 'weworkremotely',
        lastPostId: 0
    }
];

accounts.forEach((account) => {

    const params = {
        screen_name: account.name,
        since_id: account.lastPostId || undefined
    };

    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (error) {
            console.log(error);
            return;
        }

        var jobs = tweets.filter((tweet) => {            
            return tweet.text.match(/Javascript/)
        })

        var obj = {
            name: tweets[0].user.name,
            link: tweets[0].entities.urls[0].url
        }

        console.log(jobs);
        console.log('----------------------------------');
    });
})

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
