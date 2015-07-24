var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassroomConstants = require('../constants/ClassroomConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var FirebaseStore = require('./FirebaseStore');

var CHANGE_EVENT = 'change';

var firebaseRef = FirebaseStore.getDb();