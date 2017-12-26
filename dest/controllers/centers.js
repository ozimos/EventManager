"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = require("../models/data");

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  /**
   *
   * Get All Centers
   * @param {obj} req
   * @param {obj} res
   * @returns {any} all centers
   * @memberof centerController
   */
  getAllCenters: function getAllCenters(req, res) {
    return res.json({
      centers: _data.centers,
      error: false
    });
  },

  /**
   *
   *  Get a single center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} A single center
   * @memberof centerController
   */
  getSingleCenter: function getSingleCenter(req, res) {
    for (var i = 0; i < _data.centers.length; i += 1) {
      if (_data.centers[i].id === req.params.id) {
        return res.json({
          message: _data.centers[i],
          error: false
        });
      }
    }

    return res.status(404).json({
      message: 'Center not Found',
      error: true
    });
  },

  /**
   *
   * Creates a new center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success, all centers
   * @memberof centerController
   */
  postCenter: function postCenter(req, res) {
    var newId = _data.centers.length + 1;

    _data.centers.push(_extends({
      id: newId
    }, req.body));

    return res.json({
      message: 'success',
      error: false,
      centers: _data.centers
    });
  },

  /**
   *
   *  Update a center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} sucess, all centers
   * @memberof centerController
   */
  updateCenter: function updateCenter(req, res) {
    var _loop = function _loop(i) {
      var _this = this;

      if (_data.centers[i].id === req.params.id) {
        // Destructuring assignment to extract req.body fields
        var _req$body = req.body,
            country = _req$body.country,
            state = _req$body.state,
            lga = _req$body.lga,
            rest = _objectWithoutProperties(_req$body, ["country", "state", "lga"]); // group location fields into single object


        var location = {
          country: country,
          state: state,
          lga: lga
        };
        Object.keys(location).forEach(function (item) {
          _newArrowCheck(this, _this);

          if (location[item]) {
            _data.centers[i].location[item] = location[item];
          }
        }.bind(this));
        Object.keys(rest).forEach(function (element) {
          _newArrowCheck(this, _this);

          _data.centers[i][element] = rest[element];
        }.bind(this));
        return {
          v: res.json({
            message: 'Success',
            error: false,
            centers: _data.centers
          })
        };
      }
    };

    for (var i = 0; i < _data.centers.length; i += 1) {
      var _ret = _loop(i);

      if (_typeof(_ret) === "object") return _ret.v;
    }

    return res.status(404).json({
      message: 'Center not Found',
      error: true
    });
  }
};
exports.default = _default;