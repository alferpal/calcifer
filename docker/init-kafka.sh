#!/bin/sh

# Launch service
/etc/confluent/docker/run &

# Wait broker
cub kafka-ready -b localhost:9092 1 64

# Create topics
kafka-topics --bootstrap-server=localhost:9092 --create --topic=CALCIFER.INVALID_TOKENS --config "cleanup.policy=compact" --config "delete.retention.ms=100"  --config "segment.ms=100" --config "min.cleanable.dirty.ratio=0.01"

kafka-topics --bootstrap-server=localhost:9092 --create --topic=CALCIFER.SEMAPHORE --config "cleanup.policy=compact" --config "delete.retention.ms=100"  --config "segment.ms=100" --config "min.cleanable.dirty.ratio=0.01"

kafka-topics --bootstrap-server=localhost:9092 --create --topic=CALCIFER.WATERER

# Continue running in background
wait
