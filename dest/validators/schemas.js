"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  for fields that return arrays
var arraySchema = _joi.default.array().items(_joi.default.string().required()).unique();

var updateEvent = _joi.default.object({
  name: _joi.default.string(),
  type: _joi.default.alternatives().try(arraySchema, _joi.default.string()),
  centerId: _joi.default.string().regex(/^[0-9a-fA-F]$/),
  duration: _joi.default.number().integer(),
  startDate: _joi.default.date(),
  estimatedAttendance: _joi.default.number().integer()
});

var updateCenter = _joi.default.object({
  name: _joi.default.string(),
  description: _joi.default.string(),
  cost: _joi.default.number().integer(),
  capacity: _joi.default.number().integer(),
  country: _joi.default.string(),
  state: _joi.default.string(),
  lga: _joi.default.string(),
  amenities: _joi.default.alternatives().try(arraySchema, _joi.default.string()),
  eventTypes: _joi.default.alternatives().try(arraySchema, _joi.default.string())
});

var param = _joi.default.object({
  id: _joi.default.number().integer().required()
});

var _default = {
  updateEvent: updateEvent,
  postEvent: updateEvent.options({
    presence: 'required'
  }),
  updateCenter: updateCenter,
  postCenter: updateCenter.options({
    presence: 'required'
  }),
  param: param
};
exports.default = _default;