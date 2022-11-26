# Contributing guide

Thank you for your interest in contributing to this collection of extensions for Directus! Before we explain how to contribute, please consider these few notes from us first:

1. If you are an individual developer wanting to contribute to this project, but have limited time, consider contributing upstream to the [Directus platform](https://github.com/directus/directus) instead. These extensions are useless if the system that supports it doesn't have strong community support first, so let's prioritise that.
2. This is an 100% open source project, but be mindful it is used by _Jamtastic!_&nbsp; for commercial purposes. This has ramifications that may affect your descision to contribute and general points you should be aware of. Primarily that:
   - The [coding standards](#) used in this repo are designed to be compatible with the Directus platform as much as possible, but there are some liberties taken to keep it in line with other codebases we maintain (mainly relevant for those who contribute to the platform as well).
   - Code you contribute will likely help us make a profit (see point 3 as well). We aim to be an ethically minded group of people, but we totally respect that this still may or may not sit well with your own views on open source.
3. We have finite resources ourselves. What does this mean for you?
   - We can only maintain what we can feasibly use. Please don't take offence if you submit a new feature, tool or even an entirely new extension and we don't accept the PR. It may be of premium quality but just not something we see a use for in the immediate future.
   - Some of our tools and extensions make liberal use of some of Directus' advanced features and functionality. We also make use of some internal APIs that are not well documented or even not meant for external use. Unfortunately it is unlikely that we can support learning the inner workings of Directus for new developers due to our finite resources.

If these points work for you and you are still keen to contribute, then accept our sincerest gratitude! Make sure you read our [Code of Conduct](#) and then read on ...

## Getting started

### Setting up your development environment

Clone the repository to your local machine. This project makes use of development workflows we use internally and it may be helpful to to follow the same workflows to reduce development friction.

At minimum, it's strongly recommended that you have [Docker installed on your development machine](#) and that you save the repository under a directory that follows this structure:

```
$GITPATH/github.com/jamtastic/directus
```

> **Note**: Use [Git Gud](#) and clone projects using the `git get jamtastic/directus` command to have this workflow setup automatically.

This will allow the CLI helper `bunny` to find the project automatically. Once you have the project cloned and Docker installed, run the following inside the root directory of repository.

```sh
$ npm run bootstrap
$ cd source/helpers && npm run build && npm link
$ bunny config developer

# Follow the prompts to add your personal details

$ npm start
```

<details><summary><strong>Click here for how to configure <code>bunny</code> when using a different path</strong></summary><br />

> **Warning**: The CLI helper will let you run the `bunny config` command regardless of where the project is installed. No other commands will work as expected though.

> **Note**: Run `bunny config project.path <repository path>` so that `bunny` knows where to find the project.

</details>

Your cloned repository is now running in development mode. Visit https://directus.jamtastic.local [^hostname] and login with `admin@example.com` and `password` as the username and password.

[^hostname]: The `npm run bootstrap` command will try to add this URL to your hosts file automatically, but you may need to add it manually if it fails.

### Issues

### Extensions

```sh
$ bunny new [TYPE] example
```

## Contribution workflow
