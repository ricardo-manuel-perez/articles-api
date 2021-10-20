const producer = require("../kafka/kafkaProducer");

const sendMessage = async (topic, message) => {
  try {
    await (await producer.connect()).send(topic, message);
  } catch (error) {
    console.log(error);
  }
};

module.exports.kafkaSendMessage = sendMessage;
