# ozu-rover-dashboard (Deimos)

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
    │               ├───ArmWindow.vue
    │               ├───CamerasWindow.vue
    │               ├───GraphsWindow.vue
    │               ├───HomeWindow.vue
    │               ├───Navigation.vue
    │               ├───ScienceWindow.vue
    │               ├───Switch.vue
    │               ├───Versions.vue
    │               │
    │               ├───arm
    │               ├───autonomy
    │               └───locomotion
    │
    ├───dev-app-update.yml
    ├───electron-builder.yml
    ├───electron.vite.config.js
    ├───LICENSE
    ├───package.json
    ├───package-lock.json
    └───README.md

If you are going to work on a page, they are contained within `src/renderer/components/<page_name>Window.vue`. You may create a new folder in `components/` with the name of your page (mind the lowercase standard) and develop additional sub-components there to use in the main page.

> Note: Please use 2-width space indentation for consistency.


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

## Notes

### Not Seeing Arm in the Preview Page?

Running in production mode may cause asset files to be excluded from build.
```
npm run start # running in production, preview fails
npm run dev # use this instead
```

### Autonomy Mapping
First, install the tile-server Docker image from DockerHub and run it.

```sh
docker pull toprakefe722/mbtiles-server-deimos:latest
docker run -p 3000:3000 toprakefe722/mbtiles-server-deimos:latest
```
This will start up the tile server that our front-end will be receiving imagery from to display within the map.

### Resources

You may find our tile dataset in our shared Google drive, under the autonomy tab, `tiles.mbtiles`. You are free to add new data to this tileset, for which you may find the documentation in our Notion workspace.
