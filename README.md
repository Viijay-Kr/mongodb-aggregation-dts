<h1>mongodb-aggregation-dts</h1>

This library provides type definitions for mongodb aggregation pipelines and operators those which are not provided by the native [driver](https://github.com/mongodb/node-mongodb-native/tree/main).

Currently it is only intended for the purpose of providing editor intellisense such as auto completion, hover hints.

> Once native mongodb supports these definitions this project will be archived. Track the status [here](https://jira.mongodb.org/browse/NODE-5863?jql=text%20~%20%22type%20definitions%20for%20aggregation%20pipelines%22)


<h1>Table of Contents</h1>

- [Features](#features)
  - [Type definitions](#type-definitions)
  - [Overload](#overload)
- [Install](#install)
  - [npm](#npm)
  - [pnpm](#pnpm)
  - [yarn](#yarn)
  - [bun](#bun)
- [Usage](#usage)
  - [TS config](#ts-config)
  - [\*.d.ts](#dts)

# Features

>This library is built on top of the native node js driver. The aggregate [method](https://github.com/mongodb/node-mongodb-native/blob/main/src/collection.ts#L985) from the native library is overloaded to provide the extra definitions for pipeline stages. Therefore diagnostics is not possible because of loose type in the native driver

## Type definitions
* [Aggregation Pipeline Stages](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#aggregation-pipeline-stages)
* [Aggregation Operators](https://www.mongodb.com/docs/manual/reference/operator/aggregation/)

## Overload
* [Collection#aggregate](./src/mongodb.ts#L6)
  
# Install
## npm
`npm install mongodb-dts --save-dev`
## pnpm
`pnpm add mongodb-dts --save-dev`
## yarn
`yarn add mongodb-dts --save-dev`
## bun
`bun add mongodb-dts --save-dev`

# Usage

## TS config

```json
// tsconfig.json
{
  "include": ["./node_modules/mongodb-aggregation-dts/types"]
}
```
> NOTE: If you have excluded `node_modules` in your `tsconfig#exclude` option then this approach will not work. In this case follow the [.d.ts](#dts) approach

## *.d.ts

Create a `mongodb.d.ts` file at the root of your project and add a reference to `mongodb-aggregatio-dts`

```ts
// mongodb.d.ts
/// <reference types="mongodb-aggregation-dts" />
```