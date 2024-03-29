# Gallery API {

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/amargopastor/gallery-api/main?color=blue&style=for-the-badge)
![npm type definitions](https://img.shields.io/npm/types/typescript?logo=typescript&logoColor=white&style=for-the-badge)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/amargopastor/gallery-api?color=blueviolet&label=CODE%20SIZE&logo=github&style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/amargopastor/gallery-api?color=success&logo=github&logoColor=white&style=for-the-badge)

```ts
const images_router: FastifyPluginAsync = async (app) => {
	app.addHook(
		'preHandler',
		async (request: FastifyRequest, reply: FastifyReply) => {}
	);
	app.get('/', list_images);
	app.get('/:_id', get_image);
	app.post('/', new_image);
	app.post('/:_id', update_image);
	app.delete('/', delete_all_image);
	app.delete('/:_id', delete_image);
};
```

🚀 [Go to FRONT](https://github.com/amargopastor/gallery-front)  

## Table of Contents

1. [Technologies](#technologies)
1. [About](#about)
1. [Set Up](#set-up)
1. [Commands Availables](#commands-availables)
1. [Making of](#making-of)
1. [Project tree](#project-tree)
1. [Honorable mentions](#project-tree)

## Technologies

- [NodeJS](https://nodejs.org/es/)
- [Fastify](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemon](https://nodemon.io/)

## About

Back end of a gallery project to view, edit and delete images.

## Set Up

To download and start the project you need to run the following commands:

```bash
# Clone the project into your local pc
git clone https://github.com/amargopastor/gallery-api.git

# Move into it
cd gallery-api

# Install all the necessary dependencies (you can check them in the package.json)
yarn install
```

## Commands Availables

Once you've set up the project you're ready to run develop app. Here there are different options:

```bash
# Start the project in dev mode (runs typescript files)
yarn run dev

# Populate database
yarn run seed
```

# Making of

Read all about how this project has been made right [here](https://github.com/amargopastor/gallery-front/blob/main/docs/README.md).

## Project tree

```
gallery-api
├─ .eslintrc.json
├─ .gitignore
├─ README.md
├─ package.json
├─ src
│  ├─ app.ts
│  ├─ bd.ts
│  ├─ config.ts
│  ├─ images
│  │  ├─ Image.model.ts
│  │  ├─ images.api.ts
│  │  └─ seed.images.ts
│  ├─ server.ts
│  └─ types
│     └─ types.ts
├─ tsconfig.json
└─ yarn.lock
```

## Honorable mentions

🍍

**[⬆ back to top](#table-of-contents)**
