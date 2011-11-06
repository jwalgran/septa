# SEPTA - Get information about SEPTA trains, busses, and trolleys.

## About

This module is a wrapper around a collection of REST web services developed by
SEPTA http://www3.septa.org/hackathon

## Installation

From npm:

    npm install septa

From source:

    git clone git://github.com/jwalgran/septa.git 
    cd septa
    npm link

## Usage

### Get detours in effect on a SEPTA bus route:

    $ node
    > var septa = require('septa');
    > var bus5 = new septa.BusRoute(5);
    > bus5.getDetours(function(err, resp) {console.dir(resp);});

### Get current alerts for a SEPTA bus route:

    $ node
    > var septa = require('septa');
    > var bus97 = new septa.BusRoute(97);
    > bus97.getAlerts(function(err, resp) {console.dir(resp);});
