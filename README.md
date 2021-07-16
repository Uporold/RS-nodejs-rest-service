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

Scenarios Created 600

Scenarios Completed 600

Total Requests Completed 3000


|                            | Express            |     Fastify        |
|----------------------------|:------------------:|:------------------:|
| Shortest call              | 1 ms               | 0 ms               |
| Longest call               | 224 ms             | 169 ms             |
| Requests per second        | 49.66 rps          | 49.65 rps          |
| Median response time       | 63 ms              | 63 ms              |
| Status codes [codes:count] | 200:1800, 201:1200 | 200:1800, 201:1200 |

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
