#!/bin/sh

# Script to automate docker-compose usage
#
# Usage:
#   chmod +x ./manage.sh
#   ./manage.sh [command] [--target]
#
# Params:
#   command: up | down
#   target: --dev | --prod
#
# Project structure should be following:
#   ├── docker
#   │   ├── ...
#   │   ├── docker-compose.dev.yml
#   │   ├── docker-compose.prod.yml
#   │   ├── .dockerignore
#   │   └── Dockerfile
#   ├── ...
#   ├── .env
#   ├── manage.sh
#
# [!]: Relative path in docker-compose is ../docker

elementIn() {
  local el match="$1"
  shift
  for el; do
    [[ "$el" == "$match" ]] && return 0;
  done; return 1
}

join_by() { 
  local d=${1-} f=${2-}
  if shift 2; then
    echo $(printf %s "$f" "${@/#/$d}")
  fi
}

check_input() {
  local commands=('up' 'down') targets=('dev' 'prod')
  if elementIn $1 ${commands[@]} && elementIn $2 ${targets[@]}; 
    then return 0
  else
    local error='Invalid parameters! Usage format:\n\t./manage.sh '
    error+="[$(join_by ' | ' ${commands[*]})] "
    error+="[--$(join_by ' | --' ${targets[*]})]"
    echo -e $error
    exit 1
  fi
}

exec_docker() {
  DOCKER_BUILDKIT=1 docker-compose \
    --project-directory $(dirname $0) \
    --file $1 \
    $2 $3
}

# main
command="$1"
target="${2:(2)}"

if check_input $command $target; then
  filename="docker/docker-compose.$target.yml"
  if [ $command == 'up' ]; then
    build='--build'
    daemon=$([[ $target == 'prod' ]] && echo '-d ')
  fi
  exec_docker $filename $command "$daemon$build"
fi
