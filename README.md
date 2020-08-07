# callback-to-promise

This module converts callback-style APIs and return a new version that returns promises.

## Usages

```
const fs = require('fs');
const callbackToPromise = require('callback-to-promise').default;
      or
import fs from 'fs';
import callbackToPromise from 'callback-to-promise';

const promise = callbackToPromise(fs.readFile);
const {data} = await promise("<filePath>", "<encoding>");
console.log(data) => //File content
```

### User defined function

### callback passing only one parameter

```
const callbackToPromise = require('callback-to-promise').default;

// Convert this cllback based function to promise based.
function getVal(name,  callback){
  callback(name);
}

const promise = callbackToPromise(getVal);
const {data} = await promise('username')
console.log(data); // output -> username

```

### callback passing multiple parameter

```
const callbackToPromise = require('callback-to-promise').default;

// Convert this cllback based function to promise based.
function getVal(name,  callback){
  callback(name, 'new dummy value');
}

const promise = callbackToPromise(getVal);
const {data} = await promise('username')
console.log(data); // output -> ['username', 'new dummy value']

```

### callback passing multiple parameter (first parament as null)

```
const callbackToPromise = require('callback-to-promise').default;

// Convert this cllback based function to promise based.
function getVal(name,  callback){
  callback(null, name);
}

const promise = callbackToPromise(getVal);
const {data} = await promise('username')
console.log(data); // output -> 'username'

```

