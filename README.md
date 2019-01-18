# check-holdings

Small tool that carries out a set of searches against the
library catalogue and summarizes the local holdings for the results.

It's probably most useful for a list of ISBN numbers to quickly
identify which of them are available in the library, but can 
also be used for other kinds of searches.

The tool queries Alma using SRU through the [LSM](https://github.com/scriptotek/lsm) middleware.
LSM is configured to work with the 47BIBSYS_UBO Alma instance.
If you don't want to host LSM yourself, I'm open to add more instances,
but then I need an Alma API key with read access to Bibs and Electronic resources.

## Project setup

1. Copy `.env.example` to `.env` and update it with values for your institution.
2. `yarn install`

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```
