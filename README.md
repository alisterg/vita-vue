This is a client app for [vita](https://github.com/alisterg/vita). It is an app that allows you to record and view
arbitrary information.

It is built with [Ionic](https://ionicframework.com).

# Setup

Prerequisites:

- Node v16.4.0 or greater
- Ionic CLI v7.1.1 or greater

Installation:

1. Run `npm install`
2. `npm run dev` to host at localhost:5173
3. `npm run test:unit` to run the unit tests
4. `npm run test:e2e` to run the cypress tests

iOS Setup:

- `ionic cap add ios` to add the ios directory
- Add your appId to `capacitor.config.ts`
- `ionic cap sync` to sync changes to the iOS project
- `ionic cap open ios` to open xcode