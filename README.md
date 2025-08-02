# NestJs Mail Broker


## Concept

Build a broker-type system that consists of a microservice for sending emails to a queue service and another microservice that listens to a message pattern and sends it itself via SMTP so that it can be scaled and the message is not lost if the sending fails.


## Layers

- [RabbitMQ](https://www.rabbitmq.com/)
- [Apache Kafka](https://kafka.apache.org/)
- [Maildev](https://maildev.github.io/maildev/)
- [Broker Emiter Rest API](broker-emiter/README.md)
- [Broker Consumer](broker-consumer/README.md)

## Parameters to use RabbitMQ
```bash
   BROKER_ENGINE: rabbit
   BROKER_SERVER: localhost
   BROKER_PORT: 5672
```

## Parameters to use Apache Kafka
```bash
   BROKER_ENGINE: kafka
   BROKER_SERVER: localhost
   BROKER_PORT: 9093
```


## Build & Publish

```bash
    > git clone https://github.com/avmesquita/nestjs-mail-broker.git
    > cd nestjs-mail-broker    
    > docker-compose build --no-cache --pull
    > docker-compose -d up --force-recreate
```


## Development Documentation

- [Broker Emiter Rest API](broker-emiter/documentation/index.html)

- [Broker Consumer](broker-consumer/documentation/index.html)


## Resources

![Broker Emitter](assets/broker-emiter.png)

![Broker Consumer](assets/broker-consumer-console-log.png)

![RabbitMQ Queues](assets/rabbitmq-queues.png)

![Maildev Inbox](assets/maildev-delivered.png)

<!-- GitAds-Verify: RRZT9B25SJVXZ7XE99Q73DDI551VOMOQ -->
## GitAds Sponsored
[![Sponsored by GitAds](https://gitads.dev/v1/ad-serve?source=avm-sistemas/nestjs-mail-broker@github)](https://gitads.dev/v1/ad-track?source=avm-sistemas/nestjs-mail-broker@github)


