```
"scripts": {
```
```
  "start": "ts-node dist/app.js",
```
```
  "dev": "ts-node src/app.ts",
```
```
  "build": "tsc",
```
```
  "debug": "nodemon",
```
```
  "test": "echo \"Error: no test specified\" && exit 1",
```
```
  "typeorm": "ts-node ./node_modules/typeorm/cli.js",
```
```
  "typeorm:cli": "ts-node ./node_modules/typeorm/cli -f ./ormconfig.ts",
```
```
  "db:drop": "npm run typeorm:cli schema:drop",
```
```
  "migration:generate": "typeorm migration:create -n",
```
```
  "db:create": "ts-node src/script/create-db.ts",
```
```
  "db:migrate": "npm run typeorm:cli migration:run",
  # docker exec -it restaurant_reservations_app /bin/bash -c "node --require ts-node/register ./node_modules/typeorm/cli.js migration:run"
```
```
  "db:revert": "npm run typeorm:cli migration:revert",
```
```
  "db:sync": "npm run typeorm:cli schema:sync && npm run db:migrate"
  # docker exec -it restaurant_reservations_app /bin/bash -c "node --require ts-node/register ./node_modules/typeorm/cli.js schema:sync && npm run db:migrate"
```
