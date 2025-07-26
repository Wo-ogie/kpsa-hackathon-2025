#!/bin/bash
docker build -t siwall0105/promise-fruit --platform linux/amd64 .
docker push siwall0105/promise-fruit:latest