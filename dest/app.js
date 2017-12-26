"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _apiRoutes = _interopRequireDefault(require("./routes/apiRoutes"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
/*
app.use(methodOverride((req) => {
  if (req.param.id) {
    return 'PUT';
  }
}));
 */

app.use('/api/v1/', _apiRoutes.default);
app.get('/', function (req, res) {
  _newArrowCheck(this, _this);

  res.send('working');
}.bind(void 0));
app.listen(3000, function () {
  _newArrowCheck(this, _this);

  console.log('API is running on port 3000');
}.bind(void 0));