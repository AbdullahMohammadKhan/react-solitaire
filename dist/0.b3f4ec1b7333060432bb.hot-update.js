webpackHotUpdate(0,{

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(59), RootInstanceProvider = __webpack_require__(67), ReactMount = __webpack_require__(69), React = __webpack_require__(123); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {\n\n\"use strict\";\n\n!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {\n    /// <reference path=\"Constants.ts\"/>\n    //\n    var Card = (function () {\n        function Card(suit, rank) {\n            this.show = true;\n            this.suit = suit;\n            this.rank = rank;\n            this.joker = false;\n        }\n        Card.prototype.getImageFile = function () {\n            var filename = cardsDir + Suit[this.suit] + '/' + Rank[this.rank] + '.png';\n            return filename.toLowerCase();\n            //return 'img/cards/${this.suit}/${this.rank}';\twtb string interpolation\n        };\n        Card.prototype.display = function () {\n            if (!this.show) {\n                return Card.backFace;\n            }\n            return this.getImageFile();\n        };\n        Card.prototype.toString = function () {\n            return Rank[this.rank] + \" of \" + Suit[this.suit];\n        };\n        return Card;\n    })();\n    exports.Card = Card;\n}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n//# sourceMappingURL=Card.js.map\n\n/* REACT HOT LOADER */ }).call(this); if (true) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(229), foundReactClasses = false; if (makeExportsHot(module, __webpack_require__(123))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"Card.js\" + \": \" + err.message); } }); } } })(); }\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)(module)))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/Card.js\n ** module id = 236\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/Card.js?");

/***/ }

})