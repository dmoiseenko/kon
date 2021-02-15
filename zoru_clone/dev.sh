#!/bin/sh

# shellcheck disable=SC2016

if ! command -v git &>/dev/null; then
    echo "Git could not be found"
    exit
fi

if ! command -v telepresence &>/dev/null; then
    echo "Telepresence could not be found"
    exit
fi

if ! command -v docker &>/dev/null; then
    echo "Docker could not be found"
    exit
fi

branch_name=$(git branch --show-current)

docker build -t zoru-clone-dev .

telepresence \
    --namespace "${branch_name}" \
    --swap-deployment zoru-clone \
    --docker-run \
    --rm \
    -it \
    -v "$(pwd)/src:/usr/src/app/src:z" \
    zoru-clone-dev npm run dev
