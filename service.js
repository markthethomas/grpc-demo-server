const grpc = require('grpc');
const TwitterAPI = require('twitter');

const protoPath = '../protos/twitter/tweet-svc.proto';
const { twitter: proto } = grpc.load(protoPath);

var twitterClient = new TwitterAPI({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: 'U'
});

function getTweet(call, callback) {
    twitterClient.get(
        'statuses/show',
        { id: call.request.id },
        (err, tweet, response) => {
            const { id, created_at, text, user } = tweet;
            const { id: userId, name, screen_name } = user;
            callback(err, {
                id,
                created_at,
                text,
                user: {
                    id: userId,
                    name,
                    screen_name
                }
            });
        }
    );
}
function main() {
    const server = new grpc.Server();
    server.addService(proto.Tweets.service, { getTweet });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();
