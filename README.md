# aws-sam-typescript-template

A template for an AWS SAM project written in TypeScript, using Jest for testing, TSLint for code style and Snyk for vulnerability scanning.

## Project Structure
```
.
├── sam.yaml
└── src
    └── ...
```

## Getting Started

Fork this project then start building your app.

### Prerequisites

You'll need Node 8.10+ and a [Snyk](https://snyk.io) account.

## Snyk
Authenticate with your Snyk account
```
npx snyk auth
```

## Install
```
npm i
```

## Building
Builds the project and prepares it for packaging and deployment to AWS
```
npm run build
```

1. clean
2. lint
3. audit
4. compile
5. test
6. copydependencies

## Deploying to AWS
```
npm run deploy -- -s <stage> -p <aws-profile-name>
```
Uses the CloudFormation CLI deploy command to deploy the uploaded artifact to the target environment.

```
npm run deploy -- -s dev -p main
```
Runs the deploy command using the supplied aws profile and stage.

A third argument is automatically supplied ```-n``` the name of the project which defaults to the npm package name.

### Prerequisites
You will need to have a deployment bucket created in the target account:

```<project name>-deployment-<stage name>```

i.e.

```my-project-deployment-dev```

## Compiling
```
npm run compile
```
Compiles TypeScript source.

## Testing

This project uses [Jest](https://jestjs.io/) for testing.
```
npm run test
```
With coverage
```
npm run test -- --coverage
```
Watch
```
npm run test -- --watch
```

## Linting
```
npm run lint
```

## Auditing
Run npm audit and Snyk to scan for dependency vulnerabilities
```
npm run audit
```

## Copy Dependencies
Copies production dependencies to the dist folder
```
npm run copydependencies
```

## License

This project is licensed under the MIT License.