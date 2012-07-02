# SEPTA - Get information about SEPTA trains, busses, and trolleys in nodejs.

## About

This module is a wrapper around a collection of REST web services developed by
SEPTA http://www3.septa.org/hackathon

## API Documentation

JsDoc generated documentation is hosted at [http://jwalgran.github.com/septa]()

## Installation

From npm:

    npm install septa

From source:

    git clone git://github.com/jwalgran/septa.git 
    cd septa
    npm link

## Usage

### Download detours in effect on a SEPTA bus route:

    $ node
    > var septa = require('septa');
    > var bus5 = new septa.BusRoute(5);

Handle the response with a callback

    > bus5.fetchDetours(function(err, resp) {console.dir(resp);});

Handle the raw response stream

    > bus5.fetchDetours().pipe(process.stdout);

### Download current alerts for a SEPTA bus route:

    $ node
    > var septa = require('septa');
    > var bus97 = new septa.BusRoute(97);

Handle the response with a callback

    > bus97.fetchAlerts(function(err, resp) {console.dir(resp);});

Handle the raw response stream

    > bus97.fetchAlerts().pipe(process.stdout);

### Download the locations of all the buses on a SEPTA bus route:

    $ node
    > var septa = require('septa');
    > var bus23 = new septa.BusRoute(23);

Handle the response with a callback

    > bus23.fetchLocations(function(err, resp) {console.dir(resp);});

Handle the raw response stream

    > bus23.fetchLocations().pipe(process.stdout);

## What's Missing

Train data