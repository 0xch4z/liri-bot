'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Fetch tweets
 * 
 * outputs last 20 of tweets
 */
var fetchTweets = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var tweets, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tweet, text, created_at, date, message;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Fetching tweets...');
            _context.prev = 1;
            _context.next = 4;
            return twitterClient.get('statuses/user_timeline', {
              screen_name: 'unc_liri',
              count: 20
            });

          case 4:
            tweets = _context.sent;

            // output tweets
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            for (_iterator = tweets.reverse()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              tweet = _step.value;
              text = tweet.text, created_at = tweet.created_at;
              date = (0, _moment2.default)(new Date(tweet.created_at)).calendar();

              console.log('\n        \n' + text + '\n        \nvia Twitter - ' + date + '\n\n      ');
            }
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 16:
            _context.prev = 16;
            _context.prev = 17;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 19:
            _context.prev = 19;

            if (!_didIteratorError) {
              _context.next = 22;
              break;
            }

            throw _iteratorError;

          case 22:
            return _context.finish(19);

          case 23:
            return _context.finish(16);

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t1 = _context['catch'](1);
            message = _context.t1.message;

            console.error('Error fetching tweets: ' + message);

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 26], [8, 12, 16, 24], [17,, 19, 23]]);
  }));

  return function fetchTweets() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Fetch song
 * @param {string} query Song to query for
 * 
 * outputs info about a given song
 */


var fetchSong = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(query) {
    var _ref4, tracks, items, song, message;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('fetching song ' + query);
            _context2.prev = 1;
            _context2.next = 4;
            return spotifyClient.search({
              type: 'track',
              query: query
            });

          case 4:
            _ref4 = _context2.sent;
            tracks = _ref4.tracks;

            // get most popular track | mock track
            items = tracks.items;
            song = items.length ? items.sort(function (a, b) {
              return a.popularity + b.popularity;
            })[0] : _mocks2.default.song;
            // output track

            console.log('\n      Name: ' + song.name + '\n      Artists: ' + song.artists.map(function (a) {
              return a.name;
            }).join(', ') + '\n      Album: ' + song.album.name + '\n      Preview URL: ' + song.preview_url + '\n    ');
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](1);
            message = _context2.t0.message;

            console.error('Error fetching song: ' + message);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 11]]);
  }));

  return function fetchSong(_x) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Fetch movie
 * @param {string} query
 * 
 * outputs infor about a given movie
 */


var fetchMovie = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(query) {
    var _ref7, data, message;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('fetching movie ' + query);
            _context3.prev = 1;
            _context3.next = 4;
            return _axios2.default.get(OMDB_API_URL + '&t=' + encodeURIComponent(query));

          case 4:
            _ref7 = _context3.sent;
            data = _ref7.data;

            // if error; use mock
            if (data.Error) data = _mocks2.default.movie;
            // output movie
            console.log('\n      Title: ' + data.Title + '\n      Released: ' + data.Released + '\n      Rating: ' + data.Ratings[1].Value + '\n      Country: ' + data.Country + '\n      Language: ' + data.Language + '\n      Plot: ' + data.Plot + '\n      Actors: ' + data.Actors + '\n    ');
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](1);
            message = _context3.t0.message;

            console.error('Error fetching movie: ' + message);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[1, 10]]);
  }));

  return function fetchMovie(_x2) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Execute random txt
 * 
 * parses and executes cmds from `random.txt`
 */


var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _nodeSpotifyApi = require('node-spotify-api');

var _nodeSpotifyApi2 = _interopRequireDefault(_nodeSpotifyApi);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _keys = require('./keys.json');

var _keys2 = _interopRequireDefault(_keys);

var _mocks = require('./mocks.json');

var _mocks2 = _interopRequireDefault(_mocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = process.argv.slice(2);

var OMDB_API_URL = 'http://www.omdbapi.com/?apikey=' + _keys2.default.omdb.key;

var twitterClient = new _twitter2.default(_keys2.default.twitter);
var spotifyClient = new _nodeSpotifyApi2.default(_keys2.default.spotify);function executeRandomTxt() {
  var _this = this;

  _fs2.default.readFile('random.txt', 'utf8', function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(err, file) {
      var lines, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, line, parts, cmd, query;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!err) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', console.error('Error reading random.txt'));

            case 2:
              // handle each line
              lines = file.split(/\n/);
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context4.prev = 6;
              _iterator2 = lines[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context4.next = 30;
                break;
              }

              line = _step2.value;

              // parse command
              parts = line.split(' ');
              cmd = parts[0];
              query = parts.slice(1).join(' ');
              // execute command

              console.log('\n\n\n[*] Executing command: "' + line + '"\n\n\n');
              _context4.t0 = cmd;
              _context4.next = _context4.t0 === 'my-tweets' ? 17 : _context4.t0 === 'spotify-this-song' ? 20 : _context4.t0 === 'movie-this' ? 23 : 26;
              break;

            case 17:
              _context4.next = 19;
              return fetchTweets();

            case 19:
              return _context4.abrupt('break', 27);

            case 20:
              _context4.next = 22;
              return fetchSong(query);

            case 22:
              return _context4.abrupt('break', 27);

            case 23:
              _context4.next = 25;
              return fetchMovie(query);

            case 25:
              return _context4.abrupt('break', 27);

            case 26:
              console.error('Error: \'' + cmd + '\' is not a valid command!');

            case 27:
              _iteratorNormalCompletion2 = true;
              _context4.next = 8;
              break;

            case 30:
              _context4.next = 36;
              break;

            case 32:
              _context4.prev = 32;
              _context4.t1 = _context4['catch'](6);
              _didIteratorError2 = true;
              _iteratorError2 = _context4.t1;

            case 36:
              _context4.prev = 36;
              _context4.prev = 37;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 39:
              _context4.prev = 39;

              if (!_didIteratorError2) {
                _context4.next = 42;
                break;
              }

              throw _iteratorError2;

            case 42:
              return _context4.finish(39);

            case 43:
              return _context4.finish(36);

            case 44:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this, [[6, 32, 36, 44], [37,, 39, 43]]);
    }));

    return function (_x3, _x4) {
      return _ref9.apply(this, arguments);
    };
  }());
}

(function () {
  var cmd = args[0];
  var query = args.slice(1).join(' ');
  switch (cmd) {
    case 'my-tweets':
      return fetchTweets();
    case 'spotify-this-song':
      return fetchSong(query);
    case 'movie-this':
      return fetchMovie(query);
    case 'do-what-it-says':
      return executeRandomTxt();
    default:
      console.error('Error: \'' + cmd + '\' is not a valid command!');
      process.exit(1);
  }
})();
