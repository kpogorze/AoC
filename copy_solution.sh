#!/bin/sh

target_directory=./solutions/$1/$2

mkdir -p $target_directory
cp ./solution.js $target_directory/solution.js
cp ./input.txt $target_directory/input.txt