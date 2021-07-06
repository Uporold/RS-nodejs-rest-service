# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Docker run

```
docker-compose up
```

Or use your IDE gui

## Docker repos

[Fixed postgres+alpine](https://registry.hub.docker.com/r/uporold/rs-postgres)

[Node + alpine](https://registry.hub.docker.com/r/uporold/rs-node)

## Migrations

generate: ```npm run typeorm:cli -- migration:generate -n name```

run: ```npm run typeorm:cli -- migration:run```

revert: ```npm run typeorm:cli -- migration:revert```



## Running application in development mode

```
npm run start:dev
```

## Running application in production mode

```
npm run start:prod
```

## Build application

```
npm run build
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Express vs Fastify benchmark

Scenarios Created 10

Scenarios Completed 10

Total Requests Completed 30


|                            | Express        |     Fastify    |
|----------------------------|:--------------:|:--------------:|
| Shortest call              | 2 ms           | 2ms            |
| Longest call               | 200 ms         | 179 ms         |
| Requests per second        | 3.16 rps       | 3.15 rps       |
| Median response time       | 64.5 ms        | 64 ms          |
| Status codes [codes:count] | 200:10, 201:20 | 200:10, 201:20 |
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
