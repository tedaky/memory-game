// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing'
import { getTestBed } from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing'

interface Context {
  context(path: string, deep?: boolean, filter?: RegExp): Keys
}
interface Keys {
  keys(): string[]
  <T>(id: string): T
}
declare const require: Context

let context: Keys

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
)
// Then we find all the tests.
context = require.context('./', true, /\.spec\.ts$/)
// And load the modules.
context.keys().map<unknown>(context)
