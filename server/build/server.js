"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _hapi = _interopRequireDefault(require("@hapi/hapi"));

var _routes = _interopRequireDefault(require("./routes"));

var _database = require("./database");

var admin = _interopRequireWildcard(require("firebase-admin"));

var _credentials = _interopRequireDefault(require("../credentials.json"));

_dotenv["default"].config();

admin.initializeApp({
  credential: admin.credential.cert(_credentials["default"])
});
var server;

var start = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            server = _hapi["default"].server({
              port: 8080,
              host: '0.0.0.0'
            });

            _routes["default"].forEach(function (route) {
              return server.route(route);
            });

            _database.db.connect();

            _context.next = 5;
            return server.start();

          case 5:
            console.log("server is listening on ".concat(server.info.uri));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

process.on("unhandledRejection", function (err) {
  console.log(err);
  process.exit(1);
});
process.on('SIGINT', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Stropping server...');
          _context2.next = 3;
          return server.stop({
            timeout: 1000
          });

        case 3:
          _database.db.end();

          console.log('server stopped.');
          process.exit(0);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
start();