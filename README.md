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

## Packaging SAM Artifact
```
npm run awspackage
```
Uses the CloudFormation CLI package command to package the 'dist' folder. The command uploads the packaged artifact to an S3 bucket of the same name as the project. The command outputs a copy of your template to sam-generated.yaml, replacing references to local artifacts with the S3 location where the command uploaded the artifacts.

Use this command to upload your application resources. After you package your template's artifacts, run the deploy command to deploy the returned template.
```
npm run awspackage -- --profile <aws-profile-name>
```
Runs the package command using the supplied aws profile name.

## Deploying to AWS
```
npm run awsdeploy
```
Uses the CloudFormation CLI deploy command to deploy the uploaded artifact to the target environment.

```
npm run awsdeploy -- --profile <aws-profile-name>
```
Runs the deploy command using the supplied aws profile name so you can target a specific account/role.

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