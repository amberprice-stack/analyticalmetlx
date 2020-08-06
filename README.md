# MeTL

## Introduction
MeTL was a group project for a Software Engineering class. We were tasked to come up with an enhancement to make MeTL better. Our group came up with a search function so both the student and the instructor can parse through the immense amount of data that is being collected through MeTL. The enhancement specifications include: Develop a tool for the user interacting with Whiteboard to be able to search the content, Further refine the search function within whiteboard as well as made the zoom function move on the canvas, and Add an additional box to let the user know if the search string matched within the canvas or not.

![Search](https://i.ibb.co/YWTgPgB/metl1.png)
![Search2](https://i.ibb.co/VYGbx2R/metl2.png)
![Search3](https://i.ibb.co/PNR2vmr/metl3.png)

## Description

This project provides the primary MeTL server, the high interaction comet-enabled javascript product (available at `/board`).  This is developed in Scala, and deploys as a WAR directly into a Java web container.  We've been using Jetty (which is embedded for development, but the WAR can be dropped into any Java servlet container).

## Installation

- Install the following required tools:
  - [Java](www.oracle.com/technetwork/java/javase/downloads) JDK version 8.x
  - [NPM](https://www.npmjs.com/get-npm) (Node Package Manager)
- Clone MeTL `git clone https://github.com/StackableRegiments/analyticalmetlx.git`

## Install Enhancement
In order to apply the code changes copy and paste the "src" folder to the "analyticalmetlx" root folder, and click on replace all files in destination, this will only overwritte the board.html and board.js files in their respective folders and copy over the Search Icon provided. Once this is done you may launch MeTL, the search bar will be in the board page right next to the chat button.

## Configure

Before running the application, there are a few configuration settings you'll need to set.  These are set by the files outside the WAR, and examples of the files are available in the config directory (eg `configuration.sample.xml`).

The following Java system properties can be provided at the command line (see `sbt.bat` and `sbt.sh`):

### SBT

We use SBT to compile and publish this app. It is included in the repo as `sbt-launcher.jar`.

Set the location of SBT files and directories.

- `sbt.boot.directory="%IVY_HOME%\.sbt-boot"`
- `sbt.global.home="%IVY_HOME%\.sbt"`
- `sbt.home="%IVY_HOME%\.sbt"`
- `sbt.ivy.home="%IVY_HOME%\.ivy2\"`
- `sbt.global.staging="%IVY_HOME%\.sbt-staging"`

### MeTL

- `metlx.configurationFile="./config/configuration.local.xml"` sets the location of the MeTL config file.

See [README-config.md](README-config.md) for more detail.

### Logback

MeTL uses Logback, which can be overridden to use a config file from outside the WAR.

- `logback.configurationFile="config/logback.xml"` sets the location of the Logback config file.

See [Logback](https://logback.qos.ch/manual/index.html) for more detail.

### Developer Options

- `run.mode="development"` instructs Lift to disable most caching (see [Simply Lift](https://simply.liftweb.net/index-3.1.html#toc-Subsection-3.1.2)).
- `metl.stopwatch.enabled="true"` enables duration logging of various actions.
- `metl.stopwatch.minimumLog="1000"` requires that an action take longer than 1s before it is logged.
- `stackable.spending=enabled` enables use of third-party services defined in [README-config.md](README-config.md). This will also require configuring access credentials for each service.

## Run

To run a local (development) server for this app, use:

    $ sbt container:start

Other useful commands include: `sbt container:stop` and `sbt container:restart`.

## Deployment

This project publishes to a WAR file.

Use sbt's `deploy` goal to create the warfile:

    $ sbt deploy

and then copy it from `/target/scala-2.10/` to the container of your choice.

### CSS (optional)

If any styles have changed (.less) then first compile to CSS using Grunt  (on Mac/Linux):

    $ ./grunt.sh

or (on Windows):

    > grunt-run.bat

If this is a fresh checkout then (on Mac/Linux) you'll first need to make the shell script executable: `chmod u+x grunt.sh`

### Javascript (optional)

If any Javascript has changed (.js) then first re-minify (on Mac/Linux):

    $ ./minify.sh

or (on Windows):

    > minify.bat

If this is a fresh checkout then (on Mac/Linux) you'll first need to make the shell script executable first: `chmod u+x minify.sh`

### Testing

MeTL has a CI pipeline on CircleCI, at:

[https://circleci.com/gh/StackableRegiments/analyticalmetlx]

### Project Enhancement Authors
* Amber Price
* Michael Crawford
* Alfonso Mendoza
* Jeffrey Serrano
