webpackHotUpdate("./script.min",{

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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1NlbGVjdG9yLnRzeCJdLCJuYW1lcyI6WyJTZWxlY3RvciIsInByb3BzIiwidXNlU3RhdGUiLCJzZWFyY2giLCJzZXRTZWFyY2giLCJvcHRpb25zIiwiZmlsdGVyIiwib3B0aW9uIiwibmFtZSIsInRvTG9jYWxlTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJnZXRJY29uIiwibm9JY29uIiwibXVsdGlwbGUiLCJzZWxlY3RlZCIsImNsaWNrSGFuZGxlciIsImV2ZW50IiwiZmllbGQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidmFsdWUiLCJkYXRhc2V0IiwiY2hhbmdlSGFuZGxlciIsImNsYXNzTmFtZSIsIm1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFPQTtBQUVBOztBQVdBLElBQU1BLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLEtBQUQsRUFBa0I7QUFBQSxrQkFDTEMsc0RBQVEsQ0FBQyxFQUFELENBREg7QUFBQTtBQUFBLE1BQzFCQyxNQUQwQjtBQUFBLE1BQ2xCQyxTQURrQjs7QUFFakMsTUFBTUMsT0FBTyxHQUFHSixLQUFLLENBQUNJLE9BQU4sQ0FBY0MsTUFBZCxDQUFxQixVQUFDQyxNQUFEO0FBQUEsV0FBb0JBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZQyxpQkFBWixHQUFnQ0MsUUFBaEMsQ0FBeUNQLE1BQXpDLENBQXBCO0FBQUEsR0FBckIsQ0FBaEI7O0FBQ0EsTUFBTVEsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ0osTUFBRCxFQUFvQjtBQUNsQyxRQUFJTixLQUFLLENBQUNXLE1BQVYsRUFBa0I7QUFDaEIsYUFBTyxJQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUlYLEtBQUssQ0FBQ1ksUUFBVixFQUFvQjtBQUN6QixhQUFPTixNQUFNLENBQUNPLFFBQVAsR0FBa0IsY0FBbEIsR0FBbUMsUUFBMUM7QUFDRCxLQUZNLE1BRUE7QUFDTCxhQUFPUCxNQUFNLENBQUNPLFFBQVAsR0FBa0IsY0FBbEIsR0FBbUMsUUFBMUM7QUFDRDtBQUNGLEdBUkQ7O0FBU0EsTUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ0MsS0FBRCxFQUF5RDtBQUFBOztBQUM1RTtBQUNBLFFBQU1DLEtBQUssb0JBQUdELEtBQUssQ0FBQ0UsTUFBVCxrREFBRyxjQUFjQyxPQUFkLENBQXNCLFFBQXRCLENBQWQ7QUFDQSxRQUFNQyxLQUFLLEdBQUdILEtBQUgsYUFBR0EsS0FBSCx5Q0FBR0EsS0FBSyxDQUFFSSxPQUFWLG1EQUFHLGVBQWdCRCxLQUE5Qjs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVG5CLFdBQUssQ0FBQ3FCLGFBQU4sQ0FBb0JGLEtBQXBCO0FBQ0Q7QUFDRixHQVJEOztBQVNBLE1BQU1FLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ04sS0FBRCxFQUEwQztBQUM5RFosYUFBUyxDQUFDWSxLQUFLLENBQUNFLE1BQU4sQ0FBYUUsS0FBYixDQUFtQlgsaUJBQW5CLEVBQUQsQ0FBVDtBQUNELEdBRkQ7O0FBSUEsc0JBQ0U7QUFBUyxhQUFTLHFCQUFjUixLQUFLLENBQUNzQixTQUFOLElBQW1CLEVBQWpDLENBQWxCO0FBQ1MsV0FBTyxFQUFFdEIsS0FBSyxDQUFDcUIsYUFBTixHQUFzQlAsWUFBdEIsR0FBcUM7QUFEdkQsa0JBRUU7QUFBUyxhQUFTLEVBQUM7QUFBbkIsS0FBcUNkLEtBQUssQ0FBQ08sSUFBM0MsQ0FGRixlQUdFO0FBQVMsYUFBUyxFQUFDO0FBQW5CLDhCQUNVO0FBQU8sUUFBSSxFQUFDLE1BQVo7QUFBbUIsWUFBUSxFQUFFYztBQUE3QixJQURWLENBSEYsZUFNRTtBQUFTLGFBQVMsRUFBQztBQUFuQixLQUNHakIsT0FBTyxDQUFDbUIsR0FBUixDQUFZLFVBQUNqQixNQUFEO0FBQUEsd0JBQ1gsb0RBQUMsOENBQUQ7QUFBTyxTQUFHLEVBQUVBLE1BQU0sQ0FBQ2EsS0FBbkI7QUFDTyxVQUFJLEVBQUVULE9BQU8sQ0FBQ0osTUFBRCxDQURwQjtBQUVPLFVBQUksRUFBRUEsTUFBTSxDQUFDQyxJQUZwQjtBQUdPLFlBQU0sRUFBRUwsTUFIZjtBQUlPLFdBQUssRUFBRUksTUFBTSxDQUFDYTtBQUpyQixNQURXO0FBQUEsR0FBWixDQURILENBTkYsQ0FERjtBQWtCRCxDQTNDRDs7QUE2Q2VwQix1RUFBZixFIiwiZmlsZSI6Ii4vc2NyaXB0Lm1pbi41NDdjZTViZmUxOWQ2ODAwODlmNS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIHVzZVN0YXRlLFxyXG4gIE1vdXNlRXZlbnQgYXMgU3ludGhldGljTW91c2VFdmVudCxcclxuICBDaGFuZ2VFdmVudCxcclxufSBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2VzJztcclxuaW1wb3J0IEZpZWxkIGZyb20gJy4vRmllbGQnO1xyXG5cclxuaW1wb3J0ICcuL3NlbGVjdG9yLnNjc3MnO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgb3B0aW9uczogT3B0aW9uW107XHJcbiAgbXVsdGlwbGU/OiBib29sZWFuO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBub0ljb24/OiBib29sZWFuO1xyXG4gIGNoYW5nZUhhbmRsZXI/OiBGdW5jdGlvbjtcclxufVxyXG5cclxuY29uc3QgU2VsZWN0b3IgPSAocHJvcHM6IFByb3BzKSA9PiB7XHJcbiAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBvcHRpb25zID0gcHJvcHMub3B0aW9ucy5maWx0ZXIoKG9wdGlvbjogT3B0aW9uKSA9PiBvcHRpb24ubmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaCkpO1xyXG4gIGNvbnN0IGdldEljb24gPSAob3B0aW9uOiBPcHRpb24pID0+IHtcclxuICAgIGlmIChwcm9wcy5ub0ljb24pIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9IGVsc2UgaWYgKHByb3BzLm11bHRpcGxlKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQgPyAnY2hlY2stc3F1YXJlJyA6ICdzcXVhcmUnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZCA/ICdjaGVjay1jaXJjbGUnIDogJ2NpcmNsZSc7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjb25zdCBjbGlja0hhbmRsZXIgPSAoZXZlbnQ6IFN5bnRoZXRpY01vdXNlRXZlbnQ8SFRNTEVsZW1lbnQsIE1vdXNlRXZlbnQ+KSA9PiB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBmaWVsZCA9IGV2ZW50LnRhcmdldD8uY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGZpZWxkPy5kYXRhc2V0Py52YWx1ZTtcclxuICAgIFxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHByb3BzLmNoYW5nZUhhbmRsZXIodmFsdWUpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY29uc3QgY2hhbmdlSGFuZGxlciA9IChldmVudDogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUudG9Mb2NhbGVMb3dlckNhc2UoKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17YHNlbGVjdG9yICR7cHJvcHMuY2xhc3NOYW1lIHx8ICcnfWB9XHJcbiAgICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5jaGFuZ2VIYW5kbGVyID8gY2xpY2tIYW5kbGVyIDogbnVsbH0+XHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT0nc2VsZWN0b3JfX25hbWUnPntwcm9wcy5uYW1lfTwvc2VjdGlvbj5cclxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPSdzZWxlY3Rvcl9fZmlsdGVyJz5cclxuICAgICAgICBGaWx0ZXI6IDxpbnB1dCB0eXBlPSd0ZXh0JyBvbkNoYW5nZT17Y2hhbmdlSGFuZGxlcn0gLz5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9J3NlbGVjdG9yX192YWx1ZXMnPlxyXG4gICAgICAgIHtvcHRpb25zLm1hcCgob3B0aW9uOiBPcHRpb24pID0+IChcclxuICAgICAgICAgIDxGaWVsZCBrZXk9e29wdGlvbi52YWx1ZX1cclxuICAgICAgICAgICAgICAgICBpY29uPXtnZXRJY29uKG9wdGlvbil9XHJcbiAgICAgICAgICAgICAgICAgbmFtZT17b3B0aW9uLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XHJcbiAgICAgICAgICAgICAgICAgdmFsdWU9e29wdGlvbi52YWx1ZX0gLz5cclxuICAgICAgICApKX1cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RvcjtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==