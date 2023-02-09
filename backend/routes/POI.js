"use strict";

const express = require('express');
const router = new express.Router();
const {ensureAdmin, ensureCorrectUserOrAdmin} = require('../middleware/auth');
const POI = require('../models/POI');
