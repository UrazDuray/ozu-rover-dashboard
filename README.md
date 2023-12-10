# ozu-rover-dashboard

An Electron application with Vue

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

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

# For UBUNTU 20.04 LINUX


## Installation

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
