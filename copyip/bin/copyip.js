#!/usr/bin/env node

const ncp = require("copy-paste");
const ip = require('ip')
const address = ip.address()
ncp.copy(address, function () {
    console.log(`copy success: ${address}`)
})