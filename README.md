# Onfleet API for Node.js

## Installation

```
npm install https://github.com/CityPantry/onfleet.js/tarball/v1.0.2
```

## Example usage

```javascript
var onfleet = require('onfleet').getClient('<your api key>');

onfleet.getWorkers
    .then(workers => {
        console.log(workers.length);
    })
    .catch(console.log);
```

## Onfleet API docs

http://docs.onfleet.com/v2.0/docs/introduction
