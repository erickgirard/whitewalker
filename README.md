# whitewalker

Simple object properties whitelisting

### Installl

`npm i @erickgirard/whitewalker --save`

### Args

* {object} source - the object or array you want to filter
* {object | array} whitelist - an object or array containing the key you want the returned object to keep

### Example usage

```javascript
const { whitelist } = require("@erickgirard/whitelist");

const simpleObject = {
  prop1: "value1",
  prop2: "value2"
};

const simpleResult = whitelist(simpleObject, ["prop1"]);
// returns : { prop2: "value2" };

const deepObject = {
  prop1: "value1",
  prop2: {
    prop3: "value3"
  }
};

const deepResult = whitelist(deepObject, ["prop2"]);
// returns : { prop2: { prop3: "value3" } };

const deepObject2 = {
  prop1: "value1",
  prop2: {
    prop3: "value3",
    prop4: "value4"
  }
};

const deepResult2 = whitelist(deepObject2, { prop2: ["prop4"] });
// returns : { prop2 : { prop4: "value4" } };
```
