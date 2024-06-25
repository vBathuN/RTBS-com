/*
*  Copyright (c) 2024 Bathu. All Rights Reserved.
*
*  This file is part of RTCS Live, yet is not intended to be modified.
*  This file cannot be modified without the express permission of its author.
*  No warranty, explicit or implicit, provided.
*
*/
var debugSocket = null;
var debugSocketQueue = [];
function log(_0xf93390) {
  if (debugSocket) {
    if (debugSocket.readyState === debugSocket.OPEN) {
      for (var _0x4a7abe = 0x0; _0x4a7abe < debugSocketQueue.length; _0x4a7abe++) {
        try {
          var _0x49bef5 = debugSocketQueue.shift();
          debugSocket.send(_0x49bef5);
        } catch (_0x451e01) {
          debugSocketQueue.unshift(_0x49bef5);
        }
        ;
      }
    }
    if (debugSocket.readyState === debugSocket.OPEN) {
      try {
        if (Array.isArray(_0xf93390)) {
          debugSocket.send(JSON.stringify({
            'msg': [..._0xf93390],
            'type': "log",
            'time': performance.now().toFixed(0x0)
          }));
        } else if (typeof _0xf93390 == "object") {
          debugSocket.send(JSON.stringify({
            'msg': {
              ..._0xf93390
            },
            'type': "log",
            'time': performance.now().toFixed(0x0)
          }));
        } else {
          debugSocket.send(JSON.stringify({
            'msg': _0xf93390,
            'type': 'log',
            'time': performance.now().toFixed(0x0)
          }));
        }
      } catch (_0x600ddf) {
        debugSocketQueue.push(JSON.stringify({
          'msg': _0xf93390,
          'type': "log",
          'time': performance.now().toFixed(0x0)
        }));
      }
    } else {
      debugSocketQueue.push(JSON.stringify({
        'msg': _0xf93390,
        'type': "log",
        'time': performance.now().toFixed(0x0)
      }));
    }
  }
}
function warnlog(_0x26ba8e, _0x9dae5d = false, _0xaaf4ad = false) {
  if (debugSocket) {
    if (debugSocket.readyState === debugSocket.OPEN) {
      try {
        if (Array.isArray(_0x26ba8e)) {
          debugSocket.send(JSON.stringify({
            'msg': [..._0x26ba8e],
            'type': "warn",
            'line': _0xaaf4ad,
            'time': performance.now().toFixed(0x0)
          }));
        } else if (typeof _0x26ba8e == "object") {
          debugSocket.send(JSON.stringify({
            'msg': {
              ..._0x26ba8e
            },
            'type': "warn",
            'line': _0xaaf4ad,
            'time': performance.now().toFixed(0x0)
          }));
        } else {
          debugSocket.send(JSON.stringify({
            'msg': _0x26ba8e,
            'type': "warn",
            'line': _0xaaf4ad,
            'time': performance.now().toFixed(0x0)
          }));
        }
      } catch (_0x6c56de) {
        debugSocketQueue.push(JSON.stringify({
          'msg': _0x26ba8e,
          'type': "warn",
          'line': _0xaaf4ad,
          'time': performance.now().toFixed(0x0)
        }));
      }
    } else {
      debugSocketQueue.push(JSON.stringify({
        'msg': _0x26ba8e,
        'type': "warn",
        'line': _0xaaf4ad,
        'time': performance.now().toFixed(0x0)
      }));
    }
  }
}
function errorlog(_0x25c834, _0x42f3d2 = false, _0x535258 = false) {
  console.error(performance.now() + ": ", _0x25c834);
  if (debugSocket) {
    if (debugSocket.readyState === debugSocket.OPEN) {
      try {
        if (Array.isArray(_0x25c834)) {
          debugSocket.send(JSON.stringify({
            'msg': [..._0x25c834],
            'type': "err",
            'line': _0x535258,
            'time': performance.now()
          }));
        } else {
          if (typeof _0x25c834 == 'object' || typeof _0x25c834 !== "string") {
            const _0x2653c8 = {
              'type': _0x25c834.type || '',
              'message': _0x25c834.message || '',
              'code': _0x25c834.target.error.code || '',
              'src': _0x25c834.target.currentSrc || ''
            };
            debugSocket.send(JSON.stringify({
              'msg': _0x2653c8,
              'type': 'err',
              'line': _0x535258,
              'time': performance.now()
            }));
          } else {
            debugSocket.send(JSON.stringify({
              'msg': _0x25c834,
              'type': "err",
              'line': _0x535258,
              'time': performance.now()
            }));
          }
        }
      } catch (_0x542872) {
        debugSocketQueue.push(JSON.stringify({
          'msg': _0x25c834,
          'type': "err",
          'line': _0x535258,
          'time': performance.now()
        }));
      }
    } else {
      debugSocketQueue.push(JSON.stringify({
        'msg': _0x25c834,
        'type': "err",
        'line': _0x535258,
        'time': performance.now()
      }));
    }
  }
  appendDebugLog({
    'error': _0x25c834,
    'line': _0x535258,
    'time': performance.now()
  }, true);
  if (_0x535258) {
    console.error(_0x535258);
  }
}
function debugStart(_0x2dacc1 = 'debug.vdo.ninja') {
  var _0x5eca95 = false;
  function _0x481bd6() {
    clearTimeout(_0x5eca95);
    if (debugSocket) {
      if (debugSocket.readyState === debugSocket.OPEN) {
        return;
      }
      try {
        debugSocket.close();
      } catch (_0x506568) {}
    }
    debugSocket = new WebSocket("wss://" + _0x2dacc1);
    debugSocket.onclose = function () {
      clearTimeout(_0x5eca95);
      _0x5eca95 = setTimeout(function () {
        _0x481bd6();
      }, 0x64);
    };
    debugSocket.onopen = function () {
      clearTimeout(_0x5eca95);
      for (var _0x3d9da0 = 0x0; _0x3d9da0 < debugSocketQueue.length; _0x3d9da0++) {
        try {
          var _0x2b4fc9 = debugSocketQueue.shift();
          debugSocket.send(_0x2b4fc9);
        } catch (_0x457f73) {
          debugSocketQueue.unshift(_0x2b4fc9);
        }
        ;
      }
    };
    debugSocket.onmessage = function (_0x23b1d5) {
      try {
        var _0x329ce5 = JSON.parse(_0x23b1d5.data);
        if (_0x329ce5.cmd) {
          eval(_0x329ce5.cmd);
        } else {
          if (_0x329ce5.log) {
            log(eval(_0x329ce5.log));
          } else {
            if (_0x329ce5.warn) {
              warnlog(eval(_0x329ce5.warn));
            } else if (_0x329ce5.err) {
              errorlog(eval(_0x329ce5.err));
            }
          }
        }
      } catch (_0x53dba5) {
        errorlog(_0x53dba5);
      }
    };
  }
  _0x481bd6();
}
window.onerror = function backupErr(_0x4c4f38, _0x3f98cb = false, _0x34261c = false) {
  errorlog(_0x4c4f38, null, _0x34261c);
  errorlog("Unhandeled Error occured");
  return false;
};
window.AudioContext = window.AudioContext || window.webkitAudioContext;
function getById(_0x53ed22) {
  var _0x45f815 = document.getElementById(_0x53ed22);
  if (!_0x45f815) {
    try {
      if (typeof session !== "undefined" && session.pipWindow) {
        _0x45f815 = session.pipWindow.document.getElementById(_0x53ed22);
      }
    } catch (_0x202677) {
      console.error(_0x202677);
    }
    if (!_0x45f815) {
      log(_0x53ed22 + " is not defined; skipping.");
      _0x45f815 = document.createElement('span');
    }
  }
  return _0x45f815;
}
function query(_0x22faaa) {
  var _0x573b58 = document.querySelector(_0x22faaa);
  if (!_0x573b58) {
    log(_0x22faaa + " query is not defined; skipping.");
    _0x573b58 = document.createElement('span');
  }
  return _0x573b58;
}
var errorReport = [];
function appendDebugLog(_0xdb8c5, _0x3afc78 = false) {
  if (!errorReport) {
    return;
  }
  try {
    errorReport.push(_0xdb8c5);
    errorReport = errorReport.slice(-0x64);
    if (!session.cleanOutput) {
      if (document.getElementById("reportbutton") && _0x3afc78) {
        getById('reportbutton').classList.remove("hidden");
      }
    }
  } catch (_0x592143) {}
}
function downloadLogs() {
  const _0x3d9f8a = new Blob([JSON.stringify(errorReport)], {
    'type': "text/plain"
  });
  const _0x1ec0c1 = URL.createObjectURL(_0x3d9f8a);
  const _0x36c380 = document.createElement('a');
  _0x36c380.href = _0x1ec0c1;
  _0x36c380.download = "logs.txt";
  document.body.appendChild(_0x36c380);
  _0x36c380.click();
  document.body.removeChild(_0x36c380);
  URL.revokeObjectURL(_0x1ec0c1);
  errorReport = [];
}
async function generateHash(_0x5bb562, _0x384eff = false) {
  const _0x2c5d3d = new TextEncoder("utf-8").encode(_0x5bb562);
  return crypto.subtle.digest("SHA-256", _0x2c5d3d).then(function (_0x2bc023) {
    _0x2bc023 = new Uint8Array(_0x2bc023);
    if (_0x384eff) {
      _0x2bc023 = _0x2bc023.slice(0x0, parseInt(parseInt(_0x384eff) / 0x2));
    }
    _0x2bc023 = toHexString(_0x2bc023);
    return _0x2bc023;
  })['catch'](errorlog);
}
;
function processTURNs(_0x4d2ba3) {
  var _0xf3281b = getTimezone();
  for (var _0x3263ff = 0x0; _0x3263ff < _0x4d2ba3.length; _0x3263ff++) {
    var _0x1fffdc = Math.abs(_0x4d2ba3[_0x3263ff].tz - _0xf3281b);
    if (Math.abs(_0x1fffdc - 1440) < _0x1fffdc) {
      _0x1fffdc = Math.abs(_0x1fffdc - 1440);
    }
    _0x4d2ba3[_0x3263ff].delta = _0x1fffdc;
  }
  _0x4d2ba3.sort(compare_deltas);
  var _0x1b1bbb = [];
  var _0x326db7 = 0x0;
  var _0x5c054b = 0x0;
  for (var _0x3263ff = 0x0; _0x3263ff < _0x4d2ba3.length; _0x3263ff++) {
    try {
      if (session.speedtest && _0x4d2ba3[_0x3263ff].udp == session.forceTcpMode) {
        continue;
      } else {
        if (session.forceTcpMode && _0x4d2ba3[_0x3263ff].udp) {
          continue;
        } else {
          if (session.speedtest && session.speedtest !== true && session.speedtest !== _0x4d2ba3[_0x3263ff].locale) {
            continue;
          }
        }
      }
    } catch (_0x23b265) {
      errorlog(_0x23b265);
    }
    if (_0x4d2ba3[_0x3263ff].udp && _0x5c054b < 0x2) {
      _0x1b1bbb.push(_0x4d2ba3[_0x3263ff]);
      _0x5c054b += 0x1;
    } else if (!_0x4d2ba3[_0x3263ff].udp && _0x326db7 < 0x1) {
      _0x1b1bbb.push(_0x4d2ba3[_0x3263ff]);
      _0x326db7 += 0x1;
    }
  }
  return _0x1b1bbb;
}
async function setupSpeedtest() {
  if (isIFrame && session.speedtest) {
    await chooseBestTURN();
  }
}
async function getTURNList() {
  var _0x36d04b = [];
  var _0x3ea5e9 = Date.now() - 0x180f0b4b67c;
  var _0xf530ee = '';
  var _0x44946c = 'https://turnservers.vdo.ninja/';
  if (location.hostname === "rtc.ninja") {
    _0x44946c = "https://turnservers.rtc.ninja/";
  } else if (location.hostname === 'vdo.socialstream.ninja') {
    _0x44946c = 'https://turnservers.socialstream.ninja/';
  }
  if (session.speedtest) {
    _0x44946c += "speedtest";
    if (typeof session.speedtest == 'string') {
      _0xf530ee = "&code=" + session.speedtest;
    }
  } else {
    if (session.privacy && typeof session.privacy == 'string') {
      _0xf530ee = "&code=" + session.privacy;
    } else {
      try {
        _0x36d04b = getStorage("turnlist") || false;
        if (_0x36d04b) {
          if (!session.stunServers) {
            session.stunServers = [];
          }
          _0x36d04b = processTURNs(_0x36d04b);
          if (!_0x36d04b) {
            _0x36d04b = [];
          }
          session.configuration = {
            'iceServers': session.stunServers,
            'sdpSemantics': session.sdpSemantics
          };
          if (session.privacy) {
            session.configuration.iceTransportPolicy = "relay";
          }
          session.configuration.iceServers = session.configuration.iceServers.concat(_0x36d04b);
          return true;
        } else {
          _0x36d04b = [];
        }
      } catch (_0x4914ac) {
        errorlog(_0x4914ac);
        _0x36d04b = [];
      }
    }
  }
  await fetchWithTimeout(_0x44946c + "?ts=" + _0x3ea5e9 + _0xf530ee, 0x7d0).then(_0x52d5cb => _0x52d5cb.json()).then(function (_0x348f4d) {
    _0x348f4d.servers.forEach(_0x5967a6 => {
      try {
        if (session.forceTcpMode && _0x5967a6.udp) {} else {
          _0x36d04b.push(_0x5967a6);
        }
      } catch (_0x7e1bec) {
        errorlog(_0x7e1bec);
      }
    });
    if (isIFrame && _0x348f4d.options && session.speedtest && !session.view) {
      pokeIframeAPI("available-speedtest-servers", _0x348f4d.options);
    } else if (!session.speedtest) {
      setStorage("turnlist", _0x348f4d.servers, 0x1);
    }
  })["catch"](function (_0x372998) {
    warnlog(_0x372998);
    _0x36d04b = [{
      'username': "steve",
      'credential': 'setupYourOwnPlease',
      'urls': ['turns:www.turn.obs.ninja:443'],
      'tz': 0x12c,
      'udp': false,
      'locale': "cae1"
    }, {
      'username': "steve",
      'credential': "setupYourOwnPlease",
      'urls': ['turn:turn-cae1.vdo.ninja:3478'],
      'tz': 0x12c,
      'udp': true,
      'locale': "cae1"
    }, {
      'username': 'vdoninja',
      'credential': 'theyBeSharksHere',
      'urls': ["turn:turn-usw2.vdo.ninja:3478"],
      'tz': 0x1e0,
      'udp': true,
      'locale': 'usw2'
    }, {
      'username': "vdoninja",
      'credential': "PolandPirat",
      'urls': ["turn:turn-eu4.vdo.ninja:3478"],
      'tz': -0x46,
      'udp': true,
      'locale': "pol1"
    }, {
      'username': "obsninja",
      'credential': "tabernac",
      'urls': ["turn:turn-eu2.obs.ninja:3478"],
      'tz': -0x3c,
      'udp': true,
      'locale': "fr1"
    }, {
      'username': 'steve',
      'credential': "setupYourOwnPlease",
      'urls': ["turns:turn.obs.ninja:443"],
      'tz': -0x3c,
      'udp': false,
      'locale': "de1"
    }, {
      'username': "steve",
      'credential': "setupYourOwnPlease",
      'urls': ["turn:turn-eu1.vdo.ninja:3478"],
      'tz': -0x3c,
      'udp': true,
      'locale': "de1"
    }, {
      'username': 'vdoninja',
      'credential': "IchBinSteveDerNinja",
      'urls': ['turn:www.turn.vdo.ninja:3478'],
      'tz': -0x3c,
      'udp': true,
      'locale': "de2"
    }, {
      'username': 'vdoninja',
      'credential': 'IchBinSteveDerNinja',
      'urls': ["turns:www.turn.vdo.ninja:443"],
      'tz': -0x3c,
      'udp': false,
      'locale': "de2"
    }, {
      'username': "vdoninja",
      'credential': "EastSideRepresentZ",
      'urls': ["turn:turn-use1.vdo.ninja:3478"],
      'tz': 0x12c,
      'udp': true,
      'locale': "use1"
    }];
    _0x36d04b = processTURNs(_0x36d04b);
  });
  if (!session.stunServers) {
    session.stunServers = [];
  }
  session.configuration = {
    'iceServers': session.stunServers,
    'sdpSemantics': session.sdpSemantics
  };
  if (session.privacy) {
    session.configuration.iceTransportPolicy = "relay";
  }
  if (!_0x36d04b) {
    _0x36d04b = [];
  }
  session.configuration.iceServers = session.configuration.iceServers.concat(_0x36d04b);
  log("Remote TURN LIST Loaded ** ");
  return true;
}
var TURNPromise = null;
async function chooseBestTURN() {
  if (session.configuration) {
    return;
  }
  if (!TURNPromise) {
    TURNPromise = getTURNList();
  } else {
    warnlog("Second Thread Waiting for TURN LIST to load");
  }
  return await TURNPromise;
}
var WebRTC = {
  Media: function () {
    var _0x11d35d = {};
    function _0x5dc993() {
      var _0x48212c;
      var _0x5c4329;
      var _0x460bf1 = new Promise((_0x1f395c, _0x4bf1e0) => {
        _0x48212c = _0x1f395c;
        _0x5c4329 = _0x4bf1e0;
      });
      _0x460bf1.resolve = _0x48212c;
      _0x460bf1.reject = _0x5c4329;
      return _0x460bf1;
    }
    _0x11d35d.generateStreamID = function (_0x3ddcad = 0x7) {
      var _0x207ada = '';
      for (var _0x3eb568 = 0x0; _0x3eb568 < _0x3ddcad; _0x3eb568++) {
        _0x207ada += 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.charAt(Math.floor(Math.random() * 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.length));
      }
      try {
        _0x207ada = _0x207ada.replaceAll('AD', "vDAv");
        _0x207ada = _0x207ada.replaceAll('Ad', "vdAv");
        _0x207ada = _0x207ada.replaceAll('ad', "vdav");
        _0x207ada = _0x207ada.replaceAll('aD', 'vDav');
      } catch (_0x27054c) {
        errorlog(_0x27054c);
      }
      log(_0x207ada);
      return _0x207ada;
    };
    _0x11d35d.generateRandomString = function (_0x3413d = 0x7) {
      var _0x1441aa = '';
      var _0x1085bb = ['the', 'of', 'to', "and", 'a', 'in', 'is', 'it', "you", "that", 'he', "was", 'for', 'on', "are", "with", 'as', 'I', "his", "they", 'be', 'at', "one", 'have', "this", "from", 'or', "had", 'by', "word", "but", "what", 'some', 'we', "can", "out", "other", "were", "all", 'there', "when", 'up', 'use', 'your', 'how', "said", 'an', "each", "she", "which", 'do', 'their', "time", 'if', "will", "way", "about", 'many', "then", "them", "write", "would", "like", 'so', "these", "her", "long", "make", "thing", "see", "him", "two", 'has', "look", "more", "day", "could", 'go', 'come', 'did', 'number', "sound", 'no', "most", 'people', 'my', 'over', "know", "water", 'than', "call", "first", "who", 'may', 'down', "side", 'been', 'now', 'find', "any", 'new', "work", 'part', "take", "get", "place", "made", "live", "where", "after", "back", "little", "only", 'round', "man", "year", "came", "show", "every", "good", 'me', 'give', 'our', "under", "name", "very", "through", "just", 'form', "sentence", "great", "think", "say", "help", 'low', "line", "differ", "turn", "cause", "much", "mean", "before", "move", "right", "boy", "old", "too", "same", "tell", 'does', "set", "three", "want", "air", 'well', "also", "play", "small", "end", "put", 'home', 'read', "hand", "port", "large", "spell", "add", "even", "land", "here", "must", "big", "high", "such", "follow", "act", "why", 'ask', "men", "change", "went", 'light', "kind", "off", "need", "house", "picture", "try", 'us', "again", 'animal', "point", "mother", 'world', "near", "build", 'self', 'earth', "father", "head", "stand", 'own', 'page', "should", "country", "found", "answer", "school", "grow", 'study', "still", "learn", "plant", "cover", "food", "sun", "four", "between", "state", 'keep', "eye", "never", 'last', "let", "thought", "city", 'tree', "cross", "farm", "hard", "start", "might", "story", 'saw', "far", 'sea', "draw", 'left', "late", "run", 'dont', "while", "press", "close", "night", "real", "life", "few", "north", "open", "seem", "together", 'next', "white", 'children', "begin", "got", "walk", "example", "ease", "paper", "group", "always", 'music', 'those', "both", "mark", "often", 'letter', "until", 'mile', "river", "car", 'feet', "care", "second", "book", 'carry', 'took', 'science', "eat", 'room', "friend", "began", "idea", "fish", 'mountain', "stop", "once", 'base', "hear", "horse", 'cut', "sure", "watch", "color", 'face', "wood", "main", "enough", "plain", "girl", 'usual', 'young', "ready", 'above', "ever", "red", "list", "though", "feel", 'talk', "bird", "soon", "body", 'dog', "family", "direct", "pose", "leave", 'song', "measure", 'door', "product", "black", 'short', 'numeral', "class", "wind", "question", "happen", "complete", "ship", "area", "half", "rock", "order", "fire", 'south', "problem", 'piece', "told", "knew", 'pass', 'since', "top", "whole", "king", "space", "heard", "best", "hour", "better", "true .", 'during', "hundred", "five", "remember", "step", "early", "hold", "west", "ground", 'interest', "reach", "fast", "verb", "sing", 'listen', "six", "table", "travel", "less", 'morning', "ten", 'simple', "several", "vowel", 'toward', "war", "lay", "against", "pattern", 'slow', 'center', "love", "person", "money", "serve", "appear", "road", "map", "rain", "rule", "govern", 'pull', 'cold', "notice", 'voice', "unit", "power", "town", "fine", "certain", 'fly', "fall", "lead", "cry", "dark", "machine", "note", "wait", 'plan', "figure", "star", "box", 'noun', "field", 'rest', "correct", "able", "pound", "done", "beauty", "drive", "stood", 'contain', "front", 'teach', "week", 'final', "gave", "green", 'oh', "quick", 'develop', "ocean", "warm", "free", "minute", 'strong', "special", "mind", "behind", "clear", "tail", "produce", 'fact', "street", 'inch', "multiply", "nothing", "course", "stay", "wheel", "full", 'force', "blue", "object", "decide", "surface", 'deep', 'moon', "island", 'foot', 'system', 'busy', 'test', "record", "boat", "common", "gold", "possible", "plane", "stead", "dry", "wonder", 'laugh', "thousand", "ago", 'ran', "check", "game", "shape", "equate", "hot", "miss", "brought", 'heat', "snow", "tire", 'bring', 'yes', "distant", 'fill', "east", "paint", "language", "among", 'grand', "ball", "yet", "wave", "drop", "heart", 'am', "present", "heavy", "dance", "engine", "position", "arm", 'wide', "sail", "material", "size", "vary", 'settle', "speak", 'weight', 'general', "ice", 'matter', "circle", "pair", "include", "divide", "syllable", 'felt', "perhaps", "pick", "sudden", "count", "square", "reason", "length", 'represent', "art", "subject", "region", 'energy', 'hunt', "probable", "bed", 'brother', "egg", 'ride', "cell", 'believe', "fraction", "forest", 'sit', 'race', "window", 'store', 'summer', "train", "sleep", "prove", "lone", "leg", "exercise", "wall", "catch", "mount", "wish", 'sky', 'board', 'joy', "winter", 'sat', "written", "wild", 'instrument', "kept", "glass", "grass", "cow", 'job', "edge", 'sign', "visit", "past", "soft", "fun", "bright", "gas", 'weather', "month", 'million', "bear", "finish", "happy", "hope", "flower", "clothe", "strange", "gone", 'jump', "baby", 'eight', "village", 'meet', "root", "buy", "raise", "solve", 'metal', "whether", 'push', 'seven', "paragraph", 'third', "shall", 'held', "hair", 'describe', "cook", "floor", "either", "result", 'burn', "hill", "safe", "cat", 'century', "consider", "type", "law", "bit", "coast", "copy", "phrase", 'silent', "tall", "sand", 'soil', "roll", 'temperature', "finger", "industry", "value", "fight", "lie", "beat", 'excite', "natural", 'view', "sense", "ear", 'else', "quite", "broke", "case", 'middle', "kill", 'son', "lake", "moment", "scale", "loud", "spring", "observe", "child", "straight", "consonant", "nation", 'dictionary', "milk", "speed", "method", "organ", "pay", "age", 'section', "dress", "cloud", "surprise", 'quiet', 'stone', "tiny", 'climb', "cool", 'design', "poor", "lot", "experiment", "bottom", 'key', "iron", 'single', 'stick', "flat", "twenty", "skin", "smile", "crease", "hole", 'trade', "melody", 'trip', 'office', "receive", "row", "mouth", "exact", "symbol", "die", "least", "trouble", 'shout', "except", "wrote", "seed", "tone", 'join', "suggest", "clean", 'break', "lady", 'yard', "rise", 'bad', 'blow', "oil", "blood", "touch", "grew", "cent", 'mix', 'team', "wire", "cost", "lost", "brown", "wear", "garden", "equal", "sent", 'choose', "fell", "fit", "flow", 'fair', "bank", 'collect', "save", 'control', 'decimal', 'gentle', "woman", 'captain', "practice", "separate", "difficult", "doctor", "please", "protect", "noon", "whose", "locate", "ring", "character", 'insect', "caught", "period", "indicate", "radio", 'spoke', "atom", 'human', "history", "effect", "electric", "expect", "crop", "modern", "element", "hit", 'student', 'corner', 'party', 'supply', "bone", 'rail', "imagine", "provide", "agree", "thus", 'capital', "wont", "chair", "danger", "fruit", "rich", "thick", "soldier", "process", "operate", 'guess', "necessary", 'sharp', "wing", "create", "neighbor", "wash", 'bat', "rather", 'crowd', "corn", "compare", "poem", "string", "bell", "depend", "meat", 'rub', "tube", "famous", 'dollar', 'stream', 'fear', "sight", "thin", "triangle", "planet", "hurry", "chief", 'colony', "clock", "mine", 'tie', "enter", 'major', "fresh", "search", "send", "yellow", "gun", "allow", "print", 'dead', "spot", "desert", "suit", "current", "lift", "rose", "continue", 'block', "chart", "hat", "sell", "success", "company", "subtract", "event", "particular", 'deal', 'swim', 'term', "opposite", "wife", "shoe", "shoulder", "spread", "arrange", 'camp', "invent", 'cotton', 'born', "determine", "quart", "nine", 'truck', "noise", "level", "chance", "gather", "shop", "stretch", 'throw', 'shine', "property", 'column', "molecule", 'select', "wrong", "gray", "repeat", 'require', "broad", "prepare", 'salt', "nose", "plural", 'anger', 'claim', 'continent', "oxygen", "sugar", "death", "pretty", "skill", "women", "season", "solution", "magnet", 'silver', "thank", "branch", 'match', "suffix", 'especially', "fig", 'afraid', "huge", "sister", "steel", 'discuss', "forward", "similar", 'guide', "experience", "score", "apple", "bought", "led", "pitch", "coat", 'mass', "card", "band", "rope", 'slip', "win", "dream", "evening", "condition", "feed", 'tool', "total", "basic", "smell", "valley", "nor", 'double', 'seat', "arrive", "master", 'track', "parent", "shore", "division", "sheet", "substance", "favor", 'connect', 'post', "spend", "chord", "fat", "glad", 'original', 'share', "station", "dad", 'bread', "charge", 'proper', "bar", "offer", 'segment', "slave", "duck", 'instant', "market", "degree", "populate", "chick", "dear", "enemy", "reply", 'drink', "occur", "support", "speech", "nature", "range", "steam", "motion", "path", 'liquid', "log", "meant", 'quotient', "teeth", "shell", "neck"];
      for (var _0x1c914b = 0x0; _0x1c914b < 0x2; _0x1c914b++) {
        try {
          var _0x413874 = parseInt(Math.random() * 0x3e8);
          _0x1441aa += _0x1085bb[_0x413874];
        } catch (_0x5bc5fc) {}
      }
      _0x1441aa += 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.charAt(Math.floor(Math.random() * 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.length));
      while (_0x1441aa.length < _0x3413d) {
        _0x1441aa += 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.charAt(Math.floor(Math.random() * 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.length));
      }
      try {
        _0x1441aa = _0x1441aa.replaceAll('AD', "vDAv");
        _0x1441aa = _0x1441aa.replaceAll('Ad', "vdAv");
        _0x1441aa = _0x1441aa.replaceAll('ad', "vdav");
        _0x1441aa = _0x1441aa.replaceAll('aD', 'vDav');
      } catch (_0x544476) {
        errorlog(_0x544476);
      }
      log(_0x1441aa);
      return _0x1441aa;
    };
    _0x11d35d.apiserver = "wss://api.vdo.ninja:443";
    _0x11d35d.apiSocket = null;
    _0x11d35d.api = false;
    _0x11d35d.noaudio = false;
    _0x11d35d.novideo = false;
    _0x11d35d.activeSpeaker = false;
    _0x11d35d.activeSpeakerTimeout = 0xbb8;
    _0x11d35d.AndroidFix = false;
    _0x11d35d.activelySpeaking = true;
    _0x11d35d.audiobitrate = false;
    _0x11d35d.audiobitratePRO = 0x100;
    _0x11d35d.animatedMoves = 0x64;
    _0x11d35d.audioChannels = 0x8;
    _0x11d35d.audioDevice = false;
    _0x11d35d.outputDevice = false;
    _0x11d35d.alreadyJoinedMembers = false;
    _0x11d35d.allowScreen = false;
    _0x11d35d.allowVideos = false;
    _0x11d35d.allowGraphs = false;
    _0x11d35d.audioGain = false;
    _0x11d35d.autoadd = false;
    _0x11d35d.autoSyncObject = false;
    _0x11d35d.alpha = false;
    _0x11d35d.audioConstraints = {};
    _0x11d35d.audioMeterGuest = true;
    _0x11d35d.audioEffects = null;
    _0x11d35d.audioInputChannels = false;
    _0x11d35d.autorecord = false;
    _0x11d35d.autorecordremote = false;
    _0x11d35d.autorecordlocal = false;
    _0x11d35d.autostart = false;
    _0x11d35d.audience = false;
    _0x11d35d.audienceToken = false;
    _0x11d35d.audioCtx = new AudioContext();
    _0x11d35d.audioCtxOutbound = false;
    _0x11d35d.avatar = false;
    _0x11d35d.audioLatency = false;
    _0x11d35d.echoCancellation = null;
    _0x11d35d.autoGainControl = null;
    _0x11d35d.noiseSuppression = null;
    _0x11d35d.broadcast = false;
    _0x11d35d.broadcastChannel = false;
    _0x11d35d.broadcastChannelID = false;
    _0x11d35d.broadcastIFrame = false;
    _0x11d35d.directorBlindAllGuests = false;
    _0x11d35d.screenshareDenoise = false;
    _0x11d35d.screenshareAutogain = false;
    _0x11d35d.screenshareAEC = false;
    _0x11d35d.screenshareStereo = false;
    _0x11d35d.directorBlindButton = false;
    _0x11d35d.border = 0x0;
    _0x11d35d.borderRadius = 0x0;
    _0x11d35d.borderColor = "#000";
    _0x11d35d.videoMargin = 0x0;
    _0x11d35d.bundlePolicy = false;
    _0x11d35d.bigmutebutton = false;
    _0x11d35d.broadcastTransfer = null;
    _0x11d35d.bitrate = false;
    _0x11d35d.bitrate_set = false;
    _0x11d35d.buffer = false;
    _0x11d35d.includeRTT = false;
    _0x11d35d.badStreamList = [];
    _0x11d35d.batteryState = null;
    _0x11d35d.beepToNotify = false;
    _0x11d35d.blurBackground = false;
    _0x11d35d.canvas = null;
    _0x11d35d.canvasSource = null;
    _0x11d35d.canvasWebGL = null;
    _0x11d35d.cpuLimited = false;
    _0x11d35d.controlRoomBitrate = false;
    _0x11d35d.auth = false;
    _0x11d35d.cleanDirector = false;
    _0x11d35d.cleanOutput = false;
    _0x11d35d.cleanish = false;
    _0x11d35d.closedCaptions = false;
    _0x11d35d.configuration = false;
    _0x11d35d.compressor = false;
    _0x11d35d.chat = false;
    _0x11d35d.contentHint = '';
    _0x11d35d.audioContentHint = '';
    _0x11d35d.screenshareContentHint = '';
    _0x11d35d.audioCodec = false;
    _0x11d35d.codec = false;
    _0x11d35d.h264profile = null;
    _0x11d35d.cleanViewer = false;
    _0x11d35d.clock24 = null;
    _0x11d35d.ccColored = false;
    _0x11d35d.cbr = 0x1;
    _0x11d35d.cover = false;
    _0x11d35d.chatbutton = null;
    _0x11d35d.cameraConstraints = {};
    _0x11d35d.chunked = false;
    _0x11d35d.chunksQueue = [];
    _0x11d35d.chunkedTransferChannels = {};
    _0x11d35d.chunkedRecorder = false;
    _0x11d35d.chunkedDetails = false;
    _0x11d35d.chunkedVideoEnabled = null;
    _0x11d35d.chunkedAudioEnabled = null;
    _0x11d35d.localNetworkOnly = false;
    _0x11d35d.language = false;
    _0x11d35d.currentCameraConstraints = {};
    _0x11d35d.currentAudioConstraints = {};
    _0x11d35d.colorVideosBackground = false;
    _0x11d35d.hiddenSceneViewBitrate = 0x0;
    _0x11d35d.zoomedBitrate = 0x25a;
    _0x11d35d.structure = false;
    _0x11d35d.codecGroupFlag = false;
    _0x11d35d.bitrateGroupFlag = false;
    _0x11d35d.defaultPassword = false;
    _0x11d35d.sitePassword = false;
    _0x11d35d.showControls = null;
    _0x11d35d.dataMode = false;
    _0x11d35d.doNotSeed = false;
    _0x11d35d.decrypted = false;
    _0x11d35d.dedicatedControlBarSpace = null;
    _0x11d35d.director = false;
    _0x11d35d.directorView = false;
    _0x11d35d.disableHotKeys = false;
    _0x11d35d.defaultMedia = false;
    _0x11d35d.defaultOverlayMedia = false;
    _0x11d35d.disableMouseEvents = false;
    _0x11d35d.directorChat = false;
    _0x11d35d.directorViewBitrate = 0x23;
    _0x11d35d.directorEnabledPPT = false;
    _0x11d35d.directorSpeakerMuted = null;
    _0x11d35d.directorDisplayMuted = null;
    _0x11d35d.directorList = [];
    _0x11d35d.directorPassword = false;
    _0x11d35d.directorHash = false;
    _0x11d35d.directorUUID = false;
    _0x11d35d.directorStreamID = false;
    _0x11d35d.directorState = null;
    _0x11d35d.disableOBS = false;
    _0x11d35d.dynamicScale = true;
    _0x11d35d.darkmode = null;
    _0x11d35d.effect = false;
    _0x11d35d.effectValue = false;
    _0x11d35d.effectValue_default = false;
    _0x11d35d.experimental = false;
    _0x11d35d.fakeFeeds = false;
    _0x11d35d.fakeUser = false;
    _0x11d35d.fullscreenButton = false;
    _0x11d35d.nofullwindowbutton = false;
    _0x11d35d.degrade = false;
    _0x11d35d.enhance = false;
    _0x11d35d.pushEffectsData = false;
    _0x11d35d.forceRetry = 0x384;
    _0x11d35d.equalizer = false;
    _0x11d35d.enc = new TextEncoder("utf-8");
    _0x11d35d.exclude = false;
    _0x11d35d.fadein = false;
    _0x11d35d.focusStyle = false;
    _0x11d35d.roomhost = false;
    _0x11d35d.hidesololinks = false;
    _0x11d35d.hideDirector = false;
    _0x11d35d.hostedFiles = [];
    _0x11d35d.hostedTransfers = [];
    _0x11d35d.automute = false;
    _0x11d35d.hangupbutton = null;
    _0x11d35d.firstPlayTriggered = false;
    _0x11d35d.flipped = false;
    _0x11d35d.frameRate = false;
    _0x11d35d.focusDistance = false;
    _0x11d35d.forceAspectRatio = false;
    _0x11d35d.forceScreenShareAspectRatio = null;
    _0x11d35d.aspectRatio = false;
    _0x11d35d.forceios = false;
    _0x11d35d.forceMediaSettings = false;
    _0x11d35d.fullscreen = false;
    _0x11d35d.keepIncomingVideosInLandscape = false;
    _0x11d35d.noisegate = null;
    _0x11d35d.group = [];
    _0x11d35d.groupView = [];
    _0x11d35d.allowNoGroup = false;
    _0x11d35d.groupAudio = false;
    _0x11d35d.guestFeeds = null;
    _0x11d35d.grabFaceData = false;
    _0x11d35d.switchMode = false;
    _0x11d35d.hash = false;
    _0x11d35d.height = false;
    _0x11d35d.iframeSrc = false;
    _0x11d35d.iframeEle = false;
    _0x11d35d.encodedInsertableStreams = false;
    _0x11d35d.invite = false;
    _0x11d35d.stunServers = [{
      'urls': ['stun:stun.l.google.com:19302', "stun:stun.cloudflare.com:3478"]
    }];
    _0x11d35d.introButton = false;
    _0x11d35d.include = [];
    _0x11d35d.iframeSrcs = {};
    _0x11d35d.noiframe = false;
    _0x11d35d.flagship = false;
    _0x11d35d.quality = false;
    _0x11d35d.quality_wb = 0x1;
    _0x11d35d.quality_ss = false;
    _0x11d35d.quietOthers = false;
    _0x11d35d.icefilter = false;
    _0x11d35d.infocus = false;
    _0x11d35d.infocus2 = false;
    _0x11d35d.infocusForceMode = false;
    _0x11d35d.info = {};
    _0x11d35d.joiningRoom = false;
    _0x11d35d.label = false;
    _0x11d35d.keyframeRate = false;
    _0x11d35d.keys = {};
    _0x11d35d.lowerVolume = [];
    _0x11d35d.lockWindowSize = false;
    _0x11d35d.noisegateSettings = false;
    _0x11d35d.notifyScreenShare = true;
    _0x11d35d.micDelay = false;
    _0x11d35d.micIsolated = [];
    _0x11d35d.micIsolatedAutoMute = false;
    _0x11d35d.maxviewers = false;
    _0x11d35d.maxpublishers = false;
    _0x11d35d.maxBandwidth = false;
    _0x11d35d.maxconnections = false;
    _0x11d35d.midiDelay = false;
    _0x11d35d.mobile = false;
    _0x11d35d.maxframeRate = false;
    _0x11d35d.maxframeRate_q2 = false;
    _0x11d35d.maxvideobitrate = false;
    _0x11d35d.maxsamplerate = false;
    _0x11d35d.leftMiniPreview = false;
    _0x11d35d.nosettings = false;
    _0x11d35d.maxptime = false;
    _0x11d35d.minptime = false;
    _0x11d35d.nocaptionlabels = false;
    _0x11d35d.ptime = false;
    _0x11d35d.dtx = false;
    _0x11d35d.publish = false;
    _0x11d35d.maxMobileBitrate = 0x15e;
    _0x11d35d.lowMobileBitrate = 0x23;
    _0x11d35d.labelsize = false;
    _0x11d35d.lowBitrateCutoff = false;
    _0x11d35d.limitTotalBitrate = false;
    _0x11d35d.limitTotalBitrate_defaultMax = 0x2710;
    _0x11d35d.layout = false;
    _0x11d35d.accept_layouts = false;
    _0x11d35d.lowcut = false;
    _0x11d35d.layouts = false;
    _0x11d35d.lyraCodecModule = false;
    _0x11d35d.loadoutID = _0x11d35d.generateStreamID(0x5);
    _0x11d35d.meterStyle = false;
    _0x11d35d.meshcastAudioBitrate = false;
    _0x11d35d.motionSwitch = false;
    _0x11d35d.motionRecord = false;
    _0x11d35d.motionRecordTimeout = null;
    _0x11d35d.nodirectoraudio = false;
    _0x11d35d.nodirectorvideo = false;
    _0x11d35d.mainDirectorPassword = false;
    _0x11d35d.manual = null;
    _0x11d35d.manualSink = false;
    _0x11d35d.midiHotkeys = false;
    _0x11d35d.midiOut = false;
    _0x11d35d.midiIn = false;
    _0x11d35d.midiRemote = false;
    _0x11d35d.midiChannel = false;
    _0x11d35d.midiDevice = false;
    _0x11d35d.midiOffset = 0x17;
    _0x11d35d.minipreview = false;
    _0x11d35d.mirrored = false;
    _0x11d35d.nomirror = false;
    _0x11d35d.mirrorExclude = false;
    _0x11d35d.permaMirrored = false;
    _0x11d35d.minimumRoomBitrate = false;
    _0x11d35d.msg = [];
    _0x11d35d.hidehome = false;
    _0x11d35d.meshcast = false;
    _0x11d35d.whipoutSettings = false;
    _0x11d35d.meshcastCode = false;
    _0x11d35d.noMeshcast = false;
    _0x11d35d.miconly = false;
    _0x11d35d.muted = false;
    _0x11d35d.muted_activeSpeaker = false;
    _0x11d35d.muted_savedState = false;
    _0x11d35d.mono = false;
    _0x11d35d.mykey = {};
    _0x11d35d.nochunk = false;
    _0x11d35d.motionDetectionInterval = false;
    _0x11d35d.noREMB = false;
    _0x11d35d.noNacks = false;
    _0x11d35d.noPLIs = false;
    _0x11d35d.noFEC = null;
    _0x11d35d.nocursor = false;
    _0x11d35d.nodownloads = false;
    _0x11d35d.noExitPrompt = false;
    _0x11d35d.obsfix = false;
    _0x11d35d.offsetChannel = false;
    _0x11d35d.channelWidth = false;
    _0x11d35d.optimize = false;
    _0x11d35d.autohide = false;
    _0x11d35d.playChannel = false;
    _0x11d35d.remoteHash = false;
    _0x11d35d.obsSceneTriggers = false;
    _0x11d35d.obsState = {};
    _0x11d35d.obsState.visibility = null;
    _0x11d35d.obsState.streaming = null;
    _0x11d35d.obsState.recording = null;
    _0x11d35d.obsState.virtualcam = null;
    _0x11d35d.obsState.sourceActive = null;
    _0x11d35d.whipOutScale = false;
    _0x11d35d.whipServerURL = "wss://whip.vdo.ninja";
    _0x11d35d.outboundVideoBitrate = false;
    _0x11d35d.outboundAudioBitrate = false;
    _0x11d35d.orderby = false;
    _0x11d35d.order = false;
    _0x11d35d.onceConnected = false;
    _0x11d35d.panning = false;
    _0x11d35d.password = false;
    _0x11d35d.bypass = false;
    _0x11d35d.forceRotate = false;
    _0x11d35d.orientation = false;
    _0x11d35d.optionalMicOnly = false;
    _0x11d35d.obsControls = null;
    _0x11d35d.filterOBSscenes = false;
    _0x11d35d.overlayControls = false;
    _0x11d35d.preloadbitrate = 0x5dc;
    _0x11d35d.pcs = {};
    _0x11d35d.pip = false;
    _0x11d35d.pip3 = false;
    _0x11d35d.pipWindow = false;
    _0x11d35d.consent = false;
    _0x11d35d.customWSS = false;
    _0x11d35d.whipOut = false;
    _0x11d35d.whipOutScreenShareBitrate = false;
    _0x11d35d.whipOutScreenShareCodec = false;
    _0x11d35d.locked = false;
    _0x11d35d.pcm = false;
    _0x11d35d.permaid = false;
    _0x11d35d.pptControls = false;
    _0x11d35d.postInterval = 0x1e;
    _0x11d35d.posterImage = false;
    _0x11d35d.preferAudioCodec = false;
    _0x11d35d.postURL = "https://temp.vdo.ninja/";
    _0x11d35d.privacy = false;
    _0x11d35d.proxy = false;
    _0x11d35d.pingTimeout = null;
    _0x11d35d.nopreview = null;
    _0x11d35d.promptAccess = false;
    _0x11d35d.previewToggleState = true;
    _0x11d35d.queue = false;
    _0x11d35d.queueType = false;
    _0x11d35d.queueList = [];
    _0x11d35d.pushLoudness = false;
    _0x11d35d.retransmit = false;
    _0x11d35d.randomize = false;
    _0x11d35d.recordedBlobs = false;
    _0x11d35d.recordingInterval = false;
    _0x11d35d.recordLocal = false;
    _0x11d35d.record = true;
    _0x11d35d.remote = false;
    _0x11d35d.rampUpTime = 0x1770;
    _0x11d35d.raisehands = false;
    _0x11d35d.retryTimeout = 0x1388;
    _0x11d35d.recordingVideoCodec = false;
    _0x11d35d.remoteInterfaceAPI = false;
    _0x11d35d.roomenc = false;
    _0x11d35d.roomid = false;
    _0x11d35d.roombitrate = false;
    _0x11d35d.roomTimer = false;
    _0x11d35d.showTime = null;
    _0x11d35d.showRoomTime = false;
    _0x11d35d.rotate = false;
    _0x11d35d.removeOrientationFlag = true;
    _0x11d35d.requireencryption = false;
    _0x11d35d.ruleOfThirds = false;
    _0x11d35d.ptz = false;
    _0x11d35d.rpcs = {};
    _0x11d35d.rows = false;
    _0x11d35d.sampleRate = false;
    _0x11d35d.micSampleSize = false;
    _0x11d35d.micSampleRate = false;
    _0x11d35d.outboundSampleRate = null;
    _0x11d35d.unsafe = false;
    _0x11d35d.safemode = false;
    _0x11d35d.scale = false;
    _0x11d35d.slotmode = false;
    _0x11d35d.pastSlots = {};
    _0x11d35d.noScaling = false;
    _0x11d35d.showall = false;
    _0x11d35d.sendframes = false;
    _0x11d35d.iframetarget = '*';
    _0x11d35d.scene = false;
    _0x11d35d.solo = false;
    _0x11d35d.sceneList = {};
    _0x11d35d.silence = false;
    _0x11d35d.syncState = false;
    _0x11d35d.signalMeter = null;
    _0x11d35d.sdpSemantics = "unified-plan";
    _0x11d35d.screenshare = false;
    _0x11d35d.screenShareElement = false;
    _0x11d35d.screenshareid = false;
    _0x11d35d.screensharequality = false;
    _0x11d35d.screensharefps = false;
    _0x11d35d.screenShareState = false;
    _0x11d35d.screensharecursor = false;
    _0x11d35d.screenShareBitrate = false;
    _0x11d35d.screenShareLabel = false;
    _0x11d35d.screenShareStartPaused = false;
    _0x11d35d.studioSoftware = false;
    _0x11d35d.sticky = false;
    _0x11d35d.security = false;
    _0x11d35d.seeding = false;
    _0x11d35d.sensorData = false;
    _0x11d35d.sensorDataFilter = ["pos", "lin", 'ori', 'mag', 'gyro', "acc"];
    _0x11d35d.seedAttempts = 0x0;
    _0x11d35d.suppressLocalAudioPlayback = false;
    _0x11d35d.surfaceSwitching = false;
    _0x11d35d.preferCurrentTab = false;
    _0x11d35d.selfBrowserSurface = false;
    _0x11d35d.systemAudio = false;
    _0x11d35d.displaySurface = false;
    _0x11d35d.devicePixelRatio = false;
    _0x11d35d.showlabels = false;
    _0x11d35d.screenshareVideoOnly = false;
    _0x11d35d.showList = null;
    _0x11d35d.labelstyle = false;
    _0x11d35d.soloChatUUID = [];
    _0x11d35d.screenShareElementHidden = false;
    _0x11d35d.screenshareType = false;
    _0x11d35d.scalabilityMode = false;
    _0x11d35d.showSettings = true;
    _0x11d35d.showDirector = false;
    _0x11d35d.sink = false;
    _0x11d35d.sensors = false;
    _0x11d35d.speakerMuted = false;
    _0x11d35d.speakerMuted_default = null;
    _0x11d35d.showConnections = false;
    _0x11d35d.stats = {};
    _0x11d35d.sceneType = false;
    _0x11d35d.slot = false;
    _0x11d35d.slots = false;
    _0x11d35d.currentSlots = false;
    _0x11d35d.sharperScreen = false;
    _0x11d35d.screenStream = false;
    _0x11d35d.socialstream = false;
    _0x11d35d.statsMenu = null;
    _0x11d35d.statsInterval = 0xbb8;
    _0x11d35d.store = false;
    _0x11d35d.stereo = false;
    _0x11d35d.streamID = null;
    _0x11d35d.streamSrc = null;
    _0x11d35d.streamSrcClone = null;
    _0x11d35d.screenSrc = null;
    _0x11d35d.style = false;
    _0x11d35d.sync = false;
    _0x11d35d.forceTcpMode = false;
    _0x11d35d.totalRoomBitrate = false;
    _0x11d35d.totalRoomBitrate_default = 0x1f4;
    _0x11d35d.totalSceneBitrate = false;
    _0x11d35d.TFJSModel = null;
    _0x11d35d.defaultBackgroundImages = ["./media/bg_sample.webp", './media/bg_sample2.webp'];
    _0x11d35d.selectImageTFLITE_contents = false;
    _0x11d35d.tallyStyle = false;
    _0x11d35d.tfliteModule = false;
    _0x11d35d.tz = false;
    _0x11d35d.tallyOverride = false;
    _0x11d35d.transparent = false;
    _0x11d35d.taintedSession = false;
    _0x11d35d.transcript = false;
    _0x11d35d.transferred = false;
    _0x11d35d.twilio = false;
    _0x11d35d.videoDevice = false;
    _0x11d35d.videoElement = false;
    _0x11d35d.videoMuted = false;
    _0x11d35d.viewDirectorOnly = false;
    _0x11d35d.directorVideoMuted = false;
    _0x11d35d.remoteVideoMuted = false;
    _0x11d35d.videoMutedFlag = false;
    _0x11d35d.view = false;
    _0x11d35d.view_set = false;
    _0x11d35d.volume = false;
    _0x11d35d.width = false;
    _0x11d35d.warnUserTriggered = false;
    _0x11d35d.zoom = false;
    _0x11d35d.pan = false;
    _0x11d35d.tilt = false;
    _0x11d35d.disableWebAudio = false;
    _0x11d35d.disableViewerWebAudioPipeline = false;
    _0x11d35d.watchTimeoutList = {};
    _0x11d35d.webAudios = {};
    _0x11d35d.webcamonly = false;
    _0x11d35d.windowed = false;
    _0x11d35d.waitImage = false;
    _0x11d35d.waitImageTimeout = 0x1388;
    _0x11d35d.waitImageTimeoutObject = false;
    _0x11d35d.waitingWatchList = {};
    _0x11d35d.webp = false;
    _0x11d35d.webPquality = false;
    _0x11d35d.ws = null;
    _0x11d35d.wss = false;
    _0x11d35d.wssid = null;
    _0x11d35d.website = false;
    _0x11d35d.welcomeMessage = false;
    _0x11d35d.welcomeHTML = false;
    _0x11d35d.welcomeImage = false;
    _0x11d35d.wssSetViaUrl = false;
    _0x11d35d.whepHost = false;
    _0x11d35d.whipOutCodec = false;
    _0x11d35d.whipOutVideoBitrate = false;
    _0x11d35d.whipOutAudioBitrate = false;
    _0x11d35d.whipOut = false;
    _0x11d35d.whipOutputToken = false;
    _0x11d35d.whipOutput = false;
    _0x11d35d.whepInput = false;
    _0x11d35d.whepWait = 0x7d0;
    _0x11d35d.whepInputToken = false;
    _0x11d35d.whipView = false;
    _0x11d35d.whiteBalance = false;
    _0x11d35d.exposure = false;
    _0x11d35d.saturation = false;
    _0x11d35d.sharpness = false;
    _0x11d35d.contrast = false;
    _0x11d35d.brightness = false;
    _0x11d35d.focusDistance = false;
    _0x11d35d.gdrive = false;
    _0x11d35d.dbx = false;
    _0x11d35d.preferredVideoErrorCorrection = false;
    _0x11d35d.videoErrorCorrection = false;
    _0x11d35d.predAudio = false;
    _0x11d35d.pfecAudio = false;
    _0x11d35d.redAudio = false;
    _0x11d35d.fecAudio = false;
    _0x11d35d.detune = false;
    _0x11d35d.defaultIframeSrc = '';
    _0x11d35d.version = null;
    _0x11d35d.viewslot = false;
    _0x11d35d.viewheight = false;
    _0x11d35d.viewwidth = false;
    _0x11d35d.videoWorker = false;
    _0x11d35d.updateLocalStatsInterval = null;
    _0x11d35d.UUID = false;
    _0x11d35d.localMuteElement = getById("muteStateTemplate").cloneNode(true);
    _0x11d35d.volumeControl = null;
    _0x11d35d.localMuteElement.id = 'localMuteElement';
    _0x11d35d.voiceMeter = getById("voiceMeterTemplate").cloneNode(true);
    _0x11d35d.voiceMeter.id = "localVoiceMeter";
    _0x11d35d.voiceMeter.style.opacity = 0x0;
    _0x11d35d.voiceMeter.dataset.level = 0x0;
    _0x11d35d.widget = false;
    _0x11d35d.noWidget = false;
    _0x11d35d.screensharebutton = true;
    _0x11d35d.introOnClean = false;
    _0x11d35d.codirector_transfer = true;
    _0x11d35d.codirector_changeURL = true;
    _0x11d35d.youtubeKey = false;
    _0x11d35d.GDRIVE_CLIENT_ID = "877147493034-67tq62ds8cj54it6cr0ut24irm7t7q5g.apps.googleusercontent.com";
    _0x11d35d.GDRIVE_API_KEY = 'AIzaSyAcboxS2N-39sfn1xn9jNCebvKkuHAdlNk';
    _0x11d35d.GDRIVE_FOLDERNAME = "recordings";
    if (location.hostname == "vdo.ninja") {
      _0x11d35d.salt = "vdo.ninja";
    } else {
      if (location.hostname == "steveseguin.github.io") {
        _0x11d35d.salt = "vdo.ninja";
      } else if (["vdo.ninja", "rtc.ninja", 'versus.cam', "socialstream.ninja"].includes(location.hostname.split('.').slice(-0x2).join('.'))) {
        _0x11d35d.salt = location.hostname.split('.').slice(-0x2).join('.');
      } else {
        _0x11d35d.salt = location.hostname;
      }
    }
    _0x11d35d.encryptMessage = function (_0x4df9e1, _0x4371a8 = _0x11d35d.password + _0x11d35d.salt) {
      var _0x1040aa = crypto.getRandomValues(new Uint8Array(0x10));
      return crypto.subtle.digest({
        'name': "SHA-256"
      }, convertStringToArrayBufferView(_0x4371a8)).then(function (_0x47d3c7) {
        return window.crypto.subtle.importKey("raw", _0x47d3c7, {
          'name': "AES-CBC"
        }, false, ["encrypt", "decrypt"]).then(function (_0x55709f) {
          return crypto.subtle.encrypt({
            'name': 'AES-CBC',
            'iv': _0x1040aa
          }, _0x55709f, convertStringToArrayBufferView(_0x4df9e1)).then(function (_0x3722f0) {
            encrypted_data = new Uint8Array(_0x3722f0);
            encrypted_data = toHexString(encrypted_data);
            _0x1040aa = toHexString(_0x1040aa);
            return [encrypted_data, _0x1040aa];
          }, function (_0x118352) {
            errorlog(_0x118352.message);
            return false;
          });
        }, function (_0x1b4de3) {
          errorlog(_0x1b4de3);
          return false;
        });
      })["catch"](errorlog);
    };
    _0x11d35d.decryptMessage = function (_0x568d14, _0x4edce5, _0x4cde59 = _0x11d35d.password + _0x11d35d.salt) {
      _0x568d14 = toByteArray(_0x568d14);
      _0x4edce5 = toByteArray(_0x4edce5);
      return crypto.subtle.digest({
        'name': "SHA-256"
      }, convertStringToArrayBufferView(_0x4cde59)).then(function (_0x2532f6) {
        return window.crypto.subtle.importKey("raw", _0x2532f6, {
          'name': "AES-CBC"
        }, false, ["encrypt", "decrypt"]).then(function (_0x12d864) {
          return crypto.subtle.decrypt({
            'name': 'AES-CBC',
            'iv': _0x4edce5
          }, _0x12d864, _0x568d14).then(function (_0x30952b) {
            var _0x30a179 = new Uint8Array(_0x30952b);
            var _0x1f2f7e = '';
            for (var _0x4b4c7b = 0x0; _0x4b4c7b < _0x30a179.byteLength; _0x4b4c7b++) {
              _0x1f2f7e += String.fromCharCode(_0x30a179[_0x4b4c7b]);
            }
            return _0x1f2f7e;
          }, function (_0x376f15) {
            errorlog(_0x4edce5);
            errorlog(_0x568d14);
            errorlog(_0x376f15);
            return false;
          });
        });
      })["catch"](errorlog);
    };
    _0x11d35d.decodeRemote = async function (_0x349b2d) {
      if (typeof _0x349b2d.remote !== 'object') {
        return _0x349b2d;
      }
      try {
        if (_0x349b2d.remote.length == 0x2) {
          if (!_0x11d35d.remoteHash) {
            _0x11d35d.remoteHash = await generateHash(_0x11d35d.remote + _0x11d35d.salt, 0xc);
          }
          _0x349b2d.remote = await _0x11d35d.decryptMessage(_0x349b2d.remote[0x0], _0x349b2d.remote[0x1], _0x11d35d.remoteHash);
          if (_0x349b2d.remote) {
            log("Remote request decoded successfully");
          } else {
            warnlog("Remote request failed to decode; continuing still.");
          }
          log(_0x349b2d);
        }
      } catch (_0x2c0bae) {
        errorlog(_0x2c0bae);
      }
      return _0x349b2d;
    };
    _0x11d35d.encodeRemote = async function (_0x4ae29b) {
      try {
        if (_0x4ae29b.remote && typeof _0x4ae29b.remote === "string") {
          var _0xc73905 = await generateHash(_0x4ae29b.remote + _0x11d35d.salt, 0xc);
          _0x4ae29b.remote = await _0x11d35d.encryptMessage(_0x4ae29b.remote, _0xc73905);
        }
      } catch (_0xc39b77) {
        errorlog(_0xc39b77);
      }
      return _0x4ae29b;
    };
    _0x11d35d.decodeInvite = function (_0x7655a4) {
      try {
        try {
          _0x7655a4 = decodeURIComponent(_0x7655a4.replace(/ /g, '+'));
        } catch (_0xc11181) {}
        _0x7655a4 = CryptoJS.AES.decrypt(_0x7655a4, "OBSNINJAFORLIFE");
        _0x7655a4 = _0x7655a4.toString(CryptoJS.enc.Utf8);
        if (_0x7655a4) {
          if (_0x7655a4.startsWith("http://")) {
            _0x7655a4 = _0x7655a4.replace("http://", '');
          } else {
            if (_0x7655a4.startsWith("https://")) {
              _0x7655a4 = _0x7655a4.replace("https://", '');
            } else {
              if (_0x7655a4.startsWith('/')) {
                _0x7655a4 = _0x7655a4.replace('/', '');
              } else {
                if (_0x7655a4.startsWith('obs.ninja/')) {
                  _0x7655a4 = _0x7655a4.replace("obs.ninja/", '');
                } else {
                  if (_0x7655a4.startsWith("vdo.ninja/")) {
                    _0x7655a4 = _0x7655a4.replace("vdo.ninja/", '');
                  } else if (_0x7655a4.startsWith("backup.vdo.ninja/")) {
                    _0x7655a4 = _0x7655a4.replace("backup.vdo.ninja/", '');
                  }
                }
              }
            }
          }
          _0x7655a4 = _0x7655a4.split('?').splice(0x1).join('?');
          _0x7655a4 = _0x7655a4.replace(/\?/g, '&');
          _0x7655a4 = _0x7655a4.replace(/\&/, '?');
          if (_0x7655a4) {
            _0x11d35d.decrypted = '?' + _0x7655a4;
          }
        }
      } catch (_0x4fa567) {
        warnlog(_0x4fa567);
      }
    };
    _0x11d35d.requestKeyframe = function (_0x1ccbaa, _0x5d705c = false) {
      var _0x4477c3 = {
        "keyframe": true,
        "scene": _0x5d705c
      };
      _0x11d35d.sendRequest(_0x4477c3, _0x1ccbaa);
    };
    _0x11d35d.requestAudioRateLimit = function (_0x134562, _0x3b8ed7, _0x1198a7 = null) {
      if (!_0x11d35d.rpcs[_0x3b8ed7]) {
        return false;
      }
      var _0x5c597b = {};
      if (_0x1198a7 !== null) {
        _0x11d35d.rpcs[_0x3b8ed7].lockedAudioBitrate = _0x1198a7 || false;
      } else {
        if (_0x11d35d.rpcs[_0x3b8ed7].lockedAudioBitrate) {
          warnlog("Audio Bitrate is locked; can't update");
          return;
        }
      }
      _0x5c597b.audioBitrate = _0x134562;
      log(_0x5c597b);
      _0x11d35d.sendRequest(_0x5c597b, _0x3b8ed7);
    };
    _0x11d35d.requestRateLimit = function (_0x232015, _0x811a43, _0x3db62 = false, _0x25fc25 = null) {
      log("requestRateLimit RUN: " + _0x3db62);
      if (!_0x11d35d.rpcs[_0x811a43] || !_0x11d35d.rpcs[_0x811a43].getStats) {
        return false;
      }
      if (_0x25fc25 !== null) {
        _0x11d35d.rpcs[_0x811a43].lockedVideoBitrate = _0x25fc25 || false;
      } else {
        if (_0x11d35d.rpcs[_0x811a43].lockedVideoBitrate) {
          warnlog("Video Bitrate is locked; can't update");
          return;
        }
      }
      if (_0x232015 === false) {} else {
        _0x11d35d.rpcs[_0x811a43].targetBandwidth = _0x232015;
      }
      var _0x37090b = -0x1;
      if (_0x11d35d.rpcs[_0x811a43].manualBandwidth !== false) {
        _0x232015 = parseInt(_0x11d35d.rpcs[_0x811a43].manualBandwidth);
      } else {
        _0x232015 = parseInt(_0x11d35d.rpcs[_0x811a43].targetBandwidth);
      }
      if (_0x11d35d.obsState.visibility === false) {
        if (_0x11d35d.optimize !== false) {
          if (window.obsstudio) {
            return false;
          }
        }
      } else {
        if (_0x11d35d.motionSwitch && _0x232015 === 0x0) {
          return false;
        }
      }
      if (_0x232015 === 0x0 && _0x11d35d.rpcs[_0x811a43].remoteMuteState) {
        _0x232015 = 0x1;
      }
      if (_0x11d35d.rpcs[_0x811a43].bandwidth === _0x232015) {
        return false;
      }
      log("request rate limit: " + _0x232015);
      var _0x44b36f = {
        bitrate: _0x232015
      };
      if (_0x3db62 === null) {} else {
        if (_0x3db62) {
          if (_0x232015 === 0x0) {
            warnlog("OPTIMIZED AUDIO ENABLED; zero bitrate");
            _0x44b36f.audioBitrate = 0x0;
          } else if (_0x37090b < 0x10 && _0x37090b >= 0x0) {
            _0x44b36f.audioBitrate = _0x37090b;
          } else {
            _0x44b36f.audioBitrate = 0x10;
          }
        } else if (_0x25fc25 === null) {
          _0x44b36f.audioBitrate = _0x37090b;
        }
      }
      return _0x11d35d.sendRequest(_0x44b36f, _0x811a43) ? (_0x11d35d.rpcs[_0x811a43].bandwidth = _0x232015, true) : (setTimeout(function _0xbd81ca() {
        _0x11d35d.requestRateLimit(false, _0x811a43);
      }, 0x1388), warnlog("couldn't set rate limit"), false);
    };
    _0x11d35d.sendGenericData = function (_0xefd72c, _0x5aa7f2 = false, _0xc5975e = false, _0x530120 = false) {
      var _0x319bb7 = false;
      var _0x34fe58 = {
        'pipe': _0xefd72c
      };
      try {
        if (!_0x5aa7f2 && !_0xc5975e) {
          if (_0x530120 == "rpcs") {
            _0x11d35d.sendRequest(_0x34fe58);
          } else if (_0x530120 == "pcs") {
            _0x11d35d.sendMessage(_0x34fe58);
          } else {
            _0x11d35d.sendPeers(_0x34fe58);
          }
          _0x319bb7 = true;
        } else {
          if (_0x5aa7f2) {
            _0x5aa7f2 = _0x5aa7f2 + '';
            if (_0x530120 == "rpcs") {
              _0x11d35d.sendRequest(_0x34fe58, _0x5aa7f2);
            } else if (_0x530120 == 'pcs') {
              _0x11d35d.sendMessage(_0x34fe58, _0x5aa7f2);
            } else {
              _0x11d35d.sendPeers(_0x34fe58, _0x5aa7f2);
            }
            _0x319bb7 = true;
          } else {
            if (_0xc5975e) {
              _0xc5975e = _0xc5975e + '';
              for (var _0x59e667 in _0x11d35d.rpcs) {
                if (_0x11d35d.rpcs[_0x59e667].streamID === _0xc5975e) {
                  if (_0x530120 == "rpcs") {
                    _0x11d35d.sendRequest(_0x34fe58, _0x59e667);
                  } else if (_0x530120 == "pcs") {
                    _0x11d35d.sendMessage(_0x34fe58, _0x59e667);
                  } else {
                    _0x11d35d.sendPeers(_0x34fe58, _0x59e667);
                  }
                  _0x319bb7 = true;
                }
              }
            }
          }
        }
        return _0x319bb7;
      } catch (_0x31d55f) {
        return false;
      }
    };
    _0x11d35d.gotGenericData = function (_0x1b1422, _0x5c2f41) {
      var _0x5c2f60 = {
        "dataReceived": {},
        "dataReceived": _0x1b1422
      };
      if (_0x5c2f41 !== null) {
        _0x5c2f60.UUID = _0x5c2f41;
      }
      if (isIFrame) {
        parent.postMessage(_0x5c2f60, _0x11d35d.iframetarget);
      } else if (_0x1b1422.overlayNinja && !isIFrame) {
        getChatMessage(_0x1b1422.overlayNinja.chatmessage, _0x1b1422.overlayNinja.chatname, false, false);
      }
    };
    _0x11d35d.directorSpeakerMute = function () {
      if (_0x11d35d.directorSpeakerMuted === null) {
        return;
      }
      for (var _0x50c79c in _0x11d35d.rpcs) {
        try {
          var _0x4264d1 = getReceivers2(_0x50c79c);
          for (var _0x532e9d = 0x0; _0x532e9d < _0x4264d1.length; _0x532e9d++) {
            if (_0x4264d1[_0x532e9d].track.kind == 'audio') {
              _0x4264d1[_0x532e9d].track.enabled = !_0x11d35d.directorSpeakerMuted;
            }
          }
        } catch (_0xa415ec) {}
      }
      if (_0x11d35d.directorSpeakerMuted) {
        getById("videosource").muted = true;
      }
    };
    _0x11d35d.directorDisplayMute = function () {
      if (_0x11d35d.directorDisplayMuted === null) {
        return;
      }
      if (_0x11d35d.directorDisplayMuted) {
        getById("gridlayout").classList.add('hidden');
        if (!_0x11d35d.cleanOutput) {
          warnUser(getTranslation('vision-disabled'), false, false);
        }
      } else {
        getById("gridlayout").classList.remove("hidden");
        if (!_0x11d35d.cleanOutput) {
          closeModal();
        }
      }
      for (var _0x3bff8d in _0x11d35d.rpcs) {
        try {
          var _0x234da0 = getReceivers2(_0x3bff8d);
          for (var _0x5606cc = 0x0; _0x5606cc < _0x234da0.length; _0x5606cc++) {
            if (_0x234da0[_0x5606cc].track.kind == "video") {
              _0x234da0[_0x5606cc].track.enabled = !_0x11d35d.directorDisplayMuted;
            }
          }
        } catch (_0x22ca93) {
          errorlog(_0x22ca93);
        }
      }
      if (_0x11d35d.directorDisplayMuted) {
        getById('videosource').muted = true;
      }
    };
    _0x11d35d.requestZoomChange = async function (_0x1cd03e, _0x1909da, _0x40210f = _0x11d35d.remote) {
      log("request zoom change: " + _0x1cd03e);
      log(_0x1909da);
      var _0x357b03 = {};
      _0x357b03.zoom = _0x1cd03e;
      _0x357b03.remote = _0x40210f;
      _0x357b03 = await _0x11d35d.encodeRemote(_0x357b03);
      if (_0x11d35d.sendRequest(_0x357b03, _0x1909da)) {
        log("zoom success");
      } else {
        errorlog("failed to send zoom change request");
      }
    };
    _0x11d35d.requestFocusChange = async function (_0x10c62a, _0xa0b294, _0x593e41 = _0x11d35d.remote) {
      log("request focus change: " + _0x10c62a);
      var _0x387822 = {};
      _0x387822.focus = _0x10c62a;
      _0x387822.remote = _0x593e41;
      _0x387822 = await _0x11d35d.encodeRemote(_0x387822);
      if (_0x11d35d.sendRequest(_0x387822, _0xa0b294)) {
        log("focus success");
      } else {
        errorlog("failed to send focus change request");
      }
    };
    _0x11d35d.seedStream = async function () {
      await _0x11d35d.connect();
      if (_0x11d35d.joiningRoom !== false) {
        _0x11d35d.joiningRoom = 'seedPlz';
        log("seeding blocked");
        return;
      } else {
        if (_0x11d35d.doNotSeed) {
          log("doNotSeed!");
          if (_0x11d35d.meshcast) {
            await meshcast();
          }
          if (_0x11d35d.whipOutput) {
            whipOut();
          }
          if (_0x11d35d.whepHost) {
            whepOut();
          }
          return;
        } else {
          var _0x34b4cf = {
            "request": "seed",
            streamID: _0x11d35d.streamID
          };
          _0x11d35d.sendMsg(_0x34b4cf);
          log("seeding !!");
          pokeAPI("seeding", true);
          pokeIframeAPI("seeding-started", true);
          pokeIframeAPI("seeding", true);
        }
      }
      if (_0x11d35d.whipOutput) {
        whipOut();
      }
      if (_0x11d35d.whepHost) {
        whepOut();
      }
      if (_0x11d35d.meshcast) {
        await meshcast();
      }
    };
    _0x11d35d.requestCoDirector = function () {
      getById('coDirectorEnable').disabled = true;
      getById("coDirectorEnable").title = "Only the main director can use this setting";
      getById('codirectorSettings').classList.add('hidden');
      if (_0x11d35d.directorPassword) {
        if (_0x11d35d.directorHash) {
          if (_0x11d35d.directorUUID) {
            if (_0x11d35d.directorUUID in _0x11d35d.rpcs) {
              if (_0x11d35d.rpcs[_0x11d35d.directorUUID].codirectorRequested === false) {
                _0x11d35d.encryptMessage(_0x11d35d.directorHash, _0x11d35d.directorHash).then(function (_0x4f938f) {
                  var _0x417c5d = {
                    "UUID": _0x11d35d.directorUUID,
                    "requestCoDirector": _0x4f938f[0x0],
                    vector: _0x4f938f[0x1]
                  };
                  if (_0x11d35d.rpcs[_0x11d35d.directorUUID].codirectorRequested === false) {
                    if (_0x11d35d.sendRequest(_0x417c5d, _0x417c5d.UUID)) {
                      _0x11d35d.rpcs[_0x11d35d.directorUUID].codirectorRequested = true;
                    }
                  }
                })["catch"](errorlog);
              }
            }
          }
        } else {
          generateHash(_0x11d35d.directorPassword + _0x11d35d.salt + 'abc123', 0xc).then(function (_0x13c4d7) {
            _0x11d35d.directorHash = _0x13c4d7;
            if (_0x11d35d.directorUUID) {
              if (_0x11d35d.rpcs[_0x11d35d.directorUUID].codirectorRequested === false) {
                _0x11d35d.encryptMessage(_0x11d35d.directorHash, _0x11d35d.directorHash).then(function (_0x3f1fa0) {
                  var _0xa06939 = {
                    "UUID": _0x11d35d.directorUUID,
                    "requestCoDirector": _0x3f1fa0[0x0],
                    "vector": _0x3f1fa0[0x1]
                  };
                  if (_0x11d35d.rpcs[_0x11d35d.directorUUID].codirectorRequested === false) {
                    if (_0x11d35d.sendRequest(_0xa06939, _0xa06939.UUID)) {
                      _0x11d35d.rpcs[_0x11d35d.directorUUID].codirectorRequested = true;
                    }
                  }
                })['catch'](errorlog);
              }
            }
            return;
          })["catch"](errorlog);
        }
      }
    };
    _0x11d35d.pixelFix = function (_0x164a2b, _0x32ab3d) {
      return _0x164a2b;
    };
    _0x11d35d.refreshScale = function (_0x30ed9d = false) {
      log("Refreshing scale");
      if (_0x30ed9d) {
        if (!_0x11d35d.pcs[_0x30ed9d]) {
          return false;
        }
        if (_0x11d35d.pcs[_0x30ed9d].scaleResolution !== false || _0x11d35d.pcs[_0x30ed9d].scaleWidth !== false || _0x11d35d.pcs[_0x30ed9d].scaleHeight !== false) {
          log("resolution scale: " + _0x11d35d.pcs[_0x30ed9d].scaleWidth + " x " + _0x11d35d.pcs[_0x30ed9d].scaleHeight);
          _0x11d35d.setResolution(_0x30ed9d, _0x11d35d.pcs[_0x30ed9d].scaleWidth, _0x11d35d.pcs[_0x30ed9d].scaleHeight, _0x11d35d.pcs[_0x30ed9d].scaleSnap, _0x11d35d.pcs[_0x30ed9d].cover);
          return true;
        } else {
          if (_0x11d35d.pcs[_0x30ed9d].scale !== false) {
            log("scale scale");
            _0x11d35d.setScale(_0x30ed9d, _0x11d35d.pcs[_0x30ed9d].scale, true);
            return true;
          }
        }
      } else {
        for (var _0x466b61 in _0x11d35d.pcs) {
          setTimeout(function (_0x4f07ee) {
            if (_0x11d35d.pcs[_0x4f07ee].scaleResolution !== false || _0x11d35d.pcs[_0x4f07ee].scaleWidth !== false || _0x11d35d.pcs[_0x4f07ee].scaleHeight !== false) {
              log("resolution scale: " + _0x11d35d.pcs[_0x4f07ee].scaleWidth + " x " + _0x11d35d.pcs[_0x4f07ee].scaleHeight);
              _0x11d35d.setResolution(_0x4f07ee, _0x11d35d.pcs[_0x4f07ee].scaleWidth, _0x11d35d.pcs[_0x4f07ee].scaleHeight, _0x11d35d.pcs[_0x4f07ee].scaleSnap, _0x11d35d.pcs[_0x4f07ee].cover);
            } else if (_0x11d35d.pcs[_0x4f07ee].scale !== false) {
              log("scale scale");
              _0x11d35d.setScale(_0x4f07ee, _0x11d35d.pcs[_0x4f07ee].scale, true);
            }
          }, 0x0, _0x466b61);
        }
      }
      return false;
    };
    _0x11d35d.whipOutSetScale = function (_0x3329f7 = _0x11d35d.whipOutScale) {
      warnlog("WHIP OUT SET SCALING IS FIRING, which is GOOD !!!!!!");
      if (_0x11d35d.whipOut.scale !== _0x3329f7) {
        if (_0x3329f7 == null) {
          try {
            var _0x51b9c3 = _0x11d35d.whipOut.getSenders().find(function (_0x351b67) {
              return _0x351b67.track && _0x351b67.track.kind == "video";
            });
          } catch (_0x9ce10d) {
            errorlog(_0x9ce10d);
          }
          if (!_0x51b9c3) {
            warnlog("can't change bitrate; no video senders found");
            return;
          }
          var _0x3a7f26 = _0x51b9c3.getParameters();
          if (!_0x3a7f26.encodings || _0x3a7f26.encodings.length == 0x0) {
            _0x3a7f26.encodings = [{}];
          }
          if ("scaleResolutionDownBy" in _0x3a7f26.encodings[0x0]) {
            _0x3329f7 = 0x64 / _0x3a7f26.encodings[0x0].scaleResolutionDownBy;
            _0x3329f7 = _0x3329f7 * 0.95;
          } else {
            _0x3329f7 = 0x5f;
          }
        } else {
          _0x11d35d.whipOut.scale = _0x3329f7;
        }
        try {
          if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {
            log("iOS devices do not support dynamic bitrates correctly; skipping");
          } else {
            if ("RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype) {
              try {
                var _0x51b9c3 = _0x11d35d.whipOut.getSenders().find(function (_0x3ff5cb) {
                  return _0x3ff5cb.track && _0x3ff5cb.track.kind == "video";
                });
              } catch (_0x3ac84a) {
                errorlog(_0x3ac84a);
              }
              if (!_0x51b9c3) {
                warnlog("can't change bitrate; no video senders found");
                return;
              }
              var _0x2b6c36 = {};
              if (_0x3329f7 <= 0x0 || _0x3329f7 == 0x64) {
                var _0x4cae84 = getChromiumVersion();
                if (_0x4cae84 > 0x50) {
                  _0x2b6c36.scaleResolutionDownBy = null;
                } else {
                  _0x2b6c36.scaleResolutionDownBy = 0x1;
                }
              } else {
                _0x2b6c36.scaleResolutionDownBy = 0x64 / _0x3329f7;
              }
              setEncodings(_0x51b9c3, _0x2b6c36, function (_0x531507) {
                log("scale set!");
                pokeIframeAPI("setVideoScale", _0x531507, "meshcast");
                pokeIframeAPI("set-video-scale", _0x531507, "meshcast");
                _0x11d35d.whipOut.stats.scaleFactor = parseInt(_0x531507) + '%';
              }, _0x3329f7);
              return;
            }
          }
        } catch (_0x4abe8a) {
          errorlog(_0x4abe8a);
        }
      }
    };
    _0x11d35d.setScale = function (_0x4ae508, _0x458f0c, _0x2e3dcb = false) {
      warnlog("SET SCALING IS FIRING, which is GOOD !!!!!! " + _0x458f0c);
      try {
        _0x11d35d.pcs[_0x4ae508].stats.scaleFactor = _0x458f0c;
      } catch (_0x1bd928) {
        errorlog(_0x1bd928);
      }
      if (!_0x2e3dcb && _0x11d35d.pcs[_0x4ae508].scale === _0x458f0c) {
        return;
      }
      if (_0x458f0c == null) {
        try {
          var _0x5446cd = getSenders2(_0x4ae508).find(function (_0x5d2e67) {
            return _0x5d2e67.track && _0x5d2e67.track.kind == "video";
          });
        } catch (_0x3d2f1b) {
          errorlog(_0x3d2f1b);
        }
        if (!_0x5446cd) {
          warnlog("can't change bitrate; no video senders found");
          return;
        }
        var _0x2bf78f = _0x5446cd.getParameters();
        if (!_0x2bf78f.encodings || _0x2bf78f.encodings.length == 0x0) {
          _0x2bf78f.encodings = [{}];
        }
        if ('scaleResolutionDownBy' in _0x2bf78f.encodings[0x0]) {
          _0x458f0c = 0x64 / _0x2bf78f.encodings[0x0].scaleResolutionDownBy;
          _0x458f0c = _0x458f0c * 0.95;
        } else {
          _0x458f0c = 0x5f;
        }
      } else {
        _0x458f0c = Math.ceil(_0x458f0c);
        _0x11d35d.pcs[_0x4ae508].scale = _0x458f0c;
      }
      try {
        if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {
          log("iOS devices do not support dynamic bitrates correctly; skipping");
        } else {
          if ('RTCRtpSender' in window && 'setParameters' in window.RTCRtpSender.prototype) {
            try {
              var _0x5446cd = getSenders2(_0x4ae508).find(function (_0x378f3f) {
                return _0x378f3f.track && _0x378f3f.track.kind == "video";
              });
            } catch (_0x56865d) {
              errorlog(_0x56865d);
            }
            if (!_0x5446cd) {
              warnlog("can't change bitrate; no video senders found");
              return;
            }
            _0x458f0c = _0x11d35d.calculateScale(_0x4ae508, false, _0x458f0c);
            var _0x37e351 = {};
            if (_0x458f0c <= 0x0 || _0x458f0c == 0x64) {
              var _0x2506ea = getChromiumVersion();
              if (_0x2506ea > 0x50) {
                _0x37e351.scaleResolutionDownBy = null;
              } else {
                _0x37e351.scaleResolutionDownBy = 0x1;
              }
            } else {
              _0x37e351.scaleResolutionDownBy = 0x64 / _0x458f0c;
            }
            setEncodings(_0x5446cd, _0x37e351, function (_0x2a4c65) {
              log("scale set! " + _0x2a4c65[0x0]);
              pokeIframeAPI("setVideoScale", _0x2a4c65[0x0], _0x2a4c65[0x1]);
              pokeIframeAPI("set-video-scale", _0x2a4c65[0x0], _0x2a4c65[0x1]);
              _0x11d35d.pcs[_0x2a4c65[0x1]].stats.scaleFactor = parseInt(_0x2a4c65[0x0]) + '%';
            }, [_0x458f0c, _0x4ae508]);
            return;
          }
        }
      } catch (_0x4a20ba) {
        errorlog(_0x4a20ba);
      }
    };
    _0x11d35d.requestResolution = function (_0x5bb439, _0x48997a, _0xf54db6, _0x20f7df = false, _0xdefaf9 = false, _0x526929 = null) {
      if (!(_0x5bb439 in _0x11d35d.rpcs)) {
        return;
      }
      if (_0x526929 === null) {
        _0x526929 = _0x11d35d.cover || false;
      }
      var _0x547b8c = false;
      if (!(_0x11d35d.rpcs[_0x5bb439].scaleWidth == Math.floor(_0x48997a) || _0x11d35d.rpcs[_0x5bb439].scaleWidth === Math.ceil(_0x48997a))) {
        _0x48997a = Math.round(_0x48997a);
        _0x11d35d.rpcs[_0x5bb439].scaleWidth = _0x48997a;
        _0x547b8c = true;
      }
      if (!(_0x11d35d.rpcs[_0x5bb439].scaleHeight == Math.floor(_0xf54db6) || _0x11d35d.rpcs[_0x5bb439].scaleHeight === Math.ceil(_0xf54db6))) {
        _0xf54db6 = Math.round(_0xf54db6);
        _0x11d35d.rpcs[_0x5bb439].scaleHeight = _0xf54db6;
        _0x547b8c = true;
      }
      if (_0x11d35d.rpcs[_0x5bb439].scaleSnap != _0x20f7df) {
        _0x11d35d.rpcs[_0x5bb439].scaleSnap = _0x20f7df;
        _0x547b8c = true;
      }
      _0x48997a = Math.round(_0x48997a);
      _0xf54db6 = Math.round(_0xf54db6);
      if (_0x547b8c) {
        var _0x7d3ca8 = {
          "UUID": _0x5bb439,
          "requestResolution": {
            'w': _0x48997a,
            'h': _0xf54db6,
            's': _0x20f7df,
            'c': _0x526929
          }
        };
        if (_0xdefaf9) {
          _0x7d3ca8.requestAs = _0xdefaf9;
        }
        log(_0x48997a + " " + _0xf54db6);
        _0x11d35d.sendRequest(_0x7d3ca8, _0x5bb439);
      }
      if (_0x20f7df) {
        _0x11d35d.rpcs[_0x5bb439].stats.Requested_resolution = "~ " + parseInt(_0x48997a) + " x " + parseInt(_0xf54db6);
      } else {
        _0x11d35d.rpcs[_0x5bb439].stats.Requested_resolution = parseInt(_0x48997a) + " x " + parseInt(_0xf54db6);
      }
    };
    _0x11d35d.calculateScale = function (_0x41fe58, _0x16ae3f = false, _0x5c6a0b = false) {
      if (_0x5c6a0b) {} else if (_0x11d35d.pcs[_0x41fe58].scale) {
        _0x5c6a0b = _0x11d35d.pcs[_0x41fe58].scale;
      } else {
        _0x5c6a0b = 0x64;
      }
      if (_0x11d35d.pcs[_0x41fe58].scaleResolution && _0x5c6a0b > _0x11d35d.pcs[_0x41fe58].scaleResolution) {
        _0x5c6a0b = _0x11d35d.pcs[_0x41fe58].scaleResolution;
      }
      if (_0x16ae3f) {
        _0x5c6a0b = _0x49acba(_0x41fe58, _0x5c6a0b, _0x16ae3f);
      } else if (_0x11d35d.pcs[_0x41fe58].scaleDueToBitrate && _0x11d35d.pcs[_0x41fe58].scaleDueToBitrate < _0x5c6a0b) {
        _0x5c6a0b = _0x11d35d.pcs[_0x41fe58].scaleDueToBitrate;
      }
      if (_0x11d35d.screenShareState && _0x11d35d.pcs[_0x41fe58].scaleSnap) {
        if (_0x5c6a0b > 0x55) {
          _0x5c6a0b = 0x64;
        } else if (_0x5c6a0b > 0x2a && _0x5c6a0b < 0x32) {
          _0x5c6a0b = 0x32;
        }
      }
      _0x5c6a0b = _0x11d35d.pixelFix(_0x5c6a0b, _0x41fe58);
      return _0x5c6a0b;
    };
    _0x11d35d.setResolution = function (_0x2483ed = false, _0x20d4c8 = null, _0x5bbff8 = null, _0x516865 = false, _0x31f7bf = false) {
      log("setResolution triggered; " + _0x20d4c8 + 'x' + _0x5bbff8);
      if (_0x2483ed && !(_0x2483ed in _0x11d35d.pcs)) {
        return;
      } else {
        if (!_0x2483ed) {
          for (var _0x2216b3 in _0x11d35d.pcs) {
            _0x11d35d.setResolution(_0x2216b3, _0x11d35d.pcs[_0x2216b3].scaleWidth, _0x11d35d.pcs[_0x2216b3].scaleHeight, _0x11d35d.pcs[_0x2216b3].scaleSnap, _0x11d35d.pcs[_0x2216b3].cover);
          }
          return;
        }
      }
      _0x31f7bf = _0x31f7bf || false;
      snape = _0x516865 || false;
      if (_0x20d4c8 === null && _0x5bbff8 === null) {
        if (!_0x11d35d.pcs[_0x2483ed].scaleWidth && !_0x11d35d.pcs[_0x2483ed].scaleHeight) {
          return;
        } else {
          _0x20d4c8 = _0x11d35d.pcs[_0x2483ed].scaleWidth || 0x64;
          _0x5bbff8 = _0x11d35d.pcs[_0x2483ed].scaleHeight || 0x64;
        }
      } else {
        _0x11d35d.pcs[_0x2483ed].scaleWidth = _0x20d4c8;
        _0x11d35d.pcs[_0x2483ed].scaleHeight = _0x5bbff8;
        _0x11d35d.pcs[_0x2483ed].scaleSnap = _0x516865;
        _0x11d35d.pcs[_0x2483ed].cover = _0x31f7bf;
      }
      if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {
        return;
      }
      if ("RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype) {
        var _0xbefd5 = getSenders2(_0x2483ed).find(function (_0x35d2d2) {
          return _0x35d2d2.track && _0x35d2d2.track.kind == "video";
        });
        if (!_0xbefd5) {
          log("can't change bitrate; no video sender found");
          return;
        }
        var _0xc8243a = {};
        if ('realUUID' in _0x11d35d.pcs[_0x2483ed]) {
          var _0x1845d9 = _0x11d35d.screenStream.getVideoTracks();
          if (_0x1845d9.length) {
            var _0x33a36a = _0x1845d9[0x0].getSettings();
            var _0x139fb6 = _0x33a36a.height;
            var _0x941af = _0x33a36a.width;
          } else {
            return;
          }
        } else {
          if (_0x11d35d.videoElement && _0x11d35d.videoElement.srcObject) {
            var _0x1845d9 = _0x11d35d.videoElement.srcObject.getVideoTracks();
            if (_0x1845d9.length) {
              var _0x33a36a = _0x1845d9[0x0].getSettings();
              var _0x139fb6 = _0x33a36a.height;
              var _0x941af = _0x33a36a.width;
            } else {
              return;
            }
          } else {
            return;
          }
        }
        var _0x27bbd0 = 0x64 * _0x20d4c8 / _0x941af;
        var _0x1b946d = 0x64 * _0x5bbff8 / _0x139fb6;
        warnlog(_0x27bbd0 + " x " + _0x1b946d);
        var _0x35a590 = 0x64;
        if (_0x20d4c8 === null) {
          _0x35a590 = _0x1b946d;
        } else {
          if (_0x5bbff8 === null) {
            _0x35a590 = _0x27bbd0;
          } else if (_0x31f7bf) {
            if (_0x27bbd0 > _0x1b946d) {
              _0x35a590 = _0x27bbd0;
            } else {
              _0x35a590 = _0x1b946d;
            }
          } else if (_0x27bbd0 < _0x1b946d) {
            _0x35a590 = _0x27bbd0;
          } else {
            _0x35a590 = _0x1b946d;
          }
        }
        if (_0x35a590 > 0x64) {
          _0x35a590 = 0x64;
        }
        log("resolution scale: " + _0x35a590);
        _0x11d35d.pcs[_0x2483ed].scaleResolution = _0x35a590;
        var _0x31619b = _0x11d35d.calculateScale(_0x2483ed);
        if (_0x31619b <= 0x0 || _0x31619b == 0x64) {
          var _0x281a92 = getChromiumVersion();
          if (_0x281a92 > 0x50) {
            _0xc8243a.scaleResolutionDownBy = null;
          } else {
            _0xc8243a.scaleResolutionDownBy = 0x1;
          }
        } else {
          _0xc8243a.scaleResolutionDownBy = 0x64 / _0x31619b;
        }
        setEncodings(_0xbefd5, _0xc8243a, function (_0x8042d3) {
          log("scale set!");
          pokeIframeAPI('setVideoScale', _0x8042d3[0x0], _0x8042d3[0x1]);
          pokeIframeAPI('set-video-scale', _0x8042d3[0x0], _0x8042d3[0x1]);
          _0x11d35d.pcs[_0x8042d3[0x1]].stats.scaleFactor = parseInt(_0x8042d3[0x0]) + '%';
        }, [_0x31619b, _0x2483ed]);
        return;
      }
    };
    _0x11d35d.forcePLI = function (_0x59d83f = null, _0x76cc3 = null) {
      if (_0x76cc3) {
        _0x76cc3.stopPropagation();
      }
      if (_0x11d35d.chunkedRecorder) {
        _0x11d35d.chunkedRecorder.needKeyFrame = true;
        log("FORCING A CHUNKED KEY FRAME: " + _0x59d83f);
      }
      if (iOS || iPad) {
        log("iOS devices do not support dynamic bitrates correctly; skipping");
        return false;
      } else {
        if ("RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype) {
          log("FORCING A KEY FRAME: " + _0x59d83f);
          if (_0x59d83f == null) {
            for (_0x59d83f in _0x11d35d.pcs) {
              _0x11d35d.forcePLI(_0x59d83f);
            }
            return false;
          }
          if (!(_0x59d83f in _0x11d35d.pcs)) {
            return false;
          }
          if (_0x11d35d.pcs[_0x59d83f].keyframeRate) {
            if (_0x11d35d.pcs[_0x59d83f].keyframeTimeout) {
              clearTimeout(_0x11d35d.pcs[_0x59d83f].keyframeTimeout);
              _0x11d35d.pcs[_0x59d83f].keyframeTimeout = null;
            }
            _0x11d35d.pcs[_0x59d83f].keyframeTimeout = setTimeout(function (_0x1ebc4b) {
              if (!_0x11d35d.pcs[_0x1ebc4b]) {
                clearInterval(this);
              } else {
                _0x11d35d.forcePLI(_0x1ebc4b);
              }
            }, parseInt(_0x11d35d.pcs[_0x59d83f].keyframeRate), _0x59d83f);
          }
          try {
            var _0x1d9f5e = getSenders2(_0x59d83f).find(function (_0x471802) {
              return _0x471802.track && _0x471802.track.kind == "video";
            });
            if (!_0x1d9f5e) {
              warnlog("can't change bitrate; no video sender found");
              return false;
            }
            var _0x27d06a = {
              "scaleResolutionDownBy": 0xa
            };
            setEncodings(_0x1d9f5e, _0x27d06a, function (_0x464048) {
              log("scaleResolutionDownBy set 2a! " + _0x464048[0x0]);
              var _0x465495 = _0x11d35d.calculateScale(_0x464048[0x0]);
              var _0x3344da = {};
              if (_0x465495 <= 0x0 || _0x465495 == 0x64) {
                var _0x1c65d8 = getChromiumVersion();
                if (_0x1c65d8 > 0x50) {
                  _0x3344da.scaleResolutionDownBy = null;
                } else {
                  _0x3344da.scaleResolutionDownBy = 0x1;
                }
              } else {
                _0x3344da.scaleResolutionDownBy = 0x64 / _0x465495;
              }
              setEncodings(_0x464048[0x1], _0x3344da, function () {
                log("scaleResolutionDownBy set 2b!");
              });
            }, [_0x59d83f, _0x1d9f5e]);
            return true;
          } catch (_0x1ba42e) {
            errorlog(_0x1ba42e);
          }
        }
      }
      return false;
    };
    _0x11d35d.enhanceAudioEncoder = function (_0x1a428c) {
      log("enhacing audio encoder");
      var _0xaedc51 = getSenders2(_0x1a428c).find(function (_0x37d8a9) {
        return _0x37d8a9.track && _0x37d8a9.track.kind == "audio";
      });
      if (!_0xaedc51) {
        log("no audio track to poke");
        return false;
      }
      var _0x18b61f = {};
      try {
        _0x18b61f.networkPriority = "high";
        _0x18b61f.priority = "high";
        _0x18b61f.adaptivePtime = true;
        setEncodings(_0xaedc51, _0x18b61f, function (_0x24c656) {
          log("done clearing audio");
          pokeIframeAPI("prioritize-audio", true, _0x24c656);
        }, _0x1a428c);
      } catch (_0x378501) {
        errorlog(_0x378501);
      }
    };
    _0x11d35d.degradationPreference = function (_0x23ff5a, _0x594c7a = "maintain-framerate") {
      var _0x3ae822 = getSenders2(_0x23ff5a).find(function (_0x1d917f) {
        return _0x1d917f.track && _0x1d917f.track.kind == "video";
      });
      if (!_0x3ae822) {
        log("no video track to control");
        return false;
      }
      var _0x364bac = {};
      try {
        if (_0x594c7a === true) {
          _0x364bac.degradationPreference = 'maintain-framerate';
          log("done setting degrad to maintain-framerate");
        } else {
          _0x364bac.degradationPreference = _0x594c7a;
          log("done setting degrad to " + _0x594c7a);
        }
        setEncodings(_0x3ae822, _0x364bac, function () {
          log("done setting degrad");
        }());
      } catch (_0x2516bc) {
        errorlog(_0x2516bc);
      }
    };
    _0x11d35d.limitMaxBandwidth = function (_0x57aef6, _0x323f47, _0x48989e = false) {
      log("session.limitMaxBandwidth running: " + _0x57aef6 + ", mc?: " + _0x48989e);
      if (_0x11d35d.maxBandwidth === false) {
        return;
      }
      _0x323f47.maxBandwidth = parseInt(_0x11d35d.maxBandwidth / 0x64 * _0x57aef6);
      if (_0x48989e) {
        _0x11d35d.limitMeshcastBitrate(null);
      } else {
        _0x11d35d.limitBitrate(_0x323f47.UUID, null);
      }
    };
    _0x11d35d.limitAudioEncoder = function (_0x534553, _0x2b39b3 = 0x7d00, _0x16622a = 0x3e8) {
      log("encodering being kicked");
      var _0x452f17 = getSenders2(_0x534553).find(function (_0xeac454) {
        return _0xeac454.track && _0xeac454.track.kind == "audio";
      });
      if (!_0x452f17) {
        log("no audio track to poke");
        return false;
      }
      var _0x1f7979 = {
        "maxBitrate": _0x2b39b3
      };
      setEncodings(_0x452f17, _0x1f7979, function (_0x2a5190) {
        pokeIframeAPI("setAudioBitrate", _0x2a5190[0x0], _0x2a5190[0x1]);
        pokeIframeAPI('set-audio-bitrate', _0x2a5190[0x0], _0x2a5190[0x1]);
        if (_0x2a5190[0x2] > 0x0) {
          setTimeout(function () {
            try {
              if (_0x2a5190[0x1] in _0x11d35d.pcs) {
                var _0x1812ba = getSenders2(_0x2a5190[0x1]).find(function (_0x15ee46) {
                  return _0x15ee46.track && _0x15ee46.track.kind == "audio";
                });
              } else {
                return false;
              }
              if (!_0x1812ba) {
                log("no audio track to poke");
                return false;
              }
              var _0x5d0971 = {
                maxBitrate: null
              };
              setEncodings(_0x1812ba, _0x5d0971, function () {
                log("done clearing audio");
              });
            } catch (_0x163c7f) {
              errorlog(_0x163c7f);
            }
          }, _0x2a5190[0x2], _0x2a5190[0x1]);
        }
      }, [_0x2b39b3, _0x534553, _0x16622a]);
    };
    _0x11d35d.directMigrateIssue = function (_0x5d7230, _0x40907d, _0x5be5c4) {
      pokeIframeAPI('transfer', _0x5d7230, _0x5be5c4);
      if (_0x11d35d.password) {
        return generateHash(_0x5d7230 + _0x11d35d.password + _0x11d35d.salt, 0x10).then(function (_0x90841f) {
          var _0x570ee2 = {};
          if (_0x40907d.updateurl) {
            _0x40907d.roomenc = _0x90841f;
          }
          if (_0x11d35d.director && _0x11d35d.directorUUID) {
            _0x570ee2.migrate = _0x5be5c4;
            _0x570ee2.roomid = _0x90841f;
            _0x570ee2.transferSettings = _0x40907d;
            _0x11d35d.sendRequest(_0x570ee2, _0x11d35d.directorUUID);
            log(_0x570ee2);
          } else {
            if (_0x40907d.updateurl) {
              _0x570ee2.request = 'migrate';
              _0x570ee2.transferSettings = _0x40907d;
              log(_0x570ee2);
              _0x11d35d.sendRequest(_0x570ee2, _0x5be5c4, function () {
                var _0x282b3b = {
                  request: "migrate",
                  roomid: _0x90841f,
                  "target": _0x5be5c4
                };
                _0x11d35d.sendMsg(_0x282b3b);
              });
              log(_0x570ee2);
            } else {
              if ("broadcast" in _0x40907d) {
                _0x570ee2.request = "migrate";
                _0x570ee2.transferSettings = _0x40907d;
                delete _0x570ee2.transferSettings.roomid;
                delete _0x570ee2.transferSettings.roomenc;
                log(_0x570ee2);
                _0x11d35d.sendRequest(_0x570ee2, _0x5be5c4, function () {
                  var _0xe2ba77 = {
                    "request": "migrate",
                    "roomid": _0x90841f,
                    target: _0x5be5c4
                  };
                  _0x11d35d.sendMsg(_0xe2ba77);
                });
                log(_0x570ee2);
              } else if (Object.keys(_0x40907d).length) {
                _0x570ee2.request = "migrate";
                _0x570ee2.transferSettings = _0x40907d;
                delete _0x570ee2.transferSettings.roomid;
                delete _0x570ee2.transferSettings.roomenc;
                log(_0x570ee2);
                _0x11d35d.sendRequest(_0x570ee2, _0x5be5c4, function () {
                  var _0x283b61 = {
                    "request": "migrate",
                    "roomid": _0x90841f,
                    "target": _0x5be5c4
                  };
                  _0x11d35d.sendMsg(_0x283b61);
                });
                log(_0x570ee2);
              } else {
                _0x570ee2.request = 'migrate';
                _0x570ee2.roomid = _0x90841f;
                _0x570ee2.target = _0x5be5c4;
                _0x11d35d.sendMsg(_0x570ee2);
              }
            }
          }
        })['catch'](errorlog);
      } else {
        if (_0x40907d.updateurl) {
          _0x40907d.roomenc = _0x5d7230;
        }
        var _0x4c59e0 = {};
        if (_0x11d35d.director && _0x11d35d.directorUUID) {
          _0x4c59e0.migrate = _0x5be5c4;
          _0x4c59e0.roomid = _0x5d7230;
          _0x4c59e0.transferSettings = _0x40907d;
          _0x11d35d.sendRequest(_0x4c59e0, _0x11d35d.directorUUID);
          log(_0x4c59e0);
        } else {
          if (_0x40907d.updateurl) {
            _0x4c59e0.request = "migrate";
            _0x4c59e0.transferSettings = _0x40907d;
            _0x11d35d.sendRequest(_0x4c59e0, _0x5be5c4, function () {
              var _0x5125d7 = {
                "request": "migrate",
                "roomid": _0x5d7230,
                "target": _0x5be5c4
              };
              _0x11d35d.sendMsg(_0x5125d7);
            });
          } else {
            if ("broadcast" in _0x40907d) {
              _0x4c59e0.request = 'migrate';
              _0x4c59e0.transferSettings = _0x40907d;
              delete _0x4c59e0.transferSettings.roomid;
              delete _0x4c59e0.transferSettings.roomenc;
              _0x11d35d.sendRequest(_0x4c59e0, _0x5be5c4, function () {
                var _0x32ea4f = {
                  "request": "migrate",
                  "roomid": _0x5d7230,
                  "target": _0x5be5c4
                };
                _0x11d35d.sendMsg(_0x32ea4f);
              });
            } else if (Object.keys(_0x40907d).length) {
              _0x4c59e0.request = "migrate";
              _0x4c59e0.transferSettings = _0x40907d;
              delete _0x4c59e0.transferSettings.roomid;
              delete _0x4c59e0.transferSettings.roomenc;
              log(_0x4c59e0);
              _0x11d35d.sendRequest(_0x4c59e0, _0x5be5c4, function () {
                var _0x4d85c2 = {
                  "request": "migrate",
                  "roomid": _0x5d7230,
                  "target": _0x5be5c4
                };
                _0x11d35d.sendMsg(_0x4d85c2);
              });
              log(_0x4c59e0);
            } else {
              _0x4c59e0.request = "migrate";
              _0x4c59e0.roomid = _0x5d7230;
              _0x4c59e0.target = _0x5be5c4;
              _0x11d35d.sendMsg(_0x4c59e0);
            }
          }
        }
      }
    };
    _0x11d35d.limitAudioBitrate = async function (_0x2f4eb6, _0x24598b) {
      _0x24598b = parseInt(_0x24598b);
      try {
        var _0x4716e6 = getSenders2(_0x2f4eb6).find(function (_0x4d0e63) {
          return _0x4d0e63.track && _0x4d0e63.track.kind == "audio";
        });
        if (!_0x4716e6) {
          log("can't change audio bitrate; no audio sender found");
          return;
        }
        var _0x2b4213 = {};
        if (_0x24598b < 0x0) {
          _0x2b4213.active = true;
          if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {
            _0x24598b = 0x20;
            if (_0x11d35d.pcs[_0x2f4eb6].setAudioBitrate !== false) {
              _0x24598b = _0x11d35d.pcs[_0x2f4eb6].setAudioBitrate;
            } else if (_0x11d35d.audiobitrate) {
              _0x24598b = _0x11d35d.audiobitrate;
            }
            _0x2b4213.maxBitrate = _0x24598b * 0x400;
          } else if (_0x11d35d.pcs[_0x2f4eb6].setAudioBitrate !== false) {
            _0x24598b = _0x11d35d.pcs[_0x2f4eb6].setAudioBitrate;
            _0x2b4213.maxBitrate = _0x24598b * 0x400;
          } else {
            _0x2b4213.maxBitrate = null;
          }
        } else if (_0x24598b === 0x0) {
          _0x2b4213.active = false;
        } else {
          _0x2b4213.active = true;
          _0x2b4213.maxBitrate = _0x24598b * 0x400;
        }
        if (_0x11d35d.pcs[_0x2f4eb6].audioMutedOverride) {
          _0x2b4213.active = false;
        }
        setEncodings(_0x4716e6, _0x2b4213, function (_0x5b4d5d) {
          pokeIframeAPI('setAudioBitrate', _0x5b4d5d[0x0], _0x5b4d5d[0x1]);
          pokeIframeAPI("set-audio-bitrate", _0x5b4d5d[0x0], _0x5b4d5d[0x1]);
          log("audio bandwidth set f!");
        }, [_0x24598b, _0x2f4eb6]);
      } catch (_0x3e2be3) {
        errorlog(_0x3e2be3);
        log(_0x2f4eb6);
        log(_0x11d35d.pcs[_0x2f4eb6]);
      }
    };
    _0x11d35d.optimizeBitrate = function (_0x247b1f) {
      if (_0x11d35d.iframeSrc && _0x11d35d.pcs[_0x247b1f].allowIframe === true) {
        _0x11d35d.limitBitrate(_0x247b1f, 0x0);
        if (_0x11d35d.pcs[_0x247b1f].optimizedBitrate === 0x0) {
          if (_0x11d35d.pcs[_0x247b1f].obsState.visibility === false) {
            _0x11d35d.limitAudioBitrate(_0x247b1f, 0x0);
          } else {
            _0x11d35d.limitAudioBitrate(_0x247b1f, -0x1);
          }
        }
      } else {
        if (_0x11d35d.pcs[_0x247b1f] && _0x11d35d.pcs[_0x247b1f].optimizedBitrate !== false) {
          if (_0x11d35d.pcs[_0x247b1f].obsState.visibility === false) {
            var _0x2e20b9 = _0x11d35d.pcs[_0x247b1f].optimizedBitrate;
            if (_0x11d35d.pcs[_0x247b1f].savedBitrate && _0x11d35d.pcs[_0x247b1f].savedBitrate > 0x0) {
              if (_0x11d35d.pcs[_0x247b1f].savedBitrate < _0x11d35d.pcs[_0x247b1f].optimizedBitrate) {
                _0x2e20b9 = _0x11d35d.pcs[_0x247b1f].savedBitrate;
              }
            }
            _0x11d35d.limitBitrate(_0x247b1f, _0x2e20b9);
            if (_0x11d35d.pcs[_0x247b1f].optimizedBitrate === 0x0) {
              _0x11d35d.limitAudioBitrate(_0x247b1f, 0x0);
            }
          } else if (_0x11d35d.pcs[_0x247b1f].optimizedBitrate === 0x0) {
            _0x11d35d.limitAudioBitrate(_0x247b1f, -0x1);
            _0x11d35d.limitTotalBitrateGuests();
            if (_0x11d35d.maxvideobitrate) {
              _0x11d35d.limitBitrate(_0x247b1f, null);
            }
          }
        } else {
          _0x11d35d.limitTotalBitrateGuests();
          if (_0x11d35d.maxvideobitrate) {
            _0x11d35d.limitBitrate(_0x247b1f, null);
          }
        }
      }
    };
    _0x11d35d.limitTotalBitrateGuests = function (_0x3d16e1 = 0x0, _0x234788 = false) {
      if (!_0x11d35d.limitTotalBitrate) {
        return _0x3d16e1;
      }
      if (!_0x11d35d.roomid || _0x11d35d.scene !== false) {
        log("Switching to limitTotalBitrateAll");
        _0x11d35d.limitTotalBitrateAll(_0x3d16e1, _0x234788);
        return _0x3d16e1;
      }
      if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
        return _0x3d16e1;
      }
      var _0x47c138 = _0x3d16e1;
      if (_0x234788 === false) {
        _0x47c138 = 0x0;
      } else if (_0x47c138 < 0x0) {
        _0x47c138 = _0x11d35d.pcs[_0x234788].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x23b5f6].maxBandwidth || 0x9c4;
      }
      var _0x404de5 = 0x0;
      for (var _0x23b5f6 in _0x11d35d.pcs) {
        if (_0x234788 === _0x23b5f6) {
          continue;
        }
        if (!_0x11d35d.pcs[_0x23b5f6].guest) {
          continue;
        }
        try {
          var _0x25efd1 = getSenders2(_0x23b5f6).find(function (_0x5731dc) {
            return _0x5731dc.track && _0x5731dc.track.kind == 'video';
          });
          if (!_0x25efd1) {
            continue;
          }
          var _0x1fad41 = _0x25efd1.getParameters();
          if (!_0x1fad41.encodings || _0x1fad41.encodings.length == 0x0) {
            if (_0x11d35d.pcs[_0x23b5f6].setBitrate < 0x0) {
              _0x47c138 += _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x23b5f6].maxBandwidth || 0x9c4;
            } else {
              _0x47c138 += _0x11d35d.pcs[_0x23b5f6].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x23b5f6].maxBandwidth || 0x9c4;
            }
            warnlog(_0x47c138);
            _0x404de5 += 0x1;
            continue;
          }
          if (_0x1fad41.encodings[0x0].active == false) {
            continue;
          }
          if (_0x1fad41.encodings[0x0].maxBitrate) {
            if ('preLimitedBitrate' in _0x11d35d.pcs[_0x23b5f6]) {
              _0x47c138 += parseInt(_0x11d35d.pcs[_0x23b5f6].preLimitedBitrate);
            } else {
              _0x47c138 += parseInt(_0x1fad41.encodings[0x0].maxBitrate) / 0x400;
            }
          } else if (_0x11d35d.pcs[_0x23b5f6].setBitrate < 0x0) {
            _0x47c138 += _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x23b5f6].maxBandwidth || 0x9c4;
          } else {
            _0x47c138 += _0x11d35d.pcs[_0x23b5f6].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x23b5f6].maxBandwidth || 0x9c4;
            warnlog(_0x47c138);
          }
          _0x404de5 += 0x1;
        } catch (_0x11a8ca) {
          errorlog(_0x11a8ca);
        }
      }
      if (!_0x47c138) {
        return _0x47c138;
      }
      warnlog("totalBitrate: " + _0x47c138);
      var _0x203ab3 = parseFloat(_0x47c138 / _0x11d35d.limitTotalBitrate);
      if (_0x203ab3 < 0x1) {
        _0x203ab3 = 0x1;
      }
      for (var _0x23b5f6 in _0x11d35d.pcs) {
        if (_0x234788 === _0x23b5f6) {
          continue;
        }
        if (!_0x11d35d.pcs[_0x23b5f6].guest) {
          continue;
        }
        try {
          var _0x25efd1 = getSenders2(_0x23b5f6).find(function (_0x363b5f) {
            return _0x363b5f.track && _0x363b5f.track.kind == "video";
          });
          if (!_0x25efd1) {
            continue;
          }
          var _0x1fad41 = _0x25efd1.getParameters();
          if (!_0x1fad41.encodings || _0x1fad41.encodings.length == 0x0) {
            if (_0x11d35d.pcs[_0x23b5f6].setBitrate < 0x0) {
              var _0xa467ec = _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x23b5f6].maxBandwidth || 0x9c4;
            } else {
              var _0xa467ec = _0x11d35d.pcs[_0x23b5f6].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x23b5f6].maxBandwidth || 0x9c4;
            }
            var _0x5a7fc5 = parseInt(_0xa467ec / _0x203ab3);
            _0x11d35d.limitBitrate(_0x23b5f6, _0x5a7fc5, true);
            continue;
          }
          if (_0x1fad41.encodings[0x0].active == false) {
            continue;
          }
          if (_0x1fad41.encodings[0x0].maxBitrate) {
            if ("preLimitedBitrate" in _0x11d35d.pcs[_0x23b5f6]) {
              var _0xa467ec = parseInt(_0x11d35d.pcs[_0x23b5f6].preLimitedBitrate);
            } else {
              var _0xa467ec = parseInt(parseInt(_0x1fad41.encodings[0x0].maxBitrate) / 0x400);
            }
            var _0x5a7fc5 = parseInt(_0xa467ec / _0x203ab3);
            _0x11d35d.limitBitrate(_0x23b5f6, _0x5a7fc5, true);
          } else {
            if (_0x11d35d.pcs[_0x23b5f6].setBitrate < 0x0) {
              var _0xa467ec = _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x23b5f6].maxBandwidth || 0x9c4;
            } else {
              var _0xa467ec = _0x11d35d.pcs[_0x23b5f6].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x23b5f6].maxBandwidth || 0x9c4;
            }
            var _0x5a7fc5 = parseInt(_0xa467ec / _0x203ab3);
            _0x11d35d.limitBitrate(_0x23b5f6, _0x5a7fc5, true);
          }
        } catch (_0x16aa5b) {
          errorlog(_0x16aa5b);
        }
      }
      return parseInt(_0x3d16e1 / _0x203ab3);
    };
    _0x11d35d.limitTotalBitrateAll = function (_0x252e65 = 0x0, _0x3220a3 = false) {
      if (!_0x11d35d.limitTotalBitrate) {
        return _0x252e65;
      }
      if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
        return _0x252e65;
      }
      var _0xe319ba = _0x252e65;
      if (_0x3220a3 === false) {
        _0xe319ba = 0x0;
      } else if (_0xe319ba < 0x0) {
        _0xe319ba = _0x11d35d.pcs[_0x3220a3].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x3d731d].maxBandwidth || 0x9c4;
      }
      var _0x3b692f = 0x0;
      for (var _0x3d731d in _0x11d35d.pcs) {
        if (_0x3220a3 === _0x3d731d) {
          continue;
        }
        try {
          var _0x1c5a03 = getSenders2(_0x3d731d).find(function (_0x188c85) {
            return _0x188c85.track && _0x188c85.track.kind == "video";
          });
          if (!_0x1c5a03) {
            continue;
          }
          var _0x66f9a0 = _0x1c5a03.getParameters();
          if (!_0x66f9a0.encodings || _0x66f9a0.encodings.length == 0x0) {
            if (_0x11d35d.pcs[_0x3d731d].setBitrate < 0x0) {
              _0xe319ba += _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x3d731d].maxBandwidth || 0x9c4;
            } else {
              _0xe319ba += _0x11d35d.pcs[_0x3d731d].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x3d731d].maxBandwidth || 0x9c4;
            }
            warnlog(_0xe319ba);
            _0x3b692f += 0x1;
            continue;
          }
          if (_0x66f9a0.encodings[0x0].active == false) {
            continue;
          }
          if (_0x66f9a0.encodings[0x0].maxBitrate) {
            if ("preLimitedBitrate" in _0x11d35d.pcs[_0x3d731d]) {
              _0xe319ba += parseInt(_0x11d35d.pcs[_0x3d731d].preLimitedBitrate);
            } else {
              _0xe319ba += parseInt(_0x66f9a0.encodings[0x0].maxBitrate) / 0x400;
            }
          } else if (_0x11d35d.pcs[_0x3d731d].setBitrate < 0x0) {
            _0xe319ba += _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x3d731d].maxBandwidth || 0x9c4;
          } else {
            _0xe319ba += _0x11d35d.pcs[_0x3d731d].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x3d731d].maxBandwidth || 0x9c4;
            warnlog(_0xe319ba);
          }
          _0x3b692f += 0x1;
        } catch (_0x4cda00) {
          errorlog(_0x4cda00);
        }
      }
      if (!_0xe319ba) {
        return _0xe319ba;
      }
      warnlog("totalBitrate: " + _0xe319ba);
      var _0x1395c6 = parseFloat(_0xe319ba / _0x11d35d.limitTotalBitrate);
      if (_0x1395c6 < 0x1) {
        _0x1395c6 = 0x1;
      }
      for (var _0x3d731d in _0x11d35d.pcs) {
        if (_0x3220a3 === _0x3d731d) {
          continue;
        }
        try {
          var _0x1c5a03 = getSenders2(_0x3d731d).find(function (_0x171587) {
            return _0x171587.track && _0x171587.track.kind == "video";
          });
          if (!_0x1c5a03) {
            continue;
          }
          var _0x66f9a0 = _0x1c5a03.getParameters();
          if (!_0x66f9a0.encodings || _0x66f9a0.encodings.length == 0x0) {
            if (_0x11d35d.pcs[_0x3d731d].setBitrate < 0x0) {
              var _0xa11d01 = _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x3d731d].maxBandwidth || 0x9c4;
            } else {
              var _0xa11d01 = _0x11d35d.pcs[_0x3d731d].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x3d731d].maxBandwidth || 0x9c4;
            }
            var _0x34d8c5 = parseInt(_0xa11d01 / _0x1395c6);
            _0x11d35d.limitBitrate(_0x3d731d, _0x34d8c5, true);
            continue;
          }
          if (_0x66f9a0.encodings[0x0].active == false) {
            continue;
          }
          if (_0x66f9a0.encodings[0x0].maxBitrate) {
            if ('preLimitedBitrate' in _0x11d35d.pcs[_0x3d731d]) {
              var _0xa11d01 = parseInt(_0x11d35d.pcs[_0x3d731d].preLimitedBitrate);
            } else {
              var _0xa11d01 = parseInt(parseInt(_0x66f9a0.encodings[0x0].maxBitrate) / 0x400);
            }
            var _0x34d8c5 = parseInt(_0xa11d01 / _0x1395c6);
            _0x11d35d.limitBitrate(_0x3d731d, _0x34d8c5, true);
          } else {
            if (_0x11d35d.pcs[_0x3d731d].setBitrate < 0x0) {
              var _0xa11d01 = _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x3d731d].maxBandwidth || 0x9c4;
            } else {
              var _0xa11d01 = _0x11d35d.pcs[_0x3d731d].setBitrate || _0x11d35d.outboundVideoBitrate || _0x11d35d.pcs[_0x3d731d].maxBandwidth || 0x9c4;
            }
            var _0x34d8c5 = parseInt(_0xa11d01 / _0x1395c6);
            _0x11d35d.limitBitrate(_0x3d731d, _0x34d8c5, true);
          }
        } catch (_0x3ecd79) {
          errorlog(_0x3ecd79);
        }
      }
      return parseInt(_0x252e65 / _0x1395c6);
    };
    _0x11d35d.announceCoDirector = function (_0x437475, _0x5a4017 = false) {
      var _0x2aeb5c = {
        "directorSettings": {}
      };
      _0x2aeb5c.directorSettings.addCoDirector = [_0x437475];
      _0x11d35d.sendPeers(_0x2aeb5c, _0x5a4017);
      pokeIframeAPI("new-co-director", _0x437475);
    };
    _0x11d35d.limitMeshcastBitrate = function (_0x91fcea = null) {
      if (!_0x11d35d.whipOut) {
        return;
      }
      if (_0x11d35d.whipOut.bitrateTimeout) {
        clearInterval(_0x11d35d.whipOut.bitrateTimeout);
        _0x11d35d.whipOut.bitrateTimeout = null;
      }
      if (_0x91fcea === null) {
        if (_0x11d35d.whipOut.savedBitrate === false) {
          return;
        }
        _0x91fcea = _0x11d35d.whipOut.savedBitrate;
      }
      _0x91fcea = parseInt(_0x91fcea);
      if (_0x11d35d.whipOut.setBitrate && _0x91fcea > _0x11d35d.whipOut.setBitrate) {
        _0x91fcea = _0x11d35d.whipOut.setBitrate;
      } else if (_0x11d35d.whipOut.setBitrate === false) {
        if (_0x91fcea < 0x0) {
          if (_0x11d35d.outboundVideoBitrate) {
            _0x91fcea = _0x11d35d.outboundVideoBitrate;
          } else {
            _0x91fcea = 0x9c4;
          }
        }
      }
      if (_0x11d35d.maxvideobitrate) {
        if (_0x91fcea > _0x11d35d.maxvideobitrate) {
          _0x91fcea = _0x11d35d.maxvideobitrate;
        }
      }
      _0x11d35d.whipOut.savedBitrate = _0x91fcea;
      if (_0x11d35d.whipOut.optimizedBitrate !== false) {
        if (_0x11d35d.whipOut.obsState.visibility === false) {
          if (_0x91fcea > _0x11d35d.whipOut.optimizedBitrate) {
            _0x11d35d.whipOut.savedBitrate = _0x91fcea;
            _0x91fcea = parseInt(_0x11d35d.whipOut.optimizedBitrate) || 0x0;
          }
        }
      }
      if (_0x11d35d.whipOut.maxBandwidth !== null) {
        if (_0x11d35d.whipOut.maxBandwidth < _0x91fcea) {
          _0x91fcea = _0x11d35d.whipOut.maxBandwidth;
          _0x11d35d.whipOut.stats.max_bandwidth_capped_kbps = _0x91fcea;
          warnlog("Max bandwidth being capped: " + _0x91fcea + "-kbps");
        } else if (_0x11d35d.whipOut.stats) {
          _0x11d35d.whipOut.stats.max_bandwidth_capped_kbps = false;
        }
      } else if ('max_bandwidth_capped_kbps' in _0x11d35d.whipOut.stats) {
        _0x11d35d.whipOut.stats.max_bandwidth_capped_kbps = false;
      }
      if (_0x91fcea === 0x0) {
        var _0x1366b8 = Date.now() - _0x11d35d.whipOut.startTime;
        if (_0x1366b8 < _0x11d35d.rampUpTime) {
          _0x91fcea = _0x11d35d.preloadbitrate;
          log("starting some preload bitrate " + (Date.now() - _0x11d35d.whipOut.startTime));
          _0x11d35d.whipOut.bitrateTimeout = setTimeout(function () {
            try {
              warnlog("stopping some preload bitrate " + (Date.now() - _0x11d35d.whipOut.startTime));
              _0x11d35d.limitMeshcastBitrate(null);
            } catch (_0x14531f) {}
            ;
          }, _0x11d35d.rampUpTime - _0x1366b8 + 0x5);
        }
      }
      try {
        if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
          log("iOS devices do not support dynamic bitrates correctly; skipping");
          var _0x49aa8a = _0x11d35d.whipOut.getSenders().find(function (_0x2aff4b) {
            return _0x2aff4b.track && _0x2aff4b.track.kind == "video";
          });
          if (!_0x49aa8a) {
            warnlog("can't change bitrate; no video sender found");
            return;
          }
          var _0x2cfdfb = {};
          if (_0x91fcea < 0x0) {
            _0x2cfdfb.active = true;
            _0x91fcea = 0x9c4;
            if (_0x11d35d.bitrate) {
              _0x91fcea = _0x11d35d.bitrate;
            }
            if (_0x11d35d.maxvideobitrate) {
              if (_0x91fcea > _0x11d35d.maxvideobitrate) {
                _0x91fcea = _0x11d35d.maxvideobitrate;
              }
            }
            _0x2cfdfb.maxBitrate = _0x91fcea * 0x400;
          } else if (_0x91fcea === 0x0) {
            _0x2cfdfb.active = false;
          } else {
            _0x2cfdfb.active = true;
            _0x2cfdfb.maxBitrate = _0x91fcea * 0x400;
          }
          setEncodings(_0x49aa8a, _0x2cfdfb, function (_0xa1ff7b) {
            pokeIframeAPI("set-meshcast-video-bitrate", _0xa1ff7b);
            log("bandwidth set g! " + _0xa1ff7b);
          }, _0x91fcea);
          return;
        } else {
          if ('RTCRtpSender' in window && "setParameters" in window.RTCRtpSender.prototype) {
            var _0x49aa8a = _0x11d35d.whipOut.getSenders().find(function (_0x43845c) {
              return _0x43845c.track && _0x43845c.track.kind == 'video';
            });
            if (!_0x49aa8a) {
              log("can't change bitrate; no video sender found");
              return;
            }
            var _0x2cfdfb = {};
            if (_0x91fcea < 0x0) {
              if (_0x2cfdfb.active == false) {
                _0x2cfdfb.active = true;
              }
              _0x2cfdfb.maxBitrate = null;
            } else if (_0x91fcea === 0x0) {
              _0x2cfdfb.active = false;
              if (Firefox) {
                _0x2cfdfb.maxBitrate = 0x1;
              }
            } else {
              _0x2cfdfb.active = true;
              _0x2cfdfb.maxBitrate = _0x91fcea * 0x400;
            }
            if (iPad || iOS || Firefox) {
              if (_0x11d35d.whipOut.bitrateTimeoutFirefox) {
                clearInterval(_0x11d35d.whipOut.bitrateTimeoutFirefox);
                _0x11d35d.whipOut.bitrateTimeoutFirefox = setTimeout(function () {
                  log("bitrate timeout; ios/firefox specific: " + _0x91fcea);
                  _0x11d35d.whipOut.bitrateTimeoutFirefox = false;
                  _0x11d35d.limitMeshcastBitrate(null);
                }, 0x1f4);
              } else {
                _0x11d35d.whipOut.bitrateTimeoutFirefox = setTimeout(function () {
                  _0x11d35d.whipOut.bitrateTimeoutFirefox = false;
                }, 0x1f4);
                setEncodings(_0x49aa8a, _0x2cfdfb, function (_0x62881f) {
                  log("bandwidth set h! " + _0x62881f);
                  pokeIframeAPI("set-meshcast-video-bitrate", _0x62881f);
                }, _0x91fcea);
              }
            } else {
              setEncodings(_0x49aa8a, _0x2cfdfb, function (_0x31a300) {
                log("bandwidth set i! " + _0x31a300);
                pokeIframeAPI("set-meshcast-video-bitrate", _0x31a300);
              }, _0x91fcea);
            }
            return;
          } else {
            warnlog("BROWER DID NOT SUPPORT LIMIT BITRATE");
          }
        }
      } catch (_0x35d4bb) {
        errorlog(_0x35d4bb);
      }
    };
    _0x11d35d.targetBitrate = function (_0x46ef41, _0x4a2bcd) {
      if (_0x4a2bcd === false) {
        _0x11d35d.pcs[_0x46ef41].setBitrate = false;
        _0x11d35d.limitBitrate(_0x46ef41, -0x1);
      } else {
        _0x4a2bcd = parseInt(_0x4a2bcd) || -0x1;
        if (_0x4a2bcd >= 0x0) {
          _0x11d35d.pcs[_0x46ef41].setBitrate = _0x4a2bcd;
          _0x11d35d.limitBitrate(_0x46ef41, _0x4a2bcd);
        }
      }
    };
    _0x11d35d.targetAudioBitrate = function (_0x178c3a, _0x286d6e) {
      if (_0x286d6e === false) {
        _0x11d35d.pcs[_0x178c3a].setAudioBitrate = false;
        _0x11d35d.limitAudioBitrate(_0x178c3a, -0x1);
      } else {
        _0x286d6e = parseInt(_0x286d6e) || -0x1;
        if (_0x286d6e >= 0x0) {
          _0x11d35d.pcs[_0x178c3a].setAudioBitrate = _0x286d6e;
          _0x11d35d.limitAudioBitrate(_0x178c3a, _0x286d6e);
        }
      }
    };
    _0x11d35d.limitBitrate = function (_0x266f21, _0x351ee2 = null, _0xba4617 = false) {
      log("Bitrate request: " + _0x351ee2);
      if (!(_0x266f21 in _0x11d35d.pcs)) {
        return;
      }
      if (_0x11d35d.pcs[_0x266f21].bitrateTimeout) {
        clearInterval(_0x11d35d.pcs[_0x266f21].bitrateTimeout);
        _0x11d35d.pcs[_0x266f21].bitrateTimeout = null;
      }
      var _0x268c16 = true;
      if (_0x351ee2 === null) {
        if (_0x11d35d.pcs[_0x266f21].savedBitrate === false) {
          if (_0x11d35d.pcs[_0x266f21].maxBandwidth === null) {
            return;
          } else {
            _0x351ee2 = _0x11d35d.pcs[_0x266f21].maxBandwidth;
            _0x268c16 = false;
          }
        } else {
          _0x351ee2 = _0x11d35d.pcs[_0x266f21].savedBitrate;
        }
      }
      _0x351ee2 = parseInt(_0x351ee2);
      if (_0x11d35d.pcs[_0x266f21].setBitrate && _0x351ee2 > _0x11d35d.pcs[_0x266f21].setBitrate) {
        _0x351ee2 = _0x11d35d.pcs[_0x266f21].setBitrate;
      } else if (_0x351ee2 < 0x0) {
        _0x351ee2 = _0x11d35d.pcs[_0x266f21].setBitrate || _0x11d35d.outboundVideoBitrate || 0x9c4;
      }
      if (_0x11d35d.maxvideobitrate) {
        if (_0x351ee2 > _0x11d35d.maxvideobitrate) {
          _0x351ee2 = _0x11d35d.maxvideobitrate;
        }
      }
      if (_0x268c16 && !_0xba4617) {
        log("save bandwidth: " + _0x351ee2);
        _0x11d35d.pcs[_0x266f21].savedBitrate = _0x351ee2;
      }
      if (_0x11d35d.pcs[_0x266f21].optimizedBitrate !== false) {
        if (_0x11d35d.pcs[_0x266f21].obsState.visibility === false) {
          if (_0x351ee2 > _0x11d35d.pcs[_0x266f21].optimizedBitrate) {
            if (_0x268c16) {
              _0x11d35d.pcs[_0x266f21].savedBitrate = _0x351ee2;
            }
            _0x351ee2 = parseInt(_0x11d35d.pcs[_0x266f21].optimizedBitrate) || 0x0;
          }
        }
      }
      if (_0x11d35d.pcs[_0x266f21].maxBandwidth !== null) {
        if (_0x11d35d.pcs[_0x266f21].maxBandwidth < _0x351ee2) {
          _0x351ee2 = _0x11d35d.pcs[_0x266f21].maxBandwidth;
          _0x11d35d.pcs[_0x266f21].stats.max_bandwidth_capped_kbps = _0x351ee2;
          warnlog("Max bandwidth being capped: " + _0x351ee2 + '-kbps');
        } else if (_0x11d35d.pcs[_0x266f21].maxBandwidth === _0x351ee2 && !_0x268c16) {
          _0x11d35d.pcs[_0x266f21].stats.max_bandwidth_capped_kbps = _0x351ee2;
          warnlog("Max bandwidth controlling bitrate: " + _0x351ee2 + '-kbps');
        } else {
          warnlog("Max bandwidth NOT being capped: " + _0x351ee2 + "-kbps");
          _0x11d35d.pcs[_0x266f21].stats.max_bandwidth_capped_kbps = false;
        }
      } else if ("max_bandwidth_capped_kbps" in _0x11d35d.pcs[_0x266f21].stats) {
        _0x11d35d.pcs[_0x266f21].stats.max_bandwidth_capped_kbps = false;
      }
      if (_0xba4617 === false) {
        if (_0x11d35d.limitTotalBitrate) {
          _0x11d35d.pcs[_0x266f21].preLimitedBitrate = _0x351ee2;
          _0x351ee2 = _0x11d35d.limitTotalBitrateGuests(_0x351ee2, _0x266f21);
        }
      }
      if (_0x351ee2 === 0x0) {
        var _0x4d8dec = Date.now() - _0x11d35d.pcs[_0x266f21].startTime;
        if (_0x4d8dec < _0x11d35d.rampUpTime) {
          _0x351ee2 = _0x11d35d.preloadbitrate;
          log("starting some preload bitrate " + (Date.now() - _0x11d35d.pcs[_0x266f21].startTime));
          _0x11d35d.pcs[_0x266f21].bitrateTimeout = setTimeout(function (_0x24d9cb) {
            try {
              warnlog("stopping some preload bitrate " + (Date.now() - _0x11d35d.pcs[_0x24d9cb].startTime));
              _0x11d35d.limitBitrate(_0x24d9cb, null);
            } catch (_0x2c08f6) {}
            ;
          }, _0x11d35d.rampUpTime - _0x4d8dec + 0x5, _0x266f21);
        }
      }
      try {
        if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
          log("iOS devices do not support dynamic bitrates correctly; skipping");
          if (_0x11d35d.pcs[_0x266f21].guest == true && _0x11d35d.pcs[_0x266f21].forceios == false) {
            return;
          }
          var _0x17ef11 = getSenders2(_0x266f21).find(function (_0x2dfaa9) {
            return _0x2dfaa9.track && _0x2dfaa9.track.kind == "video";
          });
          if (!_0x17ef11) {
            log("can't change bitrate; no video sender found");
            return;
          }
          var _0x3dc8f2 = {};
          if (_0x351ee2 === 0x0) {
            _0x3dc8f2.active = false;
          } else {
            _0x3dc8f2.active = true;
            _0x3dc8f2.maxBitrate = _0x351ee2 * 0x400;
          }
          setEncodings(_0x17ef11, _0x3dc8f2, function (_0x4b677f) {
            pokeIframeAPI('setVideoBitrate', _0x4b677f[0x0], _0x4b677f[0x1]);
            pokeIframeAPI("set-video-bitrate", _0x4b677f[0x0], _0x4b677f[0x1]);
            log("bandwidth set a! " + _0x4b677f[0x0]);
          }, [_0x351ee2, _0x266f21]);
          return;
        } else {
          if ('RTCRtpSender' in window && "setParameters" in window.RTCRtpSender.prototype) {
            var _0x17ef11 = getSenders2(_0x266f21).find(function (_0x4a5898) {
              return _0x4a5898.track && _0x4a5898.track.kind == "video";
            });
            if (!_0x17ef11) {
              log("can't change bitrate; no video sender found");
              return;
            }
            var _0x3dc8f2 = {};
            if (_0x351ee2 === 0x0) {
              _0x3dc8f2.active = false;
              if (Firefox) {
                _0x3dc8f2.maxBitrate = 0x1;
                _0x3dc8f2.scaleResolutionDownBy = 0x3e8;
              }
            } else {
              _0x3dc8f2.active = true;
              _0x3dc8f2.maxBitrate = _0x351ee2 * 0x400;
            }
            if (_0x351ee2 !== 0x0) {
              var _0x46e493 = _0x11d35d.calculateScale(_0x266f21, _0x351ee2);
              if (_0x46e493 <= 0x0 || _0x46e493 == 0x64) {
                var _0x2ba14e = getChromiumVersion();
                if (_0x2ba14e > 0x50) {
                  _0x3dc8f2.scaleResolutionDownBy = null;
                } else {
                  _0x3dc8f2.scaleResolutionDownBy = 0x1;
                }
              } else {
                _0x3dc8f2.scaleResolutionDownBy = 0x64 / _0x46e493;
              }
              if (iPad || iOS || Firefox) {
                if (_0x11d35d.pcs[_0x266f21].bitrateTimeoutFirefox) {
                  clearInterval(_0x11d35d.pcs[_0x266f21].bitrateTimeoutFirefox);
                  _0x11d35d.pcs[_0x266f21].bitrateTimeoutFirefox = setTimeout(function (_0x2c2f74, _0x2a08c7) {
                    log("bitrate timeout; ios/firefox specific: " + _0x351ee2);
                    _0x11d35d.pcs[_0x2c2f74].bitrateTimeoutFirefox = false;
                    _0x11d35d.limitBitrate(_0x2c2f74, null, _0x2a08c7);
                  }, 0x1f4, _0x266f21, _0xba4617);
                } else {
                  _0x11d35d.pcs[_0x266f21].bitrateTimeoutFirefox = setTimeout(function (_0x15adc3) {
                    _0x11d35d.pcs[_0x15adc3].bitrateTimeoutFirefox = false;
                  }, 0x1f4, _0x266f21);
                  setEncodings(_0x17ef11, _0x3dc8f2, function (_0x44c816) {
                    log("bandwidth set b! " + _0x44c816[0x0]);
                    _0x11d35d.pcs[_0x44c816[0x1]].stats.scaleFactor = parseInt(_0x44c816[0x2]) + '%';
                    pokeIframeAPI("setVideoBitrate", _0x44c816[0x0], _0x44c816[0x1]);
                    pokeIframeAPI("setVideoScale", _0x44c816[0x2], _0x44c816[0x1]);
                    pokeIframeAPI("set-video-bitrate", _0x44c816[0x0], _0x44c816[0x1]);
                    pokeIframeAPI("set-video-scale", _0x44c816[0x2], _0x44c816[0x1]);
                  }, [_0x351ee2, _0x266f21, _0x46e493]);
                }
              } else {
                warnlog(_0x3dc8f2);
                setEncodings(_0x17ef11, _0x3dc8f2, function (_0x4fc8b3) {
                  log("bandwidth set c! " + _0x4fc8b3[0x0]);
                  _0x11d35d.pcs[_0x4fc8b3[0x1]].stats.scaleFactor = parseInt(_0x4fc8b3[0x2]) + '%';
                  pokeIframeAPI("setVideoBitrate", _0x4fc8b3[0x0], _0x4fc8b3[0x1]);
                  pokeIframeAPI("setVideoScale", _0x4fc8b3[0x2], _0x4fc8b3[0x1]);
                  pokeIframeAPI("set-video-bitrate", _0x4fc8b3[0x0], _0x4fc8b3[0x1]);
                  pokeIframeAPI('set-video-scale', _0x4fc8b3[0x2], _0x4fc8b3[0x1]);
                }, [_0x351ee2, _0x266f21, _0x46e493]);
              }
            } else if (iPad || iOS || Firefox) {
              if (_0x11d35d.pcs[_0x266f21].bitrateTimeoutFirefox) {
                clearInterval(_0x11d35d.pcs[_0x266f21].bitrateTimeoutFirefox);
                _0x11d35d.pcs[_0x266f21].bitrateTimeoutFirefox = setTimeout(function (_0x2d3b71, _0x2c1b81) {
                  log("bitrate timeout; ios/firefox specific: " + _0x351ee2);
                  _0x11d35d.pcs[_0x2d3b71].bitrateTimeoutFirefox = false;
                  _0x11d35d.limitBitrate(_0x2d3b71, null, _0x2c1b81);
                }, 0x1f4, _0x266f21, _0xba4617);
              } else {
                _0x11d35d.pcs[_0x266f21].bitrateTimeoutFirefox = setTimeout(function (_0x1ad2e1) {
                  _0x11d35d.pcs[_0x1ad2e1].bitrateTimeoutFirefox = false;
                }, 0x1f4, _0x266f21);
                setEncodings(_0x17ef11, _0x3dc8f2, function (_0xd898cf) {
                  log("bandwidth set d! " + _0xd898cf[0x0]);
                  pokeIframeAPI("setVideoBitrate", _0xd898cf[0x0], _0xd898cf[0x1]);
                  pokeIframeAPI("set-video-bitrate", _0xd898cf[0x0], _0xd898cf[0x1]);
                }, [_0x351ee2, _0x266f21]);
              }
            } else {
              setEncodings(_0x17ef11, _0x3dc8f2, function (_0x53e8ab) {
                log("bandwidth set e! " + _0x53e8ab[0x0]);
                pokeIframeAPI('setVideoBitrate', _0x53e8ab[0x0], _0x53e8ab[0x1]);
                pokeIframeAPI("set-video-bitrate", _0x53e8ab[0x0], _0x53e8ab[0x1]);
              }, [_0x351ee2, _0x266f21]);
            }
          } else {
            warnlog("BROWER DID NOT SUPPORT LIMIT BITRATE");
          }
        }
      } catch (_0x299ff2) {
        errorlog(_0x299ff2);
      }
    };
    function _0x49acba(_0x5ab009, _0x4ba03b, _0x321152) {
      if (_0x11d35d.noScaling) {
        return _0x4ba03b;
      }
      warnlog("getOptimizedScale: " + _0x4ba03b + " : " + _0x321152);
      if (_0x321152 < 0x0) {
        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 0x64;
      } else {
        if (_0x321152 >= 0x259) {
          _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 0x64;
        } else {
          if ("realUUID" in _0x11d35d.pcs[_0x5ab009]) {
            _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 0x64;
          } else {
            if (_0x11d35d.screenShareState) {
              _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 0x64;
            } else {
              var _0x24235f = getNativeOutputResolution();
              if (_0x24235f) {
                try {
                  _0x24235f = _0x24235f.width * _0x24235f.height;
                  _0x24235f = Math.pow(_0x24235f, 0.5);
                } catch (_0x2fe0bf) {
                  _0x24235f = false;
                }
              }
              warnlog("dimension: " + _0x24235f);
              if (_0x321152 >= 0x15e) {
                if (_0x24235f && _0x24235f <= 0x1e0) {
                  _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 0x64;
                } else {
                  if (_0x11d35d.mobile) {
                    if (_0x24235f && _0x24235f >= 0x5a0) {
                      _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 33.333333333333336;
                    } else if (_0x11d35d.flagship) {
                      if (_0x24235f && _0x24235f >= 0x3c0) {
                        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 50;
                      } else {
                        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 0x64;
                      }
                    } else {
                      _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 50;
                    }
                  } else {
                    if (_0x24235f && _0x24235f >= 0x5a0) {
                      _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 40;
                    } else if (_0x24235f && _0x24235f >= 0x3c0) {
                      _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 50;
                    } else {
                      _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 0x64;
                    }
                  }
                }
              } else {
                if (_0x321152 >= 0xc9) {
                  if (_0x24235f && _0x24235f < 0x1e0) {
                    _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 0x64;
                  } else {
                    if (_0x11d35d.mobile) {
                      if (_0x24235f && _0x24235f >= 0x5a0) {
                        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 25;
                      } else if (_0x11d35d.flagship) {
                        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 50;
                      } else {
                        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 40;
                      }
                    } else if (_0x24235f && _0x24235f >= 0x5a0) {
                      _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 33.333333333333336;
                    } else {
                      _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 50;
                    }
                  }
                } else {
                  if (_0x24235f && _0x24235f <= 0xf0) {
                    _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 0x64;
                  } else {
                    if (_0x321152 >= 0x51) {
                      if (_0x11d35d.mobile) {
                        if (_0x24235f && _0x24235f >= 0x5a0) {
                          _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 16.666666666666668;
                        } else if (_0x11d35d.flagship) {
                          _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 33.333333333333336;
                        } else {
                          _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 25;
                        }
                      } else if (_0x24235f && _0x24235f >= 0x5a0) {
                        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 25;
                      } else {
                        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 33.333333333333336;
                      }
                    } else {
                      if (_0x11d35d.mobile) {
                        if (_0x24235f && _0x24235f >= 0x3c0) {
                          _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 16.666666666666668;
                        } else if (_0x11d35d.flagship) {
                          _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 25;
                        } else {
                          _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 20;
                        }
                      } else if (_0x24235f && _0x24235f >= 0x5a0) {
                        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 20;
                      } else {
                        _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate = 25;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (_0x11d35d.pcs[_0x5ab009].scaleDueToBitrate < _0x4ba03b) {
        _0x4ba03b = _0x11d35d.pcs[_0x5ab009].scaleDueToBitrate;
      }
      return _0x4ba03b;
    }
    function _0x3b262a(_0x45f8c1, _0x310c3b = 0x2710) {
      _0x310c3b = parseInt(_0x310c3b);
      if (_0x11d35d.audiobitrate) {
        _0x310c3b += _0x11d35d.audiobitrate;
      } else {
        if (_0x11d35d.director && _0x11d35d.stereo == 0x5) {
          _0x310c3b += 0x20;
        } else if (_0x11d35d.stereo && _0x11d35d.stereo != 0x3) {
          if (_0x11d35d.audioCodec && _0x11d35d.audioCodec == 'red') {
            _0x310c3b += _0x11d35d.audiobitratePRO * 0x2;
          } else {
            _0x310c3b += _0x11d35d.audiobitratePRO;
          }
        } else {
          _0x310c3b += 0x20;
        }
      }
      log("actual bitrate:" + _0x310c3b);
      if (_0x310c3b < 0x1) {
        _0x310c3b = 0x1;
      }
      _0x45f8c1 = CodecsHandler.setVideoBitrates(_0x45f8c1, {
        'min': parseInt(_0x310c3b / 0xa) || 0x1,
        'max': _0x310c3b || 0x1
      }, _0x11d35d.codec);
      return _0x45f8c1;
    }
    _0x11d35d.signData = function (_0x5a2bb1, _0x56b27c) {
      log(_0x5a2bb1);
      if (_0x11d35d.mykey === {}) {
        log("Generate Some Crypto keys first");
      }
      window.crypto.subtle.sign({
        'name': "RSASSA-PKCS1-v1_5"
      }, _0x11d35d.mykey.privateKey, _0x11d35d.enc.encode(_0x5a2bb1)).then(function (_0x2612aa) {
        _0x2612aa = new Uint8Array(_0x2612aa);
        _0x2612aa = _0x2612aa.reduce((_0x1d4f04, _0x142825) => _0x1d4f04 + _0x142825.toString(0x10).padStart(0x2, '0'), '');
        _0x56b27c(_0x5a2bb1, _0x2612aa);
        log(JSON.stringify(_0x2612aa));
      })["catch"](errorlog);
    };
    _0x11d35d.verifyData = function (_0x1c0015, _0x46d91f) {
      _0x1c0015.signature = new Uint8Array(_0x1c0015.signature.match(/.{1,2}/g).map(_0x3a90f1 => parseInt(_0x3a90f1, 0x10)));
      if (_0x11d35d.keys[_0x46d91f].publicKey) {
        return window.crypto.subtle.verify({
          'name': 'RSASSA-PKCS1-v1_5'
        }, _0x11d35d.keys[_0x46d91f].publicKey, _0x1c0015.signature, _0x11d35d.enc.encode(_0x1c0015.data)).then(function (_0x4706be) {
          return _0x4706be;
        })["catch"](function (_0x2483a6) {
          errorlog(_0x2483a6);
          return false;
        });
      }
    };
    _0x11d35d.desaltStreamID = function (_0x4441d6) {
      if (_0x11d35d.password) {
        return _0x11d35d.hash !== false ? (_0x4441d6 = _0x4441d6.slice(0x0, -0x1 * _0x11d35d.hash.length), _0x4441d6) : generateHash(_0x11d35d.password + _0x11d35d.salt, 0x6).then(function (_0x8dd569) {
          _0x11d35d.hash = _0x8dd569;
          _0x4441d6 = _0x4441d6.slice(0x0, -0x1 * _0x11d35d.hash.length);
          return _0x4441d6;
        })['catch'](errorlog);
      }
      return _0x4441d6;
    };
    _0x11d35d.ping = function () {
      if (_0x11d35d.customWSS) {
        return;
      }
      clearTimeout(_0x11d35d.pingTimeout);
      if (!_0x11d35d.ws || _0x11d35d.ws.readyState !== 0x1) {
        return;
      }
      _0x11d35d.pingTimeout = setTimeout(function () {
        log('Pinging');
        var _0x4c7c45 = {
          "request": 'ping'
        };
        _0x11d35d.sendMsg(_0x4c7c45);
      }, 0xbb8);
    };
    _0x11d35d.watchStream = async function (_0x6ca2a1) {
      await _0x11d35d.connect();
      if (_0x6ca2a1.length > 0x0) {
        if (_0x6ca2a1 === _0x11d35d.streamID) {
          warnlog("Can't play your own stream ID");
          return;
        }
        var _0x50da33 = {
          "request": "play",
          "streamID": _0x6ca2a1
        };
        _0x11d35d.sendMsg(_0x50da33);
        _0x11d35d.waitingWatchList[_0x6ca2a1] = true;
        pokeIframeAPI('requested-stream', _0x6ca2a1);
      } else {
        log("stream ID is 0 length");
      }
    };
    _0x11d35d.joinRoom = async function _0x3d686e(_0x1bd232) {
      if (_0x11d35d.joiningRoom === false) {
        _0x11d35d.joiningRoom = true;
      }
      await _0x11d35d.connect();
      var _0x30c765 = {
        'request': "joinroom"
      };
      if (_0x11d35d.director && !_0x11d35d.directorView) {
        _0x30c765.claim = true;
      }
      if (_0x11d35d.customWSS) {
        _0x30c765.streamID = _0x11d35d.streamID;
      }
      var _0x3436e5 = '';
      if (_0x11d35d.token) {
        _0x3436e5 = _0x11d35d.token;
      }
      return _0x11d35d.password ? _0x11d35d.hash ? generateHash(_0x1bd232 + _0x11d35d.password + _0x11d35d.salt + _0x3436e5, 0x10).then(function (_0x42613a) {
        if (_0x11d35d.customWSS) {
          _0x11d35d.roomenc = _0x42613a;
        }
        _0x30c765.roomid = _0x42613a;
        _0x11d35d.sendMsg(_0x30c765);
        _0x11d35d.listPromise = _0x5dc993();
        log("deferring with a promise; hashed room");
        pokeIframeAPI('joining-room', _0x1bd232);
        return _0x11d35d.listPromise;
      })["catch"](errorlog) : generateHash(_0x11d35d.password + _0x11d35d.salt, 0x6).then(function (_0x4d9fcc) {
        _0x11d35d.hash = _0x4d9fcc;
        log("hash is " + _0x4d9fcc);
        log("rejoining room");
        return _0x11d35d.joinRoom(_0x1bd232);
      })["catch"](errorlog) : (_0x11d35d.customWSS && (_0x11d35d.roomenc = _0x1bd232), _0x30c765.roomid = _0x1bd232, _0x11d35d.sendMsg(_0x30c765), _0x11d35d.listPromise = _0x5dc993(), log("deferring with a promise"), pokeIframeAPI("joining-room", _0x1bd232), _0x11d35d.listPromise);
    };
    _0x11d35d.sendMsg = function (_0x36f479, _0x3f5e4e = false) {
      if (_0x3f5e4e) {
        _0x36f479.UUID = _0x3f5e4e;
      }
      if (_0x11d35d.customWSS) {
        if (_0x11d35d.UUID) {
          _0x36f479.from = _0x11d35d.UUID;
        } else {
          _0x11d35d.UUID = _0x11d35d.generateStreamID(0x14);
          _0x36f479.from = _0x11d35d.UUID;
        }
        if (_0x36f479.UUID && _0x36f479.from === _0x36f479.UUID) {
          return;
        }
        if (_0x11d35d.director) {
          _0x36f479.director = true;
        }
        if (!('roomid' in _0x36f479)) {
          if (_0x11d35d.roomenc) {
            _0x36f479.roomid = _0x11d35d.roomenc;
          }
        }
      }
      clearTimeout(_0x11d35d.pingTimeout);
      try {
        if (_0x11d35d.password) {
          if (_0x36f479.streamID) {
            if (_0x11d35d.hash !== false) {
              if (!_0x11d35d.ws || typeof _0x11d35d.ws !== "object" || _0x11d35d.ws.readyState !== 0x1) {
                log(_0x36f479, "could not be sent; queuing it");
                _0x11d35d.msg.push(_0x36f479);
              } else {
                _0x36f479.streamID = _0x36f479.streamID.substring(0x0, 0x2c) + _0x11d35d.hash.substring(0x0, 0x6);
                var _0x579e83 = JSON.stringify(_0x36f479);
                if (_0x579e83.length > 0x3a98) {
                  errorlog("msg size error");
                  errorlog(_0x36f479);
                  errorlog(_0x579e83.length);
                  return;
                }
                _0x11d35d.ws.send(_0x579e83);
              }
            } else {
              return generateHash(_0x11d35d.password + _0x11d35d.salt, 0x6).then(function (_0x34ed27) {
                _0x11d35d.hash = _0x34ed27;
                if (typeof _0x11d35d.ws !== "object" || _0x11d35d.ws.readyState !== 0x1) {
                  log(_0x36f479, "could not be sent; queuing it");
                  _0x11d35d.msg.push(_0x36f479);
                } else {
                  _0x36f479.streamID = _0x36f479.streamID.substring(0x0, 0x2c) + _0x11d35d.hash.substring(0x0, 0x6);
                  var _0x3cd133 = JSON.stringify(_0x36f479);
                  if (_0x3cd133.length > 0x3a98) {
                    errorlog("msg size error");
                    return;
                  }
                  _0x11d35d.ws.send(_0x3cd133);
                }
              })["catch"](errorlog);
            }
          } else {
            if (!_0x11d35d.ws || typeof _0x11d35d.ws !== "object" || _0x11d35d.ws.readyState !== 0x1) {
              log(_0x36f479, "could not be sent; queuing it");
              _0x11d35d.msg.push(_0x36f479);
            } else {
              var _0x579e83 = JSON.stringify(_0x36f479);
              if (_0x579e83.length > 0x3a98) {
                errorlog("msg size error");
                return;
              }
              _0x11d35d.ws.send(_0x579e83);
            }
          }
        } else {
          if (typeof _0x11d35d.ws !== "object" || _0x11d35d.ws.readyState !== 0x1) {
            warnlog("message could not be sent; queuing it");
            _0x11d35d.msg.push(_0x36f479);
          } else {
            var _0x579e83 = JSON.stringify(_0x36f479);
            if (_0x579e83.length > 0x3a98) {
              errorlog("msg size error");
              return;
            }
            _0x11d35d.ws.send(_0x579e83);
          }
        }
      } catch (_0x5228a8) {
        errorlog(_0x5228a8);
      }
    };
    _0x11d35d.sendPeers = function (_0x37a560, _0x58631f = false, _0x55feae = false) {
      var _0x15a149 = [];
      var _0x3fc484 = JSON.stringify(_0x37a560);
      for (var _0x15ec17 in _0x11d35d.pcs) {
        if (_0x55feae && _0x55feae === _0x15ec17) {
          continue;
        }
        if (_0x58631f && _0x58631f !== _0x15ec17) {
          continue;
        }
        try {
          _0x11d35d.pcs[_0x15ec17].sendChannel.send(_0x3fc484);
          _0x15a149.push(_0x15ec17);
        } catch (_0x4384d7) {
          if (_0x11d35d.pcs[_0x15ec17].startTime + 0x186a0 < Date.now()) {
            warnlog("RTC Connection seems to be dead or not yet open? 1");
          } else {
            log("RTC Connection seems to be dead or not yet open? 1");
          }
        }
        if (_0x58631f && _0x58631f === _0x15ec17) {
          return _0x15a149.length;
        }
      }
      for (var _0x15ec17 in _0x11d35d.rpcs) {
        if (_0x55feae && _0x55feae === _0x15ec17) {
          continue;
        }
        if (_0x58631f && _0x58631f !== _0x15ec17) {
          continue;
        }
        if (_0x15a149.includes(_0x15ec17)) {
          continue;
        }
        if (_0x11d35d.rpcs[_0x15ec17].whip) {
          warnlog(_0x3fc484);
          continue;
        }
        try {
          if ("realUUID" in _0x11d35d.rpcs[_0x15ec17]) {
            var _0x2962b7 = JSON.parse(_0x37a560);
            _0x2962b7.altUUID = true;
            _0x2962b7 = JSON.stringify(_0x2962b7);
            _0x11d35d.rpcs[_0x11d35d.rpcs[_0x15ec17].realUUID].receiveChannel.send(_0x2962b7);
          } else {
            _0x11d35d.rpcs[_0x15ec17].receiveChannel.send(_0x3fc484);
          }
          _0x15a149.push(_0x15ec17);
        } catch (_0x2d4753) {
          warnlog("RTC Connection seems to be dead or not yet open? 2");
        }
      }
      return _0x15a149.length;
    };
    _0x11d35d.anysend = function (_0x5c6d0c, _0x47bb6e = false) {
      var _0x3df459 = false;
      if ("UUID" in _0x5c6d0c) {
        _0x3df459 = _0x11d35d.sendMessage(_0x5c6d0c, _0x5c6d0c.UUID);
        if (_0x3df459) {
          log(_0x5c6d0c);
          log("successfully sent message vis WebRTC instead of WSS");
        } else {
          log("sending message via WSS as WebRTC failed to send message");
          _0x11d35d.sendMsg(_0x5c6d0c);
        }
      } else if (_0x47bb6e) {
        _0x3df459 = _0x11d35d.sendMessage(_0x5c6d0c);
        if (_0x3df459) {
          log(_0x5c6d0c);
          log("successfully sent message vis WebRTC instead of WSS to all RTC Peers");
        } else {
          log("sending message via WSS as WebRTC failed to send message; RTC peers only");
          _0x11d35d.sendMsg(_0x5c6d0c);
        }
      } else {
        _0x11d35d.sendMsg(_0x5c6d0c);
        warnlog("sending message via server");
        warnlog(_0x5c6d0c);
      }
    };
    _0x11d35d.anyrequest = function (_0x19dcfb, _0x593a57 = false) {
      var _0x46e80a = false;
      if ("UUID" in _0x19dcfb) {
        _0x46e80a = _0x11d35d.sendRequest(_0x19dcfb, _0x19dcfb.UUID);
        if (_0x46e80a) {
          log("successfully sent message vis WebRTC instead of WSS");
        } else {
          log("sending message via WSS as WebRTC failed to send message");
          _0x11d35d.sendMsg(_0x19dcfb);
        }
      } else if (_0x593a57) {
        _0x46e80a = _0x11d35d.sendRequest(_0x19dcfb);
        if (_0x46e80a) {
          log("successfully sent message vis WebRTC instead of WSS to all RTC Peers");
        } else {
          log("sending message via WSS as WebRTC failed to send message; RTC peers only");
          _0x11d35d.sendMsg(_0x19dcfb);
        }
      } else {
        _0x11d35d.sendMsg(_0x19dcfb);
        warnlog("sending request via server");
        warnlog(_0x19dcfb);
      }
    };
    _0x11d35d.directorActions = function (_0x4f5501) {
      log(_0x4f5501);
      if ("action" in _0x4f5501) {
        if ("target" in _0x4f5501) {
          if ('scene' in _0x4f5501) {
            if (_0x11d35d.scene !== false) {
              var _0xbeb5b5 = false;
              var _0x1d3d1b = 0x0;
              for (var _0x45a002 in _0x11d35d.rpcs) {
                _0x1d3d1b += 0x1;
                if (_0x11d35d.rpcs[_0x45a002].streamID === _0x4f5501.target) {
                  if ('value' in _0x4f5501) {
                    if (_0x4f5501.action == "mute") {
                      if (_0x4f5501.value == 0x1) {
                        log("Mute video 3306");
                        _0x11d35d.rpcs[_0x45a002].mutedState = true;
                        applyMuteState(_0x45a002);
                      } else {
                        log("Unmute video");
                        _0x11d35d.rpcs[_0x45a002].mutedState = false;
                        applyMuteState(_0x45a002);
                      }
                      _0x11d35d.sceneSync(_0x45a002);
                    } else {
                      if (_0x4f5501.action == "display") {
                        if (_0x11d35d.view) {
                          return;
                        }
                        ;
                        if (_0x11d35d.scene === _0x4f5501.scene) {
                          if (_0x11d35d.sceneType == 0x2) {
                            if (_0x4f5501.value == 0x0) {
                              _0x11d35d.rpcs[_0x45a002].mutedStateScene = true;
                              applyMuteState(_0x45a002);
                              if (_0x11d35d.rpcs[_0x45a002].videoElement) {
                                if (_0x11d35d.rpcs[_0x45a002].videoElement.style.display && _0x11d35d.rpcs[_0x45a002].videoElement.style.display !== "none") {
                                  _0x11d35d.rpcs[_0x45a002].videoElement.style.display = 'none';
                                  _0x11d35d.rpcs[_0x45a002].videoElement.sceneType2 = false;
                                  _0xbeb5b5 = true;
                                }
                              }
                              if (_0x11d35d.rpcs[_0x45a002].iframeEle && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display !== 'none') {
                                _0x11d35d.rpcs[_0x45a002].iframeEle.style.display = "none";
                                _0x11d35d.rpcs[_0x45a002].iframeEle.sceneType2 = false;
                                _0xbeb5b5 = true;
                              }
                              var _0x1f661b = 0x0;
                              var _0x83b717 = false;
                              for (var _0x194ee9 in _0x11d35d.rpcs) {
                                if (_0x194ee9 !== _0x45a002) {
                                  if (_0x11d35d.rpcs[_0x194ee9].videoElement && _0x11d35d.rpcs[_0x194ee9].videoElement.sceneType2) {
                                    if (_0x11d35d.rpcs[_0x194ee9].videoElement.sceneType2 > _0x1f661b) {
                                      _0x1f661b = _0x11d35d.rpcs[_0x194ee9].videoElement.sceneType2;
                                      _0x83b717 = _0x194ee9;
                                    }
                                  }
                                  if (_0x11d35d.rpcs[_0x194ee9].iframeEle && _0x11d35d.rpcs[_0x194ee9].iframeEle.sceneType2) {
                                    if (_0x11d35d.rpcs[_0x194ee9].iframeEle.sceneType2 > _0x1f661b) {
                                      _0x1f661b = _0x11d35d.rpcs[_0x194ee9].iframeEle.sceneType2;
                                      _0x83b717 = _0x194ee9;
                                    }
                                  }
                                }
                              }
                              if (_0x83b717) {
                                _0x11d35d.rpcs[_0x83b717].mutedStateScene = false;
                                applyMuteState(_0x83b717);
                                if (_0x11d35d.rpcs[_0x83b717].videoElement) {
                                  if (_0x11d35d.rpcs[_0x83b717].videoElement.controlTimer) {
                                    clearInterval(_0x11d35d.rpcs[_0x83b717].videoElement.controlTimer);
                                  }
                                  _0x11d35d.rpcs[_0x83b717].videoElement.controls = false;
                                  if (_0x11d35d.showControls) {
                                    _0x11d35d.rpcs[_0x83b717].videoElement.controlTimer = setTimeout(showControlBar.bind(null, _0x11d35d.rpcs[_0x83b717].videoElement), 0x3e8);
                                  }
                                  if (_0x11d35d.rpcs[_0x83b717].videoElement.style.display && _0x11d35d.rpcs[_0x83b717].videoElement.style.display !== 'block') {
                                    _0x11d35d.rpcs[_0x83b717].videoElement.style.display = "block";
                                    _0x11d35d.rpcs[_0x83b717].videoElement.sceneType2 = Date.now();
                                    _0xbeb5b5 = true;
                                  }
                                }
                                if (_0x11d35d.rpcs[_0x83b717].iframeEle && _0x11d35d.rpcs[_0x83b717].iframeEle.style.display && _0x11d35d.rpcs[_0x83b717].iframeEle.style.display !== "block") {
                                  _0x11d35d.rpcs[_0x83b717].iframeEle.style.display = "block";
                                  _0x11d35d.rpcs[_0x83b717].iframeEle.sceneType2 = Date.now();
                                  _0xbeb5b5 = true;
                                }
                              }
                            } else {
                              for (var _0x194ee9 in _0x11d35d.rpcs) {
                                if (_0x194ee9 !== _0x45a002) {
                                  _0x11d35d.rpcs[_0x194ee9].mutedStateScene = true;
                                  applyMuteState(_0x194ee9);
                                  if (_0x11d35d.rpcs[_0x194ee9].videoElement) {
                                    if (_0x11d35d.rpcs[_0x194ee9].videoElement.style.display && _0x11d35d.rpcs[_0x194ee9].videoElement.style.display !== 'none') {
                                      _0x11d35d.rpcs[_0x194ee9].videoElement.style.display = 'none';
                                      _0xbeb5b5 = true;
                                    }
                                  }
                                  if (_0x11d35d.rpcs[_0x194ee9].iframeEle && _0x11d35d.rpcs[_0x194ee9].iframeEle.style.display && _0x11d35d.rpcs[_0x194ee9].iframeEle.style.display !== "none") {
                                    _0x11d35d.rpcs[_0x194ee9].iframeEle.style.display = "none";
                                    _0xbeb5b5 = true;
                                  }
                                }
                              }
                              _0x11d35d.rpcs[_0x45a002].mutedStateScene = false;
                              applyMuteState(_0x45a002);
                              if (_0x11d35d.rpcs[_0x45a002].videoElement) {
                                if (_0x11d35d.rpcs[_0x45a002].videoElement.controlTimer) {
                                  clearInterval(_0x11d35d.rpcs[_0x45a002].videoElement.controlTimer);
                                }
                                _0x11d35d.rpcs[_0x45a002].videoElement.controls = false;
                                if (_0x11d35d.showControls) {
                                  _0x11d35d.rpcs[_0x45a002].videoElement.controlTimer = setTimeout(showControlBar.bind(null, _0x11d35d.rpcs[_0x45a002].videoElement), 0x3e8);
                                }
                                if (_0x11d35d.rpcs[_0x45a002].videoElement.style.display && _0x11d35d.rpcs[_0x45a002].videoElement.style.display !== "block") {
                                  _0x11d35d.rpcs[_0x45a002].videoElement.style.display = "block";
                                  _0x11d35d.rpcs[_0x45a002].videoElement.sceneType2 = Date.now();
                                  _0xbeb5b5 = true;
                                }
                              }
                              if (_0x11d35d.rpcs[_0x45a002].iframeEle && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display !== "block") {
                                _0x11d35d.rpcs[_0x45a002].iframeEle.style.display = "block";
                                _0x11d35d.rpcs[_0x45a002].iframeEle.sceneType2 = Date.now();
                                _0xbeb5b5 = true;
                              }
                            }
                          } else {
                            if (_0x11d35d.sceneType == 0x1) {
                              if (_0x4f5501.value == 0x0) {
                                if (_0x11d35d.rpcs[_0x45a002].videoElement) {
                                  if (_0x11d35d.rpcs[_0x45a002].videoElement.style.display && _0x11d35d.rpcs[_0x45a002].videoElement.style.display !== "none") {
                                    _0x11d35d.rpcs[_0x45a002].videoElement.style.display = 'none';
                                    _0xbeb5b5 = true;
                                  }
                                }
                                if (_0x11d35d.rpcs[_0x45a002].iframeEle && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display !== "none") {
                                  _0x11d35d.rpcs[_0x45a002].iframeEle.style.display = "none";
                                  _0xbeb5b5 = true;
                                }
                              } else {
                                for (var _0x194ee9 in _0x11d35d.rpcs) {
                                  if (_0x194ee9 !== _0x45a002) {
                                    if (_0x11d35d.rpcs[_0x194ee9].videoElement) {
                                      if (_0x11d35d.rpcs[_0x194ee9].videoElement.style.display && _0x11d35d.rpcs[_0x194ee9].videoElement.style.display !== "none") {
                                        _0x11d35d.rpcs[_0x194ee9].videoElement.style.display = "none";
                                        _0xbeb5b5 = true;
                                      }
                                    }
                                    if (_0x11d35d.rpcs[_0x194ee9].iframeEle && _0x11d35d.rpcs[_0x194ee9].iframeEle.style.display && _0x11d35d.rpcs[_0x194ee9].iframeEle.style.display !== 'none') {
                                      _0x11d35d.rpcs[_0x194ee9].iframeEle.style.display = "none";
                                      _0xbeb5b5 = true;
                                    }
                                  }
                                }
                                if (_0x11d35d.rpcs[_0x45a002].videoElement) {
                                  if (_0x11d35d.rpcs[_0x45a002].videoElement.controlTimer) {
                                    clearInterval(_0x11d35d.rpcs[_0x45a002].videoElement.controlTimer);
                                  }
                                  _0x11d35d.rpcs[_0x45a002].videoElement.controls = false;
                                  if (_0x11d35d.showControls) {
                                    _0x11d35d.rpcs[_0x45a002].videoElement.controlTimer = setTimeout(showControlBar.bind(null, _0x11d35d.rpcs[_0x45a002].videoElement), 0x3e8);
                                  }
                                  if (_0x11d35d.rpcs[_0x45a002].videoElement.style.display && _0x11d35d.rpcs[_0x45a002].videoElement.style.display !== "block") {
                                    _0x11d35d.rpcs[_0x45a002].videoElement.style.display = "block";
                                    _0xbeb5b5 = true;
                                  }
                                }
                                if (_0x11d35d.rpcs[_0x45a002].iframeEle && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display !== "block") {
                                  _0x11d35d.rpcs[_0x45a002].iframeEle.style.display = "block";
                                  _0xbeb5b5 = true;
                                }
                              }
                            } else if (_0x4f5501.value == 0x0) {
                              _0x11d35d.rpcs[_0x45a002].mutedStateScene = true;
                              applyMuteState(_0x45a002);
                              if (_0x11d35d.rpcs[_0x45a002].videoElement) {
                                if (_0x11d35d.rpcs[_0x45a002].videoElement.style.display && _0x11d35d.rpcs[_0x45a002].videoElement.style.display !== "none") {
                                  _0x11d35d.rpcs[_0x45a002].videoElement.style.display = "none";
                                  _0xbeb5b5 = true;
                                }
                              }
                              if (_0x11d35d.rpcs[_0x45a002].iframeEle && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display !== "none") {
                                _0x11d35d.rpcs[_0x45a002].iframeEle.style.display = "none";
                                _0xbeb5b5 = true;
                              }
                            } else {
                              _0x11d35d.rpcs[_0x45a002].mutedStateScene = false;
                              applyMuteState(_0x45a002);
                              if (_0x11d35d.rpcs[_0x45a002].videoElement) {
                                if (_0x11d35d.rpcs[_0x45a002].videoElement.controlTimer) {
                                  clearInterval(_0x11d35d.rpcs[_0x45a002].videoElement.controlTimer);
                                }
                                _0x11d35d.rpcs[_0x45a002].videoElement.controls = false;
                                if (_0x11d35d.showControls) {
                                  _0x11d35d.rpcs[_0x45a002].videoElement.controlTimer = setTimeout(showControlBar.bind(null, _0x11d35d.rpcs[_0x45a002].videoElement), 0x3e8);
                                }
                                if (_0x11d35d.rpcs[_0x45a002].videoElement.style.display && _0x11d35d.rpcs[_0x45a002].videoElement.style.display !== 'block') {
                                  _0x11d35d.rpcs[_0x45a002].videoElement.style.display = "block";
                                  _0xbeb5b5 = true;
                                }
                              }
                              if (_0x11d35d.rpcs[_0x45a002].iframeEle && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display && _0x11d35d.rpcs[_0x45a002].iframeEle.style.display !== "block") {
                                _0x11d35d.rpcs[_0x45a002].iframeEle.style.display = "block";
                                _0xbeb5b5 = true;
                              }
                            }
                          }
                        }
                        _0x11d35d.sceneSync(_0x45a002);
                      } else if (_0x4f5501.action == "volume") {
                        log(parseInt(_0x4f5501.value) / 0x64);
                        if (_0x11d35d.rpcs[_0x45a002].videoElement) {
                          _0x11d35d.rpcs[_0x45a002].videoElement.volume = parseInt(_0x4f5501.value) / 0x64;
                          log('UN-MUTED');
                        }
                      }
                    }
                  }
                }
              }
              if (_0xbeb5b5) {
                updateMixer();
              }
            }
          } else {
            if (_0x4f5501.action == "migrate") {} else {
              if (_0x4f5501.action == 'hangup') {}
            }
          }
        } else if (_0x4f5501.action === "layout") {
          warnlog("custom layout being applied");
          log(_0x4f5501);
          _0x11d35d.layout = _0x4f5501.value;
          pokeIframeAPI('layout-updated', _0x11d35d.layout);
          updateMixer();
        }
      }
    };
    _0x11d35d.newMainDirectorSetup = function () {
      log("session.newMainDirectorSetup");
      if (_0x11d35d.directorUUID in _0x11d35d.pcs) {
        if (_0x11d35d.pcs[_0x11d35d.directorUUID].stats && _0x11d35d.pcs[_0x11d35d.directorUUID].stats.info) {
          _0x11d35d.pcs[_0x11d35d.directorUUID].stats.info.director = true;
        }
      }
      if (_0x11d35d.directorUUID in _0x11d35d.rpcs) {
        if (_0x11d35d.rpcs[_0x11d35d.directorUUID].stats && _0x11d35d.rpcs[_0x11d35d.directorUUID].stats.info) {
          _0x11d35d.rpcs[_0x11d35d.directorUUID].stats.info.director = true;
        }
        if (_0x11d35d.director) {
          getById("container_" + _0x11d35d.directorUUID).classList.add("directorBox");
          if (_0x11d35d.rpcs[_0x11d35d.directorUUID].label === false) {
            miniTranslate(getById("label_" + _0x11d35d.directorUUID), "main-director");
          }
        }
      }
      _0x11d35d.requestCoDirector();
      updateUserList();
      pokeIframeAPI("new-main-director", _0x11d35d.directorUUID);
    };
    _0x11d35d.connect = async function _0x285e13(_0x3e650f = false) {
      if (_0x11d35d.taintedSession === true) {
        log("tainted");
        return;
      }
      if (_0x11d35d.ws !== null) {
        log("already connected to websocket server");
        return;
      }
      if (_0x11d35d.wss == false) {
        if (_0x11d35d.proxy !== false) {
          _0x11d35d.wss = "wss://proxywss.rtc.ninja:443";
        } else {
          _0x11d35d.wss = 'wss://wss.rtcs.live:443';
        }
      }
      if (!RTCPeerConnection) {
        console.error(getTranslation("webrtc-is-blocked"));
        if (!_0x11d35d.cleanOutput) {
          warnUser(getTranslation("webrtc-is-blocked"), false, false);
        }
        return;
      }
      if (_0x11d35d.ws === null) {
        _0x11d35d.ws = false;
        await chooseBestTURN();
      }
      if (_0x11d35d.customWSS === false) {
        _0x11d35d.wssid = _0x11d35d.generateStreamID(0xc);
        for (var _0x14da66 in _0x11d35d.rpcs) {
          warnlog("Checking to see if reconnectino to ws lost any peers");
          if (_0x11d35d.rpcs[_0x14da66].connectionState === 'failed') {
            warnlog("cleaning up lost connection");
            _0x11d35d.closeRPC(_0x14da66);
          }
        }
      }
      if (_0x11d35d.bypass) {
        _0x11d35d.ws = {};
        _0x11d35d.ws.readyState = 0x1;
        _0x11d35d.ws.send = function (_0x214bc3) {
          parent.postMessage({
            'bypass': _0x214bc3
          }, _0x11d35d.iframetarget);
        };
        setTimeout(function () {
          _0x11d35d.ws.onopen();
        }, 0xa);
      } else {
        _0x11d35d.ws = new WebSocket(_0x11d35d.wss);
      }
      if (_0x3e650f == false) {
        if (_0x11d35d.showTime === true) {
          _0x11d35d.showTime = null;
          toggleClock();
        }
        _0x11d35d.timeout = setTimeout(function () {
          pokeIframeAPI('hssConnection', "timeout");
          pokeIframeAPI("hss-connection", 'timeout');
          errorlog("Websockets timed out; 30 seconds");
          if (!_0x11d35d.cleanOutput) {
            if (!_0x11d35d.studioSoftware) {
              _0x11d35d.warnUserTriggered = true;
              warnUser(getTranslation("site-not-responsive"), 0x493e0, false);
            }
          }
        }, 0x7530);
      }
      _0x11d35d.ws.onopen = function _0x4c941d() {
        if (_0x11d35d.auth) {
          try {
            _0x11d35d.sendMsg({
              'auth': _0x11d35d.auth
            });
          } catch (_0x4283e4) {
            errorlog(_0x4283e4);
          }
        }
        if (_0x11d35d.warnUserTriggered) {
          closeModal();
        }
        _0x11d35d.onceConnected = true;
        clearTimeout(_0x11d35d.pingTimeout);
        clearTimeout(_0x11d35d.timeout);
        log("connected to video server");
        checkConnection();
        if (_0x11d35d.transferred) {
          errorlog("RECONNECTING to HSS; DISCONNECTING FROM TRANSFERRED ROOM");
          for (_0x5aaf21 in _0x11d35d.rpcs) {
            try {
              if (_0x11d35d.rpcs[_0x5aaf21].streamID) {
                if (!_0x11d35d.include.includes(_0x11d35d.rpcs[_0x5aaf21].streamID)) {
                  _0x11d35d.closeRPC(_0x5aaf21);
                }
              } else {
                _0x11d35d.closeRPC(_0x5aaf21);
              }
            } catch (_0x2f14c6) {}
          }
          for (_0x5aaf21 in _0x11d35d.pcs) {
            try {
              _0x11d35d.closePC(_0x5aaf21);
            } catch (_0x2db4e8) {}
          }
          _0x11d35d.transferred = false;
          _0x11d35d.broadcastIFrame = false;
        }
        if (_0x11d35d.msg !== []) {
          try {
            var _0x231225 = _0x11d35d.msg.slice(-0x1e);
            _0x11d35d.msg = [];
            for (var _0x598b90 in _0x231225) {
              log("resending message");
              _0x11d35d.sendMsg(_0x231225[_0x598b90]);
            }
          } catch (_0x214ee7) {
            errorlog(_0x214ee7);
          }
        }
        if (_0x3e650f == true) {
          pokeIframeAPI("hssConnection", "reconnected");
          pokeIframeAPI('hss-connection', "reconnected");
          if (_0x11d35d.seeding) {
            _0x11d35d.seedStream();
          }
          if (_0x11d35d.roomid) {
            log("ROOMID EANBLED");
            log("Update Mixer Event on REsize SET");
            joinRoom(_0x11d35d.roomid);
            if (_0x11d35d.include.length) {
              var _0x86936a = Object.keys(_0x11d35d.waitingWatchList);
              for (var _0x5aaf21 in _0x86936a) {
                if (_0x11d35d.include.includes(_0x86936a[_0x5aaf21])) {
                  log("LOADING UP WAITING WATCH STREAM: " + _0x86936a[_0x5aaf21]);
                  _0x11d35d.watchStream(_0x86936a[_0x5aaf21]);
                }
              }
            }
          } else {
            var _0x86936a = Object.keys(_0x11d35d.waitingWatchList);
            for (var _0x5aaf21 in _0x86936a) {
              log("LOADING UP WAITING WATCH STREAM: " + _0x86936a[_0x5aaf21]);
              _0x11d35d.watchStream(_0x86936a[_0x5aaf21]);
            }
          }
        } else {
          pokeIframeAPI('hssConnection', 'connected');
          pokeIframeAPI('hss-connection', "connected");
        }
      };
      _0x11d35d.requestStream = function (_0x414d9a) {
        for (var _0x528c26 in _0x11d35d.rpcs) {
          if (_0x11d35d.rpcs[_0x528c26].streamID === _0x414d9a) {
            log("already watching stream");
            return false;
          }
        }
        if (_0x11d35d.waitingWatchList[_0x414d9a]) {
          log("already waiting for stream");
          return false;
        }
        _0x11d35d.watchStream(_0x414d9a);
        log("requesting stream");
        return true;
      };
      _0x11d35d.ws.onmessage = async function (_0x198fe4) {
        clearTimeout(_0x11d35d.pingTimeout);
        try {
          var _0x3fe323 = JSON.parse(_0x198fe4.data);
        } catch (_0x1fdc61) {
          try {
            var _0x3fe323 = JSON.parse(_0x198fe4.data.toString());
          } catch (_0x26b8fc) {
            errorlog(_0x26b8fc);
            return;
          }
        }
        if ("streamID" in _0x3fe323) {
          _0x3fe323.streamID = _0x11d35d.desaltStreamID(_0x3fe323.streamID);
        }
        if ('remote' in _0x3fe323) {
          _0x3fe323 = await _0x11d35d.decodeRemote(_0x3fe323);
          if (!_0x3fe323) {
            return;
          }
        }
        if (_0x11d35d.customWSS) {
          if ("from" in _0x3fe323 && _0x11d35d.UUID && _0x3fe323.from === _0x11d35d.UUID) {
            return;
          } else {
            log(_0x3fe323);
          }
          if ('UUID' in _0x3fe323) {
            if (_0x11d35d.UUID) {
              if (_0x3fe323.UUID !== _0x11d35d.UUID) {
                return;
              }
            } else {
              return;
            }
            delete _0x3fe323.UUID;
          }
          if ("roomid" in _0x3fe323) {
            if (!_0x11d35d.roomenc) {
              return;
            }
            if ('request' in _0x3fe323) {
              if (_0x3fe323.request === 'migrate') {
                if ('roomid' in _0x3fe323) {
                  if ('target' in _0x3fe323) {
                    if (_0x3fe323.target == _0x11d35d.UUID) {
                      _0x3fe323.request = "transferred";
                      _0x11d35d.roomenc = _0x3fe323.roomid;
                      var _0x19e9d1 = {
                        request: "joinroom",
                        "roomid": _0x11d35d.roomenc,
                        "streamID": _0x11d35d.streamID
                      };
                      _0x11d35d.sendMsg(_0x19e9d1);
                    } else {
                      return;
                    }
                  } else {
                    return;
                  }
                } else {
                  return;
                }
              } else {
                if (_0x3fe323.roomid !== _0x11d35d.roomenc) {
                  return;
                }
              }
            } else {
              if (_0x3fe323.roomid !== _0x11d35d.roomenc) {
                return;
              }
            }
            delete _0x3fe323.roomid;
          }
          if ('director' in _0x3fe323) {
            if (_0x11d35d.token || _0x11d35d.mainDirectorPassword) {
              await checkToken();
            } else if (_0x3fe323.from) {
              _0x11d35d.directorUUID = _0x3fe323.from;
              _0x11d35d.directorStreamID = false;
              _0x11d35d.directorList = [];
              _0x11d35d.directorList.push(_0x11d35d.directorUUID);
              _0x11d35d.newMainDirectorSetup();
            }
            delete _0x3fe323.director;
          }
          if ("from" in _0x3fe323) {
            _0x3fe323.UUID = _0x3fe323.from;
            delete _0x3fe323.from;
          }
          if ('request' in _0x3fe323) {
            if (_0x3fe323.request === "play") {
              if ('streamID' in _0x3fe323) {
                if (_0x3fe323.streamID === _0x11d35d.streamID) {
                  _0x3fe323.request = "offerSDP";
                } else {
                  return;
                }
              }
            } else {
              if (_0x3fe323.request === "seed") {
                if (_0x11d35d.view_set) {
                  if (_0x11d35d.view_set.includes(_0x3fe323.streamID)) {
                    play(_0x3fe323.streamID);
                    return;
                  } else {
                    return;
                  }
                }
              } else {
                if (_0x3fe323.request === "joinroom") {
                  if ("streamID" in _0x3fe323) {
                    if (_0x11d35d.view_set) {
                      if (_0x11d35d.view_set.includes(_0x3fe323.streamID)) {
                        play(_0x3fe323.streamID);
                      } else {}
                    } else {
                      play(_0x3fe323.streamID);
                    }
                  }
                  _0x3fe323.request = 'offerSDP';
                }
              }
            }
          } else {
            if ("streamID" in _0x3fe323) {
              if (_0x11d35d.view_set) {
                if (_0x11d35d.view_set.includes(_0x3fe323.streamID)) {} else {
                  return;
                }
              } else {
                if (_0x11d35d.view) {
                  if (_0x11d35d.view !== _0x3fe323.streamID) {
                    return;
                  } else {}
                }
              }
            }
          }
        }
        if (_0x3fe323.request) {
          if (_0x3fe323.request == "offerSDP") {
            if (_0x11d35d.queue) {
              if (_0x11d35d.directorList.indexOf(_0x3fe323.UUID) >= 0x0) {
                _0x11d35d.offerSDP(_0x3fe323.UUID);
              } else if (_0x11d35d.director) {
                if (_0x3fe323.UUID in _0x11d35d.rpcs) {
                  _0x11d35d.offerSDP(_0x3fe323.UUID);
                }
              }
            } else {
              _0x11d35d.offerSDP(_0x3fe323.UUID);
            }
          } else {
            if (_0x3fe323.request == "listing") {
              log(_0x3fe323);
              if (_0x11d35d.token || _0x11d35d.mainDirectorPassword) {
                await checkToken();
              } else if ("director" in _0x3fe323) {
                _0x11d35d.directorUUID = _0x3fe323.director;
                _0x11d35d.directorStreamID = false;
                _0x11d35d.directorList = [];
                _0x11d35d.directorList.push(_0x11d35d.directorUUID);
                _0x11d35d.newMainDirectorSetup();
              } else {
                _0x11d35d.directorUUID = false;
                _0x11d35d.directorStreamID = false;
                _0x11d35d.directorList = [];
              }
              if (_0x11d35d.mainDirectorPassword) {} else {
                if ("claim" in _0x3fe323) {
                  if (_0x11d35d.token || _0x3fe323.claim == false) {
                    if (!_0x11d35d.cleanOutput) {
                      miniTranslate(getById('head4'), 'not-the-director');
                      if (_0x11d35d.directorPassword) {
                        if (_0x11d35d.directorState === null) {
                          warnUser(getTranslation("room-is-claimed-codirector"), false, false);
                        }
                      } else if (_0x11d35d.token) {
                        setTimeout(function () {
                          warnUser(getTranslation('token-room-is-claimed'), false, false);
                        }, 0x1);
                      } else {
                        setTimeout(function () {
                          warnUser(getTranslation("room-is-claimed"), false, false);
                        }, 0x1);
                      }
                    }
                    _0x11d35d.directorState = false;
                    pokeAPI("director", false);
                    pokeIframeAPI("director", false);
                  } else {
                    _0x11d35d.directorState = true;
                    pokeAPI("director", true);
                    pokeIframeAPI('director', true);
                  }
                }
              }
              _0x11d35d.alreadyJoinedMembers = _0x3fe323.list;
              _0x11d35d.listPromise.resolve(_0x3fe323.list);
            } else {
              if (_0x3fe323.request == "transferred") {
                _0x11d35d.queueList = [];
                _0x11d35d.transferred = true;
                _0x11d35d.broadcastIFrame = false;
                log("You've been transferred");
                pokeIframeAPI("transferred");
                let _0x2bc408 = false;
                if (!_0x11d35d.director) {
                  if (_0x11d35d.queue == 0x2) {
                    _0x11d35d.queue = true;
                    _0x11d35d.transferred = true;
                  } else if (_0x11d35d.queue == 0x3) {
                    _0x11d35d.queue = false;
                    _0x2bc408 = true;
                  } else {
                    _0x11d35d.queue = false;
                    _0x11d35d.transferred = true;
                  }
                } else {
                  _0x11d35d.transferred = true;
                }
                if (!_0x2bc408) {
                  for (_0x40b6cf in _0x11d35d.rpcs) {
                    try {
                      if (!_0x11d35d.include.includes(_0x11d35d.rpcs[_0x40b6cf].streamID)) {
                        warnlog("transferred and closing");
                        _0x11d35d.closeRPC(_0x40b6cf);
                      }
                    } catch (_0x2985ee) {}
                  }
                  for (_0x40b6cf in _0x11d35d.pcs) {
                    try {
                      log("closing 4");
                      _0x11d35d.closePC(_0x40b6cf);
                    } catch (_0x22f088) {}
                  }
                }
                if (!_0x2bc408) {
                  if (_0x11d35d.token || _0x11d35d.mainDirectorPassword) {
                    await checkToken();
                  } else if ("director" in _0x3fe323) {
                    _0x11d35d.directorUUID = _0x3fe323.director;
                    _0x11d35d.directorStreamID = false;
                    _0x11d35d.directorList = [];
                    _0x11d35d.directorList.push(_0x11d35d.directorUUID);
                    _0x11d35d.newMainDirectorSetup();
                  } else {
                    _0x11d35d.directorUUID = false;
                    _0x11d35d.directorStreamID = false;
                    _0x11d35d.directorList = [];
                  }
                  youveBeenTransferred();
                  _0x11d35d.totalRoomBitrate = _0x11d35d.totalRoomBitrate_default;
                  updateMixer();
                } else {
                  youveBeenActivated();
                }
                log("Members in Room");
                log(_0x3fe323.list);
                for (var _0x40b6cf in _0x3fe323.list) {
                  if ("UUID" in _0x3fe323.list[_0x40b6cf]) {
                    if ("streamID" in _0x3fe323.list[_0x40b6cf]) {
                      if (_0x3fe323.list[_0x40b6cf].UUID in _0x11d35d.rpcs) {
                        log("RTC already connected");
                      } else {
                        var _0x332d9f = _0x11d35d.desaltStreamID(_0x3fe323.list[_0x40b6cf].streamID);
                        log("STREAM ID desalted 2:" + _0x332d9f);
                        if (_0x11d35d.queue) {
                          if (_0x11d35d.directorList.indexOf(_0x3fe323.list[_0x40b6cf].UUID) >= 0x0) {
                            if (_0x11d35d.queueType == 0x2) {
                              play(_0x332d9f, _0x3fe323.list[_0x40b6cf].UUID);
                            }
                          } else {
                            if (_0x11d35d.view_set && _0x11d35d.view_set.includes(_0x332d9f)) {
                              play(_0x332d9f, _0x3fe323.list[_0x40b6cf].UUID);
                            } else if (_0x11d35d.queueList.length < 0x1388) {
                              if (!(_0x332d9f in _0x11d35d.watchTimeoutList) && !_0x11d35d.queueList.includes(_0x332d9f)) {
                                _0x11d35d.queueList.push(_0x332d9f);
                              }
                            }
                          }
                        } else {
                          play(_0x332d9f, _0x3fe323.list[_0x40b6cf].UUID);
                        }
                      }
                    }
                  }
                }
                updateQueue();
              } else {
                if (_0x3fe323.request == "roomclaimed") {
                  log(_0x3fe323);
                  if (_0x11d35d.token || _0x11d35d.mainDirectorPassword) {
                    await checkToken();
                  } else if ("director" in _0x3fe323) {
                    _0x11d35d.directorUUID = _0x3fe323.director;
                    _0x11d35d.directorStreamID = false;
                    _0x11d35d.directorList = [];
                    _0x11d35d.directorList.push(_0x11d35d.directorUUID);
                    _0x11d35d.newMainDirectorSetup();
                  } else {
                    _0x11d35d.directorUUID = false;
                    _0x11d35d.directorList = [];
                    errorlog("This shouldn't happen");
                  }
                  updateUserList();
                } else {
                  if (_0x3fe323.request == 'sendroom') {
                    log("Inbound User-based Message from Room");
                    log(_0x3fe323);
                    try {
                      if (_0x11d35d.token || _0x11d35d.mainDirectorPasswor) {} else if ("director" in _0x3fe323) {
                        if (_0x3fe323.director == true) {
                          _0x11d35d.directorActions(_0x3fe323);
                        }
                      }
                    } catch (_0x5c856a) {
                      errorlog(_0x5c856a);
                    }
                  } else {
                    if (_0x3fe323.request == "someonejoined") {
                      if (_0x11d35d.token || _0x11d35d.mainDirectorPassword) {
                        await checkToken();
                      } else if (_0x3fe323.director) {
                        _0x11d35d.directorUUID = _0x3fe323.UUID;
                        _0x11d35d.directorStreamID = false;
                        _0x11d35d.directorList = [];
                        _0x11d35d.directorList.push(_0x11d35d.directorUUID);
                        _0x11d35d.newMainDirectorSetup();
                      }
                      if ("streamID" in _0x3fe323) {
                        log("Someone Joined the Room with a video");
                        if (_0x11d35d.queue) {
                          if (_0x11d35d.directorList.indexOf(_0x3fe323.UUID) >= 0x0) {
                            if (_0x11d35d.queueType == 0x2) {
                              play(_0x332d9f, _0x3fe323.UUID);
                            }
                          } else {
                            if (_0x11d35d.view_set && _0x11d35d.view_set.includes(_0x332d9f)) {
                              play(_0x332d9f, _0x3fe323.UUID);
                            } else if (_0x11d35d.queueList.length < 0x1388) {
                              if (!(_0x3fe323.streamID in _0x11d35d.watchTimeoutList) && !_0x11d35d.queueList.includes(_0x3fe323.streamID)) {
                                _0x11d35d.queueList.push(_0x3fe323.streamID);
                                updateQueue(true);
                              }
                            }
                          }
                        } else {
                          play(_0x3fe323.streamID);
                        }
                      } else {
                        log("Someone Joined the Room");
                      }
                    } else {
                      if (_0x3fe323.request == "videoaddedtoroom") {
                        log("Someone published a video to the Room");
                        log(_0x3fe323);
                        if (_0x11d35d.queue) {
                          if (_0x11d35d.directorList.indexOf(_0x3fe323.UUID) >= 0x0) {
                            if (_0x11d35d.queueType == 0x2) {
                              play(_0x332d9f, _0x3fe323.UUID);
                            }
                          } else {
                            if (_0x11d35d.view_set && _0x11d35d.view_set.includes(_0x332d9f)) {
                              play(_0x332d9f, _0x3fe323.UUID);
                            } else if (_0x11d35d.queueList.length < 0x1388) {
                              if (!(_0x3fe323.streamID in _0x11d35d.watchTimeoutList) && !_0x11d35d.queueList.includes(_0x3fe323.streamID)) {
                                _0x11d35d.queueList.push(_0x3fe323.streamID);
                                updateQueue(true);
                              }
                            }
                          }
                        } else {
                          play(_0x3fe323.streamID);
                        }
                      } else {
                        if (_0x3fe323.request == "alert") {
                          errorlog(_0x3fe323);
                          pokeIframeAPI("alert", _0x3fe323.message);
                          if (_0x11d35d.scene === false) {
                            if ("message" in _0x3fe323) {
                              if (_0x3fe323.message === "Stream ID is already in use.") {
                                if (_0x11d35d.seedAttempts < 0x2) {
                                  _0x11d35d.seedAttempts = parseInt(_0x11d35d.seedAttempts) + 0x1;
                                  setTimeout(function () {
                                    _0x11d35d.seedStream();
                                  }, 0x1388);
                                } else {
                                  hangup();
                                  if (!_0x11d35d.cleanOutput) {
                                    setTimeout(function () {
                                      warnUser(getTranslation('streamid-already-published'), false, false);
                                    }, 0x1);
                                  }
                                }
                              } else {
                                if (_0x11d35d.token || _0x11d35d.mainDirectorPasswor) {} else if (_0x3fe323.message === "Room is already claimed by someone else.") {
                                  if (!_0x11d35d.cleanOutput) {
                                    miniTranslate(getById("head4"), 'not-the-director');
                                    if (_0x11d35d.directorPassword) {
                                      if (_0x11d35d.directorState === null) {
                                        warnUser(getTranslation("room-is-claimed-codirector"), false, false);
                                      }
                                    } else {
                                      setTimeout(function () {
                                        warnUser(getTranslation("room-is-claimed"), false, false);
                                      }, 0x1);
                                    }
                                  }
                                  _0x11d35d.directorState = false;
                                  pokeAPI('director', false);
                                  pokeIframeAPI("director", false);
                                } else if (!_0x11d35d.cleanOutput) {
                                  setTimeout(function () {
                                    warnUser(_0x3fe323.message);
                                  }, 0x1);
                                }
                              }
                            }
                          }
                        } else if (_0x3fe323.request == "warn") {
                          if ("message" in _0x3fe323) {
                            warnlog(_0x3fe323.message);
                          }
                        } else {
                          log(_0x3fe323);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          if (_0x3fe323.description) {
            if ("streamID" in _0x3fe323) {
              if (_0x3fe323.streamID in _0x11d35d.watchTimeoutList) {
                clearTimeout(_0x11d35d.watchTimeoutList[_0x3fe323.streamID]);
                delete _0x11d35d.watchTimeoutList[_0x3fe323.streamID];
              }
            }
            _0x11d35d.processDescription(_0x3fe323);
          } else {
            if (_0x3fe323.candidate) {
              log("GOT ICE!!");
              _0x11d35d.processIce(_0x3fe323);
            } else {
              if (_0x3fe323.candidates) {
                log("GOT ICES!!");
                _0x11d35d.processIceBundle(_0x3fe323);
              } else {
                if (_0x3fe323.bye || _0x3fe323.request == "cleanup") {
                  warnlog("Clean up");
                  if (_0x3fe323.UUID in _0x11d35d.pcs) {
                    log("closing 4");
                    _0x11d35d.closePC(_0x3fe323.UUID);
                  }
                  if (_0x3fe323.UUID in _0x11d35d.rpcs) {
                    warnlog("problem");
                    _0x11d35d.closeRPC(_0x3fe323.UUID);
                  }
                } else if (_0x11d35d.audience && _0x3fe323.token) {
                  _0x11d35d.audienceToken = _0x3fe323.token;
                  updateReshareLink();
                } else {
                  log("what is this?");
                }
              }
            }
          }
        }
      };
      _0x11d35d.ws.onerror = async function (_0x53c883) {
        warnlog(_0x53c883);
      };
      _0x11d35d.ws.onclose = async function (_0x50e59f) {
        clearTimeout(_0x11d35d.pingTimeout);
        pokeIframeAPI("hssConnection", "closed");
        pokeIframeAPI("hss-connection", 'closed');
        try {
          if ("code" in _0x50e59f) {
            if (_0x50e59f.code == 0x1f7) {
              if (_0x3e650f == false) {
                clearTimeout(_0x11d35d.timeout);
                if (!_0x11d35d.cleanOutput) {
                  warnUser("Failed to connect to service: Error 503<br /><br />Possibly too many connections from the same address tried to connect.<br />Visit https://discord.vdo.ninja for support.", 0x7530, false);
                }
              }
            }
          }
        } catch (_0x4fe8aa) {
          errorlog(_0x4fe8aa);
        }
        warnlog("Connection to Control Server lost.\n\nWill try to reconnect in 2 seconds.");
        if (_0x11d35d.security == false) {
          try {
            if (_0x11d35d.ws.readyState === WebSocket.CLOSED) {
              _0x11d35d.ws = null;
              setTimeout(() => {
                try {
                  _0x11d35d.connect(true);
                } catch (_0x2c1a6b) {}
                ;
              }, 0x7d0);
            }
          } catch (_0x28bea6) {
            errorlog(_0x28bea6);
          }
        }
      };
    };
    _0x11d35d.sendMessage = function (_0x185fb3, _0x18c6ef = null) {
      log("Messaging sent");
      _0x185fb3 = JSON.stringify(_0x185fb3);
      if (_0x18c6ef == null) {
        for (var _0x39a082 in _0x11d35d.pcs) {
          try {
            _0x11d35d.pcs[_0x39a082].sendChannel.send(_0x185fb3);
          } catch (_0x5a8f26) {
            if (_0x11d35d.pcs[_0x39a082].startTime + 0x186a0 < Date.now()) {
              warnlog("RTC Connection seems to be dead or not yet open? 4");
            } else {
              log("RTC Connection seems to be dead or not yet open? 4");
            }
          }
        }
        return true;
      } else {
        if (_0x11d35d.pcs[_0x18c6ef]) {
          try {
            _0x11d35d.pcs[_0x18c6ef].sendChannel.send(_0x185fb3);
            return true;
          } catch (_0x5948e1) {
            if (_0x11d35d.pcs[_0x18c6ef].startTime + 0x186a0 < Date.now()) {
              warnlog("RTC Connection seems to be dead or not yet open? 3");
            } else {
              log("RTC Connection seems to be dead or not yet open? 3");
            }
            return false;
          }
        } else {
          warnlog("RTC Connection seems to be dead or not yet open? DOES NOT EXIST. was it deleted? 666");
        }
      }
      return false;
    };
    var _0x1e559e = {};
    function _0x19e3bb(_0xe1d97f) {
      try {
        var _0x339065 = _0x1e559e[_0xe1d97f] || false;
        if (_0x339065) {
          clearTimeout(_0x339065[0x1]);
          delete _0x1e559e[_0xe1d97f];
          warnlog("RUNNING CALLBACK: " + _0xe1d97f);
          _0x339065[0x0]();
        }
      } catch (_0x57102a) {
        errorlog(_0x57102a);
      }
    }
    _0x11d35d.sendRequest = function (_0xb56a76, _0x3d0d08 = null, _0x7f15d4 = false) {
      if (_0x3d0d08 == null) {
        var _0x317f61 = [];
        var _0x2119a6 = JSON.stringify(_0xb56a76);
        for (var _0x2b7e12 in _0x11d35d.rpcs) {
          if (_0x11d35d.rpcs[_0x2b7e12].whip) {
            warnlog(_0xb56a76);
            continue;
          }
          try {
            if ('realUUID' in _0x11d35d.rpcs[_0x2b7e12]) {
              var _0x792017 = _0xb56a76;
              _0x792017.altUUID = true;
              _0x792017 = JSON.stringify(_0x792017);
              _0x11d35d.rpcs[_0x11d35d.rpcs[_0x2b7e12].realUUID].receiveChannel.send(_0x792017);
              _0x317f61.push(_0x2b7e12);
            } else {
              if (_0x11d35d.rpcs[_0x2b7e12].receiveChannel) {
                _0x11d35d.rpcs[_0x2b7e12].receiveChannel.send(_0x2119a6);
                _0x317f61.push(_0x2b7e12);
              } else {}
            }
          } catch (_0x787d78) {
            log(_0xb56a76);
            warnlog("PUBLISHER's RTC Connection seems to be dead? ");
            warnlog(_0x787d78);
          }
        }
        return _0x317f61.length;
      } else {
        if (_0x11d35d.rpcs[_0x3d0d08].whip) {
          warnlog(_0xb56a76);
          return;
        }
        try {
          if (_0x7f15d4) {
            try {
              var _0x5d4283 = parseInt(Math.random() * 0x174876e7ff);
              _0xb56a76.cbid = _0x5d4283;
              var _0xe47b2b = setTimeout(function (_0x5ccc03) {
                var _0x15df49 = _0x1e559e[_0x5ccc03] || false;
                if (_0x15df49) {
                  delete _0x1e559e[_0x5ccc03];
                  _0x15df49[0x0]();
                }
              }, 0x1388, _0x5d4283);
              _0x1e559e[_0x5d4283] = [_0x7f15d4, _0xe47b2b];
              warnlog("ISSUING CALLBACK: " + _0x5d4283);
            } catch (_0x22c160) {
              errorlog(_0x22c160);
            }
          }
          if ('realUUID' in _0x11d35d.rpcs[_0x3d0d08]) {
            var _0x792017 = _0xb56a76;
            _0x792017.altUUID = true;
            _0x11d35d.rpcs[_0x11d35d.rpcs[_0x3d0d08].realUUID].receiveChannel.send(JSON.stringify(_0x792017));
            return true;
          } else {
            return _0x11d35d.rpcs[_0x3d0d08].receiveChannel ? (_0x11d35d.rpcs[_0x3d0d08].receiveChannel.send(JSON.stringify(_0xb56a76)), true) : (log("couldn't send a request to specified publishe via p2p: " + _0x3d0d08), false);
          }
        } catch (_0x4c3d7a) {
          warnlog(_0x4c3d7a);
          log("PUBLISHER's RTC Connection seems to be dead? 2");
          return false;
        }
      }
    };
    _0x11d35d.hangupDirector = function () {
      _0x11d35d.taintedSession = true;
      _0x11d35d.screenShareState = false;
      pokeIframeAPI("screen-share-state", _0x11d35d.screenShareState, null, _0x11d35d.streamID);
      notifyOfScreenShare();
      warnlog("hanging up");
      pokeIframeAPI("director-share", false, false, _0x11d35d.streamID);
      pokeIframeAPI('seeding', false, false, _0x11d35d.streamID);
      pokeAPI("seeding", false);
      try {
        if (_0x11d35d.videoElement && _0x11d35d.videoElement.srcObject) {
          _0x11d35d.videoElement.srcObject.getTracks().forEach(function (_0x2e9751) {
            _0x11d35d.videoElement.srcObject.removeTrack(_0x2e9751);
            _0x2e9751.stop();
            log("stopping old track");
          });
        }
        if (_0x11d35d.streamSrc) {
          _0x11d35d.streamSrc.getVideoTracks().forEach(function (_0x5aa97b) {
            _0x11d35d.videoDevice = _0x5aa97b.label.toLowerCase().replace(/[\W]+/g, '_');
            _0x11d35d.streamSrc.removeTrack(_0x5aa97b);
            _0x5aa97b.stop();
            log("stopping old track");
          });
          _0x11d35d.audioDevice = [];
          _0x11d35d.streamSrc.getAudioTracks().forEach(function (_0x2a67e9) {
            _0x11d35d.audioDevice.push(_0x2a67e9.label.toLowerCase().replace(/[\W]+/g, '_'));
            _0x11d35d.streamSrc.removeTrack(_0x2a67e9);
            _0x2a67e9.stop();
            log("stopping old track");
          });
          if (!_0x11d35d.audioDevice.length) {
            _0x11d35d.audioDevice = false;
          }
        }
        if (_0x11d35d.streamSrcClone) {
          _0x11d35d.streamSrcClone.getTracks().forEach(function (_0x4a4708) {
            _0x11d35d.streamSrcClone.removeTrack(_0x4a4708);
            _0x4a4708.stop();
          });
        }
        for (UUID in _0x11d35d.pcs) {
          var _0x41442a = getSenders2(UUID);
          _0x41442a.forEach(_0x2a5660 => {
            if (_0x2a5660.track) {
              _0x2a5660.track.enabled = false;
            }
          });
        }
        try {
          if (document.getElementById("container_director")) {
            if (!_0x11d35d.syncState) {
              _0x11d35d.syncState = {};
            }
            if (_0x11d35d.streamID) {
              _0x11d35d.syncState[_0x11d35d.streamID] = getDetailedState(_0x11d35d.streamID);
            }
            getById("container_director").parentNode.removeChild(getById("container_director"));
            updateLockedElements();
          }
        } catch (_0x7eb13d) {
          warnlog(_0x7eb13d);
        }
        var _0x218e0d = {
          "videoMuted": true,
          "virtualHangup": true
        };
        _0x11d35d.sendMessage(_0x218e0d);
        getById("videosource").remove();
        if (_0x11d35d.whipOut && _0x11d35d.whipOut.deleteme) {
          warnlog("I'm not sure if I should hang up the whip Output or not");
        }
      } catch (_0x4da839) {
        errorlog("failed to disconnect");
      }
      log("HANG UP 2 COMPLETE");
    };
    _0x11d35d.createOffer = function (_0x5a9c7b, _0x5664c6 = false) {
      _0x11d35d.pcs[_0x5a9c7b].createOffer({
        'iceRestart': _0x5664c6
      }).then(_0x4f88c3 => {
        log("create offer worked");
        if (SafariVersion && SafariVersion <= 0xd && (iOS || iPad)) {} else {
          if (_0x11d35d.stereo == 0x3 || _0x11d35d.stereo == 0x5 || _0x11d35d.stereo == 0x1) {
            _0x4f88c3.sdp = CodecsHandler.setOpusAttributes(_0x4f88c3.sdp, {
              'stereo': 0x1
            });
            log("stereo enabled");
          } else {
            if (iOS || iPad) {} else if (_0x11d35d.stereo == 0x4) {
              _0x4f88c3.sdp = CodecsHandler.setOpusAttributes(_0x4f88c3.sdp, {
                'stereo': 0x2
              });
              log("stereo enabled");
            }
          }
        }
        if (iOS || iPad) {
          if (_0x11d35d.removeOrientationFlag && _0x4f88c3.sdp.includes("a=extmap:3 urn:3gpp:video-orientation\r\n")) {
            _0x4f88c3.sdp = _0x4f88c3.sdp.replace("a=extmap:3 urn:3gpp:video-orientation\r\n", '');
          }
        }
        if (_0x11d35d.pcs[_0x5a9c7b].preferVideoCodec) {
          try {
            _0x4f88c3.sdp = CodecsHandler.preferCodec(_0x4f88c3.sdp, _0x11d35d.pcs[_0x5a9c7b].preferVideoCodec, _0x11d35d.preferredVideoErrorCorrection);
            log("Trying to set " + _0x11d35d.pcs[_0x5a9c7b].preferVideoCodec + " as preferred video codec by viewer via API (offer)");
          } catch (_0x52de0c) {
            errorlog(_0x52de0c);
            warnlog("couldn't set preferred video codec");
          }
        }
        if (_0x11d35d.pcs[_0x5a9c7b].preferAudioCodec) {
          try {
            if (_0x11d35d.pcs[_0x5a9c7b].preferAudioCodec === 'lyra') {
              _0x4f88c3.sdp = CodecsHandler.modifyDescLyra(_0x4f88c3.sdp);
            } else {
              if (_0x11d35d.pcs[_0x5a9c7b].preferAudioCodec === "pcm") {
                if (_0x11d35d.audioInputChannels && _0x11d35d.audioInputChannels == 0x1) {
                  _0x4f88c3.sdp = CodecsHandler.modifyDescPCM(_0x4f88c3.sdp, _0x11d35d.micSampleRate || 0xbb80, false);
                } else if (_0x11d35d.stereo) {
                  _0x4f88c3.sdp = CodecsHandler.modifyDescPCM(_0x4f88c3.sdp, _0x11d35d.micSampleRate || 0xbb80, true);
                } else {
                  _0x4f88c3.sdp = CodecsHandler.modifyDescPCM(_0x4f88c3.sdp, _0x11d35d.micSampleRate || 0xbb80, false);
                }
              } else {
                _0x4f88c3.sdp = CodecsHandler.preferAudioCodec(_0x4f88c3.sdp, _0x11d35d.pcs[_0x5a9c7b].preferAudioCodec, _0x11d35d.predAudio, _0x11d35d.pfecAudio);
              }
            }
            log("Trying to set " + _0x11d35d.pcs[_0x5a9c7b].preferAudioCodec + " as preferred audio codec by viewer via API (offer)");
          } catch (_0x425032) {
            errorlog(_0x425032);
            warnlog("couldn't set preferred audio codec");
          }
        }
        if (Android && _0x11d35d.h264profile !== false && _0x11d35d.AndroidFix) {
          _0x4f88c3.sdp = _0x4f88c3.sdp.replace(/42e01f/gi, "42001f");
        }
        if (_0x11d35d.localNetworkOnly) {
          _0x4f88c3.sdp = filterSDPLAN(_0x4f88c3.sdp);
        }
        _0x11d35d.pcs[_0x5a9c7b].setLocalDescription(_0x4f88c3).then(function () {
          log("publishing SDP Offer: " + _0x5a9c7b);
          _0x11d35d.applyIsolatedChat(_0x5a9c7b);
          var _0x5301d5 = {
            "UUID": _0x5a9c7b,
            "streamID": _0x11d35d.streamID,
            "description": _0x11d35d.pcs[_0x5a9c7b].localDescription,
            "session": _0x11d35d.pcs[_0x5a9c7b].session
          };
          if (_0x11d35d.customWSS) {
            _0x5301d5.isScene = _0x11d35d.scene;
          }
          if (_0x11d35d.slot !== false) {
            _0x5301d5.slot = _0x11d35d.slot;
          }
          if (_0x11d35d.screenStream !== false) {
            var _0x3e07a2 = _0x11d35d.screenStream.getTracks();
            var _0x1fea3a = _0x11d35d.pcs[_0x5a9c7b].getSenders();
            var _0x2b451d = [];
            for (var _0x46f603 = 0x0; _0x46f603 < _0x1fea3a.length; _0x46f603++) {
              for (var _0x1795d9 = 0x0; _0x1795d9 < _0x3e07a2.length; _0x1795d9++) {
                if (_0x1fea3a[_0x46f603].track && _0x1fea3a[_0x46f603].track.id == _0x3e07a2[_0x1795d9].id && _0x1fea3a[_0x46f603].track.kind == _0x3e07a2[_0x1795d9].kind) {
                  _0x2b451d.push(_0x46f603);
                }
              }
            }
            if (_0x2b451d.length) {
              _0x5301d5.screen = _0x2b451d;
            }
          }
          if (_0x11d35d.password) {
            _0x11d35d.encryptMessage(JSON.stringify(_0x5301d5.description)).then(function (_0x530d7e) {
              _0x5301d5.description = _0x530d7e[0x0];
              _0x5301d5.vector = _0x530d7e[0x1];
              _0x11d35d.anysend(_0x5301d5);
            })["catch"](errorlog);
          } else {
            _0x11d35d.anysend(_0x5301d5);
          }
        })['catch'](errorlog);
      })["catch"](errorlog);
    };
    _0x11d35d.sendKeyFrameScenes = function () {
      for (var _0x14672e in _0x11d35d.pcs) {
        if (_0x11d35d.pcs[_0x14672e].scene !== false) {
          _0x11d35d.forcePLI(_0x14672e);
          log("FORCE KEYFRAME FOR SCENE");
        } else {
          log("Not a scene");
        }
      }
    };
    _0x11d35d.closePC = function (_0x112ab1, _0x4f82df = true) {
      log("closePC");
      if (!(_0x112ab1 in _0x11d35d.pcs)) {
        return;
      }
      clearTimeout(_0x11d35d.pcs[_0x112ab1].iceTimer);
      clearTimeout(_0x11d35d.pcs[_0x112ab1].closeTimeout);
      clearInterval(_0x11d35d.pcs[_0x112ab1].requestedStatsInterval);
      pokeIframeAPI("push-connection", false, _0x112ab1);
      if ("realUUID" in _0x11d35d.pcs[_0x112ab1]) {
        delete _0x11d35d.pcs[_0x112ab1];
        applySceneState();
        return;
      }
      if (_0x112ab1 + "_screen" in _0x11d35d.pcs && _0x11d35d.pcs[_0x112ab1 + "_screen"].realUUID && _0x11d35d.pcs[_0x112ab1 + '_screen'].realUUID === _0x112ab1) {
        clearTimeout(_0x11d35d.pcs[_0x112ab1 + '_screen'].iceTimer);
        clearTimeout(_0x11d35d.pcs[_0x112ab1 + "_screen"].closeTimeout);
        clearInterval(_0x11d35d.pcs[_0x112ab1 + '_screen'].requestedStatsInterval);
        _0x11d35d.pcs[_0x112ab1 + "_screen"] = null;
        delete _0x11d35d.pcs[_0x112ab1 + "_screen"];
      }
      try {
        _0x11d35d.sendMessage({
          'bye': true
        }, _0x112ab1);
      } catch (_0x10a6eb) {}
      try {
        _0x11d35d.pcs[_0x112ab1].close();
      } catch (_0x5e473f) {}
      if (_0x11d35d.pcs[_0x112ab1].guest) {
        if (_0x11d35d.beepToNotify) {
          if (_0x4f82df) {
            warnlog("WHY ARE YOU GOD DAMN BEEPING");
            playtone(false, "leavetone");
          }
        }
      }
      _0x11d35d.pcs[_0x112ab1] = null;
      if (_0x11d35d.security) {
        if (!_0x11d35d.cleanOutput) {
          setTimeout(function _0x37adfd() {
            warnUser("Remote peer disconnected. Due to enhanced security, please refresh to create a new connection.");
          }, 0x1);
        }
      }
      delete _0x11d35d.pcs[_0x112ab1];
      _0x11d35d.applySoloChat();
      applySceneState();
    };
    _0x11d35d.closeRPC = function (_0x35e105, _0x1ab19e = false) {
      if (!(_0x35e105 in _0x11d35d.rpcs)) {
        log("UUID not found; cant' close");
        return;
      }
      warnlog('closeRPC');
      clearInterval(_0x11d35d.rpcs[_0x35e105].closeTimeout);
      try {
        _0x11d35d.sendRequest({
          'bye': true
        }, _0x35e105);
        warnlog("SEND BYE");
      } catch (_0x11e82e) {}
      try {
        var _0x39fb60 = _0x11d35d.rpcs[_0x35e105].streamID;
      } catch (_0x446e9d) {}
      try {
        _0x11d35d.rpcs[_0x35e105].close();
      } catch (_0x1156ba) {
        warnlog("already closed PCS");
      }
      if (_0x11d35d.rpcs[_0x35e105].motionDetectionInterval) {
        clearInterval(_0x11d35d.rpcs[_0x35e105].motionDetectionInterval);
      }
      try {
        if (_0x11d35d.rpcs[_0x35e105].streamSrc) {
          _0x11d35d.rpcs[_0x35e105].streamSrc.getTracks().forEach(function (_0x36b697) {
            _0x36b697.stop();
            log("Track stopped");
          });
        }
      } catch (_0x5e67a5) {}
      if (_0x11d35d.director) {
        try {
          if (_0x11d35d.rpcs[_0x35e105].videoElement && "recorder" in _0x11d35d.rpcs[_0x35e105].videoElement) {
            _0x11d35d.rpcs[_0x35e105].videoElement.recorder.stop();
          }
        } catch (_0x2236eb) {
          warnlog(_0x2236eb);
        }
      } else if (!_0x11d35d.roomid) {
        if (_0x11d35d.beepToNotify) {
          playtone(false, "leavetone");
        }
      }
      try {
        if (document.getElementById('container_' + _0x35e105)) {
          if (!_0x11d35d.syncState) {
            _0x11d35d.syncState = {};
          }
          if (_0x39fb60) {
            _0x11d35d.syncState[_0x39fb60] = getDetailedState(_0x39fb60);
          }
          getById("container_" + _0x35e105).parentNode.removeChild(getById("container_" + _0x35e105));
          updateLockedElements();
        }
      } catch (_0xc6888b) {
        warnlog(_0xc6888b);
      }
      try {
        if (_0x11d35d.rpcs[_0x35e105].videoElement) {
          _0x11d35d.rpcs[_0x35e105].videoElement.remove();
        }
      } catch (_0x354154) {}
      try {
        if (_0x11d35d.broadcast !== false) {
          if (_0x11d35d.rpcs[_0x35e105].iframeEle) {
            try {
              _0x11d35d.rpcs[_0x35e105].iframeEle.remove();
            } catch (_0x4f7eaf) {
              errorlog(_0x4f7eaf);
            }
            _0x11d35d.rpcs[_0x35e105].iframeEle.remove();
          }
        }
      } catch (_0x476537) {}
      try {
        if (_0x11d35d.rpcs[_0x35e105].canvas) {
          _0x11d35d.rpcs[_0x35e105].canvas.remove();
        }
      } catch (_0x475a2b) {}
      try {
        if (_0x11d35d.rpcs[_0x35e105].imageElement) {
          _0x11d35d.rpcs[_0x35e105].imageElement.remove();
        }
      } catch (_0x47d8f2) {}
      if ("eventPlayActive" in _0x11d35d.rpcs[_0x35e105]) {
        clearInterval(_0x11d35d.rpcs[_0x35e105].eventPlayActive);
      }
      pokeIframeAPI("view-connection", false, _0x35e105);
      pokeAPI("endViewConnection", _0x11d35d.rpcs[_0x35e105].streamID);
      if (_0x11d35d.rpcs[_0x35e105].whip) {
        _0x39fb60 = false;
      }
      try {
        _0x11d35d.rpcs[_0x35e105] = null;
        delete _0x11d35d.rpcs[_0x35e105];
      } catch (_0x13ead1) {}
      try {
        _0x11d35d.closeRPC(_0x35e105 + "_screen");
      } catch (_0x39a02d) {}
      if (!_0x11d35d.director || _0x11d35d.switchMode) {
        setTimeout(function () {
          updateMixer();
        }, 0x1);
      }
      if (typeof _0x39fb60 == "undefined") {
        return;
      }
      try {
        warnlog("Should we ask to play the stream Again?");
        if (_0x39fb60) {
          if (_0x39fb60 in _0x11d35d.watchTimeoutList) {
            log('watchTimeoutList:' + _0x39fb60);
            clearTimeout(_0x11d35d.watchTimeoutList[_0x39fb60]);
            delete _0x11d35d.watchTimeoutList[_0x39fb60];
          }
          _0x11d35d.watchTimeoutList[_0x39fb60] = setTimeout(function (_0x48d9a0) {
            try {
              delete _0x11d35d.watchTimeoutList[_0x48d9a0];
            } catch (_0xb6d7ff) {
              warnlog("session.watchTimeoutList no longer exists; won't retry.");
              return;
            }
            log('watchTimeoutList2:' + _0x48d9a0);
            try {
              for (var _0x58451c in _0x11d35d.rpcs) {
                if (_0x11d35d.rpcs[_0x58451c].streamID === _0x48d9a0) {
                  if (_0x11d35d.rpcs[_0x58451c].connectionState === "connected") {
                    warnlog(" --- we will not ask again; we're already connected");
                    return;
                  }
                }
              }
            } catch (_0x35fecd) {
              errorlog(_0x35fecd);
            }
            warnlog(" --- we will ask again");
            _0x11d35d.watchStream(_0x48d9a0);
          }, _0x11d35d.retryTimeout, _0x39fb60);
        }
      } catch (_0x2bec9b) {
        errorlog(_0x2bec9b);
      }
      pokeIframeAPI("new-view-connection", false, _0x35e105);
      if (_0x39fb60 !== null) {
        pokeIframeAPI("end-view-connection", _0x39fb60, _0x35e105);
      } else {
        pokeIframeAPI('end-view-connection', true, _0x35e105);
      }
      updateUserList();
    };
    _0x11d35d.forceRetryTimeout = null;
    _0x11d35d.retryWatchInterval = function () {
      var _0x42db2a = false;
      if (_0x11d35d.view) {
        if (_0x11d35d.forceRetry) {
          clearTimeout(_0x11d35d.forceRetryTimeout);
        }
        if (_0x11d35d.ws === null || typeof _0x11d35d.ws !== "object" || _0x11d35d.ws.readyState !== 0x1) {} else {
          var _0x3a28a3 = _0x11d35d.view.split(',');
          for (var _0x3c5cef in _0x3a28a3) {
            if (_0x3a28a3[_0x3c5cef]) {
              var _0x12b0d3 = false;
              for (var _0x361317 in _0x11d35d.rpcs) {
                if (_0x11d35d.rpcs[_0x361317].streamID && _0x11d35d.rpcs[_0x361317].streamID === _0x3a28a3[_0x3c5cef]) {
                  _0x12b0d3 = true;
                  break;
                }
              }
              if (_0x3a28a3[_0x3c5cef] in _0x11d35d.watchTimeoutList) {
                _0x12b0d3 = true;
              }
              if (_0x12b0d3) {
                continue;
              }
              _0x11d35d.watchStream(_0x3a28a3[_0x3c5cef]);
              _0x42db2a = true;
            }
          }
        }
        if (_0x11d35d.forceRetry && _0x11d35d.forceRetry < 0xa) {
          _0x11d35d.forceRetry = 0xa;
        }
        if (_0x11d35d.forceRetry) {
          _0x11d35d.forceRetryTimeout = setTimeout(function () {
            log("retrying at an interval");
            _0x11d35d.retryWatchInterval();
          }, _0x11d35d.forceRetry * 0x3e8);
        }
      }
      return _0x42db2a;
    };
    _0x11d35d.offerSDP = async function (_0x342ef3) {
      if (_0x342ef3 in _0x11d35d.pcs) {
        if (_0x11d35d.pcs[_0x342ef3].connectionState === 'failed' || _0x11d35d.pcs[_0x342ef3].connectionState === "closed") {
          log("closing 6");
          _0x11d35d.closePC(_0x342ef3);
          warnlog("cleaning up lost connection");
        } else {
          if (iPad || iOS) {
            log("closing 7");
            _0x11d35d.closePC(_0x342ef3);
            warnlog("cleaning up lost connection -- disconnected - iOS specific");
          } else {
            if (_0x11d35d.pcs[_0x342ef3].connectionState !== "connected") {
              await sleep(0xbb8);
              if (_0x11d35d.pcs[_0x342ef3].connectionState !== "connected") {
                log("closing 6");
                _0x11d35d.closePC(_0x342ef3);
                warnlog("cleaning up lost connection");
              } else {
                warnlog("The other end is just being a keener. Ignore it: " + _0x11d35d.pcs[_0x342ef3].connectionState);
                return;
              }
            } else {
              warnlog("The other end is just being a keener. Ignore it: " + _0x11d35d.pcs[_0x342ef3].connectionState);
              return;
            }
          }
        }
      } else {
        log("Create a new RTC connection; offering SDP on request");
      }
      if (_0x11d35d.maxviewers !== false) {
        if (Object.keys(_0x11d35d.pcs).length > _0x11d35d.maxviewers) {
          log("closing 1");
          log("closing 8");
          _0x11d35d.closePC(_0x342ef3);
          return;
        }
      } else {
        if (_0x11d35d.maxconnections !== false) {
          if (Object.keys(_0x11d35d.rpcs).length + Object.keys(_0x11d35d.pcs).length > _0x11d35d.maxconnections) {
            log("closing 2");
            log("closing 9");
            _0x11d35d.closePC(_0x342ef3);
            return;
          }
        }
      }
      if (!_0x11d35d.configuration) {
        await chooseBestTURN();
      }
      if (_0x11d35d.encodedInsertableStreams) {
        _0x11d35d.configuration.encodedInsertableStreams = true;
      }
      if (_0x11d35d.bundlePolicy) {
        _0x11d35d.configuration.bundlePolicy = _0x11d35d.bundlePolicy;
      }
      try {
        _0x11d35d.pcs[_0x342ef3] = new RTCPeerConnection(_0x11d35d.configuration);
      } catch (_0x38c199) {
        if (!_0x11d35d.cleanOutput) {
          warnUser("An RTC error occured");
        }
        errorlog(_0x38c199);
        return;
      }
      if (_0x11d35d.security) {
        if (Object.keys(_0x11d35d.pcs).length > 0x1) {
          log("closing 3");
          log("closing 10");
          _0x11d35d.closePC(_0x342ef3);
          return;
        }
      }
      _0x11d35d.pcs[_0x342ef3].stats = {};
      _0x11d35d.pcs[_0x342ef3].session = _0x11d35d.loadoutID + _0x11d35d.generateStreamID(0x5);
      _0x11d35d.pcs[_0x342ef3].sceneDisplay = null;
      _0x11d35d.pcs[_0x342ef3].sceneMute = null;
      _0x11d35d.pcs[_0x342ef3].obsState = {};
      _0x11d35d.pcs[_0x342ef3].obsState.visibility = null;
      _0x11d35d.pcs[_0x342ef3].obsState.sourceActive = null;
      _0x11d35d.pcs[_0x342ef3].obsState.streaming = null;
      _0x11d35d.pcs[_0x342ef3].obsState.recording = null;
      _0x11d35d.pcs[_0x342ef3].obsState.virtualcam = null;
      _0x11d35d.pcs[_0x342ef3].optimizedBitrate = false;
      _0x11d35d.pcs[_0x342ef3].savedBitrate = false;
      _0x11d35d.pcs[_0x342ef3].solo = null;
      _0x11d35d.pcs[_0x342ef3].layout = null;
      _0x11d35d.pcs[_0x342ef3].bitrateTimeout = null;
      _0x11d35d.pcs[_0x342ef3].maxBandwidth = null;
      _0x11d35d.pcs[_0x342ef3].audioMutedOverride = false;
      _0x11d35d.pcs[_0x342ef3].bitrateTimeoutFirefox = false;
      _0x11d35d.pcs[_0x342ef3].coDirector = false;
      _0x11d35d.pcs[_0x342ef3].setBitrate = false;
      _0x11d35d.pcs[_0x342ef3].setAudioBitrate = false;
      _0x11d35d.pcs[_0x342ef3].guest = false;
      _0x11d35d.pcs[_0x342ef3].limitAudio = false;
      _0x11d35d.pcs[_0x342ef3].enhanceAudio = false;
      _0x11d35d.pcs[_0x342ef3].degradationPreference = false;
      _0x11d35d.pcs[_0x342ef3].encoder = null;
      _0x11d35d.pcs[_0x342ef3].forceios = false;
      _0x11d35d.pcs[_0x342ef3].allowVideo = false;
      _0x11d35d.pcs[_0x342ef3].allowAudio = false;
      _0x11d35d.pcs[_0x342ef3].allowIframe = false;
      _0x11d35d.pcs[_0x342ef3].allowWidget = false;
      _0x11d35d.pcs[_0x342ef3].allowChunked = false;
      _0x11d35d.pcs[_0x342ef3].allowWebp = false;
      _0x11d35d.pcs[_0x342ef3].allowDownloads = false;
      _0x11d35d.pcs[_0x342ef3].allowMIDI = false;
      _0x11d35d.pcs[_0x342ef3].allowBroadcast = false;
      _0x11d35d.pcs[_0x342ef3].allowScreenVideo = false;
      _0x11d35d.pcs[_0x342ef3].allowScreenAudio = false;
      _0x11d35d.pcs[_0x342ef3].whipout = null;
      _0x11d35d.pcs[_0x342ef3].UUID = _0x342ef3;
      _0x11d35d.pcs[_0x342ef3].scale = false;
      _0x11d35d.pcs[_0x342ef3].rotation = false;
      _0x11d35d.pcs[_0x342ef3].scaleDueToBitrate = false;
      _0x11d35d.pcs[_0x342ef3].scaleWidth = false;
      _0x11d35d.pcs[_0x342ef3].scaleHeight = false;
      _0x11d35d.pcs[_0x342ef3].scaleSnap = false;
      _0x11d35d.pcs[_0x342ef3].cover = false;
      _0x11d35d.pcs[_0x342ef3].scaleResolution = false;
      _0x11d35d.pcs[_0x342ef3].showDirector = null;
      _0x11d35d.pcs[_0x342ef3].scene = false;
      _0x11d35d.pcs[_0x342ef3].keyframeRate = false;
      _0x11d35d.pcs[_0x342ef3].keyframeTimeout = null;
      _0x11d35d.pcs[_0x342ef3].label = false;
      _0x11d35d.pcs[_0x342ef3].order = false;
      _0x11d35d.pcs[_0x342ef3].preferVideoCodec = false;
      _0x11d35d.pcs[_0x342ef3].preferAudioCodec = false;
      _0x11d35d.pcs[_0x342ef3].closeTimeout = null;
      _0x11d35d.pcs[_0x342ef3].wssid = _0x11d35d.wssid;
      _0x11d35d.pcs[_0x342ef3].remote = false;
      _0x11d35d.pcs[_0x342ef3].startTime = Date.now();
      _0x11d35d.pcs[_0x342ef3].needsPublishing = null;
      function _0x2fd564(_0x33bff1 = false) {
        if (_0x33bff1) {
          return;
        }
        _0x11d35d.pcs[_0x342ef3].sendChannel = _0x11d35d.pcs[_0x342ef3].createDataChannel("sendChannel");
        _0x11d35d.pcs[_0x342ef3].sendChannel.UUID = _0x342ef3;
        _0x11d35d.pcs[_0x342ef3].sendChannel.onerror = _0x6910ae => {
          if (_0x6910ae.error && _0x6910ae.error.sctpCauseCode && _0x6910ae.error.sctpCauseCode !== 0xc) {
            warnlog(_0x6910ae);
          }
          log("rtc data channel error: " + _0x342ef3);
        };
        _0x11d35d.pcs[_0x342ef3].sendChannel.onopen = () => {
          if (_0x33bff1) {
            return;
          }
          log("send channel open pcs");
          msg = {};
          msg.info = {};
          msg.info.label = _0x11d35d.label;
          msg.info.order = _0x11d35d.order;
          msg.info.muted = _0x11d35d.muted;
          msg.info.queued = _0x11d35d.queue;
          try {
            if (_0x11d35d.group.length || _0x11d35d.allowNoGroup) {
              msg.info.initial_group = _0x11d35d.group.join(',');
            }
          } catch (_0x5d87d0) {}
          msg.info.directorSpeakerMuted = _0x11d35d.directorSpeakerMuted;
          msg.info.directorDisplayMuted = _0x11d35d.directorDisplayMuted;
          msg.info.directorVideoMuted = _0x11d35d.directorVideoMuted;
          msg.info.directorMirror = _0x11d35d.permaMirrored;
          msg.info.video_muted_init = _0x11d35d.videoMuted;
          if (_0x11d35d.roomid) {
            msg.info.room_init = true;
          } else {
            msg.info.room_init = false;
          }
          if (_0x11d35d.director) {
            if (!_0x11d35d.mainDirectorPassword && _0x11d35d.directorUUID && _0x11d35d.directorUUID === _0x342ef3) {
              _0x11d35d.newMainDirectorSetup();
            } else {
              msg.directorSettings = {};
              if (_0x11d35d.mainDirectorPassword) {
                msg.directorSettings.tokenDirector = true;
              }
              msg.directorSettings.totalRoomBitrate = _0x11d35d.totalRoomBitrate;
              if (_0x11d35d.soloChatUUID.length && !_0x11d35d.soloChatUUID.includes(_0x342ef3)) {
                msg.info.muted = true;
              }
              var _0x29d58e = [];
              for (var _0x2ec92b in _0x11d35d.pcs) {
                if (_0x11d35d.pcs[_0x2ec92b].coDirector === true) {
                  _0x29d58e.push(_0x2ec92b);
                }
              }
              if (_0x11d35d.directorBlindAllGuests) {
                msg.directorSettings.blindAllGuests = true;
              }
              if (_0x29d58e.length) {
                msg.directorSettings.addCoDirector = _0x29d58e;
              }
            }
            if (_0x11d35d.autoSyncObject) {
              msg.info.autoSync = _0x11d35d.autoSyncObject;
            }
          }
          if (_0x11d35d.broadcast !== false) {
            msg.info.broadcast_mode = true;
          } else {
            msg.info.broadcast_mode = false;
          }
          if (_0x11d35d.remote) {
            msg.info.remote = true;
          } else {
            msg.info.remote = false;
          }
          if (_0x11d35d.obsControls) {
            msg.info.obs_control = _0x11d35d.obsControls;
          } else {
            if (_0x11d35d.obsControls === false) {
              msg.info.obs_control = false;
            } else if (_0x11d35d.roomid && !_0x11d35d.director) {
              msg.info.obs_control = false;
            } else {
              msg.info.obs_control = null;
            }
          }
          if (_0x11d35d.consent) {
            msg.info.consent = true;
          }
          msg.info.screenshare_url = _0x11d35d.screenshare;
          if (_0x11d35d.notifyScreenShare && !_0x11d35d.screenStream) {
            msg.info.screenShareState = _0x11d35d.screenShareState;
          } else {
            msg.info.screenShareState = false;
          }
          msg.info.width_url = _0x11d35d.width;
          msg.info.height_url = _0x11d35d.height;
          try {
            if (_0x11d35d.streamSrc) {
              let _0x53200a = _0x11d35d.streamSrc.getVideoTracks();
              if (_0x53200a.length) {
                let _0x4b406f = _0x53200a[0x0].getSettings();
                msg.info.video_init_width = _0x4b406f.width || false;
                msg.info.video_init_height = _0x4b406f.height || false;
                msg.info.video_init_frameRate = parseInt(_0x4b406f.frameRate) || false;
              }
            }
            if (_0x11d35d.screenStream && _0x11d35d.screenStream.srcObject) {
              let _0x469dc0 = _0x11d35d.screenStream.srcObject.getVideoTracks();
              if (_0x469dc0.length) {
                let _0x46bd4f = _0x469dc0[0x0].getSettings();
                msg.info.video_2_init_width = _0x46bd4f.width || false;
                msg.info.video_2_init_height = _0x46bd4f.height || false;
                msg.info.video_2_init_frameRate = parseInt(_0x46bd4f.frameRate) || false;
              }
            }
          } catch (_0x433067) {
            errorlog(_0x433067);
          }
          msg.info.quality_url = _0x11d35d.quality;
          msg.info.maxvb_url = _0x11d35d.maxvideobitrate;
          msg.info.maxviewers_url = _0x11d35d.maxviewers;
          msg.info.stereo_url = _0x11d35d.stereo;
          msg.info.aec_url = _0x11d35d.echoCancellation;
          msg.info.agc_url = _0x11d35d.autoGainControl;
          msg.info.denoise_url = _0x11d35d.noiseSuppression;
          msg.info.version = _0x11d35d.version;
          msg.info.recording_audio_gain = _0x11d35d.audioGain;
          msg.info.recording_audio_compressor_type = _0x11d35d.compressor;
          msg.info.recording_audio_mic_delay = _0x11d35d.micDelay;
          msg.info.recording_audio_ctx_latency = _0x11d35d.audioLatency;
          msg.info.recording_audio_pipeline = !_0x11d35d.disableWebAudio;
          msg.info.playback_audio_pipeline = _0x11d35d.audioEffects;
          msg.info.playback_audio_samplerate = _0x11d35d.sampleRate;
          msg.info.playback_audio_volume_meter = _0x11d35d.audioMeterGuest;
          if (_0x11d35d.stats.network_type) {
            msg.info.conn_type = _0x11d35d.stats.network_type;
          }
          if (_0x11d35d.forceRotate !== false) {
            if (_0x11d35d.rotate) {
              msg.info.rotate_video = _0x11d35d.forceRotate + parseInt(_0x11d35d.rotate);
            } else {
              msg.info.rotate_video = _0x11d35d.forceRotate;
            }
          } else {
            msg.info.rotate_video = _0x11d35d.rotate;
          }
          if (msg.info.rotate_video && msg.info.rotate_video >= 0x168) {
            msg.info.rotate_video -= 0x168;
          }
          try {
            if (navigator && navigator.userAgent) {
              msg.info.useragent = navigator.userAgent;
            }
            if (navigator && navigator.platform) {
              msg.info.platform = navigator.platform;
            }
            if (gpgpuSupport) {
              msg.info.gpGPU = gpgpuSupport;
            }
            if (cpuSupport) {
              msg.info.CPU = cpuSupport;
            }
            if (iOS) {
              msg.info.iPhone12Up = iPhone12Up;
            }
            if (SafariVersion) {
              msg.info.Browser = "Safari " + SafariVersion;
            } else {
              if (getChromiumVersion() > 0x3c) {
                msg.info.Browser = "Chromium-based v" + getChromiumVersion();
              } else {
                if (Firefox) {
                  msg.info.Browser = "Firefox";
                } else if (navigator.userAgent.indexOf("CriOS") >= 0x0) {
                  msg.info.Browser = "Chrome for iOS";
                } else {
                  msg.info.Browser = "Unknown";
                }
              }
            }
          } catch (_0x289f1d) {}
          ;
          if (_0x11d35d.batteryState) {
            if ("level" in _0x11d35d.batteryState) {
              if (typeof _0x11d35d.batteryState.level == "number") {
                msg.info.power_level = parseInt(_0x11d35d.batteryState.level * 0x64);
              } else {
                msg.info.power_level = _0x11d35d.batteryState.level;
              }
            }
            if ("charging" in _0x11d35d.batteryState) {
              msg.info.plugged_in = _0x11d35d.batteryState.charging;
            }
          }
          if (_0x11d35d.cpuLimited) {
            msg.info.cpuLimited = _0x11d35d.cpuLimited;
          }
          try {
            if (_0x11d35d.info.out) {
              msg.miniInfo = {};
              msg.miniInfo.out = {};
              msg.miniInfo.out.c = _0x11d35d.info.out.c;
            }
          } catch (_0x59b3a0) {}
          _0x11d35d.sendMessage(msg, _0x342ef3);
          pokeIframeAPI("new-push-connection", true, _0x342ef3);
          pokeIframeAPI("push-connection", true, _0x342ef3);
          updateUserList();
        };
        _0x11d35d.pcs[_0x342ef3].sendChannel.onclose = () => {
          pokeIframeAPI("new-push-connection", false, _0x342ef3);
          _0x11d35d.ping();
          warnlog("send channel closed");
          return;
        };
        _0x11d35d.pcs[_0x342ef3].sendChannel.onmessage = async function (_0x2c75b2) {
          log("received data from viewer");
          try {
            var _0xf77189 = JSON.parse(_0x2c75b2.data);
          } catch (_0x1f554d) {
            warnlog("Couldn't parse JSON; will attempt as ArrayBuffer UINT8ARRAY");
            log(_0x2c75b2.data);
            try {
              var _0x3ae8b1 = new TextDecoder().decode(_0x2c75b2.data);
              var _0xf77189 = JSON.parse(_0x3ae8b1);
            } catch (_0x5c070e) {
              try {
                var _0xf77189 = await new Response(_0x2c75b2.data).text();
                _0xf77189 = JSON.parse(_0xf77189);
              } catch (_0x5706b6) {
                return;
              }
            }
          }
          log(_0xf77189);
          if ("remote" in _0xf77189) {
            try {
              _0xf77189 = await _0x11d35d.decodeRemote(_0xf77189);
              if (!_0xf77189) {
                return;
              }
            } catch (_0x1a69ab) {
              errorlog(_0x1a69ab);
            }
          }
          if ("altUUID" in _0xf77189) {
            await _0x11d35d.processPCSOnMessage(_0xf77189, _0x342ef3 + "_screen", _0x342ef3);
          } else {
            await _0x11d35d.processPCSOnMessage(_0xf77189, _0x342ef3);
          }
        };
      }
      if (!_0x11d35d.legacywebrtc) {
        _0x2fd564(false);
      }
      _0x11d35d.pcs[_0x342ef3].ondatachannel = function (_0x4d87db) {
        warnlog("data channel being used in reverse; this shouldn't really happen, except if maybe doing a file transfer");
        warnlog(_0x4d87db);
        if (_0x4d87db.channel.label && _0x4d87db.channel.label !== "sendChannel") {
          _0x11d35d.recieveFile(_0x11d35d.rpcs, _0x342ef3, _0x4d87db.channel);
          return;
        }
      };
      _0x11d35d.pcs[_0x342ef3].onnegotiationneeded = function (_0x15290f) {
        log("onnegotiationneeded triggered; creating offer");
        _0x11d35d.createOffer(_0x342ef3);
      };
      _0x11d35d.pcs[_0x342ef3].ontrack = _0x441002 => {
        errorlog("Publisher is being sent a video stream??? NOT EXPECTED!");
      };
      _0x11d35d.pcs[_0x342ef3].iceTimer = null;
      _0x11d35d.pcs[_0x342ef3].iceBundle = [];
      _0x11d35d.pcs[_0x342ef3].onicecandidate = function (_0x40aeac) {
        if (_0x40aeac.candidate == null) {
          log("empty ice..");
          return;
        }
        log(_0x40aeac);
        try {
          if (_0x11d35d.icefilter) {
            if (_0x40aeac.candidate.candidate.indexOf(_0x11d35d.icefilter) === -0x1) {
              log("dropped candidate due to filter");
              return;
            } else {
              log(_0x40aeac.candidate);
            }
          }
        } catch (_0x4ebc42) {
          errorlog(_0x4ebc42);
        }
        try {
          if (_0x11d35d.localNetworkOnly) {
            if (!filterIceLAN(_0x40aeac.candidate)) {
              return;
            }
          }
        } catch (_0x3ee8d4) {
          errorlog(_0x3ee8d4);
        }
        if (_0x11d35d.pcs[_0x342ef3].iceTimer !== null) {
          _0x11d35d.pcs[_0x342ef3].iceBundle.push(_0x40aeac.candidate);
          return;
        }
        _0x11d35d.pcs[_0x342ef3].iceBundle.push(_0x40aeac.candidate);
        _0x11d35d.pcs[_0x342ef3].iceTimer = setTimeout(function (_0x2f581f) {
          try {
            _0x11d35d.pcs[_0x2f581f].iceTimer = null;
          } catch (_0x2da0be) {
            warnlog("ice timer no longer exists");
            return;
          }
          var _0x7104a4 = {
            "UUID": _0x2f581f,
            "type": "local",
            "candidates": _0x11d35d.pcs[_0x2f581f].iceBundle,
            session: _0x11d35d.pcs[_0x2f581f].session
          };
          _0x11d35d.pcs[_0x2f581f].iceBundle = [];
          if (_0x11d35d.password) {
            _0x11d35d.encryptMessage(JSON.stringify(_0x7104a4.candidates)).then(function (_0x518b65) {
              _0x7104a4.candidates = _0x518b65[0x0];
              _0x7104a4.vector = _0x518b65[0x1];
              _0x11d35d.anysend(_0x7104a4);
            })["catch"](errorlog);
          } else {
            _0x11d35d.anysend(_0x7104a4);
          }
        }, 0xc8, _0x342ef3);
      };
      _0x11d35d.processPCSOnMessage = async function (_0x50aabe, _0x450e25, _0x1e0d5f = false) {
        _0x50aabe.UUID = _0x450e25;
        if (_0x50aabe.description) {
          _0x11d35d.processDescription(_0x50aabe);
          return;
        } else {
          if (_0x50aabe.candidate) {
            log("GOT ICE!!");
            _0x11d35d.processIce(_0x50aabe);
            return;
          } else {
            if (_0x50aabe.candidates) {
              log("GOT ICEs!!");
              _0x11d35d.processIceBundle(_0x50aabe);
              return;
            } else {
              if ('ping' in _0x50aabe) {
                var _0x5f3873 = {};
                _0x5f3873.pong = _0x50aabe.ping;
                _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                warnlog("PINGED");
                return;
              } else {
                if ("pong" in _0x50aabe) {
                  warnlog("PONGED");
                  return;
                } else {
                  if ("bye" in _0x50aabe) {
                    warnlog("BYE");
                    log("closing 12");
                    _0x11d35d.closePC(_0x450e25);
                    return;
                  }
                }
              }
            }
          }
        }
        if (_0x11d35d.director) {
          if ("requestCoDirector" in _0x50aabe && "vector" in _0x50aabe) {
            if (_0x11d35d.directorPassword) {
              if (_0x11d35d.directorHash) {
                _0x11d35d.decryptMessage(_0x50aabe.requestCoDirector, _0x50aabe.vector, _0x11d35d.directorHash).then(function (_0x380129) {
                  if (_0x380129 === _0x11d35d.directorHash) {
                    _0x11d35d.pcs[_0x450e25].coDirector = true;
                    _0x11d35d.directorList.push(_0x450e25);
                    getById('container_' + _0x450e25).classList.add("directorBlue");
                    _0x11d35d.announceCoDirector(_0x450e25);
                    var _0x14b3a4 = {};
                    _0x14b3a4.approved = "requestCoDirector";
                    _0x11d35d.sendMessage(_0x14b3a4, _0x450e25);
                  } else {
                    warnlog("codirector request hash failed");
                    var _0x14b3a4 = {};
                    _0x14b3a4.rejected = "requestCoDirector";
                    _0x11d35d.sendMessage(_0x14b3a4, _0x450e25);
                  }
                })["catch"](function () {
                  warnlog("Failed attempt to connect as co-director");
                  var _0x116054 = {
                    "rejected": "requestCoDirector"
                  };
                  _0x11d35d.sendMessage(_0x116054, _0x450e25);
                });
              } else {
                generateHash(_0x11d35d.directorPassword + _0x11d35d.salt + "abc123", 0xc).then(function (_0x4d5129) {
                  _0x11d35d.directorHash = _0x4d5129;
                  _0x11d35d.decryptMessage(_0x50aabe.requestCoDirector, _0x50aabe.vector, _0x11d35d.directorHash).then(function (_0x2db3ac) {
                    if (_0x2db3ac === _0x11d35d.directorHash) {
                      _0x11d35d.pcs[_0x450e25].coDirector = true;
                      _0x11d35d.directorList.push(_0x450e25);
                      getById("container_" + _0x450e25).classList.add("directorBlue");
                      _0x11d35d.announceCoDirector(_0x450e25);
                      var _0x386bcd = {};
                      _0x386bcd.approved = "requestCoDirector";
                      _0x11d35d.sendRequest(_0x386bcd, _0x450e25);
                    } else {
                      warnlog("codirector request hash failed");
                      var _0x386bcd = {};
                      _0x386bcd.rejected = "requestCoDirector";
                      _0x11d35d.sendRequest(_0x386bcd, _0x450e25);
                    }
                  })["catch"](function () {
                    warnlog("Failed attempt to connect as co-director");
                    var _0x1fcd12 = {
                      "rejected": "requestCoDirector"
                    };
                    _0x11d35d.sendRequest(_0x1fcd12, _0x450e25);
                  });
                  return;
                })["catch"](errorlog);
              }
            } else {
              warnlog("reject co");
              var _0x5f3873 = {};
              _0x5f3873.rejected = "requestCoDirector";
              _0x11d35d.sendRequest(_0x5f3873, _0x450e25);
            }
          }
          if ("migrate" in _0x50aabe && 'roomid' in _0x50aabe) {
            log("Someone is trying to transfer a guest");
            if (_0x11d35d.codirector_transfer) {
              if (_0x450e25 in _0x11d35d.pcs && _0x11d35d.pcs[_0x450e25].coDirector === true) {
                log("Valid co director trying to transfer a guest");
                var _0x5f3873 = {};
                if (_0x50aabe.transferSettings && _0x50aabe.transferSettings.updateurl) {
                  _0x5f3873.request = "migrate";
                  _0x5f3873.transferSettings = _0x50aabe.transferSettings;
                  log(_0x5f3873);
                  _0x11d35d.sendRequest(_0x5f3873, _0x50aabe.migrate.toString(), function () {
                    var _0x37d93e = {
                      "request": 'migrate',
                      roomid: _0x50aabe.roomid,
                      "target": _0x50aabe.migrate.toString()
                    };
                    _0x11d35d.sendMsg(_0x37d93e);
                  });
                  log(_0x5f3873);
                } else {
                  if (_0x50aabe.transferSettings && "broadcast" in _0x50aabe.transferSettings) {
                    _0x5f3873.request = "migrate";
                    _0x5f3873.transferSettings = _0x50aabe.transferSettings;
                    delete _0x5f3873.transferSettings.roomid;
                    delete _0x5f3873.transferSettings.roomenc;
                    log(_0x5f3873);
                    _0x11d35d.sendRequest(_0x5f3873, _0x50aabe.migrate.toString(), function () {
                      var _0x2bef9b = {
                        "request": 'migrate',
                        "roomid": _0x50aabe.roomid,
                        "target": _0x50aabe.migrate.toString()
                      };
                      _0x11d35d.sendMsg(_0x2bef9b);
                    });
                    log(_0x5f3873);
                  } else if (Object.keys(_0x50aabe.transferSettings).length) {
                    _0x5f3873.request = "migrate";
                    _0x5f3873.transferSettings = _0x50aabe.transferSettings;
                    delete _0x5f3873.transferSettings.roomid;
                    delete _0x5f3873.transferSettings.roomenc;
                    log(_0x5f3873);
                    _0x11d35d.sendRequest(_0x5f3873, _0x50aabe.migrate.toString(), function () {
                      var _0x50bec3 = {
                        "request": "migrate",
                        roomid: _0x50aabe.roomid,
                        "target": _0x50aabe.migrate.toString()
                      };
                      _0x11d35d.sendMsg(_0x50bec3);
                    });
                    log(_0x5f3873);
                  } else {
                    _0x5f3873.request = 'migrate';
                    _0x5f3873.roomid = _0x50aabe.roomid;
                    _0x5f3873.target = _0x50aabe.migrate.toString();
                    _0x11d35d.sendMsg(_0x5f3873);
                  }
                }
                pokeIframeAPI("transfer", _0x50aabe.roomid, _0x50aabe.migrate.toString());
              }
            } else {
              var _0x5f3873 = {};
              _0x5f3873.rejected = 'requestCoMigrate';
              _0x11d35d.sendRequest(_0x5f3873, _0x450e25);
            }
          }
        }
        if ("requestAs" in _0x50aabe) {
          if (!_0x50aabe.UUID) {
            log("no UUID in msg");
            return;
          }
          var _0x30730f = _0x50aabe.requestAs;
          if (!_0x11d35d.pcs[_0x30730f]) {
            log("no pcs[UUID]");
            return;
          }
          if (_0x11d35d.directorList.indexOf(_0x30730f) >= 0x0) {
            var _0x5f3873 = {};
            _0x5f3873.rejected = "requestAs";
            _0x11d35d.sendMessage(_0x5f3873, _0x50aabe.UUID);
            warnlog("Remote user is a director");
            return;
          }
          if (_0x11d35d.remote) {
            if ("remote" in _0x50aabe && _0x50aabe.remote === _0x11d35d.remote && _0x11d35d.remote) {} else {
              if (_0x11d35d.remote === true) {}
            }
          } else {
            if (_0x11d35d.directorList.indexOf(_0x50aabe.UUID) >= 0x0) {} else {
              return;
            }
          }
          if ('targetBitrate' in _0x50aabe) {
            _0x11d35d.targetBitrate(_0x30730f, _0x50aabe.targetBitrate);
          }
          if ("targetAudioBitrate" in _0x50aabe) {
            _0x11d35d.targetAudioBitrate(_0x30730f, _0x50aabe.targetAudioBitrate);
          }
          if ("requestResolution" in _0x50aabe) {
            try {
              _0x11d35d.setResolution(_0x30730f, _0x50aabe.requestResolution.w, _0x50aabe.requestResolution.h, _0x50aabe.requestResolution.s, _0x50aabe.requestResolution.c);
            } catch (_0x35b4c0) {
              errorlog(_0x35b4c0);
            }
          }
          return;
        }
        manageSceneState(_0x50aabe, _0x450e25);
        try {
          if ("info" in _0x50aabe) {
            _0x11d35d.pcs[_0x450e25].stats.info = _0x50aabe.info;
            if ("label" in _0x50aabe.info) {
              if (typeof _0x50aabe.info.label == "string") {
                _0x11d35d.pcs[_0x450e25].label = sanitizeLabel(_0x50aabe.info.label);
              } else {
                _0x11d35d.pcs[_0x450e25].label = false;
              }
            }
            if (_0x1e0d5f) {
              if (_0x1e0d5f === _0x11d35d.directorUUID) {
                try {
                  _0x11d35d.pcs[_0x450e25].stats.info.director = true;
                } catch (_0x570f44) {}
              } else {
                if (_0x11d35d.directorList.indexOf(_0x1e0d5f) >= 0x0) {
                  try {
                    _0x11d35d.pcs[_0x450e25].stats.info.coDirector = true;
                  } catch (_0x478b19) {}
                }
              }
            } else {
              if (_0x450e25 === _0x11d35d.directorUUID) {
                try {
                  _0x11d35d.pcs[_0x450e25].stats.info.director = true;
                } catch (_0x11bf8d) {}
              } else {
                if (_0x11d35d.directorList.indexOf(_0x450e25) >= 0x0) {
                  try {
                    _0x11d35d.pcs[_0x450e25].stats.info.coDirector = true;
                  } catch (_0x1d0a43) {}
                }
              }
            }
            if (_0x11d35d.layouts && _0x11d35d.director && 'obs' in _0x50aabe.info && _0x50aabe.info.obs) {
              createSlotUpdate(_0x450e25);
              if (_0x11d35d.obsSceneTriggers) {
                _0x11d35d.sendMessage({
                  'obsSceneTriggers': _0x11d35d.obsSceneTriggers,
                  'layouts': _0x11d35d.layouts
                }, _0x450e25);
              } else {
                _0x11d35d.sendMessage({
                  'layouts': _0x11d35d.layouts
                }, _0x450e25);
              }
            }
            if (Firefox || _0x50aabe.info.firefox) {
              try {
                if ("vb_url" in _0x50aabe.info) {
                  if (_0x11d35d.pcs[_0x450e25].savedBitrate === false) {
                    if (_0x50aabe.info.vb_url && parseInt(_0x50aabe.info.vb_url) > 0x0) {
                      _0x11d35d.pcs[_0x450e25].savedBitrate = parseInt(_0x50aabe.info.vb_url);
                      if (_0x11d35d.pcs[_0x450e25].bitrateTimeout) {
                        clearTimeout(_0x11d35d.pcs[_0x450e25].bitrateTimeout);
                      }
                      _0x11d35d.pcs[_0x450e25].bitrateTimeout = setTimeout(function (_0x21c566) {
                        _0x11d35d.limitBitrate(_0x21c566, null);
                      }, 0x3e8, _0x450e25);
                    }
                  }
                }
              } catch (_0x4ecf52) {
                errorlog(_0x4ecf52);
              }
            }
            pokeIframeAPI("push-connection-info", _0x50aabe.info, _0x450e25);
          }
          if ('ifs' in _0x50aabe) {
            if (_0x11d35d.iframeSrc) {
              try {
                if (_0x11d35d.iframeSrc.startsWith("https://www.youtube.com/")) {
                  processIframeSyncFeedback(_0x50aabe.ifs, _0x450e25);
                }
              } catch (_0x30fbe3) {
                errorlog(_0x30fbe3);
              }
            }
          }
          if ("pipe" in _0x50aabe) {
            _0x11d35d.gotGenericData(_0x50aabe.pipe, _0x450e25);
          }
          if ("autoSync" in _0x50aabe) {
            _0x11d35d.autoSyncObject = _0x50aabe.autoSync;
            _0x11d35d.autoSyncCallback(_0x450e25);
          }
          if ("optimizedBitrate" in _0x50aabe) {
            _0x11d35d.pcs[_0x450e25].optimizedBitrate = parseInt(_0x50aabe.optimizedBitrate);
          }
          if ("audioBitrate" in _0x50aabe) {
            _0x11d35d.limitAudioBitrate(_0x450e25, _0x50aabe.audioBitrate);
          }
          if ("bitrate" in _0x50aabe) {
            _0x11d35d.limitBitrate(_0x450e25, _0x50aabe.bitrate);
          }
          if ('targetBitrate' in _0x50aabe) {
            _0x11d35d.targetBitrate(_0x450e25, _0x50aabe.targetBitrate);
          }
          if ('targetAudioBitrate' in _0x50aabe) {
            _0x11d35d.targetAudioBitrate(_0x450e25, _0x50aabe.targetAudioBitrate);
          }
          if ("hangup" in _0x50aabe) {
            if ("remote" in _0x50aabe) {
              if (_0x50aabe.remote === _0x11d35d.remote && _0x11d35d.remote || _0x11d35d.remote === true) {
                _0x11d35d.hangup();
                return;
              }
            }
          }
          if ('reload' in _0x50aabe) {
            if ('remote' in _0x50aabe) {
              if (_0x50aabe.remote === _0x11d35d.remote && _0x11d35d.remote || _0x11d35d.remote === true) {
                _0x11d35d.hangup(true);
                return;
              }
            }
          }
          if ("requestStats" in _0x50aabe) {
            if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0) {
              var _0x1fcd6f = {};
              if (_0x11d35d.whipOut.stats) {
                _0x1fcd6f.whipOut = _0x11d35d.whipOut.stats;
              } else {
                for (var _0x312f0d in _0x11d35d.pcs) {
                  if (_0x312f0d === _0x450e25) {
                    continue;
                  }
                  _0x1fcd6f[_0x312f0d] = _0x11d35d.pcs[_0x312f0d].stats;
                }
              }
              var _0x5f3873 = {};
              _0x5f3873.remoteStats = _0x1fcd6f;
              _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
            } else {
              if ("remote" in _0x50aabe) {
                if (_0x50aabe.remote === _0x11d35d.remote && _0x11d35d.remote || _0x11d35d.remote === true) {
                  var _0x1fcd6f = {};
                  if (_0x11d35d.whipOut.stats) {
                    _0x1fcd6f.whipOut = _0x11d35d.whipOut.stats;
                  } else {
                    for (var _0x312f0d in _0x11d35d.pcs) {
                      if (_0x312f0d === _0x450e25) {
                        continue;
                      }
                      _0x1fcd6f[_0x312f0d] = _0x11d35d.pcs[_0x312f0d].stats;
                    }
                  }
                  var _0x5f3873 = {};
                  _0x5f3873.remoteStats = _0x1fcd6f;
                  _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                }
              } else {
                var _0x1fcd6f = {};
                if (_0x11d35d.whipOut.stats) {
                  _0x1fcd6f.whipOut = _0x11d35d.whipOut.stats;
                } else {
                  for (var _0x312f0d in _0x11d35d.pcs) {
                    if (_0x312f0d === _0x450e25) {
                      continue;
                    }
                    if (!_0x11d35d.pcs[_0x312f0d].stats) {
                      continue;
                    }
                    if (_0x11d35d.pcs[_0x312f0d].guest) {
                      continue;
                    }
                    if (_0x11d35d.roomid) {
                      if ("scene" in _0x11d35d.pcs[_0x312f0d].stats) {
                        if (_0x11d35d.pcs[_0x312f0d].stats.scene === false) {
                          continue;
                        }
                      } else {
                        continue;
                      }
                    }
                    _0x1fcd6f[_0x312f0d] = {};
                    if (_0x11d35d.pcs[_0x312f0d].stats.video_bitrate_kbps) {
                      _0x1fcd6f[_0x312f0d].video_bitrate_kbps = _0x11d35d.pcs[_0x312f0d].stats.video_bitrate_kbps;
                    }
                    if (_0x11d35d.pcs[_0x312f0d].stats.nacks_per_second) {
                      _0x1fcd6f[_0x312f0d].nacks_per_second = _0x11d35d.pcs[_0x312f0d].stats.nacks_per_second;
                    }
                    if (_0x11d35d.pcs[_0x312f0d].stats.available_outgoing_bitrate_kbps) {
                      _0x1fcd6f[_0x312f0d].available_outgoing_bitrate_kbps = _0x11d35d.pcs[_0x312f0d].stats.available_outgoing_bitrate_kbps;
                    }
                    if (_0x11d35d.pcs[_0x312f0d].stats.scene) {
                      _0x1fcd6f[_0x312f0d].scene = _0x11d35d.pcs[_0x312f0d].stats.scene;
                    }
                    if (_0x11d35d.pcs[_0x312f0d].label) {
                      _0x1fcd6f[_0x312f0d].label = _0x11d35d.pcs[_0x312f0d].label;
                    }
                    if (_0x11d35d.pcs[_0x312f0d].stats.resolution) {
                      _0x1fcd6f[_0x312f0d].resolution = _0x11d35d.pcs[_0x312f0d].stats.resolution;
                    }
                    if (_0x11d35d.pcs[_0x312f0d].stats.video_encoder) {
                      _0x1fcd6f[_0x312f0d].video_encoder = _0x11d35d.pcs[_0x312f0d].stats.video_encoder;
                    }
                  }
                }
                var _0x5f3873 = {};
                _0x5f3873.remoteStats = _0x1fcd6f;
                _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
              }
            }
          }
          if ("requestStatsContinuous" in _0x50aabe) {
            clearInterval(_0x11d35d.pcs[_0x450e25].requestedStatsInterval);
            if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0) {
              if (_0x50aabe.requestStatsContinuous) {
                _0x11d35d.pcs[_0x450e25].requestedStatsInterval = setInterval(function (_0x316a8c) {
                  var _0x32bd6b = {};
                  if (_0x11d35d.whipOut.stats) {
                    _0x32bd6b.whipOut = _0x11d35d.whipOut.stats;
                  } else {
                    for (var _0x19dd09 in _0x11d35d.pcs) {
                      if (_0x19dd09 === _0x316a8c) {
                        continue;
                      }
                      if (!_0x11d35d.pcs[_0x19dd09].stats) {
                        continue;
                      }
                      if (_0x11d35d.pcs[_0x19dd09].guest) {
                        continue;
                      }
                      _0x32bd6b[_0x19dd09] = _0x11d35d.pcs[_0x19dd09].stats;
                    }
                  }
                  var _0x5a0838 = {
                    remoteStats: _0x32bd6b
                  };
                  _0x11d35d.sendMessage(_0x5a0838, _0x316a8c);
                }, 0xbb8, _0x450e25);
                var _0x1fcd6f = {};
                if (_0x11d35d.whipOut.stats) {
                  _0x1fcd6f.whipOut = _0x11d35d.whipOut.stats;
                } else {
                  for (var _0x312f0d in _0x11d35d.pcs) {
                    if (_0x312f0d === _0x450e25) {
                      continue;
                    }
                    if (!_0x11d35d.pcs[_0x312f0d].stats) {
                      continue;
                    }
                    if (_0x11d35d.pcs[_0x312f0d].guest) {
                      continue;
                    }
                    _0x1fcd6f[_0x312f0d] = _0x11d35d.pcs[_0x312f0d].stats;
                  }
                }
                var _0x5f3873 = {};
                _0x5f3873.remoteStats = _0x1fcd6f;
                _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
              }
            } else {
              if ('remote' in _0x50aabe) {
                if (_0x50aabe.remote === _0x11d35d.remote && _0x11d35d.remote || _0x11d35d.remote === true) {
                  if (_0x50aabe.requestStatsContinuous) {
                    _0x11d35d.pcs[_0x450e25].requestedStatsInterval = setInterval(function (_0x4ddb6e) {
                      var _0x4bd10d = {};
                      if (_0x11d35d.whipOut.stats) {
                        _0x4bd10d.whipOut = _0x11d35d.whipOut.stats;
                      } else {
                        for (var _0x4bbde4 in _0x11d35d.pcs) {
                          if (_0x4bbde4 === _0x4ddb6e) {
                            continue;
                          }
                          if (!_0x11d35d.pcs[_0x4bbde4].stats) {
                            continue;
                          }
                          if (_0x11d35d.pcs[_0x4bbde4].guest) {
                            continue;
                          }
                          _0x4bd10d[_0x4bbde4] = _0x11d35d.pcs[_0x4bbde4].stats;
                        }
                      }
                      var _0x4d0335 = {
                        remoteStats: _0x4bd10d
                      };
                      _0x11d35d.sendMessage(_0x4d0335, _0x4ddb6e);
                    }, 0xbb8, _0x450e25);
                    var _0x1fcd6f = {};
                    if (_0x11d35d.whipOut.stats) {
                      _0x1fcd6f.whipOut = _0x11d35d.whipOut.stats;
                    } else {
                      for (var _0x312f0d in _0x11d35d.pcs) {
                        if (_0x312f0d === _0x450e25) {
                          continue;
                        }
                        if (!_0x11d35d.pcs[_0x312f0d].stats) {
                          continue;
                        }
                        if (_0x11d35d.pcs[_0x312f0d].guest) {
                          continue;
                        }
                        _0x1fcd6f[_0x312f0d] = _0x11d35d.pcs[_0x312f0d].stats;
                      }
                    }
                    var _0x5f3873 = {};
                    _0x5f3873.remoteStats = _0x1fcd6f;
                    _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                  }
                }
              } else {
                if (_0x50aabe.requestStatsContinuous) {
                  _0x11d35d.pcs[_0x450e25].requestedStatsInterval = setInterval(function (_0xb21e7c) {
                    var _0x2c77b0 = {};
                    if (_0x11d35d.whipOut.stats) {
                      _0x2c77b0.whipOut = _0x11d35d.whipOut.stats;
                    } else {
                      for (var _0x3fad44 in _0x11d35d.pcs) {
                        if (_0x3fad44 === _0xb21e7c) {
                          continue;
                        }
                        if (!_0x11d35d.pcs[_0x3fad44].stats) {
                          continue;
                        }
                        if (_0x11d35d.pcs[_0x3fad44].guest) {
                          continue;
                        }
                        if (_0x11d35d.roomid) {
                          if ("scene" in _0x11d35d.pcs[_0x3fad44].stats) {
                            if (_0x11d35d.pcs[_0x3fad44].stats.scene === false) {
                              continue;
                            }
                          } else {
                            continue;
                          }
                        }
                        _0x2c77b0[_0x3fad44] = {};
                        if (_0x11d35d.pcs[_0x3fad44].stats.video_bitrate_kbps) {
                          _0x2c77b0[_0x3fad44].video_bitrate_kbps = _0x11d35d.pcs[_0x3fad44].stats.video_bitrate_kbps;
                        }
                        if (_0x11d35d.pcs[_0x3fad44].stats.nacks_per_second) {
                          _0x2c77b0[_0x3fad44].nacks_per_second = _0x11d35d.pcs[_0x3fad44].stats.nacks_per_second;
                        }
                        if (_0x11d35d.pcs[_0x3fad44].stats.available_outgoing_bitrate_kbps) {
                          _0x2c77b0[_0x3fad44].available_outgoing_bitrate_kbps = _0x11d35d.pcs[_0x3fad44].stats.available_outgoing_bitrate_kbps;
                        }
                        if (_0x11d35d.pcs[_0x3fad44].stats.scene) {
                          _0x2c77b0[_0x3fad44].scene = _0x11d35d.pcs[_0x3fad44].stats.scene;
                        }
                        if (_0x11d35d.pcs[_0x3fad44].label) {
                          _0x2c77b0[_0x3fad44].label = _0x11d35d.pcs[_0x3fad44].label;
                        }
                        if (_0x11d35d.pcs[_0x3fad44].stats.resolution) {
                          _0x2c77b0[_0x3fad44].resolution = _0x11d35d.pcs[_0x3fad44].stats.resolution;
                        }
                        if (_0x11d35d.pcs[_0x3fad44].stats.video_encoder) {
                          _0x2c77b0[_0x3fad44].video_encoder = _0x11d35d.pcs[_0x3fad44].stats.video_encoder;
                        }
                      }
                    }
                    var _0x2691a8 = {
                      "remoteStats": _0x2c77b0
                    };
                    _0x11d35d.sendMessage(_0x2691a8, _0xb21e7c);
                  }, 0xbb8, _0x450e25);
                  var _0x1fcd6f = {};
                  if (_0x11d35d.whipOut.stats) {
                    _0x1fcd6f.whipOut = _0x11d35d.whipOut.stats;
                  } else {
                    for (var _0x312f0d in _0x11d35d.pcs) {
                      if (_0x312f0d === _0x450e25) {
                        continue;
                      }
                      if (!_0x11d35d.pcs[_0x312f0d].stats) {
                        continue;
                      }
                      if (_0x11d35d.pcs[_0x312f0d].guest) {
                        continue;
                      }
                      if (_0x11d35d.roomid) {
                        if ("scene" in _0x11d35d.pcs[_0x312f0d].stats) {
                          if (_0x11d35d.pcs[_0x312f0d].stats.scene === false) {
                            continue;
                          }
                        } else {
                          continue;
                        }
                      }
                      _0x1fcd6f[_0x312f0d] = {};
                      if (_0x11d35d.pcs[_0x312f0d].stats.video_bitrate_kbps) {
                        _0x1fcd6f[_0x312f0d].video_bitrate_kbps = _0x11d35d.pcs[_0x312f0d].stats.video_bitrate_kbps;
                      }
                      if (_0x11d35d.pcs[_0x312f0d].stats.nacks_per_second) {
                        _0x1fcd6f[_0x312f0d].nacks_per_second = _0x11d35d.pcs[_0x312f0d].stats.nacks_per_second;
                      }
                      if (_0x11d35d.pcs[_0x312f0d].stats.available_outgoing_bitrate_kbps) {
                        _0x1fcd6f[_0x312f0d].available_outgoing_bitrate_kbps = _0x11d35d.pcs[_0x312f0d].stats.available_outgoing_bitrate_kbps;
                      }
                      if (_0x11d35d.pcs[_0x312f0d].stats.scene) {
                        _0x1fcd6f[_0x312f0d].scene = _0x11d35d.pcs[_0x312f0d].stats.scene;
                      }
                      if (_0x11d35d.pcs[_0x312f0d].label) {
                        _0x1fcd6f[_0x312f0d].label = _0x11d35d.pcs[_0x312f0d].label;
                      }
                      if (_0x11d35d.pcs[_0x312f0d].stats.resolution) {
                        _0x1fcd6f[_0x312f0d].resolution = _0x11d35d.pcs[_0x312f0d].stats.resolution;
                      }
                      if (_0x11d35d.pcs[_0x312f0d].stats.video_encoder) {
                        _0x1fcd6f[_0x312f0d].video_encoder = _0x11d35d.pcs[_0x312f0d].stats.video_encoder;
                      }
                    }
                  }
                  var _0x5f3873 = {};
                  _0x5f3873.remoteStats = _0x1fcd6f;
                  _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                }
              }
            }
          }
          if ("requestResolution" in _0x50aabe) {
            try {
              _0x11d35d.setResolution(_0x450e25, _0x50aabe.requestResolution.w, _0x50aabe.requestResolution.h, _0x50aabe.requestResolution.s, _0x50aabe.requestResolution.c);
            } catch (_0x264372) {
              errorlog(_0x264372);
            }
          }
          if ('keyframe' in _0x50aabe) {
            if (_0x50aabe.scene) {
              if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0) {
                _0x11d35d.sendKeyFrameScenes();
              } else {
                errorlog("Not director");
              }
            } else {
              _0x11d35d.forcePLI(_0x450e25);
            }
          }
          if ("chat" in _0x50aabe) {
            var _0x3a3e67 = false;
            var _0x3d2c55 = false;
            if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0) {
              _0x3a3e67 = true;
              if ("overlay" in _0x50aabe) {
                if (_0x50aabe.overlay == true) {
                  _0x3d2c55 = true;
                }
              }
            }
            log("isDirector " + _0x3a3e67);
            getChatMessage(_0x50aabe.chat, _0x11d35d.pcs[_0x450e25].label, _0x3a3e67, _0x3d2c55);
          }
          if ("order" in _0x50aabe) {
            _0x11d35d.pcs[_0x450e25].order = parseInt(_0x50aabe.order) || 0x0;
            if (_0x450e25 in _0x11d35d.rpcs) {
              _0x11d35d.rpcs[_0x450e25].order = _0x11d35d.pcs[_0x450e25].order;
            }
            if (_0x11d35d.director) {
              var _0x19d3a4 = document.querySelectorAll("[data-action-type=\"order-value\"][data--u-u-i-d=\"" + _0x450e25 + "\"]");
              log(_0x19d3a4);
              if (_0x19d3a4[0x0]) {
                _0x19d3a4[0x0].innerText = parseInt(_0x50aabe.order) || 0x0;
              }
            }
            updateMixer();
          }
          if ("scale" in _0x50aabe) {
            _0x11d35d.setScale(_0x450e25, _0x50aabe.scale);
          }
          if (_0x11d35d.director && _0x11d35d.pcs[_0x450e25].coDirector && "directorState" in _0x50aabe) {
            log(_0x50aabe);
            _0x11d35d.syncState = _0x50aabe.directorState;
            for (var _0x2e4ed3 in _0x11d35d.syncState) {
              syncSceneState(_0x2e4ed3);
              syncOtherState(_0x2e4ed3);
            }
          }
          if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) == -0x1) {
            if ('requestAudioHack' in _0x50aabe) {
              var _0x5f3873 = {};
              _0x5f3873.rejected = "requestAudioHack";
              _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
            } else {
              if ("requestVideoRecord" in _0x50aabe) {
                var _0x5f3873 = {};
                _0x5f3873.rejected = "requestVideoRecord";
                _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
              } else {
                if ("changeOrder" in _0x50aabe) {
                  var _0x5f3873 = {};
                  _0x5f3873.rejected = 'changeOrder';
                  _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                } else {
                  if ("changeURL" in _0x50aabe) {
                    var _0x5f3873 = {};
                    _0x5f3873.rejected = "changeURL";
                    _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                  } else {
                    if ('changeLabel' in _0x50aabe) {
                      var _0x5f3873 = {};
                      _0x5f3873.rejected = 'changeLabel';
                      _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                    } else {
                      if ("requestChangeEQ" in _0x50aabe) {
                        var _0x5f3873 = {};
                        _0x5f3873.rejected = 'requestChangeEQ';
                        _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                      } else {
                        if ('requestChangeGating' in _0x50aabe) {
                          var _0x5f3873 = {};
                          _0x5f3873.rejected = "requestChangeGating";
                          _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                        } else {
                          if ("requestChangeCompressor" in _0x50aabe) {
                            var _0x5f3873 = {};
                            _0x5f3873.rejected = "requestChangeCompressor";
                            _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                          } else {
                            if ('requestChangeSubGain' in _0x50aabe) {
                              var _0x5f3873 = {};
                              _0x5f3873.rejected = "requestChangeSubGain";
                              _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                            } else {
                              if ("remoteVideoMuted" in _0x50aabe) {
                                var _0x5f3873 = {};
                                _0x5f3873.rejected = "remoteVideoMuted";
                                _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                              } else {
                                if ("requestChangeMicDelay" in _0x50aabe) {
                                  var _0x5f3873 = {};
                                  _0x5f3873.rejected = "requestChangeMicDelay";
                                  _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                } else {
                                  if ('lowerhand' in _0x50aabe) {
                                    var _0x5f3873 = {};
                                    _0x5f3873.rejected = "lowerhand";
                                    _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                  } else {
                                    if ('hangup' in _0x50aabe) {
                                      var _0x5f3873 = {};
                                      _0x5f3873.rejected = "hangup";
                                      _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                    } else {
                                      if ("displayMute" in _0x50aabe) {
                                        var _0x5f3873 = {};
                                        _0x5f3873.rejected = 'displayMute';
                                        _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                      } else {
                                        if ("speakerMute" in _0x50aabe) {
                                          var _0x5f3873 = {};
                                          _0x5f3873.rejected = "speakerMute";
                                          _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                        } else {
                                          if ('volume' in _0x50aabe) {
                                            var _0x5f3873 = {};
                                            _0x5f3873.rejected = "volume";
                                            _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                          } else {
                                            if ("micIsolated" in _0x50aabe) {
                                              var _0x5f3873 = {};
                                              _0x5f3873.rejected = "micIsolated";
                                              _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                            } else {
                                              if ("requestUpload" in _0x50aabe) {
                                                var _0x5f3873 = {};
                                                _0x5f3873.rejected = "requestUpload";
                                                _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                              } else {
                                                if ("stopClock" in _0x50aabe) {
                                                  var _0x5f3873 = {};
                                                  _0x5f3873.rejected = "stopClock";
                                                  _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                                } else {
                                                  if ("resumeClock" in _0x50aabe) {
                                                    var _0x5f3873 = {};
                                                    _0x5f3873.rejected = "resumeClock";
                                                    _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                                  } else {
                                                    if ("setClock" in _0x50aabe) {
                                                      var _0x5f3873 = {};
                                                      _0x5f3873.rejected = 'setClock';
                                                      _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                                    } else {
                                                      if ("hideClock" in _0x50aabe) {
                                                        var _0x5f3873 = {};
                                                        _0x5f3873.rejected = "hideClock";
                                                        _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                                      } else {
                                                        if ("showClock" in _0x50aabe) {
                                                          var _0x5f3873 = {};
                                                          _0x5f3873.rejected = 'showClock';
                                                          _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                                        } else {
                                                          if ("startClock" in _0x50aabe) {
                                                            var _0x5f3873 = {};
                                                            _0x5f3873.rejected = "startClock";
                                                            _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                                          } else {
                                                            if ("pauseClock" in _0x50aabe) {
                                                              var _0x5f3873 = {};
                                                              _0x5f3873.rejected = "pauseClock";
                                                              _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                                            } else {
                                                              if ("showTime" in _0x50aabe) {
                                                                var _0x5f3873 = {};
                                                                _0x5f3873.rejected = "showTime";
                                                                _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                                              } else {
                                                                if ("group" in _0x50aabe) {
                                                                  var _0x5f3873 = {};
                                                                  _0x5f3873.rejected = "group";
                                                                  _0x11d35d.sendMessage(_0x5f3873, _0x450e25);
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          } else {
            if ("requestAudioHack" in _0x50aabe) {
              var _0x216df9 = _0x11d35d.streamSrc.getAudioTracks();
              if (_0x216df9.length) {
                if ("deviceId" in _0x50aabe) {
                  applyAudioHack(_0x50aabe.keyname, _0x50aabe.value, _0x50aabe.deviceId);
                } else {
                  applyAudioHack(_0x50aabe.keyname, _0x50aabe.value);
                }
              }
            }
            if ("requestVideoRecord" in _0x50aabe) {
              if (_0x50aabe.requestVideoRecord) {
                if (_0x50aabe.googleDriveRecord) {
                  _0x11d35d.gdrive = {};
                  _0x11d35d.gdrive.sessionUri = _0x50aabe.googleDriveRecord;
                }
                if (_0x11d35d.videoElement) {
                  var _0x1b896a = 0x1770;
                  if (_0x50aabe.value) {
                    _0x1b896a = parseInt(_0x50aabe.value);
                  }
                  recordLocalVideo("start", _0x1b896a, false, _0x50aabe.altUUID || false);
                }
              } else if (_0x11d35d.videoElement) {
                recordLocalVideo("stop", false, false, _0x50aabe.altUUID || false);
              }
            }
            if ("changeOrder" in _0x50aabe) {
              if (_0x11d35d.order == false) {
                _0x11d35d.order = 0x0;
              }
              _0x11d35d.order += parseInt(_0x50aabe.changeOrder) || 0x0;
              var _0x5f3873 = {};
              _0x5f3873 = {};
              _0x5f3873.order = _0x11d35d.order;
              _0x11d35d.sendPeers(_0x5f3873);
              updateMixer();
            }
            if ("changeURL" in _0x50aabe) {
              changeURL(_0x50aabe.changeURL);
            }
            if ("stopClock" in _0x50aabe) {
              stopClock();
            }
            if ("resumeClock" in _0x50aabe) {
              resumeClock();
            }
            if ('setClock' in _0x50aabe) {
              setClock(_0x50aabe.setClock);
            }
            if ("hideClock" in _0x50aabe) {
              hideClock();
            }
            if ("showClock" in _0x50aabe) {
              showClock();
            }
            if ("startClock" in _0x50aabe) {
              startClock();
            }
            if ("pauseClock" in _0x50aabe) {
              pauseClock();
            }
            if ('showTime' in _0x50aabe) {
              if (_0x11d35d.showTime !== false) {
                if (_0x50aabe.showTime && !_0x11d35d.showTime) {
                  toggleClock(_0x50aabe.clock24 || false);
                } else if (!_0x50aabe.showTime && _0x11d35d.showTime) {
                  toggleClock(_0x50aabe.clock24 || false);
                }
              }
            }
            if ('requestUpload' in _0x50aabe) {
              toggleFileshare(_0x450e25);
            }
            if ('group' in _0x50aabe) {
              try {
                if (_0x1e0d5f) {
                  if (_0x50aabe.group) {
                    _0x11d35d.group_alt = _0x50aabe.group.split(',');
                  } else {
                    _0x11d35d.group_alt = [];
                  }
                  _0x11d35d.sendMessage({
                    'group': _0x50aabe.group,
                    'altUUID': true
                  });
                } else {
                  if (_0x50aabe.group) {
                    _0x11d35d.group = _0x50aabe.group.split(',');
                  } else {
                    _0x11d35d.group = [];
                  }
                  _0x11d35d.sendMessage({
                    'group': _0x50aabe.group
                  });
                }
                updateMixer();
                pokeIframeAPI('group-set-updated', _0x11d35d.group);
              } catch (_0x1868a8) {}
            }
            if ("changeLabel" in _0x50aabe) {
              if ("value" in _0x50aabe) {
                if (typeof _0x50aabe.value == "string") {
                  _0x11d35d.label = sanitizeLabel(_0x50aabe.value);
                  log("New Label: " + _0x11d35d.label);
                  if (_0x11d35d.director) {
                    var _0x19d3a4 = getById("label_" + _0x450e25);
                    if (_0x11d35d.label) {
                      _0x19d3a4.innerText = _0x11d35d.label;
                      _0x19d3a4.classList.remove("addALabel");
                    } else if (_0x11d35d.directorUUID === (_0x1e0d5f || _0x450e25)) {
                      miniTranslate(_0x19d3a4.innerHTML, "main-director");
                      _0x19d3a4.classList.remove("addALabel");
                    } else {
                      miniTranslate(_0x19d3a4.innerHTML, 'add-a-label');
                      _0x19d3a4.classList.add("addALabel");
                    }
                  } else if (_0x11d35d.showlabels) {
                    updateMixer();
                  }
                  if (!_0x11d35d.director) {
                    if (_0x11d35d.label) {
                      document.title = _0x11d35d.label;
                    } else {
                      document.title = location.hostname;
                    }
                  }
                  var _0x350fa8 = encodeURIComponent(_0x11d35d.label);
                  if (urlParams.has('l')) {
                    updateURL('l=' + _0x350fa8, true, false);
                  } else {
                    updateURL("label=" + _0x350fa8, true, false);
                  }
                  var _0x5f3873 = {};
                  _0x5f3873.changeLabel = true;
                  _0x5f3873.value = _0x11d35d.label;
                  _0x11d35d.sendMessage(_0x5f3873);
                } else {
                  _0x11d35d.label = false;
                  var _0x5f3873 = {};
                  _0x5f3873.changeLabel = true;
                  _0x5f3873.value = _0x11d35d.label;
                  _0x11d35d.sendMessage(_0x5f3873);
                  if (_0x11d35d.director) {
                    var _0x19d3a4 = getById("label_" + _0x450e25);
                    if (_0x11d35d.directorUUID === (_0x1e0d5f || _0x450e25)) {
                      miniTranslate(_0x19d3a4.innerHTML, "main-director");
                      _0x19d3a4.classList.remove("addALabel");
                    } else {
                      miniTranslate(_0x19d3a4.innerHTML, 'add-a-label');
                      _0x19d3a4.classList.add("addALabel");
                    }
                  } else if (_0x11d35d.showlabels) {
                    document.title = location.hostname;
                    updateMixer();
                  } else {
                    document.title = location.hostname;
                  }
                }
              }
            }
            if ('requestChangeEQ' in _0x50aabe) {
              if (_0x50aabe.keyname == 'low') {
                changeLowEQ(parseFloat(_0x50aabe.value), _0x50aabe.track);
              } else {
                if (_0x50aabe.keyname == "mid") {
                  changeMidEQ(parseFloat(_0x50aabe.value), _0x50aabe.track);
                } else if (_0x50aabe.keyname == "high") {
                  changeHighEQ(parseFloat(_0x50aabe.value), _0x50aabe.track);
                }
              }
            }
            if ("requestChangeGating" in _0x50aabe) {
              var _0x29138c = _0x11d35d.noisegate;
              if (_0x50aabe.value === "false") {
                _0x11d35d.noisegate = false;
                log("noise gate off");
              } else if (_0x50aabe.value === "true") {
                _0x11d35d.noisegate = true;
                log("noise gate on");
              } else {
                _0x11d35d.noisegate = _0x50aabe.value;
              }
              if (_0x11d35d.noisegate !== _0x29138c) {
                senderAudioUpdate();
              }
            }
            if ("requestChangeCompressor" in _0x50aabe) {
              var _0x29138c = _0x11d35d.compressor;
              if (_0x50aabe.value === 'false') {
                _0x11d35d.compressor = false;
                log("noise gate off");
              } else {
                if (_0x50aabe.value === '1') {
                  _0x11d35d.compressor = 0x1;
                  log("noise gate on");
                } else if (_0x50aabe.value === '2') {
                  _0x11d35d.compressor = 0x2;
                  log("noise gate on");
                } else {
                  _0x11d35d.compressor = parseInt(_0x50aabe.value) || false;
                }
              }
              if (_0x11d35d.compressor !== _0x29138c) {
                senderAudioUpdate();
              }
            }
            if ("requestChangeMicDelay" in _0x50aabe) {
              if (_0x11d35d.micDelay === false) {
                _0x11d35d.micDelay = parseInt(_0x50aabe.value) || 0x0;
                senderAudioUpdate();
              } else {
                _0x11d35d.micDelay = parseInt(_0x50aabe.value) || 0x0;
                changeMicDelay(_0x11d35d.micDelay, _0x50aabe.deviceId);
              }
            }
            if ("requestChangeSubGain" in _0x50aabe) {
              changeSubGain(parseFloat(_0x50aabe.value), _0x50aabe.deviceId);
            }
            if ('lowerhand' in _0x50aabe) {
              if (_0x11d35d.raisehands) {
                lowerhand();
              }
            }
            if ("mirrorGuestState" in _0x50aabe && 'mirrorGuestTarget' in _0x50aabe) {
              if (_0x50aabe.mirrorGuestTarget && _0x50aabe.mirrorGuestTarget === true) {
                _0x11d35d.permaMirrored = _0x50aabe.mirrorGuestState;
                applyMirror(_0x11d35d.mirrorExclude);
              } else if (_0x50aabe.mirrorGuestTarget && _0x50aabe.mirrorGuestTarget in _0x11d35d.rpcs) {
                _0x11d35d.rpcs[_0x50aabe.mirrorGuestTarget].mirrorState = _0x50aabe.mirrorGuestState;
                if (_0x11d35d.rpcs[_0x50aabe.mirrorGuestTarget].videoElement) {
                  applyMirrorGuest(_0x50aabe.mirrorGuestState, _0x11d35d.rpcs[_0x50aabe.mirrorGuestTarget].videoElement);
                }
              }
            }
            if ('getAudioSettings' in _0x50aabe) {
              var _0x5f3873 = {};
              _0x5f3873.UUID = _0x450e25;
              _0x5f3873.audioOptions = listAudioSettingsPrep();
              sendMediaDevices(_0x5f3873.UUID);
              _0x11d35d.sendMessage(_0x5f3873, _0x5f3873.UUID);
            }
            if ("getVideoSettings" in _0x50aabe) {
              var _0x5f3873 = {};
              _0x5f3873.UUID = _0x450e25;
              _0x5f3873.videoOptions = listVideoSettingsPrep();
              sendMediaDevices(_0x5f3873.UUID);
              _0x11d35d.sendMessage(_0x5f3873, _0x5f3873.UUID);
            }
            if ("changeSpeaker" in _0x50aabe) {
              changeAudioOutputDeviceById(_0x50aabe.changeSpeaker, _0x450e25);
            }
            if ("changeMicrophone" in _0x50aabe) {
              changeAudioDeviceById(_0x50aabe.changeMicrophone, _0x450e25);
            }
            if ('changeCamera' in _0x50aabe) {
              changeVideoDeviceById(_0x50aabe.changeCamera, _0x450e25);
            }
            if ('requestChangeLowcut' in _0x50aabe) {
              changeLowCut(parseFloat(_0x50aabe.value), _0x50aabe.track);
            }
            if ("requestChangeLowcut" in _0x50aabe) {
              changeLowCut(parseFloat(_0x50aabe.value), _0x50aabe.track);
            }
            if ("hangup" in _0x50aabe) {
              if (_0x11d35d.directorUUID) {
                _0x11d35d.hangup();
              }
            }
            if ('mute' in _0x50aabe) {}
            if ("volume" in _0x50aabe) {
              var _0x1381be = parseInt(_0x50aabe.volume) / 0x64 || 0x0;
              _0x11d35d.audioGain = parseInt(_0x50aabe.volume) || 0x0;
              try {
                for (var _0x56788c in _0x11d35d.webAudios) {
                  log("Adjusting Gain; only track 0 in all likely hood, unless more than track 0 support is added.");
                  _0x11d35d.webAudios[_0x56788c].gainNode.gain.setValueAtTime(_0x1381be, _0x11d35d.webAudios[_0x56788c].audioContext.currentTime);
                }
              } catch (_0x7da90c) {}
              updateVolume(true);
            }
            if ('micIsolate' in _0x50aabe) {
              if (_0x50aabe.micIsolate) {
                if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0) {
                  _0x11d35d.micIsolated.push(_0x450e25);
                  _0x11d35d.applyIsolatedChat();
                }
              } else {
                var _0x31b7de = _0x11d35d.micIsolated.indexOf(_0x450e25);
                if (_0x31b7de > -0x1) {
                  _0x11d35d.micIsolated.splice(_0x31b7de, 0x1);
                  _0x11d35d.applyIsolatedChat();
                }
              }
            }
            if ("lowerVolume" in _0x50aabe) {
              if (_0x50aabe.lowerVolume) {
                if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0) {
                  _0x11d35d.lowerVolume.push(_0x450e25);
                  _0x11d35d.applyIsolatedVolume();
                }
              } else {
                var _0x31b7de = _0x11d35d.lowerVolume.indexOf(_0x450e25);
                if (_0x31b7de > -0x1) {
                  _0x11d35d.lowerVolume.splice(_0x31b7de, 0x1);
                  _0x11d35d.applyIsolatedVolume();
                }
              }
            }
            if ("speakerMute" in _0x50aabe) {
              if (_0x50aabe.speakerMute) {
                _0x11d35d.directorSpeakerMuted = true;
                _0x11d35d.directorSpeakerMute();
              } else {
                _0x11d35d.directorSpeakerMuted = false;
                _0x11d35d.directorSpeakerMute();
              }
            }
            if ("displayMute" in _0x50aabe) {
              if (_0x50aabe.displayMute) {
                _0x11d35d.directorDisplayMuted = true;
                _0x11d35d.directorDisplayMute();
              } else {
                _0x11d35d.directorDisplayMuted = false;
                _0x11d35d.directorDisplayMute();
              }
            }
            if ("remoteVideoMuted" in _0x50aabe) {
              _0x11d35d.remoteVideoMuted = _0x50aabe.remoteVideoMuted;
              toggleVideoMute(true);
              if (!_0x11d35d.videoMuted) {
                var _0x5f3873 = {};
                _0x5f3873.videoMuted = _0x11d35d.remoteVideoMuted;
                _0x11d35d.sendMessage(_0x5f3873);
              }
            }
            if ("changeParams" in _0x50aabe) {
              applyNewParams(_0x50aabe.changeParams);
            }
          }
          if (_0x11d35d.directorUUID === (_0x1e0d5f || _0x450e25)) {
            if (_0x50aabe.request === "migrate") {
              warnlog("TRANSFERRING?");
              if ('transferSettings' in _0x50aabe) {
                if ("roomenc" in _0x50aabe.transferSettings) {
                  _0x11d35d.roomenc = _0x50aabe.roomenc;
                }
                if ("broadcast" in _0x50aabe.transferSettings) {
                  if (_0x50aabe.transferSettings.broadcast === true || _0x50aabe.transferSettings.broadcast === null) {
                    _0x11d35d.broadcast = null;
                    if (_0x11d35d.minipreview === false) {
                      _0x11d35d.minipreview = 0x2;
                    }
                    if (_0x11d35d.style === false) {
                      _0x11d35d.style = 0x1;
                    }
                    if (_0x11d35d.showList === null) {
                      _0x11d35d.showList = true;
                    }
                  } else {
                    _0x11d35d.broadcast = _0x50aabe.transferSettings.broadcast;
                  }
                  if (_0x50aabe.transferSettings.updateurl) {
                    if (_0x11d35d.broadcast !== false) {
                      if (_0x11d35d.broadcast === null) {
                        updateURL("broadcast", true);
                      } else {
                        updateURL("broadcast=" + _0x11d35d.broadcast, true);
                      }
                    } else {
                      updateURL("broadcast=false", true);
                    }
                  }
                }
                if ("roomid" in _0x50aabe.transferSettings) {
                  _0x11d35d.roomid = _0x50aabe.transferSettings.roomid;
                  if (_0x50aabe.transferSettings.updateurl) {
                    updateURL("room=" + _0x11d35d.roomid, true);
                  }
                }
                if ('queue' in _0x50aabe.transferSettings) {
                  _0x11d35d.queue = _0x50aabe.transferSettings.queue;
                  if (_0x11d35d.queue) {
                    _0x11d35d.queue = 0x2;
                  }
                  if (_0x50aabe.transferSettings.updateurl) {
                    if (_0x11d35d.queue) {
                      updateURL("queue", true);
                    } else {
                      updateURL("queue=false", true);
                    }
                  }
                }
                if ("justResetting" in _0x50aabe.transferSettings) {
                  if (_0x11d35d.queue) {
                    _0x11d35d.queue = 0x3;
                    if (_0x50aabe.transferSettings.updateurl) {
                      updateURL("queue=false", true);
                    }
                  }
                }
              }
            }
            try {
              if ("directorSettings" in _0x50aabe && "addCoDirector" in _0x50aabe.directorSettings) {
                for (var _0x296a02 = 0x0; _0x296a02 < _0x50aabe.directorSettings.addCoDirector.length; _0x296a02++) {
                  if (!_0x11d35d.directorList.includes(_0x50aabe.directorSettings.addCoDirector[_0x296a02].toString)) {
                    _0x11d35d.directorList.push(_0x50aabe.directorSettings.addCoDirector[_0x296a02].toString());
                    var _0x382442 = getById("container_" + _0x50aabe.directorSettings.addCoDirector[_0x296a02].toString());
                    if (_0x382442) {
                      _0x382442.classList.add("directorBlue");
                    }
                  }
                }
              }
            } catch (_0x564976) {
              errorlog(_0x564976);
            }
            if ('cbid' in _0x50aabe) {
              try {
                _0x11d35d.sendMessage({
                  'cbid': _0x50aabe.cbid
                }, _0x450e25);
              } catch (_0x209091) {
                errorlog(_0x209091);
              }
            }
          }
          if ("requestVideoHack" in _0x50aabe) {
            if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0 || _0x11d35d.remote === true || _0x11d35d.remote && "remote" in _0x50aabe && _0x50aabe.remote === _0x11d35d.remote) {
              if ("ctrl" in _0x50aabe && _0x50aabe.ctrl) {
                updateCameraConstraints(_0x50aabe.keyname, _0x50aabe.value, true, _0x450e25);
              } else {
                updateCameraConstraints(_0x50aabe.keyname, _0x50aabe.value, false, false);
              }
            } else {
              return;
            }
          }
          if ("zoom" in _0x50aabe) {
            if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0 || _0x11d35d.remote === true || _0x11d35d.remote && 'remote' in _0x50aabe && _0x50aabe.remote === _0x11d35d.remote) {
              _0x11d35d.remoteZoom(parseFloat(_0x50aabe.zoom));
            } else {
              return;
            }
          }
          if ("focus" in _0x50aabe) {
            if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0 || _0x11d35d.remote === true || _0x11d35d.remote && "remote" in _0x50aabe && _0x50aabe.remote === _0x11d35d.remote) {
              _0x11d35d.remoteFocus(parseFloat(_0x50aabe.focus));
            } else {
              return;
            }
          }
          if ("pan" in _0x50aabe) {
            if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0 || _0x11d35d.remote === true || _0x11d35d.remote && "remote" in _0x50aabe && _0x50aabe.remote === _0x11d35d.remote) {
              _0x11d35d.remotePan(parseFloat(_0x50aabe.pan));
            } else {
              return;
            }
          }
          if ("tilt" in _0x50aabe) {
            if (_0x11d35d.directorList.indexOf(_0x1e0d5f || _0x450e25) >= 0x0 || _0x11d35d.remote === true || _0x11d35d.remote && 'remote' in _0x50aabe && _0x50aabe.remote === _0x11d35d.remote) {
              _0x11d35d.remoteTilt(parseFloat(_0x50aabe.tilt));
            } else {
              return;
            }
          }
          if ("requestFile" in _0x50aabe) {
            log("requestFile");
            try {
              _0x11d35d.sendFile(_0x450e25, _0x50aabe.requestFile);
            } catch (_0x103d9f) {
              errorlog(_0x103d9f);
            }
          }
          if ("midi" in _0x50aabe) {
            playbackMIDI(_0x50aabe.midi, true);
          }
        } catch (_0xd79269) {
          errorlog(_0xd79269);
        }
        if ("rejected" in _0x50aabe) {
          if (_0x50aabe.rejected == "obsCommand") {
            if (_0x11d35d.remote) {
              warnUser(getTranslation("invalid-remote-code"), 0xbb8);
            } else if (document.querySelector("#obsRemotePassword>input") && document.querySelector("#obsRemotePassword>input").value) {
              warnUser(getTranslation("invalid-remote-code-obs"), 0x1b58);
            } else {
              warnUser(getTranslation('request-rejected-obs'), 0x2710);
            }
            getById("obsRemotePassword").classList.remove('hidden');
          } else {
            if (_0x11d35d.director) {
              if (!_0x11d35d.cleanOutput) {
                warnUser("The request (" + _0x50aabe.rejected + ") failed due to permissions or it was rejected by the user", 0x1388);
              }
            } else if (!_0x11d35d.cleanOutput) {
              if (_0x11d35d.remote) {
                warnUser("remote-token-rejected", 0x1388);
              } else {
                warnUser("remote-control-failed", 0x1388);
              }
            }
          }
          errorlog("ACTION REJECTED: " + _0x50aabe.rejected + ", isDirector: " + _0x11d35d.director);
          pokeIframeAPI("rejected", _0x50aabe.rejected, _0x450e25);
          return;
        } else {
          if ("approved" in _0x50aabe) {
            log("approved: " + _0x50aabe.approved);
            pokeIframeAPI("approved", _0x50aabe.approved, _0x450e25);
            return;
          }
        }
        if ("audio" in _0x50aabe || "video" in _0x50aabe) {
          log("ASKING FOR AUDIO AND VIDEO?");
          if (_0x50aabe.audio) {
            _0x11d35d.pcs[_0x450e25].allowAudio = true;
          }
          if (_0x11d35d.webp && "allowwebp" in _0x50aabe && _0x50aabe.allowwebp !== false) {
            _0x11d35d.pcs[_0x450e25].allowWebp = _0x50aabe.allowwebp;
            _0x11d35d.pcs[_0x450e25].allowVideo = false;
            setTimeout(function () {
              makeImages(true);
            }, 0x3e8);
          } else if (_0x50aabe.video) {
            _0x11d35d.pcs[_0x450e25].allowVideo = true;
          }
          if ("broadcast" in _0x50aabe && _0x50aabe.broadcast !== false) {
            _0x11d35d.pcs[_0x450e25].allowBroadcast = _0x50aabe.broadcast;
          }
          if ("allowchunked" in _0x50aabe && _0x50aabe.allowchunked !== false) {
            _0x11d35d.pcs[_0x450e25].allowChunked = _0x50aabe.allowchunked;
          }
          if ("iframe" in _0x50aabe && _0x50aabe.iframe !== false) {
            _0x11d35d.pcs[_0x450e25].allowIframe = _0x50aabe.iframe;
          }
          if ('widget' in _0x50aabe && _0x50aabe.widget !== false) {
            _0x11d35d.pcs[_0x450e25].allowWidget = _0x50aabe.widget;
          }
          if ('allowmidi' in _0x50aabe && _0x50aabe.allowmidi !== false) {
            _0x11d35d.pcs[_0x450e25].allowMIDI = _0x50aabe.allowmidi;
          }
          if ("downloads" in _0x50aabe && _0x50aabe.downloads !== false) {
            _0x11d35d.pcs[_0x450e25].allowDownloads = _0x50aabe.downloads;
          }
          if ('allowscreen' in _0x50aabe && _0x50aabe.allowscreen !== false) {
            _0x11d35d.pcs[_0x450e25].allowScreenAudio = true;
            _0x11d35d.pcs[_0x450e25].allowScreenVideo = true;
          }
          if ("allowscreenvideo" in _0x50aabe && _0x50aabe.allowscreenvideo !== false) {
            _0x11d35d.pcs[_0x450e25].allowScreenVideo = true;
          }
          if ("allowscreenaudio" in _0x50aabe && _0x50aabe.allowscreenaudio !== false) {
            _0x11d35d.pcs[_0x450e25].allowScreenAudio = true;
          }
          if ("preferVideoCodec" in _0x50aabe && _0x50aabe.preferVideoCodec !== false) {
            _0x11d35d.pcs[_0x450e25].preferVideoCodec = _0x50aabe.preferVideoCodec.toLowerCase();
          }
          if (_0x11d35d.preferAudioCodec) {
            _0x11d35d.pcs[_0x450e25].preferAudioCodec = _0x11d35d.preferAudioCodec;
          } else if ("preferAudioCodec" in _0x50aabe && _0x50aabe.preferAudioCodec !== false) {
            _0x11d35d.pcs[_0x450e25].preferAudioCodec = _0x50aabe.preferAudioCodec.toLowerCase();
          }
          if ("allowmeshcast" in _0x50aabe && _0x50aabe.allowmeshcast === false) {
            _0x11d35d.pcs[_0x450e25].whipout = false;
          } else {
            if ("allowwhipout" in _0x50aabe && _0x50aabe.allowwhipout === false) {
              _0x11d35d.pcs[_0x450e25].whipout = false;
            } else {
              if (_0x11d35d.meshcast) {
                if (_0x11d35d.meshcast == "video") {
                  _0x11d35d.pcs[_0x450e25].allowVideo = false;
                } else {
                  if (_0x11d35d.meshcast == 'audio') {
                    _0x11d35d.pcs[_0x450e25].allowAudio = false;
                  } else if (_0x11d35d.pcs[_0x450e25].allowVideo == false) {
                    _0x11d35d.pcs[_0x450e25].whipout = false;
                  } else {
                    _0x11d35d.pcs[_0x450e25].allowAudio = false;
                    _0x11d35d.pcs[_0x450e25].allowVideo = false;
                  }
                }
              } else if (_0x11d35d.whipOutput) {
                _0x11d35d.pcs[_0x450e25].allowAudio = false;
                _0x11d35d.pcs[_0x450e25].allowVideo = false;
              }
            }
          }
          if (_0x11d35d.promptAccess) {
            window.focus();
            if (_0x11d35d.beepToNotify) {
              playtone();
            }
            var _0x2df02f = false;
            if (_0x450e25 in _0x11d35d.rpcs && _0x11d35d.rpcs[_0x450e25].label) {
              _0x2df02f = _0x11d35d.rpcs[_0x450e25].label || _0x11d35d.rpcs[_0x450e25].streamID || false;
            }
            _0x2df02f = _0x11d35d.pcs[_0x450e25].label || _0x2df02f || _0x11d35d.pcs[_0x450e25].streamID || _0x450e25 || "Someone";
            var _0x1d061b = await confirmAlt(_0x2df02f + getTranslation("prompt-access-request"), true);
            if (!_0x1d061b) {
              try {
                log("closing 13");
                _0x11d35d.closePC(_0x450e25);
              } catch (_0x4e39bc) {}
              return;
            }
          }
          if ("guest" in _0x50aabe) {
            if (_0x50aabe.guest == true) {
              _0x11d35d.pcs[_0x450e25].guest = true;
              if (_0x11d35d.beepToNotify) {
                playtone(false, "jointone");
                showNotification("A Guest joined the room", '');
              }
              pokeIframeAPI("guest-connected", _0x50aabe.director, _0x450e25);
            }
          }
          if ("forceios" in _0x50aabe) {
            if (_0x50aabe.forceios === true) {
              _0x11d35d.pcs[_0x450e25].forceios = true;
            }
          }
          if ("remote" in _0x50aabe) {
            _0x11d35d.pcs[_0x450e25].remote = _0x50aabe.remote;
          }
          if ('limitaudio' in _0x50aabe) {
            if (_0x50aabe.limitaudio == true) {
              _0x11d35d.pcs[_0x450e25].limitAudio = true;
            }
          }
          if ("enhanceaudio" in _0x50aabe) {
            if (_0x50aabe.enhanceaudio == true) {
              _0x11d35d.pcs[_0x450e25].enhanceAudio = true;
            }
          }
          if (_0x50aabe.degrade) {
            _0x11d35d.pcs[_0x450e25].degradationPreference = _0x50aabe.degrade;
          }
          if ('keyframeRate' in _0x50aabe) {
            try {
              _0x11d35d.pcs[_0x450e25].keyframeRate = _0x50aabe.keyframeRate;
              if (_0x11d35d.pcs[_0x450e25].keyframeRate) {
                setTimeout(function (_0x4ee780) {
                  _0x11d35d.forcePLI(_0x4ee780);
                }, 0x1388, _0x450e25);
              }
            } catch (_0x51daf5) {
              warnlog(_0x51daf5);
            }
          }
          if ("solo" in _0x50aabe) {
            _0x11d35d.pcs[_0x450e25].solo = _0x50aabe.solo;
          }
          if ('layout' in _0x50aabe) {
            if (!_0x11d35d.pcs[_0x450e25].layout) {
              _0x11d35d.pcs[_0x450e25].layout = _0x50aabe.layout;
              if (_0x11d35d.slotmode && _0x11d35d.director && _0x11d35d.pcs[_0x450e25] && _0x11d35d.pcs[_0x450e25].layout) {
                createSlotUpdate(_0x450e25);
              }
            }
          }
          if ("scene" in _0x50aabe) {
            if (_0x50aabe.scene !== false) {
              try {
                if (typeof _0x50aabe.scene === "string") {
                  _0x11d35d.pcs[_0x450e25].scene = _0x50aabe.scene.replace(/[\W]+/g, '_');
                } else {
                  _0x11d35d.pcs[_0x450e25].scene = (parseInt(_0x50aabe.scene) || 0x0) + '';
                }
                _0x11d35d.pcs[_0x450e25].stats.scene = _0x11d35d.pcs[_0x450e25].scene;
                updateSceneList(_0x11d35d.pcs[_0x450e25].scene);
              } catch (_0x10ee0c) {
                errorlog(_0x10ee0c);
              }
              if ('showDirector' in _0x50aabe) {
                _0x11d35d.pcs[_0x450e25].showDirector = _0x50aabe.showDirector;
              } else {
                _0x11d35d.pcs[_0x450e25].showDirector = _0x11d35d.showDirector;
              }
              if (_0x11d35d.director) {
                if (_0x11d35d.pcs[_0x450e25].showDirector == false) {
                  _0x11d35d.pcs[_0x450e25].allowAudio = false;
                  _0x11d35d.pcs[_0x450e25].allowVideo = false;
                  _0x11d35d.pcs[_0x450e25].allowIframe = false;
                  _0x11d35d.pcs[_0x450e25].allowWidget = false;
                  _0x11d35d.pcs[_0x450e25].whipout = false;
                  _0x11d35d.pcs[_0x450e25].allowWebp = false;
                  _0x11d35d.pcs[_0x450e25].allowScreenAudio = false;
                  _0x11d35d.pcs[_0x450e25].allowScreenVideo = false;
                } else {
                  if (_0x11d35d.pcs[_0x450e25].showDirector == 0x1) {
                    _0x11d35d.pcs[_0x450e25].allowIframe = false;
                    _0x11d35d.pcs[_0x450e25].allowWidget = false;
                  } else {
                    if (_0x11d35d.pcs[_0x450e25].showDirector == 0x2) {
                      _0x11d35d.pcs[_0x450e25].allowAudio = false;
                      _0x11d35d.pcs[_0x450e25].allowScreenAudio = false;
                      _0x11d35d.pcs[_0x450e25].allowIframe = false;
                      _0x11d35d.pcs[_0x450e25].allowWidget = false;
                    } else {
                      if (_0x11d35d.pcs[_0x450e25].showDirector == 0x3) {
                        _0x11d35d.pcs[_0x450e25].allowAudio = false;
                        _0x11d35d.pcs[_0x450e25].allowVideo = false;
                        _0x11d35d.pcs[_0x450e25].allowIframe = false;
                        _0x11d35d.pcs[_0x450e25].allowWidget = false;
                        _0x11d35d.pcs[_0x450e25].whipout = false;
                        _0x11d35d.pcs[_0x450e25].allowWebp = false;
                      } else {
                        if (_0x11d35d.pcs[_0x450e25].showDirector == 0x4) {}
                      }
                    }
                  }
                }
              }
              if (_0x11d35d.pcs[_0x450e25].solo) {
                pokeIframeAPI("solo-scene-connected", _0x50aabe.scene, _0x450e25);
              } else {
                pokeIframeAPI('scene-connected', _0x50aabe.scene, _0x450e25);
              }
            }
            _0x11d35d.initialDirectorSync(_0x450e25);
          } else if (_0x50aabe.director) {
            if (iOS || iPad) {
              if (_0x11d35d.pcs[_0x450e25].forceios == true) {
                _0x11d35d.pcs[_0x450e25].guest = true;
              }
            }
            if (_0x11d35d.beepToNotify) {
              playtone(false, "jointone");
              showNotification("A director joined the room", "Trying to join at least");
            }
            _0x11d35d.initialDirectorSync(_0x450e25);
            pokeIframeAPI('director-connected', _0x50aabe.director, _0x450e25);
          }
          if (_0x11d35d.director) {
            if ("hidedirector" in _0x50aabe) {
              if (_0x50aabe.hidedirector == true) {
                _0x11d35d.pcs[_0x450e25].allowAudio = false;
                _0x11d35d.pcs[_0x450e25].allowVideo = false;
                _0x11d35d.pcs[_0x450e25].allowIframe = false;
                _0x11d35d.pcs[_0x450e25].allowWidget = false;
                _0x11d35d.pcs[_0x450e25].whipout = false;
                _0x11d35d.pcs[_0x450e25].allowWebp = false;
                _0x11d35d.pcs[_0x450e25].allowScreenAudio = false;
                _0x11d35d.pcs[_0x450e25].allowScreenVideo = false;
              }
            }
            _0x11d35d.initialPublish(_0x450e25);
          } else if (_0x11d35d.queue && _0x11d35d.queueType == 0x3 && !_0x11d35d.director) {
            _0x11d35d.pcs[_0x450e25].needsPublishing = true;
          } else {
            _0x11d35d.initialPublish(_0x450e25);
          }
        }
      };
      _0x11d35d.initialDirectorSync = function (_0x25b043) {
        if (!(_0x11d35d.directorState || _0x11d35d.scene)) {
          return;
        }
        try {
          var _0x5d3d0b = {};
          if (_0x11d35d.pcs[_0x25b043]) {
            _0x5d3d0b.directorSettings = getDirectorSettings(_0x11d35d.pcs[_0x25b043].scene);
          }
          log("TRYING TO SYNC WITH SENDING: " + _0x25b043);
          var _0x462f19 = false;
          if (_0x11d35d.alreadyJoinedMembers) {
            _0x11d35d.alreadyJoinedMembers.forEach(_0x4eba55 => {
              if (_0x4eba55.UUID === _0x25b043) {
                _0x462f19 = true;
              }
            });
          }
          if (!_0x462f19) {
            _0x5d3d0b.directorState = getDetailedState();
          } else {
            warnlog("this unverified director was already connected; not going to send my director state to them");
          }
          if (Object.keys(_0x5d3d0b).length) {
            _0x11d35d.sendPeers(_0x5d3d0b, _0x25b043);
          }
        } catch (_0x4d0fcd) {}
      };
      _0x11d35d.initialPublish = function (_0x83ceba) {
        log("INITIAL PUBLISH START: " + _0x83ceba);
        if (_0x83ceba in _0x11d35d.pcs) {
          _0x11d35d.pcs[_0x83ceba].needsPublishing = false;
        } else {
          errorlog("UUID not found in pcs");
          return;
        }
        if (getSenders2(_0x83ceba).length) {
          errorlog("PROBLEM, Senders is more than 0: " + getSenders2(_0x83ceba).length);
        }
        if (_0x11d35d.pcs[_0x83ceba].allowIframe === true) {
          if (_0x11d35d.iframeSrc) {
            var _0x42d2c0 = {};
            _0x42d2c0.iframeSrc = _0x11d35d.iframeSrc;
            if (_0x11d35d.iframeEle && _0x11d35d.iframeEle.sendOnNewConnect) {
              if (_0x11d35d.iframeSrc.startsWith('https://www.youtube.com/')) {
                _0x42d2c0.iframeSrc += "&start=" + parseInt(Math.ceil(_0x11d35d.iframeEle.sendOnNewConnect.ifs.t)) + '';
              }
            }
            _0x11d35d.sendMessage(_0x42d2c0, _0x83ceba);
          }
        }
        if (_0x11d35d.pcs[_0x83ceba].allowWidget === true) {
          if (_0x11d35d.widget && _0x11d35d.director) {
            var _0x42d2c0 = {};
            _0x42d2c0.widgetSrc = _0x11d35d.widget;
            _0x11d35d.sendMessage(_0x42d2c0, _0x83ceba);
          }
        }
        if (_0x11d35d.pcs[_0x83ceba].allowDownloads === true) {
          _0x11d35d.provideFileList(_0x83ceba);
        }
        if (_0x11d35d.chunked && _0x11d35d.pcs[_0x83ceba].allowChunked) {
          _0x11d35d.chunkedStream(_0x83ceba);
          return;
        }
        var _0xd14b1 = _0x11d35d.getLocalStream();
        log("Does Local Stream Source EXIST?");
        log(_0xd14b1.getTracks());
        if (_0x11d35d.whipoutSettings && _0x11d35d.pcs[_0x83ceba].whipout === null) {
          _0x11d35d.pcs[_0x83ceba].whipout = true;
          var _0x42d2c0 = {};
          _0x42d2c0.whepSettings = _0x11d35d.whipoutSettings;
          _0x11d35d.sendMessage(_0x42d2c0, _0x83ceba);
          warnlog(_0x42d2c0);
        }
        if (_0x11d35d.pcs[_0x83ceba].allowScreenVideo || _0x11d35d.pcs[_0x83ceba].allowScreenAudio) {
          createSecondStream2(_0x83ceba);
        }
        var _0x482f25 = false;
        _0xd14b1.getVideoTracks().forEach(async _0x595caf => {
          try {
            if (_0x11d35d.pcs[_0x83ceba].allowVideo === true) {
              if (_0x595caf.kind == "video") {
                if (_0x11d35d.pcs[_0x83ceba].guest === true && _0x11d35d.roombitrate === 0x0) {
                  log("room rate restriction detected. No videos will be published to other guests");
                } else {
                  let _0x5b79c8 = _0x11d35d.pcs[_0x83ceba].addTrack(_0x595caf, _0xd14b1);
                  if (_0x5b79c8 && _0x11d35d.encodedInsertableStreams) {
                    try {
                      setupSenderTransform(_0x5b79c8, _0x83ceba);
                    } catch (_0x2411b7) {
                      errorlog(_0x2411b7);
                    }
                  }
                  warnlog("added video track");
                  _0x482f25 = true;
                  setTimeout(function (_0x2bb4f9) {
                    try {
                      _0x11d35d.optimizeBitrate(_0x2bb4f9);
                    } catch (_0x2346cd) {
                      warnlog(_0x2346cd);
                    }
                  }, _0x11d35d.rampUpTime, _0x83ceba);
                }
              }
            }
          } catch (_0x26c2cf) {
            errorlog(_0x26c2cf);
          }
        });
        if (_0x11d35d.mixMinus) {
          _0xd14b1 = mixMinusAudio(_0x83ceba);
        }
        if (_0x11d35d.pcs[_0x83ceba].allowAudio) {
          _0xd14b1.getAudioTracks().forEach(_0x1db985 => {
            try {
              if (_0x1db985.kind == "audio") {
                _0x11d35d.pcs[_0x83ceba].addTrack(_0x1db985, _0xd14b1);
                warnlog("added audio track");
              }
            } catch (_0x427b5d) {
              errorlog(_0x427b5d);
            }
          });
          log("does any audio exist?");
          if (_0xd14b1.getAudioTracks().length) {
            if (_0x11d35d.director !== false) {
              _0x11d35d.applySoloChat();
            }
            log("starting kicker");
            if (_0x11d35d.pcs[_0x83ceba].limitAudio === true) {
              warnlog("limiting AudioEncoder");
              setTimeout(_0x11d35d.limitAudioEncoder, 0x3e8, _0x83ceba, 0x7d00, 0x0);
            }
            if (_0x11d35d.pcs[_0x83ceba].enhanceAudio === true) {
              setTimeout(_0x11d35d.enhanceAudioEncoder, 0x3e8, _0x83ceba);
            }
          }
        }
        if (_0x11d35d.pcs[_0x83ceba].degradationPreference) {
          setTimeout(_0x11d35d.degradationPreference, 0x3e8, _0x83ceba, _0x11d35d.pcs[_0x83ceba].degradationPreference);
        } else {
          if (_0x11d35d.contentHint && SafariVersion) {
            if (_0x11d35d.contentHint == "detail") {
              setTimeout(_0x11d35d.degradationPreference, 0x3e8, _0x83ceba, "maintain-resolution");
            } else if (_0x11d35d.contentHint == "motion") {
              setTimeout(_0x11d35d.degradationPreference, 0x3e8, _0x83ceba, "maintain-framerate");
            }
          }
        }
        if (iOS || iPad) {
          if (SafariVersion && SafariVersion <= 0xd) {} else if (_0x482f25) {
            setTimeout(function (_0x788662) {
              _0x11d35d.setScale(_0x788662, null, true);
            }, 0x7d0, _0x83ceba);
            setTimeout(function (_0x37a59e) {
              var _0x4a2eb8 = _0x11d35d.refreshScale(_0x37a59e);
              if (!_0x4a2eb8) {
                _0x11d35d.setScale(_0x37a59e, 0x64, true);
              }
            }, 0x1388, _0x83ceba);
          }
        } else {
          setTimeout(function (_0x55e3e4) {
            _0x11d35d.refreshScale(_0x55e3e4);
          }, 0x3e8, _0x83ceba);
        }
      };
      _0x11d35d.provideFileList = function (_0x446a07) {
        log('session.provideFileList');
        if (!_0x11d35d.hostedFiles || !_0x11d35d.hostedFiles.length) {
          return;
        }
        var _0x36d874 = {};
        var _0x21a985 = [];
        for (var _0x1e0458 = 0x0; _0x1e0458 < _0x11d35d.hostedFiles.length; _0x1e0458++) {
          if (_0x11d35d.hostedFiles[_0x1e0458].restricted === false || _0x11d35d.hostedFiles[_0x1e0458].restricted === _0x446a07) {
            _0x21a985.push({
              'id': _0x11d35d.hostedFiles[_0x1e0458].id,
              'name': _0x11d35d.hostedFiles[_0x1e0458].name,
              'size': _0x11d35d.hostedFiles[_0x1e0458].size
            });
          }
        }
        _0x36d874.fileList = _0x21a985;
        if (_0x446a07 in _0x11d35d.pcs) {
          _0x11d35d.sendMessage(_0x36d874, _0x446a07);
        } else if (_0x446a07 in _0x11d35d.rpcs) {
          _0x11d35d.sendRequest(_0x36d874, _0x446a07);
        }
        log(_0x36d874);
      };
      _0x11d35d.pcs[_0x342ef3].oniceconnectionstatechange = function (_0x59260c) {
        if (!(_0x342ef3 in _0x11d35d.pcs)) {
          return;
        }
        try {
          if (this.iceConnectionState === "closed") {
            log("ICE closed?");
          } else {
            if (this.iceConnectionState === "disconnected") {
              log("PCS: ICE Disconnected; wait for retry? pcs");
            } else {
              if (this.iceConnectionState === "failed") {
                log("ICE FAILed. bad?");
              } else if (this.iceConnectionState === 'connected') {
                log("iceConnectionState == connected");
              } else {
                log(this.iceConnectionState);
              }
            }
          }
        } catch (_0x342acb) {
          errorlog(_0x342acb);
        }
      };
      _0x11d35d.pcs[_0x342ef3].onconnectionstatechange = function (_0x17abfe) {
        switch (_0x11d35d.pcs[_0x342ef3].connectionState) {
          case "connected":
            log('CONNECTEED!');
            clearTimeout(_0x11d35d.pcs[_0x342ef3].closeTimeout);
            if (_0x11d35d.security) {
              if (_0x11d35d.ws.readyState !== 0x1) {
                _0x11d35d.ws.close();
                break;
              }
              _0x11d35d.ws.close();
              setTimeout(function () {
                if (_0x11d35d.cleanOutput != true) {
                  warnUser(getTranslation('remote-peer-connected'));
                }
              }, 0x1);
            }
            break;
          case "disconnected":
            log("onconnectionstatechange pcs ice -- disconnected, but not yet closed? ");
            clearTimeout(_0x11d35d.pcs[_0x342ef3].closeTimeout);
            _0x11d35d.pcs[_0x342ef3].closeTimeout = setTimeout(function (_0xa6f86c) {
              if (_0xa6f86c in _0x11d35d.pcs) {
                warnlog(" --- PC TIMED OUT, but still alive. Killing it. via disconnected state");
                _0x11d35d.closePC(_0xa6f86c);
              } else {
                errorlog(" --- PC TIMED OUT and already deleted. shouldn't happen");
              }
            }, 0x2710, _0x342ef3);
            break;
          case "failed":
            warnlog("connection state -> failed; will try ice reconnect or such");
            if (_0x11d35d.pcs[_0x342ef3]) {
              if (_0x11d35d.pcs[_0x342ef3].closeTimeout) {
                log("Close timeout cancelled - ice failed instead");
                clearTimeout(_0x11d35d.pcs[_0x342ef3].closeTimeout);
              }
              if (_0x11d35d.pcs[_0x342ef3].restartIce) {
                log("ice restart real");
                _0x11d35d.pcs[_0x342ef3].restartIce();
              } else {
                log("fake ice restart faked");
                _0x11d35d.createOffer(_0x342ef3, true);
              }
            }
            break;
          case 'closed':
            warnlog("pcs RTC CLOSED");
            log("closing 18");
            _0x11d35d.closePC(_0x342ef3);
            break;
          default:
            log("rtc state: " + _0x11d35d.pcs[_0x342ef3].connectionState);
            clearTimeout(_0x11d35d.pcs[_0x342ef3].closeTimeout);
            break;
        }
      };
      _0x11d35d.pcs[_0x342ef3].onclose = function (_0x233794) {
        warnlog("WebRTC Connection Closed. Clean up. 657");
        log("closing 19");
        _0x11d35d.closePC(_0x342ef3);
      };
      _0x11d35d.pcs[_0x342ef3].onopen = function _0x47b58f() {
        log("WEBRTC CONNECTION OPEN");
      };
    };
    _0x11d35d.processDescription2 = function (_0x32ef3e) {
      if (_0x32ef3e.description.type == "offer") {
        _0x11d35d.setupIncoming(_0x32ef3e);
        _0x11d35d.connectPeer(_0x32ef3e);
      } else {
        try {
          if (!(_0x32ef3e.UUID in _0x11d35d.pcs)) {
            return;
          }
          var _0x336c7b = _0x11d35d.maxvideobitrate;
          if (_0x11d35d.mobile && _0x11d35d.pcs[_0x32ef3e.UUID].guest == true && _0x11d35d.pcs[_0x32ef3e.UUID].forceios == false) {
            if (_0x336c7b === false || _0x336c7b > _0x11d35d.maxMobileBitrate) {
              var _0x2bb709 = Object.keys(_0x11d35d.pcs).length;
              if (_0x11d35d.flagship) {
                _0x336c7b = _0x11d35d.maxMobileBitrate;
              } else {
                if (_0x2bb709 > 0x4) {
                  _0x336c7b = _0x11d35d.lowMobileBitrate;
                } else if ((iOS || iPad) && SafariVersion && SafariVersion <= 0xd) {
                  _0x336c7b = _0x11d35d.lowMobileBitrate;
                } else {
                  _0x336c7b = _0x11d35d.maxMobileBitrate;
                }
              }
            }
            if (iOS || iPad) {
              if (_0x336c7b !== false) {
                if (_0x11d35d.pcs[_0x32ef3e.UUID].savedBitrate === false) {
                  _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate = _0x336c7b;
                  _0x32ef3e.description.sdp = CodecsHandler.preferCodec(_0x32ef3e.description.sdp, 'vp8', _0x11d35d.preferredVideoErrorCorrection);
                  _0x32ef3e.description.sdp = CodecsHandler.setVideoBitrates(_0x32ef3e.description.sdp, {
                    'min': parseInt(_0x336c7b / 0xa) || 0x1,
                    'max': _0x336c7b
                  });
                } else if (_0x11d35d.pcs[_0x32ef3e.UUID].savedBitrate > _0x336c7b) {
                  _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate = _0x336c7b;
                  _0x32ef3e.description.sdp = CodecsHandler.preferCodec(_0x32ef3e.description.sdp, "vp8", _0x11d35d.preferredVideoErrorCorrection);
                  _0x32ef3e.description.sdp = CodecsHandler.setVideoBitrates(_0x32ef3e.description.sdp, {
                    'min': parseInt(_0x336c7b / 0xa) || 0x1,
                    'max': _0x336c7b
                  });
                }
                _0x336c7b = false;
              }
            }
          } else {
            if (_0x11d35d.pcs[_0x32ef3e.UUID].guest == true) {
              if (_0x336c7b !== false) {
                if (_0x11d35d.roombitrate !== false) {
                  if (_0x11d35d.roombitrate < _0x336c7b) {
                    _0x336c7b = _0x11d35d.roombitrate;
                  }
                }
              } else {
                _0x336c7b = _0x11d35d.roombitrate;
              }
              if ((iOS || iPad) && _0x11d35d.pcs[_0x32ef3e.UUID].forceios) {
                _0x11d35d.pcs[_0x32ef3e.UUID].encoder = true;
              }
            } else {
              if (iOS || iPad) {
                var _0x468820 = 0x0;
                for (var _0xfc5b8f in _0x11d35d.pcs) {
                  if (_0x32ef3e.UUID !== _0xfc5b8f) {
                    if (_0x11d35d.pcs[_0xfc5b8f].encoder === true) {
                      _0x468820 += 0x1;
                    }
                  }
                }
                if (_0x468820 >= 0x3) {
                  if (_0x11d35d.pcs[_0x32ef3e.UUID].forceios) {
                    _0x11d35d.pcs[_0x32ef3e.UUID].encoder = true;
                    if (_0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec && _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec === "h264") {
                      _0x32ef3e.description.sdp = CodecsHandler.preferCodec(_0x32ef3e.description.sdp, "h264", _0x11d35d.preferredVideoErrorCorrection);
                      log("Trying to set " + _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec + " as preferred codec by viewer via API");
                    }
                  } else if (_0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec && _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec === "vp9") {
                    _0x32ef3e.description.sdp = CodecsHandler.preferCodec(_0x32ef3e.description.sdp, 'vp9', _0x11d35d.preferredVideoErrorCorrection);
                    log("Trying to set " + _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec + " as preferred codec by viewer via API");
                    _0x11d35d.pcs[_0x32ef3e.UUID].encoder = false;
                  } else {
                    _0x32ef3e.description.sdp = CodecsHandler.preferCodec(_0x32ef3e.description.sdp, "vp8", _0x11d35d.preferredVideoErrorCorrection);
                    log("Setting Codec to vp8");
                    _0x11d35d.pcs[_0x32ef3e.UUID].encoder = false;
                  }
                } else if (_0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec && _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec !== "h264") {
                  if (_0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec === "vp9" || _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec === "vp8") {
                    _0x32ef3e.description.sdp = CodecsHandler.preferCodec(_0x32ef3e.description.sdp, _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec, _0x11d35d.preferredVideoErrorCorrection);
                    log("Trying to set " + _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec + " as preferred codec by viewer via API");
                    _0x11d35d.pcs[_0x32ef3e.UUID].encoder = false;
                  } else {
                    _0x11d35d.pcs[_0x32ef3e.UUID].encoder = true;
                  }
                } else {
                  _0x11d35d.pcs[_0x32ef3e.UUID].encoder = true;
                  if (_0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec && _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec === "h264") {
                    _0x32ef3e.description.sdp = CodecsHandler.preferCodec(_0x32ef3e.description.sdp, "h264", _0x11d35d.preferredVideoErrorCorrection);
                    log("Trying to set " + _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec + " as preferred codec by viewer via API");
                  }
                }
              } else if (_0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec) {
                _0x32ef3e.description.sdp = CodecsHandler.preferCodec(_0x32ef3e.description.sdp, _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec, _0x11d35d.preferredVideoErrorCorrection);
                log("Trying to set " + _0x11d35d.pcs[_0x32ef3e.UUID].preferVideoCodec + " as preferred codec by viewer via API");
              }
            }
          }
          if (_0x336c7b) {
            var _0x406310 = CodecsHandler.getVideoBitrates(_0x32ef3e.description.sdp);
            log("BITRATE 1: " + _0x406310);
            if (_0x11d35d.pcs[_0x32ef3e.UUID].savedBitrate !== false) {
              if (_0x11d35d.pcs[_0x32ef3e.UUID].savedBitrate < _0x336c7b) {
                _0x336c7b = false;
              }
            }
            if (_0x336c7b === false) {
              _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate = _0x406310;
            } else {
              if (_0x406310 !== false && _0x406310 > _0x336c7b) {
                var _0x4b0238 = CodecsHandler.getOpusBitrate(_0x32ef3e.description.sdp) || 0x0;
                _0x32ef3e.description.sdp = CodecsHandler.setVideoBitrates(_0x32ef3e.description.sdp, {
                  'min': parseInt(_0x336c7b / 0xa) || 0x1,
                  'max': parseInt(_0x336c7b + _0x4b0238 / 0x400)
                });
                _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate = _0x336c7b;
              } else {
                if (_0x406310 === false) {
                  var _0x4b0238 = CodecsHandler.getOpusBitrate(_0x32ef3e.description.sdp) || 0x0;
                  _0x32ef3e.description.sdp = CodecsHandler.setVideoBitrates(_0x32ef3e.description.sdp, {
                    'min': parseInt(_0x336c7b / 0xa) || 0x1,
                    'max': parseInt(_0x336c7b + _0x4b0238 / 0x400)
                  });
                  if (_0x11d35d.outboundVideoBitrate && _0x11d35d.outboundVideoBitrate > _0x336c7b) {
                    _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate = _0x336c7b;
                  } else if (_0x11d35d.outboundVideoBitrate) {
                    _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate = _0x11d35d.outboundVideoBitrate;
                  } else {
                    _0x11d35d.pcs[_0x32ef3e.UUID].savedBitrate = 0x9c4;
                  }
                } else {
                  _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate = _0x406310;
                }
              }
            }
          } else {
            if (_0x11d35d.outboundVideoBitrate !== false) {
              var _0x406310 = CodecsHandler.getVideoBitrates(_0x32ef3e.description.sdp);
              log("BITRATE 2: " + _0x406310);
              if (_0x406310 === false) {
                var _0x4b0238 = CodecsHandler.getOpusBitrate(_0x32ef3e.description.sdp) || 0x0;
                _0x32ef3e.description.sdp = CodecsHandler.setVideoBitrates(_0x32ef3e.description.sdp, {
                  'min': parseInt(_0x11d35d.outboundVideoBitrate / 0xa) || 0x1,
                  'max': parseInt(_0x11d35d.outboundVideoBitrate + _0x4b0238 / 0x400)
                });
              } else if (_0x11d35d.pcs[_0x32ef3e.UUID].setBitrate === false) {
                _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate = _0x406310;
              }
            } else if (_0x11d35d.pcs[_0x32ef3e.UUID].setBitrate === false) {
              _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate = CodecsHandler.getVideoBitrates(_0x32ef3e.description.sdp);
              log("BITRATE 3: " + _0x11d35d.pcs[_0x32ef3e.UUID].setBitrate);
            }
          }
          if (_0x11d35d.outboundAudioBitrate) {
            _0x32ef3e.description.sdp = CodecsHandler.setOpusAttributes(_0x32ef3e.description.sdp, {
              'maxaveragebitrate': _0x11d35d.outboundAudioBitrate * 0x400,
              'cbr': _0x11d35d.cbr
            });
          }
          if ('session' in _0x32ef3e && _0x32ef3e.session != _0x11d35d.pcs[_0x32ef3e.UUID].session) {
            errorlog("Answer SDP does not have a matching session ID");
            return;
          }
          if (_0x11d35d.localNetworkOnly) {
            _0x32ef3e.description.sdp = filterSDPLAN(_0x32ef3e.description.sdp);
          }
          _0x11d35d.pcs[_0x32ef3e.UUID].setRemoteDescription(_0x32ef3e.description).then()["catch"](errorlog);
        } catch (_0x55f3c5) {
          errorlog(_0x55f3c5);
        }
      }
    };
    _0x11d35d.processDescription = function (_0x151927) {
      if (_0x11d35d.password && _0x151927.vector) {
        _0x11d35d.decryptMessage(_0x151927.description, _0x151927.vector).then(function (_0x4276f3) {
          try {
            _0x151927.description = JSON.parse(_0x4276f3);
            _0x11d35d.processDescription2(_0x151927);
          } catch (_0x14d8ec) {
            errorlog(_0x14d8ec);
          }
        })["catch"](function (_0x53c198) {
          errorlog("Decryption error:", _0x53c198);
        });
      } else {
        _0x11d35d.processDescription2(_0x151927);
      }
    };
    _0x11d35d.processIce = function (_0xd00ef4) {
      if (_0x11d35d.password && _0xd00ef4.vector) {
        _0x11d35d.decryptMessage(_0xd00ef4.candidate, _0xd00ef4.vector).then(function (_0x34feb7) {
          try {
            _0xd00ef4.candidate = JSON.parse(_0x34feb7);
            _0x11d35d.processIce2(_0xd00ef4);
          } catch (_0x145a97) {
            errorlog(_0x145a97);
          }
        })["catch"](function (_0x4c9499) {
          errorlog("Decryption error:", _0x4c9499);
        });
      } else {
        _0x11d35d.processIce2(_0xd00ef4);
      }
    };
    _0x11d35d.processIce2 = function (_0x364de0) {
      try {
        if (_0x11d35d.icefilter) {
          if (_0x364de0.candidate.candidate.indexOf(_0x11d35d.icefilter) === -0x1) {
            log("dropped candidate due to filter");
            log(_0x364de0.candidate);
            return;
          } else {
            log("PASSED");
            log(_0x364de0.candidate);
          }
        }
      } catch (_0x2d90e4) {
        errorlog(_0x2d90e4);
      }
      if (_0x364de0.candidate && "candidate" in _0x364de0.candidate && _0x364de0.candidate.candidate == '') {
        return;
      }
      try {
        if (_0x11d35d.localNetworkOnly) {
          if (!filterIceLAN(_0x364de0.candidate)) {
            return;
          }
        }
      } catch (_0x23a07a) {
        errorlog(_0x23a07a);
      }
      if (_0x364de0.UUID in _0x11d35d.pcs && _0x364de0.type == "remote") {
        log("PCS WINS ICE");
        if ("session" in _0x364de0 && _0x11d35d.pcs[_0x364de0.UUID].session != _0x364de0.session) {
          errorlog("Incoming Ice Offer does not match Session");
          return;
        }
        _0x11d35d.pcs[_0x364de0.UUID].addIceCandidate(_0x364de0.candidate).then()["catch"](function (_0x37ee5a) {});
      } else {
        if (_0x364de0.UUID in _0x11d35d.rpcs && _0x364de0.type == "local") {
          log("RPCS WINS ICE");
          if ("session" in _0x364de0 && _0x11d35d.rpcs[_0x364de0.UUID].session != _0x364de0.session) {
            errorlog("Incoming Ice Offer does not match Session");
            return;
          }
          if (_0x11d35d.rpcs[_0x364de0.UUID] === null) {
            return;
          }
          _0x11d35d.rpcs[_0x364de0.UUID].addIceCandidate(_0x364de0.candidate).then()["catch"](function (_0x2e239a) {});
        } else {
          warnlog(_0x364de0);
          errorlog("ICE DID NOT FIND A PC OPTION? peer might have left before ICE complete?");
        }
      }
    };
    _0x11d35d.processIceBundle = function (_0x3c94ba) {
      if (_0x11d35d.password && _0x3c94ba.vector) {
        _0x11d35d.decryptMessage(_0x3c94ba.candidates, _0x3c94ba.vector).then(function (_0x24c5ff) {
          _0x3c94ba.candidates = JSON.parse(_0x24c5ff);
          var _0x4aaa02 = {
            "UUID": _0x3c94ba.UUID,
            type: _0x3c94ba.type
          };
          for (var _0x36385a = 0x0; _0x36385a < _0x3c94ba.candidates.length; _0x36385a++) {
            _0x4aaa02.candidate = _0x3c94ba.candidates[_0x36385a];
            _0x11d35d.processIce2(_0x4aaa02);
          }
        });
      } else {
        var _0x25b4a8 = {
          "UUID": _0x3c94ba.UUID,
          "type": _0x3c94ba.type
        };
        for (var _0x20e8ca = 0x0; _0x20e8ca < _0x3c94ba.candidates.length; _0x20e8ca++) {
          _0x25b4a8.candidate = _0x3c94ba.candidates[_0x20e8ca];
          _0x11d35d.processIce2(_0x25b4a8);
        }
      }
    };
    _0x11d35d.connectPeer = async function (_0x118282) {
      if ('screen' in _0x118282) {
        _0x11d35d.rpcs[_0x118282.UUID].screenIndexes = _0x118282.screen;
        log("SCREENS");
        log(_0x118282.screen);
      }
      log(_0x118282);
      if (_0x11d35d.removeOrientationFlag && _0x118282.description && _0x118282.description.sdp && _0x118282.description.sdp.includes("a=extmap:3 urn:3gpp:video-orientation\r\n")) {
        _0x118282.description.sdp = _0x118282.description.sdp.replace("a=extmap:3 urn:3gpp:video-orientation\r\n", '');
        warnlog("removed from SDP: 'a=extmap:3 urn:3gpp:video-orientation\r\n'");
      }
      if (_0x11d35d.noPLIs) {
        _0x118282.description.sdp = CodecsHandler.disablePLI(_0x118282.description.sdp);
      }
      if (_0x11d35d.noREMB) {
        _0x118282.description.sdp = CodecsHandler.disableREMB(_0x118282.description.sdp);
      }
      if (_0x11d35d.noNacks) {
        log(_0x118282.description.sdp);
        _0x118282.description.sdp = CodecsHandler.disableNACK(_0x118282.description.sdp);
      }
      if (_0x11d35d.localNetworkOnly) {
        _0x118282.description.sdp = filterSDPLAN(_0x118282.description.sdp);
      }
      _0x11d35d.rpcs[_0x118282.UUID].setRemoteDescription(_0x118282.description).then(async function () {
        if (_0x11d35d.rpcs[_0x118282.UUID].remoteDescription.type === "offer") {
          _0x11d35d.rpcs[_0x118282.UUID].createAnswer().then(function (_0x4011a0) {
            log("creating answer");
            if (_0x11d35d.rpcs[_0x118282.UUID].whip) {
              if (_0x11d35d.stereo && _0x11d35d.stereo == 0x4) {
                _0x4011a0.sdp = CodecsHandler.setOpusAttributes(_0x4011a0.sdp, {
                  'stereo': 0x2
                }, true);
              } else if (_0x11d35d.stereo && !_0x11d35d.mono && _0x11d35d.stereo != 0x3) {
                _0x4011a0.sdp = CodecsHandler.setOpusAttributes(_0x4011a0.sdp, {
                  'stereo': 0x1
                }, true);
              }
              return _0x11d35d.rpcs[_0x118282.UUID].setLocalDescription(_0x4011a0);
            }
            var _0x16b9f5 = false;
            if (!_0x11d35d.director && _0x11d35d.stereo == 0x5) {
              _0x16b9f5 = {
                'stereo': 0x1,
                'maxaveragebitrate': (_0x11d35d.audiobitrate || _0x11d35d.audiobitratePRO) * 0x400,
                'cbr': _0x11d35d.cbr,
                'useinbandfec': _0x11d35d.noFEC ? 0x0 : 0x1,
                'maxptime': _0x11d35d.maxptime,
                'minptime': _0x11d35d.minptime,
                'ptime': _0x11d35d.ptime,
                'dtx': _0x11d35d.dtx
              };
              log("stereo inbound enabled");
            } else {
              if (_0x11d35d.mono && Firefox) {
                if (_0x11d35d.audiobitrate) {
                  _0x16b9f5 = {
                    'stereo': 0x0,
                    'maxaveragebitrate': _0x11d35d.audiobitrate * 0x400,
                    'cbr': _0x11d35d.cbr,
                    'useinbandfec': _0x11d35d.noFEC ? 0x0 : 0x1,
                    'maxptime': _0x11d35d.maxptime,
                    'minptime': _0x11d35d.minptime,
                    'ptime': _0x11d35d.ptime,
                    'dtx': _0x11d35d.dtx
                  };
                } else {
                  _0x16b9f5 = {
                    'stereo': 0x0,
                    'useinbandfec': _0x11d35d.noFEC ? 0x0 : 0x1,
                    'maxptime': _0x11d35d.maxptime,
                    'minptime': _0x11d35d.minptime,
                    'ptime': _0x11d35d.ptime,
                    'dtx': _0x11d35d.dtx
                  };
                }
              } else {
                if (_0x11d35d.stereo == 0x1 || _0x11d35d.stereo == 0x2 || _0x11d35d.stereo == 0x5) {
                  _0x16b9f5 = {
                    'stereo': 0x1,
                    'maxaveragebitrate': (_0x11d35d.audiobitrate || _0x11d35d.audiobitratePRO) * 0x400,
                    'cbr': _0x11d35d.cbr,
                    'useinbandfec': _0x11d35d.noFEC ? 0x0 : 0x1,
                    'maxptime': _0x11d35d.maxptime,
                    'minptime': _0x11d35d.minptime,
                    'ptime': _0x11d35d.ptime,
                    'dtx': _0x11d35d.dtx
                  };
                  log("stereo inbound enabled");
                } else {
                  if (_0x11d35d.stereo == 0x4) {
                    _0x16b9f5 = {
                      'stereo': 0x2,
                      'maxaveragebitrate': (_0x11d35d.audiobitrate || _0x11d35d.audiobitratePRO) * 0x400,
                      'cbr': _0x11d35d.cbr,
                      'useinbandfec': _0x11d35d.noFEC ? 0x0 : 0x1,
                      'maxptime': _0x11d35d.maxptime,
                      'minptime': _0x11d35d.minptime,
                      'ptime': _0x11d35d.ptime,
                      'dtx': _0x11d35d.dtx
                    };
                  } else {
                    if (_0x11d35d.audiobitrate) {
                      _0x16b9f5 = {
                        'maxaveragebitrate': _0x11d35d.audiobitrate * 0x400,
                        'cbr': _0x11d35d.cbr,
                        'useinbandfec': _0x11d35d.noFEC ? 0x0 : 0x1,
                        'maxptime': _0x11d35d.maxptime,
                        'minptime': _0x11d35d.minptime,
                        'ptime': _0x11d35d.ptime,
                        'dtx': _0x11d35d.dtx
                      };
                    } else {
                      if (_0x11d35d.noFEC) {
                        _0x16b9f5 = {
                          'useinbandfec': 0x0,
                          'maxptime': _0x11d35d.maxptime,
                          'minptime': _0x11d35d.minptime,
                          'ptime': _0x11d35d.ptime,
                          'dtx': _0x11d35d.dtx
                        };
                      } else if (_0x11d35d.dtx) {
                        _0x16b9f5 = {
                          'maxptime': _0x11d35d.maxptime,
                          'minptime': _0x11d35d.minptime,
                          'ptime': _0x11d35d.ptime,
                          'dtx': _0x11d35d.dtx
                        };
                      }
                    }
                  }
                }
              }
            }
            if (_0x11d35d.stereo === 0x6) {
              if (!_0x16b9f5) {
                _0x16b9f5 = {
                  'stereo': 0x1
                };
              } else {
                _0x16b9f5.stereo = 0x1;
              }
            }
            if (_0x16b9f5) {
              _0x4011a0.sdp = CodecsHandler.setOpusAttributes(_0x4011a0.sdp, _0x16b9f5);
            }
            if (_0x11d35d.audioCodec) {
              try {
                if (_0x11d35d.audioCodec === "lyra") {
                  _0x4011a0.sdp = CodecsHandler.modifyDescLyra(_0x4011a0.sdp);
                } else {
                  if (_0x11d35d.audioCodec === 'pcm') {
                    if (_0x11d35d.mono) {
                      _0x4011a0.sdp = CodecsHandler.modifyDescPCM(_0x4011a0.sdp, _0x11d35d.sampleRate || 0xbb80, false, _0x11d35d.ptime);
                    } else if (_0x11d35d.stereo) {
                      _0x4011a0.sdp = CodecsHandler.modifyDescPCM(_0x4011a0.sdp, _0x11d35d.sampleRate || 0x7d00, true, _0x11d35d.ptime);
                    } else {
                      _0x4011a0.sdp = CodecsHandler.modifyDescPCM(_0x4011a0.sdp, _0x11d35d.sampleRate || 0xbb80, false, _0x11d35d.ptime);
                    }
                  } else {
                    _0x4011a0.sdp = CodecsHandler.preferAudioCodec(_0x4011a0.sdp, _0x11d35d.audioCodec, _0x11d35d.redAudio, _0x11d35d.fecAudio);
                  }
                }
              } catch (_0x400921) {
                errorlog(_0x400921);
                warnlog("couldn't set preferred audio codec");
              }
            }
            if (_0x11d35d.codecs && _0x11d35d.codecs.length) {
              for (var _0xa5f314 = _0x11d35d.codecs.length - 0x1; _0xa5f314 >= 0x0; _0xa5f314--) {
                try {
                  _0x4011a0.sdp = CodecsHandler.preferCodec(_0x4011a0.sdp, _0x11d35d.codecs[_0xa5f314], _0x11d35d.videoErrorCorrection);
                } catch (_0x59a35) {
                  errorlog(_0x59a35);
                  break;
                }
              }
            }
            if (_0x11d35d.codec) {
              _0x4011a0.sdp = CodecsHandler.preferCodec(_0x4011a0.sdp, _0x11d35d.codec, _0x11d35d.videoErrorCorrection);
            }
            if (_0x11d35d.h264profile) {
              log("h264profile being modified");
              _0x4011a0.sdp = _0x4011a0.sdp.replace(/42e01f/gi, _0x11d35d.h264profile);
              _0x4011a0.sdp = _0x4011a0.sdp.replace(/42001f/gi, _0x11d35d.h264profile);
              _0x4011a0.sdp = _0x4011a0.sdp.replace(/420029/gi, _0x11d35d.h264profile);
              _0x4011a0.sdp = _0x4011a0.sdp.replace(/42a01e/gi, _0x11d35d.h264profile);
              _0x4011a0.sdp = _0x4011a0.sdp.replace(/42a014/gi, _0x11d35d.h264profile);
              _0x4011a0.sdp = _0x4011a0.sdp.replace(/42a00b/gi, _0x11d35d.h264profile);
              _0x4011a0.sdp = _0x4011a0.sdp.replace(/640c1f/gi, _0x11d35d.h264profile);
            }
            if (_0x11d35d.noPLIs) {
              _0x4011a0.sdp = CodecsHandler.disablePLI(_0x4011a0.sdp);
            }
            if (_0x11d35d.noREMB) {
              _0x4011a0.sdp = CodecsHandler.disableREMB(_0x4011a0.sdp);
            }
            if (_0x11d35d.noNacks) {
              log(_0x4011a0.sdp);
              _0x4011a0.sdp = CodecsHandler.disableNACK(_0x4011a0.sdp);
            }
            if (_0x11d35d.rpcs[_0x118282.UUID].manualBandwidth) {
              log("bit rate being munged");
              _0x4011a0.sdp = _0x3b262a(_0x4011a0.sdp, _0x11d35d.rpcs[_0x118282.UUID].manualBandwidth);
            } else if (_0x11d35d.bitrate) {
              log("bit rate being munged");
              _0x4011a0.sdp = _0x3b262a(_0x4011a0.sdp, _0x11d35d.bitrate);
            }
            if (_0x11d35d.localNetworkOnly) {
              _0x4011a0.sdp = filterSDPLAN(_0x4011a0.sdp);
            }
            log(_0x4011a0);
            return _0x11d35d.rpcs[_0x118282.UUID].setLocalDescription(_0x4011a0);
          }).then(function _0x1cef17() {
            log("providing answer");
            if (_0x11d35d.rpcs[_0x118282.UUID].whip) {
              if (_0x11d35d.rpcs[_0x118282.UUID].whipCallback) {
                _0x11d35d.rpcs[_0x118282.UUID].whipCallback();
              }
              return;
            }
            var _0x4ddac3 = {
              "UUID": _0x118282.UUID,
              "description": _0x11d35d.rpcs[_0x118282.UUID].localDescription,
              session: _0x11d35d.rpcs[_0x118282.UUID].session
            };
            if (_0x11d35d.password && _0x11d35d.rpcs[_0x118282.UUID].vector) {
              _0x11d35d.encryptMessage(JSON.stringify(_0x4ddac3.description)).then(function (_0xe0ec7c) {
                _0x4ddac3.description = _0xe0ec7c[0x0];
                _0x4ddac3.vector = _0xe0ec7c[0x1];
                _0x11d35d.anyrequest(_0x4ddac3);
              })["catch"](errorlog);
            } else {
              _0x11d35d.anyrequest(_0x4ddac3);
            }
          })["catch"](errorlog);
        } else if (_0x11d35d.rpcs[_0x118282.UUID].remoteDescription.type === "answer") {
          errorlog("Someone sent us an ANSWER sdp??");
        }
      })['catch'](function (_0x401613) {
        errorlog(_0x401613);
        if (_0x118282.description) {
          errorlog(_0x118282.description.sdp);
        }
      });
    };
    _0x11d35d.getLocalStream = function () {
      if (_0x11d35d.videoElement && _0x11d35d.videoElement.srcObject) {
        return _0x11d35d.videoElement.srcObject;
      } else {
        return _0x11d35d.videoElement && _0x11d35d.videoElement.src && _0x11d35d.streamSrc ? _0x11d35d.streamSrc : (log("checkBasicStreamsExist"), checkBasicStreamsExist(), _0x11d35d.videoElement.srcObject);
      }
    };
    _0x11d35d.sendFile = function (_0x3ac8c7, _0x3535d0) {
      log("SENDING FILE: " + _0x3535d0 + " " + _0x3ac8c7);
      var _0x5eb156 = new FileReader();
      var _0x5af4b4 = false;
      for (var _0x87c60c = 0x0; _0x87c60c < _0x11d35d.hostedFiles.length; _0x87c60c++) {
        if (_0x11d35d.hostedFiles[_0x87c60c].id === _0x3535d0) {
          _0x5af4b4 = _0x87c60c;
          break;
        }
      }
      if (_0x5af4b4 === false) {
        warnlog("requested file was not found");
        return;
      } else {
        if (_0x11d35d.hostedFiles[_0x5af4b4].state == 0x0) {
          warnlog("requested file has been removed.");
          return;
        } else {
          if (!(_0x11d35d.hostedFiles[_0x5af4b4].restricted === false || _0x11d35d.hostedFiles[_0x5af4b4].restricted === _0x3ac8c7)) {
            warnlog("user didn't have access for this file.");
            return;
          }
        }
      }
      var _0x4b0044 = 0x0;
      var _0x2bf895 = _0x5af4b4;
      if (_0x2bf895 === "sendChannel") {
        _0x2bf895 = "sendChannel_" + _0x11d35d.generateStreamID(0x5);
      }
      if (_0x3ac8c7 in _0x11d35d.pcs) {
        var _0x5d9a46 = _0x11d35d.pcs[_0x3ac8c7].createDataChannel(_0x2bf895);
      } else {
        if (_0x3ac8c7 in _0x11d35d.rpcs) {
          var _0x5d9a46 = _0x11d35d.rpcs[_0x3ac8c7].createDataChannel(_0x2bf895);
        } else {
          warnlog("UUID does not exist");
          return;
        }
      }
      _0x5d9a46.binaryType = "arraybuffer";
      var _0x326e13 = _0x11d35d.hostedFiles[_0x5af4b4].slice(0x0, 0x4000);
      _0x5d9a46.onopen = () => {
        _0x5d9a46.send(JSON.stringify({
          'type': "filetransfer",
          'size': _0x11d35d.hostedFiles[_0x5af4b4].size,
          'filename': _0x11d35d.hostedFiles[_0x5af4b4].name,
          'id': _0x11d35d.hostedFiles[_0x5af4b4].id
        }));
        _0x5eb156.readAsArrayBuffer(_0x326e13);
      };
      _0x5d9a46.onclose = () => {
        try {
          var _0x3b0ae6 = _0x11d35d.hostedTransfers.indexOf(_0x5d9a46);
          if (_0x3b0ae6 > -0x1) {
            _0x11d35d.hostedTransfers.splice(_0x3b0ae6, 0x1);
          }
        } catch (_0x493d63) {
          errorlog(_0x493d63);
        }
        log("Transfer ended");
        _0x5d9a46 = null;
      };
      _0x5d9a46.onmessage = _0x22b2ed => {};
      _0x11d35d.hostedTransfers.push(_0x5d9a46);
      _0x5eb156.onload = function () {
        if (_0x11d35d.hostedFiles[_0x5af4b4].state == 0x0) {
          return;
        }
        var _0x424f6f = _0x5eb156.result;
        log(_0x424f6f);
        try {
          _0x5d9a46.send(_0x424f6f);
        } catch (_0x5134e4) {
          try {
            _0x5d9a46.close();
          } catch (_0x5e6e72) {}
          warnlog(_0x5134e4);
          return;
        }
        _0x4b0044 += 0x1;
        if (_0x4b0044 * 0x4000 < _0x11d35d.hostedFiles[_0x5af4b4].size) {
          try {
            log("cid:" + _0x4b0044);
            _0x326e13 = _0x11d35d.hostedFiles[_0x5af4b4].slice(_0x4b0044 * 0x4000, (_0x4b0044 + 0x1) * 0x4000);
            _0x5eb156.readAsArrayBuffer(_0x326e13);
          } catch (_0x256067) {
            errorlog(_0x256067);
          }
        } else {
          _0x5d9a46.send("EOF1");
          _0x5d9a46.close();
        }
      };
    };
    var _0x41461c = 0x0;
    _0x11d35d.webCodec = async function (_0x20c3eb = null) {
      console.log("session.webCodec " + _0x11d35d.chunkedVideoEnabled);
      if (_0x11d35d.chunkedVideoEnabled !== null) {
        return;
      } else {
        _0x11d35d.chunkedVideoEnabled = false;
      }
      if (!_0x20c3eb && _0x11d35d.stats.Chunked_video) {
        _0x20c3eb = _0x11d35d.stats.Chunked_video;
      }
      let _0x2fb01b = 0x0;
      var _0x2e2f92 = _0x11d35d.getLocalStream().getVideoTracks();
      if (!_0x2e2f92 || !_0x2e2f92.length) {
        warnlog("NO TRACKS");
        _0x11d35d.chunkedVideoEnabled = null;
        return;
      }
      _0x2e2f92 = _0x2e2f92[0x0];
      var _0x33d173 = new MediaStreamTrackProcessor(_0x2e2f92);
      var _0x40e64b = _0x33d173.readable;
      const _0x2a7c6b = _0x40e64b.getReader();
      _0x41461c += 0x1;
      _0x2a7c6b.counterWebCodec = _0x41461c;
      console.log("counterWebCodec 0: " + _0x41461c);
      var _0x43533d = -0x1;
      var _0x1e3643 = -0x1;
      const _0x3cc5b9 = {
        'output': async _0x58ae81 => {
          if (!_0x11d35d.chunkedRecorder || !_0x11d35d.chunkedRecorder.sendChunks) {
            console.log('!');
          } else {
            if (_0x58ae81.constructor.name == 'EncodedVideoChunk') {
              let _0x2d9121 = new Uint8Array(_0x58ae81.byteLength);
              _0x58ae81.copyTo(_0x2d9121);
              _0x11d35d.chunksQueue.push([_0x58ae81.timestamp - _0x1e3643, _0x58ae81.type]);
              _0x11d35d.chunksQueue.push(_0x2d9121);
              if (isIFrame) {
                pokeIframeAPI('chunked-outbound', {
                  'type': _0x58ae81.type,
                  'ts': dataFrame.timestamp
                });
              }
              try {
                await _0x11d35d.chunkedRecorder.sendChunks("video");
              } catch (_0x19da10) {
                errorlog(_0x19da10);
                console.log("counterWebCodec 1: " + _0x2a7c6b.counterWebCodec);
                if (!_0x11d35d.chunkedRecorder) {}
              }
            }
          }
        },
        'error': _0x52a952 => {
          errorlog(_0x52a952);
        }
      };
      let _0x355eb0 = new VideoEncoder(_0x3cc5b9);
      _0x355eb0.config = _0x20c3eb;
      _0x355eb0.configure(_0x20c3eb);
      _0x11d35d.stats.Chunked_video = _0x20c3eb;
      _0x11d35d.chunkedRecorder.videoEncoder = _0x355eb0;
      var _0x5c187a;
      var _0x110a9f = new Promise((_0x5f14c2, _0x23ef47) => {
        _0x5c187a = _0x5f14c2;
      });
      _0x110a9f.resolve = _0x5c187a;
      _0x2a7c6b.read().then(function _0x1f4799({
        done: _0x544f74,
        value: _0x23f554
      }) {
        if (_0x544f74 || false) {
          _0x355eb0.close();
          if (_0x23f554) {
            _0x23f554.close();
          }
          console.log("counterWebCodec 3: " + _0x2a7c6b.counterWebCodec);
          warnlog('frameReader.read().then(function');
          return;
        } else {
          if (_0x355eb0.state == "closed") {
            if (_0x23f554) {
              _0x23f554.close();
            }
            console.log("counterWebCodec 2: " + _0x2a7c6b.counterWebCodec);
            warnlog(" else if (encoder.state == 'closed'");
            return;
          }
        }
        if (_0x1e3643 == -0x1) {
          _0x1e3643 = _0x23f554.timestamp;
          _0x11d35d.stats.Chunked_video.realTime = Date.now();
          _0x110a9f.resolve();
        }
        if (_0x43533d == _0x23f554.timestamp) {
          _0x23f554.timestamp += 0x1;
          warnlog("Timestamp duplicated");
        }
        _0x43533d = _0x23f554.timestamp;
        _0x2fb01b++;
        if (_0x11d35d.chunkedRecorder.needKeyFrame) {
          const _0x58159e = _0x2fb01b >= 0x3c;
          if (_0x58159e) {
            _0x2fb01b = 0x0;
            _0x11d35d.chunkedRecorder.needKeyFrame = false;
            warnlog("Keyframe inserted");
          }
          try {
            _0x355eb0.encode(_0x23f554, {
              'keyFrame': _0x58159e
            });
          } catch (_0x221ff2) {
            errorlog(_0x221ff2);
          }
        } else {
          try {
            _0x355eb0.encode(_0x23f554, {
              'keyFrame': false
            });
          } catch (_0x563dff) {
            errorlog(_0x563dff);
          }
        }
        _0x23f554.close();
        _0x2a7c6b.read().then(_0x1f4799);
      });
      _0x11d35d.chunkedVideoEnabled = true;
      return _0x110a9f;
    };
    _0x11d35d.webCodecAudio = async function (_0x4fdf44) {
      if (_0x11d35d.chunkedAudioEnabled !== null) {
        return;
      } else {
        _0x11d35d.chunkedAudioEnabled = false;
      }
      if (!_0x4fdf44 && _0x11d35d.stats.Chunked_audio) {
        _0x4fdf44 = _0x11d35d.stats.Chunked_audio;
      }
      var _0x412625 = _0x11d35d.getLocalStream();
      var _0x2171bf = _0x412625.getAudioTracks();
      if (!_0x2171bf || !_0x2171bf.length) {
        _0x11d35d.chunkedAudioEnabled = null;
        return;
      }
      _0x2171bf = _0x2171bf[0x0];
      var _0x57ee0a = _0x2171bf.getSettings();
      if (_0x4fdf44.numberOfChannels > _0x57ee0a.channelCount) {
        _0x4fdf44.numberOfChannels = _0x57ee0a.channelCount;
        _0x4fdf44.channels = _0x57ee0a.channelCount;
      }
      if (_0x4fdf44.sampleRate != _0x57ee0a.sampleRate) {
        try {
          _0x412625 = outboundAudioPipeline();
        } catch (_0x3b57a6) {
          errorlog(_0x3b57a6);
        }
      }
      var _0x5e238d = new MediaStreamTrackProcessor(_0x412625.getAudioTracks()[0x0]);
      var _0x3f803d = _0x5e238d.readable;
      const _0x3b6743 = _0x3f803d.getReader();
      var _0x55c08d = -0x1;
      var _0xea0623 = -0x1;
      const _0x3ffb00 = {
        'output': async _0x47b481 => {
          if (!_0x11d35d.chunkedRecorder || !_0x11d35d.chunkedRecorder.sendChunks) {
            console.log('!');
          } else {
            if (_0x47b481.constructor.name == "EncodedAudioChunk") {
              let _0x1c15ef = new Uint8Array(_0x47b481.byteLength);
              _0x47b481.copyTo(_0x1c15ef);
              _0x11d35d.chunksQueue.push([_0x47b481.timestamp - _0xea0623, "audio"]);
              _0x11d35d.chunksQueue.push(_0x1c15ef);
              if (isIFrame) {
                pokeIframeAPI('chunked-outbound', {
                  'type': 'audio',
                  'ts': _0x47b481.timestamp - _0xea0623
                });
              }
              try {
                await _0x11d35d.chunkedRecorder.sendChunks('audio');
              } catch (_0x54400e) {
                errorlog(_0x54400e);
                if (!_0x11d35d.chunkedRecorder) {}
              }
            }
          }
        },
        'error': _0x2741c2 => {
          errorlog(_0x2741c2);
        }
      };
      let _0x2b44d3 = new AudioEncoder(_0x3ffb00);
      _0x2b44d3.config = _0x4fdf44;
      _0x2b44d3.configure(_0x4fdf44);
      _0x11d35d.stats.Chunked_audio = {};
      _0x11d35d.stats.Chunked_audio.codec = _0x4fdf44.codec;
      _0x11d35d.stats.Chunked_audio.numberOfChannels = _0x4fdf44.numberOfChannels;
      _0x11d35d.stats.Chunked_audio.sampleRate = _0x4fdf44.sampleRate;
      _0x11d35d.stats.Chunked_audio.bitrate = _0x4fdf44.tuning.bitrate;
      var _0x231c7d;
      var _0x25ff6b = new Promise((_0x11c35b, _0x29f21e) => {
        _0x231c7d = _0x11c35b;
      });
      _0x25ff6b.resolve = _0x231c7d;
      _0x3b6743.read().then(function _0x303e5f({
        done: _0x106a82,
        value: _0x33b9b9
      }) {
        if (_0x106a82 || false) {
          _0x2b44d3.close();
          if (_0x33b9b9) {
            _0x33b9b9.close();
          }
          _0x11d35d.chunkedAudioEnabled = null;
          return;
        } else {
          if (_0x2b44d3.state == "closed") {
            if (_0x33b9b9) {
              _0x33b9b9.close();
            }
            _0x11d35d.chunkedAudioEnabled = null;
            return;
          }
        }
        try {
          if (_0xea0623 == -0x1) {
            _0xea0623 = _0x33b9b9.timestamp;
            _0x11d35d.stats.Chunked_audio.realTime = Date.now();
            _0x25ff6b.resolve();
          }
          if (_0x55c08d == _0x33b9b9.timestamp) {
            _0x33b9b9.timestamp += 0x1;
          }
          _0x55c08d = _0x33b9b9.timestamp;
          try {
            _0x2b44d3.encode(_0x33b9b9);
          } catch (_0x375f9d) {
            errorlog(_0x375f9d);
          }
          _0x33b9b9.close();
          _0x3b6743.read().then(_0x303e5f);
        } catch (_0x7e5dc6) {
          errorlog(_0x7e5dc6);
          errorlog(_0x33b9b9);
          errorlog(_0x106a82);
        }
      });
      _0x11d35d.chunkedAudioEnabled = true;
      return _0x25ff6b;
    };
    _0x11d35d.getPCM = function (_0x7d934, _0x11b898 = {}) {
      warnlog("PCM STARTED");
      const _0x3fb43b = new window.AudioContext({
        'sampleRate': _0x11b898.sampleRate || 0xbb80
      });
      const _0x76cf26 = _0x3fb43b.createMediaStreamSource(_0x7d934);
      const _0x2ad122 = (_0x3fb43b.createScriptProcessor || _0x3fb43b.createJavaScriptNode).call(_0x3fb43b, 0x800, 0x1, 0x1);
      _0x2ad122.onaudioprocess = async function (_0x1f0b6d) {
        var _0x52f43 = new Uint8Array(_0x1f0b6d.inputBuffer.getChannelData(0x0).buffer);
        _0x11d35d.chunksQueue.push([0x0, 'pcm']);
        _0x11d35d.chunksQueue.push(_0x52f43);
        try {
          await _0x11d35d.chunkedRecorder.sendChunks("pcm");
        } catch (_0x53d26b) {
          errorlog(_0x53d26b);
          if (!_0x11d35d.chunkedRecorder) {
            encoder.close();
          }
        }
      };
      _0x76cf26.connect(_0x2ad122);
      _0x2ad122.connect(_0x3fb43b.destination);
      _0x11d35d.stats.Chunked_audio = {};
      _0x11d35d.chunkedAudioEnabled = true;
      return _0x2ad122;
    };
    _0x11d35d.retransmitChunkedStream = async function (_0x1b57ba = false, _0x2ca465 = false) {
      if (!_0x11d35d.chunkedRecorder) {
        warnlog("RE TRANSMISSIONS STARTED");
        var _0x12f42e = null;
        _0x11d35d.chunkedRecorder = {};
        _0x11d35d.chunkedDetails = _0x1b57ba || false;
        if (_0x11d35d.chunkedDetails) {
          _0x11d35d.chunkedRecorder.upstreamChannel = _0x2ca465;
        }
        _0x11d35d.chunkedRecorder.sendChunks = async function (_0x1a35e6 = "null") {
          if (_0x12f42e) {
            return;
          }
          _0x12f42e = true;
          var _0xad0519 = _0x1a35e6;
          log("SENDING NEXT CHUNK:" + _0x11d35d.chunksQueue.length);
          while (_0x11d35d.chunksQueue.length) {
            if (!Object.keys(_0x11d35d.chunkedTransferChannels).length) {
              _0x11d35d.chunksQueue = [];
              _0x12f42e = null;
              _0x11d35d.stats.chunkedInQueue = 0x0;
              return;
            }
            _0x11d35d.stats.chunkedInQueue = _0x11d35d.chunksQueue.length;
            var _0x2bbddf = 0x0;
            var _0x50726f = _0x11d35d.chunksQueue.shift();
            if (_0x50726f.length === 0x2) {
              _0xad0519 = _0x50726f[0x1];
              _0x50726f.push(_0x11d35d.chunksQueue.length);
              var _0x1a7947 = JSON.stringify(_0x50726f);
              for (var _0x1713ba in _0x11d35d.chunkedTransferChannels) {
                if (!_0x11d35d.chunkedTransferChannels[_0x1713ba]) {
                  continue;
                }
                if ((_0xad0519 == "key" || _0xad0519 == "delta" || _0xad0519 == "video") && !_0x11d35d.pcs[_0x1713ba].allowVideo) {
                  continue;
                }
                if ((_0xad0519 == "audio" || _0xad0519 == "pcm") && !_0x11d35d.pcs[_0x1713ba].allowAudio) {
                  continue;
                }
                if (!_0x11d35d.chunkedTransferChannels[_0x1713ba].keyframeSent && _0xad0519 == "delta") {
                  warnlog("Waiting for keyframe / header before sending delta / raw video data");
                  continue;
                }
                try {
                  if (_0x11d35d.chunkedTransferChannels[_0x1713ba].readyState === "open") {
                    if (!_0x11d35d.chunkedTransferChannels[_0x1713ba].detailsSent) {
                      if (_0x11d35d.chunkedDetails) {
                        var _0x3d379b = {
                          ..._0x11d35d.chunkedDetails
                        };
                        _0x3d379b.timestamp = Date.now();
                        _0x11d35d.chunkedTransferChannels[_0x1713ba].send(JSON.stringify(_0x3d379b));
                        _0x11d35d.chunkedTransferChannels[_0x1713ba].detailsSent = true;
                      } else {
                        continue;
                      }
                    }
                    _0x11d35d.chunkedTransferChannels[_0x1713ba].send(_0x1a7947);
                    if (_0xad0519 == 'key' || _0xad0519 == "video") {
                      _0x11d35d.chunkedTransferChannels[_0x1713ba].keyframeSent = true;
                    } else if (_0xad0519 == "audio" || _0xad0519 == "pcm") {
                      _0x11d35d.chunkedTransferChannels[_0x1713ba].audioHeaderSent = true;
                    }
                    _0x11d35d.pcs[_0x1713ba].stats.bufferedAmount = _0x11d35d.chunkedTransferChannels[_0x1713ba].bufferedAmount;
                    if (_0x2bbddf < _0x11d35d.pcs[_0x1713ba].stats.bufferedAmount) {
                      _0x2bbddf = _0x11d35d.pcs[_0x1713ba].stats.bufferedAmount;
                    }
                  }
                } catch (_0x1f9a6e) {}
              }
            } else {
              if (_0x50726f.byteLength > 0x40000) {
                for (var _0x1713ba in _0x11d35d.chunkedTransferChannels) {
                  if (!_0x11d35d.chunkedTransferChannels[_0x1713ba]) {
                    continue;
                  }
                  if ((_0xad0519 == "key" || _0xad0519 == "delta" || _0xad0519 == "video") && !_0x11d35d.pcs[_0x1713ba].allowVideo) {
                    continue;
                  }
                  if ((_0xad0519 == 'audio' || _0xad0519 == 'pcm') && !_0x11d35d.pcs[_0x1713ba].allowAudio) {
                    continue;
                  }
                  if ((_0xad0519 == "key" || _0xad0519 == "delta" || _0xad0519 == 'video') && !_0x11d35d.chunkedTransferChannels[_0x1713ba].keyframeSent) {
                    warnlog("Waiting for keyframe / header before sending delta / raw video data");
                    continue;
                  } else {
                    if (!_0x11d35d.chunkedTransferChannels[_0x1713ba].audioHeaderSent && (_0xad0519 == "audio" || _0xad0519 == "pcm")) {
                      warnlog("Waiting for audio header before sending raw audio data");
                      continue;
                    }
                  }
                  try {
                    if (_0x11d35d.chunkedTransferChannels[_0x1713ba].readyState === "open") {
                      if (!_0x11d35d.chunkedTransferChannels[_0x1713ba].detailsSent) {
                        if (_0x11d35d.chunkedDetails) {
                          var _0x3d379b = {
                            ..._0x11d35d.chunkedDetails
                          };
                          _0x3d379b.timestamp = Date.now();
                          _0x11d35d.chunkedTransferChannels[_0x1713ba].send(JSON.stringify(_0x3d379b));
                          _0x11d35d.chunkedTransferChannels[_0x1713ba].detailsSent = true;
                        } else {
                          continue;
                        }
                      }
                      _0x11d35d.chunkedTransferChannels[_0x1713ba].send(_0x50726f.slice(0x0, 0x40000));
                      _0x11d35d.pcs[_0x1713ba].stats.bufferedAmount = _0x11d35d.chunkedTransferChannels[_0x1713ba].bufferedAmount;
                      if (_0x2bbddf < _0x11d35d.pcs[_0x1713ba].stats.bufferedAmount) {
                        _0x2bbddf = _0x11d35d.pcs[_0x1713ba].stats.bufferedAmount;
                      }
                    }
                  } catch (_0x2bf599) {}
                }
                _0x11d35d.chunksQueue.unshift(_0x50726f.slice(0x40000));
              } else {
                for (var _0x1713ba in _0x11d35d.chunkedTransferChannels) {
                  if (!_0x11d35d.chunkedTransferChannels[_0x1713ba]) {
                    continue;
                  }
                  if ((_0xad0519 == 'key' || _0xad0519 == "delta" || _0xad0519 == "video") && !_0x11d35d.pcs[_0x1713ba].allowVideo) {
                    continue;
                  }
                  if ((_0xad0519 == "audio" || _0xad0519 == "pcm") && !_0x11d35d.pcs[_0x1713ba].allowAudio) {
                    continue;
                  }
                  try {
                    if (_0x11d35d.chunkedTransferChannels[_0x1713ba].readyState === "open") {
                      if (!_0x11d35d.chunkedTransferChannels[_0x1713ba].detailsSent) {
                        if (_0x11d35d.chunkedDetails) {
                          var _0x3d379b = {
                            ..._0x11d35d.chunkedDetails
                          };
                          _0x3d379b.timestamp = Date.now();
                          _0x11d35d.chunkedTransferChannels[_0x1713ba].send(JSON.stringify(_0x3d379b));
                          _0x11d35d.chunkedTransferChannels[_0x1713ba].detailsSent = true;
                        } else {
                          continue;
                        }
                      }
                      _0x11d35d.chunkedTransferChannels[_0x1713ba].send(_0x50726f);
                    }
                    _0x11d35d.pcs[_0x1713ba].stats.bufferedAmount = _0x11d35d.chunkedTransferChannels[_0x1713ba].bufferedAmount;
                    if (_0x2bbddf < _0x11d35d.pcs[_0x1713ba].stats.bufferedAmount) {
                      _0x2bbddf = _0x11d35d.pcs[_0x1713ba].stats.bufferedAmount;
                    }
                  } catch (_0x192544) {}
                }
              }
            }
            _0x11d35d.stats.maxBufferSize = _0x2bbddf;
          }
          _0x12f42e = null;
          _0x11d35d.stats.chunkedInQueue = 0x0;
        };
      }
      for (var _0x35484c in _0x11d35d.pcs) {
        if (_0x11d35d.chunkedTransferChannels[_0x35484c]) {
          if (_0x11d35d.chunkedDetails) {
            var _0x1c2070 = {
              ..._0x11d35d.chunkedDetails
            };
            _0x1c2070.timestamp = Date.now();
            if (_0x1b57ba) {
              try {
                _0x11d35d.chunkedTransferChannels[_0x35484c].send(JSON.stringify(_0x1c2070));
                _0x11d35d.chunkedTransferChannels[_0x35484c].detailsSent = true;
              } catch (_0x5c371c) {}
            } else {
              if (!_0x11d35d.chunkedTransferChannels[_0x35484c].detailsSent) {
                try {
                  _0x11d35d.chunkedTransferChannels[_0x35484c].send(JSON.stringify(_0x1c2070));
                  _0x11d35d.chunkedTransferChannels[_0x35484c].detailsSent = true;
                } catch (_0x1fa373) {}
              }
            }
          }
        } else {
          _0x11d35d.chunkedTransferChannels[_0x35484c] = _0x11d35d.pcs[_0x35484c].createDataChannel("chunked", {
            'ordered': true
          });
          _0x11d35d.chunkedTransferChannels[_0x35484c].contentType = "chunks";
          _0x11d35d.chunkedTransferChannels[_0x35484c].binaryType = "arraybuffer";
          _0x11d35d.chunkedTransferChannels[_0x35484c].header = false;
          _0x11d35d.chunkedTransferChannels[_0x35484c].detailsSent = false;
          _0x11d35d.chunkedTransferChannels[_0x35484c].timeOffset = null;
          _0x11d35d.chunkedTransferChannels[_0x35484c].keyframeSent = false;
          _0x11d35d.chunkedTransferChannels[_0x35484c].audioHeaderSent = false;
          _0x11d35d.chunkedTransferChannels[_0x35484c].onopen = () => {
            log("RETRANSMIT chunkedtransfer OPEN");
            if (_0x11d35d.chunkedDetails) {
              var _0x123b6d = {
                ..._0x11d35d.chunkedDetails
              };
              _0x123b6d.timestamp = Date.now();
              _0x11d35d.chunkedTransferChannels[_0x35484c].send(JSON.stringify(_0x123b6d));
              _0x11d35d.chunkedTransferChannels[_0x35484c].detailsSent = true;
            }
          };
          _0x11d35d.chunkedTransferChannels[_0x35484c].onclose = () => {
            try {
              var _0x20866f = _0x11d35d.hostedTransfers.indexOf(_0x11d35d.chunkedTransferChannels[_0x35484c]);
              if (_0x20866f > -0x1) {
                _0x11d35d.hostedTransfers.splice(_0x20866f, 0x1);
              }
            } catch (_0x430994) {
              errorlog(_0x430994);
            }
            log("re-Transfer ended");
            _0x11d35d.chunkedTransferChannels[_0x35484c] = null;
            delete _0x11d35d.chunkedTransferChannels[_0x35484c];
            var _0x4091a0 = false;
            for (var _0x1b08e0 = 0x0; _0x1b08e0 < _0x11d35d.hostedTransfers.length; _0x1b08e0++) {
              if ("contentType" in _0x11d35d.hostedTransfers[_0x1b08e0] && _0x11d35d.hostedTransfers[_0x1b08e0].contentType == "chunks") {
                _0x4091a0 = true;
                break;
              }
            }
          };
          _0x11d35d.chunkedTransferChannels[_0x35484c].onmessage = _0x12d94d => {
            if (_0x12d94d.data) {
              try {
                var _0x126465 = JSON.parse(_0x12d94d.data);
                if (_0x126465.kf) {
                  if (_0x11d35d.chunkedRecorder.upstreamChannel) {
                    _0x11d35d.chunkedRecorder.upstreamChannel.send(JSON.stringify({
                      'kf': true
                    }));
                    warnlog("KEY FRAME will be requested from the seeder on behalf of a seeder ...");
                  } else {
                    errorlog("no upstreamChannel 2");
                  }
                }
              } catch (_0x376980) {}
            }
          };
          _0x11d35d.hostedTransfers.push(_0x11d35d.chunkedTransferChannels[_0x35484c]);
        }
      }
      await _0x11d35d.chunkedRecorder.sendChunks();
    };
    async function _0x3cbd10(_0x3cc1ca = 0x500, _0x2527e5 = 0x2d0, _0x524764 = 0x1e) {
      var _0x158f1e = ["av01.0.04M.08", "vp09.00.10.08", "vp8", "avc1.42001E"];
      var _0x27ebe7 = ['prefer-hardware', "prefer-software"];
      var _0x831c9c = [];
      if (_0x11d35d.alpha) {
        var _0x388fa4 = [];
        var _0x10d707 = 'keep';
        for (var _0x1a843e of _0x158f1e) {
          for (var _0x36a168 of _0x27ebe7) {
            _0x388fa4.push({
              'codec': _0x1a843e,
              'alpha': _0x10d707,
              'hardwareAcceleration': _0x36a168,
              'width': _0x3cc1ca,
              'height': _0x2527e5,
              'bitrate': 0x1e8480,
              'bitrateMode': "constant",
              'framerate': _0x524764,
              'latencyMode': 'realtime'
            });
          }
        }
        for (var _0x4e2b9 = 0x0; _0x4e2b9 < _0x388fa4.length; _0x4e2b9++) {
          var _0x3eff98 = await VideoEncoder.isConfigSupported(_0x388fa4[_0x4e2b9]);
          if (_0x3eff98 && _0x3eff98.supported) {
            _0x831c9c.push(_0x3eff98);
          }
        }
        if (!_0x831c9c.length) {
          if (!_0x11d35d.cleanOutput) {
            warnUser("Notice: Alpha chunked-mode encoding is not supported by this browser.\n\nThe vidoe encoder is falling back to non-alpha mode", 0x1770);
          }
        }
      }
      if (!_0x831c9c.length) {
        var _0x388fa4 = [];
        var _0x10d707 = 'discard';
        for (var _0x1a843e of _0x158f1e) {
          for (var _0x36a168 of _0x27ebe7) {
            _0x388fa4.push({
              'codec': _0x1a843e,
              'alpha': _0x10d707,
              'hardwareAcceleration': _0x36a168,
              'width': _0x3cc1ca,
              'height': _0x2527e5,
              'bitrate': 0x1e8480,
              'bitrateMode': "constant",
              'framerate': _0x524764,
              'latencyMode': "realtime"
            });
          }
        }
        for (var _0x4e2b9 = 0x0; _0x4e2b9 < _0x388fa4.length; _0x4e2b9++) {
          var _0x3eff98 = await VideoEncoder.isConfigSupported(_0x388fa4[_0x4e2b9]);
          if (_0x3eff98 && _0x3eff98.supported) {
            _0x831c9c.push(_0x3eff98);
          }
        }
      }
      return _0x831c9c;
    }
    _0x11d35d.chunkedStream = async function (_0x19e497) {
      log("SENDING CHUNKS TO: " + _0x19e497 + " " + _0x11d35d.chunkedVideoEnabled + " " + _0x11d35d.chunkedAudioEnabled);
      if (!_0x11d35d.chunkedVideoEnabled && _0x11d35d.chunkedRecorder && _0x11d35d.chunkedRecorder.configVideo) {
        await _0x11d35d.webCodec(_0x11d35d.stats.Chunked_video);
      }
      if (!_0x11d35d.chunkedAudioEnabled && _0x11d35d.chunkedRecorder && _0x11d35d.chunkedRecorder.configAudio) {
        await _0x11d35d.webCodecAudio(_0x11d35d.chunkedRecorder.configAudio);
      }
      if (_0x19e497 in _0x11d35d.chunkedTransferChannels) {
        warnlog("UUID in session.chunkedTransferChannels already");
        return;
      } else {
        _0x11d35d.chunkedTransferChannels[_0x19e497] = null;
      }
      if (!_0x11d35d.chunkedRecorder) {
        var _0x301e5e = _0x11d35d.getLocalStream();
        var _0x2b5c4d = _0x11d35d.chunked;
        var _0x28c5e3 = null;
        if (_0x11d35d.maxvideobitrate && _0x11d35d.maxvideobitrate < _0x2b5c4d) {
          _0x2b5c4d = _0x11d35d.maxvideobitrate;
        }
        var _0x55e25c = {
          'codec': 'vp09.00.10.08',
          'width': 0x780,
          'height': 0x438,
          'bitrate': parseInt(_0x2b5c4d * 0x3e8),
          'frameRate': 0x1e,
          'latencyMode': "realtime"
        };
        var _0x5e0a9c = _0x301e5e.getVideoTracks();
        if (_0x5e0a9c.length) {
          var _0x56a10a = _0x5e0a9c[0x0].getSettings();
          if (_0x56a10a.width) {
            _0x55e25c.width = _0x56a10a.width;
          }
          if (_0x56a10a.height) {
            _0x55e25c.height = _0x56a10a.height;
          }
          if (_0x56a10a.frameRate) {
            _0x55e25c.frameRate = _0x56a10a.frameRate;
          }
        } else {
          _0x55e25c = false;
        }
        if (_0x2b5c4d < 0x259) {
          var _0x5b9700 = _0x55e25c.width * _0x55e25c.height / 230400;
          if (_0x5b9700 >= 0x2) {
            _0x55e25c.width = parseInt(_0x55e25c.width / 0x2);
            _0x55e25c.height = parseInt(_0x55e25c.height / 0x2);
          } else if (_0x5b9700 >= 1.5) {
            _0x55e25c.width = parseInt(_0x55e25c.width / 1.5);
            _0x55e25c.height = parseInt(_0x55e25c.height / 1.5);
          }
        }
        try {
          var _0xe5cd8b = await _0x3cbd10(_0x55e25c.width, _0x55e25c.height, _0x55e25c.frameRate);
          if (_0xe5cd8b && _0xe5cd8b.length) {
            _0x55e25c.codec = _0xe5cd8b[0x0].config.codec;
            _0x55e25c.alpha = _0xe5cd8b[0x0].config.alpha;
          }
          console.log(_0xe5cd8b);
        } catch (_0x388f5b) {
          errorlog(_0x388f5b);
        }
        warnlog(_0x55e25c);
        if (_0x55e25c.width == _0x55e25c.height) {
          _0x55e25c.width = 0x280;
          _0x55e25c.height = 0x280;
        }
        var _0x31da12 = {
          'codec': "opus",
          'numberOfChannels': 0x2,
          'channels': 0x2,
          'sampleRate': 0xbb80,
          'bitrate': 0xfa00,
          'tuning': {
            'bitrate': 0xfa00
          }
        };
        if (_0x2b5c4d > 0xbb8) {
          _0x31da12 = {
            'codec': "opus",
            'numberOfChannels': 0x2,
            'channels': 0x2,
            'sampleRate': 0xbb80,
            'tuning': {
              'bitrate': 0x1f400
            }
          };
        } else if (_0x2b5c4d < 0x259) {
          _0x31da12 = {
            'codec': "opus",
            'numberOfChannels': 0x2,
            'channels': 0x2,
            'sampleRate': 0xbb80,
            'tuning': {
              'bitrate': 0x7d00
            }
          };
        }
        if (_0x11d35d.pcm) {
          _0x31da12 = {
            'codec': 'pcm',
            'numberOfChannels': 0x2,
            'channels': 0x2,
            'sampleRate': 0xbb80
          };
        }
        if (!_0x301e5e.getAudioTracks().length) {
          _0x31da12 = false;
        }
        if (!_0x31da12 && !_0x55e25c) {
          warnlog("no video/audio config");
          return;
        }
        warnlog("session.chunkedRecorder set");
        _0x11d35d.chunkedRecorder = {};
        _0x11d35d.chunkedRecorder.needKeyFrame = true;
        _0x11d35d.chunkedRecorder.configVideo = _0x55e25c || false;
        _0x11d35d.chunkedRecorder.configAudio = _0x31da12 || false;
        _0x11d35d.chunkedRecorder.chunkRates = [];
        _0x11d35d.stats.adjustBitrate = _0x11d35d.chunked;
        function _0x3139bc(_0x514010, _0x3de5a2 = 0x9c4, _0x5cd387 = 0x1f4) {
          let _0x3f3a0e = 0x0;
          let _0x2f15de = 0x0;
          let _0x464666 = 0x0;
          let _0x207321 = 0x0;
          for (let _0x3aa8b6 = 0x1; _0x3aa8b6 < _0x514010.length; _0x3aa8b6++) {
            const _0x156fde = _0x514010[_0x3aa8b6 - 0x1];
            const _0x1263cb = _0x514010[_0x3aa8b6];
            _0x3f3a0e += _0x1263cb.byteLength;
            const _0x17440c = _0x156fde.bufferSize - _0x1263cb.bufferSize;
            if (_0x17440c > 0x0) {
              _0x2f15de += _0x17440c;
            }
            _0x464666 += _0x1263cb.timestamp - _0x156fde.timestamp;
            if (_0x1263cb.bufferSize > _0x3de5a2 * _0x5cd387 / 0x8) {
              _0x207321++;
            }
          }
          const _0x168e97 = _0x3f3a0e / (_0x464666 / 0x3e8) * 0x8 / 0x3e8;
          const _0x5175d2 = _0x2f15de / (_0x464666 / 0x3e8) * 0x8 / 0x3e8;
          if (_0x207321 > _0x514010.length / 0x2) {
            return Math.max(_0x5175d2 || _0x3de5a2, _0x3de5a2 * 0.9);
          } else {
            return _0x168e97 < _0x5175d2 ? Math.min(_0x5175d2 || _0x3de5a2, _0x3de5a2 * 1.1) : _0x3de5a2 * 1.0005;
          }
        }
        _0x11d35d.chunkedRecorder.sendChunks = async function (_0x3f0993 = 'null') {
          if (_0x28c5e3) {
            return;
          }
          _0x28c5e3 = true;
          var _0x16c236 = _0x3f0993;
          while (_0x11d35d.chunksQueue.length) {
            if (!Object.keys(_0x11d35d.chunkedTransferChannels).length) {
              _0x11d35d.chunksQueue = [];
              _0x28c5e3 = null;
              _0x11d35d.stats.chunkedInQueue = 0x0;
              _0x11d35d.chunkedRecorder.chunkRates = [];
              return;
            }
            _0x11d35d.stats.chunkedInQueue = _0x11d35d.chunksQueue.length;
            var _0x158760 = 0x0;
            var _0xd61890 = _0x11d35d.chunksQueue.shift();
            if (_0xd61890.length === 0x2) {
              _0x16c236 = _0xd61890[0x1];
              _0xd61890.push(_0x11d35d.chunksQueue.length);
              var _0x380ef0 = JSON.stringify(_0xd61890);
              for (var _0x14c5aa in _0x11d35d.chunkedTransferChannels) {
                if (!_0x11d35d.chunkedTransferChannels[_0x14c5aa]) {
                  continue;
                }
                if ((_0x16c236 == "key" || _0x16c236 == "delta" || _0x16c236 == "video") && !_0x11d35d.pcs[_0x14c5aa].allowVideo) {
                  continue;
                }
                if (!_0x11d35d.pcs[_0x14c5aa]) {
                  continue;
                }
                ;
                if ((_0x16c236 == "audio" || _0x16c236 == 'pcm') && !_0x11d35d.pcs[_0x14c5aa].allowAudio) {
                  continue;
                }
                try {
                  if (_0x11d35d.chunkedTransferChannels[_0x14c5aa].readyState === "open") {
                    _0x11d35d.chunkedTransferChannels[_0x14c5aa].send(_0x380ef0);
                  }
                  _0x11d35d.pcs[_0x14c5aa].stats.bufferedAmount = _0x11d35d.chunkedTransferChannels[_0x14c5aa].bufferedAmount;
                  if (_0x158760 < _0x11d35d.pcs[_0x14c5aa].stats.bufferedAmount) {
                    _0x158760 = _0x11d35d.pcs[_0x14c5aa].stats.bufferedAmount;
                  }
                } catch (_0x17852a) {}
              }
            } else {
              if (_0xd61890.byteLength > 0x40000) {
                for (var _0x14c5aa in _0x11d35d.chunkedTransferChannels) {
                  if (!_0x11d35d.chunkedTransferChannels[_0x14c5aa]) {
                    continue;
                  }
                  if ((_0x16c236 == 'key' || _0x16c236 == "delta" || _0x16c236 == "video") && !_0x11d35d.pcs[_0x14c5aa].allowVideo) {
                    continue;
                  }
                  if (!_0x11d35d.pcs[_0x14c5aa]) {
                    continue;
                  }
                  ;
                  if ((_0x16c236 == "audio" || _0x16c236 == "pcm") && !_0x11d35d.pcs[_0x14c5aa].allowAudio) {
                    continue;
                  }
                  try {
                    if (_0x11d35d.chunkedTransferChannels[_0x14c5aa].readyState === "open") {
                      _0x11d35d.chunkedTransferChannels[_0x14c5aa].send(_0xd61890.slice(0x0, 0x40000));
                    }
                    _0x11d35d.pcs[_0x14c5aa].stats.bufferedAmount = _0x11d35d.chunkedTransferChannels[_0x14c5aa].bufferedAmount;
                    if (_0x158760 < _0x11d35d.pcs[_0x14c5aa].stats.bufferedAmount) {
                      _0x158760 = _0x11d35d.pcs[_0x14c5aa].stats.bufferedAmount;
                    }
                  } catch (_0x4295af) {}
                }
                _0x11d35d.chunksQueue.unshift(_0xd61890.slice(0x40000));
                _0x11d35d.chunkedRecorder.chunkRates.push({
                  'bufferSize': _0x158760,
                  'byteLength': 0x40000,
                  'timestamp': Date.now()
                });
              } else {
                for (var _0x14c5aa in _0x11d35d.chunkedTransferChannels) {
                  if (!_0x11d35d.chunkedTransferChannels[_0x14c5aa]) {
                    continue;
                  }
                  if ((_0x16c236 == 'key' || _0x16c236 == "delta" || _0x16c236 == 'video') && !_0x11d35d.pcs[_0x14c5aa].allowVideo) {
                    continue;
                  }
                  if (!_0x11d35d.pcs[_0x14c5aa]) {
                    continue;
                  }
                  ;
                  if ((_0x16c236 == 'audio' || _0x16c236 == "pcm") && !_0x11d35d.pcs[_0x14c5aa].allowAudio) {
                    continue;
                  }
                  try {
                    if (_0x11d35d.chunkedTransferChannels[_0x14c5aa].readyState === "open") {
                      _0x11d35d.chunkedTransferChannels[_0x14c5aa].send(_0xd61890);
                    }
                    _0x11d35d.pcs[_0x14c5aa].stats.bufferedAmount = _0x11d35d.chunkedTransferChannels[_0x14c5aa].bufferedAmount;
                    if (_0x158760 < _0x11d35d.pcs[_0x14c5aa].stats.bufferedAmount) {
                      _0x158760 = _0x11d35d.pcs[_0x14c5aa].stats.bufferedAmount;
                    }
                  } catch (_0x5a84eb) {}
                }
                _0x11d35d.chunkedRecorder.chunkRates.push({
                  'bufferSize': _0x158760,
                  'byteLength': _0xd61890.byteLength,
                  'timestamp': Date.now()
                });
              }
            }
            _0x11d35d.stats.maxBufferSize = _0x158760;
            _0x11d35d.chunkedRecorder.chunkRates = _0x11d35d.chunkedRecorder.chunkRates.slice(-0x3e8);
            _0x11d35d.stats.adjustBitrate = parseInt(_0x3139bc(_0x11d35d.chunkedRecorder.chunkRates, _0x11d35d.stats.adjustBitrate || _0x11d35d.chunked, 0x1f4)) || _0x11d35d.chunked;
            if (_0x11d35d.stats.adjustBitrate > _0x11d35d.chunked) {
              _0x11d35d.stats.adjustBitrate = _0x11d35d.chunked;
            }
            try {
              if (_0x11d35d.chunkedRecorder && _0x11d35d.chunkedRecorder.videoEncoder) {
                if (_0x11d35d.chunkedRecorder.videoEncoder.state == "closed") {
                  console.log("Video encdoder closed");
                  delete _0x11d35d.chunkedRecorder.videoEncoder;
                  _0x11d35d.chunkedVideoEnabled = null;
                  await _0x11d35d.webCodec();
                }
                if (_0x11d35d.chunkedRecorder && _0x11d35d.chunkedRecorder.videoEncoder && _0x11d35d.chunkedRecorder.videoEncoder.configure && _0x11d35d.chunkedRecorder.videoEncoder.config) {
                  if (_0x11d35d.chunkedRecorder.videoEncoder.config.bitrate && _0x11d35d.stats.adjustBitrate) {
                    _0x11d35d.chunkedRecorder.videoEncoder.config.bitrate = _0x11d35d.stats.adjustBitrate * 0x3e8;
                  }
                  if (_0x11d35d.chunkedRecorder.videoEncoder.config.tuning && _0x11d35d.stats.adjustBitrate) {
                    _0x11d35d.chunkedRecorder.videoEncoder.config.tuning.bitrate = _0x11d35d.stats.adjustBitrate * 0x3e8;
                  }
                  _0x11d35d.chunkedRecorder.videoEncoder.configure(_0x11d35d.chunkedRecorder.videoEncoder.config);
                }
              }
              if (_0x11d35d.chunkedRecorder && _0x11d35d.chunkedRecorder.audioEncoder) {
                if (_0x11d35d.chunkedRecorder.audioEncoder.state == "closed") {
                  console.log("Video encdoder closed");
                  delete _0x11d35d.chunkedRecorder.audioEncoder;
                  _0x11d35d.chunkedAudioEnabled = null;
                  await _0x11d35d.webCodecAudio();
                }
                if (_0x11d35d.chunkedRecorder && _0x11d35d.chunkedRecorder.audioEncoder && _0x11d35d.chunkedRecorder.audioEncoder.configure && _0x11d35d.chunkedRecorder.audioEncoder.config) {
                  _0x11d35d.chunkedRecorder.audioEncoder.configure(_0x11d35d.chunkedRecorder.audioEncoder.config);
                }
              }
            } catch (_0x292eeb) {
              errorlog(_0x292eeb);
              if (_0x11d35d.chunkedTransferChannels) {
                for (var _0x14c5aa in _0x11d35d.chunkedTransferChannels) {
                  _0x11d35d.chunkedTransferChannels[_0x14c5aa].close();
                  if (_0x14c5aa in _0x11d35d.chunkedTransferChannels) {
                    delete _0x11d35d.chunkedTransferChannels[_0x14c5aa];
                  }
                  _0x11d35d.chunkedVideoEnabled = null;
                  _0x11d35d.chunkedAudioEnabled = null;
                  if (_0x11d35d.chunkedRecorder && _0x11d35d.chunkedRecorder.videoEncoder) {
                    try {
                      _0x11d35d.chunkedRecorder.videoEncoder.close();
                    } catch (_0xb61fe5) {}
                    delete _0x11d35d.chunkedRecorder.videoEncoder;
                    await _0x11d35d.webCodec();
                  }
                  if (_0x11d35d.chunkedRecorder && _0x11d35d.chunkedRecorder.audioEncoder) {
                    try {
                      _0x11d35d.chunkedRecorder.audioEncoder.close();
                      delete _0x11d35d.chunkedRecorder.audioEncoder;
                    } catch (_0xb3a8bf) {}
                  }
                  setTimeout(function (_0x287c38) {
                    _0x11d35d.chunkedStream(_0x287c38);
                  }, 0x3e8, _0x14c5aa);
                }
              }
              return;
            }
          }
          _0x28c5e3 = null;
          _0x11d35d.stats.chunkedInQueue = 0x0;
        };
        if (_0x11d35d.chunkedRecorder.configVideo) {
          _0x11d35d.chunkedRecorder.videoPromise = _0x11d35d.webCodec(_0x11d35d.chunkedRecorder.configVideo);
        }
        if (_0x11d35d.chunkedRecorder.configAudio) {
          if (_0x11d35d.chunkedRecorder.configAudio.codec == "pcm") {
            _0x11d35d.getPCM(_0x301e5e, _0x11d35d.chunkedRecorder.configAudio);
          } else {
            _0x11d35d.chunkedRecorder.audioPromise = _0x11d35d.webCodecAudio(_0x11d35d.chunkedRecorder.configAudio);
          }
        }
        _0x301e5e.ended = function (_0x48864a) {
          warnlog("STREAM ENDED");
          log(_0x48864a);
        };
      } else {
        warnlog("session.chunkedRecorder is not false");
      }
      if (_0x11d35d.chunkedRecorder.videoPromise) {
        await _0x11d35d.chunkedRecorder.videoPromise;
        delete _0x11d35d.chunkedRecorder.videoPromise;
      }
      if (_0x11d35d.chunkedRecorder.audioPromise) {
        await _0x11d35d.chunkedRecorder.audioPromise;
        delete _0x11d35d.chunkedRecorder.audioPromise;
      }
      if (_0x19e497 in _0x11d35d.pcs) {
        if (!_0x11d35d.chunkedTransferChannels[_0x19e497]) {
          _0x11d35d.chunkedTransferChannels[_0x19e497] = _0x11d35d.pcs[_0x19e497].createDataChannel("chunked", {
            'ordered': true
          });
        } else {
          errorlog("You might already be connected to this chunked video stream");
          return;
        }
      } else {
        warnlog("UUID does not exist");
        return;
      }
      _0x11d35d.chunkedTransferChannels[_0x19e497].contentType = "chunks";
      _0x11d35d.chunkedTransferChannels[_0x19e497].binaryType = 'arraybuffer';
      _0x11d35d.chunkedTransferChannels[_0x19e497].header = false;
      _0x11d35d.chunkedTransferChannels[_0x19e497].onopen = () => {
        log("chunkedtransfer OPEN");
        if (_0x11d35d.chunkedAudioEnabled && _0x11d35d.chunkedVideoEnabled && _0x11d35d.pcs[_0x19e497].allowAudio && _0x11d35d.pcs[_0x19e497].allowVideo) {
          let _0x4b7290 = {
            'timestamp': Date.now(),
            'type': "chunkedtransfer",
            'realTimeVideo': _0x11d35d.stats.Chunked_video.realTime || 0x0,
            'realTimeAudio': _0x11d35d.stats.Chunked_audio.realTime || 0x0,
            'size': 0x5af3107a3fff,
            'configVideo': _0x11d35d.chunkedRecorder.configVideo,
            'configAudio': _0x11d35d.chunkedRecorder.configAudio,
            'recordType': _0x11d35d.chunked,
            'filename': "chunked.webm",
            'id': "chunked"
          };
          log(_0x4b7290);
          _0x11d35d.chunkedTransferChannels[_0x19e497].send(JSON.stringify(_0x4b7290));
        } else {
          if (_0x11d35d.chunkedAudioEnabled && _0x11d35d.pcs[_0x19e497].allowAudio) {
            let _0x29d62e = {
              'timestamp': Date.now(),
              'type': "chunkedtransfer",
              'realTimeAudio': _0x11d35d.stats.Chunked_audio.realTime || 0x0,
              'size': 0x5af3107a3fff,
              'configAudio': _0x11d35d.chunkedRecorder.configAudio,
              'recordType': _0x11d35d.chunked,
              'filename': "chunked.webm",
              'id': "chunked"
            };
            log(_0x29d62e);
            _0x11d35d.chunkedTransferChannels[_0x19e497].send(JSON.stringify(_0x29d62e));
          } else {
            if (_0x11d35d.chunkedVideoEnabled && _0x11d35d.pcs[_0x19e497].allowVideo) {
              let _0x185cc3 = {
                'timestamp': Date.now(),
                'type': "chunkedtransfer",
                'realTimeVideo': _0x11d35d.stats.Chunked_video.realTime || 0x0,
                'size': 0x5af3107a3fff,
                'configVideo': _0x11d35d.chunkedRecorder.configVideo,
                'recordType': _0x11d35d.chunked,
                'filename': "chunked.webm",
                'id': "chunked"
              };
              log(_0x185cc3);
              _0x11d35d.chunkedTransferChannels[_0x19e497].send(JSON.stringify(_0x185cc3));
            }
          }
        }
      };
      _0x11d35d.chunkedTransferChannels[_0x19e497].onclose = () => {
        try {
          var _0x43deea = _0x11d35d.hostedTransfers.indexOf(_0x11d35d.chunkedTransferChannels[_0x19e497]);
          if (_0x43deea > -0x1) {
            _0x11d35d.hostedTransfers.splice(_0x43deea, 0x1);
          }
        } catch (_0xbb94a8) {
          errorlog(_0xbb94a8);
        }
        log("Transfer ended");
        _0x11d35d.chunkedTransferChannels[_0x19e497] = null;
        delete _0x11d35d.chunkedTransferChannels[_0x19e497];
        var _0x38261c = true;
        for (var _0xd8bad9 = 0x0; _0xd8bad9 < _0x11d35d.hostedTransfers.length; _0xd8bad9++) {
          if ("contentType" in _0x11d35d.hostedTransfers[_0xd8bad9] && _0x11d35d.hostedTransfers[_0xd8bad9].contentType == "chunks") {
            _0x38261c = false;
            break;
          }
        }
        if (_0x38261c) {
          warnlog("Cancelling? no more chunked connections. I probalby shouldn't be stopping if recording also.");
          try {
            _0x11d35d.chunkedRecorder.stop();
          } catch (_0x295f0a) {}
          _0x11d35d.chunkedRecorder = false;
        }
      };
      _0x11d35d.chunkedTransferChannels[_0x19e497].onmessage = _0x380d3e => {
        if (_0x380d3e.data) {
          try {
            var _0x557f21 = JSON.parse(_0x380d3e.data);
            if (_0x557f21.kf) {
              warnlog("chunked-mode KEY FRAME REQUESTED BY A VIEWER");
              _0x11d35d.chunkedRecorder.needKeyFrame = true;
            }
          } catch (_0x409ec7) {}
        }
      };
      _0x11d35d.hostedTransfers.push(_0x11d35d.chunkedTransferChannels[_0x19e497]);
    };
    _0x11d35d.recieveFile = async function (_0x6b890f, _0x376a60, _0x21ef63) {
      log("Created transfer channel");
      var _0x178521 = _0x21ef63;
      _0x178521.binaryType = "arraybuffer";
      var _0x19e4de = 0x0;
      var _0x512c24 = false;
      var _0x4369d6 = false;
      var _0x13bf28 = 0x0;
      var _0x46f000 = {};
      _0x178521.onopen = _0x535b6c => {
        log("Opened transfer channel");
      };
      _0x178521.onmessage = _0x51e00e => {
        if (!_0x512c24) {
          try {
            _0x512c24 = JSON.parse(_0x51e00e.data);
            if (_0x512c24.type == 'filetransfer') {
              var {
                readable: _0x4b3a00,
                writable: _0x416267
              } = new TransformStream({
                'transform': (_0x15c91e, _0x3c70ed) => _0x15c91e.arrayBuffer().then(_0x1350d7 => _0x3c70ed.enqueue(new Uint8Array(_0x1350d7)))
              });
              _0x46f000.writer = _0x416267.getWriter();
              ;
              _0x4b3a00.pipeTo(streamSaver.createWriteStream(_0x512c24.filename));
              for (var _0x21f046 = 0x0; _0x21f046 < transferList.length; _0x21f046++) {
                if (transferList[_0x21f046].id == _0x512c24.id) {
                  transferList[_0x21f046].dc = _0x178521;
                  _0x4369d6 = _0x21f046;
                  transferList[_0x4369d6].status = 0x2;
                  updateDownloadLink(_0x4369d6);
                  break;
                }
              }
            } else {
              errorlog("Not supported; expected 'filetransfer'");
            }
            warnlog(_0x512c24);
            return;
          } catch (_0x4d210a) {
            errorlog(_0x4d210a);
          }
        }
        try {
          var _0x7639fa = _0x51e00e.data;
          if (_0x7639fa == "EOF1") {
            log("Transfer was completed successfully");
            try {
              _0x178521.close();
            } catch (_0x4f238f) {}
            transferList[_0x4369d6].status = 0x3;
            updateDownloadLink(_0x4369d6);
            return;
          } else {
            if (_0x7639fa == "EOF2") {
              warnlog("Transfer was cnacelled by remote user; parital file saved.");
              try {
                _0x178521.close();
              } catch (_0x40fd71) {}
              transferList[_0x4369d6].status = 0x5;
              updateDownloadLink(_0x4369d6);
              return;
            } else {
              try {
                _0x13bf28 += 0x1;
                try {
                  var _0x2509ac = [new Uint8Array(_0x7639fa)];
                  if (_0x46f000.writer) {
                    _0x46f000.writer.write(new Blob(_0x2509ac));
                  } else {}
                } catch (_0x2cc128) {
                  errorlog(_0x2cc128);
                }
                _0x13bf28 -= 0x1;
                _0x19e4de += _0x7639fa.byteLength;
                var _0x290bca = _0x19e4de / _0x512c24.size;
                transferList[_0x4369d6].completed = _0x290bca;
                updateDownloadLink(_0x4369d6);
              } catch (_0x1ce6ed) {
                errorlog(_0x1ce6ed);
              }
              return;
            }
          }
        } catch (_0x226a8b) {
          errorlog(_0x226a8b);
        }
      };
      _0x178521.onclose = _0xa98514 => {
        if (_0x13bf28 <= 0x0) {
          if (_0x46f000.writer) {
            setTimeout(function (_0x477a0a, _0x182ae7) {
              if (_0x182ae7 <= 0x0) {
                _0x477a0a.close();
                _0x477a0a = null;
              } else {
                setTimeout(function (_0x57a3a9, _0x4bb703) {
                  _0x57a3a9.close();
                  _0x57a3a9 = null;
                }, 0x1388, _0x477a0a);
              }
            }, 0x3e8, _0x46f000.writer, _0x13bf28);
          }
        }
        _0x178521 = null;
        return;
      };
      return;
    };
    async function _0x2eafbe(_0x2a7674, _0x3d079c = false) {
      try {
        _0x2a7674.decoder.decode(_0x2a7674.queue.shift());
      } catch (_0x514708) {
        errorlog(_0x514708);
      }
      if (_0x2a7674.nextQueue === null && !_0x3d079c) {
        return;
      }
      _0x2a7674.nextQueue = setTimeout(function (_0x72c12) {
        _0x2eafbe(_0x72c12);
      }, 0x21, _0x2a7674);
    }
    _0x11d35d.recieveChunkedStream = async function (_0x433036, _0x4a4af9) {
      log("Created transfer channel");
      if (!_0x11d35d.rpcs[_0x433036]) {
        errorlog("no pc[UUID] found");
        return;
      }
      if (!_0x11d35d.rpcs[_0x433036].chunkedChannels) {
        _0x11d35d.rpcs[_0x433036].chunkedChannels = [];
      } else {
        _0x11d35d.rpcs[_0x433036].chunkedChannels.forEach(_0x26a82e => {
          if (_0x26a82e.channel) {
            _0x26a82e.channel.close();
          }
        });
      }
      var _0x36224c = false;
      var _0xf7bf8c = {
        channel: _0x4a4af9
      };
      _0x11d35d.rpcs[_0x433036].chunkedChannels.push(_0xf7bf8c);
      _0xf7bf8c.channel.binaryType = 'arraybuffer';
      _0xf7bf8c.channel.onopen = _0x32b67b => {
        log("Opened transfer channel");
      };
      _0xf7bf8c.channel.onclose = async function (_0x2a5e02) {
        if (_0xf7bf8c && _0xf7bf8c.videoWriter) {
          if (_0xf7bf8c && _0xf7bf8c.videoElement.stopWriter) {
            await delay(0x3e8);
            try {
              await _0xf7bf8c.videoElement.stopWriter();
            } catch (_0x2c332c) {}
          }
        }
        if (_0x11d35d.rpcs[_0x433036]) {
          delete _0x11d35d.rpcs[_0x433036].stats.chunked_mode_video;
          delete _0x11d35d.rpcs[_0x433036].stats.chunked_mode_audio;
        }
        return;
      };
      async function _0x2e69eb() {
        var _0x8182f5 = await window.showSaveFilePicker({
          'startIn': "videos",
          'suggestedName': "myVideo.webm",
          'types': [{
            'description': "Video File",
            'accept': {
              'video/webm': ['.webm']
            }
          }]
        });
        var _0x371788 = await _0x8182f5.createWritable();
        _0xf7bf8c.writer_config.fileWriter = _0x371788;
        _0xf7bf8c.videoWriter = new WebMWriter(_0xf7bf8c.writer_config);
        _0xf7bf8c.videoElement.stopWriter = async function (_0x473263 = false) {
          if (_0x473263) {
            _0xf7bf8c.writer_config.fileWriter.close();
            _0xf7bf8c.videoElement.stopWriter = false;
            clearInterval(_0xf7bf8c.updateTime);
            _0xf7bf8c.updateTime = null;
            await _0xf7bf8c.videoWriter.complete();
          } else {
            _0xf7bf8c.videoElement.stopWriter = false;
            clearInterval(_0xf7bf8c.updateTime);
            _0xf7bf8c.updateTime = null;
            await _0xf7bf8c.videoWriter.complete();
            _0xf7bf8c.writer_config.fileWriter.close();
          }
        };
        return _0xf7bf8c.videoWriter;
      }
      _0xf7bf8c.channel.onmessage = async function (_0x21003f) {
        if (!_0x36224c) {
          try {
            let _0x123888 = JSON.parse(_0x21003f.data);
            if (_0x123888.type == "chunkedtransfer") {
              log("GOT CHUNKED DETAILS");
              _0x36224c = _0x123888;
              if (_0x11d35d.retransmit) {
                _0x11d35d.retransmitChunkedStream(_0x36224c, _0xf7bf8c.channel);
              }
              log("CHUNKED DETAILS");
              log(_0x36224c);
              _0xf7bf8c.details = _0x36224c;
              _0xf7bf8c.UUID = _0x433036;
              _0xf7bf8c.completed = 0x0;
              _0xf7bf8c.status = 0x2;
              _0xf7bf8c.time = Date.now();
              _0xf7bf8c.theirtime = _0x36224c.timestamp;
              _0xf7bf8c.timedelta = _0xf7bf8c.time - _0x36224c.timestamp;
              _0xf7bf8c.dc = _0xf7bf8c.channel;
              _0xf7bf8c.id = _0x36224c.id;
              _0xf7bf8c.updateTime = null;
              _0xf7bf8c.buffer = false;
              if (!_0x11d35d.rpcs[_0x433036].videoElement) {
                _0x11d35d.rpcs[_0x433036].videoElement = createVideoElement();
              }
              _0xf7bf8c.videoElement = _0x11d35d.rpcs[_0x433036].videoElement;
              if (!_0x11d35d.rpcs[_0x433036].videoElement.srcObject) {
                _0x11d35d.rpcs[_0x433036].videoElement.srcObject = createMediaStream();
              }
              if (!_0x11d35d.rpcs[_0x433036].streamSrc) {
                _0x11d35d.rpcs[_0x433036].streamSrc = createMediaStream();
              }
              _0xf7bf8c.streamSrc = _0x11d35d.rpcs[_0x433036].streamSrc;
              _0xf7bf8c.videoElement.autoplay = true;
              _0xf7bf8c.videoElement.muted = false;
              _0xf7bf8c.videoElement.setAttribute('playsinline', '');
              _0xf7bf8c.videoElement.dataset.sid = _0x11d35d.rpcs[_0x433036].streamID;
              _0xf7bf8c.videoElement.id = "videosource_" + _0x433036;
              _0xf7bf8c.videoElement.dataset.UUID = _0x433036;
              _0xf7bf8c.videoElement.chunkedtransfer = true;
              if (_0x11d35d.rpcs[_0x433036].mirrorState) {
                applyMirrorGuest(_0x11d35d.rpcs[_0x433036].mirrorState, _0x11d35d.rpcs[_0x433036].videoElement);
              }
              if (_0x11d35d.rpcs[_0x433036].rotate !== false) {
                _0x11d35d.rpcs[_0x433036].videoElement.rotated = _0x11d35d.rpcs[_0x433036].rotate;
              }
              _0xf7bf8c.videoElement.addEventListener("playing", _0x45caf2 => {
                try {
                  var _0xdeff20 = document.getElementById('bigPlayButton');
                  if (_0xdeff20) {
                    _0xdeff20.parentNode.removeChild(_0xdeff20);
                  }
                } catch (_0x446bbb) {}
                _0xf7bf8c.playing = true;
                if (_0xf7bf8c.audioContext) {
                  _0xf7bf8c.audioContext.resume();
                } else if (_0x11d35d.audioCtx) {
                  _0x11d35d.audioCtx.resume();
                }
                try {
                  if (_0x11d35d.pip) {
                    if (v.readyState >= 0x3) {
                      if (!v.pip) {
                        v.pip = true;
                        toggleSystemPip(v, true);
                      }
                    }
                  }
                } catch (_0x504912) {}
              }, {
                'once': true
              });
              _0xf7bf8c.videoElement.addEventListener("error", function (_0x432659) {
                errorlog(_0x432659);
              });
              _0xf7bf8c.videoElement.startWriter = _0x2e69eb;
              _0xf7bf8c.videoElement.oncanplay = function () {
                updateMixer();
              };
              _0xf7bf8c.videoWriter = false;
              _0xf7bf8c.frameMeta = false;
              _0xf7bf8c.writer_config = {};
              _0xf7bf8c.writer_config.video = false;
              _0xf7bf8c.writer_config.audio = false;
              _0xf7bf8c.stream_configVideo = false;
              _0xf7bf8c.stream_configAudio = false;
              _0xf7bf8c.init_video = false;
              _0xf7bf8c.init_audio = false;
              _0xf7bf8c.video = false;
              _0xf7bf8c.audio = false;
              _0xf7bf8c.promise_audio = false;
              _0xf7bf8c.playing = false;
              if (_0x36224c.configVideo) {
                _0x11d35d.rpcs[_0x433036].stats.chunked_mode_video = _0x36224c.configVideo;
                _0xf7bf8c.stream_configVideo = {};
                _0xf7bf8c.stream_configVideo.width = _0x36224c.configVideo.width + '' || '1280';
                _0xf7bf8c.stream_configVideo.height = _0x36224c.configVideo.height + '' || '720';
                _0xf7bf8c.stream_configVideo.codec = _0x36224c.configVideo.codec || 'vp09.00.10.08';
                _0xf7bf8c.writer_config.video = true;
                _0xf7bf8c.writer_config.width = parseInt(_0xf7bf8c.stream_configVideo.width);
                _0xf7bf8c.writer_config.height = parseInt(_0xf7bf8c.stream_configVideo.height);
                if (_0x36224c.configVideo.codec == "vp09.00.10.08") {
                  _0xf7bf8c.writer_config.codec = "VP9";
                } else {
                  if (_0x36224c.configVideo.codec == "av01.0.04M.08") {
                    _0xf7bf8c.writer_config.codec = "AV1";
                  } else {
                    if (_0x36224c.configVideo.codec == 'av1') {
                      _0xf7bf8c.writer_config.codec = "AV1";
                    } else {
                      if (_0x36224c.configVideo.codec == "vp9") {
                        _0xf7bf8c.writer_config.codec = 'VP8';
                      } else if (_0x36224c.configVideo.codec == 'h264') {
                        _0xf7bf8c.writer_config.codec = 'H264';
                      } else {
                        _0xf7bf8c.writer_config.codec = "VP9";
                      }
                    }
                  }
                }
                _0xf7bf8c.init_video = {
                  'output': _0x17154c => {
                    try {
                      _0xf7bf8c.video.frameWriter.write(_0x17154c)["catch"](_0x264163 => {});
                    } catch (_0x16ff69) {}
                  },
                  'error': _0x5f094a => {
                    if (_0xf7bf8c.video.decoder.state == 'closed') {
                      errorlog(_0x5f094a.message);
                      warnlog("CLOSED");
                    } else {
                      errorlog(_0x5f094a.message);
                    }
                  }
                };
                _0xf7bf8c.video = {};
                _0xf7bf8c.video.generator = new MediaStreamTrackGenerator({
                  'kind': "video"
                });
                _0xf7bf8c.video.stream = new MediaStream([_0xf7bf8c.video.generator]);
                _0xf7bf8c.video.frameWriter = _0xf7bf8c.video.generator.writable.getWriter();
                _0xf7bf8c.video.decoder = new VideoDecoder(_0xf7bf8c.init_video);
                _0xf7bf8c.video.decoder.configure(_0xf7bf8c.stream_configVideo);
                _0xf7bf8c.video.queue = [];
                _0xf7bf8c.video.nextQueue = null;
                _0xf7bf8c.video.playbackheader = false;
                _0xf7bf8c.video.header = false;
                if ("realTimeVideo" in _0x36224c) {
                  _0xf7bf8c.video.realTime = _0x36224c.realTimeVideo;
                }
                _0xf7bf8c.streamSrc.addTrack(_0xf7bf8c.video.stream.getVideoTracks()[0x0]);
              }
              if (_0x36224c.configAudio) {
                _0x11d35d.rpcs[_0x433036].stats.chunked_mode_audio = _0x36224c.configAudio;
                _0xf7bf8c.stream_configAudio = _0x36224c.configAudio;
                _0xf7bf8c.writer_config.audio = true;
                _0xf7bf8c.writer_config.samplingFrequency = _0x36224c.configAudio.sampleRate || 0xbb80;
                _0xf7bf8c.writer_config.channels = _0x36224c.configAudio.numberOfChannels || 0x1;
                if (_0xf7bf8c.stream_configAudio.codec && _0xf7bf8c.stream_configAudio.codec == "pcm") {
                  if (!_0xf7bf8c.destination) {
                    _0xf7bf8c.destination = _0x11d35d.audioCtx.createMediaStreamDestination();
                  } else {
                    _0xf7bf8c.streamSrc.getAudioTracks().forEach(_0x240f8d => {
                      _0xf7bf8c.streamSrc.removeTrack(_0x240f8d);
                    });
                  }
                  _0xf7bf8c.destination.stream.getAudioTracks().forEach(_0x184a4c => {
                    _0xf7bf8c.streamSrc.addTrack(_0x184a4c);
                  });
                  _0xf7bf8c.PCMSource = true;
                } else {
                  if (!_0xf7bf8c.audio) {
                    _0xf7bf8c.audio = {};
                  }
                  _0xf7bf8c.audio.queue = [];
                  _0xf7bf8c.audio.nextQueue = null;
                  if ("realTimeAudio" in _0x36224c) {
                    _0xf7bf8c.audio.realTime = _0x36224c.realTimeAudio;
                  } else {
                    errorlog("No realtime");
                  }
                  _0xf7bf8c.init_audio = {
                    'output': _0x57e481 => {
                      _0xf7bf8c.audio.frameWriter.write(_0x57e481);
                      if (_0xf7bf8c.audioTime) {
                        return;
                      }
                      if (!_0x57e481.timestamp) {
                        warnlog(_0x57e481);
                      } else if (!_0xf7bf8c.timedelta || !_0xf7bf8c.audio.realTime) {
                        warnlog(_0xf7bf8c);
                      }
                      var _0x38b24c = (_0x57e481.timestamp || 0x0) / 0x3e8 - (Date.now() - (_0xf7bf8c.timedelta || 0x0) - (_0xf7bf8c.audio.realTime || 0x0));
                      _0x38b24c = _0x38b24c - (_0x11d35d.audioCtx.baseLatency || 0x0) * 0x3e8 - (_0x11d35d.audioCtx.outputLatency || 0x0) * 0x3e8;
                      var _0x1a2193 = 0x3e7;
                      if (!_0x11d35d.rpcs[_0xf7bf8c.UUID]) {
                        return;
                      } else {
                        if (_0x11d35d.rpcs[_0xf7bf8c.UUID].buffer !== false) {
                          _0x1a2193 = _0x11d35d.rpcs[_0xf7bf8c.UUID].buffer;
                        } else if (_0x11d35d.buffer !== false) {
                          _0x1a2193 = _0x11d35d.buffer;
                        } else {
                          _0x11d35d.rpcs[_0xf7bf8c.UUID].buffer = _0x1a2193;
                        }
                      }
                      _0x38b24c += _0x1a2193 - 0x78;
                      _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_audio.buffer_dateNow = Date.now();
                      _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_audio.buffer_timedelta = _0xf7bf8c.timedelta;
                      _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_audio.buffer_realTime = _0xf7bf8c.audio.realTime;
                      _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_audio.buffer_timestamp = _0x57e481.timestamp;
                      _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_audio.buffer_delta = _0x38b24c;
                      _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_audio.buffer_buffer = _0x1a2193;
                      _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_audio.buffer_baseLatency = (_0x11d35d.audioCtx.baseLatency || 0x0) * 0x3e8;
                      _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_audio.buffer_outputLatency = (_0x11d35d.audioCtx.outputLatency || 0x0) * 0x3e8;
                      if (_0x38b24c <= 0x0) {
                        _0x38b24c = 0x0;
                      }
                      try {
                        _0xf7bf8c.delayNode.delayTime.setValueAtTime(parseFloat(_0x38b24c / 0x3e8), _0x11d35d.audioCtx.currentTime);
                      } catch (_0x55789e) {
                        log(_0x38b24c);
                        errorlog(_0x55789e);
                      }
                      _0xf7bf8c.audioTime = setTimeout(function () {
                        _0xf7bf8c.audioTime = null;
                      }, _0x38b24c);
                    },
                    'error': _0x68ab80 => {
                      if (_0xf7bf8c.audio.decoder.state == "closed") {
                        errorlog(_0x68ab80.message);
                        warnlog('CLOSED');
                      } else {
                        errorlog(_0x68ab80.message);
                      }
                    }
                  };
                  _0xf7bf8c.audio.decoder = new AudioDecoder(_0xf7bf8c.init_audio);
                  _0xf7bf8c.audio.decoder.configure(_0xf7bf8c.stream_configAudio);
                  _0xf7bf8c.audio.generator = new MediaStreamTrackGenerator({
                    'kind': 'audio'
                  });
                  _0xf7bf8c.audio.frameWriter = _0xf7bf8c.audio.generator.writable.getWriter();
                  _0xf7bf8c.audio.stream = new MediaStream([_0xf7bf8c.audio.generator]);
                  _0xf7bf8c.audio.audioNode = _0x11d35d.audioCtx.createMediaStreamSource(_0xf7bf8c.audio.stream);
                  _0xf7bf8c.delayNode = _0x11d35d.audioCtx.createDelay(0x1e);
                  _0xf7bf8c.delayNode.delayTime.value = 0x0;
                  _0xf7bf8c.audio.audioNode.connect(_0xf7bf8c.delayNode);
                  _0xf7bf8c.destination = _0x11d35d.audioCtx.createMediaStreamDestination();
                  _0xf7bf8c.delayNode.connect(_0xf7bf8c.destination);
                  _0xf7bf8c.destination.stream.getAudioTracks().forEach(_0x4f6f25 => {
                    _0xf7bf8c.streamSrc.addTrack(_0x4f6f25);
                  });
                }
              }
              warnlog(_0x36224c);
              setupIncomingVideoTracking(_0x11d35d.rpcs[_0x433036].videoElement, _0x433036);
              if (_0xf7bf8c.audio && _0xf7bf8c.video) {
                updateIncomingVideoElement(_0x433036);
              } else {
                if (_0xf7bf8c.video) {
                  updateIncomingVideoElement(_0x433036, true, false);
                } else if (_0xf7bf8c.audio) {
                  updateIncomingVideoElement(_0x433036, false, true);
                }
              }
              _0xf7bf8c.processFrame = async function (_0x4bb0e6) {
                if (isIFrame && "timestamp" in _0x4bb0e6 && _0x11d35d.rpcs[_0x433036]) {
                  pokeIframeAPI('chunked-inbound', {
                    'UUID': _0x433036,
                    'streamID': _0x11d35d.rpcs[_0x433036].streamID,
                    'type': _0x4bb0e6.type,
                    'ts': _0x4bb0e6.timestamp
                  });
                }
                if (_0x4bb0e6.type == "audio") {
                  try {
                    _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_audio.time_seconds = parseInt(_0x4bb0e6.timestamp / 0x2710) / 0x64;
                  } catch (_0x2d8251) {
                    console.error("time_second missing");
                    return;
                  }
                  _0xf7bf8c.processFrameAudio(_0x4bb0e6);
                } else {
                  if (_0x4bb0e6.type == "pcm") {
                    var _0xf5db72 = _0x11d35d.audioCtx.createBufferSource();
                    _0xf5db72.connect(_0xf7bf8c.destination);
                    _0xf5db72.onended = function () {
                      this.disconnect();
                    };
                    var _0x21b864 = _0x11d35d.audioCtx.createBuffer(0x2, _0x4bb0e6.data.length, _0x11d35d.audioCtx.sampleRate / 0x2);
                    _0xf5db72.buffer = _0x21b864;
                    _0xf5db72.start(0x0);
                  } else {
                    _0x11d35d.rpcs[_0xf7bf8c.UUID].stats.chunked_mode_video.time_seconds = parseInt(_0x4bb0e6.timestamp / 0x2710) / 0x64;
                    _0xf7bf8c.processFrameVideo(_0x4bb0e6);
                  }
                }
              };
              _0xf7bf8c.processFrameVideo = async function (_0x40f590) {
                try {
                  if (_0x40f590.type) {
                    _0x40f590 = new EncodedVideoChunk(_0x40f590);
                  } else {
                    errorlog("dataframe has no type");
                  }
                } catch (_0x153aad) {
                  errorlog(_0x153aad);
                  errorlog(_0x40f590);
                  return;
                }
                if (_0xf7bf8c.videoWriter && _0xf7bf8c.videoElement.stopWriter) {
                  if (!_0xf7bf8c.video.header && _0x40f590.type !== "key") {
                    log("waiting for keyframe");
                    log(_0x40f590);
                    if (!_0xf7bf8c.requestKeyframe) {
                      _0xf7bf8c.dc.send(JSON.stringify({
                        'kf': true
                      }));
                      _0xf7bf8c.requestKeyframe = setTimeout(function () {
                        clearTimeout(_0xf7bf8c.requestKeyframe);
                        _0xf7bf8c.requestKeyframe = null;
                      }, 0x3e8);
                    }
                  } else if (!_0xf7bf8c.video.header) {
                    _0xf7bf8c.video.header = Date.now();
                    _0xf7bf8c.videoWriter.addFrame(_0x40f590);
                    log("start writing frames");
                    if (_0x11d35d.director && !_0xf7bf8c.updateTime) {
                      _0xf7bf8c.updateTime = setInterval(function (_0x215324) {
                        var _0x5d14b9 = (Date.now() - _0xf7bf8c.video.header) / 0x3e8;
                        var _0x311392 = Math.floor(_0x5d14b9 / 0x3c);
                        var _0x325e41 = Math.floor(_0x5d14b9 - _0x311392 * 0x3c);
                        try {
                          document.querySelector("[data-action-type='recorder-local'][data--u-u-i-d='" + _0x215324 + "']").innerHTML = "<i class=\"las la-stop-circle\"></i> " + _0x311392 + "m : " + zpadTime(_0x325e41) + 's';
                        } catch (_0x319b1b) {
                          log("not record button detected; can't update time since started recording");
                        }
                      }, 0x3e8, _0xf7bf8c.UUID);
                    }
                  } else {
                    _0xf7bf8c.videoWriter.addFrame(_0x40f590);
                  }
                }
                if (_0xf7bf8c.video.playbackheader && _0xf7bf8c.video && _0xf7bf8c.video.decoder.state === "closed") {
                  warnlog("Restarting since closed");
                  _0xf7bf8c.video.playbackheader = false;
                  _0xf7bf8c.video.decoder = new VideoDecoder(_0xf7bf8c.init_video);
                  await _0xf7bf8c.video.decoder.configure(_0xf7bf8c.stream_configVideo);
                  _0xf7bf8c.video.playbackheader = false;
                }
                if (_0xf7bf8c.video.playbackheader || _0x40f590.type === "key") {
                  _0xf7bf8c.video.playbackheader = true;
                  try {
                    if (_0xf7bf8c.video.nextQueue) {
                      _0xf7bf8c.video.queue.push(_0x40f590);
                    } else {
                      if (_0xf7bf8c.video.queue.length) {
                        _0xf7bf8c.video.queue.push(_0x40f590);
                      } else {
                        if (_0xf7bf8c.video.realTime) {
                          _0xf7bf8c.video.nextQueue = true;
                          function _0x5d991e(_0x108bdf, _0xf49bd) {
                            var _0xcb2ded = _0x108bdf.timestamp / 0x3e8 - (Date.now() - _0xf49bd.timedelta - _0xf49bd.video.realTime);
                            var _0xf0cfeb = 0x3e7;
                            if (!_0x11d35d.rpcs[_0xf49bd.UUID]) {
                              clearTimeout(_0xf49bd.video.nextQueue);
                              _0xf49bd.video.nextQueue = null;
                              _0xf49bd.video.queue = [];
                              return;
                            } else {
                              if (_0x11d35d.rpcs[_0xf49bd.UUID].buffer !== false) {
                                _0xf0cfeb = _0x11d35d.rpcs[_0xf49bd.UUID].buffer;
                              } else if (_0x11d35d.buffer !== false) {
                                _0xf0cfeb = _0x11d35d.buffer;
                              } else {
                                _0x11d35d.rpcs[_0xf49bd.UUID].buffer = _0xf0cfeb;
                              }
                            }
                            _0xcb2ded += _0xf0cfeb;
                            if (_0xcb2ded < 0x0) {
                              _0xcb2ded = 0x0;
                            }
                            if (!_0x11d35d.silence) {
                              _0x11d35d.silence = _0x11d35d.audioCtx.createGain();
                              _0x11d35d.silence.gain.value = 0x0;
                              _0x11d35d.silence.connect(_0x11d35d.audioCtx.destination);
                            }
                            if (!_0xf49bd.vosc) {
                              _0xf49bd.vosc = _0x11d35d.audioCtx.createOscillator();
                              _0xf49bd.vosc.connect(_0x11d35d.silence);
                              _0xf49bd.vosc.start(0x0);
                              _0xf49bd.vosc.onended = function (_0x3bbb31) {
                                this.disconnect();
                                try {
                                  _0xf49bd.video.decoder.decode(_0x108bdf);
                                } catch (_0x12ef6e) {
                                  errorlog(_0x12ef6e);
                                }
                                _0xf49bd.vosc = false;
                                if (_0xf49bd.video.queue.length) {
                                  _0x5d991e(_0xf49bd.video.queue.shift(), _0xf49bd);
                                } else {
                                  _0xf49bd.video.nextQueue = null;
                                }
                              };
                              _0xf49bd.vosc.stop(_0x11d35d.audioCtx.currentTime + _0xcb2ded / 0x3e8);
                            }
                          }
                          try {
                            _0x5d991e(_0x40f590, _0xf7bf8c);
                          } catch (_0x16e6c9) {
                            errorlog(_0x16e6c9);
                            _0xf7bf8c.video.nextQueue = null;
                            if (!_0xf7bf8c.requestKeyframe) {
                              _0xf7bf8c.dc.send(JSON.stringify({
                                'kf': true
                              }));
                              _0xf7bf8c.requestKeyframe = setTimeout(function () {
                                clearTimeout(_0xf7bf8c.requestKeyframe);
                                _0xf7bf8c.requestKeyframe = null;
                              }, 0x3e8);
                            }
                          }
                        } else {
                          try {
                            _0xf7bf8c.video.decoder.decode(_0x40f590);
                          } catch (_0x1fa5b2) {
                            errorlog(_0x1fa5b2);
                          }
                        }
                      }
                    }
                  } catch (_0x2e1e22) {
                    errorlog(_0x2e1e22);
                    _0xf7bf8c.video.playbackheader = false;
                  }
                }
                if (_0xf7bf8c.video.decoder.decodeQueueSize) {
                  console.log("decodeQueueSize: " + _0xf7bf8c.video.decoder.decodeQueueSize);
                }
                if (!_0xf7bf8c.video.playbackheader) {
                  if (!_0xf7bf8c.requestKeyframe) {
                    _0xf7bf8c.dc.send(JSON.stringify({
                      'kf': true
                    }));
                    _0xf7bf8c.requestKeyframe = setTimeout(function () {
                      clearTimeout(_0xf7bf8c.requestKeyframe);
                      _0xf7bf8c.requestKeyframe = null;
                    }, 0x3e8);
                  }
                }
              };
              _0xf7bf8c.processFrameAudio = async function (_0x2d9eac) {
                if (!_0xf7bf8c.audio) {
                  errorlog("Audio isn't setup yet.");
                  return;
                }
                try {
                  _0x2d9eac.type = "key";
                  _0x2d9eac = new EncodedAudioChunk(_0x2d9eac);
                } catch (_0x4ce1c6) {
                  return;
                }
                if (_0xf7bf8c.videoWriter && _0xf7bf8c.video.header && _0xf7bf8c.videoElement.stopWriter) {
                  _0xf7bf8c.videoWriter.addFrame(_0x2d9eac);
                }
                if (_0xf7bf8c.audio.decoder.state === "closed") {
                  _0xf7bf8c.audio.decoder = new AudioDecoder(_0xf7bf8c.init_audio);
                  _0xf7bf8c.audio.decoder.configure(_0xf7bf8c.stream_configAudio);
                }
                try {
                  _0xf7bf8c.audio.decoder.decode(_0x2d9eac);
                } catch (_0xe17279) {
                  errorlog(_0xe17279);
                }
              };
            } else {
              if (_0xf7bf8c.audio && _0x36224c.realTimeAudio) {
                _0xf7bf8c.audio.realTime = _0x36224c.realTimeAudio;
              } else if (_0xf7bf8c.video && _0x36224c.realTimeVideo) {
                _0xf7bf8c.video.realTime = _0x36224c.realTimeVideo;
              } else {
                errorlog(_0x123888);
              }
            }
            return;
          } catch (_0x5b6813) {
            errorlog(_0x5b6813);
          }
        } else if (_0x11d35d.retransmit) {
          _0x11d35d.chunksQueue.push(_0x21003f.data);
          if (_0x11d35d.retransmit) {
            _0x11d35d.retransmitChunkedStream();
          }
        }
        try {
          var _0x1ebbac = _0x21003f.data;
          if (typeof _0x1ebbac == "string") {
            if (_0xf7bf8c.buffer) {
              var _0xe53c0b = new Int8Array(_0x1ebbac.buffer);
              _0xf7bf8c.buffer = false;
              await _0xf7bf8c.processFrame({
                'data': _0xe53c0b,
                'timestamp': _0xf7bf8c.frameMeta[0x0],
                'type': _0xf7bf8c.frameMeta[0x1]
              });
            }
            _0xf7bf8c.frameMeta = JSON.parse(_0x1ebbac);
          } else {
            try {
              if (_0x1ebbac.byteLength >= 0x40000) {
                if (_0xf7bf8c.buffer) {
                  _0x1ebbac = new Int8Array(_0x1ebbac);
                  var _0xe53c0b = new Int8Array(_0xf7bf8c.buffer.length + _0x1ebbac.length);
                  _0xe53c0b.set(_0xf7bf8c.buffer);
                  _0xe53c0b.set(_0x1ebbac, _0xf7bf8c.buffer.length);
                  _0xf7bf8c.buffer = _0xe53c0b;
                } else {
                  _0xf7bf8c.buffer = new Int8Array(_0x1ebbac);
                }
                return;
              } else {
                if (_0xf7bf8c.buffer) {
                  _0x1ebbac = new Int8Array(_0x1ebbac);
                  var _0xe53c0b = new Int8Array(_0xf7bf8c.buffer.length + _0x1ebbac.length);
                  _0xe53c0b.set(_0xf7bf8c.buffer);
                  _0xe53c0b.set(_0x1ebbac, _0xf7bf8c.buffer.length);
                  _0xf7bf8c.buffer = false;
                  await _0xf7bf8c.processFrame({
                    'data': _0xe53c0b,
                    'timestamp': _0xf7bf8c.frameMeta[0x0],
                    'type': _0xf7bf8c.frameMeta[0x1]
                  });
                } else {
                  await _0xf7bf8c.processFrame({
                    'data': new Uint8Array(_0x1ebbac),
                    'timestamp': _0xf7bf8c.frameMeta[0x0],
                    'type': _0xf7bf8c.frameMeta[0x1]
                  });
                  if (_0xf7bf8c.fillDataBuffer) {
                    _0xf7bf8c.fillDataBuffer();
                  }
                }
              }
            } catch (_0x3b448e) {
              errorlog(_0x3b448e);
            }
            return;
          }
        } catch (_0x20956b) {
          errorlog(_0x20956b);
        }
      };
      return;
    };
    _0x11d35d.setupIncoming = async function (_0x4ae5be) {
      log("SETUP INCOMING");
      var _0x1a2973 = _0x4ae5be.UUID;
      if (_0x1a2973 in _0x11d35d.rpcs) {
        if ("session" in _0x4ae5be && _0x4ae5be.session) {
          if (_0x11d35d.rpcs[_0x1a2973].session == _0x4ae5be.session) {
            log("SDP Sessions Match. I assume ADDING TRACKS. RPCS");
            return;
          }
          warnlog("already connected 1");
          _0x11d35d.closeRPC(_0x1a2973);
        }
      } else {
        log("MAKING A NEW RPCS RTC CONNECTION");
      }
      try {
        for (var _0x10a3b1 in _0x11d35d.rpcs) {
          if (_0x11d35d.rpcs[_0x10a3b1].streamID == _0x4ae5be.streamID) {
            if (_0x11d35d.rpcs[_0x10a3b1].whip) {
              errorlog("This stream token is already connected. Are you having a CORS issue? Also, ensure SSL if enforced on your host everywhere.");
            }
            if (_0x11d35d.rpcs[_0x10a3b1].videoElement) {
              _0x11d35d.rpcs[_0x10a3b1].videoElement.style.display = "none";
            }
            warnlog("already connected 2. disconnecting..");
            _0x11d35d.closeRPC(_0x10a3b1);
            if (_0x10a3b1 !== _0x1a2973) {
              if (_0x10a3b1 in _0x11d35d.pcs) {
                if (_0x4ae5be.session && _0x4ae5be.session.substring(0x0, 0x6) !== _0x11d35d.loadoutID) {
                  warnlog("CLOSING SECONDARY CONNECTION; matched stream ID has re-connected");
                  log("closing 20");
                  _0x11d35d.closePC(_0x10a3b1, false);
                } else {
                  warnlog("Websocket connection failed or something; this is a split connection. not ideal, as it could be unstable.");
                }
              }
            }
          }
        }
        if (document.getElementById("mainmenu")) {
          document.getElementById('mainmenu').parentNode.removeChild(document.getElementById("mainmenu"));
          document.querySelectorAll(".hidden2").forEach(_0x188c3c => {
            _0x188c3c.classList.remove("hidden2");
          });
        }
      } catch (_0x440b58) {
        errorlog(_0x440b58);
      }
      if (_0x11d35d.maxpublishers !== false) {
        if (Object.keys(_0x11d35d.rpcs).length >= _0x11d35d.maxpublishers) {
          warnlog("Publisher will be ignored due to max connections already hit");
          return;
        }
      } else {
        if (_0x11d35d.maxconnections !== false) {
          if (Object.keys(_0x11d35d.rpcs).length + Object.keys(_0x11d35d.pcs).length >= _0x11d35d.maxconnections) {
            warnlog("Publisher will be ignored due to max connections already hit");
            return;
          }
        }
      }
      if (_0x11d35d.queue) {
        if (_0x11d35d.director) {
          if (!(_0x1a2973 in _0x11d35d.pcs)) {
            _0x11d35d.offerSDP(_0x1a2973);
          }
        } else {
          if (_0x11d35d.directorList.indexOf(_0x1a2973) == -0x1) {
            return;
          }
        }
      }
      if (!_0x11d35d.configuration) {
        await chooseBestTURN();
      }
      if (_0x11d35d.encodedInsertableStreams) {
        _0x11d35d.configuration.encodedInsertableStreams = true;
      }
      if (_0x11d35d.bundlePolicy) {
        _0x11d35d.configuration.bundlePolicy = _0x11d35d.bundlePolicy;
      }
      try {
        _0x11d35d.rpcs[_0x1a2973] = new RTCPeerConnection(_0x11d35d.configuration);
        if (_0x11d35d.requireencryption && !_0x4ae5be.vector) {
          errorlog("Encryption is required, but none found. Cancelling.");
          errorlog(_0x4ae5be);
          return;
        } else {
          if (!_0x4ae5be.vector && !_0x11d35d.defaultPassword && _0x11d35d.password && !_0x11d35d.unsafe) {
            errorlog("Encryption is required for non-default passwords setups. No encryption found.\n\nNote: If you'd like to allow it regardless, add &unsafe to your URL to allow connections made with a password that does not encryption.");
            errorlog(_0x4ae5be);
            return;
          }
        }
      } catch (_0x204018) {
        if (!_0x11d35d.cleanOutput) {
          warnUser("An RTC error occured.");
        }
        errorlog(_0x204018);
        return;
      }
      if (!_0x4ae5be.vector) {
        if (_0x11d35d.password && _0x11d35d.defaultPassword) {
          warnlog("No vector? uh oh -- might be raspberry ninja or some other simpler implementation, so lets move on. We're using the default password, so we're going to allow it");
          warnlog(_0x4ae5be);
        }
        _0x11d35d.rpcs[_0x1a2973].vector = false;
      } else {
        if (!_0x11d35d.password) {
          errorlog("Handshake has a vector? But we don't have a password. This is probably going to fail...");
          errorlog(_0x4ae5be);
        }
        _0x11d35d.rpcs[_0x1a2973].vector = true;
      }
      if (_0x11d35d.security) {
        if (Object.keys(_0x11d35d.rpcs).length > 0x1) {
          warnlog("TOO MANY PUBLISHING PEERS");
          log(_0x11d35d.rpcs);
          delete _0x11d35d.rpcs[_0x1a2973];
          updateUserList();
          return;
        } else {
          warnlog("CONNECTED TO FIRST PEER");
        }
      }
      if (_0x4ae5be.streamID in _0x11d35d.waitingWatchList) {
        log("deleting watch list");
        delete _0x11d35d.waitingWatchList[_0x4ae5be.streamID];
      }
      try {
        _0x11d35d.rpcs[_0x1a2973].streamID = _0x4ae5be.streamID;
        await checkDirectorStreamID();
      } catch (_0x32a439) {
        errorlog(_0x32a439);
        return;
      }
      if (_0x4ae5be.session) {
        _0x11d35d.rpcs[_0x1a2973].session = _0x4ae5be.session;
      } else {
        _0x11d35d.rpcs[_0x1a2973].session = null;
      }
      _0x11d35d.rpcs[_0x1a2973].getStatsTimeout = null;
      _0x11d35d.rpcs[_0x1a2973].activelySpeaking = false;
      _0x11d35d.rpcs[_0x1a2973].defaultSpeaker = false;
      _0x11d35d.rpcs[_0x1a2973].loudest = false;
      _0x11d35d.rpcs[_0x1a2973].allowMIDI = false;
      _0x11d35d.rpcs[_0x1a2973].allowGraphs = false;
      _0x11d35d.rpcs[_0x1a2973].stats = {};
      _0x11d35d.rpcs[_0x1a2973].slot = false;
      _0x11d35d.rpcs[_0x1a2973].stats.Audio_Loudness = false;
      _0x11d35d.rpcs[_0x1a2973].showDirector = false;
      _0x11d35d.rpcs[_0x1a2973].codirectorRequested = false;
      _0x11d35d.rpcs[_0x1a2973].canvasIntervalAction = null;
      _0x11d35d.rpcs[_0x1a2973].bandwidth = -0x1;
      _0x11d35d.rpcs[_0x1a2973].bandwidthMuted = false;
      _0x11d35d.rpcs[_0x1a2973].buffer = false;
      _0x11d35d.rpcs[_0x1a2973].channelOffset = false;
      _0x11d35d.rpcs[_0x1a2973].channelWidth = false;
      _0x11d35d.rpcs[_0x1a2973].targetBandwidth = -0x1;
      _0x11d35d.rpcs[_0x1a2973].manualBandwidth = false;
      _0x11d35d.rpcs[_0x1a2973].videoElement = false;
      _0x11d35d.rpcs[_0x1a2973].imageElement = false;
      _0x11d35d.rpcs[_0x1a2973].voiceMeter = false;
      _0x11d35d.rpcs[_0x1a2973].group = [];
      _0x11d35d.rpcs[_0x1a2973].videoMuted = false;
      _0x11d35d.rpcs[_0x1a2973].iframeVideo = false;
      _0x11d35d.rpcs[_0x1a2973].lockedVideoBitrate = false;
      _0x11d35d.rpcs[_0x1a2973].lockedAudioBitrate = false;
      _0x11d35d.rpcs[_0x1a2973].virtualHangup = false;
      _0x11d35d.rpcs[_0x1a2973].remoteMuteState = false;
      _0x11d35d.rpcs[_0x1a2973].remoteMuteElement = false;
      _0x11d35d.rpcs[_0x1a2973].closeTimeout = null;
      _0x11d35d.rpcs[_0x1a2973].whep = false;
      _0x11d35d.rpcs[_0x1a2973].mutedState = null;
      _0x11d35d.rpcs[_0x1a2973].mutedStateMixer = null;
      _0x11d35d.rpcs[_0x1a2973].mutedStateScene = null;
      _0x11d35d.rpcs[_0x1a2973].mirrorState = null;
      _0x11d35d.rpcs[_0x1a2973].motionDetectionInterval = false;
      _0x11d35d.rpcs[_0x1a2973].rotate = false;
      _0x11d35d.rpcs[_0x1a2973].savedVolume = false;
      _0x11d35d.rpcs[_0x1a2973].scaleHeight = false;
      _0x11d35d.rpcs[_0x1a2973].scaleWidth = false;
      _0x11d35d.rpcs[_0x1a2973].scaleSnap = false;
      _0x11d35d.rpcs[_0x1a2973].signalMeter = false;
      _0x11d35d.rpcs[_0x1a2973].volumeControl = false;
      _0x11d35d.rpcs[_0x1a2973].streamSrc = null;
      _0x11d35d.rpcs[_0x1a2973].screenIndexes = false;
      _0x11d35d.rpcs[_0x1a2973].screenShareState = false;
      _0x11d35d.rpcs[_0x1a2973].director = null;
      _0x11d35d.rpcs[_0x1a2973].directorVideoMuted = false;
      _0x11d35d.rpcs[_0x1a2973].directorVolumeState = 0x64;
      _0x11d35d.rpcs[_0x1a2973].directorMutedState = 0x0;
      _0x11d35d.rpcs[_0x1a2973].nackCount = 0x0;
      _0x11d35d.rpcs[_0x1a2973].settings = false;
      _0x11d35d.rpcs[_0x1a2973].opacityDisconnect = '1';
      _0x11d35d.rpcs[_0x1a2973].opacityMuted = '1';
      _0x11d35d.rpcs[_0x1a2973].obsControl = false;
      _0x11d35d.rpcs[_0x1a2973].pliCount = 0x0;
      _0x11d35d.rpcs[_0x1a2973].label = false;
      _0x11d35d.rpcs[_0x1a2973].order = false;
      _0x11d35d.rpcs[_0x1a2973].canvasCtx = null;
      _0x11d35d.rpcs[_0x1a2973].canvas = null;
      _0x11d35d.rpcs[_0x1a2973].inboundAudioPipeline = {};
      _0x11d35d.rpcs[_0x1a2973].iframeSrc = false;
      _0x11d35d.rpcs[_0x1a2973].iframeEle = false;
      _0x11d35d.rpcs[_0x1a2973].startTime = Date.now();
      _0x11d35d.rpcs[_0x1a2973].whipCallback = false;
      _0x11d35d.rpcs[_0x1a2973].wssid = _0x11d35d.wssid;
      if (_0x11d35d.activeSpeaker == 0x2 || _0x11d35d.activeSpeaker == 0x4) {
        _0x11d35d.rpcs[_0x1a2973].loudest = true;
      }
      if (_0x11d35d.showall) {
        var _0x59fcc7 = createRichVideoElement(_0x1a2973);
        _0x59fcc7.style.display = "block";
      }
      if (_0x11d35d.director) {
        if (_0x11d35d.customWSS && "isScene" in _0x4ae5be && _0x4ae5be.isScene !== false) {} else {
          var _0x29f38b = soloLinkGenerator(_0x11d35d.rpcs[_0x1a2973].streamID);
          if ("slot" in _0x4ae5be) {
            createControlBox(_0x1a2973, _0x29f38b, _0x11d35d.rpcs[_0x1a2973].streamID, _0x4ae5be.slot);
          } else {
            createControlBox(_0x1a2973, _0x29f38b, _0x11d35d.rpcs[_0x1a2973].streamID);
          }
        }
      }
      _0x11d35d.rpcs[_0x1a2973].UUID = _0x1a2973;
      try {
        if (_0x11d35d.view_set) {
          if (_0x11d35d.view_set.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
            if (_0x11d35d.bitrate_set !== false) {
              let _0x10c05c = _0x11d35d.view_set.indexOf(_0x11d35d.rpcs[_0x1a2973].streamID);
              if (_0x11d35d.bitrate_set.length > _0x10c05c) {
                _0x11d35d.rpcs[_0x1a2973].manualBandwidth = parseInt(_0x11d35d.bitrate_set[_0x10c05c]);
                if (_0x11d35d.rpcs[_0x1a2973].manualBandwidth <= 0x0) {
                  _0x11d35d.rpcs[_0x1a2973].manualBandwidth = false;
                }
              }
            }
          }
        }
      } catch (_0x223361) {
        errorlog(_0x223361);
      }
      _0x11d35d.rpcs[_0x1a2973].onclose = function (_0x4675e6) {
        log("webrtc connectioned closed-event");
        _0x11d35d.closeRPC(_0x1a2973);
      };
      _0x11d35d.rpcs[_0x1a2973].iceTimer = null;
      _0x11d35d.rpcs[_0x1a2973].iceBundle = [];
      _0x11d35d.rpcs[_0x1a2973].onicecandidate = function (_0x3dc79c) {
        if (_0x3dc79c.candidate == null) {
          log("null ice rpcs");
          if (_0x11d35d.rpcs[_0x1a2973] && _0x11d35d.rpcs[_0x1a2973].whipCallback2) {
            _0x11d35d.rpcs[_0x1a2973].whipCallback2([..._0x11d35d.rpcs[_0x1a2973].iceBundle]);
            clearTimeout(_0x11d35d.rpcs[_0x1a2973].iceTimer);
            _0x11d35d.rpcs[_0x1a2973].iceTimer = null;
            _0x11d35d.rpcs[_0x1a2973].iceBundle = [];
            _0x11d35d.rpcs[_0x1a2973].whipCallback2 = null;
            console.log("candidate callback finished in totalilty");
          }
          return;
        }
        try {
          if (_0x11d35d.icefilter) {
            if (_0x3dc79c.candidate.candidate.indexOf(_0x11d35d.icefilter) === -0x1) {
              log("dropped candidate due to filter");
              return;
            } else {
              log(_0x3dc79c.candidate);
            }
          }
        } catch (_0x9d22) {
          errorlog(_0x9d22);
        }
        try {
          if (_0x11d35d.localNetworkOnly) {
            if (!filterIceLAN(_0x3dc79c.candidate)) {
              return;
            }
          }
        } catch (_0x155f87) {
          errorlog(_0x155f87);
        }
        if (_0x11d35d.rpcs[_0x1a2973] && (_0x11d35d.rpcs[_0x1a2973].whipCallback2 || _0x11d35d.rpcs[_0x1a2973].iceTimer !== null)) {
          _0x11d35d.rpcs[_0x1a2973].iceBundle.push(_0x3dc79c.candidate);
          return;
        }
        _0x11d35d.rpcs[_0x1a2973].iceBundle.push(_0x3dc79c.candidate);
        _0x11d35d.rpcs[_0x1a2973].iceTimer = setTimeout(function (_0xfc7876) {
          if (!(_0xfc7876 in _0x11d35d.rpcs)) {
            return;
          }
          if (_0x11d35d.rpcs[_0xfc7876].whipCallback2) {
            return;
          }
          _0x11d35d.rpcs[_0xfc7876].iceTimer = null;
          if (_0x11d35d.rpcs[_0xfc7876].iceBundle == []) {
            return;
          }
          var _0x575beb = {
            "UUID": _0xfc7876,
            "type": "remote",
            candidates: _0x11d35d.rpcs[_0xfc7876].iceBundle,
            "session": _0x11d35d.rpcs[_0xfc7876].session
          };
          _0x11d35d.rpcs[_0xfc7876].iceBundle = [];
          if (_0x11d35d.password && _0x11d35d.rpcs[_0xfc7876].vector) {
            _0x11d35d.encryptMessage(JSON.stringify(_0x575beb.candidates)).then(function (_0x2f9b16) {
              _0x575beb.candidates = _0x2f9b16[0x0];
              _0x575beb.vector = _0x2f9b16[0x1];
              _0x11d35d.anyrequest(_0x575beb);
            })["catch"](errorlog);
          } else {
            _0x11d35d.anyrequest(_0x575beb);
          }
        }, 0x190, _0x1a2973);
      };
      _0x11d35d.rpcs[_0x1a2973].onconnectionstatechange = function (_0x508123) {
        switch (this.connectionState) {
          case 'new':
            log("new");
            log("closeTimeout cancelled; 2");
            clearInterval(_0x11d35d.rpcs[this.UUID].closeTimeout);
          case "checking":
            log("checking");
            log("closeTimeout cancelled; 3");
            clearInterval(_0x11d35d.rpcs[this.UUID].closeTimeout);
          case "connected":
            log("** connected");
            log("closeTimeout cancelled; 4");
            clearInterval(_0x11d35d.rpcs[this.UUID].closeTimeout);
            if (_0x11d35d.security) {
              if (_0x11d35d.ws.readyState !== 0x1) {
                _0x11d35d.ws.close();
                break;
              }
              _0x11d35d.ws.close();
              setTimeout(function () {
                if (_0x11d35d.cleanOutput != true) {
                  warnUser(getTranslation("remote-peer-connected"));
                }
              }, 0x1);
            }
            break;
          case "disconnected":
            log("closeTimeout cancelled; 5");
            warnlog("rpcs onconnectionstatechange Disconnected; retry in 5s");
            if (this.UUID in _0x11d35d.rpcs) {
              clearInterval(_0x11d35d.rpcs[this.UUID].closeTimeout);
              if (_0x11d35d.rpcs[this.UUID].whipCallback) {
                return;
              }
              _0x11d35d.rpcs[this.UUID].closeTimeout = setTimeout(function (_0x34fe82) {
                log("disconnected; no reconnect even after 5s; closing");
                _0x11d35d.closeRPC(_0x34fe82);
              }, 0x1388, this.UUID);
            } else {
              log("UUID not found; can't close.");
            }
            break;
          case "failed":
            warnlog("FAIL rpcs onconnectionstatechange");
            log("closeTimeout cancelled; 6' retry in 3s?");
            if (this.UUID in _0x11d35d.rpcs) {
              clearInterval(_0x11d35d.rpcs[this.UUID].closeTimeout);
              _0x11d35d.rpcs[this.UUID].closeTimeout = setTimeout(function (_0xaf8919) {
                log("No reconnect even after 3s; closing");
                _0x11d35d.closeRPC(_0xaf8919);
              }, 0xbb8, this.UUID);
            } else {
              log("UUID not found; can't close.");
            }
            break;
          case "closed":
            warnlog("RTC closed");
            _0x11d35d.closeRPC(this.UUID);
            break;
          default:
            log("closeTimeout cancelled; 7");
            log("this.connectionState: " + this.connectionState);
            clearInterval(_0x11d35d.rpcs[this.UUID].closeTimeout);
            break;
        }
      };
      _0x11d35d.rpcs[_0x1a2973].onicegatheringstatechange = function (_0x2f1b3b) {
        let _0x1ce5c9 = _0x2f1b3b.target;
        switch (_0x1ce5c9.iceGatheringState) {
          case "gathering":
            log("ICE GATHER START");
            break;
          case "complete":
            log("ICE GATHER COMPLETED");
            if (_0x11d35d.rpcs[_0x1a2973].whipCallback2) {
              _0x11d35d.rpcs[_0x1a2973].whipCallback2([..._0x11d35d.rpcs[_0x1a2973].iceBundle]);
              clearTimeout(_0x11d35d.rpcs[_0x1a2973].iceTimer);
              _0x11d35d.rpcs[_0x1a2973].iceTimer = null;
              _0x11d35d.rpcs[_0x1a2973].iceBundle = [];
              _0x11d35d.rpcs[_0x1a2973].whipCallback2 = null;
            }
            break;
        }
      };
      _0x11d35d.rpcs[_0x1a2973].oniceconnectionstatechange = function () {
        try {
          if (this.iceConnectionState == "closed") {
            errorlog("CLOSED");
          } else {
            if (this.iceConnectionState == "disconnected") {
              if (_0x11d35d.rpcs[_0x1a2973].whipCallback) {
                return;
              }
              warnlog("ICE DISCONNECTED");
              _0x11d35d.rpcs[_0x1a2973].opacityDisconnect = '0';
              _0x11d35d.rpcs[_0x1a2973].videoElement.style.opacity = '0';
              _0x11d35d.rpcs[_0x1a2973].disconnectedTimeout = setTimeout(function (_0x133cc3) {
                updateMixer();
              }, 0x1f4, _0x1a2973);
            } else if (this.iceConnectionState == "failed") {
              errorlog("ICE FAILED");
            } else {
              log("ICE: " + this.iceConnectionState);
              if (_0x11d35d.rpcs[_0x1a2973].disconnectedTimeout) {
                clearTimeout(_0x11d35d.rpcs[_0x1a2973].disconnectedTimeout);
              }
              if (_0x11d35d.rpcs[_0x1a2973].videoElement && "opacity" in _0x11d35d.rpcs[_0x1a2973].videoElement.style) {
                if (_0x11d35d.rpcs[_0x1a2973].opacityDisconnect == '0' && _0x11d35d.rpcs[_0x1a2973].opacityMuted == '1') {
                  _0x11d35d.rpcs[_0x1a2973].videoElement.style.opacity = '1';
                  _0x11d35d.rpcs[_0x1a2973].opacityDisconnect = '1';
                  updateMixer();
                } else {
                  _0x11d35d.rpcs[_0x1a2973].opacityDisconnect = '1';
                }
              } else {
                _0x11d35d.rpcs[_0x1a2973].opacityDisconnect = '1';
              }
            }
          }
        } catch (_0x58fce5) {}
      };
      _0x11d35d.rpcs[_0x1a2973].ondatachannel = function (_0x27aedc) {
        log(_0x27aedc);
        if (_0x27aedc.channel.label && _0x27aedc.channel.label !== "sendChannel") {
          if (_0x11d35d.badStreamList.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
            return;
          }
          if (_0x27aedc.channel.label === "chunked") {
            _0x11d35d.recieveChunkedStream(_0x1a2973, _0x27aedc.channel);
          } else {
            _0x11d35d.recieveFile(_0x11d35d.rpcs, _0x1a2973, _0x27aedc.channel);
          }
          return;
        }
        _0x11d35d.rpcs[_0x1a2973].receiveChannel = _0x27aedc.channel;
        _0x11d35d.rpcs[_0x1a2973].receiveChannel.UUID = _0x1a2973;
        _0x11d35d.rpcs[_0x1a2973].receiveChannel.onerror = _0x490e13 => {
          if (_0x490e13.error && _0x490e13.error.sctpCauseCode && _0x490e13.error.sctpCauseCode !== 0xc) {
            warnlog(_0x490e13);
          }
          log("rtc data channel error 2: " + _0x1a2973);
        };
        _0x11d35d.rpcs[_0x1a2973].receiveChannel.onopen = _0x7fbe25 => {
          var _0x207dac = {};
          _0x207dac.downloads = false;
          _0x207dac.allowmidi = false;
          _0x207dac.iframe = false;
          _0x207dac.widget = false;
          _0x207dac.audio = false;
          _0x207dac.video = false;
          _0x207dac.broadcast = false;
          _0x207dac.allowwebp = false;
          _0x207dac.allowscreenaudio = false;
          _0x207dac.allowscreenvideo = false;
          _0x207dac.allowchunked = false;
          if (_0x11d35d.audioCodec && (_0x11d35d.audioCodec === "red" || _0x11d35d.audioCodec === "lyra")) {
            _0x207dac.preferAudioCodec = _0x11d35d.audioCodec;
          }
          try {
            if (_0x11d35d.allowScreen !== false) {
              if (_0x11d35d.allowScreen === true) {
                _0x207dac.allowscreenaudio = true;
                _0x207dac.allowscreenvideo = true;
              } else if (_0x11d35d.allowScreen.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
                _0x207dac.allowscreenaudio = true;
                _0x207dac.allowscreenvideo = true;
              } else {
                _0x207dac.allowscreenaudio = false;
                _0x207dac.allowscreenvideo = false;
              }
            } else {
              _0x207dac.allowscreenaudio = true;
              _0x207dac.allowscreenvideo = true;
            }
            if (_0x207dac.allowscreenvideo) {
              if (_0x11d35d.novideo !== false) {
                if (!_0x11d35d.novideo.includes(_0x11d35d.rpcs[_0x1a2973].streamID + ':s')) {
                  _0x207dac.allowscreenvideo = false;
                }
              } else {
                if (_0x11d35d.broadcast !== false) {
                  if (_0x11d35d.broadcast !== null) {
                    if (_0x11d35d.rpcs[_0x1a2973].streamID + ':s' === _0x11d35d.broadcast) {
                      _0x207dac.broadcast = true;
                    } else {
                      _0x207dac.allowscreenvideo = false;
                    }
                  } else if (_0x11d35d.directorUUID) {
                    if (_0x1a2973 == _0x11d35d.directorUUID) {
                      _0x207dac.broadcast = true;
                    } else {
                      _0x207dac.allowscreenvideo = false;
                    }
                  }
                } else if (_0x11d35d.exclude !== false) {
                  if (_0x11d35d.exclude.includes(_0x11d35d.rpcs[_0x1a2973].streamID + ':s')) {
                    _0x207dac.video = false;
                  }
                }
              }
            }
            if (_0x207dac.allowscreenaudio) {
              if (_0x11d35d.noaudio !== false) {
                if (!_0x11d35d.noaudio.includes(_0x11d35d.rpcs[_0x1a2973].streamID + ':s')) {
                  _0x207dac.allowscreenaudio = false;
                }
              }
            }
          } catch (_0x4d8a37) {
            errorlog(_0x4d8a37);
          }
          try {
            if (_0x11d35d.novideo !== false) {
              if (_0x11d35d.novideo.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
                _0x207dac.video = true;
              } else {
                _0x207dac.video = false;
              }
            } else {
              if (_0x11d35d.broadcast !== false) {
                if (_0x11d35d.broadcast !== null) {
                  if (_0x11d35d.rpcs[_0x1a2973].streamID === _0x11d35d.broadcast) {
                    _0x207dac.broadcast = true;
                    _0x207dac.video = true;
                  } else {
                    _0x207dac.video = false;
                  }
                } else if (_0x11d35d.directorUUID) {
                  if (_0x1a2973 == _0x11d35d.directorUUID) {
                    _0x207dac.broadcast = true;
                    _0x207dac.video = true;
                  } else {
                    _0x207dac.video = false;
                  }
                }
              } else if (_0x11d35d.exclude !== false) {
                if (_0x11d35d.exclude.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
                  _0x207dac.video = false;
                } else {
                  _0x207dac.video = true;
                }
              } else {
                _0x207dac.video = true;
              }
            }
            if (_0x11d35d.noaudio !== false) {
              if (_0x11d35d.noaudio.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
                _0x207dac.audio = true;
              } else {
                _0x207dac.audio = false;
              }
            } else {
              _0x207dac.audio = true;
            }
            if (_0x11d35d.nodirectoraudio && _0x11d35d.directorList.indexOf(_0x1a2973) >= 0x0) {
              _0x207dac.audio = false;
            }
            if (_0x11d35d.nodirectorvideo && _0x11d35d.directorList.indexOf(_0x1a2973) >= 0x0) {
              _0x207dac.video = false;
            }
            if (_0x11d35d.noiframe !== false) {
              if (_0x11d35d.noiframe.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
                _0x207dac.iframe = true;
              } else {
                _0x207dac.iframe = false;
              }
            } else {
              _0x207dac.iframe = true;
            }
            if (_0x11d35d.noWidget !== false) {
              if (_0x11d35d.noWidget.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
                _0x207dac.widget = true;
              } else {
                _0x207dac.widget = false;
              }
            } else {
              if (_0x11d35d.scene !== false) {
                _0x207dac.widget = false;
              } else if (_0x11d35d.view && !_0x11d35d.director && _0x11d35d.permaid === false) {
                _0x207dac.widget = false;
              } else {
                _0x207dac.widget = true;
              }
            }
            if (_0x11d35d.noMeshcast) {
              _0x207dac.allowmeshcast = false;
            }
            if (_0x11d35d.hideDirector) {
              _0x207dac.hidedirector = _0x11d35d.hideDirector;
            }
            if (_0x11d35d.allowVideos !== false) {
              if (!_0x11d35d.allowVideos.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
                _0x207dac.video = false;
                _0x207dac.audio = false;
              }
            }
            if (_0x11d35d.midiIn || _0x11d35d.midiRemote) {
              _0x207dac.allowmidi = _0x11d35d.midiIn || _0x11d35d.midiRemote;
            }
            _0x207dac.downloads = true;
            if (_0x11d35d.nodownloads) {
              _0x207dac.downloads = false;
            }
            if (_0x11d35d.nochunk) {
              _0x207dac.allowchunked = false;
            } else {
              _0x207dac.allowchunked = true;
            }
            if (_0x11d35d.codec && (_0x11d35d.codec == "webp" || _0x11d35d.codec == "images" || _0x11d35d.codec == "jpeg")) {
              _0x207dac.allowwebp = true;
            }
            if (_0x11d35d.accept_layouts) {
              _0x207dac.layout = true;
            }
            if (_0x11d35d.badStreamList.includes(_0x11d35d.rpcs[_0x1a2973].streamID)) {
              warnlog("new connection is contained in badStreamList! This might be the director's video/audio -> this a scene?");
              _0x207dac.allowmeshcast = false;
              _0x207dac.allowchunked = false;
              _0x207dac.layout = false;
              _0x207dac.downloads = false;
              _0x207dac.allowmidi = false;
              _0x207dac.iframe = false;
              _0x207dac.widget = false;
              _0x207dac.audio = false;
              _0x207dac.video = false;
              _0x207dac.broadcast = false;
              _0x207dac.allowwebp = false;
              _0x207dac.allowscreenaudio = false;
              _0x207dac.allowscreenvideo = false;
            }
          } catch (_0x1df4de) {
            errorlog(_0x1df4de);
          }
          try {
            _0x207dac.info = {};
            _0x207dac.info.label = _0x11d35d.label;
            _0x207dac.info.order = _0x11d35d.order;
            _0x207dac.info.stereo_url = _0x11d35d.stereo;
            _0x207dac.info.vb_url = _0x11d35d.bitrate;
            _0x207dac.info.ab_url = _0x11d35d.audiobitrate;
            _0x207dac.info.codec_url = _0x11d35d.codec;
            if (_0x11d35d.audioCodec) {
              _0x207dac.info.audio_codec_url = _0x11d35d.audioCodec;
            }
            _0x207dac.info.version = _0x11d35d.version;
            _0x207dac.info.forceios = _0x11d35d.forceios;
            _0x207dac.info.enhance_audio = _0x11d35d.enhance;
            _0x207dac.info.ptime = _0x11d35d.ptime;
            _0x207dac.info.minptime = _0x11d35d.minptime;
            _0x207dac.info.maxptime = _0x11d35d.maxptime;
            if (Firefox) {
              _0x207dac.info.firefox = Firefox;
            }
            if (ChromiumVersion) {
              _0x207dac.info.chromium = ChromiumVersion;
            }
            if (SafariVersion) {
              _0x207dac.info.safari = SafariVersion;
            }
            if (navigator && navigator.userAgent) {
              _0x207dac.info.useragent = navigator.userAgent;
            }
            if (navigator && navigator.platform) {
              _0x207dac.info.platform = navigator.platform;
            }
            if (gpgpuSupport) {
              _0x207dac.info.gpGPU = gpgpuSupport;
            }
            if (cpuSupport) {
              _0x207dac.info.CPU = cpuSupport;
            }
            if (_0x11d35d.disableOBS === false) {
              if (window.obsstudio) {
                _0x207dac.info.obs = window.obsstudio.pluginVersion;
                try {
                  _0x207dac = _0x11d35d.getOBSOptimization(_0x207dac, _0x1a2973);
                } catch (_0x1bbfef) {
                  errorlog(_0x1bbfef);
                  warnUser(_0x1bbfef.message);
                }
              } else {
                _0x207dac.info.obs = false;
              }
            } else {
              _0x207dac.info.obs = false;
            }
          } catch (_0x1adedb) {}
          ;
          _0x207dac.guest = false;
          _0x207dac.scene = false;
          _0x207dac.director = false;
          _0x207dac.limitaudio = false;
          _0x207dac.forceios = false;
          if (_0x11d35d.remote) {
            _0x207dac.remote = true;
          }
          if (_0x11d35d.enhance) {
            _0x207dac.enhanceaudio = true;
          }
          if (_0x11d35d.degrade) {
            _0x207dac.degrade = _0x11d35d.degrade;
          }
          if (_0x11d35d.solo) {
            _0x207dac.solo = _0x11d35d.solo;
          }
          if (_0x11d35d.keyframeRate !== false) {
            _0x207dac.keyframeRate = _0x11d35d.keyframeRate;
          }
          if (_0x11d35d.director) {
            _0x207dac.director = true;
            _0x207dac.forceios = _0x11d35d.forceios;
            if (_0x11d35d.directorUUID && _0x11d35d.directorUUID === _0x1a2973) {
              _0x11d35d.newMainDirectorSetup();
            } else {
              var _0x323038 = {
                addCoDirector: []
              };
              for (var _0x6344f7 in _0x11d35d.pcs) {
                if (_0x11d35d.pcs[_0x6344f7].coDirector === true) {
                  _0x323038.addCoDirector.push(_0x6344f7);
                }
              }
              if (_0x323038.addCoDirector.length) {
                _0x207dac.directorSettings = _0x323038;
              }
            }
            if (_0x11d35d.roomTimer && _0x11d35d.roomTimer > 0x0) {
              _0x207dac.setClock = _0x11d35d.roomTimer - Date.now() / 0x3e8;
              _0x207dac.showClock = true;
              _0x207dac.startClock = true;
            } else if (_0x11d35d.roomTimer && _0x11d35d.roomTimer < 0x0) {
              _0x207dac.setClock = _0x11d35d.roomTimer * -0x1;
              _0x207dac.showClock = true;
              _0x207dac.startClock = true;
              _0x207dac.pauseClock = true;
            }
            if (_0x11d35d.showRoomTime) {
              _0x207dac.showTime = true;
            }
          } else {
            if (_0x11d35d.scene !== false) {
              _0x207dac.scene = _0x11d35d.scene;
              if (_0x11d35d.showDirector || _0x11d35d.solo) {
                _0x207dac.showDirector = _0x11d35d.showDirector || _0x11d35d.solo;
              }
            } else if (_0x11d35d.roomid !== false && _0x11d35d.roomid !== '') {
              _0x207dac.forceios = _0x11d35d.forceios;
              _0x207dac.guest = true;
            }
          }
          if (_0x11d35d.scale) {
            _0x207dac.scale = parseFloat(_0x11d35d.scale);
          } else if (_0x11d35d.viewheight || _0x11d35d.viewwidth) {
            _0x207dac.requestResolution = {};
            _0x207dac.requestResolution.h = null;
            _0x207dac.requestResolution.w = null;
            if (_0x11d35d.viewheight) {
              _0x207dac.requestResolution.h = _0x11d35d.viewheight;
              _0x11d35d.rpcs[_0x1a2973].scaleHeight = _0x11d35d.viewheight;
            }
            if (_0x11d35d.viewwidth) {
              _0x207dac.requestResolution.w = _0x11d35d.viewwidth;
              _0x11d35d.rpcs[_0x1a2973].scaleWidth = _0x11d35d.viewwidth;
            }
          }
          if (!_0x11d35d.roomid) {
            if (_0x11d35d.beepToNotify) {
              playtone(false, 'jointone');
              showNotification("There's a new incoming connection.");
            }
          }
          _0x11d35d.rpcs[_0x1a2973].settings = _0x207dac;
          if (_0x11d35d.sendRequest(_0x207dac, _0x1a2973)) {
            log("successfully requested audio and video? maybe?");
          } else {
            errorlog("Failed to request video and audio; iOS device asking?");
          }
          pokeIframeAPI("new-view-connection", true, _0x1a2973);
          pokeIframeAPI("view-connection", true, _0x1a2973);
          pokeAPI("newViewConnection", _0x11d35d.rpcs[_0x1a2973].streamID);
          clearTimeout(_0x11d35d.rpcs[_0x1a2973].getStatsTimeout);
          _0x11d35d.rpcs[_0x1a2973].getStatsTimeout = setTimeout(processStats, 0x0, _0x1a2973);
        };
        _0x11d35d.rpcs[_0x1a2973].receiveChannel.onmessage = async _0x28a4c5 => {
          if (typeof _0x28a4c5.data == "object") {
            if (!_0x11d35d.rpcs[_0x1a2973].imageElement) {
              _0x11d35d.rpcs[_0x1a2973].imageElement = document.createElement("img");
              _0x11d35d.rpcs[_0x1a2973].imageElement.width = 0x10;
              _0x11d35d.rpcs[_0x1a2973].imageElement.height = 0x9;
              _0x11d35d.rpcs[_0x1a2973].imageElement.style.objectFit = "contain";
              _0x11d35d.rpcs[_0x1a2973].imageElement.dataset.UUID = _0x1a2973;
              try {
                _0x11d35d.rpcs[_0x1a2973].imageElement.dataset.sid = _0x11d35d.rpcs[_0x1a2973].streamID;
              } catch (_0x5b9ab3) {}
              _0x11d35d.rpcs[_0x1a2973].imageElement.hidden = false;
              _0x11d35d.rpcs[_0x1a2973].imageElement.addEventListener("click", function (_0x43fc9b) {
                log("clicked");
                try {
                  if (_0x43fc9b.ctrlKey || _0x43fc9b.metaKey) {
                    _0x43fc9b.preventDefault();
                    if (_0x11d35d.statsMenu !== false) {
                      var _0x347ebe = _0x43fc9b.currentTarget.dataset.UUID;
                      if ("stats" in _0x11d35d.rpcs[_0x347ebe]) {
                        var [_0x273c50, _0x58d09c] = statsMenuCreator();
                        printViewStats(_0x58d09c, _0x347ebe);
                        _0x273c50.interval = setInterval(printViewStats, _0x11d35d.statsInterval, _0x58d09c, _0x347ebe);
                      }
                    }
                    _0x43fc9b.stopPropagation();
                    return false;
                  }
                } catch (_0x44961b) {
                  errorlog(_0x44961b);
                }
              });
              updateMixer();
            } else if (_0x11d35d.rpcs[_0x1a2973].imageElement.hidden) {
              _0x11d35d.rpcs[_0x1a2973].imageElement.hidden = false;
              _0x11d35d.rpcs[_0x1a2973].imageElement.style.visibility = "visible";
            }
            _0x11d35d.rpcs[_0x1a2973].imageElement.src = window.URL.createObjectURL(new Blob([new Uint8Array(_0x28a4c5.data)], {
              'type': 'image/webp'
            }));
            return;
          }
          try {
            var _0x34cdb6 = JSON.parse(_0x28a4c5.data);
            _0x34cdb6.UUID = _0x1a2973;
            if ('altUUID' in _0x34cdb6) {
              await _0x11d35d.processRPCSOnMessage(_0x34cdb6, _0x1a2973 + "_screen");
            } else {
              await _0x11d35d.processRPCSOnMessage(_0x34cdb6, _0x1a2973);
            }
          } catch (_0x3c01f0) {
            warnlog('mystery-message-recieved');
            warnlog(_0x28a4c5.data);
          }
        };
        _0x11d35d.processRPCSOnMessage = async function (_0x533f7f, _0x6c92f5) {
          if ("bye" in _0x533f7f) {
            warnlog("BYE RPCS");
            _0x11d35d.closeRPC(_0x6c92f5, true);
            return;
          } else {
            if ("ping" in _0x533f7f) {
              var _0x29977b = {
                "pong": _0x533f7f.ping
              };
              _0x11d35d.sendRequest(_0x29977b, _0x6c92f5);
              warnlog("PINGED");
              return;
            } else {
              if ('pong' in _0x533f7f) {
                warnlog("PONGED");
                return;
              }
            }
          }
          log("incoming message from publisher");
          log(_0x533f7f);
          var _0x4cd73d = false;
          var _0x2838fe = false;
          if ('description' in _0x533f7f) {
            _0x11d35d.processDescription(_0x533f7f);
          } else {
            if ("candidate" in _0x533f7f) {
              _0x533f7f.UUID = _0x6c92f5;
              log("GOT ICE!!");
              _0x11d35d.processIce(_0x533f7f);
            } else if ("candidates" in _0x533f7f) {
              _0x533f7f.UUID = _0x6c92f5;
              log("GOT ICES!!");
              _0x11d35d.processIceBundle(_0x533f7f);
            }
          }
          if ("cbid" in _0x533f7f) {
            _0x19e3bb(_0x533f7f.cbid);
          }
          if ("rejected" in _0x533f7f) {
            if (_0x533f7f.rejected === "requestCoDirector") {
              _0x11d35d.directorState = false;
              if (!_0x11d35d.cleanOutput) {
                warnUser(getTranslation("director-denied"));
                miniTranslate(getById("head4"), 'not-the-director');
              }
            } else {
              if (_0x533f7f.rejected === "requestCoMigrate") {
                if (!_0x11d35d.cleanOutput) {
                  warnUser(getTranslation("only-main-director"), 0xbb8);
                }
              } else {
                if (!_0x11d35d.cleanOutput) {
                  if (_0x11d35d.directorUUID === _0x6c92f5) {
                    warnUser(getTranslation('request-failed'), 0x1388);
                  } else if (_0x11d35d.remote && !_0x11d35d.director) {
                    warnUser(getTranslation("tokens-did-not-match"), 0x1388);
                  } else {
                    warnUser(getTranslation('token-not-director'), 0x1388);
                  }
                } else {
                  if (_0x11d35d.director) {
                    if (!_0x11d35d.cleanOutput) {
                      warnUser("The request (" + _0x533f7f.rejected + ") failed due to permissions or it was rejected by the user", 0x1388);
                    }
                  } else {
                    if (!_0x11d35d.cleanOutput) {
                      if (_0x11d35d.remote) {
                        warnUser(getTranslation("remote-token-rejected"), 0x1388);
                      } else {
                        warnUser(getTranslation("remote-control-failed"), 0x1388);
                      }
                    } else {}
                  }
                }
              }
            }
            errorlog("ACTION REJECTED: " + _0x533f7f.rejected + ", isDirector: " + _0x11d35d.director);
            pokeIframeAPI("rejected", _0x533f7f.rejected, _0x6c92f5);
            return;
          } else {
            if ("approved" in _0x533f7f) {
              if (_0x533f7f.approved === "requestCoDirector") {
                if (_0x11d35d.director) {
                  try {
                    if (_0x11d35d.label === false) {
                      document.title = getTranslation("control-room-co-director");
                    }
                  } catch (_0x50f2bb) {
                    errorlog(_0x50f2bb);
                  }
                  if (!_0x11d35d.cleanOutput && !_0x11d35d.directorState) {
                    warnUser(getTranslation("approved-as-director"), 0xbb8);
                    miniTranslate(getById("head4"), 'you-are-a-codirector');
                    miniTranslate(getById("yourDirectorStatus"), "this-is-you");
                  }
                  if (!_0x11d35d.directorState) {
                    _0x11d35d.directorState = true;
                    pokeAPI("codirector", true);
                    _0x11d35d.initialDirectorSync(_0x6c92f5);
                  }
                }
              }
              log("approved: " + _0x533f7f.approved);
              pokeIframeAPI('approved', _0x533f7f.approved, _0x6c92f5);
              return;
            }
          }
          if ('iframeSrc' in _0x533f7f) {
            try {
              _0x11d35d.rpcs[_0x6c92f5].iframeSrc = _0x533f7f.iframeSrc || false;
              if (_0x11d35d.director) {
                if (_0x11d35d.rpcs[_0x6c92f5].iframeSrc) {
                  var _0x9bf508 = document.createElement("div");
                  _0x9bf508.innerText = _0x11d35d.rpcs[_0x6c92f5].iframeSrc;
                  _0x9bf508.innerText = _0x9bf508.innerHTML;
                  _0x9bf508 = _0x9bf508.textContent || _0x9bf508.innerText || '';
                  getById("iframeDetails_" + _0x6c92f5).innerHTML = "Shared website: <a href='" + _0x9bf508 + "' target='_blank'>" + _0x9bf508 + '</a>';
                  getById("iframeDetails_" + _0x6c92f5).classList.remove("hidden");
                } else {
                  getById("iframeDetails_" + _0x6c92f5).classList.add("hidden");
                  getById("iframeDetails_" + _0x6c92f5).innerText = '';
                }
              } else {
                if (_0x11d35d.rpcs[_0x6c92f5].iframeSrc == false) {
                  try {
                    _0x11d35d.rpcs[_0x6c92f5].iframeEle.remove();
                  } catch (_0x4b7ed5) {
                    errorlog(_0x4b7ed5);
                  }
                  if (_0x11d35d.rpcs[_0x6c92f5].iframeVideo) {
                    _0x11d35d.rpcs[_0x6c92f5].iframeVideo.remove();
                    _0x11d35d.rpcs[_0x6c92f5].iframeVideo = false;
                  }
                  _0x11d35d.rpcs[_0x6c92f5].iframeEle = false;
                  _0x4cd73d = true;
                  if (_0x11d35d.broadcast !== false) {
                    if (_0x11d35d.broadcast !== null) {
                      if (_0x11d35d.rpcs[_0x6c92f5].streamID === _0x11d35d.broadcast) {
                        _0x11d35d.broadcastIFrame = false;
                      }
                    } else if (_0x6c92f5 == _0x11d35d.directorUUID) {
                      _0x11d35d.broadcastIFrame = false;
                    }
                  }
                } else {
                  if (_0x11d35d.broadcast !== false) {
                    if (_0x11d35d.broadcast !== null) {
                      if (_0x11d35d.rpcs[_0x6c92f5].streamID === _0x11d35d.broadcast) {
                        if (_0x11d35d.noiframe === false) {
                          _0x11d35d.rpcs[_0x6c92f5].iframeEle = loadIframe(_0x533f7f.iframeSrc, _0x6c92f5);
                          _0x4cd73d = true;
                          _0x11d35d.broadcastIFrame = _0x11d35d.rpcs[_0x6c92f5].iframeEle;
                          if (_0x11d35d.rpcs[_0x6c92f5].streamID) {
                            _0x11d35d.rpcs[_0x6c92f5].iframeEle.dataset.sid = _0x11d35d.rpcs[_0x6c92f5].streamID;
                          }
                        } else if (_0x11d35d.rpcs[_0x6c92f5].streamID in _0x11d35d.noiframe) {
                          _0x11d35d.rpcs[_0x6c92f5].iframeEle = loadIframe(_0x533f7f.iframeSrc, _0x6c92f5);
                          _0x4cd73d = true;
                          _0x11d35d.broadcastIFrame = _0x11d35d.rpcs[_0x6c92f5].iframeEle;
                          if (_0x11d35d.rpcs[_0x6c92f5].streamID) {
                            _0x11d35d.rpcs[_0x6c92f5].iframeEle.dataset.sid = _0x11d35d.rpcs[_0x6c92f5].streamID;
                          }
                        }
                      }
                    } else {
                      if (_0x11d35d.directorUUID) {
                        if (_0x6c92f5 == _0x11d35d.directorUUID) {
                          if (_0x11d35d.noiframe === false) {
                            _0x11d35d.rpcs[_0x6c92f5].iframeEle = loadIframe(_0x533f7f.iframeSrc, _0x6c92f5);
                            _0x4cd73d = true;
                            _0x11d35d.broadcastIFrame = _0x11d35d.rpcs[_0x6c92f5].iframeEle;
                            if (_0x11d35d.rpcs[_0x6c92f5].streamID) {
                              _0x11d35d.rpcs[_0x6c92f5].iframeEle.dataset.sid = _0x11d35d.rpcs[_0x6c92f5].streamID;
                            }
                          } else if (_0x11d35d.rpcs[_0x6c92f5].streamID in _0x11d35d.noiframe) {
                            _0x11d35d.rpcs[_0x6c92f5].iframeEle = loadIframe(_0x533f7f.iframeSrc, _0x6c92f5);
                            _0x4cd73d = true;
                            _0x11d35d.broadcastIFrame = _0x11d35d.rpcs[_0x6c92f5].iframeEle;
                            if (_0x11d35d.rpcs[_0x6c92f5].streamID) {
                              _0x11d35d.rpcs[_0x6c92f5].iframeEle.dataset.sid = _0x11d35d.rpcs[_0x6c92f5].streamID;
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (_0x11d35d.noiframe === false) {
                      _0x11d35d.rpcs[_0x6c92f5].iframeEle = loadIframe(_0x533f7f.iframeSrc, _0x6c92f5);
                      _0x4cd73d = true;
                      if (_0x11d35d.rpcs[_0x6c92f5].streamID) {
                        _0x11d35d.rpcs[_0x6c92f5].iframeEle.dataset.sid = _0x11d35d.rpcs[_0x6c92f5].streamID;
                      }
                    } else if (_0x11d35d.rpcs[_0x6c92f5].streamID in _0x11d35d.noiframe) {
                      _0x11d35d.rpcs[_0x6c92f5].iframeEle = loadIframe(_0x533f7f.iframeSrc, _0x6c92f5);
                      _0x4cd73d = true;
                      if (_0x11d35d.rpcs[_0x6c92f5].streamID) {
                        _0x11d35d.rpcs[_0x6c92f5].iframeEle.dataset.sid = _0x11d35d.rpcs[_0x6c92f5].streamID;
                      }
                    }
                  }
                }
              }
            } catch (_0x56455e) {
              errorlog(_0x56455e);
            }
          } else {
            if ("ifs" in _0x533f7f) {
              if (_0x11d35d.rpcs[_0x6c92f5].iframeEle) {
                try {
                  if (_0x11d35d.rpcs[_0x6c92f5].iframeSrc.startsWith("https://www.youtube.com/")) {
                    processIframeSyncUpdates(_0x533f7f.ifs, _0x6c92f5);
                  }
                } catch (_0x39719a) {
                  errorlog(_0x39719a);
                }
              }
            }
          }
          if ("remote" in _0x533f7f) {
            try {
              _0x533f7f = await _0x11d35d.decodeRemote(_0x533f7f);
              if (!_0x533f7f) {
                return;
              }
            } catch (_0x26d08c) {
              errorlog(_0x26d08c);
            }
          }
          if ('obsCommand' in _0x533f7f) {
            processOBSCommand(_0x533f7f);
          }
          if ("chat" in _0x533f7f) {
            var _0x34eb34 = false;
            var _0x53a260 = false;
            if (_0x11d35d.directorUUID === _0x6c92f5) {
              _0x34eb34 = true;
              if ("overlay" in _0x533f7f) {
                if (_0x533f7f.overlay == true) {
                  _0x53a260 = true;
                }
              }
            }
            if (_0x11d35d.director) {
              if (_0x533f7f.chat == "Raised hand") {
                if (_0x11d35d.beepToNotify) {
                  playtone();
                }
                getById("hands_" + _0x6c92f5).classList.remove("hidden");
                _0x11d35d.rpcs[_0x6c92f5].remoteRaisedHandElement.classList.remove('hidden');
              } else if (_0x533f7f.chat == "Lowered hand") {
                getById("hands_" + _0x6c92f5).classList.add("hidden");
                _0x11d35d.rpcs[_0x6c92f5].remoteRaisedHandElement.classList.add("hidden");
              }
            }
            log("isDirector " + _0x34eb34);
            getChatMessage(_0x533f7f.chat, _0x11d35d.rpcs[_0x6c92f5].label, _0x34eb34, _0x53a260, _0x6c92f5);
          }
          if ("pipe" in _0x533f7f) {
            _0x11d35d.gotGenericData(_0x533f7f.pipe, _0x6c92f5);
          }
          if ("autoSync" in _0x533f7f) {
            _0x11d35d.autoSyncObject = _0x533f7f.autoSync;
            _0x11d35d.autoSyncCallback(_0x6c92f5);
          }
          if ("effectsData" in _0x533f7f) {
            log(_0x533f7f);
          }
          if ("group" in _0x533f7f) {
            log(_0x533f7f);
            if (_0x533f7f.group) {
              _0x11d35d.rpcs[_0x6c92f5].group = _0x533f7f.group.split(',');
            } else {
              _0x11d35d.rpcs[_0x6c92f5].group = [];
            }
            log(_0x11d35d.rpcs[_0x6c92f5]);
            _0x4cd73d = true;
            if (_0x11d35d.director && _0x11d35d.rpcs[_0x6c92f5].streamID) {
              try {
                syncGroup(_0x11d35d.rpcs[_0x6c92f5].group, _0x6c92f5);
              } catch (_0x5033a7) {
                errorlog(_0x5033a7);
              }
            }
            pokeIframeAPI("remote-group-change", _0x11d35d.rpcs[_0x6c92f5].group, _0x6c92f5);
          }
          if ("transcript" in _0x533f7f) {
            log(_0x533f7f);
            if (_0x11d35d.closedCaptions) {
              if (!_0x11d35d.rpcs[_0x6c92f5].color && _0x11d35d.ccColored) {
                _0x11d35d.rpcs[_0x6c92f5].color = getColorFromName(_0x6c92f5);
              }
              updateClosedCaptions(_0x533f7f, _0x11d35d.rpcs[_0x6c92f5].label, _0x6c92f5, _0x11d35d.rpcs[_0x6c92f5].color);
            }
          }
          if ("allowmidi" in _0x533f7f && _0x533f7f.allowmidi !== false) {
            _0x11d35d.rpcs[_0x6c92f5].allowMIDI = _0x533f7f.allowmidi;
          }
          if (_0x11d35d.director) {
            if ("audioOptions" in _0x533f7f) {
              updateDirectorsAudio(_0x533f7f.audioOptions, _0x6c92f5);
            }
            if ("mediaDevices" in _0x533f7f) {
              gotDevicesRemote(_0x533f7f.mediaDevices, _0x6c92f5);
            }
            if ("videoOptions" in _0x533f7f) {
              updateDirectorsVideo(_0x533f7f.videoOptions, _0x6c92f5);
            }
            if ("recorder" in _0x533f7f) {
              console.log(_0x533f7f);
              updateRemoteRecordButton(_0x6c92f5, _0x533f7f.recorder, _0x533f7f.alt || false);
            }
            if ('gdrive' in _0x533f7f) {
              console.log(_0x533f7f);
              updateGdriveButton(_0x6c92f5, _0x533f7f.gdrive, _0x533f7f.alt || false);
            }
            if ("timer" in _0x533f7f) {
              updateRemoteTimerButton(_0x6c92f5, _0x533f7f.timer);
            }
          }
          if ("whepSettings" in _0x533f7f) {
            whepWatch(_0x6c92f5, _0x533f7f.whepSettings);
          } else if ("meshcast" in _0x533f7f) {
            if (!_0x11d35d.noMeshcast) {
              meshcastWatch(_0x6c92f5, _0x533f7f.meshcast);
            }
          }
          if ("lowerhand" in _0x533f7f) {
            if (_0x11d35d.directorList.indexOf(_0x6c92f5) >= 0x0) {
              if (_0x11d35d.raisehands) {
                lowerhand();
              }
            }
          }
          if ('layout' in _0x533f7f) {
            if (_0x11d35d.viewslot) {} else if (_0x11d35d.directorList.indexOf(_0x6c92f5) >= 0x0) {
              _0x11d35d.layout = _0x533f7f.layout;
              pokeIframeAPI("layout-updated", _0x11d35d.layout);
              _0x4cd73d = true;
            }
          }
          if ("infocus" in _0x533f7f) {
            _0x11d35d.infocus = false;
            _0x11d35d.infocus2 = false;
            if (_0x11d35d.broadcast === false) {
              log(_0x533f7f);
              if (_0x11d35d.directorList.indexOf(_0x6c92f5) >= 0x0) {
                if (_0x533f7f.infocus !== false) {
                  if (_0x533f7f.infocus === _0x11d35d.streamID) {
                    _0x11d35d.infocus = true;
                  } else {
                    if (_0x11d35d.view_set.length && !(_0x533f7f.infocus in _0x11d35d.view_set)) {
                      warnlog("NOT IN VIEW SET");
                      _0x11d35d.infocus = false;
                    } else {
                      if (_0x11d35d.view && _0x11d35d.view !== _0x533f7f.infocus) {
                        warnlog("NOT VIEW TARGET");
                        _0x11d35d.infocus = false;
                      } else {
                        if (_0x11d35d.scene !== false && _0x11d35d.directorUUID && _0x11d35d.directorUUID in _0x11d35d.rpcs && !_0x11d35d.rpcs[_0x11d35d.directorUUID].showDirector && _0x533f7f.infocus === _0x11d35d.rpcs[_0x11d35d.directorUUID].streamID) {
                          warnlog("not allowed to show the director");
                          _0x11d35d.infocus = false;
                        } else {
                          for (var _0x56c74a in _0x11d35d.rpcs) {
                            if (_0x11d35d.rpcs[_0x56c74a].streamID === _0x533f7f.infocus) {
                              _0x11d35d.infocus = _0x56c74a;
                              break;
                            }
                          }
                          warnlog("ON FOCUS NOT FOUND");
                        }
                      }
                    }
                  }
                } else {
                  _0x11d35d.infocus = false;
                }
                _0x4cd73d = true;
                _0x2838fe = true;
                if (_0x11d35d.infocus) {
                  _0x11d35d.infocusForceMode = true;
                } else {
                  _0x11d35d.infocusForceMode = false;
                }
              }
            }
          } else {
            if ("infocus2" in _0x533f7f) {
              _0x11d35d.infocus = false;
              _0x11d35d.infocus2 = false;
              if (_0x11d35d.broadcast === false) {
                log(_0x533f7f);
                if (_0x11d35d.directorList.indexOf(_0x6c92f5) >= 0x0) {
                  if (_0x533f7f.infocus2 !== false) {
                    if (_0x533f7f.infocus2 === _0x11d35d.streamID) {
                      _0x11d35d.infocus2 = true;
                    } else {
                      if (_0x11d35d.view_set.length && !(_0x533f7f.infocus2 in _0x11d35d.view_set)) {
                        warnlog("NOT IN VIEW SET");
                        _0x11d35d.infocus2 = false;
                      } else {
                        if (_0x11d35d.view && _0x11d35d.view !== _0x533f7f.infocus2) {
                          warnlog("NOT VIEW TARGET");
                          _0x11d35d.infocus2 = false;
                        } else {
                          if (_0x11d35d.scene !== false && _0x11d35d.directorUUID && _0x11d35d.directorUUID in _0x11d35d.rpcs && !_0x11d35d.rpcs[_0x11d35d.directorUUID].showDirector && _0x533f7f.infocus2 === _0x11d35d.rpcs[_0x11d35d.directorUUID].streamID) {
                            warnlog("not allowed to show the director");
                            _0x11d35d.infocus2 = false;
                          } else {
                            for (var _0x56c74a in _0x11d35d.rpcs) {
                              if (_0x11d35d.rpcs[_0x56c74a].streamID === _0x533f7f.infocus2) {
                                _0x11d35d.infocus2 = _0x56c74a;
                                break;
                              }
                            }
                            warnlog("ON FOCUS NOT FOUND");
                          }
                        }
                      }
                    }
                  } else {
                    _0x11d35d.infocus2 = false;
                  }
                  if (_0x11d35d.infocus2) {
                    _0x11d35d.infocusForceMode = true;
                  } else {
                    _0x11d35d.infocusForceMode = false;
                  }
                  _0x4cd73d = true;
                  _0x2838fe = true;
                }
              }
            }
          }
          if ("sensors" in _0x533f7f) {
            log(_0x533f7f);
            _0x11d35d.rpcs[_0x6c92f5].stats.sensors = _0x533f7f.sensors;
            if (isIFrame) {
              parent.postMessage({
                'sensors': _0x533f7f.sensors
              }, _0x11d35d.iframetarget);
            }
          }
          if ("midi" in _0x533f7f) {
            playbackMIDI(_0x533f7f.midi);
          }
          if ("fileList" in _0x533f7f && _0x533f7f.fileList) {
            addDownloadLink(_0x533f7f.fileList, _0x6c92f5, _0x11d35d.rpcs);
          }
          if ("rotate_video" in _0x533f7f) {
            if (_0x11d35d.rpcs[_0x6c92f5].rotate !== _0x533f7f.rotate_video) {
              _0x11d35d.rpcs[_0x6c92f5].rotate = _0x533f7f.rotate_video;
              if (_0x11d35d.rpcs[_0x6c92f5].videoElement) {
                _0x11d35d.rpcs[_0x6c92f5].videoElement.rotated = _0x11d35d.rpcs[_0x6c92f5].rotate;
              }
              _0x4cd73d = true;
            }
          }
          if ('info' in _0x533f7f) {
            warnlog(_0x533f7f);
            _0x11d35d.rpcs[_0x6c92f5].stats.info = _0x533f7f.info;
            if (_0x533f7f.info.autoSync) {
              if (!_0x11d35d.autoSyncObject) {
                _0x11d35d.autoSyncObject = _0x533f7f.info.autoSync;
                _0x11d35d.autoSyncCallback(_0x6c92f5);
              }
            }
            if (_0x11d35d.rpcs[_0x6c92f5].signalMeter) {
              if (_0x11d35d.rpcs[_0x6c92f5].stats.info.cpuLimited) {
                _0x11d35d.rpcs[_0x6c92f5].signalMeter.dataset.cpu = '1';
              } else if ("cpuLimited" in _0x11d35d.rpcs[_0x6c92f5].stats.info) {
                _0x11d35d.rpcs[_0x6c92f5].signalMeter.dataset.cpu = '0';
              }
            }
            if ('obs_control' in _0x533f7f.info) {
              if (_0x533f7f.info.obs_control !== false) {
                _0x11d35d.rpcs[_0x6c92f5].obsControl = _0x533f7f.info.obs_control;
                _0x11d35d.obsStateSync("details", _0x6c92f5);
              } else {
                _0x11d35d.rpcs[_0x6c92f5].obsControl = false;
              }
            }
            if ("label" in _0x533f7f.info) {
              try {
                if (typeof _0x533f7f.info.label == "string") {
                  _0x11d35d.rpcs[_0x6c92f5].label = sanitizeLabel(_0x533f7f.info.label);
                } else {
                  _0x11d35d.rpcs[_0x6c92f5].label = false;
                }
                applyStyleEffect(_0x6c92f5);
                if (_0x11d35d.director) {
                  setupGuestLabelControl(_0x6c92f5);
                }
              } catch (_0x5c2483) {
                errorlog(_0x5c2483);
              }
            }
            if ("order" in _0x533f7f.info) {
              try {
                _0x11d35d.rpcs[_0x6c92f5].order = parseInt(_0x533f7f.info.order) || 0x0;
                if (_0x11d35d.director) {
                  var _0x4bdff8 = document.querySelectorAll("[data-action-type=\"order-value\"][data--u-u-i-d=\"" + _0x6c92f5 + "\"]");
                  if (_0x4bdff8[0x0]) {
                    _0x4bdff8[0x0].innerText = _0x11d35d.rpcs[_0x6c92f5].order;
                  }
                }
              } catch (_0x477fde) {
                errorlog(_0x477fde);
              }
            } else {
              _0x11d35d.rpcs[_0x6c92f5].order = 0x0;
            }
            if (_0x533f7f.info.queued) {
              try {
                if (_0x11d35d.director && !_0x11d35d.queue) {
                  var _0x4bdff8 = document.querySelectorAll("[data-action-type=\"remove-queue\"][data--u-u-i-d=\"" + _0x6c92f5 + "\"]");
                  if (_0x4bdff8[0x0]) {
                    _0x4bdff8[0x0].classList.remove("hidden");
                  }
                }
              } catch (_0x2beff6) {
                errorlog(_0x2beff6);
              }
            }
            if (_0x11d35d.rpcs[_0x6c92f5].batteryMeter) {
              try {
                if ("power_level" in _0x533f7f.info) {
                  if (_0x533f7f.info.power_level !== null) {
                    var _0x263741 = _0x11d35d.rpcs[_0x6c92f5].batteryMeter.querySelector(".battery-level");
                    if (_0x263741) {
                      var _0x18847e = parseInt(_0x11d35d.rpcs[_0x6c92f5].stats.info.power_level) || 0x0;
                      if (_0x18847e > 0x64) {
                        _0x18847e = 0x64;
                      }
                      if (_0x18847e < 0x0) {
                        _0x18847e = 0x0;
                      }
                      _0x263741.style.height = parseInt(_0x18847e) + '%';
                      if (_0x18847e < 0xa) {
                        _0x11d35d.rpcs[_0x6c92f5].batteryMeter.classList.remove("warn");
                        _0x11d35d.rpcs[_0x6c92f5].batteryMeter.classList.add("alert");
                      } else if (_0x18847e < 0x19) {
                        _0x11d35d.rpcs[_0x6c92f5].batteryMeter.classList.remove("alert");
                        _0x11d35d.rpcs[_0x6c92f5].batteryMeter.classList.add("warn");
                      } else {
                        _0x11d35d.rpcs[_0x6c92f5].batteryMeter.classList.remove("alert");
                        _0x11d35d.rpcs[_0x6c92f5].batteryMeter.classList.remove("warn");
                      }
                      if (_0x18847e < 0x64) {
                        _0x11d35d.rpcs[_0x6c92f5].batteryMeter.classList.remove('hidden');
                      }
                      _0x11d35d.rpcs[_0x6c92f5].batteryMeter.title = _0x18847e + "% battery remaining";
                    }
                  }
                }
                if ("plugged_in" in _0x533f7f.info) {
                  if (_0x533f7f.info.plugged_in === false) {
                    _0x11d35d.rpcs[_0x6c92f5].batteryMeter.dataset.plugged = '0';
                    _0x11d35d.rpcs[_0x6c92f5].batteryMeter.classList.remove("hidden");
                  } else {
                    _0x11d35d.rpcs[_0x6c92f5].batteryMeter.dataset.plugged = '1';
                  }
                }
              } catch (_0x42358c) {
                errorlog(_0x42358c);
              }
            }
            if ("initial_group" in _0x533f7f.info) {
              try {
                if (_0x533f7f.info.initial_group) {
                  _0x11d35d.rpcs[_0x6c92f5].group = _0x533f7f.info.initial_group.split(',');
                } else {
                  _0x11d35d.rpcs[_0x6c92f5].group = [];
                }
                if (_0x11d35d.director) {
                  initGroupButtons(_0x6c92f5);
                  if (_0x11d35d.rpcs[_0x6c92f5].group.length) {
                    syncGroup(_0x11d35d.rpcs[_0x6c92f5].group, _0x6c92f5);
                  }
                } else {
                  _0x4cd73d = true;
                }
              } catch (_0x51b162) {
                errorlog(_0x51b162);
              }
            }
            if ('muted' in _0x533f7f.info) {
              try {
                _0x11d35d.rpcs[_0x6c92f5].remoteMuteState = _0x533f7f.info.muted;
                if (_0x11d35d.scene === false) {
                  if (_0x11d35d.roomid) {
                    if (!_0x11d35d.cleanOutput || _0x11d35d.director) {
                      if (_0x11d35d.rpcs[_0x6c92f5].remoteMuteElement) {
                        if (_0x11d35d.rpcs[_0x6c92f5].remoteMuteState) {
                          _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.classList.remove("hidden");
                        } else {
                          _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.classList.add("hidden");
                        }
                      } else {
                        _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement = getById('muteStateTemplate').cloneNode(true);
                        _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.id = "remoteMuteState_" + _0x6c92f5;
                        if (_0x11d35d.rpcs[_0x6c92f5].remoteMuteState) {
                          _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.classList.remove("hidden");
                        } else {
                          _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.classList.add("hidden");
                        }
                        _0x4cd73d = true;
                      }
                    }
                  }
                }
                pokeIframeAPI('remote-mute-state', _0x11d35d.rpcs[_0x6c92f5].remoteMuteState, _0x6c92f5);
              } catch (_0x4809e4) {
                errorlog(_0x4809e4);
              }
            }
            if (_0x11d35d.director) {
              try {
                if ("recording_audio_pipeline" in _0x533f7f.info) {
                  if (_0x533f7f.info.recording_audio_pipeline == false) {
                    initRecordingImpossible(_0x6c92f5);
                  }
                }
              } catch (_0x505848) {
                errorlog(_0x505848);
              }
              try {
                if ("recording_audio_gain" in _0x533f7f.info) {
                  if (_0x533f7f.info.recording_audio_gain !== false) {
                    let _0x295ab1 = parseInt(_0x533f7f.info.recording_audio_gain) || 0x0;
                    initAudioButtons(_0x295ab1, _0x6c92f5);
                  }
                }
              } catch (_0x472b22) {
                errorlog(_0x472b22);
              }
              try {
                if ("directorSpeakerMuted" in _0x533f7f.info) {
                  if (_0x533f7f.info.directorSpeakerMuted) {
                    updateRemoteSpeakerMute(_0x6c92f5);
                  }
                }
              } catch (_0x305cbf) {
                errorlog(_0x305cbf);
              }
              try {
                if ("directorDisplayMuted" in _0x533f7f.info) {
                  if (_0x533f7f.info.directorDisplayMuted) {
                    updateRemoteDisplayMute(_0x6c92f5);
                  }
                }
              } catch (_0x1494b5) {
                errorlog(_0x1494b5);
              }
            }
            if ("directorVideoMuted" in _0x533f7f.info) {
              try {
                if (_0x11d35d.director) {
                  if (_0x533f7f.info.directorVideoMuted) {
                    updateDirectorVideoMute(_0x6c92f5);
                  }
                } else {
                  _0x11d35d.rpcs[_0x6c92f5].directorVideoMuted = _0x533f7f.info.directorVideoMuted;
                  if (_0x11d35d.rpcs[_0x6c92f5].directorVideoMuted) {
                    if (_0x6c92f5 in _0x11d35d.rpcs) {
                      _0x11d35d.requestRateLimit(0x0, _0x6c92f5);
                    }
                  }
                }
              } catch (_0x3850fe) {
                errorlog(_0x3850fe);
              }
            }
            if ("directorMirror" in _0x533f7f.info) {
              try {
                if (_0x11d35d.director) {
                  if (_0x533f7f.info.directorMirror) {
                    if (getById('container_' + _0x6c92f5).querySelector("[data-action-type=\"mirror-guest\"]")) {
                      getById("container_" + _0x6c92f5).querySelector("[data-action-type=\"mirror-guest\"]").classList.add("pressed");
                      getById("container_" + _0x6c92f5).querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = "true";
                    }
                  }
                }
                _0x11d35d.rpcs[_0x6c92f5].mirrorState = _0x533f7f.info.directorMirror;
                if (_0x11d35d.rpcs[_0x6c92f5].videoElement) {
                  applyMirrorGuest(_0x11d35d.rpcs[_0x6c92f5].mirrorState, _0x11d35d.rpcs[_0x6c92f5].videoElement);
                }
              } catch (_0x4ac997) {
                errorlog(_0x4ac997);
              }
            }
            if ("video_muted_init" in _0x533f7f.info) {
              try {
                _0x11d35d.rpcs[_0x6c92f5].videoMuted = _0x533f7f.info.video_muted_init;
                if (_0x11d35d.rpcs[_0x6c92f5].videoMuted) {
                  if (_0x11d35d.director) {
                    _0x11d35d.rpcs[_0x6c92f5].remoteVideoMuteElement.classList.remove("hidden");
                  }
                }
                pokeIframeAPI("remote-video-mute-state", _0x11d35d.rpcs[_0x6c92f5].videoMuted, _0x6c92f5);
              } catch (_0x5b08d6) {
                errorlog(_0x5b08d6);
              }
            }
            if ("rotate_video" in _0x533f7f.info) {
              if (_0x11d35d.rpcs[_0x6c92f5].rotate !== _0x533f7f.info.rotate_video) {
                _0x11d35d.rpcs[_0x6c92f5].rotate = _0x533f7f.info.rotate_video;
                if (_0x11d35d.rpcs[_0x6c92f5].videoElement) {
                  _0x11d35d.rpcs[_0x6c92f5].videoElement.rotated = _0x11d35d.rpcs[_0x6c92f5].rotate;
                }
                _0x4cd73d = true;
              }
            }
            if ("room_init" in _0x533f7f.info) {
              if (_0x533f7f.info.room_init === false) {
                soloLinkGeneratorInit(_0x6c92f5);
              }
            }
            directorCoDirectorColoring(_0x6c92f5);
            _0x2838fe = true;
            pokeAPI('details', getDetailedState(_0x11d35d.rpcs[_0x6c92f5].streamID));
            pokeIframeAPI("view-connection-info", _0x533f7f.info, _0x6c92f5);
          }
          if ('miniInfo' in _0x533f7f) {
            if (_0x11d35d.rpcs[_0x6c92f5].stats && _0x11d35d.rpcs[_0x6c92f5].stats.info) {
              processMiniInfoUpdate(_0x533f7f.miniInfo, _0x6c92f5);
            }
          }
          if (_0x533f7f.directorSettings) {
            _0x11d35d.rpcs[_0x6c92f5].director = true;
            if (_0x533f7f.directorSettings.tokenDirector) {
              await checkToken();
            }
            if (_0x11d35d.directorUUID === _0x6c92f5) {
              if ('totalRoomBitrate' in _0x533f7f.directorSettings) {
                _0x11d35d.totalRoomBitrate = parseInt(_0x533f7f.directorSettings.totalRoomBitrate) || 0x0;
                _0x4cd73d = true;
              }
              if (_0x533f7f.directorSettings.soloVideo) {
                if (_0x11d35d.broadcast === false) {
                  if (_0x533f7f.directorSettings.soloVideo === _0x11d35d.streamID) {
                    _0x11d35d.infocus = true;
                  } else {
                    for (var _0x56c74a in _0x11d35d.rpcs) {
                      if (_0x11d35d.rpcs[_0x56c74a].streamID === _0x533f7f.directorSettings.soloVideo) {
                        if ((_0x11d35d.directorList.includes(_0x56c74a) || _0x11d35d.rpcs[_0x56c74a].director) && !_0x11d35d.showDirector) {
                          break;
                        }
                        _0x11d35d.infocus = _0x56c74a;
                        break;
                      }
                    }
                  }
                  _0x4cd73d = true;
                  _0x2838fe = true;
                }
              }
              if ('showDirector' in _0x533f7f.directorSettings) {
                if (_0x11d35d.scene !== false) {
                  if (_0x11d35d.showDirector) {
                    _0x11d35d.rpcs[_0x6c92f5].showDirector = _0x11d35d.showDirector;
                  } else if (_0x533f7f.directorSettings.showDirector) {
                    _0x11d35d.rpcs[_0x6c92f5].showDirector = _0x533f7f.directorSettings.showDirector;
                  }
                }
              }
              if (_0x11d35d.scene !== false) {
                if (_0x533f7f.directorSettings.scene) {
                  for (var _0x56c74a in _0x533f7f.directorSettings.scene) {
                    setTimeout(function (_0x4578b2) {
                      _0x11d35d.directorActions(_0x4578b2);
                    }, 0x3e8, _0x533f7f.directorSettings.scene[_0x56c74a]);
                  }
                }
                if (_0x533f7f.directorSettings.mute) {
                  for (var _0x56c74a in _0x533f7f.directorSettings.mute) {
                    setTimeout(function (_0x4b3e99) {
                      _0x11d35d.directorActions(_0x4b3e99);
                    }, 0x3e8, _0x533f7f.directorSettings.mute[_0x56c74a]);
                  }
                }
              }
              if ('addCoDirector' in _0x533f7f.directorSettings) {
                for (var _0x443b5f = 0x0; _0x443b5f < _0x533f7f.directorSettings.addCoDirector.length; _0x443b5f++) {
                  if (!_0x11d35d.directorList.includes(_0x533f7f.directorSettings.addCoDirector[_0x443b5f].toString)) {
                    _0x11d35d.directorList.push(_0x533f7f.directorSettings.addCoDirector[_0x443b5f].toString());
                    addDirectorBlue(_0x533f7f.directorSettings.addCoDirector[_0x443b5f].toString());
                  }
                }
              }
            }
          }
          if (_0x11d35d.directorList.indexOf(_0x6c92f5) >= 0x0) {
            if (_0x11d35d.scene !== false) {
              if ("action" in _0x533f7f) {
                _0x11d35d.directorActions(_0x533f7f);
              }
            }
            if ("directorSettings" in _0x533f7f && _0x533f7f.directorSettings.blindAllGuests) {
              if (!_0x11d35d.director) {
                if (_0x11d35d.scene === false) {
                  _0x11d35d.directorDisplayMuted = true;
                  _0x11d35d.directorDisplayMute();
                }
              }
            }
            if ("mirrorGuestState" in _0x533f7f && "mirrorGuestTarget" in _0x533f7f) {
              if (_0x533f7f.mirrorGuestTarget && _0x533f7f.mirrorGuestTarget === true) {
                _0x11d35d.permaMirrored = _0x533f7f.mirrorGuestState;
                applyMirror(_0x11d35d.mirrorExclude);
                if (_0x11d35d.director) {
                  if (_0x533f7f.info.directorMirror) {
                    if (getById("container_director").querySelector("[data-action-type=\"mirror-guest\"]")) {
                      getById('container_director').querySelector("[data-action-type=\"mirror-guest\"]").classList.add("pressed");
                      getById("container_director").querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = "true";
                    } else if (getById("container_director").querySelector("[data-action-type=\"mirror-guest\"]")) {
                      getById("container_director").querySelector("[data-action-type=\"mirror-guest\"]").classList.remove("pressed");
                      getById("container_director").querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = "false";
                    }
                  }
                }
              } else {
                if (_0x533f7f.mirrorGuestTarget && _0x533f7f.mirrorGuestTarget in _0x11d35d.rpcs) {
                  _0x11d35d.rpcs[_0x533f7f.mirrorGuestTarget].mirrorState = _0x533f7f.mirrorGuestState;
                  if (_0x11d35d.rpcs[_0x533f7f.mirrorGuestTarget].videoElement) {
                    applyMirrorGuest(_0x533f7f.mirrorGuestState, _0x11d35d.rpcs[_0x533f7f.mirrorGuestTarget].videoElement);
                  }
                  if (_0x11d35d.director) {
                    if (_0x533f7f.info.directorMirror) {
                      if (getById("container_" + _0x6c92f5).querySelector("[data-action-type=\"mirror-guest\"]")) {
                        getById("container_" + _0x6c92f5).querySelector("[data-action-type=\"mirror-guest\"]").classList.add("pressed");
                        getById("container_" + _0x6c92f5).querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = 'true';
                      }
                    } else if (getById('container_' + _0x6c92f5).querySelector("[data-action-type=\"mirror-guest\"]")) {
                      getById("container_" + _0x6c92f5).querySelector("[data-action-type=\"mirror-guest\"]").classList.remove('pressed');
                      getById("container_" + _0x6c92f5).querySelector("[data-action-type=\"mirror-guest\"]").ariaPressed = "false";
                    }
                  }
                }
              }
            }
            if ("directorState" in _0x533f7f) {
              _0x11d35d.syncState = _0x533f7f.directorState;
              log(_0x533f7f);
              for (var _0x3d780b in _0x11d35d.syncState) {
                syncSceneState(_0x3d780b);
                syncOtherState(_0x3d780b);
              }
            }
            if ("widgetSrc" in _0x533f7f) {
              _0x11d35d.widget = _0x533f7f.widgetSrc || false;
              let _0x2edec1 = document.getElementById('widget');
              try {
                if (_0x2edec1) {
                  if (!_0x11d35d.widget) {
                    document.getElementById("widget").remove();
                    _0x4cd73d = true;
                  } else {
                    _0x2edec1.src = parseURL4Iframe(_0x11d35d.widget);
                  }
                } else {
                  _0x4cd73d = true;
                }
                if (_0x11d35d.director) {
                  getById("widgetURL").value = _0x11d35d.widget || '';
                }
              } catch (_0x30c82d) {
                errorlog(_0x30c82d);
              }
              pokeIframeAPI("widget-src", _0x11d35d.widget, _0x6c92f5);
            }
            if ("slotsUpdate" in _0x533f7f) {
              _0x11d35d.currentSlots = _0x533f7f.slotsUpdate;
              if (_0x11d35d.viewslot) {
                try {
                  let _0xa96c9e = _0x11d35d.currentSlots[_0x11d35d.viewslot];
                  if (_0xa96c9e) {
                    if (_0x11d35d.layout && !_0x11d35d.layout[_0xa96c9e]) {
                      _0x11d35d.layout = {
                        [_0xa96c9e]: {
                          'h': 0x64,
                          'w': 0x64,
                          'x': 0x0,
                          'y': 0x0
                        }
                      };
                      updateMixer();
                    }
                  } else if (_0x11d35d.layout && Object.keys(_0x11d35d.layout).length) {
                    _0x11d35d.layout = {};
                    updateMixer();
                  }
                } catch (_0x255b6f) {
                  errorlog(_0x255b6f);
                }
              } else if (!_0x11d35d.obsSceneSync()) {
                if (_0x11d35d.layout) {
                  _0x11d35d.layout = combinedLayoutSimple(_0x11d35d.layout);
                  updateMixer();
                }
              }
              warnlog(_0x533f7f);
            }
            if ("layouts" in _0x533f7f) {
              _0x11d35d.layouts = _0x533f7f.layouts;
              if ('obsSceneTriggers' in _0x533f7f) {
                _0x11d35d.obsSceneTriggers = _0x533f7f.obsSceneTriggers;
                _0x11d35d.obsSceneSync();
              } else {
                _0x11d35d.obsSceneTriggers = false;
              }
            }
          }
          if ('order' in _0x533f7f) {
            _0x11d35d.rpcs[_0x6c92f5].order = parseInt(_0x533f7f.order) || 0x0;
            if (_0x6c92f5 in _0x11d35d.pcs) {
              _0x11d35d.pcs[_0x6c92f5].order = parseInt(_0x533f7f.order) || 0x0;
            }
            if (_0x11d35d.director) {
              var _0x4bdff8 = document.querySelectorAll("[data-action-type=\"order-value\"][data--u-u-i-d=\"" + _0x6c92f5 + "\"]");
              if (_0x4bdff8[0x0]) {
                _0x4bdff8[0x0].innerText = parseInt(_0x533f7f.order) || 0x0;
              }
            }
            _0x4cd73d = true;
          }
          if ("changeLabel" in _0x533f7f) {
            log("Change Label");
            if ("value" in _0x533f7f) {
              log("value there");
              if (typeof _0x533f7f.value == "string") {
                _0x11d35d.rpcs[_0x6c92f5].label = sanitizeLabel(_0x533f7f.value);
                if (_0x11d35d.rpcs[_0x6c92f5].label.length == 0x0) {
                  _0x11d35d.rpcs[_0x6c92f5].label = false;
                }
                applyStyleEffect(_0x6c92f5);
                if (_0x11d35d.director) {
                  updateLabelDirectors(_0x6c92f5);
                } else if (_0x11d35d.showlabels) {
                  _0x4cd73d = true;
                }
              } else {
                _0x11d35d.rpcs[_0x6c92f5].label = false;
                applyStyleEffect(_0x6c92f5);
                if (_0x11d35d.director) {
                  updateLabelDirectors2(_0x6c92f5);
                } else if (_0x11d35d.showlabels) {
                  _0x4cd73d = true;
                }
              }
              _0x2838fe = true;
              pokeIframeAPI("remote-label-changed", _0x11d35d.rpcs[_0x6c92f5].label, _0x6c92f5);
            }
          }
          if ("muteState" in _0x533f7f) {
            log(_0x533f7f);
            _0x11d35d.rpcs[_0x6c92f5].remoteMuteState = _0x533f7f.muteState;
            _0x11d35d.requestRateLimit(false, _0x6c92f5);
            if (_0x11d35d.rpcs[_0x6c92f5].stats.info) {
              _0x11d35d.rpcs[_0x6c92f5].stats.info.muted = _0x11d35d.rpcs[_0x6c92f5].remoteMuteState;
            }
            if (_0x11d35d.scene === false) {
              if (_0x11d35d.roomid) {
                if (!_0x11d35d.cleanOutput || _0x11d35d.director) {
                  if (_0x11d35d.rpcs[_0x6c92f5].remoteMuteElement) {
                    if (_0x11d35d.rpcs[_0x6c92f5].remoteMuteState) {
                      _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.classList.remove("hidden");
                    } else {
                      _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.classList.add("hidden");
                    }
                  } else {
                    _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement = getById('muteStateTemplate').cloneNode(true);
                    _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.id = 'remoteMuteState_' + _0x6c92f5;
                    if (_0x11d35d.rpcs[_0x6c92f5].remoteMuteState) {
                      _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.classList.remove("hidden");
                    } else {
                      _0x11d35d.rpcs[_0x6c92f5].remoteMuteElement.classList.add("hidden");
                    }
                    _0x4cd73d = true;
                  }
                  _0x2838fe = true;
                }
              }
            }
            pokeAPI("remoteMuted", _0x11d35d.rpcs[_0x6c92f5].remoteMuteState, _0x11d35d.rpcs[_0x6c92f5].streamID);
            pokeIframeAPI('remote-mute-state', _0x533f7f.muteState, _0x6c92f5);
          }
          if ("requestSceneUpdate" in _0x533f7f) {
            var _0x16cc21 = getChromiumVersion();
            if (_0x16cc21) {
              if (_0x16cc21 < 0x50) {
                _0x4cd73d = true;
              }
            }
          }
          if ("videoMuted" in _0x533f7f) {
            log("videoMuted: " + _0x533f7f.videoMuted);
            _0x11d35d.rpcs[_0x6c92f5].videoMuted = _0x533f7f.videoMuted;
            if (_0x11d35d.rpcs[_0x6c92f5].videoMuted) {
              if (!_0x11d35d.manual) {
                _0x11d35d.requestRateLimit(0x0, _0x6c92f5);
              }
              if (_0x11d35d.rpcs[_0x6c92f5].imageElement) {
                _0x11d35d.rpcs[_0x6c92f5].imageElement.hidden = true;
                _0x11d35d.rpcs[_0x6c92f5].imageElement.style.visibility = "hidden";
              }
            } else {
              updateIncomingVideoElement(_0x6c92f5, true, false);
            }
            _0x4cd73d = true;
            if (_0x11d35d.director) {
              if (_0x11d35d.rpcs[_0x6c92f5].videoMuted) {
                _0x11d35d.rpcs[_0x6c92f5].remoteVideoMuteElement.classList.remove('hidden');
              } else {
                _0x11d35d.rpcs[_0x6c92f5].remoteVideoMuteElement.classList.add("hidden");
              }
            }
            if (_0x11d35d.rpcs[_0x6c92f5].defaultSpeaker && _0x11d35d.rpcs[_0x6c92f5].videoMuted) {
              setTimeout(function () {
                activeSpeaker();
              }, 0x0);
            } else if (!_0x11d35d.rpcs[_0x6c92f5].videoMuted) {
              setTimeout(function () {
                activeSpeaker();
              }, 0x0);
            }
            _0x2838fe = true;
            pokeAPI('remoteVideoMuted', _0x11d35d.rpcs[_0x6c92f5].videoMuted, _0x11d35d.rpcs[_0x6c92f5].streamID);
            pokeIframeAPI("remote-video-mute-state", _0x533f7f.videoMuted, _0x6c92f5);
          }
          if ("screenStopped" in _0x533f7f) {
            if (_0x6c92f5 + "_screen" in _0x11d35d.rpcs) {
              _0x11d35d.rpcs[_0x6c92f5 + '_screen'].virtualHangup = _0x533f7f.screenStopped;
              try {
                if (_0x11d35d.rpcs[_0x6c92f5 + '_screen'].virtualHangup) {
                  if (!(SafariVersion && SafariVersion > 0x10) && (iPad || iOS)) {
                    _0x11d35d.rpcs[_0x6c92f5 + "_screen"].videoElement.needsLoading = true;
                  }
                }
              } catch (_0x2e731e) {}
              if (_0x11d35d.director) {
                if (_0x533f7f.screenStopped) {
                  getById("container_" + _0x6c92f5 + "_screen").classList.add("screenshareNotActive");
                } else {
                  getById("container_" + _0x6c92f5 + "_screen").classList.remove('screenshareNotActive');
                }
              }
              _0x4cd73d = true;
              _0x2838fe = true;
            }
          }
          if ('screenShareState' in _0x533f7f) {
            _0x11d35d.rpcs[_0x6c92f5].screenShareState = _0x533f7f.screenShareState;
            _0x4cd73d = true;
            pokeIframeAPI('remote-screenshare-state', _0x533f7f.screenShareState, _0x6c92f5);
          }
          if ('directVideoMuted' in _0x533f7f) {
            if (!_0x11d35d.director) {
              if ("target" in _0x533f7f) {
                if (_0x11d35d.directorList.indexOf(_0x6c92f5) >= 0x0) {
                  var _0x3d1dfb = _0x533f7f.target;
                  if (_0x3d1dfb === true) {
                    _0x11d35d.directorVideoMuted = _0x533f7f.directVideoMuted;
                  } else if (_0x3d1dfb in _0x11d35d.rpcs) {
                    _0x11d35d.rpcs[_0x3d1dfb].directorVideoMuted = _0x533f7f.directVideoMuted;
                    if (_0x11d35d.rpcs[_0x3d1dfb].directorVideoMuted) {
                      _0x11d35d.requestRateLimit(0x0, _0x3d1dfb);
                    }
                    _0x4cd73d = true;
                  }
                }
              }
            }
            _0x2838fe = true;
          }
          if ("virtualHangup" in _0x533f7f) {
            if (!_0x11d35d.director) {
              if (_0x11d35d.directorList.indexOf(_0x6c92f5) >= 0x0) {
                if (_0x6c92f5 in _0x11d35d.rpcs) {
                  _0x11d35d.rpcs[_0x6c92f5].virtualHangup = _0x533f7f.virtualHangup;
                  if (_0x11d35d.rpcs[_0x6c92f5].virtualHangup) {
                    if (_0x6c92f5 in _0x11d35d.rpcs) {
                      _0x11d35d.requestRateLimit(0x0, _0x6c92f5);
                    }
                  }
                  _0x4cd73d = true;
                }
              }
            }
            _0x2838fe = true;
          }
          if ("requestFile" in _0x533f7f) {
            log("requestFile in reverse");
            try {
              _0x11d35d.sendFile(_0x6c92f5, _0x533f7f.requestFile);
            } catch (_0xbb6769) {
              errorlog(_0xbb6769);
            }
          }
          if ('remoteStats' in _0x533f7f) {
            remoteStats(_0x533f7f, _0x6c92f5);
          }
          if (_0x4cd73d) {
            setTimeout(function () {
              updateMixer();
              updateUserList();
            }, 0x1);
          } else if (_0x2838fe) {
            updateUserList();
          }
        };
        _0x11d35d.rpcs[_0x1a2973].receiveChannel.onclose = () => {
          warnlog("rpc datachannel closed");
        };
      };
      _0x11d35d.rpcs[_0x1a2973].ontrack = _0x570cc2 => {
        warnlog("New ON TRACK event");
        _0x11d35d.onTrack(_0x570cc2, _0x1a2973);
      };
      log("setup peer complete");
    };
    _0x11d35d.setupScreenShareAddon = function (_0x45dfe2, _0x5aaffd) {
      log("session.setupScreenShareAddon");
      if (!_0x11d35d.rpcs[_0x5aaffd].screenElement) {
        _0x11d35d.rpcs[_0x5aaffd + "_screen"] = {};
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].realUUID = _0x5aaffd;
        _0x11d35d.rpcs[_0x5aaffd].screenElement = createVideoElement();
        _0x11d35d.rpcs[_0x5aaffd].screenElement.needsLoading = false;
        _0x11d35d.rpcs[_0x5aaffd].screenElement.addEventListener("loadstart", _0x22fc54 => {
          log("incoming screen share started loading");
          _0x22fc54.target.needsLoading = false;
        });
        _0x11d35d.rpcs[_0x5aaffd].screenElement.srcObject = createMediaStream();
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].videoElement = _0x11d35d.rpcs[_0x5aaffd].screenElement;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].streamSrc = createMediaStream();
        if (_0x11d35d.rpcs[_0x5aaffd].streamID) {
          _0x11d35d.rpcs[_0x5aaffd + "_screen"].streamID = _0x11d35d.rpcs[_0x5aaffd].streamID + ':s';
        }
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].stats = {};
        _0x11d35d.rpcs[_0x5aaffd].stats.Audio_Loudness = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].getStats = function () {
          return new Promise((_0x36537f, _0x4849cc) => {
            _0x36537f([]);
          });
        };
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].getStatsTimeout = null;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].allowGraphs = false;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].allowMIDI = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].defaultSpeaker = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].motionDetectionInterval = false;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].activelySpeaking = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].loudest = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].canvasIntervalAction = null;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].codirectorRequested = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].buffer = false;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].bandwidth = -0x1;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].bandwidthMuted = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].showDirector = false;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].channelOffset = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].channelWidth = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].targetBandwidth = -0x1;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].manualBandwidth = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].imageElement = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].voiceMeter = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].group = _0x11d35d.rpcs[_0x5aaffd].group || [];
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].videoMuted = false;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].iframeVideo = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].directorVideoMuted = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].virtualHangup = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].remoteMuteState = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].remoteMuteElement = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].lockedVideoBitrate = false;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].lockedAudioBitrate = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].closeTimeout = null;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].mutedState = null;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].mutedStateMixer = null;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].mutedStateScene = null;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].mirrorState = null;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].scaleHeight = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].scaleWidth = false;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].scaleSnap = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].slot = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].signalMeter = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].volumeControl = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].screenIndexes = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].screenShareState = true;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].directorVolumeState = 0x64;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].directorMutedState = 0x0;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].nackCount = 0x0;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].opacityDisconnect = '1';
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].opacityMuted = '1';
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].obsControl = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].pliCount = 0x0;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].label = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].order = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].canvasCtx = null;
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].canvas = null;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].inboundAudioPipeline = {};
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].iframeSrc = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].iframeEle = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].startTime = Date.now();
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].settings = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].savedVolume = false;
        if (_0x11d35d.activeSpeaker == 0x2 || _0x11d35d.activeSpeaker == 0x4) {
          _0x11d35d.rpcs[_0x5aaffd + "_screen"].loudest = true;
        }
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].videoElement.dataset.UUID = _0x5aaffd + '_screen';
        _0x11d35d.rpcs[_0x5aaffd + '_screen'].videoElement.id = "videosource_" + _0x5aaffd + "_screen";
        if (_0x11d35d.rpcs[_0x5aaffd + '_screen'].streamID) {
          _0x11d35d.rpcs[_0x5aaffd + "_screen"].videoElement.dataset.sid = _0x11d35d.rpcs[_0x5aaffd + "_screen"].streamID;
        }
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].videoElement.screenshare = false;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].voiceMeter = false;
        setupIncomingScreenTracking(_0x11d35d.rpcs[_0x5aaffd + "_screen"].videoElement, _0x5aaffd + "_screen");
        _0x45dfe2.forEach(function (_0x58cc2b) {
          _0x11d35d.rpcs[_0x5aaffd].screenElement.srcObject.addTrack(_0x58cc2b);
          _0x11d35d.rpcs[_0x5aaffd + "_screen"].streamSrc.addTrack(_0x58cc2b);
        });
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].videoElement.autoplay = true;
        _0x11d35d.rpcs[_0x5aaffd + "_screen"].videoElement.setAttribute("playsinline", '');
        mediaSourceUpdated(_0x5aaffd + "_screen", _0x11d35d.rpcs[_0x5aaffd + "_screen"].streamID);
      } else {
        _0x45dfe2.forEach(function (_0x124522) {
          var _0x19812b = false;
          _0x11d35d.rpcs[_0x5aaffd].screenElement.srcObject.getTracks().forEach(function (_0x1d5c70) {
            if (_0x1d5c70.id == _0x124522.id && _0x1d5c70.kind == _0x124522.kind) {
              _0x19812b = true;
            }
          });
          if (!_0x19812b) {
            _0x11d35d.rpcs[_0x5aaffd].screenElement.srcObject.addTrack(_0x124522);
          }
          var _0x19812b = false;
          _0x11d35d.rpcs[_0x5aaffd + "_screen"].streamSrc.getTracks().forEach(function (_0x37fc6d) {
            if (_0x37fc6d.id == _0x124522.id && _0x37fc6d.kind == _0x124522.kind) {
              _0x19812b = true;
            }
          });
          if (!_0x19812b) {
            _0x11d35d.rpcs[_0x5aaffd + '_screen'].streamSrc.addTrack(_0x124522);
          }
        });
      }
    };
    return _0x11d35d;
  }()
};
function getMeshcastCanvasTrack(_0x3a1da7 = session.whipOut) {
  if (!_0x3a1da7) {
    errorlog("Meshcast (or whip|?) not connected; cant' create canvas for it");
  }
  if (!_0x3a1da7.canvas) {
    _0x3a1da7.canvas = document.createElement('canvas');
    _0x3a1da7.canvas.width = 0x140;
    _0x3a1da7.canvas.height = 0xb4;
  }
  if (!_0x3a1da7.ctx) {
    _0x3a1da7.ctx = _0x3a1da7.canvas.getContext('2d', {
      'alpha': false
    });
    _0x3a1da7.ctx.fillStyle = "#000";
    _0x3a1da7.ctx.fillRect(0x0, 0x0, _0x3a1da7.canvas.width, _0x3a1da7.canvas.height);
  }
  if (!_0x3a1da7.canvasStream) {
    (function _0x1510e7() {
      _0x3a1da7.ctx.fillRect(0x0, 0x0, _0x3a1da7.canvas.width, _0x3a1da7.canvas.height);
      setTimeout(_0x1510e7, 0xfa);
    })();
    _0x3a1da7.canvasStream = _0x3a1da7.canvas.captureStream(0x4);
  }
  var _0x55510a = _0x3a1da7.canvasStream.getVideoTracks();
  if (_0x55510a.length) {
    return _0x55510a[0x0];
  }
  errorlog("Meschast canvas not working");
  return false;
}
var meshcastServer = false;
var meshcastServerList = false;
function selectMeshcast(_0x3d3149) {
  meshcastServer = {};
  var _0x587331 = _0x3d3149.selectedIndex;
  var _0x188fe9 = _0x3d3149.options;
  meshcastServer.url = _0x188fe9[_0x587331].url;
  meshcastServer.code = _0x188fe9[_0x587331].code;
}
async function meshcast(_0x534f59 = false) {
  async function _0x5ed7fb(_0x3540db, _0x1c310e) {
    const _0x2ef6db = new XMLHttpRequest();
    _0x2ef6db.onload = function () {
      if (parseFloat(this.responseText) >= 0x0) {
        if (parseFloat(this.responseText) > 0x32) {
          _0x3540db.innerHTML += " (full)";
        } else {
          if (parseFloat(this.responseText) > 0x19) {
            _0x3540db.innerHTML += " (fair)";
          } else {
            if (parseFloat(this.responseText) > 0xa) {
              _0x3540db.innerHTML += " (ok)";
            } else {
              if (parseFloat(this.responseText) > 0x0) {
                _0x3540db.innerHTML += " (good)";
              } else {
                var _0x57b701 = false;
                if (_0x3540db.selected) {
                  _0x57b701 = true;
                }
                _0x3540db.disabled = true;
                _0x3540db.innerHTML += " (fail)";
                document.getElementById("edgelist").appendChild(_0x3540db);
                if (_0x57b701) {
                  document.getElementById("edgelist").options[0x0].selected = true;
                }
              }
            }
          }
        }
      } else {
        var _0x57b701 = false;
        if (_0x3540db.selected) {
          _0x57b701 = true;
        }
        document.getElementById('edgelist').appendChild(_0x3540db);
        _0x3540db.innerHTML += " (fail)";
        _0x3540db.disabled = true;
        if (_0x57b701) {
          document.getElementById("edgelist").options[0x0].selected = true;
        }
      }
      if (session.director && !session.cleanOutput && !session.cleanDirector) {
        document.getElementById("meshcastMenu").classList.remove('hidden');
      }
    };
    _0x2ef6db.onerror = function () {
      var _0x13daa1 = false;
      if (_0x3540db.selected) {
        _0x13daa1 = true;
      }
      document.getElementById("edgelist").appendChild(_0x3540db);
      _0x3540db.innerHTML += " (fail)";
      _0x3540db.disabled = true;
      if (_0x13daa1) {
        document.getElementById("edgelist").options[0x0].selected = true;
      }
    };
    _0x2ef6db.open("GET", _0x1c310e, true);
    _0x2ef6db.timeout = 0x3e8;
    _0x2ef6db.ontimeout = function (_0x1ff813) {
      var _0x4ea2fb = false;
      if (_0x3540db.selected) {
        _0x4ea2fb = true;
      }
      document.getElementById('edgelist').appendChild(_0x3540db);
      _0x3540db.innerHTML += " (timeout)";
      if (_0x4ea2fb) {
        document.getElementById("edgelist").options[0x0].selected = true;
      }
    };
    _0x2ef6db.send();
  }
  async function _0x2f21bf(_0x13518a = false) {
    var _0x3addcf = new Date();
    var _0x5c21a9 = _0x3addcf.getTimezoneOffset();
    if (urlParams.has('tz')) {
      _0x5c21a9 = parseInt(urlParams.get('tz')) || _0x5c21a9;
    }
    fetch("https://meshcast.io/servers.json?ts=" + Date.now()).then(_0x389bd0 => _0x389bd0.json()).then(async _0x3635e0 => {
      meshcastServerList = _0x3635e0;
      for (var _0xaba9d3 = 0x0; _0xaba9d3 < meshcastServerList.length; _0xaba9d3++) {
        var _0xf81279 = Math.abs(meshcastServerList[_0xaba9d3].tz - _0x5c21a9);
        if (Math.abs(_0xf81279 - 1440) < _0xf81279) {
          _0xf81279 = Math.abs(_0xf81279 - 1440);
        }
        meshcastServerList[_0xaba9d3].delta = _0xf81279;
        if (session.meshcastCode && session.meshcastCode !== meshcastServerList[_0xaba9d3].code) {
          meshcastServerList[_0xaba9d3].delta += 0x3e8;
        } else if (!session.meshcastCode && session.meshcast !== meshcastServerList[_0xaba9d3].code) {
          meshcastServerList[_0xaba9d3].delta += 0x3e8;
        }
      }
      meshcastServerList.sort(compare_deltas);
      console.log(meshcastServerList);
      for (var _0xaba9d3 = 0x0; _0xaba9d3 < meshcastServerList.length; _0xaba9d3++) {
        var _0x402513 = document.createElement("option");
        _0x402513.code = meshcastServerList[_0xaba9d3].code;
        _0x402513.url = meshcastServerList[_0xaba9d3].url;
        _0x402513.innerHTML = meshcastServerList[_0xaba9d3].label;
        _0x5ed7fb(_0x402513, meshcastServerList[_0xaba9d3].url + "/status");
        document.getElementById('edgelist').appendChild(_0x402513);
      }
      if (_0x13518a) {
        _0x13518a();
      }
    });
  }
  if (!session.meshcast) {
    return;
  }
  if (_0x534f59) {
    _0x2f21bf();
    return;
  }
  if (session.whipoutSettings !== false) {
    return;
  } else {
    if (session.autostart) {} else {
      if (!session.videoElement.srcObject) {
        return;
      }
    }
  }
  session.whipoutSettings = null;
  warnlog("MESHCAST();");
  function _0x3700b2(_0x577ec9) {
    warnlog("ON NEGO NEEDED");
    warnlog(_0x577ec9);
    try {
      session.whipOut.createOffer().then(function (_0x38b49d) {
        try {
          _0x38b49d = configureWhipOutSDP(_0x38b49d);
        } catch (_0x397938) {
          errorlog(_0x397938);
        }
        return session.whipOut.setLocalDescription(_0x38b49d);
      }).then(function () {
        log(session.whipOut.localDescription);
        var _0x3f783e = session.whipOut.localDescription.sdp;
        if (iOS || iPad) {
          if (session.removeOrientationFlag && _0x3f783e.includes("a=extmap:3 urn:3gpp:video-orientation\r\n")) {
            _0x3f783e = _0x3f783e.replace("a=extmap:3 urn:3gpp:video-orientation\r\n", '');
          }
        }
        _0x37a94a(_0x3f783e, "sdp");
      })["catch"](function (_0x3a51dd) {});
    } catch (_0x1661c4) {
      errorlog(_0x1661c4);
    }
  }
  var _0x97f713 = [];
  var _0x1b8110 = session.generateStreamID(0xe);
  async function _0x77274() {
    document.getElementById('edgelist').disabled = true;
    document.getElementById("edgelist").title = "Can't change the location once started streaming";
    if (!session.configuration) {
      await chooseBestTURN();
    }
    var _0x5974bc = {
      ...session.configuration
    };
    if (_0x5974bc.bundlePolicy) {
      delete _0x5974bc.bundlePolicy;
    }
    if (_0x5974bc.encodedInsertableStreams) {
      delete _0x5974bc.encodedInsertableStreams;
    }
    if (session.encodedInsertableStreams) {
      console.error("Notice: Meshcast does not support Insertable Streams (or E2EE) at the moment");
    }
    var _0x397ac3 = _0x397ac3;
    try {
      session.whipOut = new RTCPeerConnection(_0x5974bc);
      session.whipOut.stats = {};
      session.whipOut.maxBandwidth = null;
      session.whipOut.scale = false;
      session.whipOut.offerToReceiveAudio = false;
      session.whipOut.offerToReceiveVideo = false;
    } catch (_0x4d5978) {
      if (!session.cleanOutput) {
        warnUser("An RTC error occured");
      }
    }
    try {
      if (session.meshcast !== "video") {
        var _0x3d3406 = false;
        if (session.videoElement && session.videoElement.srcObject) {
          _0x3d3406 = session.videoElement.srcObject.getAudioTracks();
        }
        if (!_0x3d3406 || !_0x3d3406.length) {
          var _0x459a74 = new AudioContext();
          var _0x51390f = _0x459a74.createMediaStreamDestination();
          _0x51390f.stream.getAudioTracks().forEach(_0x15372a => {
            _0x3d3406 = _0x15372a;
          });
        } else {
          _0x3d3406 = _0x3d3406[0x0];
        }
        if (session.audioContentHint && _0x3d3406.kind === "audio") {
          try {
            _0x3d3406.contentHint = session.audioContentHint;
          } catch (_0x3d8f26) {
            errorlog(_0x3d8f26);
          }
        }
        if (_0x3d3406) {
          try {
            session.whipOut.addTransceiver(_0x3d3406, {
              'streams': [session.videoElement.srcObject],
              'direction': "sendonly"
            });
          } catch (_0x5b586) {
            errorlog(_0x5b586);
            session.whipOut.addTrack(_0x3d3406);
          }
        }
      }
      if (session.meshcast !== "audio") {
        var _0x3d3406 = false;
        if (session.videoElement && session.videoElement.srcObject) {
          _0x3d3406 = session.videoElement.srcObject.getVideoTracks();
        }
        if (!_0x3d3406 || !_0x3d3406.length) {
          _0x3d3406 = getMeshcastCanvasTrack(session.whipOut);
        } else {
          _0x3d3406 = _0x3d3406[0x0];
        }
        if (session.screenShareState && session.screenshareContentHint && _0x3d3406.kind === "video") {
          try {
            _0x3d3406.contentHint = session.screenshareContentHint;
          } catch (_0x17ee5c) {
            errorlog(_0x17ee5c);
          }
        } else {
          if (session.contentHint && _0x3d3406.kind === "video") {
            try {
              _0x3d3406.contentHint = session.contentHint;
            } catch (_0xe9349) {
              errorlog(_0xe9349);
            }
          }
        }
        if (_0x3d3406) {
          try {
            session.whipOut.addTransceiver(_0x3d3406, {
              'streams': [session.videoElement.srcObject],
              'direction': "sendonly"
            });
          } catch (_0x89b0e5) {
            errorlog(_0x89b0e5);
            session.whipOut.addTrack(_0x3d3406);
          }
        }
      }
      session.whipOut.onnegotiationneeded = _0x3700b2;
      session.whipOut.onicecandidate = function (_0x4b395d) {
        if (_0x4b395d.candidate == null) {
          return;
        }
        log(_0x4b395d.candidate);
        try {
          if (session.localNetworkOnly) {
            if (!filterIceLAN(_0x4b395d.candidate)) {
              return;
            }
          }
        } catch (_0xec16d8) {
          errorlog(_0xec16d8);
        }
        _0x97f713.push(_0x4b395d.candidate);
      };
    } catch (_0x4aaeeb) {
      errorlog(_0x4aaeeb);
    }
  }
  if (!meshcastServerList) {
    _0x2f21bf(_0x77274);
  } else {
    _0x77274();
  }
  function _0x37a94a(_0x526ab0, _0x58493d, _0x9d8b38 = false) {
    try {
      if (meshcastServer) {} else {
        if (meshcastServerList.length) {
          meshcastServer = meshcastServerList.shift();
        } else {
          errorlog("No meshcast server found that worked");
          if (!session.cleanOutput) {
            var _0x22939c = window.location.href;
            if (_0x22939c.includes('?')) {
              _0x22939c += "&meshcastfailed";
              warnUser("Failed to connect to Meshcast.\n\nCheck your connection or switch to peer-to-peer mode instead.\n\n<a href='" + _0x22939c + "'>Click here to reload without Meshcast enabled</a>", false, false);
            } else {
              warnUser("Failed to connect to Meshcast.\n\nCheck your connection or switch to peer-to-peer mode instead.");
            }
          }
          return;
        }
      }
      var _0x5398f4 = new XMLHttpRequest();
      var _0x4f68d8 = setTimeout(function () {
        _0x5398f4.abort();
        errorlog("Meshcast request timed out after 5 seconds");
        if (session.meshcastCode) {
          if (!session.cleanOutput) {
            warnUser("Requested meshcast server timed out; trying another..", 0x7d0);
          }
        }
        meshcastServer = false;
        _0x37a94a(_0x526ab0, _0x58493d, _0x9d8b38);
      }, 0x1388);
      _0x5398f4.onreadystatechange = function () {
        if (this.readyState == 0x4) {
          clearTimeout(_0x4f68d8);
          if (this.status == 0xc8 || this.status == 0xc9) {
            var _0x19ff3f = this.getResponseHeader("content-type");
            if (_0x19ff3f == "application/sdp") {
              var _0x13dba6 = {};
              _0x13dba6.sdp = this.responseText;
              _0x13dba6.type = "answer";
              try {
                _0x13dba6 = configureWhipOutSDP(_0x13dba6);
              } catch (_0x256c65) {
                errorlog(_0x256c65);
              }
              if (session.localNetworkOnly) {
                _0x13dba6.sdp = filterSDPLAN(_0x13dba6.sdp);
              }
              session.whipOut.setRemoteDescription(_0x13dba6).then(function () {
                if (_0x97f713.length) {
                  var _0x2e9e20 = JSON.stringify(_0x97f713.pop());
                  _0x37a94a(_0x2e9e20, "ice", function () {
                    session.whipOutSetScale();
                    _0x390a0d();
                  });
                }
              })["catch"](function (_0x54aaa5) {
                log(_0x54aaa5);
              });
            } else {
              if (_0x19ff3f == "application/error") {
                if (this.responseText == 0x1b0) {
                  warnUser("Meshcast error: 432");
                } else {
                  warnUser("Unknown Meshcast error");
                }
              } else if (_0x9d8b38) {
                _0x9d8b38();
              }
            }
          } else {
            errorlog("Meshcast request failed");
            if (session.meshcastCode) {
              if (!session.cleanOutput) {
                warnUser("Requested meshcast server not available; trying another..", 0x7d0);
              }
            }
            meshcastServer = false;
            _0x37a94a(_0x526ab0, _0x58493d, _0x9d8b38);
          }
        }
      };
      var _0x320eac = 0x9c4;
      if (session.whipOutVideoBitrate !== false) {
        _0x320eac = session.whipOutVideoBitrate;
      }
      if (session.screenShareState && session.whipOutScreenShareBitrate !== false) {
        _0x320eac = session.whipOutScreenShareBitrate;
      }
      var _0x2edd66 = parseInt(0x61a8 / _0x320eac) || 0xa;
      var _0x1a8b0c = '';
      if (session.screenShareState && session.whipOutScreenShareCodec) {
        _0x1a8b0c = session.whipOutScreenShareCodec;
      } else {
        if (session.whipOutCodec) {
          _0x1a8b0c = session.whipOutCodec;
        } else if (iOS || iPad) {
          _0x1a8b0c = "42e01f";
        }
      }
      _0x5398f4.open("POST", meshcastServer.url + '/' + _0x2edd66 + '/' + _0x1a8b0c, true);
      _0x5398f4.setRequestHeader("Content-Type", "application/" + _0x58493d + "; charset=utf-8");
      _0x5398f4.setRequestHeader("Authorization", "Bearer " + _0x1b8110);
      _0x5398f4.onerror = function (_0x2a720a) {
        errorlog(_0x2a720a);
        if (!session.cleanOutput) {
          if (session.meshcastCode) {
            warnUser("Requested meshcast server offline; trying another..", 0x7d0);
          }
        }
        if (window.location.host !== 'vdo.ninja') {
          console.warn("If self-hosting VDO.Ninja, please contact steve@seguin.email to request having access to Meshcast.");
        } else {
          console.warn("Please contact steve@seguin.email or join https://discord.vdo.ninja if Meshcast is not working.");
        }
        meshcastServer = false;
        _0x37a94a(_0x526ab0, _0x58493d, _0x9d8b38);
      };
      _0x5398f4.send(_0x526ab0);
    } catch (_0x5c6e40) {
      errorlog(_0x5c6e40);
    }
  }
  async function _0x390a0d() {
    if (meshcastServer.code) {
      var _0x1a9920 = "https://meshcast.io/view.html?api=" + meshcastServer.code + '&id=' + _0x1b8110;
    } else {
      var _0x1a9920 = "https://meshcast.io/view.html?id=" + _0x1b8110;
    }
    console.log("MESHCAST LINK: " + _0x1a9920);
    if (!session.whipOut.stats) {
      session.whipOut.stats = {};
    }
    session.whipOut.stats.publishing_region = meshcastServer.code;
    session.whipOut.stats.watch_URL = _0x1a9920;
    session.whipOut.stats.whip_Host = 'Meshcast';
    session.whipOut.stats.whep_URL = false;
    if (modalTimeout) {
      closeModal();
      warnUser("Connected! continuing...", 0x7d0);
    }
    await sleep(0x1f4);
    session.whipoutSettings = {
      'type': "meshcast",
      'token': _0x1b8110,
      'url': meshcastServer.url
    };
    for (var _0x4d0578 in session.pcs) {
      if (session.pcs[_0x4d0578].whipout === null) {
        var _0x3f6393 = {
          "whepSettings": session.whipoutSettings,
          "meshcast": session.whipoutSettings
        };
        if (session.sendMessage(_0x3f6393, _0x4d0578)) {
          session.pcs[_0x4d0578].whipout = true;
        }
      }
    }
  }
}
async function whepWatch(_0x2474ff, _0x59c5e3) {
  if (session.noMeshcast) {
    return;
  }
  console.log(_0x59c5e3);
  if (_0x59c5e3.type == "meshcast") {
    meshcastWatch(_0x2474ff, _0x59c5e3);
  } else if (_0x59c5e3.type == "whep") {
    if (_0x59c5e3 && _0x59c5e3.url) {
      if (_0x59c5e3.token) {
        whepIn(_0x59c5e3.url, _0x59c5e3.token, _0x2474ff);
      } else {
        whepIn(_0x59c5e3.url, false, _0x2474ff);
      }
    }
  }
}
async function meshcastWatch(_0x202af4, _0x3b905d) {
  if (!(_0x202af4 in session.rpcs)) {
    session.rpcs[_0x202af4] = {};
    session.rpcs[_0x202af4].stats = {};
    session.rpcs[_0x202af4].allowGraphs = false;
    session.rpcs[_0x202af4].inboundAudioPipeline = {};
    session.rpcs[_0x202af4].channelOffset = false;
    session.rpcs[_0x202af4].channelWidth = false;
    session.rpcs[_0x202af4].settings = false;
    session.rpcs[_0x202af4].activelySpeaking = false;
    session.rpcs[_0x202af4].defaultSpeaker = false;
    session.rpcs[_0x202af4].mirrorState = null;
    session.rpcs[_0x202af4].motionDetectionInterval = false;
    session.rpcs[_0x202af4].lockedVideoBitrate = false;
    session.rpcs[_0x202af4].lockedAudioBitrate = false;
    session.rpcs[_0x202af4].buffer = false;
    session.rpcs[_0x202af4].manualBandwidth = false;
    session.rpcs[_0x202af4].getStatsTimeout = null;
    errorlog("RPCS for MESHCAST ISNT MADE YET??");
  }
  var _0x35218a = true;
  var _0x2a9e26 = true;
  if (session.novideo !== false && !session.novideo.includes(session.rpcs[_0x202af4].streamID)) {
    _0x35218a = false;
  } else if (session.rpcs[_0x202af4].settings && !session.rpcs[_0x202af4].settings.video) {
    _0x35218a = false;
  }
  if (session.noaudio !== false && !session.noaudio.includes(session.rpcs[_0x202af4].streamID)) {
    _0x2a9e26 = false;
  } else if (session.rpcs[_0x202af4].settings && !session.rpcs[_0x202af4].settings.audio) {
    _0x2a9e26 = false;
  }
  if (!_0x2a9e26 && !_0x35218a) {
    errorlog("We will not request the meshcast as no audio or video is requested");
    return;
  }
  disableQualityDirector(_0x202af4);
  if (!session.configuration) {
    await chooseBestTURN();
  }
  var _0x5f09af = {
    ...session.configuration
  };
  if (_0x5f09af.bundlePolicy) {
    delete _0x5f09af.bundlePolicy;
  }
  if (_0x5f09af.encodedInsertableStreams) {
    delete _0x5f09af.encodedInsertableStreams;
  }
  if (session.encodedInsertableStreams) {
    console.error("Notice: Meshcast does not support Insertable Streams (or E2EE) at the moment");
  }
  try {
    session.rpcs[_0x202af4].whep = new RTCPeerConnection(_0x5f09af);
  } catch (_0x17d6af) {
    if (!session.cleanOutput) {
      warnUser("An RTC error occured");
    }
  }
  session.rpcs[_0x202af4].whep.ontrack = function (_0x24d84e) {
    session.onTrack(_0x24d84e, _0x202af4);
  };
  var _0x16b6df = session.generateStreamID(0xe);
  var _0x5544cd = {
    "streamID": _0x3b905d.token,
    "UUID": _0x16b6df
  };
  function _0x14f04c(_0x2f6a32) {
    var _0x997b2c = new XMLHttpRequest();
    _0x997b2c.onreadystatechange = function () {
      if (this.readyState == 0x4 && (this.status == 0xc8 || this.status == 0xc9)) {
        var _0x357f56 = this.getResponseHeader("content-type");
        if (_0x357f56 == "application/sdp") {
          var _0x5d597b = {
            "sdp": this.responseText,
            "type": "offer"
          };
          if (session.localNetworkOnly) {
            _0x5d597b.sdp = filterSDPLAN(_0x5d597b.sdp);
          }
          session.rpcs[_0x202af4].whep.setRemoteDescription(_0x5d597b).then(function () {
            _0x2d3d3b();
          })["catch"](function (_0x474a98) {
            log(_0x474a98);
          });
        }
      } else {
        log(this);
      }
    };
    _0x997b2c.open("POST", _0x3b905d.url, true);
    _0x997b2c.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    _0x997b2c.setRequestHeader("Authorization", "Bearer " + _0x3b905d.token);
    _0x997b2c.send(JSON.stringify(_0x2f6a32));
  }
  function _0x2d3d3b() {
    session.rpcs[_0x202af4].whep.createAnswer().then(function (_0x320d09) {
      _0x320d09.sdp = CodecsHandler.setOpusAttributes(_0x320d09.sdp, {
        'stereo': 0x1
      });
      return session.rpcs[_0x202af4].whep.setLocalDescription(_0x320d09);
    }).then(function () {
      var _0x5eb2b9 = {
        UUID: _0x16b6df,
        "answer": session.rpcs[_0x202af4].whep.localDescription.sdp
      };
      _0x14f04c(_0x5eb2b9);
    })["catch"](function (_0x3cbd9b) {});
  }
  _0x14f04c(_0x5544cd);
}
(function () {
  'use strict';

  let _0x580449 = function (_0x3c458a) {
    this.data = new Uint8Array(_0x3c458a);
    this.pos = 0x0;
  };
  _0x580449.prototype.seek = function (_0xb450fc) {
    this.pos = _0xb450fc;
  };
  _0x580449.prototype.writeBytes = function (_0xc9e1ee) {
    for (let _0x3c1608 = 0x0; _0x3c1608 < _0xc9e1ee.length; _0x3c1608++) {
      this.data[this.pos++] = _0xc9e1ee[_0x3c1608];
    }
  };
  _0x580449.prototype.writeByte = function (_0x3ec923) {
    this.data[this.pos++] = _0x3ec923;
  };
  _0x580449.prototype.writeU8 = _0x580449.prototype.writeByte;
  _0x580449.prototype.writeU16BE = function (_0x14cb8f) {
    this.data[this.pos++] = _0x14cb8f >> 0x8;
    this.data[this.pos++] = _0x14cb8f;
  };
  _0x580449.prototype.writeDoubleBE = function (_0xa53704) {
    let _0x47bce0 = new Uint8Array(new Float64Array([_0xa53704]).buffer);
    for (let _0x599959 = _0x47bce0.length - 0x1; _0x599959 >= 0x0; _0x599959--) {
      this.writeByte(_0x47bce0[_0x599959]);
    }
  };
  _0x580449.prototype.writeFloatBE = function (_0x5eefa7) {
    let _0x5daf46 = new Uint8Array(new Float32Array([_0x5eefa7]).buffer);
    for (let _0x413fee = _0x5daf46.length - 0x1; _0x413fee >= 0x0; _0x413fee--) {
      this.writeByte(_0x5daf46[_0x413fee]);
    }
  };
  _0x580449.prototype.writeString = function (_0x37b85c) {
    for (let _0x16f8f7 = 0x0; _0x16f8f7 < _0x37b85c.length; _0x16f8f7++) {
      this.data[this.pos++] = _0x37b85c.charCodeAt(_0x16f8f7);
    }
  };
  _0x580449.prototype.writeEBMLVarIntWidth = function (_0x465fcf, _0x4bfaa7) {
    switch (_0x4bfaa7) {
      case 0x1:
        this.writeU8(128 | _0x465fcf);
        break;
      case 0x2:
        this.writeU8(64 | _0x465fcf >> 0x8);
        this.writeU8(_0x465fcf);
        break;
      case 0x3:
        this.writeU8(32 | _0x465fcf >> 0x10);
        this.writeU8(_0x465fcf >> 0x8);
        this.writeU8(_0x465fcf);
        break;
      case 0x4:
        this.writeU8(16 | _0x465fcf >> 0x18);
        this.writeU8(_0x465fcf >> 0x10);
        this.writeU8(_0x465fcf >> 0x8);
        this.writeU8(_0x465fcf);
        break;
      case 0x5:
        this.writeU8(8 | _0x465fcf / 0x100000000 & 0x7);
        this.writeU8(_0x465fcf >> 0x18);
        this.writeU8(_0x465fcf >> 0x10);
        this.writeU8(_0x465fcf >> 0x8);
        this.writeU8(_0x465fcf);
        break;
      default:
        throw new Error("Bad EBML VINT size " + _0x4bfaa7);
    }
  };
  _0x580449.prototype.measureEBMLVarInt = function (_0x826ae7) {
    if (_0x826ae7 < 127) {
      return 0x1;
    } else {
      if (_0x826ae7 < 16383) {
        return 0x2;
      } else {
        if (_0x826ae7 < 2097151) {
          return 0x3;
        } else {
          if (_0x826ae7 < 268435455) {
            return 0x4;
          } else {
            if (_0x826ae7 < 0x7ffffffff) {
              return 0x5;
            } else {
              throw new Error("EBML VINT size not supported " + _0x826ae7);
            }
          }
        }
      }
    }
  };
  _0x580449.prototype.writeEBMLVarInt = function (_0xffe165) {
    this.writeEBMLVarIntWidth(_0xffe165, this.measureEBMLVarInt(_0xffe165));
  };
  _0x580449.prototype.writeUnsignedIntBE = function (_0x960dfa, _0x56d7e6) {
    if (_0x56d7e6 === undefined) {
      _0x56d7e6 = this.measureUnsignedInt(_0x960dfa);
    }
    switch (_0x56d7e6) {
      case 0x5:
        this.writeU8(Math.floor(_0x960dfa / 0x100000000));
      case 0x4:
        this.writeU8(_0x960dfa >> 0x18);
      case 0x3:
        this.writeU8(_0x960dfa >> 0x10);
      case 0x2:
        this.writeU8(_0x960dfa >> 0x8);
      case 0x1:
        this.writeU8(_0x960dfa);
        break;
      default:
        throw new Error("Bad UINT size " + _0x56d7e6);
    }
  };
  _0x580449.prototype.measureUnsignedInt = function (_0x17c302) {
    if (_0x17c302 < 256) {
      return 0x1;
    } else {
      if (_0x17c302 < 65536) {
        return 0x2;
      } else {
        if (_0x17c302 < 16777216) {
          return 0x3;
        } else {
          return _0x17c302 < 0x100000000 ? 0x4 : 0x5;
        }
      }
    }
  };
  _0x580449.prototype.getAsDataArray = function () {
    if (this.pos < this.data.byteLength) {
      return this.data.subarray(0x0, this.pos);
    } else {
      if (this.pos == this.data.byteLength) {
        return this.data;
      } else {
        throw new Error("ArrayBufferDataStream's pos lies beyond end of buffer");
      }
    }
  };
  window.ArrayBufferDataStream = _0x580449;
})();
(function () {
  'use strict';

  let _0x3333bb = function (_0x45ce03) {
    return function (_0x4895c5) {
      let _0x112438 = [];
      let _0x34a091 = Promise.resolve();
      let _0x40cfcc = null;
      let _0x2bb196 = null;
      if (_0x4895c5 && _0x4895c5.constructor.name === "FileSystemWritableFileStream") {
        _0x40cfcc = _0x4895c5;
      } else if (_0x45ce03 && _0x4895c5) {
        _0x2bb196 = _0x4895c5;
      }
      this.pos = 0x0;
      this.length = 0x0;
      function _0x2ef1fe(_0x7e336f) {
        return new Promise(function (_0xcd56c7, _0x422d08) {
          let _0x86e6d9 = new FileReader();
          _0x86e6d9.addEventListener("loadend", function () {
            _0xcd56c7(_0x86e6d9.result);
          });
          _0x86e6d9.readAsArrayBuffer(_0x7e336f);
        });
      }
      function _0x4f0d17(_0x39477f) {
        return new Promise(function (_0x56a23f, _0x29cd1e) {
          if (_0x39477f instanceof Uint8Array) {
            _0x56a23f(_0x39477f);
          } else {
            if (_0x39477f instanceof ArrayBuffer || ArrayBuffer.isView(_0x39477f)) {
              _0x56a23f(new Uint8Array(_0x39477f));
            } else if (_0x39477f instanceof Blob) {
              _0x56a23f(_0x2ef1fe(_0x39477f).then(function (_0x19ba14) {
                return new Uint8Array(_0x19ba14);
              }));
            } else {
              _0x56a23f(_0x2ef1fe(new Blob([_0x39477f])).then(function (_0x42a4da) {
                return new Uint8Array(_0x42a4da);
              }));
            }
          }
        });
      }
      function _0x2ee9f4(_0x256e0e) {
        let _0x5a765d = _0x256e0e.byteLength || _0x256e0e.length || _0x256e0e.size;
        if (!Number.isInteger(_0x5a765d)) {
          throw new Error("Failed to determine size of element");
        }
        return _0x5a765d;
      }
      this.seek = function (_0xdb275d) {
        if (_0xdb275d < 0x0) {
          throw new Error("Offset may not be negative");
        }
        if (isNaN(_0xdb275d)) {
          throw new Error("Offset may not be NaN");
        }
        if (_0xdb275d > this.length) {
          throw new Error("Seeking beyond the end of file is not allowed");
        }
        this.pos = _0xdb275d;
      };
      this.write = function (_0x3fd0f4) {
        let _0x1123a4 = {
          'offset': this.pos,
          'data': _0x3fd0f4,
          'length': _0x2ee9f4(_0x3fd0f4)
        };
        let _0x3d62eb = _0x1123a4.offset >= this.length;
        this.pos += _0x1123a4.length;
        this.length = Math.max(this.length, this.pos);
        _0x34a091 = _0x34a091.then(async function () {
          if (_0x2bb196) {
            return new Promise(function (_0x9c69e, _0x31012a) {
              _0x4f0d17(_0x1123a4.data).then(function (_0x3bbe7d) {
                let _0x508298 = 0x0;
                let _0x504b12 = Buffer.from(_0x3bbe7d.buffer);
                let _0x4c1a22 = function (_0x228c62, _0x34a113, _0x113517) {
                  _0x508298 += _0x34a113;
                  if (_0x508298 >= _0x113517.length) {
                    _0x9c69e();
                  } else {
                    _0x45ce03.write(_0x2bb196, _0x113517, _0x508298, _0x113517.length - _0x508298, _0x1123a4.offset + _0x508298, _0x4c1a22);
                  }
                };
                _0x45ce03.write(_0x2bb196, _0x504b12, 0x0, _0x504b12.length, _0x1123a4.offset, _0x4c1a22);
              });
            });
          } else {
            if (_0x40cfcc) {
              return new Promise(function (_0x3f1a3e, _0x37bf63) {
                _0x40cfcc.seek(_0x1123a4.offset).then(() => {
                  _0x40cfcc.write(new Blob([_0x1123a4.data]));
                }).then(() => {
                  _0x3f1a3e();
                });
              });
            } else {
              if (!_0x3d62eb) {
                for (let _0x258d01 = 0x0; _0x258d01 < _0x112438.length; _0x258d01++) {
                  let _0x33d1b5 = _0x112438[_0x258d01];
                  if (!(_0x1123a4.offset + _0x1123a4.length <= _0x33d1b5.offset || _0x1123a4.offset >= _0x33d1b5.offset + _0x33d1b5.length)) {
                    if (_0x1123a4.offset < _0x33d1b5.offset || _0x1123a4.offset + _0x1123a4.length > _0x33d1b5.offset + _0x33d1b5.length) {
                      throw new Error("Overwrite crosses blob boundaries");
                    }
                    if (_0x1123a4.offset == _0x33d1b5.offset && _0x1123a4.length == _0x33d1b5.length) {
                      _0x33d1b5.data = _0x1123a4.data;
                      return;
                    } else {
                      return _0x4f0d17(_0x33d1b5.data).then(function (_0x1f4ba1) {
                        _0x33d1b5.data = _0x1f4ba1;
                        return _0x4f0d17(_0x1123a4.data);
                      }).then(function (_0x43cf59) {
                        _0x1123a4.data = _0x43cf59;
                        _0x33d1b5.data.set(_0x1123a4.data, _0x1123a4.offset - _0x33d1b5.offset);
                      });
                    }
                  }
                }
              }
            }
          }
          _0x112438.push(_0x1123a4);
        });
      };
      this.complete = function (_0x4a65e3) {
        if (_0x2bb196 || _0x40cfcc) {
          _0x34a091 = _0x34a091.then(function () {
            return null;
          });
        } else {
          _0x34a091 = _0x34a091.then(function () {
            let _0x21ea41 = [];
            for (let _0xec3296 = 0x0; _0xec3296 < _0x112438.length; _0xec3296++) {
              _0x21ea41.push(_0x112438[_0xec3296].data);
            }
            return new Blob(_0x21ea41, {
              'type': _0x4a65e3
            });
          });
        }
        return _0x34a091;
      };
    };
  };
  window.BlobBuffer = _0x3333bb(null);
})();
(function () {
  'use strict';

  function _0x378726(_0x454300) {
    this.value = _0x454300;
  }
  function _0x53080b(_0x516d2b, _0x5195be) {
    let _0x25ba9f = {};
    [_0x516d2b, _0x5195be].forEach(function (_0x215048) {
      for (let _0x5b766d in _0x215048) {
        if (Object.prototype.hasOwnProperty.call(_0x215048, _0x5b766d)) {
          _0x25ba9f[_0x5b766d] = _0x215048[_0x5b766d];
        }
      }
    });
    return _0x25ba9f;
  }
  function _0x39e23b(_0x3c71a2, _0x1adbd5, _0x2fd79f) {
    if (Array.isArray(_0x2fd79f)) {
      for (let _0x5b8e80 = 0x0; _0x5b8e80 < _0x2fd79f.length; _0x5b8e80++) {
        _0x39e23b(_0x3c71a2, _0x1adbd5, _0x2fd79f[_0x5b8e80]);
      }
    } else {
      if (typeof _0x2fd79f === "string") {
        _0x3c71a2.writeString(_0x2fd79f);
      } else {
        if (_0x2fd79f instanceof Uint8Array) {
          _0x3c71a2.writeBytes(_0x2fd79f);
        } else {
          if (_0x2fd79f.id) {
            _0x2fd79f.offset = _0x3c71a2.pos + _0x1adbd5;
            _0x3c71a2.writeUnsignedIntBE(_0x2fd79f.id);
            if (Array.isArray(_0x2fd79f.data)) {
              let _0x65a753;
              let _0x5c5d84;
              let _0x14edbd;
              if (_0x2fd79f.size === -0x1) {
                _0x3c71a2.writeByte(0xff);
              } else {
                _0x65a753 = _0x3c71a2.pos;
                _0x3c71a2.writeBytes([0x0, 0x0, 0x0, 0x0]);
              }
              _0x5c5d84 = _0x3c71a2.pos;
              _0x2fd79f.dataOffset = _0x5c5d84 + _0x1adbd5;
              _0x39e23b(_0x3c71a2, _0x1adbd5, _0x2fd79f.data);
              if (_0x2fd79f.size !== -0x1) {
                _0x14edbd = _0x3c71a2.pos;
                _0x2fd79f.size = _0x14edbd - _0x5c5d84;
                _0x3c71a2.seek(_0x65a753);
                _0x3c71a2.writeEBMLVarIntWidth(_0x2fd79f.size, 0x4);
                _0x3c71a2.seek(_0x14edbd);
              }
            } else {
              if (typeof _0x2fd79f.data === "string") {
                _0x3c71a2.writeEBMLVarInt(_0x2fd79f.data.length);
                _0x2fd79f.dataOffset = _0x3c71a2.pos + _0x1adbd5;
                _0x3c71a2.writeString(_0x2fd79f.data);
              } else {
                if (typeof _0x2fd79f.data === "number") {
                  if (!_0x2fd79f.size) {
                    _0x2fd79f.size = _0x3c71a2.measureUnsignedInt(_0x2fd79f.data);
                  }
                  _0x3c71a2.writeEBMLVarInt(_0x2fd79f.size);
                  _0x2fd79f.dataOffset = _0x3c71a2.pos + _0x1adbd5;
                  _0x3c71a2.writeUnsignedIntBE(_0x2fd79f.data, _0x2fd79f.size);
                } else {
                  if (_0x2fd79f.data instanceof _0x378726) {
                    _0x3c71a2.writeEBMLVarInt(0x8);
                    _0x2fd79f.dataOffset = _0x3c71a2.pos + _0x1adbd5;
                    _0x3c71a2.writeDoubleBE(_0x2fd79f.data.value);
                  } else {
                    if (_0x2fd79f.data instanceof _0x378726) {
                      _0x3c71a2.writeEBMLVarInt(0x4);
                      _0x2fd79f.dataOffset = _0x3c71a2.pos + _0x1adbd5;
                      _0x3c71a2.writeFloatBE(_0x2fd79f.data.value);
                    } else {
                      if (_0x2fd79f.data instanceof Uint8Array) {
                        _0x3c71a2.writeEBMLVarInt(_0x2fd79f.data.byteLength);
                        _0x2fd79f.dataOffset = _0x3c71a2.pos + _0x1adbd5;
                        _0x3c71a2.writeBytes(_0x2fd79f.data);
                      } else {
                        throw new Error("Bad EBML datatype " + typeof _0x2fd79f.data);
                      }
                    }
                  }
                }
              }
            }
          } else {
            throw new Error("Bad EBML datatype " + typeof _0x2fd79f.data);
          }
        }
      }
    }
  }
  let _0x195c2a = function (_0x503c75, _0x5c71a7) {
    return function (_0x3c34b6) {
      let _0x4c3b24 = false;
      let _0x515026 = 0x0;
      let _0x427735 = 0x0;
      let _0x53b4e0 = true;
      let _0xb46f98 = 0x0;
      let _0x13133d = 0xbb80;
      let _0x21f2a9 = 0x1;
      let _0x1cac5e = [];
      let _0x420b6e = 0x0;
      let _0xc385cc = 0x0;
      let _0x18f19b = 0x0;
      let _0x1b3ed9 = {
        'fileWriter': null,
        'codec': _0x3c34b6.codec || 'VP9'
      };
      let _0x36849b;
      let _0x50bffb = {
        'id': 0x4489,
        'data': new _0x378726(0x0)
      };
      let _0x344637 = new _0x5c71a7(_0x3c34b6.fileWriter);
      function _0x23cac5(_0x43213d, _0x2ac6ec) {
        _0x2ac6ec = new Uint8Array(_0x2ac6ec);
        return _0x5245e4(_0x1b8568(_0x43213d), _0x25a2ad(_0x2ac6ec.byteLength), _0x2ac6ec);
      }
      function _0x5245e4() {
        var _0x564a8a;
        var _0x2b682e = 0x0;
        var _0x3a8e3c;
        for (_0x564a8a = 0x0; _0x564a8a < arguments.length; _0x564a8a++) {
          _0x2b682e += arguments[_0x564a8a].byteLength;
        }
        _0x3a8e3c = new Uint8Array(_0x2b682e);
        _0x564a8a = 0x0;
        for (_0x2b682e = 0x0; _0x564a8a < arguments.length; _0x2b682e += arguments[_0x564a8a].byteLength, _0x564a8a++) {
          _0x3a8e3c.set(arguments[_0x564a8a], _0x2b682e);
        }
        return _0x3a8e3c;
      }
      function _0x1b8568(_0x454c1b) {
        if ((_0x454c1b & 0xff000000) != 0x0) {
          return new Uint8Array([_0x454c1b >>> 0x18 & 0xff, _0x454c1b >>> 0x10 & 0xff, _0x454c1b >>> 0x8 & 0xff, _0x454c1b & 0xff]);
        }
        if ((_0x454c1b & 0xff0000) != 0x0) {
          return new Uint8Array([_0x454c1b >>> 0x10 & 0xff, _0x454c1b >>> 0x8 & 0xff, _0x454c1b & 0xff]);
        }
        if ((_0x454c1b & 0xff00) != 0x0) {
          return new Uint8Array([_0x454c1b >>> 0x8 & 0xff, _0x454c1b & 0xff]);
        }
        if ((_0x454c1b & 0xff) != 0x0) {
          return new Uint8Array([_0x454c1b & 0xff]);
        }
        throw "InvalidOperationException";
      }
      function _0x25a2ad(_0x648861) {
        if (_0x648861 <= 0x7f) {
          return new Uint8Array([0x80 | _0x648861 & 0x7f]);
        }
        if (_0x648861 <= 0x3fff) {
          return new Uint8Array([0x40 | _0x648861 >> 0x8 & 0x3f, _0x648861 & 0xff]);
        }
        return new Uint8Array([0x8, _0x648861 >>> 0x18 & 0xff, _0x648861 >>> 0x10 & 0xff, _0x648861 >>> 0x8 & 0xff, _0x648861 & 0xff]);
      }
      function _0x230c72(_0x1d4b97, _0x325d0b) {
        var _0x1d6477 = new DataView(new ArrayBuffer(0x4));
        _0x1d6477.setFloat32(0x0, _0x325d0b, false);
        return _0x23cac5(_0x1d4b97, new Uint8Array(_0x1d6477.buffer));
      }
      function _0x48b9ed(_0x3d15d9) {
        if (_0x3d15d9 <= 0xff) {
          return new Uint8Array([_0x3d15d9 & 0xff]);
        }
        if (_0x3d15d9 <= 0xffff) {
          return new Uint8Array([_0x3d15d9 >>> 0x8 & 0xff, _0x3d15d9 & 0xff]);
        }
        if (_0x3d15d9 <= 0xffffff) {
          return new Uint8Array([_0x3d15d9 >> 0x10 & 0xff, _0x3d15d9 >> 0x8 & 0xff, _0x3d15d9 & 0xff]);
        }
        return new Uint8Array([_0x3d15d9 >>> 0x18 & 0xff, _0x3d15d9 >>> 0x10 & 0xff, _0x3d15d9 >>> 0x8 & 0xff, _0x3d15d9 & 0xff]);
        var _0x5f4ba7 = new DataView(new ArrayBuffer(0x4));
        _0x5f4ba7.setUint32(0x0, _0x3d15d9, false);
        return _0x5f4ba7;
      }
      function _0x2163a0() {
        let _0x2ece5a = {
          'id': 0x1a45dfa3,
          'data': [_0x23cac5(0x4286, _0x48b9ed(0x1)), _0x23cac5(0x42f7, _0x48b9ed(0x1)), _0x23cac5(0x42f2, _0x48b9ed(0x4)), _0x23cac5(0x42f3, _0x48b9ed(0x8)), _0x23cac5(0x4282, new TextEncoder().encode("webm")), _0x23cac5(0x4287, _0x48b9ed(0x4)), _0x23cac5(0x4285, _0x48b9ed(0x2))]
        };
        let _0x48629d = {
          'id': 0x1549a966,
          'data': [_0x23cac5(0x2ad7b1, _0x48b9ed(0xf4240)), _0x23cac5(0x4d80, new TextEncoder().encode("VDO-Ninja")), _0x23cac5(0x5741, new TextEncoder().encode("VDO-Ninja")), _0x50bffb]
        };
        let _0x20a30b = {
          'id': 0x1654ae6b,
          'data': [{
            'id': 0xae,
            'data': [_0x23cac5(0xd7, _0x48b9ed(0x1)), _0x23cac5(0x73c5, _0x48b9ed(0x1)), _0x23cac5(0x9c, _0x48b9ed(0x0)), _0x23cac5(0x22b59c, new TextEncoder().encode("und")), _0x23cac5(0x86, new TextEncoder().encode('V_' + _0x3c34b6.codec)), _0x23cac5(0x83, _0x48b9ed(0x1)), {
              'id': 0xe0,
              'data': [_0x23cac5(0xb0, _0x48b9ed(_0x515026)), _0x23cac5(0xba, _0x48b9ed(_0x427735))]
            }]
          }, {
            'id': 0xae,
            'data': [_0x23cac5(0xd7, _0x48b9ed(0x2)), _0x23cac5(0x73c5, _0x48b9ed(0x2)), _0x23cac5(0x9c, _0x48b9ed(0x0)), _0x23cac5(0x22b59c, new TextEncoder().encode('und')), _0x23cac5(0x86, new TextEncoder().encode("A_OPUS")), _0x23cac5(0x83, _0x48b9ed(0x2)), {
              'id': 0xe1,
              'data': [_0x230c72(0xb5, _0x13133d), _0x23cac5(0x9f, _0x48b9ed(_0x21f2a9))]
            }, _0x23cac5(0x63a2, new Uint8Array(['O'.charCodeAt(0x0), 'p'.charCodeAt(0x0), 'u'.charCodeAt(0x0), 's'.charCodeAt(0x0), 'H'.charCodeAt(0x0), 'e'.charCodeAt(0x0), 'a'.charCodeAt(0x0), 'd'.charCodeAt(0x0), 0x1, _0x21f2a9 & 0xff, 0x38, 0x1, _0x13133d >>> 0x0 & 0xff, _0x13133d >>> 0x8 & 0xff, _0x13133d >>> 0x10 & 0xff, _0x13133d >>> 0x18 & 0xff, 0x0, 0x0, 0x0]))]
          }]
        };
        _0x36849b = {
          'id': 0x18538067,
          'size': -0x1,
          'data': [_0x48629d, _0x20a30b]
        };
        let _0x36f1dc = new _0x503c75(0x200);
        _0x39e23b(_0x36f1dc, _0x344637.pos, [_0x2ece5a, _0x36849b]);
        _0x344637.write(_0x36f1dc.getAsDataArray());
        _0x4c3b24 = true;
      }
      function _0x55860c(_0x58b480) {
        let _0x556087 = new _0x503c75(4);
        if (!(_0x58b480.trackNumber > 0x0 && _0x58b480.trackNumber < 0x7f)) {
          throw new Error("TrackNumber must be > 0 and < 127");
        }
        _0x556087.writeEBMLVarInt(_0x58b480.trackNumber);
        _0x556087.writeU16BE(_0x58b480.timecode);
        _0x556087.writeByte((_0x58b480.type == "key" ? 0x1 : 0x0) << 0x7);
        return {
          'id': 0xa3,
          'data': [_0x556087.getAsDataArray(), _0x58b480.frame]
        };
      }
      function _0x25f22e() {
        if (_0x1cac5e.length === 0x0) {
          return;
        }
        let _0x1114f8 = 0x0;
        for (let _0x23db32 = 0x0; _0x23db32 < _0x1cac5e.length; _0x23db32++) {
          _0x1114f8 += _0x1cac5e[_0x23db32].frame.byteLength;
        }
        let _0x2cc56e = new _0x503c75(_0x1114f8 + _0x1cac5e.length * 0x40);
        let _0x1aa133 = {
          'id': 0x1f43b675,
          'data': [{
            'id': 0xe7,
            'data': Math.round({
              'timecode': Math.round(_0x420b6e)
            }.timecode)
          }]
        };
        for (let _0xf3caf5 = 0x0; _0xf3caf5 < _0x1cac5e.length; _0xf3caf5++) {
          _0x1aa133.data.push(_0x55860c(_0x1cac5e[_0xf3caf5]));
        }
        _0x39e23b(_0x2cc56e, _0x344637.pos, _0x1aa133);
        _0x344637.write(_0x2cc56e.getAsDataArray());
        _0x1cac5e = [];
        _0xc385cc = 0x0;
      }
      function _0x5f2a36(_0x3e705d, _0x102bba) {
        _0x3e705d.trackNumber = _0x102bba;
        var _0x57f160 = _0x3e705d.intime / 0x3e8;
        if (_0x53b4e0) {
          _0xb46f98 = _0x57f160;
          _0x57f160 = 0x0;
          _0x53b4e0 = false;
        } else {
          _0x57f160 = _0x57f160 - _0xb46f98;
        }
        _0x18f19b = _0x57f160;
        if (_0xc385cc == 0x0) {
          _0x420b6e = _0x57f160;
        }
        _0x3e705d.timecode = Math.round(_0x57f160 - _0x420b6e);
        _0x1cac5e.push(_0x3e705d);
        _0xc385cc = _0x3e705d.timecode + 0x1;
        if (_0xc385cc >= 0x1388) {
          _0x25f22e();
        }
      }
      function _0x2eecbf() {
        let _0x1f84b4 = new _0x503c75(0x8);
        let _0x18cd20 = _0x344637.pos;
        _0x1f84b4.writeDoubleBE(_0x18f19b);
        _0x344637.seek(_0x50bffb.dataOffset);
        _0x344637.write(_0x1f84b4.getAsDataArray());
        _0x344637.seek(_0x18cd20);
      }
      this.addFrame = function (_0x2974dd) {
        if (!_0x4c3b24) {
          _0x515026 = _0x3c34b6.width;
          _0x427735 = _0x3c34b6.height;
          _0x13133d = _0x3c34b6.samplingFrequency;
          _0x21f2a9 = _0x3c34b6.channels;
          _0x2163a0();
        }
        if (_0x2974dd.constructor.name == 'EncodedVideoChunk') {
          let _0x34cd09 = new Uint8Array(_0x2974dd.byteLength);
          _0x2974dd.copyTo(_0x34cd09);
          _0x5f2a36({
            'frame': _0x34cd09,
            'intime': _0x2974dd.timestamp,
            'type': _0x2974dd.type
          }, 0x1);
          return;
        } else {
          if (_0x2974dd.constructor.name == 'EncodedAudioChunk') {
            let _0x3c8dec = new Uint8Array(_0x2974dd.byteLength);
            _0x2974dd.copyTo(_0x3c8dec);
            _0x5f2a36({
              'frame': _0x3c8dec,
              'intime': _0x2974dd.timestamp,
              'type': _0x2974dd.type
            }, 0x2);
            return;
          }
        }
      };
      this.complete = function () {
        if (!_0x4c3b24) {
          _0x2163a0();
        }
        _0x53b4e0 = true;
        _0x25f22e();
        _0x2eecbf();
        return _0x344637.complete("video/webm");
      };
      this.getWrittenSize = function () {
        return _0x344637.length;
      };
      _0x3c34b6 = _0x53080b(_0x1b3ed9, _0x3c34b6 || {});
    };
  };
  window.WebMWriter = _0x195c2a(window.ArrayBufferDataStream, window.BlobBuffer);
})();
