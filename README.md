# MemoryGame

This project is inspired by [Kubowania Memory Game](https://github.com/kubowania/memory-game) from this [YouTube video](https://www.youtube.com/watch?v=lhNdUVh3qCc) and deployed [here](https://tedaky.github.io/memory-game/).

## Requirements

* [Node.js](https://nodejs.org/)
* [Angular CLI](https://angular.io/guide/setup-local) Gobally

## Recommended

* [Visual Studio Code](https://code.visualstudio.com/) IDE
  * [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code Extension - For GitHub Pages build mock.
* Internet browser - Not Internet Explorer.

## Getting Started

1. Clone/Fork Memory Game [Repository](https://github.com/tedaky/memory-game).
1. Open repository in an IDE.
1. Open a Terminal window to the repository root.
1. Run `npm i` from the Terminal window to install Node Modules.

## Serving

Using a Terminal window.

### Locally - No Service Worker

Use any of the following commands to serve the project using Angular serve tools.

* `npm run ng run the-application:serve`
* `ng run the-application:serve`
* `ng serve`
* `ng serve --project=the-application`

Open the internet browser at [localhost](http://localhost:4200)

### Locally - W/Out Service Worker

Build `the-application` using any of the following *build* commands.

#### Without Service Worker

* `ng build`
* `ng build --project=the-application`
* `npm run ng run the-application:build`
* `ng run the-application:build`
* `npm run ng run the-application:app-shell`
* `ng run the-application:app-shell`

#### With Service Worker

**Not GitHub Pages**

* `ng build --prod`
* `ng build --project=the-application --prod`
* `npm run ng run the-application:app-shell:production`
* `npm run ng run the-application:build:production`
* `ng run the-application:app-shell:production`
* `ng run the-application:build:production`
* `npm run build:shell`

**GitHub Pages**

* `ng build --configuration=github`
* `ng build --project=the-application --configuration=github`
* `npm run ng run the-application:app-shell:github`
* `npm run ng run the-application:build:github`
* `ng run the-application:app-shell:github`
* `ng run the-application:build:github`
* `npm run build:shell:github`

**After building the build can be served**

* `npm run run:server`

Open the internet browser at [localhost](http://localhost:8080).

If built for GitHub Pages use the Live Server **Go Live** button after the command directly above. See the Live Server extension [Start/Stop](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer#shortcuts-to-startstop-server) section for more details.
