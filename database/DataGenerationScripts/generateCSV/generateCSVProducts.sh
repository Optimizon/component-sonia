#!/bin/bash

node --max-old-space-size=8000 ./generateProducts1CSV.js &&
node --max-old-space-size=8000 ./generateProducts2CSV.js && 
node --max-old-space-size=8000 ./generateSimilar1CSV.js && 
node --max-old-space-size=8000 ./generateSimilar2CSV.js && 
node --max-old-space-size=8000 ./generateSimilar3CSV.js && 
node --max-old-space-size=8000 ./generateSimilar4CSV.js && 
node --max-old-space-size=8000 ./generateSimilar5CSV.js && 
node --max-old-space-size=8000 ./generateSimilar6CSV.js