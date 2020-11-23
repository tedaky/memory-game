# MemoryGame

This project is inspired by [Kubowania Memory Game](https://github.com/kubowania/memory-game) from this [YouTube video](https://www.youtube.com/watch?v=lhNdUVh3qCc) and deployed [here](https://tedaky.github.io/memory-game/).

---
---

## No Visual Studio Code Container

### Requirements

* [Node.js](https://nodejs.org/)
* [Angular CLI](https://angular.io/guide/setup-local) Gobally

### Recommended

* [Visual Studio Code](https://code.visualstudio.com/) IDE
  * Extensions
  * [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code Extension - For GitHub Pages build mock.
  * [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
* Internet browser - Not Internet Explorer.
  * [Google Chrome](https://www.google.com/chrome/)

### Getting Started

1. Clone/Fork Memory Game [Repository](https://github.com/tedaky/memory-game).
1. Open repository in an IDE.
1. Open a Terminal window to the repository root.
1. Run `npm i` from the Terminal window to install Node Modules.

### Serving

Using a Terminal window.

#### Locally - No Service Worker

Use any of the following commands to serve the project using Angular serve tools.

* `npm run ng run the-application:serve`
* `ng run the-application:serve`
* `ng serve`
* `ng serve --project=the-application`

Open the internet browser at [localhost](http://localhost:4200)

#### Locally - W/Out Service Worker

Build `the-application` using any of the following *build* commands.

##### Without Service Worker

* `ng build`
* `ng build --project=the-application`
* `npm run ng run the-application:build`
* `ng run the-application:build`
* `npm run ng run the-application:app-shell`
* `ng run the-application:app-shell`

##### With Service Worker

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

### Debugging

* Serve the application from Serving
* Use the `Run` command in Visual Studio Code
* Start debugging

---
---

## Visual Studio Code Container

### Requirements

* [Docker](https://www.docker.com/products/docker-desktop)
* [Visual Studio Code](https://code.visualstudio.com/)
  * Extensions
  * [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
  * [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Recommended

* Visual Studio Code
  * Extensions
  * [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
  * [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
* [Google Chrome](https://www.google.com/chrome/)

### Getting Started

1. Clone/Fork Memory Game [Repository](https://github.com/tedaky/memory-game).
1. Open repository in Visual Studio Code IDE.
   1. Open in remote container when asked.
1. Open a Terminal window to the repository root.
1. Run `npm i` from the Terminal window to install Node Modules.
   1. Should be run for you at container creation.

If you'd like Angular VSIcons and they are not appearing you can toggle them with the VS Code Command Palette `>Icons: Toggle Angular Preset (Workspace Level)`

### Serving

Using a Terminal window.

Use any of the following commands to serve the project using Angular serve tools.

* `npm run ng run the-application:serve`
* `ng run the-application:serve`
* `ng serve`
* `ng serve --project=the-application`

Open the internet browser at [localhost](http://localhost:4200)

### Debugging

* Serve the application from Serving
* Use the `Run` command in Visual Studio Code
* Start debugging
