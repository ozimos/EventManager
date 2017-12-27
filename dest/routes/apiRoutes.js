"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressJoiValidation = _interopRequireDefault(require("express-joi-validation"));

var _centers = _interopRequireDefault(require("../controllers/centers"));

var _events = _interopRequireDefault(require("../controllers/events"));

var _schemas = _interopRequireDefault(require("../validators/schemas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var router = _express.default.Router();

var validator = (0, _expressJoiValidation.default)({}); // Routes

router.route('/centers').get(_centers.default.getAllCenters).post(validator.body(_schemas.default.postCenter), _centers.default.postCenter);
router.route('/centers/:id').get(validator.params(_schemas.default.param), _centers.default.getSingleCenter).put(validator.params(_schemas.default.param), validator.body(_schemas.default.updateCenter), _centers.default.updateCenter);
router.route('/events').get(_events.default.getAllEvents).post(validator.body(_schemas.default.postEvent), _events.default.postEvent);
router.route('/events/:id').get(validator.params(_schemas.default.param), _events.default.getSingleEvent).put(validator.params(_schemas.default.param), validator.body(_schemas.default.updateEvent), _events.default.updateEvent).delete(validator.params(_schemas.default.param), _events.default.deleteEvent); // Return router

var _default = router;
exports.default = _default;