(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.OPZ = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _MIDI = require('./opz.json');

var error = function error(value) {
  console.log('[OPZ]: Untracked midi value. Please create an issue https://github.com/nbw/opz/issues');
  console.log("[OPZ]: ".concat(value));
  return value;
};

var get = function get() {
  var value = _MIDI;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = 0; i < args.length; i++) {
    value = value[args[i]];
    if (!value) throw 'Untracked value';
  }

  return value;
};

var track = function track(input) {
  if (input.length < 1) return null;
  return get('track', input[0]);
};

var action = function action(input) {
  if (input.length < 1) return null;
  return get('action', input[0]);
};

var note = function note(input) {
  if (input.length < 2) return null;
  var n = input[1];
  return {
    value: n,
    note: get('notes', n % 12)
  };
};

var dial = function dial(input) {
  if (input.length < 2) return null;
  var d = input[1];
  return {
    dial: (d - 1) % 4,
    // 0 - 3
    dialColor: get('dial', 'color', d % 100),
    page: Math.floor((d - 1) / 4),
    // 0 - 3
    pageColor: get('dial', 'page', track(input), d % 100)
  };
};

var pitch = function pitch(input) {
  if (input.length < 3) return null;
  return {
    absolute: input[1],
    relative: input[2]
  };
};

var value = function value(input) {
  if (input.length < 3) return null;

  switch (action(input)) {
    case 'keys':
      return note(input);

    case 'dial':
      return dial(input);

    case 'pitch bend':
      return pitch(input);

    default:
      return {};
  }
};

var velocity = function velocity(input) {
  if (input.length < 3) return -1;
  return input[2];
};

var control = function control(input) {
  var c = get('control', input[0]);
  return {
    track: c,
    action: c,
    velocity: velocity(input),
    value: {}
  };
};

var decode = function decode(input) {
  try {
    if (input.length === 1) return control(input);
    if (input.length === 2) return null;
    return {
      track: track(input),
      action: action(input),
      velocity: velocity(input),
      value: value(input)
    };
  } catch (e) {
    error(input);
  }
};

module.exports = {
  decode: decode,
  velocity: velocity
};

},{"./opz.json":2}],2:[function(require,module,exports){
module.exports={
  "dictionary": {
    "action": {
      "dial": "dial",
      "keys": "keys",
      "pitch": "pitch bend"
    },
    "color": {
      "blue": "blue",
      "green": "green",
      "purple": "purple",
      "red": "red",
      "white": "white",
      "yellow": "yellow"
    },
    "track": {
      "arp": "arp",
      "bass": "bass",
      "chord": "chord",
      "fx1": "fx1",
      "fx2": "fx2",
      "kick": "kick",
      "lead": "lead",
      "lights": "lights",
      "master": "master",
      "module": "module",
      "motion": "motion",
      "perc": "perc",
      "perform": "perform",
      "sample": "sample",
      "snare": "snare",
      "tape": "tape"
    },
    "clock": "clock",
    "kill": "kill",
    "start": "start",
    "stop": "stop"
  },
  "control": {
    "248": "clock",
    "250": "start",
    "252": "stop"
  },
  "action": {
    "128": "keys",
    "129": "keys",
    "130": "keys",
    "131": "keys",
    "132": "keys",
    "133": "keys",
    "134": "keys",
    "135": "keys",
    "136": "keys",
    "137": "keys",
    "138": "keys",
    "139": "keys",
    "140": "keys",
    "141": "keys",
    "142": "keys",
    "143": "keys",
    "144": "keys",
    "145": "keys",
    "146": "keys",
    "147": "keys",
    "148": "keys",
    "149": "keys",
    "150": "keys",
    "151": "keys",
    "152": "keys",
    "153": "keys",
    "154": "keys",
    "155": "keys",
    "156": "keys",
    "157": "keys",
    "158": "keys",
    "159": "keys",
    "176": "dial",
    "177": "dial",
    "178": "dial",
    "179": "dial",
    "180": "dial",
    "181": "dial",
    "182": "dial",
    "183": "dial",
    "184": "dial",
    "185": "dial",
    "186": "dial",
    "187": "dial",
    "188": "dial",
    "189": "dial",
    "190": "dial",
    "191": "dial",
    "224": "pitch bend",
    "225": "pitch bend",
    "226": "pitch bend",
    "227": "pitch bend",
    "228": "pitch bend",
    "229": "pitch bend",
    "230": "pitch bend",
    "231": "pitch bend",
    "232": "pitch bend",
    "233": "pitch bend",
    "234": "pitch bend",
    "235": "pitch bend",
    "236": "pitch bend",
    "237": "pitch bend",
    "238": "pitch bend",
    "239": "pitch bend"
  },
  "track": {
    "128": "kick",
    "129": "snare",
    "130": "perc",
    "131": "sample",
    "132": "bass",
    "133": "lead",
    "134": "arp",
    "135": "chord",
    "136": "fx1",
    "137": "fx2",
    "138": "tape",
    "139": "master",
    "140": "perform",
    "141": "module",
    "142": "lights",
    "143": "motion",
    "144": "kick",
    "145": "snare",
    "146": "perc",
    "147": "sample",
    "148": "bass",
    "149": "lead",
    "150": "arp",
    "151": "chord",
    "152": "fx1",
    "153": "fx2",
    "154": "tape",
    "155": "master",
    "156": "perform",
    "157": "module",
    "158": "lights",
    "159": "motion",
    "176": "kick",
    "177": "snare",
    "178": "perc",
    "179": "sample",
    "180": "bass",
    "181": "lead",
    "182": "arp",
    "183": "chord",
    "184": "fx1",
    "185": "fx2",
    "186": "tape",
    "187": "master",
    "188": "perform",
    "189": "lights",
    "190": "lights",
    "191": "motion",
    "224": "kick",
    "225": "snare",
    "226": "perc",
    "227": "sample",
    "228": "bass",
    "229": "lead",
    "230": "arp",
    "231": "chord",
    "232": "fx1",
    "233": "fx2",
    "234": "tape",
    "235": "master",
    "236": "perform",
    "237": "module",
    "238": "lights",
    "239": "motion"
  },
  "notes": {
    "0": "C",
    "1": "C#",
    "2": "D",
    "3": "D#",
    "4": "E",
    "5": "F",
    "6": "F#",
    "7": "G",
    "8": "G#",
    "9": "A",
    "10": "A#",
    "11": "B"
  },
  "dial": {
    "color": {
      "1": "green",
      "2": "blue",
      "3": "yellow",
      "4": "red",
      "5": "green",
      "6": "blue",
      "7": "yellow",
      "8": "red",
      "9": "green",
      "10": "blue",
      "11": "yellow",
      "12": "red",
      "13": "green",
      "14": "blue",
      "15": "yellow",
      "16": "red",
      "123": "kill"
    },
    "page": {
      "kick": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "snare": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "perc": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "sample": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "bass": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "lead": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "arp": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "blue",
        "10": "blue",
        "11": "blue",
        "12": "blue",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "chord": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "fx1": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "fx2": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "tape": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "master": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "perform": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "module": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "lights": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      },
      "motion": {
        "1": "white",
        "2": "white",
        "3": "white",
        "4": "white",
        "5": "green",
        "6": "green",
        "7": "green",
        "8": "green",
        "9": "purple",
        "10": "purple",
        "11": "purple",
        "12": "purple",
        "13": "yellow",
        "14": "yellow",
        "15": "yellow",
        "16": "yellow",
        "123": "kill"
      }
    }
  }
}

},{}]},{},[1])(1)
});
