#!/bin/bash

echo "packaging application"

tar --exclude=.git \
    --exclude=.github \
    --exclude=.DS_Store \
    --exclude=.circleci \
    --exclude=.postman \
    --exclude=.vscode \
    --exclude=node_modules \
    --exclude=package \
    --exclude=test \
    --exclude=.dockerignore \
    --exclude=.gitignore \
    --exclude=Dockerfile \
    --exclude=Makefile \
    -zcvf electionguard-ballot-box.tar.gz electionguard-ballot-box.service ../

echo "packaging complete"
