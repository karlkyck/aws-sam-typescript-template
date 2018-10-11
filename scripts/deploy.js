const { spawn } = require("child_process");
const yargs = require("yargs");
const fs = require("fs");

const argv = yargs
  .usage("Usage: $0 -n [string] -s [string] -p [string]")
  .alias("n", "name")
  .describe("n", "Project name")
  .alias("s", "stage")
  .describe("s", "Deployment stage [dev, qa, sit, uat, prod]")
  .alias("p", "profile")
  .describe("p", "AWS profile to use for deployment")
  .demandOption(["n", "s", "p"])
  .argv;

function spawnWithPromise(command, options) {
  return new Promise((resolve, reject) => {
    try {
      const spawnedProcess = spawn(command, options);

      spawnedProcess.stdout.on("data", function(data) {
        console.log("stdout: " + data.toString());
      });

      spawnedProcess.stderr.on("data", function(data) {
        console.log("stderr: " + data.toString());
      });

      spawnedProcess.on("exit", function(code) {
        console.log("child process exited with code " + code.toString());
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

if (!argv.stage || !argv.profile) {
  yargs.showHelp();
} else {
  const parameterOverrides = fs.readFileSync("env." + argv.stage + ".properties", "utf8").split(/\n/g);
  parameterOverrides.push("Stage=" + argv.stage);

  return spawnWithPromise(
    "aws",
    [
      "cloudformation",
      "package",
      "--template-file",
      "template.yaml",
      "--output-template-file",
      "template-generated.yaml",
      "--s3-bucket",
      argv.name + "-deployment-" + argv.stage,
      "--profile",
      argv.profile
    ])
    .then(() => spawnWithPromise(
      "aws",
      [
        "cloudformation",
        "deploy",
        "--template-file",
        "template-generated.yaml",
        "--stack-name",
        argv.name + "-" + argv.stage,
        "--capabilities",
        "CAPABILITY_IAM",
        "--profile",
        argv.profile,
        "--parameter-overrides"
      ].concat(parameterOverrides)
    ))
    .catch(error => console.error(error));
}