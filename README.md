# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

#CRUD OPERATIONS

Crud operations: 
**GET: retrieves all the items for the given URL
**POST: Client side will form a JSON object from user input data, for example: 
{
  "productName": "bacon", 
  "productDescription": "bacon to consume", 
  "color": "red",
  "price": 55,
  "imageURL": "http://images/bacon.com", 
  "isPrime": true
}

This will be inserted into the two tables: products and relatedItems 

**PATCH: Client side will form a JSON object from user input data (information requested to be updated), for example:

{ "productId": 5,
  "productName": "bacon", 
  "productDescription": "bacon to consume (vegeterian)", 
  "color": "red",
  "isPrime": false
}

*productId is retrieved when user clicks on item they would like to update

The updates will be inserted into the products table

**DELETE: Client side will form a JSON object when the user clicks on the item they would like to delete. 

Example:
 {"id": 5}

 The item will be deleted from two tables: products and similarProducts



