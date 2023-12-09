#!/bin/sh

target_directory=./solutions/$1/$2

mkdir -p $target_directory
cp ./index.js $target_directory/$2.js
cp ./input.txt $target_directory/input.txt