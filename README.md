README
======

This is the Sense Think Act Podcast's website built with [Typescript](https://www.typescriptlang.org/), [Next.js](https://nextjs.org/), and [React](https://reactjs.org/).

This website stores posts in YAML files, infers some information, and then creates the relevant blog post, as well as copyable content to make posting the content elsewhere easier.
The copyable content, as well as future posts are only created during debug mode.

### Features

* Generates RSS feed with rich text descriptions (outline, urls, etc.)
* Supports tags and allows the user to search by tag
* Supports custom slug and post URLs
* Only shows posts after the current date (unless in debug mode)
* (In debug mode) Shows copyable generate text for posting content elsewhere on the internet
* Marks up the transcript from an SRT file
* Has transcript and outline in iterable data structure for advanced formatting, linking, interleaving, etc.
* Should support (untested) Discourse comments and Google Analytics
* Several optimizations to improve SEO that come with Next.js (loading images, etc)

Setup
-----

1. Install [NodeJS 16](https://nodejs.org/en/).
2. Clone this repository
3. Go to the cloned directory and run the following command:
   ```bash
   npm ci
   ```

From there, the site is setup and can be run.

You can preview the site with the following command:
```bash
npm run dev
```
Or view the site in debug mode and access the copyable content with the following command:
```
npm run debug
```

Note that the RSS feed isn't generated until you run `npm run build`, which you can run at any time once the dependencies are installed.

### Deploying

The environment where you intent to run the server should have an evironmental variable for the Google Analytics tracking ID stored in the variable `GA_TRACKING_ID`.

Then, to run the production version of this site, you must run the following commands:
```bash
# Build the static site
npm run build
# Start a local server
npm run start
```