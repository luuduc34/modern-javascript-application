// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"chart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add_chart = add_chart;
exports.get_hour = get_hour;
exports.weatherDetailsHourly = weatherDetailsHourly;

function weatherDetailsHourly(value) {
  //console.log(value);
  add_chart(value);
}

function get_hour(value) {
  let result = value.substr(11, 2) + "h";
  return result;
}

function add_chart(value) {
  const labels = [];

  for (let i = 0; i < 9; i++) {
    labels[i] = get_hour(value.list[i].dt_txt);
  }

  const data = {
    labels: labels,
    datasets: [{
      label: 'Temperatures du jour sur 24 heures',
      backgroundColor: 'rgb(61, 170, 248)',
      borderColor: 'rgb(61, 170, 248)',
      data: [Math.round(value.list[0].main.temp), Math.round(value.list[1].main.temp), Math.round(value.list[2].main.temp), Math.round(value.list[3].main.temp), Math.round(value.list[4].main.temp), Math.round(value.list[5].main.temp), Math.round(value.list[6].main.temp), Math.round(value.list[7].main.temp), Math.round(value.list[8].main.temp)]
    }]
  };
  const config = {
    type: 'line',
    data: data,
    //plugins: [plugin],
    options: {
      responsive: true
    }
  };
  const ctx = document.getElementById('myChart').getContext('2d');
  let chartStatus = Chart.getChart("myChart");

  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  const myChart = new Chart(ctx, config);
}
},{}],"api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestApi = requestApi;
exports.requestApi_unsplash = requestApi_unsplash;

var _chart = require("./chart.js");

const API_KEY = '1a8f49efd80db8c189bb16e06cd70e63'; // For Openweather API

const CLIENT_ID = 'KiROWCmL9ZKZnoWjHWJlIdCP5jLw2f_2ziSpzcUcqIY'; // For Unsplash API

const wrapper = document.querySelector(".wrapper");

function requestApi(value) {
  // return data from API call promise to weatheDetails function   
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}&units=metric&lang=fr`;
  fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function requestApi_unsplash(value) {
  // return data from API call promise to UnsplashDetails function
  let api_unsplash = `https://api.unsplash.com/search/photos?query=${value}&client_id=${CLIENT_ID}`;
  fetch(api_unsplash).then(response => response.json()).then(result => UnsplashDetails(result));
}

function weatherDetails(value) {
  // Get elements from API
  const {
    lat,
    lon
  } = value.coord;
  let api2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely&appid=${API_KEY}&units=metric&lang=fr`;
  let api3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=current,minutely&appid=${API_KEY}&units=metric&lang=fr`;
  wrapper.querySelector(".location").innerHTML = "- " + value.name + " -";
  wrapper.querySelector(".one .weather").innerHTML = value.weather[0].description;
  wrapper.querySelector(".one .temp .numb").innerHTML = Math.round(value.main.temp);
  wrapper.querySelector(".one .min .numb").innerHTML = Math.round(value.main.temp_min);
  wrapper.querySelector(".one .max .numb").innerHTML = Math.round(value.main.temp_max);
  wrapper.querySelector(".icon1").src = `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`;
  console.log(value); // return data from API call promise to weatheDetails2 function      

  fetch(api2).then(response => response.json()).then(result => weatherDetailsOneCall(result));
  fetch(api3).then(response => response.json()).then(result => (0, _chart.weatherDetailsHourly)(result));
}

function UnsplashDetails(value) {
  const img_bg = value.results[0].urls.regular;
  document.body.style.backgroundImage = `url(${img_bg})`;
  document.body.style.backgroundSize = 'cover';
  console.log(value);
}

function weatherDetailsOneCall(value) {
  // Get elements from API
  const allDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const dayName_two = allDays[new Date(value.daily[1].dt * 1000).getDay()]; // It will give day index, and based on index we can get day name from the array.

  const dayName_thre = allDays[new Date(value.daily[2].dt * 1000).getDay()];
  const dayName_four = allDays[new Date(value.daily[3].dt * 1000).getDay()];
  const dayName_five = allDays[new Date(value.daily[4].dt * 1000).getDay()]; // D-day + 1 data        

  wrapper.querySelector(".day-two").innerHTML = dayName_two;
  document.querySelector(".icon2").src = `http://openweathermap.org/img/wn/${value.daily[1].weather[0].icon}.png`;
  wrapper.querySelector(".two .weather").innerHTML = value.daily[1].weather[0].description;
  wrapper.querySelector(".two .min .numb").innerHTML = Math.round(value.daily[1].temp.min);
  wrapper.querySelector(".two .max .numb").innerHTML = Math.round(value.daily[1].temp.max); // D-day + 2 data

  wrapper.querySelector(".day-thre").innerHTML = dayName_thre;
  document.querySelector(".icon3").src = `http://openweathermap.org/img/wn/${value.daily[2].weather[0].icon}.png`;
  wrapper.querySelector(".thre .weather").innerHTML = value.daily[2].weather[0].description;
  wrapper.querySelector(".thre .min .numb").innerHTML = Math.round(value.daily[2].temp.min);
  wrapper.querySelector(".thre .max .numb").innerHTML = Math.round(value.daily[2].temp.max); // D-day + 3 data        

  wrapper.querySelector(".day-four").innerHTML = dayName_four;
  document.querySelector(".icon4").src = `http://openweathermap.org/img/wn/${value.daily[3].weather[0].icon}.png`;
  wrapper.querySelector(".four .weather").innerHTML = value.daily[3].weather[0].description;
  wrapper.querySelector(".four .min .numb").innerHTML = Math.round(value.daily[3].temp.min);
  wrapper.querySelector(".four .max .numb").innerHTML = Math.round(value.daily[3].temp.max); // D-day + 4 data        

  wrapper.querySelector(".day-five").innerHTML = dayName_five;
  document.querySelector(".icon5").src = `http://openweathermap.org/img/wn/${value.daily[4].weather[0].icon}.png`;
  wrapper.querySelector(".five .weather").innerHTML = value.daily[4].weather[0].description;
  wrapper.querySelector(".five .min .numb").innerHTML = Math.round(value.daily[4].temp.min);
  wrapper.querySelector(".five .max .numb").innerHTML = Math.round(value.daily[4].temp.max);
  console.log(value);
}
},{"./chart.js":"chart.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _chart = require("./chart.js");

var _api = require("./api.js");

const wrapper = document.querySelector(".wrapper");
const inputField = wrapper.querySelector("input");
let tempo = "Historique : ";
apisCall('liege'); // Start with weather of Liege
// Call requestApi and requestApi_unsplash when put value in field and press "enter"

inputField.addEventListener("keyup", e => {
  if (e.key == "Enter" && inputField.value != "") {
    apisCall(inputField.value);
    history(inputField.value);
  }
}); // Call all API when give new city

function apisCall(value) {
  (0, _api.requestApi)(value);
  (0, _api.requestApi_unsplash)(value);
}

function history(val) {
  tempo += " " + val + " -";
  let visited = tempo.substring(0, tempo.length - 1);
  wrapper.querySelector('.visited').innerHTML = visited;
}
},{"./chart.js":"chart.js","./api.js":"api.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64317" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/modern-javascript-application.e31bb0bc.js.map