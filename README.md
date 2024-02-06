# ozu-rover-dashboard

An Electron application using Vuejs dedicated to the mission control of our Ares planetary roaming vehicle.

## Development Notes

### Recommended Development Environment

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Directory Structure
    ├───build
    ├───dist
    ├───node_modules
    ├───resources
    ├───src
    │   ├───main
    │   ├───preload
    │   └───renderer
    │       └───src
    │           ├───assets
    │           │   ├───css
    │           │   ├───imgs
    │           │   └───sounds
    │           └───components
    │               ├───arm
    │               ├───autonomy
    │               └───locomotion
    ├───dev-app-update.yml
    ├───electron-builder.yml
    ├───electron.vite.config.js
    ├───LICENSE
    ├───package.json
    ├───package-lock.json
    └───README.md

If you are going to work on a page, they are contained within `src/renderer/components/<page_name>Window.vue`. You may create a new folder in `components/` with the name of your page (mind the lowercase standard) and develop additional sub-components there to use in the main page.

## For Ubuntu

### Installation

After cloning this repository to your machine, enter the project folder ,and you should follow these steps:

Note : If you have npm and nodejs in your machine, you should remove them.
Because we use nvm and a specific node version

```bash
    sudo apt remove npm
    sudo apt remove nodejs
```

 1 - First of all , You need to check curl. Normally it is ready in the system, but it is still useful to check it.

```bash
    sudo apt install curl
    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
    source ~/.bashrc
```

2 - "node" Installation

```bash
    nvm install node
    nvm install 18.17.0
    nvm use 18.17.0
```
3 - "npm" Installation

```bash
    npm install
```
4 - Running

```bash
    npm run dev
```

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```