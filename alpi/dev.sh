#!/bin/sh

# shellcheck disable=SC2016

if ! command -v git &> /dev/null
then
    echo "Git could not be found"
    exit
fi

if ! command -v telepresence &> /dev/null
then
    echo "Telepresence could not be found"
    exit
fi

if ! command -v docker &> /dev/null
then
    echo "Docker could not be found"
    exit
fi

branch_name=$(git branch --show-current)

telepresence \
    --namespace "${branch_name}" \
    --swap-deployment alpi \
    --docker-run \
    --rm \
    -it \
    -v "$(pwd)/pages:/base/pages/:z" \
    -v "$(pwd)/lib:/base/lib/:z" \
    -v "$(pwd)/components:/base/components/:z" \
    nextdev sh -c 'source $TELEPRESENCE_ROOT/vault/secrets/auth0-secret && source $TELEPRESENCE_ROOT/vault/secrets/auth0-client-id && source $TELEPRESENCE_ROOT/vault/secrets/auth0-client-secret && npm run dev'
