#!/bin/sh

mode=$1
DOCKER_BUILDKIT=1

case $mode in
  --dev)
    docker-compose up -d --build
    ;;
  
  --prod)
    docker-compose -f docker-compose.prod.yml up -d --build
    ;;
  
  *)
    echo 'Unknown parameter! Only --dev and --prod options are available.'
    exit 2
    ;;
esac