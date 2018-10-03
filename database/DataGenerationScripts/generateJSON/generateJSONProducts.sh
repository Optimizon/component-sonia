#!/bin/bash

node --max-old-space-size=8000 ./generateProductsJSON1.js &&
node --max-old-space-size=8000 ./generateProductsJSON2.js &&
node --max-old-space-size=8000 ./generateProductsJSON3.js &&
node --max-old-space-size=8000 ./generateProductsJSON4.js

