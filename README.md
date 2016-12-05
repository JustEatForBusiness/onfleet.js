# Onfleet API for Node.js

## Getting Started

```
npm install https://github.com/CityPantry/onfleet.js/tarball/v3.0.0
```
```javascript
var Onfleet = require('onfleet');
var onfleet = new Onfleet('<your api key>', 'https://onfleet.com/api/v2')
```

## Documentation

### Workers
Get worker by id:
```javascript
onfleet.workers.get('<worker id>')
    .then(worker => {...})
    .catch(...);
```

Get all workers:
```javascript
onfleet.workers.all()
    .then(workers => {...})
    .catch(...);
```

### Tasks
Get task by id:
```javascript
onfleet.tasks.get('<task id>')
    .then(task => {...})
    .catch(...);
```

Get all tasks:
Note: lastId is used for pagination. It is null when the last page of data has been fetched
```javascript
onfleet.tasks.all(from, to=null, lastId=null)
    .then(result => {
        var lastId = result.lastId;
        var tasks = result.tasks;
        ...
    })
    .catch(...);
```

Get task by short id:
```javascript
onfleet.workers.byShortId('<task short id>')
    .then(task => {...})
    .catch(...);
```

Get all tasks on certain day:
```javascript
onfleet.workers.onDay(moment())
    .then(tasks => {...})
    .catch(...);
```

Get all today's tasks:
```javascript
onfleet.workers.today()
    .then(tasks => {...})
    .catch(...);
```

### Webhooks

Get all webhooks:
```javascript
onfleet.webhooks.all()
    .then(tasks => {...})
    .catch(...);
```

Create webhook:
```javascript
onfleet.webhooks.create('<webhook url>', triggerId, threshold=null)
    .then(() => {...})
    .catch(...);
```

Delete webhook:
```javascript
onfleet.webhooks.delete('<webhook id>')
    .then(() => {...})
    .catch(...);
```


## Onfleet API docs

http://docs.onfleet.com/v2.0/docs/introduction
