"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = require("../models/data");

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  /**
   *
   * Get all events
   * @param {obj} req
   * @param {obj} res
   * @returns {any} all events
   * @memberof eventController
   */
  getAllEvents: function getAllEvents(req, res) {
    return res.json({
      events: _data.events,
      error: false
    });
  },

  /**
   *
   *  Get a single event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} A single event
   * @memberof eventController
   */
  getSingleEvent: function getSingleEvent(req, res) {
    for (var i = 0; i < _data.events.length; i += 1) {
      if (_data.events[i].id === req.params.id) {
        return res.json({
          message: _data.events[i],
          error: false
        });
      }
    }

    return res.status(404).json({
      message: 'Event not Found',
      error: true
    });
  },

  /**
   *
   * Creates a new event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success, all events
   * @memberof eventController
   */
  postEvent: function postEvent(req, res) {
    var newId = _data.events.length + 1;

    if (_data.events[_data.events.length - 1].id === newId) {
      newId += 1;
    }

    _data.events.push(_extends({
      id: newId
    }, req.body));

    return res.json({
      message: 'success',
      error: false,
      events: _data.events
    });
  },

  /**
   *
   *  Update an Event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} sucess, all events
   * @memberof eventController
   */
  updateEvent: function updateEvent(req, res) {
    var _loop = function _loop(i) {
      var _this = this;

      if (_data.events[i].id === req.params.id) {
        Object.keys(req.body).forEach(function (element) {
          _newArrowCheck(this, _this);

          _data.events[i][element] = req.body[element];
        }.bind(this));
        return {
          v: res.json({
            message: 'Success',
            error: false,
            events: _data.events
          })
        };
      }
    };

    for (var i = 0; i < _data.events.length; i += 1) {
      var _ret = _loop(i);

      if (_typeof(_ret) === "object") return _ret.v;
    }

    return res.status(404).json({
      message: 'Event not Found',
      error: true
    });
  },

  /**
   *
   * Delete an Event
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success
   * @memberof eventController
   */
  deleteEvent: function deleteEvent(req, res) {
    for (var i = 0; i < _data.events.length; i += 1) {
      if (_data.events[i].id === req.params.id) {
        _data.events.splice(i, 1);

        return res.json({
          message: 'Event Deleted',
          error: false
        });
      }
    }

    return res.status(404).json({
      message: 'Event not Found',
      error: true
    });
  }
};
exports.default = _default;