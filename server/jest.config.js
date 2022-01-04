/* eslint-disable */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const { defaults } = require('jest-config');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  testEnvironment: 'node',
  verbose: true
};
