# Audiograph Server

**_ You should set .env file _**

### Setup

1. clone this repository
2. `yarn install`
3. Due to hashgraph sdk error, you need to add this line to following file.

```
node_modules/@hashgraph/sdk/lib/query/CostQuery.d.ts

...
import { proto } from "@hashgraph/proto/lib/proto";
...
```

4. `nest start:dev`
