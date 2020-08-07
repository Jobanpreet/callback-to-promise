# callback-to-promise

This module converts callback-style APIs and return a new version that returns promises.

## Usages

```
const fs = require('fs');
const callbackToPromise = require('callback-to-promise');
      or
import fs from 'fs';
import callbackToPromise from 'callback-to-promise';

const promise = callbackToPromise(fs.readFile);
const data = await promise("<filePath>", "<encoding>");
console.log(data) => //File content
```

