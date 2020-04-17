/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "c610e3146c5d89a7f9cc";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"./script.min": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"vendor.min"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!***************************************************!*\
  !*** ../node_modules/moment/locale sync ^\.\/.*$ ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../node_modules/moment/locale/af.js",
	"./af.js": "../node_modules/moment/locale/af.js",
	"./ar": "../node_modules/moment/locale/ar.js",
	"./ar-dz": "../node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "../node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "../node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "../node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "../node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "../node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "../node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "../node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "../node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "../node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "../node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "../node_modules/moment/locale/ar-tn.js",
	"./ar.js": "../node_modules/moment/locale/ar.js",
	"./az": "../node_modules/moment/locale/az.js",
	"./az.js": "../node_modules/moment/locale/az.js",
	"./be": "../node_modules/moment/locale/be.js",
	"./be.js": "../node_modules/moment/locale/be.js",
	"./bg": "../node_modules/moment/locale/bg.js",
	"./bg.js": "../node_modules/moment/locale/bg.js",
	"./bm": "../node_modules/moment/locale/bm.js",
	"./bm.js": "../node_modules/moment/locale/bm.js",
	"./bn": "../node_modules/moment/locale/bn.js",
	"./bn.js": "../node_modules/moment/locale/bn.js",
	"./bo": "../node_modules/moment/locale/bo.js",
	"./bo.js": "../node_modules/moment/locale/bo.js",
	"./br": "../node_modules/moment/locale/br.js",
	"./br.js": "../node_modules/moment/locale/br.js",
	"./bs": "../node_modules/moment/locale/bs.js",
	"./bs.js": "../node_modules/moment/locale/bs.js",
	"./ca": "../node_modules/moment/locale/ca.js",
	"./ca.js": "../node_modules/moment/locale/ca.js",
	"./cs": "../node_modules/moment/locale/cs.js",
	"./cs.js": "../node_modules/moment/locale/cs.js",
	"./cv": "../node_modules/moment/locale/cv.js",
	"./cv.js": "../node_modules/moment/locale/cv.js",
	"./cy": "../node_modules/moment/locale/cy.js",
	"./cy.js": "../node_modules/moment/locale/cy.js",
	"./da": "../node_modules/moment/locale/da.js",
	"./da.js": "../node_modules/moment/locale/da.js",
	"./de": "../node_modules/moment/locale/de.js",
	"./de-at": "../node_modules/moment/locale/de-at.js",
	"./de-at.js": "../node_modules/moment/locale/de-at.js",
	"./de-ch": "../node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "../node_modules/moment/locale/de-ch.js",
	"./de.js": "../node_modules/moment/locale/de.js",
	"./dv": "../node_modules/moment/locale/dv.js",
	"./dv.js": "../node_modules/moment/locale/dv.js",
	"./el": "../node_modules/moment/locale/el.js",
	"./el.js": "../node_modules/moment/locale/el.js",
	"./en-SG": "../node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "../node_modules/moment/locale/en-SG.js",
	"./en-au": "../node_modules/moment/locale/en-au.js",
	"./en-au.js": "../node_modules/moment/locale/en-au.js",
	"./en-ca": "../node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "../node_modules/moment/locale/en-ca.js",
	"./en-gb": "../node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "../node_modules/moment/locale/en-gb.js",
	"./en-ie": "../node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "../node_modules/moment/locale/en-ie.js",
	"./en-il": "../node_modules/moment/locale/en-il.js",
	"./en-il.js": "../node_modules/moment/locale/en-il.js",
	"./en-nz": "../node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "../node_modules/moment/locale/en-nz.js",
	"./eo": "../node_modules/moment/locale/eo.js",
	"./eo.js": "../node_modules/moment/locale/eo.js",
	"./es": "../node_modules/moment/locale/es.js",
	"./es-do": "../node_modules/moment/locale/es-do.js",
	"./es-do.js": "../node_modules/moment/locale/es-do.js",
	"./es-us": "../node_modules/moment/locale/es-us.js",
	"./es-us.js": "../node_modules/moment/locale/es-us.js",
	"./es.js": "../node_modules/moment/locale/es.js",
	"./et": "../node_modules/moment/locale/et.js",
	"./et.js": "../node_modules/moment/locale/et.js",
	"./eu": "../node_modules/moment/locale/eu.js",
	"./eu.js": "../node_modules/moment/locale/eu.js",
	"./fa": "../node_modules/moment/locale/fa.js",
	"./fa.js": "../node_modules/moment/locale/fa.js",
	"./fi": "../node_modules/moment/locale/fi.js",
	"./fi.js": "../node_modules/moment/locale/fi.js",
	"./fo": "../node_modules/moment/locale/fo.js",
	"./fo.js": "../node_modules/moment/locale/fo.js",
	"./fr": "../node_modules/moment/locale/fr.js",
	"./fr-ca": "../node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "../node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "../node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "../node_modules/moment/locale/fr-ch.js",
	"./fr.js": "../node_modules/moment/locale/fr.js",
	"./fy": "../node_modules/moment/locale/fy.js",
	"./fy.js": "../node_modules/moment/locale/fy.js",
	"./ga": "../node_modules/moment/locale/ga.js",
	"./ga.js": "../node_modules/moment/locale/ga.js",
	"./gd": "../node_modules/moment/locale/gd.js",
	"./gd.js": "../node_modules/moment/locale/gd.js",
	"./gl": "../node_modules/moment/locale/gl.js",
	"./gl.js": "../node_modules/moment/locale/gl.js",
	"./gom-latn": "../node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "../node_modules/moment/locale/gom-latn.js",
	"./gu": "../node_modules/moment/locale/gu.js",
	"./gu.js": "../node_modules/moment/locale/gu.js",
	"./he": "../node_modules/moment/locale/he.js",
	"./he.js": "../node_modules/moment/locale/he.js",
	"./hi": "../node_modules/moment/locale/hi.js",
	"./hi.js": "../node_modules/moment/locale/hi.js",
	"./hr": "../node_modules/moment/locale/hr.js",
	"./hr.js": "../node_modules/moment/locale/hr.js",
	"./hu": "../node_modules/moment/locale/hu.js",
	"./hu.js": "../node_modules/moment/locale/hu.js",
	"./hy-am": "../node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "../node_modules/moment/locale/hy-am.js",
	"./id": "../node_modules/moment/locale/id.js",
	"./id.js": "../node_modules/moment/locale/id.js",
	"./is": "../node_modules/moment/locale/is.js",
	"./is.js": "../node_modules/moment/locale/is.js",
	"./it": "../node_modules/moment/locale/it.js",
	"./it-ch": "../node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "../node_modules/moment/locale/it-ch.js",
	"./it.js": "../node_modules/moment/locale/it.js",
	"./ja": "../node_modules/moment/locale/ja.js",
	"./ja.js": "../node_modules/moment/locale/ja.js",
	"./jv": "../node_modules/moment/locale/jv.js",
	"./jv.js": "../node_modules/moment/locale/jv.js",
	"./ka": "../node_modules/moment/locale/ka.js",
	"./ka.js": "../node_modules/moment/locale/ka.js",
	"./kk": "../node_modules/moment/locale/kk.js",
	"./kk.js": "../node_modules/moment/locale/kk.js",
	"./km": "../node_modules/moment/locale/km.js",
	"./km.js": "../node_modules/moment/locale/km.js",
	"./kn": "../node_modules/moment/locale/kn.js",
	"./kn.js": "../node_modules/moment/locale/kn.js",
	"./ko": "../node_modules/moment/locale/ko.js",
	"./ko.js": "../node_modules/moment/locale/ko.js",
	"./ku": "../node_modules/moment/locale/ku.js",
	"./ku.js": "../node_modules/moment/locale/ku.js",
	"./ky": "../node_modules/moment/locale/ky.js",
	"./ky.js": "../node_modules/moment/locale/ky.js",
	"./lb": "../node_modules/moment/locale/lb.js",
	"./lb.js": "../node_modules/moment/locale/lb.js",
	"./lo": "../node_modules/moment/locale/lo.js",
	"./lo.js": "../node_modules/moment/locale/lo.js",
	"./lt": "../node_modules/moment/locale/lt.js",
	"./lt.js": "../node_modules/moment/locale/lt.js",
	"./lv": "../node_modules/moment/locale/lv.js",
	"./lv.js": "../node_modules/moment/locale/lv.js",
	"./me": "../node_modules/moment/locale/me.js",
	"./me.js": "../node_modules/moment/locale/me.js",
	"./mi": "../node_modules/moment/locale/mi.js",
	"./mi.js": "../node_modules/moment/locale/mi.js",
	"./mk": "../node_modules/moment/locale/mk.js",
	"./mk.js": "../node_modules/moment/locale/mk.js",
	"./ml": "../node_modules/moment/locale/ml.js",
	"./ml.js": "../node_modules/moment/locale/ml.js",
	"./mn": "../node_modules/moment/locale/mn.js",
	"./mn.js": "../node_modules/moment/locale/mn.js",
	"./mr": "../node_modules/moment/locale/mr.js",
	"./mr.js": "../node_modules/moment/locale/mr.js",
	"./ms": "../node_modules/moment/locale/ms.js",
	"./ms-my": "../node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "../node_modules/moment/locale/ms-my.js",
	"./ms.js": "../node_modules/moment/locale/ms.js",
	"./mt": "../node_modules/moment/locale/mt.js",
	"./mt.js": "../node_modules/moment/locale/mt.js",
	"./my": "../node_modules/moment/locale/my.js",
	"./my.js": "../node_modules/moment/locale/my.js",
	"./nb": "../node_modules/moment/locale/nb.js",
	"./nb.js": "../node_modules/moment/locale/nb.js",
	"./ne": "../node_modules/moment/locale/ne.js",
	"./ne.js": "../node_modules/moment/locale/ne.js",
	"./nl": "../node_modules/moment/locale/nl.js",
	"./nl-be": "../node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "../node_modules/moment/locale/nl-be.js",
	"./nl.js": "../node_modules/moment/locale/nl.js",
	"./nn": "../node_modules/moment/locale/nn.js",
	"./nn.js": "../node_modules/moment/locale/nn.js",
	"./pa-in": "../node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "../node_modules/moment/locale/pa-in.js",
	"./pl": "../node_modules/moment/locale/pl.js",
	"./pl.js": "../node_modules/moment/locale/pl.js",
	"./pt": "../node_modules/moment/locale/pt.js",
	"./pt-br": "../node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "../node_modules/moment/locale/pt-br.js",
	"./pt.js": "../node_modules/moment/locale/pt.js",
	"./ro": "../node_modules/moment/locale/ro.js",
	"./ro.js": "../node_modules/moment/locale/ro.js",
	"./ru": "../node_modules/moment/locale/ru.js",
	"./ru.js": "../node_modules/moment/locale/ru.js",
	"./sd": "../node_modules/moment/locale/sd.js",
	"./sd.js": "../node_modules/moment/locale/sd.js",
	"./se": "../node_modules/moment/locale/se.js",
	"./se.js": "../node_modules/moment/locale/se.js",
	"./si": "../node_modules/moment/locale/si.js",
	"./si.js": "../node_modules/moment/locale/si.js",
	"./sk": "../node_modules/moment/locale/sk.js",
	"./sk.js": "../node_modules/moment/locale/sk.js",
	"./sl": "../node_modules/moment/locale/sl.js",
	"./sl.js": "../node_modules/moment/locale/sl.js",
	"./sq": "../node_modules/moment/locale/sq.js",
	"./sq.js": "../node_modules/moment/locale/sq.js",
	"./sr": "../node_modules/moment/locale/sr.js",
	"./sr-cyrl": "../node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "../node_modules/moment/locale/sr.js",
	"./ss": "../node_modules/moment/locale/ss.js",
	"./ss.js": "../node_modules/moment/locale/ss.js",
	"./sv": "../node_modules/moment/locale/sv.js",
	"./sv.js": "../node_modules/moment/locale/sv.js",
	"./sw": "../node_modules/moment/locale/sw.js",
	"./sw.js": "../node_modules/moment/locale/sw.js",
	"./ta": "../node_modules/moment/locale/ta.js",
	"./ta.js": "../node_modules/moment/locale/ta.js",
	"./te": "../node_modules/moment/locale/te.js",
	"./te.js": "../node_modules/moment/locale/te.js",
	"./tet": "../node_modules/moment/locale/tet.js",
	"./tet.js": "../node_modules/moment/locale/tet.js",
	"./tg": "../node_modules/moment/locale/tg.js",
	"./tg.js": "../node_modules/moment/locale/tg.js",
	"./th": "../node_modules/moment/locale/th.js",
	"./th.js": "../node_modules/moment/locale/th.js",
	"./tl-ph": "../node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "../node_modules/moment/locale/tl-ph.js",
	"./tlh": "../node_modules/moment/locale/tlh.js",
	"./tlh.js": "../node_modules/moment/locale/tlh.js",
	"./tr": "../node_modules/moment/locale/tr.js",
	"./tr.js": "../node_modules/moment/locale/tr.js",
	"./tzl": "../node_modules/moment/locale/tzl.js",
	"./tzl.js": "../node_modules/moment/locale/tzl.js",
	"./tzm": "../node_modules/moment/locale/tzm.js",
	"./tzm-latn": "../node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "../node_modules/moment/locale/tzm.js",
	"./ug-cn": "../node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "../node_modules/moment/locale/ug-cn.js",
	"./uk": "../node_modules/moment/locale/uk.js",
	"./uk.js": "../node_modules/moment/locale/uk.js",
	"./ur": "../node_modules/moment/locale/ur.js",
	"./ur.js": "../node_modules/moment/locale/ur.js",
	"./uz": "../node_modules/moment/locale/uz.js",
	"./uz-latn": "../node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "../node_modules/moment/locale/uz-latn.js",
	"./uz.js": "../node_modules/moment/locale/uz.js",
	"./vi": "../node_modules/moment/locale/vi.js",
	"./vi.js": "../node_modules/moment/locale/vi.js",
	"./x-pseudo": "../node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../node_modules/moment/locale/x-pseudo.js",
	"./yo": "../node_modules/moment/locale/yo.js",
	"./yo.js": "../node_modules/moment/locale/yo.js",
	"./zh-cn": "../node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "../node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "../node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "../node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "../node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "../node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "../node_modules/webpack/hot sync ^\\.\\/log$":
/*!***************************************************************!*\
  !*** ../node_modules/webpack/hot sync nonrecursive ^\.\/log$ ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "../node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./App.tsx":
/*!*****************!*\
  !*** ./App.tsx ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "../node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-thunk */ "../node_modules/redux-thunk/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-persist */ "../node_modules/redux-persist/es/index.js");
/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux-persist/integration/react */ "../node_modules/redux-persist/es/integration/react.js");
/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! redux-persist/lib/storage */ "../node_modules/redux-persist/lib/storage/index.js");
/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "../node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "../node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "../node_modules/@fortawesome/free-regular-svg-icons/index.es.js");
/* harmony import */ var _reducers_reducer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./reducers/reducer */ "./reducers/reducer.ts");
/* harmony import */ var _layouts_Layout__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./layouts/Layout */ "./layouts/Layout.tsx");
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/Loading */ "./components/Loading.tsx");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./style.scss */ "./style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_16__);

















var middleware = Object(redux__WEBPACK_IMPORTED_MODULE_3__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_4__["default"]);
var persistConfig = {
  key: 'root',
  storage: redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_8___default.a
};
var persistedReducer = Object(redux_persist__WEBPACK_IMPORTED_MODULE_6__["persistReducer"])(persistConfig, _reducers_reducer__WEBPACK_IMPORTED_MODULE_13__["reducer"]);
var store = Object(redux__WEBPACK_IMPORTED_MODULE_3__["createStore"])(persistedReducer, middleware);
var persistor = Object(redux_persist__WEBPACK_IMPORTED_MODULE_6__["persistStore"])(store);
_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_10__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__["fas"], _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_12__["far"]);
console.log("http://data.fixer.io/api", "d94f56526c77672e0af492e64fe10040");
axios__WEBPACK_IMPORTED_MODULE_9___default.a.interceptors.request.use(function (config) {
  var separator = config.url.includes('?') ? '&' : '?';
  config.url = "".concat("http://data.fixer.io/api" || false).concat(config.url).concat(separator, "access_key=").concat("d94f56526c77672e0af492e64fe10040");
  return config;
});
react_dom__WEBPACK_IMPORTED_MODULE_1__["render"]( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_redux__WEBPACK_IMPORTED_MODULE_5__["Provider"], {
  store: store
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_7__["PersistGate"], {
  loading: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Loading__WEBPACK_IMPORTED_MODULE_15__["default"], null),
  persistor: persistor
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_layouts_Layout__WEBPACK_IMPORTED_MODULE_14__["default"], null)))), document.getElementById('app'));

/***/ }),

/***/ "./actions/converter.actions.ts":
/*!**************************************!*\
  !*** ./actions/converter.actions.ts ***!
  \**************************************/
/*! exports provided: changeBase, changeAmount, addCurrency, removeCurrency, clearCurrencies, changeCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeBase", function() { return changeBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeAmount", function() { return changeAmount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCurrency", function() { return addCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCurrency", function() { return removeCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCurrencies", function() { return clearCurrencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCurrency", function() { return changeCurrency; });
/* harmony import */ var _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/actions.enums */ "./enums/actions.enums.ts");
/* harmony import */ var _selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selectors/converter.selectors */ "./selectors/converter.selectors.ts");


var changeBase = function changeBase(value) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].ChangeBase,
    payload: value
  };
};
var changeAmount = function changeAmount(value) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].ChangeAmount,
    payload: value
  };
};
var addCurrency = function addCurrency(value) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].AddCurrency,
    payload: value
  };
};
var removeCurrency = function removeCurrency(value) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].RemoveCurrency,
    payload: value
  };
};
var clearCurrencies = function clearCurrencies() {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].ClearCurrencies
  };
};
var changeCurrency = function changeCurrency(value) {
  return function (dispatch, getState) {
    var selected = Object(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_1__["selectCurrencies"])(getState());

    if (selected.includes(value)) {
      dispatch(removeCurrency(value));
    } else {
      dispatch(addCurrency(value));
    }
  };
};

/***/ }),

/***/ "./actions/currency.actions.ts":
/*!*************************************!*\
  !*** ./actions/currency.actions.ts ***!
  \*************************************/
/*! exports provided: loadCurrencies, loadCurrenciesSuccess, loadCurrenciesFailure, loadAllCurrencies, loadRates, loadRatesSuccess, loadRatesFailure, loadLatestRates, fetchLatestRates, loadHistoricalRates, fetchHistoricalRates, changeFromDate, changeToDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCurrencies", function() { return loadCurrencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCurrenciesSuccess", function() { return loadCurrenciesSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCurrenciesFailure", function() { return loadCurrenciesFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllCurrencies", function() { return loadAllCurrencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadRates", function() { return loadRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadRatesSuccess", function() { return loadRatesSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadRatesFailure", function() { return loadRatesFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadLatestRates", function() { return loadLatestRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLatestRates", function() { return fetchLatestRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadHistoricalRates", function() { return loadHistoricalRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchHistoricalRates", function() { return fetchHistoricalRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFromDate", function() { return changeFromDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeToDate", function() { return changeToDate; });
/* harmony import */ var _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/actions.enums */ "./enums/actions.enums.ts");
/* harmony import */ var _services_currency_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/currency.service */ "./services/currency.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../selectors/converter.selectors */ "./selectors/converter.selectors.ts");
/* harmony import */ var _selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../selectors/currency.selectors */ "./selectors/currency.selectors.ts");
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var loadCurrencies = function loadCurrencies() {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadCurrencies
  };
};
var loadCurrenciesSuccess = function loadCurrenciesSuccess(data) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadCurrenciesSuccess,
    payload: data
  };
};
var loadCurrenciesFailure = function loadCurrenciesFailure(error) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadCurrenciesFailure,
    payload: error
  };
};
var loadAllCurrencies = function loadAllCurrencies() {
  return function (dispatch) {
    dispatch(loadCurrencies());
    return Object(_services_currency_service__WEBPACK_IMPORTED_MODULE_1__["fetchCurrencies"])().then(function (response) {
      dispatch(loadCurrenciesSuccess(response.symbols));
    })["catch"](function (error) {
      dispatch(loadCurrenciesFailure(error === null || error === void 0 ? void 0 : error.toString()));
    });
  };
};
var loadRates = function loadRates() {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadRates
  };
};
var loadRatesSuccess = function loadRatesSuccess(data) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadRatesSuccess,
    payload: data
  };
};
var loadRatesFailure = function loadRatesFailure(error) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadRatesFailure,
    payload: error
  };
};

var convertToRates = function convertToRates(response) {
  return _defineProperty({}, response.date, _defineProperty({}, response.base, response.rates));
};

var getCurrencies = function getCurrencies(state, date) {
  var allRates = Object(_selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_4__["selectAllRates"])(state);
  var base = Object(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_3__["selectBase"])(state);
  var defaultBase = Object(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_3__["selectDefaultBase"])(state);
  var currencies = Object(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_3__["selectCurrencies"])(state);
  var symbols = (currencies === null || currencies === void 0 ? void 0 : currencies.length) > 0 ? [base].concat(_toConsumableArray(currencies)) : [];
  var dateRates = allRates[date];

  if (dateRates) {
    var isBaseAsBase = Object.keys(dateRates).includes(base);
    var rates = isBaseAsBase ? dateRates[base] : dateRates[defaultBase];

    if (rates) {
      var ratesCurrencies = Object.keys(rates);

      if (symbols.every(function (symbol) {
        return ratesCurrencies.includes(symbol);
      })) {
        return [];
      }
    }
  }

  return [base, defaultBase].concat(_toConsumableArray(symbols));
};

var loadLatestRates = function loadLatestRates() {
  return function (dispatch, getState) {
    var date = moment__WEBPACK_IMPORTED_MODULE_2___default()().format('YYYY-MM-DD');
    var state = getState();

    var _getCurrencies = getCurrencies(state, date),
        _getCurrencies2 = _toArray(_getCurrencies),
        base = _getCurrencies2[0],
        defaultBase = _getCurrencies2[1],
        symbols = _getCurrencies2.slice(2);

    if (base && defaultBase) {
      dispatch(fetchLatestRates(base, defaultBase, symbols));
    }
  };
};
var fetchLatestRates = function fetchLatestRates(base, defaultBase, symbols) {
  return function (dispatch) {
    dispatch(loadRates());
    return Object(_services_currency_service__WEBPACK_IMPORTED_MODULE_1__["fetchLatest"])(base, symbols).then(function (response) {
      if (response.success) {
        dispatch(loadRatesSuccess(convertToRates(response)));
      } else {
        var _response$error, _response$error2, _response$error3;

        dispatch(loadRatesFailure("[".concat(((_response$error = response.error) === null || _response$error === void 0 ? void 0 : _response$error.code) || 'ERROR', "] ").concat(((_response$error2 = response.error) === null || _response$error2 === void 0 ? void 0 : _response$error2.type) || '')));

        if (((_response$error3 = response.error) === null || _response$error3 === void 0 ? void 0 : _response$error3.code) === 105 && defaultBase) {
          dispatch(fetchLatestRates(defaultBase, null, symbols));
        }
      }
    })["catch"](function (error) {
      dispatch(loadRatesFailure(error === null || error === void 0 ? void 0 : error.toString()));
    });
  };
};
var loadHistoricalRates = function loadHistoricalRates() {
  return function (dispatch, getState) {
    var state = getState();
    var fromDate = Object(_selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_4__["selectFromDate"])(state);
    var toDate = Object(_selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_4__["selectToDate"])(state);

    var _getCurrencies3 = getCurrencies(state, fromDate),
        _getCurrencies4 = _toArray(_getCurrencies3),
        fromBase = _getCurrencies4[0],
        fromDefaultBase = _getCurrencies4[1],
        fromSymbols = _getCurrencies4.slice(2);

    var _getCurrencies5 = getCurrencies(state, toDate),
        _getCurrencies6 = _toArray(_getCurrencies5),
        toBase = _getCurrencies6[0],
        toDefaultBase = _getCurrencies6[1],
        toSymbols = _getCurrencies6.slice(2);

    if (fromBase && fromDefaultBase) {
      dispatch(fetchHistoricalRates(fromDate, fromBase, fromDefaultBase, fromSymbols));
    }

    if (toBase && toDefaultBase) {
      dispatch(fetchHistoricalRates(toDate, toBase, toDefaultBase, toSymbols));
    }
  };
};
var fetchHistoricalRates = function fetchHistoricalRates(date, base, defaultBase, symbols) {
  return function (dispatch) {
    dispatch(loadRates());
    return Object(_services_currency_service__WEBPACK_IMPORTED_MODULE_1__["fetchHistorical"])(date, base, symbols).then(function (response) {
      if (response.success) {
        dispatch(loadRatesSuccess(convertToRates(response)));
      } else {
        var _response$error4, _response$error5, _response$error6;

        dispatch(loadRatesFailure("[".concat(((_response$error4 = response.error) === null || _response$error4 === void 0 ? void 0 : _response$error4.code) || 'ERROR', "] ").concat(((_response$error5 = response.error) === null || _response$error5 === void 0 ? void 0 : _response$error5.type) || '')));

        if (((_response$error6 = response.error) === null || _response$error6 === void 0 ? void 0 : _response$error6.code) === 105 && defaultBase) {
          dispatch(fetchHistoricalRates(date, defaultBase, null, symbols));
        }
      }
    })["catch"](function (error) {
      dispatch(loadRatesFailure(error === null || error === void 0 ? void 0 : error.toString()));
    });
  };
};
var changeFromDate = function changeFromDate(value) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].ChangeFromDate,
    payload: value
  };
};
var changeToDate = function changeToDate(value) {
  return {
    type: _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].ChangeToDate,
    payload: value
  };
};

/***/ }),

/***/ "./components/Field.tsx":
/*!******************************!*\
  !*** ./components/Field.tsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "../node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _field_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./field.scss */ "./components/field.scss");
/* harmony import */ var _field_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_field_scss__WEBPACK_IMPORTED_MODULE_2__);




var Field = function Field(props) {
  var _props$search;

  // const search = new RegExp(props.search, 'ig');
  // const name = props.search ? props.name.replace(search, `<strong>${props.search.toUpperCase()}</strong>`) : props.name;
  var start = props.name.toLowerCase().indexOf(props.search);
  var end = start + (((_props$search = props.search) === null || _props$search === void 0 ? void 0 : _props$search.length) || 0);
  var name = props.search ? [props.name.slice(0, start), '<strong>', props.name.slice(start, end), '</strong>', props.name.slice(end)].join('') : props.name;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "field ".concat(props.className || ''),
    "data-value": props.value
  }, props.icon ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__["FontAwesomeIcon"], {
    icon: props.icon,
    className: "field__icon"
  }) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
    className: "field__name",
    dangerouslySetInnerHTML: {
      __html: name
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Field);

/***/ }),

/***/ "./components/Input.tsx":
/*!******************************!*\
  !*** ./components/Input.tsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _enums_common_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/common.enums */ "./enums/common.enums.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);




var Input = function Input(props) {
  var value = props.type === _enums_common_enums__WEBPACK_IMPORTED_MODULE_1__["InputType"].date ? moment__WEBPACK_IMPORTED_MODULE_2___default()(props.value).format('YYYY-MM-DD') : props.value;

  var changeHandler = function changeHandler(event) {
    props.changeHanlder(event.target.value);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: "input ".concat(props.className || '')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", {
    className: "input__label"
  }, props.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", {
    className: "input__input",
    type: props.type,
    value: value,
    onChange: changeHandler
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./components/Loading.tsx":
/*!********************************!*\
  !*** ./components/Loading.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var Loading = function Loading() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", null, "Loading...");
};

/* harmony default export */ __webpack_exports__["default"] = (Loading);

/***/ }),

/***/ "./components/Selector.tsx":
/*!*********************************!*\
  !*** ./components/Selector.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Field */ "./components/Field.tsx");
/* harmony import */ var _selector_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selector.scss */ "./components/selector.scss");
/* harmony import */ var _selector_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_selector_scss__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var Selector = function Selector(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      search = _useState2[0],
      setSearch = _useState2[1];

  var options = props.options.filter(function (option) {
    return option.name.toLocaleLowerCase().includes(search);
  });

  var getIcon = function getIcon(option) {
    if (props.noIcon) {
      return null;
    } else if (props.multiple) {
      return option.selected ? 'check-square' : 'square';
    } else {
      return option.selected ? 'check-circle' : 'circle';
    }
  };

  var clickHandler = function clickHandler(event) {
    var _event$target, _field$dataset;

    // @ts-ignore
    var field = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.closest('.field');
    var value = field === null || field === void 0 ? void 0 : (_field$dataset = field.dataset) === null || _field$dataset === void 0 ? void 0 : _field$dataset.value;

    if (value) {
      props.changeHandler(value);
    }
  };

  var changeHandler = function changeHandler(event) {
    setSearch(event.target.value.toLocaleLowerCase());
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", {
    className: "selector ".concat(props.className || ''),
    onClick: props.changeHandler ? clickHandler : null
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", {
    className: "selector__name"
  }, props.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", {
    className: "selector__filter"
  }, "Filter: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", {
    type: "text",
    onChange: changeHandler
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", {
    className: "selector__values"
  }, options.map(function (option) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Field__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: option.value,
      icon: getIcon(option),
      name: option.name,
      search: search,
      value: option.value
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Selector);

/***/ }),

/***/ "./components/field.scss":
/*!*******************************!*\
  !*** ./components/field.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./components/selector.scss":
/*!**********************************!*\
  !*** ./components/selector.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./enums/actions.enums.ts":
/*!********************************!*\
  !*** ./enums/actions.enums.ts ***!
  \********************************/
/*! exports provided: CurrencyActionType, ConverterActionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyActionType", function() { return CurrencyActionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConverterActionType", function() { return ConverterActionType; });
var CurrencyActionType;

(function (CurrencyActionType) {
  CurrencyActionType["LoadCurrencies"] = "[CURRENCY] Load Currencies";
  CurrencyActionType["LoadCurrenciesSuccess"] = "[CURRENCY] Load Currencies Success";
  CurrencyActionType["LoadCurrenciesFailure"] = "[CURRENCY] Load Currencies Failure";
  CurrencyActionType["LoadRates"] = "[CURRENCY] Load Rates";
  CurrencyActionType["LoadRatesSuccess"] = "[CURRENCY] Load Rates Success";
  CurrencyActionType["LoadRatesFailure"] = "[CURRENCY] Load Rates Failure";
  CurrencyActionType["ChangeFromDate"] = "[CONVERTER] Change From Date";
  CurrencyActionType["ChangeToDate"] = "[CONVERTER] Change To Date";
})(CurrencyActionType || (CurrencyActionType = {}));

;
var ConverterActionType;

(function (ConverterActionType) {
  ConverterActionType["ChangeBase"] = "[CONVERTER] Change Base";
  ConverterActionType["ChangeAmount"] = "[CONVERTER] Change Amount";
  ConverterActionType["AddCurrency"] = "[CONVERTER] Add Currency";
  ConverterActionType["RemoveCurrency"] = "[CONVERTER] Remove Currency";
  ConverterActionType["ClearCurrencies"] = "[CONVERTER] Clear Currencies";
})(ConverterActionType || (ConverterActionType = {}));

/***/ }),

/***/ "./enums/common.enums.ts":
/*!*******************************!*\
  !*** ./enums/common.enums.ts ***!
  \*******************************/
/*! exports provided: InputType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputType", function() { return InputType; });
var InputType;

(function (InputType) {
  InputType["text"] = "text";
  InputType["number"] = "number";
  InputType["date"] = "date";
  InputType["hidden"] = "hidden";
  InputType["checkbox"] = "checkbox";
})(InputType || (InputType = {}));

/***/ }),

/***/ "./layouts/Layout.tsx":
/*!****************************!*\
  !*** ./layouts/Layout.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _pages_HomePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/HomePage */ "./pages/HomePage.tsx");
/* harmony import */ var _pages_HistoricalPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/HistoricalPage */ "./pages/HistoricalPage.tsx");
/* harmony import */ var _layout_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout.scss */ "./layouts/layout.scss");
/* harmony import */ var _layout_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_layout_scss__WEBPACK_IMPORTED_MODULE_4__);






var Layout = function Layout() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("header", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    to: "/latest",
    strict: true,
    className: "link",
    activeClassName: "active"
  }, "Latest"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    to: "/history",
    className: "link",
    activeClassName: "active"
  }, "Historical")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/history",
    component: _pages_HistoricalPage__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/latest",
    component: _pages_HomePage__WEBPACK_IMPORTED_MODULE_2__["default"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    to: "/latest"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("footer", null));
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./layouts/layout.scss":
/*!*****************************!*\
  !*** ./layouts/layout.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./pages/HistoricalPage.tsx":
/*!**********************************!*\
  !*** ./pages/HistoricalPage.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_currency_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/currency.actions */ "./actions/currency.actions.ts");
/* harmony import */ var _selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../selectors/currency.selectors */ "./selectors/currency.selectors.ts");
/* harmony import */ var _selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../selectors/converter.selectors */ "./selectors/converter.selectors.ts");
/* harmony import */ var _components_Selector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Selector */ "./components/Selector.tsx");
/* harmony import */ var _actions_converter_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions/converter.actions */ "./actions/converter.actions.ts");
/* harmony import */ var _components_Input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Input */ "./components/Input.tsx");
/* harmony import */ var _homePage_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./homePage.scss */ "./pages/homePage.scss");
/* harmony import */ var _homePage_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_homePage_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _enums_common_enums__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../enums/common.enums */ "./enums/common.enums.ts");












var HistoricalPage = function HistoricalPage() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  var base = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectBase"]);
  var allCurrencies = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_3__["selectAllCurrencies"]);
  var currencies = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrenciesWithSelection"]);
  var baseCurrencies = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrenciesWithBase"]);
  var amount = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectAmount"]);
  var convertedAmounts = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectConvertedHistoricalAmounts"]);
  var fromDate = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_3__["selectFromDate"]);
  var toDate = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_3__["selectToDate"]);

  var baseChangeHandler = function baseChangeHandler(value) {
    dispatch(Object(_actions_converter_actions__WEBPACK_IMPORTED_MODULE_6__["changeBase"])(value));
  };

  var changeFromDateHandler = function changeFromDateHandler(value) {
    dispatch(Object(_actions_currency_actions__WEBPACK_IMPORTED_MODULE_2__["changeFromDate"])(value));
  };

  var changeToDateHandler = function changeToDateHandler(value) {
    dispatch(Object(_actions_currency_actions__WEBPACK_IMPORTED_MODULE_2__["changeToDate"])(value));
  };

  var currencyChangeHandler = function currencyChangeHandler(value) {
    dispatch(Object(_actions_converter_actions__WEBPACK_IMPORTED_MODULE_6__["changeCurrency"])(value));
  };

  var amountChangeHandler = function amountChangeHandler(value) {
    dispatch(Object(_actions_converter_actions__WEBPACK_IMPORTED_MODULE_6__["changeAmount"])(value));
  };

  var convertClickHandler = function convertClickHandler() {
    dispatch(Object(_actions_currency_actions__WEBPACK_IMPORTED_MODULE_2__["loadHistoricalRates"])());
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    dispatch(Object(_actions_currency_actions__WEBPACK_IMPORTED_MODULE_2__["loadAllCurrencies"])());
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("article", {
    className: "home"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", {
    className: "info"
  }, "We can convert ".concat(Object.keys(allCurrencies).length, " currencies")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Input__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "base-amount",
    name: "From amount [".concat(base, "]"),
    value: amount,
    type: _enums_common_enums__WEBPACK_IMPORTED_MODULE_9__["InputType"].number,
    changeHanlder: amountChangeHandler
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Input__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "from-date",
    name: "From date",
    value: fromDate,
    type: _enums_common_enums__WEBPACK_IMPORTED_MODULE_9__["InputType"].date,
    changeHanlder: changeFromDateHandler
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Input__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "to-date",
    name: "To date",
    value: toDate,
    type: _enums_common_enums__WEBPACK_IMPORTED_MODULE_9__["InputType"].date,
    changeHanlder: changeToDateHandler
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Selector__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: "base",
    name: "From",
    className: "base",
    options: baseCurrencies,
    changeHandler: baseChangeHandler
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
    className: "exchange",
    onClick: convertClickHandler
  }, "Convert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Selector__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: "amounts",
    name: "To Amount(s)",
    className: "currencies-amounts",
    noIcon: true,
    options: convertedAmounts
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Selector__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: "currencies",
    name: "To",
    className: "currencies",
    options: currencies,
    multiple: true,
    changeHandler: currencyChangeHandler
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (HistoricalPage);

/***/ }),

/***/ "./pages/HomePage.tsx":
/*!****************************!*\
  !*** ./pages/HomePage.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_currency_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/currency.actions */ "./actions/currency.actions.ts");
/* harmony import */ var _selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../selectors/currency.selectors */ "./selectors/currency.selectors.ts");
/* harmony import */ var _selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../selectors/converter.selectors */ "./selectors/converter.selectors.ts");
/* harmony import */ var _components_Selector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Selector */ "./components/Selector.tsx");
/* harmony import */ var _actions_converter_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions/converter.actions */ "./actions/converter.actions.ts");
/* harmony import */ var _components_Input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Input */ "./components/Input.tsx");
/* harmony import */ var _homePage_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./homePage.scss */ "./pages/homePage.scss");
/* harmony import */ var _homePage_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_homePage_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _enums_common_enums__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../enums/common.enums */ "./enums/common.enums.ts");












var HomePage = function HomePage() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  var base = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectBase"]);
  var allCurrencies = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_currency_selectors__WEBPACK_IMPORTED_MODULE_3__["selectAllCurrencies"]);
  var currencies = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrenciesWithSelection"]);
  var baseCurrencies = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectCurrenciesWithBase"]);
  var amount = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectAmount"]);
  var convertedAmounts = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_selectors_converter_selectors__WEBPACK_IMPORTED_MODULE_4__["selectConvertedAmounts"]);

  var baseChangeHandler = function baseChangeHandler(value) {
    dispatch(Object(_actions_converter_actions__WEBPACK_IMPORTED_MODULE_6__["changeBase"])(value));
  };

  var currencyChangeHandler = function currencyChangeHandler(value) {
    dispatch(Object(_actions_converter_actions__WEBPACK_IMPORTED_MODULE_6__["changeCurrency"])(value));
  };

  var amountChangeHandler = function amountChangeHandler(value) {
    dispatch(Object(_actions_converter_actions__WEBPACK_IMPORTED_MODULE_6__["changeAmount"])(value));
  };

  var convertClickHandler = function convertClickHandler() {
    dispatch(Object(_actions_currency_actions__WEBPACK_IMPORTED_MODULE_2__["loadLatestRates"])());
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    dispatch(Object(_actions_currency_actions__WEBPACK_IMPORTED_MODULE_2__["loadAllCurrencies"])());
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("article", {
    className: "home"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("section", {
    className: "info"
  }, "We can convert ".concat(Object.keys(allCurrencies).length, " currencies")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Input__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "base-amount",
    name: "From amount [".concat(base, "]"),
    value: amount,
    type: _enums_common_enums__WEBPACK_IMPORTED_MODULE_9__["InputType"].number,
    changeHanlder: amountChangeHandler
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Selector__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: "base",
    name: "From",
    className: "base",
    options: baseCurrencies,
    changeHandler: baseChangeHandler
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
    className: "exchange",
    onClick: convertClickHandler
  }, "Convert"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Selector__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: "amounts",
    name: "To Amount(s)",
    className: "currencies-amounts",
    noIcon: true,
    options: convertedAmounts
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Selector__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: "currencies",
    name: "To",
    className: "currencies",
    options: currencies,
    multiple: true,
    changeHandler: currencyChangeHandler
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (HomePage);

/***/ }),

/***/ "./pages/homePage.scss":
/*!*****************************!*\
  !*** ./pages/homePage.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./reducers/converter.reducer.ts":
/*!***************************************!*\
  !*** ./reducers/converter.reducer.ts ***!
  \***************************************/
/*! exports provided: converterReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "converterReducer", function() { return converterReducer; });
/* harmony import */ var _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/actions.enums */ "./enums/actions.enums.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var initialState = {
  base: 'EUR',
  amount: 0,
  currencies: [],
  defaultBase: 'EUR'
};
var converterReducer = function converterReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].ChangeBase:
      {
        return _objectSpread({}, state, {
          base: action.payload
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].ChangeAmount:
      {
        return _objectSpread({}, state, {
          amount: action.payload
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].AddCurrency:
      {
        return _objectSpread({}, state, {
          currencies: [].concat(_toConsumableArray(state.currencies), [action.payload])
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].RemoveCurrency:
      {
        return _objectSpread({}, state, {
          currencies: state.currencies.filter(function (currency) {
            return currency !== action.payload;
          })
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["ConverterActionType"].ClearCurrencies:
      {
        return _objectSpread({}, state, {
          currencies: []
        });
      }

    default:
      {
        return state;
      }
  }
};

/***/ }),

/***/ "./reducers/currency.reducer.ts":
/*!**************************************!*\
  !*** ./reducers/currency.reducer.ts ***!
  \**************************************/
/*! exports provided: currencyReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyReducer", function() { return currencyReducer; });
/* harmony import */ var _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums/actions.enums */ "./enums/actions.enums.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var initialState = {
  currencies: {
    loading: false,
    data: {},
    error: null
  },
  rates: {
    loading: false,
    data: {},
    error: null
  },
  date: moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYY-MM-DD'),
  fromDate: null,
  toDate: null
};
var currencyReducer = function currencyReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadCurrencies:
      {
        return _objectSpread({}, state, {
          currencies: _objectSpread({}, state.currencies, {
            loading: true
          })
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadCurrenciesSuccess:
      {
        return _objectSpread({}, state, {
          currencies: _objectSpread({}, state.currencies, {
            data: action.payload,
            loading: false
          })
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadCurrenciesFailure:
      {
        return _objectSpread({}, state, {
          currencies: _objectSpread({}, state.currencies, {
            error: action.payload,
            loading: false
          })
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadRates:
      {
        return _objectSpread({}, state, {
          rates: _objectSpread({}, state.rates, {
            loading: true
          })
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadRatesSuccess:
      {
        return _objectSpread({}, state, {
          rates: _objectSpread({}, state.rates, {
            data: _objectSpread({}, state.rates.data, {}, action.payload),
            loading: false
          })
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].LoadRatesFailure:
      {
        return _objectSpread({}, state, {
          rates: _objectSpread({}, state.rates, {
            error: action.payload,
            loading: false
          })
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].ChangeFromDate:
      {
        var fromDate = state.toDate && moment__WEBPACK_IMPORTED_MODULE_1___default()(state.toDate).isBefore(action.payload) ? state.toDate : action.payload;
        return _objectSpread({}, state, {
          fromDate: fromDate
        });
      }

    case _enums_actions_enums__WEBPACK_IMPORTED_MODULE_0__["CurrencyActionType"].ChangeToDate:
      {
        var toDate = state.fromDate && moment__WEBPACK_IMPORTED_MODULE_1___default()(state.fromDate).isAfter(action.payload) ? state.fromDate : action.payload;
        return _objectSpread({}, state, {
          toDate: toDate
        });
      }

    default:
      {
        return state;
      }
  }
};

/***/ }),

/***/ "./reducers/reducer.ts":
/*!*****************************!*\
  !*** ./reducers/reducer.ts ***!
  \*****************************/
/*! exports provided: reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "../node_modules/redux/es/redux.js");
/* harmony import */ var _currency_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currency.reducer */ "./reducers/currency.reducer.ts");
/* harmony import */ var _converter_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./converter.reducer */ "./reducers/converter.reducer.ts");



var reducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  currency: _currency_reducer__WEBPACK_IMPORTED_MODULE_1__["currencyReducer"],
  converter: _converter_reducer__WEBPACK_IMPORTED_MODULE_2__["converterReducer"]
});

/***/ }),

/***/ "./selectors/converter.selectors.ts":
/*!******************************************!*\
  !*** ./selectors/converter.selectors.ts ***!
  \******************************************/
/*! exports provided: selectConverterState, selectBase, selectAmount, selectCurrencies, selectDefaultBase, selectCurrenciesWithBase, selectCurrenciesWithSelection, selectSelectedCurrencies, selectConversionRates, selectConvertedAmounts, selectHistoricalConversionRates, selectConvertedHistoricalAmounts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectConverterState", function() { return selectConverterState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectBase", function() { return selectBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAmount", function() { return selectAmount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrencies", function() { return selectCurrencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDefaultBase", function() { return selectDefaultBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrenciesWithBase", function() { return selectCurrenciesWithBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrenciesWithSelection", function() { return selectCurrenciesWithSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSelectedCurrencies", function() { return selectSelectedCurrencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectConversionRates", function() { return selectConversionRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectConvertedAmounts", function() { return selectConvertedAmounts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectHistoricalConversionRates", function() { return selectHistoricalConversionRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectConvertedHistoricalAmounts", function() { return selectConvertedHistoricalAmounts; });
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reselect */ "../node_modules/reselect/es/index.js");
/* harmony import */ var _currency_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currency.selectors */ "./selectors/currency.selectors.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var selectConverterState = function selectConverterState(state) {
  return state.converter;
};
var selectBase = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectConverterState, function (state) {
  return state.base;
});
var selectAmount = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectConverterState, function (state) {
  return state.amount;
});
var selectCurrencies = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectConverterState, function (state) {
  return state.currencies;
});
var selectDefaultBase = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectConverterState, function (state) {
  return state.defaultBase;
});
var selectCurrenciesWithBase = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])([_currency_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllCurrencies"], selectBase], function (currencies, base) {
  return Object.keys(currencies).map(function (key) {
    return {
      value: key,
      name: "".concat(key, " (").concat(currencies[key], ")"),
      selected: key === base
    };
  });
});
var selectCurrenciesWithSelection = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])([_currency_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllCurrencies"], selectCurrencies], function (currencies, selected) {
  return Object.keys(currencies).map(function (key) {
    return {
      value: key,
      name: "".concat(key, " (").concat(currencies[key], ")"),
      selected: selected.includes(key)
    };
  });
});
var selectSelectedCurrencies = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])([_currency_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllCurrencies"], selectCurrencies], function (currencies, selected) {
  return (selected === null || selected === void 0 ? void 0 : selected.length) > 0 ? Object.keys(currencies).filter(function (key) {
    return selected.includes(key);
  }) : Object.keys(currencies);
});
var selectConversionRates = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])([selectBase, selectDefaultBase, selectSelectedCurrencies, _currency_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllRates"], _currency_selectors__WEBPACK_IMPORTED_MODULE_1__["selectDate"]], function (base, defaultBase, currencies, allRates, date) {
  var _dateRates$defaultBas;

  var dateRates = allRates[date];

  if (!dateRates) {
    return {};
  } // const availableCurrencies = Object.keys(dateRates);


  var isBaseAsBase = Object.keys(dateRates).includes(base);
  var baseRate = isBaseAsBase ? 1 : (_dateRates$defaultBas = dateRates[defaultBase]) === null || _dateRates$defaultBas === void 0 ? void 0 : _dateRates$defaultBas[base];

  if (!baseRate) {
    return {};
  }

  var rates = isBaseAsBase ? dateRates[base] : dateRates[defaultBase];
  return currencies.reduce(function (result, currency) {
    return _objectSpread({}, result, _defineProperty({}, currency, rates[currency] / baseRate));
  }, {});
});
var selectConvertedAmounts = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])([selectConversionRates, selectAmount], function (rates, amount) {
  return Object.keys(rates).map(function (currency) {
    return {
      value: currency,
      name: "".concat(currency, ": ").concat((rates[currency] * amount).toFixed(2)),
      selected: true
    };
  }, {});
});
var selectHistoricalConversionRates = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])([selectBase, selectDefaultBase, selectSelectedCurrencies, _currency_selectors__WEBPACK_IMPORTED_MODULE_1__["selectAllRates"], _currency_selectors__WEBPACK_IMPORTED_MODULE_1__["selectFromDate"], _currency_selectors__WEBPACK_IMPORTED_MODULE_1__["selectToDate"]], function (base, defaultBase, currencies, allRates, fromDate, toDate) {
  var _fromDateRates$defaul, _toDateRates$defaultB;

  var fromDateRates = allRates[fromDate];
  var toDateRates = allRates[toDate];

  if (!fromDateRates || !toDateRates) {
    return {};
  } // const availableCurrencies = Object.keys(dateRates);


  var isFromBaseAsBase = Object.keys(fromDateRates).includes(base);
  var isToBaseAsBase = Object.keys(toDateRates).includes(base);
  var fromBaseRate = isFromBaseAsBase ? 1 : (_fromDateRates$defaul = fromDateRates[defaultBase]) === null || _fromDateRates$defaul === void 0 ? void 0 : _fromDateRates$defaul[base];
  var toBaseRate = isToBaseAsBase ? 1 : (_toDateRates$defaultB = toDateRates[defaultBase]) === null || _toDateRates$defaultB === void 0 ? void 0 : _toDateRates$defaultB[base];

  if (!fromBaseRate || !toBaseRate) {
    return {};
  }

  var fromRates = isFromBaseAsBase ? fromDateRates[base] : fromDateRates[defaultBase];
  var toRates = isToBaseAsBase ? toDateRates[base] : toDateRates[defaultBase];
  return currencies.reduce(function (result, currency) {
    var from = fromRates[currency] / fromBaseRate;
    var to = toRates[currency] / toBaseRate;
    return _objectSpread({}, result, _defineProperty({}, currency, {
      from: from,
      to: to,
      diff: to - from
    }));
  }, {});
});
var selectConvertedHistoricalAmounts = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])([selectHistoricalConversionRates, selectAmount], function (rates, amount) {
  return Object.keys(rates).map(function (currency) {
    return {
      value: currency,
      name: "[".concat(currency, "] from: ").concat((rates[currency].from * amount).toFixed(2), " to: ").concat((rates[currency].to * amount).toFixed(2), " diff: ").concat((rates[currency].diff * amount).toFixed(2)),
      selected: true
    };
  }, {});
});

/***/ }),

/***/ "./selectors/currency.selectors.ts":
/*!*****************************************!*\
  !*** ./selectors/currency.selectors.ts ***!
  \*****************************************/
/*! exports provided: selectCurrencyState, selectCurrenciesData, selectAllCurrencies, selectCurrencyLoading, selectCurrencyError, selectRatesData, selectAllRates, selectRatesLoading, selectRatesError, selectDate, selectFromDate, selectToDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrencyState", function() { return selectCurrencyState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrenciesData", function() { return selectCurrenciesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllCurrencies", function() { return selectAllCurrencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrencyLoading", function() { return selectCurrencyLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrencyError", function() { return selectCurrencyError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRatesData", function() { return selectRatesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllRates", function() { return selectAllRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRatesLoading", function() { return selectRatesLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRatesError", function() { return selectRatesError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDate", function() { return selectDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectFromDate", function() { return selectFromDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectToDate", function() { return selectToDate; });
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reselect */ "../node_modules/reselect/es/index.js");

var selectCurrencyState = function selectCurrencyState(state) {
  return state.currency;
};
var selectCurrenciesData = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrencyState, function (state) {
  return state.currencies;
});
var selectAllCurrencies = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrenciesData, function (data) {
  return data.data;
});
var selectCurrencyLoading = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrenciesData, function (data) {
  return data.loading;
});
var selectCurrencyError = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrenciesData, function (data) {
  return data.error;
});
var selectRatesData = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrencyState, function (state) {
  return state.rates;
});
var selectAllRates = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectRatesData, function (data) {
  return data.data;
});
var selectRatesLoading = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectRatesData, function (data) {
  return data.loading;
});
var selectRatesError = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectRatesData, function (data) {
  return data.error;
});
var selectDate = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrencyState, function (state) {
  return state.date;
});
var selectFromDate = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrencyState, function (state) {
  return state.fromDate;
});
var selectToDate = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectCurrencyState, function (state) {
  return state.toDate;
});

/***/ }),

/***/ "./services/currency.service.ts":
/*!**************************************!*\
  !*** ./services/currency.service.ts ***!
  \**************************************/
/*! exports provided: fetchCurrencies, fetchLatest, fetchHistorical */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCurrencies", function() { return fetchCurrencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLatest", function() { return fetchLatest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchHistorical", function() { return fetchHistorical; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var fetchCurrencies = function fetchCurrencies() {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/symbols').then(function (response) {
    return response.data;
  });
};
var fetchLatest = function fetchLatest(base, currencies) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/latest?base=".concat(base).concat((currencies === null || currencies === void 0 ? void 0 : currencies.length) > 0 ? "&symbols=".concat(currencies.join(',')) : '')).then(function (response) {
    return response.data;
  });
};
var fetchHistorical = function fetchHistorical(date, base, currencies) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/".concat(date, "?base=").concat(base).concat((currencies === null || currencies === void 0 ? void 0 : currencies.length) > 0 ? "&symbols=".concat(currencies.join(',')) : '')).then(function (response) {
    return response.data;
  });
};

/***/ }),

/***/ "./style.scss":
/*!********************!*\
  !*** ./style.scss ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1:
/*!*******************************************************************************************************************************!*\
  !*** multi ../node_modules/webpack-dev-server/client?http://0.0.0.0:4000 ../node_modules/webpack/hot/dev-server.js ./App.tsx ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! c:\Projekty\ingrid\node_modules\webpack-dev-server\client\index.js?http://0.0.0.0:4000 */"../node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:4000");
__webpack_require__(/*! c:\Projekty\ingrid\node_modules\webpack\hot\dev-server.js */"../node_modules/webpack/hot/dev-server.js");
module.exports = __webpack_require__(/*! ./App.tsx */"./App.tsx");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlIHN5bmMgXlxcLlxcLy4qJCIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90IHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9sb2ckIiwid2VicGFjazovLy8uL0FwcC50c3giLCJ3ZWJwYWNrOi8vLy4vYWN0aW9ucy9jb252ZXJ0ZXIuYWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9hY3Rpb25zL2N1cnJlbmN5LmFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9GaWVsZC50c3giLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9JbnB1dC50c3giLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Mb2FkaW5nLnRzeCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1NlbGVjdG9yLnRzeCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2ZpZWxkLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWxlY3Rvci5zY3NzIiwid2VicGFjazovLy8uL2VudW1zL2FjdGlvbnMuZW51bXMudHMiLCJ3ZWJwYWNrOi8vLy4vZW51bXMvY29tbW9uLmVudW1zLnRzIiwid2VicGFjazovLy8uL2xheW91dHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9sYXlvdXRzL2xheW91dC5zY3NzIiwid2VicGFjazovLy8uL3BhZ2VzL0hpc3RvcmljYWxQYWdlLnRzeCIsIndlYnBhY2s6Ly8vLi9wYWdlcy9Ib21lUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvaG9tZVBhZ2Uuc2NzcyIsIndlYnBhY2s6Ly8vLi9yZWR1Y2Vycy9jb252ZXJ0ZXIucmVkdWNlci50cyIsIndlYnBhY2s6Ly8vLi9yZWR1Y2Vycy9jdXJyZW5jeS5yZWR1Y2VyLnRzIiwid2VicGFjazovLy8uL3JlZHVjZXJzL3JlZHVjZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc2VsZWN0b3JzL2NvbnZlcnRlci5zZWxlY3RvcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc2VsZWN0b3JzL2N1cnJlbmN5LnNlbGVjdG9ycy50cyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9jdXJyZW5jeS5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3N0eWxlLnNjc3MiXSwibmFtZXMiOlsibWlkZGxld2FyZSIsImFwcGx5TWlkZGxld2FyZSIsInRodW5rIiwicGVyc2lzdENvbmZpZyIsImtleSIsInN0b3JhZ2UiLCJwZXJzaXN0ZWRSZWR1Y2VyIiwicGVyc2lzdFJlZHVjZXIiLCJyZWR1Y2VyIiwic3RvcmUiLCJjcmVhdGVTdG9yZSIsInBlcnNpc3RvciIsInBlcnNpc3RTdG9yZSIsImxpYnJhcnkiLCJhZGQiLCJmYXMiLCJmYXIiLCJjb25zb2xlIiwibG9nIiwiQVBJX1VSTCIsIkFQSV9LRVkiLCJheGlvcyIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJ1c2UiLCJjb25maWciLCJzZXBhcmF0b3IiLCJ1cmwiLCJpbmNsdWRlcyIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNoYW5nZUJhc2UiLCJ2YWx1ZSIsInR5cGUiLCJDb252ZXJ0ZXJBY3Rpb25UeXBlIiwiQ2hhbmdlQmFzZSIsInBheWxvYWQiLCJjaGFuZ2VBbW91bnQiLCJDaGFuZ2VBbW91bnQiLCJhZGRDdXJyZW5jeSIsIkFkZEN1cnJlbmN5IiwicmVtb3ZlQ3VycmVuY3kiLCJSZW1vdmVDdXJyZW5jeSIsImNsZWFyQ3VycmVuY2llcyIsIkNsZWFyQ3VycmVuY2llcyIsImNoYW5nZUN1cnJlbmN5IiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInNlbGVjdGVkIiwic2VsZWN0Q3VycmVuY2llcyIsImxvYWRDdXJyZW5jaWVzIiwiQ3VycmVuY3lBY3Rpb25UeXBlIiwiTG9hZEN1cnJlbmNpZXMiLCJsb2FkQ3VycmVuY2llc1N1Y2Nlc3MiLCJkYXRhIiwiTG9hZEN1cnJlbmNpZXNTdWNjZXNzIiwibG9hZEN1cnJlbmNpZXNGYWlsdXJlIiwiZXJyb3IiLCJMb2FkQ3VycmVuY2llc0ZhaWx1cmUiLCJsb2FkQWxsQ3VycmVuY2llcyIsImZldGNoQ3VycmVuY2llcyIsInRoZW4iLCJyZXNwb25zZSIsInN5bWJvbHMiLCJ0b1N0cmluZyIsImxvYWRSYXRlcyIsIkxvYWRSYXRlcyIsImxvYWRSYXRlc1N1Y2Nlc3MiLCJMb2FkUmF0ZXNTdWNjZXNzIiwibG9hZFJhdGVzRmFpbHVyZSIsIkxvYWRSYXRlc0ZhaWx1cmUiLCJjb252ZXJ0VG9SYXRlcyIsImRhdGUiLCJiYXNlIiwicmF0ZXMiLCJnZXRDdXJyZW5jaWVzIiwic3RhdGUiLCJhbGxSYXRlcyIsInNlbGVjdEFsbFJhdGVzIiwic2VsZWN0QmFzZSIsImRlZmF1bHRCYXNlIiwic2VsZWN0RGVmYXVsdEJhc2UiLCJjdXJyZW5jaWVzIiwibGVuZ3RoIiwiZGF0ZVJhdGVzIiwiaXNCYXNlQXNCYXNlIiwiT2JqZWN0Iiwia2V5cyIsInJhdGVzQ3VycmVuY2llcyIsImV2ZXJ5Iiwic3ltYm9sIiwibG9hZExhdGVzdFJhdGVzIiwibW9tZW50IiwiZm9ybWF0IiwiZmV0Y2hMYXRlc3RSYXRlcyIsImZldGNoTGF0ZXN0Iiwic3VjY2VzcyIsImNvZGUiLCJsb2FkSGlzdG9yaWNhbFJhdGVzIiwiZnJvbURhdGUiLCJzZWxlY3RGcm9tRGF0ZSIsInRvRGF0ZSIsInNlbGVjdFRvRGF0ZSIsImZyb21CYXNlIiwiZnJvbURlZmF1bHRCYXNlIiwiZnJvbVN5bWJvbHMiLCJ0b0Jhc2UiLCJ0b0RlZmF1bHRCYXNlIiwidG9TeW1ib2xzIiwiZmV0Y2hIaXN0b3JpY2FsUmF0ZXMiLCJmZXRjaEhpc3RvcmljYWwiLCJjaGFuZ2VGcm9tRGF0ZSIsIkNoYW5nZUZyb21EYXRlIiwiY2hhbmdlVG9EYXRlIiwiQ2hhbmdlVG9EYXRlIiwiRmllbGQiLCJwcm9wcyIsInN0YXJ0IiwibmFtZSIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsInNlYXJjaCIsImVuZCIsInNsaWNlIiwiam9pbiIsImNsYXNzTmFtZSIsImljb24iLCJfX2h0bWwiLCJJbnB1dCIsIklucHV0VHlwZSIsImNoYW5nZUhhbmRsZXIiLCJldmVudCIsImNoYW5nZUhhbmxkZXIiLCJ0YXJnZXQiLCJMb2FkaW5nIiwiU2VsZWN0b3IiLCJ1c2VTdGF0ZSIsInNldFNlYXJjaCIsIm9wdGlvbnMiLCJmaWx0ZXIiLCJvcHRpb24iLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsImdldEljb24iLCJub0ljb24iLCJtdWx0aXBsZSIsImNsaWNrSGFuZGxlciIsImZpZWxkIiwiY2xvc2VzdCIsImRhdGFzZXQiLCJtYXAiLCJMYXlvdXQiLCJIaXN0b3JpY2FsUGFnZSIsIkhvbWVQYWdlIiwidXNlRGlzcGF0Y2giLCJ1c2VTZWxlY3RvciIsImFsbEN1cnJlbmNpZXMiLCJzZWxlY3RBbGxDdXJyZW5jaWVzIiwic2VsZWN0Q3VycmVuY2llc1dpdGhTZWxlY3Rpb24iLCJiYXNlQ3VycmVuY2llcyIsInNlbGVjdEN1cnJlbmNpZXNXaXRoQmFzZSIsImFtb3VudCIsInNlbGVjdEFtb3VudCIsImNvbnZlcnRlZEFtb3VudHMiLCJzZWxlY3RDb252ZXJ0ZWRIaXN0b3JpY2FsQW1vdW50cyIsImJhc2VDaGFuZ2VIYW5kbGVyIiwiY2hhbmdlRnJvbURhdGVIYW5kbGVyIiwiY2hhbmdlVG9EYXRlSGFuZGxlciIsImN1cnJlbmN5Q2hhbmdlSGFuZGxlciIsImFtb3VudENoYW5nZUhhbmRsZXIiLCJjb252ZXJ0Q2xpY2tIYW5kbGVyIiwidXNlRWZmZWN0IiwibnVtYmVyIiwic2VsZWN0Q29udmVydGVkQW1vdW50cyIsImluaXRpYWxTdGF0ZSIsImNvbnZlcnRlclJlZHVjZXIiLCJhY3Rpb24iLCJjdXJyZW5jeSIsImxvYWRpbmciLCJjdXJyZW5jeVJlZHVjZXIiLCJpc0JlZm9yZSIsImlzQWZ0ZXIiLCJjb21iaW5lUmVkdWNlcnMiLCJjb252ZXJ0ZXIiLCJzZWxlY3RDb252ZXJ0ZXJTdGF0ZSIsImNyZWF0ZVNlbGVjdG9yIiwic2VsZWN0U2VsZWN0ZWRDdXJyZW5jaWVzIiwic2VsZWN0Q29udmVyc2lvblJhdGVzIiwic2VsZWN0RGF0ZSIsImJhc2VSYXRlIiwicmVkdWNlIiwicmVzdWx0IiwidG9GaXhlZCIsInNlbGVjdEhpc3RvcmljYWxDb252ZXJzaW9uUmF0ZXMiLCJmcm9tRGF0ZVJhdGVzIiwidG9EYXRlUmF0ZXMiLCJpc0Zyb21CYXNlQXNCYXNlIiwiaXNUb0Jhc2VBc0Jhc2UiLCJmcm9tQmFzZVJhdGUiLCJ0b0Jhc2VSYXRlIiwiZnJvbVJhdGVzIiwidG9SYXRlcyIsImZyb20iLCJ0byIsImRpZmYiLCJzZWxlY3RDdXJyZW5jeVN0YXRlIiwic2VsZWN0Q3VycmVuY2llc0RhdGEiLCJzZWxlY3RDdXJyZW5jeUxvYWRpbmciLCJzZWxlY3RDdXJyZW5jeUVycm9yIiwic2VsZWN0UmF0ZXNEYXRhIiwic2VsZWN0UmF0ZXNMb2FkaW5nIiwic2VsZWN0UmF0ZXNFcnJvciIsImdldCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxHQUFHOztRQUVIO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQSw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxxQkFBcUIsZ0JBQWdCO1FBQ3JDO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0Esa0JBQWtCLDhCQUE4QjtRQUNoRDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esb0JBQW9CLDJCQUEyQjtRQUMvQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxtQkFBbUIsY0FBYztRQUNqQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLEtBQUs7UUFDckI7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsWUFBWTtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGNBQWMsNEJBQTRCO1FBQzFDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTs7UUFFSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsdUNBQXVDO1FBQ3hEO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHNCQUFzQjtRQUN2QztRQUNBO1FBQ0E7UUFDQSxRQUFRO1FBQ1I7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsVUFBVTtRQUNWO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLGNBQWMsd0NBQXdDO1FBQ3REO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFNBQVM7UUFDVDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFFBQVE7UUFDUjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxlQUFlO1FBQ2Y7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQSxzQ0FBc0MsdUJBQXVCOztRQUU3RDtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7QUMzMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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L0QsSUFESCxDQUNRLFVBQUNDLFFBQUQ7QUFBQSxXQUEyREEsUUFBUSxDQUFDUixJQUFwRTtBQUFBLEdBRFIsQ0FENkI7QUFBQSxDQUF4QixDOzs7Ozs7Ozs7OztBQ2ZQLHVDIiwiZmlsZSI6Ii4vc2NyaXB0Lm1pbi5jNjEwZTMxNDZjNWQ4OWE3ZjljYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiYzYxMGUzMTQ2YzVkODlhN2Y5Y2NcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiLi9zY3JpcHQubWluXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMSxcInZlbmRvci5taW5cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYWYuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYXJcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXItZHouanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXIta3dcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXItbHlcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbHkuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItbWEuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItc2FcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItdG5cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXItdG4uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXpcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYXouanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmdcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYm1cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm0uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm4uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm9cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYnJcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnIuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vYnMuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vY2FcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY3NcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3MuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3YuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3lcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vZGFcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGEuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZGUtYXRcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtYXQuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUtY2guanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZHYuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZWxcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZW4tU0dcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1TRy5qc1wiLFxuXHRcIi4vZW4tU0cuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1TRy5qc1wiLFxuXHRcIi4vZW4tYXVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tYXUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tY2EuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tZ2JcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4taWVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4taWwuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4tbnpcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW9cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZW8uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXMtZG9cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtZG8uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMtdXMuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXQuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZmFcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmEuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZmkuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZm9cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZnJcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnItY2FcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2hcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnItY2guanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnlcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZnkuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2FcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nYS5qc1wiLFxuXHRcIi4vZ2EuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nYS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2QuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2xcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ29tLWxhdG5cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ29tLWxhdG4uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vZ3UuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vaGVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGlcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaGkuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHIuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHktYW1cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaHktYW0uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaWQuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaXNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXRcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vaXQtY2hcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC1jaC5qc1wiLFxuXHRcIi4vaXQtY2guanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC1jaC5qc1wiLFxuXHRcIi4vaXQuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vamEuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vanZcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4va2FcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2EuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va2suanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va21cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va25cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va24uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va28uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va3VcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rdS5qc1wiLFxuXHRcIi4va3UuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rdS5qc1wiLFxuXHRcIi4va3lcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4vbGJcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbGIuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbG8uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbHRcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHZcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbHYuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWlcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWtcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWsuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbWwuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbW5cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbXJcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXIuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXMtbXlcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMtbXkuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXRcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXQuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbXkuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbmJcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbmwtYmVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwtYmUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbm5cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vbm4uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGEtaW4uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGxcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcHRcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC5qc1wiLFxuXHRcIi4vcHQtYnJcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC5qc1wiLFxuXHRcIi4vcm9cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcnVcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vcnUuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2QuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2VcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2lcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2kuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2suanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2xcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc3FcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3EuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3ItY3lybFwiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLWN5cmwuanNcIixcblx0XCIuL3NyLWN5cmwuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zcy5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zdi5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zd1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi90YVwiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90YS5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZS5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZXRcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGdcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGcuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGguanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGwtcGhcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGxoXCI6IFwiLi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90bGguanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3RyLmpzXCI6IFwiLi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3R6bFwiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90em1cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3R6bS1sYXRuXCI6IFwiLi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdWctY25cIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWtcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdWsuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXIuanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXpcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LWxhdG4uanNcIjogXCIuLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei1sYXRuLmpzXCIsXG5cdFwiLi91ei5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi92aS5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi94LXBzZXVkb1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi95b1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi95by5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1jbi5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1oa1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC10d1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCIsXG5cdFwiLi96aC10dy5qc1wiOiBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4uL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2xvZ1wiOiBcIi4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90IHN5bmMgXlxcXFwuXFxcXC9sb2ckXCI7IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7XG4gIGFwcGx5TWlkZGxld2FyZSxcbiAgY3JlYXRlU3RvcmUsXG59IGZyb20gJ3JlZHV4JztcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHBlcnNpc3RTdG9yZSwgcGVyc2lzdFJlZHVjZXIgfSBmcm9tICdyZWR1eC1wZXJzaXN0JztcbmltcG9ydCB7IFBlcnNpc3RHYXRlIH0gZnJvbSAncmVkdXgtcGVyc2lzdC9pbnRlZ3JhdGlvbi9yZWFjdCdcbmltcG9ydCBzdG9yYWdlIGZyb20gJ3JlZHV4LXBlcnNpc3QvbGliL3N0b3JhZ2UnO1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IGxpYnJhcnkgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuaW1wb3J0IHsgZmFzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IGZhciB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXJlZ3VsYXItc3ZnLWljb25zJztcblxuaW1wb3J0IHsgcmVkdWNlciB9IGZyb20gJy4vcmVkdWNlcnMvcmVkdWNlcic7XG5pbXBvcnQgTGF5b3V0IGZyb20gJy4vbGF5b3V0cy9MYXlvdXQnO1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi9jb21wb25lbnRzL0xvYWRpbmcnO1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuXG5kZWNsYXJlIGNvbnN0IEFQSV9LRVk6IHN0cmluZztcbmRlY2xhcmUgY29uc3QgQVBJX1VSTDogc3RyaW5nO1xuXG5jb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHRodW5rKTtcbmNvbnN0IHBlcnNpc3RDb25maWcgPSB7XG4gIGtleTogJ3Jvb3QnLFxuICBzdG9yYWdlLFxuICBcbn1cbmNvbnN0IHBlcnNpc3RlZFJlZHVjZXIgPSBwZXJzaXN0UmVkdWNlcihwZXJzaXN0Q29uZmlnLCByZWR1Y2VyKVxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShwZXJzaXN0ZWRSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcbmNvbnN0IHBlcnNpc3RvciA9IHBlcnNpc3RTdG9yZShzdG9yZSk7XG5saWJyYXJ5LmFkZChmYXMsIGZhcik7XG5jb25zb2xlLmxvZyhBUElfVVJMLCBBUElfS0VZKTtcbmF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZSgoY29uZmlnOiBBeGlvc1JlcXVlc3RDb25maWcpOiBBeGlvc1JlcXVlc3RDb25maWcgPT4ge1xuICBjb25zdCBzZXBhcmF0b3IgPSBjb25maWcudXJsLmluY2x1ZGVzKCc/JykgPyAnJicgOiAnPyc7XG4gIGNvbmZpZy51cmwgPSBgJHtBUElfVVJMIHx8ICcnfSR7Y29uZmlnLnVybH0ke3NlcGFyYXRvcn1hY2Nlc3Nfa2V5PSR7QVBJX0tFWX1gO1xuICByZXR1cm4gY29uZmlnO1xufSk7XG5cblJlYWN0RE9NLnJlbmRlcigoXG4gIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgIDxQZXJzaXN0R2F0ZSBsb2FkaW5nPXsoXG4gICAgICAgIDxMb2FkaW5nIC8+XG4gICAgICApfSBwZXJzaXN0b3I9e3BlcnNpc3Rvcn0+XG4gICAgICA8QnJvd3NlclJvdXRlcj5cbiAgICAgICAgPExheW91dCAvPlxuICAgICAgPC9Ccm93c2VyUm91dGVyPlxuICAgIDwvUGVyc2lzdEdhdGU+XG4gIDwvUHJvdmlkZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIiwiaW1wb3J0IHsgQ2hhbmdlQmFzZUFjdGlvbiwgQ2hhbmdlQW1vdW50QWN0aW9uLCBBZGRDdXJyZW5jeUFjdGlvbiwgUmVtb3ZlQ3VycmVuY3lBY3Rpb24sIENsZWFyQ3VycmVuY2llc0FjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29udmVydGVyLmFjdGlvbnMuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXJBY3Rpb25UeXBlIH0gZnJvbSAnLi4vZW51bXMvYWN0aW9ucy5lbnVtcyc7XG5pbXBvcnQgeyBzZWxlY3RDdXJyZW5jaWVzIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnRlci5zZWxlY3RvcnMnO1xuXG5leHBvcnQgY29uc3QgY2hhbmdlQmFzZSA9ICh2YWx1ZTogc3RyaW5nKTogQ2hhbmdlQmFzZUFjdGlvbiA9PiAoe1xuICB0eXBlOiBDb252ZXJ0ZXJBY3Rpb25UeXBlLkNoYW5nZUJhc2UsXG4gIHBheWxvYWQ6IHZhbHVlLFxufSk7XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VBbW91bnQgPSAodmFsdWU6IG51bWJlcik6IENoYW5nZUFtb3VudEFjdGlvbiA9PiAoe1xuICB0eXBlOiBDb252ZXJ0ZXJBY3Rpb25UeXBlLkNoYW5nZUFtb3VudCxcbiAgcGF5bG9hZDogdmFsdWUsXG59KTtcblxuZXhwb3J0IGNvbnN0IGFkZEN1cnJlbmN5ID0gKHZhbHVlOiBzdHJpbmcpOiBBZGRDdXJyZW5jeUFjdGlvbiA9PiAoe1xuICB0eXBlOiBDb252ZXJ0ZXJBY3Rpb25UeXBlLkFkZEN1cnJlbmN5LFxuICBwYXlsb2FkOiB2YWx1ZSxcbn0pO1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ3VycmVuY3kgPSAodmFsdWU6IHN0cmluZyk6IFJlbW92ZUN1cnJlbmN5QWN0aW9uID0+ICh7XG4gIHR5cGU6IENvbnZlcnRlckFjdGlvblR5cGUuUmVtb3ZlQ3VycmVuY3ksXG4gIHBheWxvYWQ6IHZhbHVlLFxufSk7XG5cbmV4cG9ydCBjb25zdCBjbGVhckN1cnJlbmNpZXMgPSAoKTogQ2xlYXJDdXJyZW5jaWVzQWN0aW9uID0+ICh7XG4gIHR5cGU6IENvbnZlcnRlckFjdGlvblR5cGUuQ2xlYXJDdXJyZW5jaWVzLFxufSk7XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VDdXJyZW5jeSA9ICh2YWx1ZTogc3RyaW5nKTogRnVuY3Rpb24gPT4gKGRpc3BhdGNoOiBGdW5jdGlvbiwgZ2V0U3RhdGU6IEZ1bmN0aW9uKSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkID0gc2VsZWN0Q3VycmVuY2llcyhnZXRTdGF0ZSgpKTtcbiAgaWYgKHNlbGVjdGVkLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgIGRpc3BhdGNoKHJlbW92ZUN1cnJlbmN5KHZhbHVlKSk7XG4gIH0gZWxzZSB7XG4gICAgZGlzcGF0Y2goYWRkQ3VycmVuY3kodmFsdWUpKTtcbiAgfVxufTtcbiIsImltcG9ydCB7XG4gIExvYWRDdXJyZW5jaWVzQWN0aW9uLFxuICBMb2FkQ3VycmVuY2llc1N1Y2Nlc3NBY3Rpb24sXG4gIExvYWRDdXJyZW5jaWVzRmFpbHVyZUFjdGlvbixcbiAgTG9hZFJhdGVzQWN0aW9uLFxuICBMb2FkUmF0ZXNTdWNjZXNzQWN0aW9uLFxuICBMb2FkUmF0ZXNGYWlsdXJlQWN0aW9uLFxuICBDaGFuZ2VGcm9tRGF0ZUFjdGlvbixcbiAgQ2hhbmdlVG9EYXRlQWN0aW9uLFxufSBmcm9tICcuLi9pbnRlcmZhY2VzL2N1cnJlbmN5LmFjdGlvbnMuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDdXJyZW5jeUFjdGlvblR5cGUgfSBmcm9tICcuLi9lbnVtcy9hY3Rpb25zLmVudW1zJztcbmltcG9ydCB7XG4gIGZldGNoQ3VycmVuY2llcyxcbiAgZmV0Y2hMYXRlc3QsXG4gIGZldGNoSGlzdG9yaWNhbCxcbn0gZnJvbSAnLi4vc2VydmljZXMvY3VycmVuY3kuc2VydmljZSc7XG5pbXBvcnQge1xuICBEeW5hbWljLFxuICBSYXRlcyxcbiAgQ3VycmVuY3lSZXNwb25zZSxcbiAgUmF0ZXNSZXNwb25zZSxcbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlcyc7XG5pbXBvcnQgbW9tZW50LCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBzZWxlY3RCYXNlLCBzZWxlY3RDdXJyZW5jaWVzLCBzZWxlY3REZWZhdWx0QmFzZSB9IGZyb20gJy4uL3NlbGVjdG9ycy9jb252ZXJ0ZXIuc2VsZWN0b3JzJztcbmltcG9ydCB7IHNlbGVjdEFsbFJhdGVzLCBzZWxlY3RGcm9tRGF0ZSwgc2VsZWN0VG9EYXRlIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2N1cnJlbmN5LnNlbGVjdG9ycyc7XG5pbXBvcnQgeyBHbG9iYWxTdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc3RhdGUuaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjb25zdCBsb2FkQ3VycmVuY2llcyA9ICgpOiBMb2FkQ3VycmVuY2llc0FjdGlvbiA9PiAoe1xuICB0eXBlOiBDdXJyZW5jeUFjdGlvblR5cGUuTG9hZEN1cnJlbmNpZXMsXG59KTtcblxuZXhwb3J0IGNvbnN0IGxvYWRDdXJyZW5jaWVzU3VjY2VzcyA9IChkYXRhOiBEeW5hbWljPHN0cmluZz4pOiBMb2FkQ3VycmVuY2llc1N1Y2Nlc3NBY3Rpb24gPT4gKHtcbiAgdHlwZTogQ3VycmVuY3lBY3Rpb25UeXBlLkxvYWRDdXJyZW5jaWVzU3VjY2VzcyxcbiAgcGF5bG9hZDogZGF0YSxcbn0pO1xuXG5leHBvcnQgY29uc3QgbG9hZEN1cnJlbmNpZXNGYWlsdXJlID0gKGVycm9yOiBzdHJpbmcpOiBMb2FkQ3VycmVuY2llc0ZhaWx1cmVBY3Rpb24gPT4gKHtcbiAgdHlwZTogQ3VycmVuY3lBY3Rpb25UeXBlLkxvYWRDdXJyZW5jaWVzRmFpbHVyZSxcbiAgcGF5bG9hZDogZXJyb3IsXG59KTtcblxuZXhwb3J0IGNvbnN0IGxvYWRBbGxDdXJyZW5jaWVzID0gKCk6IEZ1bmN0aW9uID0+IChkaXNwYXRjaDogRnVuY3Rpb24pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgZGlzcGF0Y2gobG9hZEN1cnJlbmNpZXMoKSk7XG5cbiAgcmV0dXJuIGZldGNoQ3VycmVuY2llcygpXG4gICAgLnRoZW4oKHJlc3BvbnNlOiBDdXJyZW5jeVJlc3BvbnNlKTogdm9pZCA9PiB7XG4gICAgICBkaXNwYXRjaChsb2FkQ3VycmVuY2llc1N1Y2Nlc3MocmVzcG9uc2Uuc3ltYm9scykpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiB7XG4gICAgICBkaXNwYXRjaChsb2FkQ3VycmVuY2llc0ZhaWx1cmUoZXJyb3I/LnRvU3RyaW5nKCkpKVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRSYXRlcyA9ICgpOiBMb2FkUmF0ZXNBY3Rpb24gPT4gKHtcbiAgdHlwZTogQ3VycmVuY3lBY3Rpb25UeXBlLkxvYWRSYXRlcyxcbn0pO1xuXG5leHBvcnQgY29uc3QgbG9hZFJhdGVzU3VjY2VzcyA9IChkYXRhOiBSYXRlcyk6IExvYWRSYXRlc1N1Y2Nlc3NBY3Rpb24gPT4gKHtcbiAgdHlwZTogQ3VycmVuY3lBY3Rpb25UeXBlLkxvYWRSYXRlc1N1Y2Nlc3MsXG4gIHBheWxvYWQ6IGRhdGEsXG59KTtcblxuZXhwb3J0IGNvbnN0IGxvYWRSYXRlc0ZhaWx1cmUgPSAoZXJyb3I6IHN0cmluZyk6IExvYWRSYXRlc0ZhaWx1cmVBY3Rpb24gPT4gKHtcbiAgdHlwZTogQ3VycmVuY3lBY3Rpb25UeXBlLkxvYWRSYXRlc0ZhaWx1cmUsXG4gIHBheWxvYWQ6IGVycm9yLFxufSk7XG5cbmNvbnN0IGNvbnZlcnRUb1JhdGVzID0gKHJlc3BvbnNlOiBSYXRlc1Jlc3BvbnNlKTogUmF0ZXMgPT4gKHtcbiAgW3Jlc3BvbnNlLmRhdGVdOiB7XG4gICAgW3Jlc3BvbnNlLmJhc2VdOiByZXNwb25zZS5yYXRlcyxcbiAgfSxcbn0pO1xuXG5jb25zdCBnZXRDdXJyZW5jaWVzID0gKHN0YXRlOiBHbG9iYWxTdGF0ZSwgZGF0ZTogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBhbGxSYXRlcyA9IHNlbGVjdEFsbFJhdGVzKHN0YXRlKTtcbiAgY29uc3QgYmFzZSA9IHNlbGVjdEJhc2Uoc3RhdGUpO1xuICBjb25zdCBkZWZhdWx0QmFzZSA9IHNlbGVjdERlZmF1bHRCYXNlKHN0YXRlKTtcbiAgY29uc3QgY3VycmVuY2llcyA9IHNlbGVjdEN1cnJlbmNpZXMoc3RhdGUpO1xuICBjb25zdCBzeW1ib2xzID0gY3VycmVuY2llcz8ubGVuZ3RoID4gMCA/IFtiYXNlLCAuLi5jdXJyZW5jaWVzXSA6IFtdO1xuXG4gIGNvbnN0IGRhdGVSYXRlcyA9IGFsbFJhdGVzW2RhdGVdO1xuICBpZiAoZGF0ZVJhdGVzKSB7XG4gICAgY29uc3QgaXNCYXNlQXNCYXNlID0gT2JqZWN0LmtleXMoZGF0ZVJhdGVzKS5pbmNsdWRlcyhiYXNlKTtcbiAgICBjb25zdCByYXRlcyA9IGlzQmFzZUFzQmFzZSA/IGRhdGVSYXRlc1tiYXNlXSA6IGRhdGVSYXRlc1tkZWZhdWx0QmFzZV07XG4gICAgaWYgKHJhdGVzKSB7XG4gICAgICBjb25zdCByYXRlc0N1cnJlbmNpZXMgPSBPYmplY3Qua2V5cyhyYXRlcyk7XG4gICAgICBpZiAoc3ltYm9scy5ldmVyeSgoc3ltYm9sOiBzdHJpbmcpID0+IHJhdGVzQ3VycmVuY2llcy5pbmNsdWRlcyhzeW1ib2wpKSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbYmFzZSwgZGVmYXVsdEJhc2UsIC4uLnN5bWJvbHNdO1xufVxuXG5leHBvcnQgY29uc3QgbG9hZExhdGVzdFJhdGVzID0gKCk6IEZ1bmN0aW9uID0+IChkaXNwYXRjaDogRnVuY3Rpb24sIGdldFN0YXRlOiBGdW5jdGlvbikgPT4ge1xuICBjb25zdCBkYXRlID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcbiAgXG4gIGNvbnN0IFtiYXNlLCBkZWZhdWx0QmFzZSwgLi4uc3ltYm9sc10gPSBnZXRDdXJyZW5jaWVzKHN0YXRlLCBkYXRlKTtcblxuICBpZiAoYmFzZSAmJiBkZWZhdWx0QmFzZSkge1xuICAgIGRpc3BhdGNoKGZldGNoTGF0ZXN0UmF0ZXMoYmFzZSwgZGVmYXVsdEJhc2UsIHN5bWJvbHMpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoTGF0ZXN0UmF0ZXMgPSAoYmFzZTogc3RyaW5nLCBkZWZhdWx0QmFzZTogc3RyaW5nLCBzeW1ib2xzPzogc3RyaW5nW10pOiBGdW5jdGlvbiA9PiAoZGlzcGF0Y2g6IEZ1bmN0aW9uKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGRpc3BhdGNoKGxvYWRSYXRlcygpKTtcblxuICByZXR1cm4gZmV0Y2hMYXRlc3QoYmFzZSwgc3ltYm9scylcbiAgICAudGhlbigocmVzcG9uc2U6IFJhdGVzUmVzcG9uc2UpOiB2b2lkID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGRpc3BhdGNoKGxvYWRSYXRlc1N1Y2Nlc3MoY29udmVydFRvUmF0ZXMocmVzcG9uc2UpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChsb2FkUmF0ZXNGYWlsdXJlKGBbJHtyZXNwb25zZS5lcnJvcj8uY29kZSB8fCAnRVJST1InfV0gJHtyZXNwb25zZS5lcnJvcj8udHlwZSB8fCAnJ31gKSk7XG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcj8uY29kZSA9PT0gMTA1ICYmIGRlZmF1bHRCYXNlKSB7XG4gICAgICAgICAgZGlzcGF0Y2goZmV0Y2hMYXRlc3RSYXRlcyhkZWZhdWx0QmFzZSwgbnVsbCwgc3ltYm9scykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IHtcbiAgICAgIGRpc3BhdGNoKGxvYWRSYXRlc0ZhaWx1cmUoZXJyb3I/LnRvU3RyaW5nKCkpKVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRIaXN0b3JpY2FsUmF0ZXMgPSAoKTogRnVuY3Rpb24gPT4gKGRpc3BhdGNoOiBGdW5jdGlvbiwgZ2V0U3RhdGU6IEZ1bmN0aW9uKSA9PiB7XG4gIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcbiAgY29uc3QgZnJvbURhdGUgPSBzZWxlY3RGcm9tRGF0ZShzdGF0ZSk7XG4gIGNvbnN0IHRvRGF0ZSA9IHNlbGVjdFRvRGF0ZShzdGF0ZSk7XG4gIGNvbnN0IFtmcm9tQmFzZSwgZnJvbURlZmF1bHRCYXNlLCAuLi5mcm9tU3ltYm9sc10gPSBnZXRDdXJyZW5jaWVzKHN0YXRlLCBmcm9tRGF0ZSk7XG4gIGNvbnN0IFt0b0Jhc2UsIHRvRGVmYXVsdEJhc2UsIC4uLnRvU3ltYm9sc10gPSBnZXRDdXJyZW5jaWVzKHN0YXRlLCB0b0RhdGUpO1xuXG4gIGlmIChmcm9tQmFzZSAmJiBmcm9tRGVmYXVsdEJhc2UpIHtcbiAgICBkaXNwYXRjaChmZXRjaEhpc3RvcmljYWxSYXRlcyhmcm9tRGF0ZSwgZnJvbUJhc2UsIGZyb21EZWZhdWx0QmFzZSwgZnJvbVN5bWJvbHMpKTtcbiAgfVxuICBpZiAodG9CYXNlICYmIHRvRGVmYXVsdEJhc2UpIHtcbiAgICBkaXNwYXRjaChmZXRjaEhpc3RvcmljYWxSYXRlcyh0b0RhdGUsIHRvQmFzZSwgdG9EZWZhdWx0QmFzZSwgdG9TeW1ib2xzKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaEhpc3RvcmljYWxSYXRlcyA9IChkYXRlOiBzdHJpbmcsIGJhc2U6IHN0cmluZywgZGVmYXVsdEJhc2U6IHN0cmluZywgIHN5bWJvbHM/OiBzdHJpbmdbXSk6IEZ1bmN0aW9uID0+IChkaXNwYXRjaDogRnVuY3Rpb24pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgZGlzcGF0Y2gobG9hZFJhdGVzKCkpO1xuXG4gIHJldHVybiBmZXRjaEhpc3RvcmljYWwoZGF0ZSwgYmFzZSwgc3ltYm9scylcbiAgICAudGhlbigocmVzcG9uc2U6IFJhdGVzUmVzcG9uc2UpOiB2b2lkID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIGRpc3BhdGNoKGxvYWRSYXRlc1N1Y2Nlc3MoY29udmVydFRvUmF0ZXMocmVzcG9uc2UpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaChsb2FkUmF0ZXNGYWlsdXJlKGBbJHtyZXNwb25zZS5lcnJvcj8uY29kZSB8fCAnRVJST1InfV0gJHtyZXNwb25zZS5lcnJvcj8udHlwZSB8fCAnJ31gKSk7XG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcj8uY29kZSA9PT0gMTA1ICYmIGRlZmF1bHRCYXNlKSB7XG4gICAgICAgICAgZGlzcGF0Y2goZmV0Y2hIaXN0b3JpY2FsUmF0ZXMoZGF0ZSwgZGVmYXVsdEJhc2UsIG51bGwsIHN5bWJvbHMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiB7XG4gICAgICBkaXNwYXRjaChsb2FkUmF0ZXNGYWlsdXJlKGVycm9yPy50b1N0cmluZygpKSlcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VGcm9tRGF0ZSA9ICh2YWx1ZTogc3RyaW5nKTogQ2hhbmdlRnJvbURhdGVBY3Rpb24gPT4gKHtcbiAgdHlwZTogQ3VycmVuY3lBY3Rpb25UeXBlLkNoYW5nZUZyb21EYXRlLFxuICBwYXlsb2FkOiB2YWx1ZSxcbn0pO1xuXG5leHBvcnQgY29uc3QgY2hhbmdlVG9EYXRlID0gKHZhbHVlOiBzdHJpbmcpOiBDaGFuZ2VUb0RhdGVBY3Rpb24gPT4gKHtcbiAgdHlwZTogQ3VycmVuY3lBY3Rpb25UeXBlLkNoYW5nZVRvRGF0ZSxcbiAgcGF5bG9hZDogdmFsdWUsXG59KTtcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJztcclxuaW1wb3J0IHsgSWNvblByb3AgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xyXG5cclxuaW1wb3J0ICcuL2ZpZWxkLnNjc3MnO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBpY29uPzogSWNvblByb3A7XHJcbiAgc2VhcmNoPzogc3RyaW5nO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgRmllbGQgPSAocHJvcHM6IFByb3BzKSA9PiB7XHJcbiAgLy8gY29uc3Qgc2VhcmNoID0gbmV3IFJlZ0V4cChwcm9wcy5zZWFyY2gsICdpZycpO1xyXG4gIC8vIGNvbnN0IG5hbWUgPSBwcm9wcy5zZWFyY2ggPyBwcm9wcy5uYW1lLnJlcGxhY2Uoc2VhcmNoLCBgPHN0cm9uZz4ke3Byb3BzLnNlYXJjaC50b1VwcGVyQ2FzZSgpfTwvc3Ryb25nPmApIDogcHJvcHMubmFtZTtcclxuICBjb25zdCBzdGFydCA9IHByb3BzLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHByb3BzLnNlYXJjaCk7XHJcbiAgY29uc3QgZW5kID0gc3RhcnQgKyAocHJvcHMuc2VhcmNoPy5sZW5ndGggfHwgMCk7XHJcbiAgY29uc3QgbmFtZSA9IHByb3BzLnNlYXJjaCA/IFtcclxuICAgIHByb3BzLm5hbWUuc2xpY2UoMCwgc3RhcnQpLFxyXG4gICAgJzxzdHJvbmc+JyxcclxuICAgIHByb3BzLm5hbWUuc2xpY2Uoc3RhcnQsIGVuZCksXHJcbiAgICAnPC9zdHJvbmc+JyxcclxuICAgIHByb3BzLm5hbWUuc2xpY2UoZW5kKSxcclxuICBdLmpvaW4oJycpIDogcHJvcHMubmFtZTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtgZmllbGQgJHtwcm9wcy5jbGFzc05hbWUgfHwgJyd9YH1cclxuICAgICAgICAgZGF0YS12YWx1ZT17cHJvcHMudmFsdWV9PlxyXG4gICAgICB7cHJvcHMuaWNvbiA/IChcclxuICAgICAgICA8Rm9udEF3ZXNvbWVJY29uIGljb249e3Byb3BzLmljb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2ZpZWxkX19pY29uJyAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPSdmaWVsZF9fbmFtZSdcclxuICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcclxuICAgICAgICAgICAgICBfX2h0bWw6IG5hbWUsXHJcbiAgICAgICAgICAgIH19Pjwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWVsZDtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRUeXBlIH0gZnJvbSAnLi4vZW51bXMvY29tbW9uLmVudW1zJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdmFsdWU6IG51bWJlciB8IHN0cmluZztcclxuICB0eXBlOiBJbnB1dFR5cGU7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIGNoYW5nZUhhbmxkZXI6IEZ1bmN0aW9uO1xyXG59XHJcblxyXG5jb25zdCBJbnB1dCA9IChwcm9wczogUHJvcHMpID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IHByb3BzLnR5cGUgPT09IElucHV0VHlwZS5kYXRlID8gbW9tZW50KHByb3BzLnZhbHVlKS5mb3JtYXQoJ1lZWVktTU0tREQnKSA6IHByb3BzLnZhbHVlO1xyXG4gIGNvbnN0IGNoYW5nZUhhbmRsZXIgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBwcm9wcy5jaGFuZ2VIYW5sZGVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2BpbnB1dCAke3Byb3BzLmNsYXNzTmFtZSB8fCAnJ31gfT5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT0naW5wdXRfX2xhYmVsJz57cHJvcHMubmFtZX08L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgY2xhc3NOYW1lPSdpbnB1dF9faW5wdXQnXHJcbiAgICAgICAgICAgICB0eXBlPXtwcm9wcy50eXBlfVxyXG4gICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICAgICAgICAgb25DaGFuZ2U9e2NoYW5nZUhhbmRsZXJ9IC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmNvbnN0IExvYWRpbmcgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uPlxyXG4gICAgICBMb2FkaW5nLi4uXHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvYWRpbmc7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtcclxuICB1c2VTdGF0ZSxcclxuICBNb3VzZUV2ZW50IGFzIFN5bnRoZXRpY01vdXNlRXZlbnQsXHJcbiAgQ2hhbmdlRXZlbnQsXHJcbn0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlcyc7XHJcbmltcG9ydCBGaWVsZCBmcm9tICcuL0ZpZWxkJztcclxuXHJcbmltcG9ydCAnLi9zZWxlY3Rvci5zY3NzJztcclxuXHJcbmludGVyZmFjZSBQcm9wcyB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIG9wdGlvbnM6IE9wdGlvbltdO1xyXG4gIG11bHRpcGxlPzogYm9vbGVhbjtcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgbm9JY29uPzogYm9vbGVhbjtcclxuICBjaGFuZ2VIYW5kbGVyPzogRnVuY3Rpb247XHJcbn1cclxuXHJcbmNvbnN0IFNlbGVjdG9yID0gKHByb3BzOiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHByb3BzLm9wdGlvbnMuZmlsdGVyKChvcHRpb246IE9wdGlvbikgPT4gb3B0aW9uLm5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gpKTtcclxuICBjb25zdCBnZXRJY29uID0gKG9wdGlvbjogT3B0aW9uKSA9PiB7XHJcbiAgICBpZiAocHJvcHMubm9JY29uKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSBlbHNlIGlmIChwcm9wcy5tdWx0aXBsZSkge1xyXG4gICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkID8gJ2NoZWNrLXNxdWFyZScgOiAnc3F1YXJlJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQgPyAnY2hlY2stY2lyY2xlJyA6ICdjaXJjbGUnO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY29uc3QgY2xpY2tIYW5kbGVyID0gKGV2ZW50OiBTeW50aGV0aWNNb3VzZUV2ZW50PEhUTUxFbGVtZW50LCBNb3VzZUV2ZW50PikgPT4ge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgZmllbGQgPSBldmVudC50YXJnZXQ/LmNsb3Nlc3QoJy5maWVsZCcpO1xyXG4gICAgY29uc3QgdmFsdWUgPSBmaWVsZD8uZGF0YXNldD8udmFsdWU7XHJcbiAgICBcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBwcm9wcy5jaGFuZ2VIYW5kbGVyKHZhbHVlKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNvbnN0IGNoYW5nZUhhbmRsZXIgPSAoZXZlbnQ6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBzZXRTZWFyY2goZXZlbnQudGFyZ2V0LnZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9e2BzZWxlY3RvciAke3Byb3BzLmNsYXNzTmFtZSB8fCAnJ31gfVxyXG4gICAgICAgICAgICAgb25DbGljaz17cHJvcHMuY2hhbmdlSGFuZGxlciA/IGNsaWNrSGFuZGxlciA6IG51bGx9PlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9J3NlbGVjdG9yX19uYW1lJz57cHJvcHMubmFtZX08L3NlY3Rpb24+XHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT0nc2VsZWN0b3JfX2ZpbHRlcic+XHJcbiAgICAgICAgRmlsdGVyOiA8aW5wdXQgdHlwZT0ndGV4dCcgb25DaGFuZ2U9e2NoYW5nZUhhbmRsZXJ9IC8+XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPSdzZWxlY3Rvcl9fdmFsdWVzJz5cclxuICAgICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbjogT3B0aW9uKSA9PiAoXHJcbiAgICAgICAgICA8RmllbGQga2V5PXtvcHRpb24udmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgaWNvbj17Z2V0SWNvbihvcHRpb24pfVxyXG4gICAgICAgICAgICAgICAgIG5hbWU9e29wdGlvbi5uYW1lfVxyXG4gICAgICAgICAgICAgICAgIHNlYXJjaD17c2VhcmNofVxyXG4gICAgICAgICAgICAgICAgIHZhbHVlPXtvcHRpb24udmFsdWV9IC8+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0b3I7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImV4cG9ydCBlbnVtIEN1cnJlbmN5QWN0aW9uVHlwZSB7XG4gIExvYWRDdXJyZW5jaWVzID0gJ1tDVVJSRU5DWV0gTG9hZCBDdXJyZW5jaWVzJyxcbiAgTG9hZEN1cnJlbmNpZXNTdWNjZXNzID0gJ1tDVVJSRU5DWV0gTG9hZCBDdXJyZW5jaWVzIFN1Y2Nlc3MnLFxuICBMb2FkQ3VycmVuY2llc0ZhaWx1cmUgPSAnW0NVUlJFTkNZXSBMb2FkIEN1cnJlbmNpZXMgRmFpbHVyZScsXG4gIExvYWRSYXRlcyA9ICdbQ1VSUkVOQ1ldIExvYWQgUmF0ZXMnLFxuICBMb2FkUmF0ZXNTdWNjZXNzID0gJ1tDVVJSRU5DWV0gTG9hZCBSYXRlcyBTdWNjZXNzJyxcbiAgTG9hZFJhdGVzRmFpbHVyZSA9ICdbQ1VSUkVOQ1ldIExvYWQgUmF0ZXMgRmFpbHVyZScsXG4gIENoYW5nZUZyb21EYXRlID0gJ1tDT05WRVJURVJdIENoYW5nZSBGcm9tIERhdGUnLFxuICBDaGFuZ2VUb0RhdGUgPSAnW0NPTlZFUlRFUl0gQ2hhbmdlIFRvIERhdGUnLFxufTtcblxuZXhwb3J0IGVudW0gQ29udmVydGVyQWN0aW9uVHlwZSB7XG4gIENoYW5nZUJhc2UgPSAnW0NPTlZFUlRFUl0gQ2hhbmdlIEJhc2UnLFxuICBDaGFuZ2VBbW91bnQgPSAnW0NPTlZFUlRFUl0gQ2hhbmdlIEFtb3VudCcsXG4gIEFkZEN1cnJlbmN5ID0gJ1tDT05WRVJURVJdIEFkZCBDdXJyZW5jeScsXG4gIFJlbW92ZUN1cnJlbmN5ID0gJ1tDT05WRVJURVJdIFJlbW92ZSBDdXJyZW5jeScsXG4gIENsZWFyQ3VycmVuY2llcyA9ICdbQ09OVkVSVEVSXSBDbGVhciBDdXJyZW5jaWVzJyxcbn1cbiIsImV4cG9ydCBlbnVtIElucHV0VHlwZSB7XG4gIHRleHQgPSAndGV4dCcsXG4gIG51bWJlciA9ICdudW1iZXInLFxuICBkYXRlID0gJ2RhdGUnLFxuICBoaWRkZW4gPSAnaGlkZGVuJyxcbiAgY2hlY2tib3ggPSAnY2hlY2tib3gnLFxufVxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIFN3aXRjaCxcclxuICBSb3V0ZSxcclxuICBSZWRpcmVjdCxcclxuICBOYXZMaW5rLFxyXG59IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5cclxuaW1wb3J0IEhvbWVQYWdlIGZyb20gJy4uL3BhZ2VzL0hvbWVQYWdlJztcclxuaW1wb3J0IEhpc3RvcmljYWxQYWdlIGZyb20gJy4uL3BhZ2VzL0hpc3RvcmljYWxQYWdlJztcclxuXHJcbmltcG9ydCAnLi9sYXlvdXQuc2Nzcyc7XHJcblxyXG5jb25zdCBMYXlvdXQgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgPE5hdkxpbmsgdG89Jy9sYXRlc3QnXHJcbiAgICAgICAgICAgICAgICAgc3RyaWN0XHJcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgIGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgIExhdGVzdFxyXG4gICAgICAgIDwvTmF2TGluaz5cclxuICAgICAgICA8TmF2TGluayB0bz0nL2hpc3RvcnknXHJcbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdsaW5rJ1xyXG4gICAgICAgICAgICAgICAgIGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgIEhpc3RvcmljYWxcclxuICAgICAgICA8L05hdkxpbms+XHJcbiAgICAgIDwvaGVhZGVyPlxyXG4gICAgICA8U3dpdGNoPlxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPScvaGlzdG9yeSdcclxuICAgICAgICAgICAgICAgY29tcG9uZW50PXtIaXN0b3JpY2FsUGFnZX0gLz5cclxuICAgICAgICA8Um91dGUgcGF0aD0nL2xhdGVzdCdcclxuICAgICAgICAgICAgICAgY29tcG9uZW50PXtIb21lUGFnZX0gLz5cclxuICAgICAgICA8UmVkaXJlY3QgdG89Jy9sYXRlc3QnIC8+XHJcbiAgICAgIDwvU3dpdGNoPlxyXG4gICAgICA8Zm9vdGVyPjwvZm9vdGVyPlxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExheW91dDtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIHVzZUVmZmVjdCxcclxufSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7XHJcbiAgdXNlRGlzcGF0Y2gsXHJcbiAgdXNlU2VsZWN0b3IsXHJcbn0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5cclxuaW1wb3J0IHsgbG9hZEFsbEN1cnJlbmNpZXMsIGxvYWRMYXRlc3RSYXRlcywgY2hhbmdlRnJvbURhdGUsIGNoYW5nZVRvRGF0ZSwgbG9hZEhpc3RvcmljYWxSYXRlcyB9IGZyb20gJy4uL2FjdGlvbnMvY3VycmVuY3kuYWN0aW9ucyc7XHJcbmltcG9ydCB7IHNlbGVjdEFsbEN1cnJlbmNpZXMsIHNlbGVjdEZyb21EYXRlLCBzZWxlY3RUb0RhdGUgfSBmcm9tICcuLi9zZWxlY3RvcnMvY3VycmVuY3kuc2VsZWN0b3JzJztcclxuaW1wb3J0IHtcclxuICBzZWxlY3RDdXJyZW5jaWVzV2l0aFNlbGVjdGlvbixcclxuICBzZWxlY3RDdXJyZW5jaWVzV2l0aEJhc2UsXHJcbiAgc2VsZWN0QW1vdW50LFxyXG4gIHNlbGVjdEJhc2UsXHJcbiAgc2VsZWN0Q29udmVydGVkSGlzdG9yaWNhbEFtb3VudHMsXHJcbn0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnRlci5zZWxlY3RvcnMnO1xyXG5pbXBvcnQgU2VsZWN0b3IgZnJvbSAnLi4vY29tcG9uZW50cy9TZWxlY3Rvcic7XHJcbmltcG9ydCB7XHJcbiAgY2hhbmdlQ3VycmVuY3ksXHJcbiAgY2hhbmdlQmFzZSxcclxuICBjaGFuZ2VBbW91bnQsXHJcbn0gZnJvbSAnLi4vYWN0aW9ucy9jb252ZXJ0ZXIuYWN0aW9ucyc7XHJcbmltcG9ydCBJbnB1dCBmcm9tICcuLi9jb21wb25lbnRzL0lucHV0JztcclxuXHJcbmltcG9ydCAnLi9ob21lUGFnZS5zY3NzJztcclxuaW1wb3J0IHsgSW5wdXRUeXBlIH0gZnJvbSAnLi4vZW51bXMvY29tbW9uLmVudW1zJztcclxuXHJcbmNvbnN0IEhpc3RvcmljYWxQYWdlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICBjb25zdCBiYXNlID0gdXNlU2VsZWN0b3Ioc2VsZWN0QmFzZSk7XHJcbiAgY29uc3QgYWxsQ3VycmVuY2llcyA9IHVzZVNlbGVjdG9yKHNlbGVjdEFsbEN1cnJlbmNpZXMpO1xyXG4gIGNvbnN0IGN1cnJlbmNpZXMgPSB1c2VTZWxlY3RvcihzZWxlY3RDdXJyZW5jaWVzV2l0aFNlbGVjdGlvbik7XHJcbiAgY29uc3QgYmFzZUN1cnJlbmNpZXMgPSB1c2VTZWxlY3RvcihzZWxlY3RDdXJyZW5jaWVzV2l0aEJhc2UpO1xyXG4gIGNvbnN0IGFtb3VudCA9IHVzZVNlbGVjdG9yKHNlbGVjdEFtb3VudCk7XHJcbiAgY29uc3QgY29udmVydGVkQW1vdW50cyA9IHVzZVNlbGVjdG9yKHNlbGVjdENvbnZlcnRlZEhpc3RvcmljYWxBbW91bnRzKTtcclxuICBjb25zdCBmcm9tRGF0ZSA9IHVzZVNlbGVjdG9yKHNlbGVjdEZyb21EYXRlKTtcclxuICBjb25zdCB0b0RhdGUgPSB1c2VTZWxlY3RvcihzZWxlY3RUb0RhdGUpO1xyXG4gIGNvbnN0IGJhc2VDaGFuZ2VIYW5kbGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgIGRpc3BhdGNoKGNoYW5nZUJhc2UodmFsdWUpKTtcclxuICB9O1xyXG4gIGNvbnN0IGNoYW5nZUZyb21EYXRlSGFuZGxlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICBkaXNwYXRjaChjaGFuZ2VGcm9tRGF0ZSh2YWx1ZSkpO1xyXG4gIH07XHJcbiAgY29uc3QgY2hhbmdlVG9EYXRlSGFuZGxlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICBkaXNwYXRjaChjaGFuZ2VUb0RhdGUodmFsdWUpKTtcclxuICB9O1xyXG4gIGNvbnN0IGN1cnJlbmN5Q2hhbmdlSGFuZGxlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICBkaXNwYXRjaChjaGFuZ2VDdXJyZW5jeSh2YWx1ZSkpO1xyXG4gIH07XHJcbiAgY29uc3QgYW1vdW50Q2hhbmdlSGFuZGxlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XHJcbiAgICBkaXNwYXRjaChjaGFuZ2VBbW91bnQodmFsdWUpKTtcclxuICB9O1xyXG4gIGNvbnN0IGNvbnZlcnRDbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBkaXNwYXRjaChsb2FkSGlzdG9yaWNhbFJhdGVzKCkpO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBkaXNwYXRjaChsb2FkQWxsQ3VycmVuY2llcygpKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8YXJ0aWNsZSBjbGFzc05hbWU9J2hvbWUnPlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9J2luZm8nPlxyXG4gICAgICAgIHtgV2UgY2FuIGNvbnZlcnQgJHtPYmplY3Qua2V5cyhhbGxDdXJyZW5jaWVzKS5sZW5ndGh9IGN1cnJlbmNpZXNgfVxyXG4gICAgICA8L3NlY3Rpb24+XHJcbiAgICAgIDxJbnB1dCBjbGFzc05hbWU9J2Jhc2UtYW1vdW50J1xyXG4gICAgICAgICAgICAgbmFtZT17YEZyb20gYW1vdW50IFske2Jhc2V9XWB9XHJcbiAgICAgICAgICAgICB2YWx1ZT17YW1vdW50fVxyXG4gICAgICAgICAgICAgdHlwZT17SW5wdXRUeXBlLm51bWJlcn1cclxuICAgICAgICAgICAgIGNoYW5nZUhhbmxkZXI9e2Ftb3VudENoYW5nZUhhbmRsZXJ9IC8+XHJcbiAgICAgIDxJbnB1dCBjbGFzc05hbWU9J2Zyb20tZGF0ZSdcclxuICAgICAgICAgICAgIG5hbWU9J0Zyb20gZGF0ZSdcclxuICAgICAgICAgICAgIHZhbHVlPXtmcm9tRGF0ZX1cclxuICAgICAgICAgICAgIHR5cGU9e0lucHV0VHlwZS5kYXRlfVxyXG4gICAgICAgICAgICAgY2hhbmdlSGFubGRlcj17Y2hhbmdlRnJvbURhdGVIYW5kbGVyfSAvPlxyXG4gICAgICA8SW5wdXQgY2xhc3NOYW1lPSd0by1kYXRlJ1xyXG4gICAgICAgICAgICAgbmFtZT0nVG8gZGF0ZSdcclxuICAgICAgICAgICAgIHZhbHVlPXt0b0RhdGV9XHJcbiAgICAgICAgICAgICB0eXBlPXtJbnB1dFR5cGUuZGF0ZX1cclxuICAgICAgICAgICAgIGNoYW5nZUhhbmxkZXI9e2NoYW5nZVRvRGF0ZUhhbmRsZXJ9IC8+XHJcbiAgICAgIDxTZWxlY3RvciBrZXk9J2Jhc2UnXHJcbiAgICAgICAgICAgICAgICBuYW1lPSdGcm9tJ1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdiYXNlJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17YmFzZUN1cnJlbmNpZXN9XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VIYW5kbGVyPXtiYXNlQ2hhbmdlSGFuZGxlcn0gLz5cclxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2V4Y2hhbmdlJ1xyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2NvbnZlcnRDbGlja0hhbmRsZXJ9PkNvbnZlcnQ8L2J1dHRvbj5cclxuICAgICAgPFNlbGVjdG9yIGtleT0nYW1vdW50cydcclxuICAgICAgICAgICAgICAgIG5hbWU9J1RvIEFtb3VudChzKSdcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nY3VycmVuY2llcy1hbW91bnRzJ1xyXG4gICAgICAgICAgICAgICAgbm9JY29uXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zPXtjb252ZXJ0ZWRBbW91bnRzfSAvPlxyXG4gICAgICA8U2VsZWN0b3Iga2V5PSdjdXJyZW5jaWVzJ1xyXG4gICAgICAgICAgICAgICAgbmFtZT0nVG8nXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2N1cnJlbmNpZXMnXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zPXtjdXJyZW5jaWVzfVxyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGVcclxuICAgICAgICAgICAgICAgIGNoYW5nZUhhbmRsZXI9e2N1cnJlbmN5Q2hhbmdlSGFuZGxlcn0gLz5cclxuICAgIDwvYXJ0aWNsZT5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yaWNhbFBhZ2U7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtcclxuICB1c2VFZmZlY3QsXHJcbn0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIHVzZURpc3BhdGNoLFxyXG4gIHVzZVNlbGVjdG9yLFxyXG59IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuXHJcbmltcG9ydCB7IGxvYWRBbGxDdXJyZW5jaWVzLCBsb2FkTGF0ZXN0UmF0ZXMgfSBmcm9tICcuLi9hY3Rpb25zL2N1cnJlbmN5LmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBzZWxlY3RBbGxDdXJyZW5jaWVzIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2N1cnJlbmN5LnNlbGVjdG9ycyc7XHJcbmltcG9ydCB7XHJcbiAgc2VsZWN0Q3VycmVuY2llc1dpdGhTZWxlY3Rpb24sXHJcbiAgc2VsZWN0Q3VycmVuY2llc1dpdGhCYXNlLFxyXG4gIHNlbGVjdEFtb3VudCxcclxuICBzZWxlY3RDb252ZXJ0ZWRBbW91bnRzLFxyXG4gIHNlbGVjdEJhc2UsXHJcbn0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnRlci5zZWxlY3RvcnMnO1xyXG5pbXBvcnQgU2VsZWN0b3IgZnJvbSAnLi4vY29tcG9uZW50cy9TZWxlY3Rvcic7XHJcbmltcG9ydCB7XHJcbiAgY2hhbmdlQ3VycmVuY3ksXHJcbiAgY2hhbmdlQmFzZSxcclxuICBjaGFuZ2VBbW91bnQsXHJcbn0gZnJvbSAnLi4vYWN0aW9ucy9jb252ZXJ0ZXIuYWN0aW9ucyc7XHJcbmltcG9ydCBJbnB1dCBmcm9tICcuLi9jb21wb25lbnRzL0lucHV0JztcclxuXHJcbmltcG9ydCAnLi9ob21lUGFnZS5zY3NzJztcclxuaW1wb3J0IHsgSW5wdXRUeXBlIH0gZnJvbSAnLi4vZW51bXMvY29tbW9uLmVudW1zJztcclxuXHJcbmNvbnN0IEhvbWVQYWdlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICBjb25zdCBiYXNlID0gdXNlU2VsZWN0b3Ioc2VsZWN0QmFzZSk7XHJcbiAgY29uc3QgYWxsQ3VycmVuY2llcyA9IHVzZVNlbGVjdG9yKHNlbGVjdEFsbEN1cnJlbmNpZXMpO1xyXG4gIGNvbnN0IGN1cnJlbmNpZXMgPSB1c2VTZWxlY3RvcihzZWxlY3RDdXJyZW5jaWVzV2l0aFNlbGVjdGlvbik7XHJcbiAgY29uc3QgYmFzZUN1cnJlbmNpZXMgPSB1c2VTZWxlY3RvcihzZWxlY3RDdXJyZW5jaWVzV2l0aEJhc2UpO1xyXG4gIGNvbnN0IGFtb3VudCA9IHVzZVNlbGVjdG9yKHNlbGVjdEFtb3VudCk7XHJcbiAgY29uc3QgY29udmVydGVkQW1vdW50cyA9IHVzZVNlbGVjdG9yKHNlbGVjdENvbnZlcnRlZEFtb3VudHMpO1xyXG4gIGNvbnN0IGJhc2VDaGFuZ2VIYW5kbGVyID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgIGRpc3BhdGNoKGNoYW5nZUJhc2UodmFsdWUpKTtcclxuICB9O1xyXG4gIGNvbnN0IGN1cnJlbmN5Q2hhbmdlSGFuZGxlciA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICBkaXNwYXRjaChjaGFuZ2VDdXJyZW5jeSh2YWx1ZSkpO1xyXG4gIH07XHJcbiAgY29uc3QgYW1vdW50Q2hhbmdlSGFuZGxlciA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XHJcbiAgICBkaXNwYXRjaChjaGFuZ2VBbW91bnQodmFsdWUpKTtcclxuICB9O1xyXG4gIGNvbnN0IGNvbnZlcnRDbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBkaXNwYXRjaChsb2FkTGF0ZXN0UmF0ZXMoKSk7XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGRpc3BhdGNoKGxvYWRBbGxDdXJyZW5jaWVzKCkpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxhcnRpY2xlIGNsYXNzTmFtZT0naG9tZSc+XHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT0naW5mbyc+XHJcbiAgICAgICAge2BXZSBjYW4gY29udmVydCAke09iamVjdC5rZXlzKGFsbEN1cnJlbmNpZXMpLmxlbmd0aH0gY3VycmVuY2llc2B9XHJcbiAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgPElucHV0IGNsYXNzTmFtZT0nYmFzZS1hbW91bnQnXHJcbiAgICAgICAgICAgICAgbmFtZT17YEZyb20gYW1vdW50IFske2Jhc2V9XWB9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e2Ftb3VudH1cclxuICAgICAgICAgICAgICB0eXBlPXtJbnB1dFR5cGUubnVtYmVyfVxyXG4gICAgICAgICAgICAgIGNoYW5nZUhhbmxkZXI9e2Ftb3VudENoYW5nZUhhbmRsZXJ9IC8+XHJcbiAgICAgIDxTZWxlY3RvciBrZXk9J2Jhc2UnXHJcbiAgICAgICAgICAgICAgICBuYW1lPSdGcm9tJ1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdiYXNlJ1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17YmFzZUN1cnJlbmNpZXN9XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VIYW5kbGVyPXtiYXNlQ2hhbmdlSGFuZGxlcn0gLz5cclxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2V4Y2hhbmdlJ1xyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2NvbnZlcnRDbGlja0hhbmRsZXJ9PkNvbnZlcnQ8L2J1dHRvbj5cclxuICAgICAgPFNlbGVjdG9yIGtleT0nYW1vdW50cydcclxuICAgICAgICAgICAgICAgIG5hbWU9J1RvIEFtb3VudChzKSdcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nY3VycmVuY2llcy1hbW91bnRzJ1xyXG4gICAgICAgICAgICAgICAgbm9JY29uXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zPXtjb252ZXJ0ZWRBbW91bnRzfSAvPlxyXG4gICAgICA8U2VsZWN0b3Iga2V5PSdjdXJyZW5jaWVzJ1xyXG4gICAgICAgICAgICAgICAgbmFtZT0nVG8nXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2N1cnJlbmNpZXMnXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zPXtjdXJyZW5jaWVzfVxyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGVcclxuICAgICAgICAgICAgICAgIGNoYW5nZUhhbmRsZXI9e2N1cnJlbmN5Q2hhbmdlSGFuZGxlcn0gLz5cclxuICAgIDwvYXJ0aWNsZT5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSG9tZVBhZ2U7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCB7IENvbnZlcnRlclN0YXRlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zdGF0ZS5pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbnZlcnRlckFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29udmVydGVyLmFjdGlvbnMuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXJBY3Rpb25UeXBlIH0gZnJvbSAnLi4vZW51bXMvYWN0aW9ucy5lbnVtcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZTogQ29udmVydGVyU3RhdGUgPSB7XG4gIGJhc2U6ICdFVVInLFxuICBhbW91bnQ6IDAsXG4gIGN1cnJlbmNpZXM6IFtdLFxuICBkZWZhdWx0QmFzZTogJ0VVUicsXG59O1xuXG5leHBvcnQgY29uc3QgY29udmVydGVyUmVkdWNlciA9IChzdGF0ZTogQ29udmVydGVyU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQ29udmVydGVyQWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIENvbnZlcnRlckFjdGlvblR5cGUuQ2hhbmdlQmFzZToge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGJhc2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBDb252ZXJ0ZXJBY3Rpb25UeXBlLkNoYW5nZUFtb3VudDoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGFtb3VudDogYWN0aW9uLnBheWxvYWQsXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIENvbnZlcnRlckFjdGlvblR5cGUuQWRkQ3VycmVuY3k6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjdXJyZW5jaWVzOiBbLi4uc3RhdGUuY3VycmVuY2llcywgYWN0aW9uLnBheWxvYWRdLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBDb252ZXJ0ZXJBY3Rpb25UeXBlLlJlbW92ZUN1cnJlbmN5OiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3VycmVuY2llczogc3RhdGUuY3VycmVuY2llcy5maWx0ZXIoKGN1cnJlbmN5OiBzdHJpbmcpID0+IGN1cnJlbmN5ICE9PSBhY3Rpb24ucGF5bG9hZCksXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIENvbnZlcnRlckFjdGlvblR5cGUuQ2xlYXJDdXJyZW5jaWVzOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY3VycmVuY2llczogW10sXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgQ3VycmVuY3lTdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvc3RhdGUuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDdXJyZW5jeUFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvY3VycmVuY3kuYWN0aW9ucy5pbnRlcmZhY2VzJztcbmltcG9ydCB7IEN1cnJlbmN5QWN0aW9uVHlwZSB9IGZyb20gJy4uL2VudW1zL2FjdGlvbnMuZW51bXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBpbml0aWFsU3RhdGU6IEN1cnJlbmN5U3RhdGUgPSB7XG4gIGN1cnJlbmNpZXM6IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBkYXRhOiB7fSxcbiAgICBlcnJvcjogbnVsbCxcbiAgfSxcbiAgcmF0ZXM6IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBkYXRhOiB7fSxcbiAgICBlcnJvcjogbnVsbCxcbiAgfSxcbiAgZGF0ZTogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJyksXG4gIGZyb21EYXRlOiBudWxsLFxuICB0b0RhdGU6IG51bGwsXG59O1xuXG5leHBvcnQgY29uc3QgY3VycmVuY3lSZWR1Y2VyID0gKHN0YXRlOiBDdXJyZW5jeVN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEN1cnJlbmN5QWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEN1cnJlbmN5QWN0aW9uVHlwZS5Mb2FkQ3VycmVuY2llczoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGN1cnJlbmNpZXM6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5jdXJyZW5jaWVzLFxuICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgICBjYXNlIEN1cnJlbmN5QWN0aW9uVHlwZS5Mb2FkQ3VycmVuY2llc1N1Y2Nlc3M6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBjdXJyZW5jaWVzOiB7XG4gICAgICAgICAgLi4uc3RhdGUuY3VycmVuY2llcyxcbiAgICAgICAgICBkYXRhOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgQ3VycmVuY3lBY3Rpb25UeXBlLkxvYWRDdXJyZW5jaWVzRmFpbHVyZToge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGN1cnJlbmNpZXM6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5jdXJyZW5jaWVzLFxuICAgICAgICAgIGVycm9yOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgQ3VycmVuY3lBY3Rpb25UeXBlLkxvYWRSYXRlczoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHJhdGVzOiB7XG4gICAgICAgICAgLi4uc3RhdGUucmF0ZXMsXG4gICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNhc2UgQ3VycmVuY3lBY3Rpb25UeXBlLkxvYWRSYXRlc1N1Y2Nlc3M6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICByYXRlczoge1xuICAgICAgICAgIC4uLnN0YXRlLnJhdGVzLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLnJhdGVzLmRhdGEsXG4gICAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBDdXJyZW5jeUFjdGlvblR5cGUuTG9hZFJhdGVzRmFpbHVyZToge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHJhdGVzOiB7XG4gICAgICAgICAgLi4uc3RhdGUucmF0ZXMsXG4gICAgICAgICAgZXJyb3I6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBDdXJyZW5jeUFjdGlvblR5cGUuQ2hhbmdlRnJvbURhdGU6IHtcbiAgICAgIGNvbnN0IGZyb21EYXRlID0gc3RhdGUudG9EYXRlICYmIG1vbWVudChzdGF0ZS50b0RhdGUpLmlzQmVmb3JlKGFjdGlvbi5wYXlsb2FkKSA/IHN0YXRlLnRvRGF0ZSA6IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZyb21EYXRlLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBDdXJyZW5jeUFjdGlvblR5cGUuQ2hhbmdlVG9EYXRlOiB7XG4gICAgICBjb25zdCB0b0RhdGUgPSBzdGF0ZS5mcm9tRGF0ZSAmJiBtb21lbnQoc3RhdGUuZnJvbURhdGUpLmlzQWZ0ZXIoYWN0aW9uLnBheWxvYWQpID8gc3RhdGUuZnJvbURhdGUgOiBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB0b0RhdGUsXG4gICAgICB9O1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59O1xuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgeyBjdXJyZW5jeVJlZHVjZXIgfSBmcm9tICcuL2N1cnJlbmN5LnJlZHVjZXInO1xuaW1wb3J0IHsgY29udmVydGVyUmVkdWNlciB9IGZyb20gJy4vY29udmVydGVyLnJlZHVjZXInO1xuXG5leHBvcnQgY29uc3QgcmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGN1cnJlbmN5OiBjdXJyZW5jeVJlZHVjZXIsXG4gIGNvbnZlcnRlcjogY29udmVydGVyUmVkdWNlcixcbn0pO1xuIiwiaW1wb3J0IHsgY3JlYXRlU2VsZWN0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5cbmltcG9ydCB7XG4gIEdsb2JhbFN0YXRlLFxuICBDb252ZXJ0ZXJTdGF0ZSxcbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zdGF0ZS5pbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIHNlbGVjdEFsbEN1cnJlbmNpZXMsXG4gIHNlbGVjdEFsbFJhdGVzLFxuICBzZWxlY3REYXRlLFxuICBzZWxlY3RGcm9tRGF0ZSxcbiAgc2VsZWN0VG9EYXRlLFxufSBmcm9tICcuL2N1cnJlbmN5LnNlbGVjdG9ycyc7XG5pbXBvcnQgeyBEeW5hbWljLCBPcHRpb24sIFJhdGVzLCBEaWZmIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDb252ZXJ0ZXJTdGF0ZSA9IChzdGF0ZTogR2xvYmFsU3RhdGUpOiBDb252ZXJ0ZXJTdGF0ZSA9PiBzdGF0ZS5jb252ZXJ0ZXI7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RCYXNlID0gY3JlYXRlU2VsZWN0b3Ioc2VsZWN0Q29udmVydGVyU3RhdGUsIChzdGF0ZTogQ29udmVydGVyU3RhdGUpOiBzdHJpbmcgPT4gc3RhdGUuYmFzZSk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RBbW91bnQgPSBjcmVhdGVTZWxlY3RvcihzZWxlY3RDb252ZXJ0ZXJTdGF0ZSwgKHN0YXRlOiBDb252ZXJ0ZXJTdGF0ZSk6IG51bWJlciA9PiBzdGF0ZS5hbW91bnQpO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q3VycmVuY2llcyA9IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdENvbnZlcnRlclN0YXRlLCAoc3RhdGU6IENvbnZlcnRlclN0YXRlKTogc3RyaW5nW10gPT4gc3RhdGUuY3VycmVuY2llcyk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3REZWZhdWx0QmFzZSA9IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdENvbnZlcnRlclN0YXRlLCAoc3RhdGU6IENvbnZlcnRlclN0YXRlKTogc3RyaW5nID0+IHN0YXRlLmRlZmF1bHRCYXNlKTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEN1cnJlbmNpZXNXaXRoQmFzZSA9IGNyZWF0ZVNlbGVjdG9yKFtzZWxlY3RBbGxDdXJyZW5jaWVzLCBzZWxlY3RCYXNlXSxcbiAgKGN1cnJlbmNpZXM6IER5bmFtaWM8c3RyaW5nPiwgYmFzZTogc3RyaW5nKTogT3B0aW9uW10gPT4gT2JqZWN0LmtleXMoY3VycmVuY2llcykubWFwKChrZXk6IHN0cmluZykgPT4gKHtcbiAgICB2YWx1ZToga2V5LFxuICAgIG5hbWU6IGAke2tleX0gKCR7Y3VycmVuY2llc1trZXldfSlgLFxuICAgIHNlbGVjdGVkOiBrZXkgPT09IGJhc2UsXG4gIH0pKSk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDdXJyZW5jaWVzV2l0aFNlbGVjdGlvbiA9IGNyZWF0ZVNlbGVjdG9yKFtzZWxlY3RBbGxDdXJyZW5jaWVzLCBzZWxlY3RDdXJyZW5jaWVzXSxcbiAgKGN1cnJlbmNpZXM6IER5bmFtaWM8c3RyaW5nPiwgc2VsZWN0ZWQ6IHN0cmluZ1tdKTogT3B0aW9uW10gPT4gT2JqZWN0LmtleXMoY3VycmVuY2llcykubWFwKChrZXk6IHN0cmluZykgPT4gKHtcbiAgICB2YWx1ZToga2V5LFxuICAgIG5hbWU6IGAke2tleX0gKCR7Y3VycmVuY2llc1trZXldfSlgLFxuICAgIHNlbGVjdGVkOiBzZWxlY3RlZC5pbmNsdWRlcyhrZXkpLFxuICB9KSkpO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2VsZWN0ZWRDdXJyZW5jaWVzID0gY3JlYXRlU2VsZWN0b3IoW3NlbGVjdEFsbEN1cnJlbmNpZXMsIHNlbGVjdEN1cnJlbmNpZXNdLFxuICAoY3VycmVuY2llczogRHluYW1pYzxzdHJpbmc+LCBzZWxlY3RlZDogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiBzZWxlY3RlZD8ubGVuZ3RoID4gMCA/IE9iamVjdC5rZXlzKGN1cnJlbmNpZXMpXG4gICAgLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+IHNlbGVjdGVkLmluY2x1ZGVzKGtleSkpIDogT2JqZWN0LmtleXMoY3VycmVuY2llcykpO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q29udmVyc2lvblJhdGVzID0gY3JlYXRlU2VsZWN0b3IoW3NlbGVjdEJhc2UsIHNlbGVjdERlZmF1bHRCYXNlLCBzZWxlY3RTZWxlY3RlZEN1cnJlbmNpZXMsIHNlbGVjdEFsbFJhdGVzLCBzZWxlY3REYXRlXSxcbiAgKGJhc2U6IHN0cmluZywgZGVmYXVsdEJhc2U6IHN0cmluZywgY3VycmVuY2llczogc3RyaW5nW10sIGFsbFJhdGVzOiBSYXRlcywgZGF0ZTogc3RyaW5nKTogRHluYW1pYzxudW1iZXI+ID0+IHtcbiAgICBjb25zdCBkYXRlUmF0ZXMgPSBhbGxSYXRlc1tkYXRlXTtcbiAgICBpZiAoIWRhdGVSYXRlcykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICAvLyBjb25zdCBhdmFpbGFibGVDdXJyZW5jaWVzID0gT2JqZWN0LmtleXMoZGF0ZVJhdGVzKTtcbiAgICBjb25zdCBpc0Jhc2VBc0Jhc2UgPSBPYmplY3Qua2V5cyhkYXRlUmF0ZXMpLmluY2x1ZGVzKGJhc2UpO1xuICAgIGNvbnN0IGJhc2VSYXRlID0gaXNCYXNlQXNCYXNlID8gMSA6IGRhdGVSYXRlc1tkZWZhdWx0QmFzZV0/LltiYXNlXTtcbiAgICBpZiAoIWJhc2VSYXRlKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGNvbnN0IHJhdGVzID0gaXNCYXNlQXNCYXNlID8gZGF0ZVJhdGVzW2Jhc2VdIDogZGF0ZVJhdGVzW2RlZmF1bHRCYXNlXTtcbiAgICByZXR1cm4gY3VycmVuY2llcy5yZWR1Y2UoKHJlc3VsdDogRHluYW1pYzxudW1iZXI+LCBjdXJyZW5jeTogc3RyaW5nKSA9PiAoe1xuICAgICAgLi4ucmVzdWx0LFxuICAgICAgW2N1cnJlbmN5XTogcmF0ZXNbY3VycmVuY3ldIC8gYmFzZVJhdGUsXG4gICAgfSksIHt9KTtcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDb252ZXJ0ZWRBbW91bnRzID0gY3JlYXRlU2VsZWN0b3IoW3NlbGVjdENvbnZlcnNpb25SYXRlcywgc2VsZWN0QW1vdW50XSxcbiAgKHJhdGVzOiBEeW5hbWljPG51bWJlcj4sIGFtb3VudDogbnVtYmVyKTogT3B0aW9uW10gPT4gT2JqZWN0LmtleXMocmF0ZXMpXG4gICAgLm1hcCgoY3VycmVuY3k6IHN0cmluZykgPT4gKHtcbiAgICAgIHZhbHVlOiBjdXJyZW5jeSxcbiAgICAgIG5hbWU6IGAke2N1cnJlbmN5fTogJHsocmF0ZXNbY3VycmVuY3ldICogYW1vdW50KS50b0ZpeGVkKDIpfWAsXG4gICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICB9KSwge30pKTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEhpc3RvcmljYWxDb252ZXJzaW9uUmF0ZXMgPSBjcmVhdGVTZWxlY3Rvcihbc2VsZWN0QmFzZSwgc2VsZWN0RGVmYXVsdEJhc2UsIHNlbGVjdFNlbGVjdGVkQ3VycmVuY2llcywgc2VsZWN0QWxsUmF0ZXMsIHNlbGVjdEZyb21EYXRlLCBzZWxlY3RUb0RhdGVdLFxuICAoYmFzZTogc3RyaW5nLCBkZWZhdWx0QmFzZTogc3RyaW5nLCBjdXJyZW5jaWVzOiBzdHJpbmdbXSwgYWxsUmF0ZXM6IFJhdGVzLCBmcm9tRGF0ZTogc3RyaW5nLCB0b0RhdGU6IHN0cmluZyk6IER5bmFtaWM8RGlmZj4gPT4ge1xuICAgIGNvbnN0IGZyb21EYXRlUmF0ZXMgPSBhbGxSYXRlc1tmcm9tRGF0ZV07XG4gICAgY29uc3QgdG9EYXRlUmF0ZXMgPSBhbGxSYXRlc1t0b0RhdGVdO1xuICAgIGlmICghZnJvbURhdGVSYXRlcyB8fCAhdG9EYXRlUmF0ZXMpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgLy8gY29uc3QgYXZhaWxhYmxlQ3VycmVuY2llcyA9IE9iamVjdC5rZXlzKGRhdGVSYXRlcyk7XG4gICAgY29uc3QgaXNGcm9tQmFzZUFzQmFzZSA9IE9iamVjdC5rZXlzKGZyb21EYXRlUmF0ZXMpLmluY2x1ZGVzKGJhc2UpO1xuICAgIGNvbnN0IGlzVG9CYXNlQXNCYXNlID0gT2JqZWN0LmtleXModG9EYXRlUmF0ZXMpLmluY2x1ZGVzKGJhc2UpO1xuICAgIGNvbnN0IGZyb21CYXNlUmF0ZSA9IGlzRnJvbUJhc2VBc0Jhc2UgPyAxIDogZnJvbURhdGVSYXRlc1tkZWZhdWx0QmFzZV0/LltiYXNlXTtcbiAgICBjb25zdCB0b0Jhc2VSYXRlID0gaXNUb0Jhc2VBc0Jhc2UgPyAxIDogdG9EYXRlUmF0ZXNbZGVmYXVsdEJhc2VdPy5bYmFzZV07XG4gICAgaWYgKCFmcm9tQmFzZVJhdGUgfHwgIXRvQmFzZVJhdGUpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgY29uc3QgZnJvbVJhdGVzID0gaXNGcm9tQmFzZUFzQmFzZSA/IGZyb21EYXRlUmF0ZXNbYmFzZV0gOiBmcm9tRGF0ZVJhdGVzW2RlZmF1bHRCYXNlXTtcbiAgICBjb25zdCB0b1JhdGVzID0gaXNUb0Jhc2VBc0Jhc2UgPyB0b0RhdGVSYXRlc1tiYXNlXSA6IHRvRGF0ZVJhdGVzW2RlZmF1bHRCYXNlXTtcbiAgICByZXR1cm4gY3VycmVuY2llcy5yZWR1Y2UoKHJlc3VsdDogRHluYW1pYzxEaWZmPiwgY3VycmVuY3k6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZnJvbSA9IGZyb21SYXRlc1tjdXJyZW5jeV0gLyBmcm9tQmFzZVJhdGU7XG4gICAgICBjb25zdCB0byA9IHRvUmF0ZXNbY3VycmVuY3ldIC8gdG9CYXNlUmF0ZTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICBbY3VycmVuY3ldOiB7XG4gICAgICAgICAgZnJvbSxcbiAgICAgICAgICB0byxcbiAgICAgICAgICBkaWZmOiB0byAtIGZyb20sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0sIHt9KTtcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RDb252ZXJ0ZWRIaXN0b3JpY2FsQW1vdW50cyA9IGNyZWF0ZVNlbGVjdG9yKFtzZWxlY3RIaXN0b3JpY2FsQ29udmVyc2lvblJhdGVzLCBzZWxlY3RBbW91bnRdLFxuICAocmF0ZXM6IER5bmFtaWM8RGlmZj4sIGFtb3VudDogbnVtYmVyKTogT3B0aW9uW10gPT4gT2JqZWN0LmtleXMocmF0ZXMpXG4gICAgLm1hcCgoY3VycmVuY3k6IHN0cmluZykgPT4gKHtcbiAgICAgIHZhbHVlOiBjdXJyZW5jeSxcbiAgICAgIG5hbWU6IGBbJHtjdXJyZW5jeX1dIGZyb206ICR7KHJhdGVzW2N1cnJlbmN5XS5mcm9tICogYW1vdW50KS50b0ZpeGVkKDIpfSB0bzogJHsocmF0ZXNbY3VycmVuY3ldLnRvICogYW1vdW50KS50b0ZpeGVkKDIpfSBkaWZmOiAkeyhyYXRlc1tjdXJyZW5jeV0uZGlmZiAqIGFtb3VudCkudG9GaXhlZCgyKX1gLFxuICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgfSksIHt9KSk7XG4iLCJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcblxuaW1wb3J0IHtcbiAgR2xvYmFsU3RhdGUsXG4gIEN1cnJlbmN5U3RhdGUsXG59IGZyb20gJy4uL2ludGVyZmFjZXMvc3RhdGUuaW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBMb2FkaW5nRGF0YSxcbiAgRHluYW1pYyxcbiAgUmF0ZXMsXG59IGZyb20gJy4uL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZXMnO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q3VycmVuY3lTdGF0ZSA9IChzdGF0ZTogR2xvYmFsU3RhdGUpOiBDdXJyZW5jeVN0YXRlID0+IHN0YXRlLmN1cnJlbmN5O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q3VycmVuY2llc0RhdGEgPSBjcmVhdGVTZWxlY3RvcihzZWxlY3RDdXJyZW5jeVN0YXRlLFxuICAoc3RhdGU6IEN1cnJlbmN5U3RhdGUpOiBMb2FkaW5nRGF0YTxEeW5hbWljPHN0cmluZz4+ID0+IHN0YXRlLmN1cnJlbmNpZXMpO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0QWxsQ3VycmVuY2llcyA9IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdEN1cnJlbmNpZXNEYXRhLFxuICAoZGF0YTogTG9hZGluZ0RhdGE8RHluYW1pYzxzdHJpbmc+Pik6IER5bmFtaWM8c3RyaW5nPiA9PiBkYXRhLmRhdGEpO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q3VycmVuY3lMb2FkaW5nID0gY3JlYXRlU2VsZWN0b3Ioc2VsZWN0Q3VycmVuY2llc0RhdGEsXG4gIChkYXRhOiBMb2FkaW5nRGF0YTxEeW5hbWljPHN0cmluZz4+KTogYm9vbGVhbiA9PiBkYXRhLmxvYWRpbmcpO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q3VycmVuY3lFcnJvciA9IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdEN1cnJlbmNpZXNEYXRhLFxuICAoZGF0YTogTG9hZGluZ0RhdGE8RHluYW1pYzxzdHJpbmc+Pik6IHN0cmluZyA9PiBkYXRhLmVycm9yKTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFJhdGVzRGF0YSA9IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdEN1cnJlbmN5U3RhdGUsXG4gIChzdGF0ZTogQ3VycmVuY3lTdGF0ZSk6IExvYWRpbmdEYXRhPFJhdGVzPiA9PiBzdGF0ZS5yYXRlcyk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RBbGxSYXRlcyA9IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdFJhdGVzRGF0YSxcbiAgKGRhdGE6IExvYWRpbmdEYXRhPFJhdGVzPik6IFJhdGVzID0+IGRhdGEuZGF0YSk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RSYXRlc0xvYWRpbmcgPSBjcmVhdGVTZWxlY3RvcihzZWxlY3RSYXRlc0RhdGEsXG4gIChkYXRhOiBMb2FkaW5nRGF0YTxSYXRlcz4pOiBib29sZWFuID0+IGRhdGEubG9hZGluZyk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RSYXRlc0Vycm9yID0gY3JlYXRlU2VsZWN0b3Ioc2VsZWN0UmF0ZXNEYXRhLFxuICAoZGF0YTogTG9hZGluZ0RhdGE8UmF0ZXM+KTogc3RyaW5nID0+IGRhdGEuZXJyb3IpO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0RGF0ZSA9IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdEN1cnJlbmN5U3RhdGUsXG4gIChzdGF0ZTogQ3VycmVuY3lTdGF0ZSk6IHN0cmluZyA9PiBzdGF0ZS5kYXRlKTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEZyb21EYXRlID0gY3JlYXRlU2VsZWN0b3Ioc2VsZWN0Q3VycmVuY3lTdGF0ZSxcbiAgKHN0YXRlOiBDdXJyZW5jeVN0YXRlKTogc3RyaW5nID0+IHN0YXRlLmZyb21EYXRlKTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFRvRGF0ZSA9IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdEN1cnJlbmN5U3RhdGUsXG4gIChzdGF0ZTogQ3VycmVuY3lTdGF0ZSk6IHN0cmluZyA9PiBzdGF0ZS50b0RhdGUpO1xuIiwiaW1wb3J0IGF4aW9zLCB7IEF4aW9zUmVzcG9uc2UgfSBmcm9tICdheGlvcyc7XG5cbmltcG9ydCB7XG4gIEN1cnJlbmN5UmVzcG9uc2UsXG4gIFJhdGVzUmVzcG9uc2UsXG59IGZyb20gJy4uL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZXMnO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW5jaWVzID0gKCkgPT5cbiAgYXhpb3MuZ2V0KCcvc3ltYm9scycpXG4gICAgLnRoZW4oKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlPEN1cnJlbmN5UmVzcG9uc2U+KTogQ3VycmVuY3lSZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoTGF0ZXN0ID0gKGJhc2U6IHN0cmluZywgY3VycmVuY2llczogc3RyaW5nW10pID0+XG4gIGF4aW9zLmdldChgL2xhdGVzdD9iYXNlPSR7YmFzZX0ke2N1cnJlbmNpZXM/Lmxlbmd0aCA+IDAgPyBgJnN5bWJvbHM9JHtjdXJyZW5jaWVzLmpvaW4oJywnKX1gIDogJyd9YClcbiAgICAudGhlbigocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8UmF0ZXNSZXNwb25zZT4pOiBSYXRlc1Jlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hIaXN0b3JpY2FsID0gKGRhdGU6IHN0cmluZywgYmFzZTogc3RyaW5nLCBjdXJyZW5jaWVzOiBzdHJpbmdbXSkgPT5cbiAgYXhpb3MuZ2V0KGAvJHtkYXRlfT9iYXNlPSR7YmFzZX0ke2N1cnJlbmNpZXM/Lmxlbmd0aCA+IDAgPyBgJnN5bWJvbHM9JHtjdXJyZW5jaWVzLmpvaW4oJywnKX1gIDogJyd9YClcbiAgICAudGhlbigocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U8UmF0ZXNSZXNwb25zZT4pOiBSYXRlc1Jlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==