const { PubSub } = require('@google-cloud/pubsub');


const pubSubClient = new PubSub();
const topic = pubSubClient.topic('my-topic');
const subscription = topic.subscription('my-subscription');


const publishMessage = async (topicName, payload) => {
    const dataBuffer = Buffer.from(JSON.stringify(payload));
    console.log("payload",payload)
    try {
      const messageId = await pubSubClient
        .topic(topicName)
        .publishMessage({ data: dataBuffer });
      console.log(`Message ${messageId} published.`);
      return messageId;
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
    }
};


module.exports = publishMessage