# amplify-workshop

> Sample app based on AWS Amplify Workshop with Vue.js

This is a sample application built with AWS Amplify,
and you can `amplify init --app` with this repository
to deploy on your own AWS account.

This app is coded based on a workshop held at AWS Loft Tokyo: [AWS Amplify Workshop with Vue.js]

## Prerequisites

* You need your AWS account.

* Install the AWS Amplify CLI.

```shell
npm install -g @aws-amplify/cli
```

* If you don't have an IAM user for AWS SDK access, you can configure with

```shell
amplify configure
```

for more information, see: [aws-amplify/amplify-cli]

## How to install

* Make an empty directory
* `cd` to the directory, and hit the following command:

```shell
amplify init --app git@github.com:kulikala/amplify-workshop.git
```

This will install, initialize, and provision resources from this GitHub repository.
This command must be executed in an empty directory.

## Build Setup

```shell
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

[AWS Amplify Workshop with Vue.js]: http://educationhub-6b2905c0-43df-11ea-b56d-b55afd1e96dc.s3-website-us-east-1.amazonaws.com
[aws-amplify/amplify-cli]: https://github.com/aws-amplify/amplify-cli#commands-summary
