/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/subscribe.js":
/*!********************************!*\
  !*** ./assets/js/subscribe.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _subscribeAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribeAPI.js */ \"./assets/js/subscribeAPI.js\");\n\n// preload\nfunction preloadImages(imagesURLs) {\n  imagesURLs.forEach((url) => {\n    const image = new Image();\n    console.log(location.origin);\n    image.src = window.location.origin + url;\n  });\n}\n// component open/close 메서드\nfunction showComponent(className, element) {\n  if (element) {\n    const showComponent = element.querySelector(className);\n    showComponent.hidden = false;\n    return;\n  }\n  const showComponent = document.querySelector(className);\n  showComponent.hidden = false;\n}\n\nfunction hideComponent(className, element) {\n  if (element) {\n    const showComponent = element.querySelector(className);\n    showComponent.hidden = true;\n    return;\n  }\n  const overlay = document.querySelector(className);\n  overlay.hidden = true;\n}\n\nfunction makeCloseBtn(btnCloseClassName, componentName) {\n  const closeBtn = document.querySelector(btnCloseClassName);\n  closeBtn.addEventListener(\"click\", () => {\n    hideComponent(componentName);\n  });\n}\n\nfunction makeSubScribeForm(form) {\n  form.addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    subscribeNewso(e, form);\n  });\n}\nfunction makeOpenBtn(btnName, openComponentName) {\n  const btns = document.querySelectorAll(btnName);\n  btns.forEach((btn) => {\n    btn.addEventListener(\"click\", () => {\n      showComponent(openComponentName);\n    });\n  });\n}\nfunction hideSubscribeResult(resultMessage) {\n  const errorMessageContainers = resultMessage.querySelectorAll(\n    \".error-text-container\"\n  );\n  errorMessageContainers.forEach((container) => {\n    container.style.display = \"none\";\n  });\n}\n\n// 구독 메서드\nfunction getUser(form) {\n  const email = form.querySelector(\".js-email-input\");\n  const name = form.querySelector(\".js-name-input\");\n  const user = { email: email.value, name: name.value };\n  return user;\n}\n\n// mainsubscribe 함수\nasync function subscribeNewso(e, form) {\n  e.preventDefault();\n  showComponent(\".loading-sppiner\", form);\n  // 메세지 지우고 시작\n  const resultMessage = form.querySelector(\".result-message\");\n  hideSubscribeResult(resultMessage);\n  const user = getUser(form);\n  const result = await _subscribeAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addSubscriber(user);\n  // 메세지 보여주기\n  hideComponent(\".loading-sppiner\", form);\n  showSubscribeResult(result, resultMessage, user);\n}\n\nfunction showSubscribeResult(result, resultMessage) {\n  const success = resultMessage.querySelector(\".success\");\n  const fail = resultMessage.querySelector(\".fail\");\n\n  const getMessageByResult = {\n    update: {\n      status: success,\n      text: \"입력하신 이메일 주소로 확인 메일을 보내드렸습니다.\",\n    },\n    success: {\n      status: success,\n      text: \"입력하신 이메일 주소로 확인 메일을 보내드렸습니다.\",\n    },\n    failExistEmail: { status: fail, text: \"이미 구독 중인 이메일 주소입니다.\" },\n    failUnknown: {\n      status: fail,\n      text: \"이런, 뭔가 잘못된 것 같습니다. 입력한 값을 다시 확인하세요.\",\n    },\n    default: { status: fail, text: \"이메일을 확인해주세요\" },\n  };\n\n  const message = getMessageByResult[result] || getMessageByResult[\"default\"];\n  showText(message);\n}\n\nfunction showText({ status, text }) {\n  const messageElement = status.querySelector(\".result-message-text\");\n  messageElement.innerText = text;\n  status.style.display = \"flex\";\n}\n\n// 실제 동작 함수\nconst imagesUrls = [\n  \"/assets/images/color-icons/bn-hover-insta@2x.png\",\n  \"/assets/images/color-icons/bn-hover-facebook@2x.png\",\n  \"/assets/images/color-icons/bn-hover-data@2x.png\",\n  \"/assets/images/color-icons/bn-hover-kakaotalk@2x.png\",\n  \"/assets/images/color-icons/bn-hover-mail@2x.png\",\n];\n\npreloadImages(imagesUrls);\nmakeOpenBtn(\".js-subscribe-open-btn\", \".overlay-subscribe\");\nmakeOpenBtn(\".js-policy-open-btn\", \".overlay-policy\");\nmakeOpenBtn(\".mo-menu-btn\", \".mo-menu-overlay\");\n\nmakeCloseBtn(\".modal-exit\", \".overlay-subscribe\");\nmakeCloseBtn(\".mo-menu-modal-exit\", \".mo-menu-overlay\");\nmakeCloseBtn(\".modal-policy-exit\", \".overlay-policy\");\n\nconst subscribe_forms = document.querySelectorAll(\".js-subscribe-form\");\nsubscribe_forms.forEach((form) => {\n  makeSubScribeForm(form);\n});\n\n\n//# sourceURL=webpack://newso/./assets/js/subscribe.js?");

/***/ }),

/***/ "./assets/js/subscribeAPI.js":
/*!***********************************!*\
  !*** ./assets/js/subscribeAPI.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass SubscribeAPI {\n  constructor() {\n    this.headers = new Headers();\n    this.headers.append(\"Content-Type\", \"application/json\");\n  }\n\n  async postSubscribe(user) {\n    const raw = JSON.stringify({\n      email: user.email,\n      name: user.name,\n    });\n\n    const requestOptions = {\n      method: \"POST\",\n      headers: this.headers,\n      body: raw,\n      redirect: \"follow\",\n    };\n\n    try {\n      //aws 람다임\n      const response = await fetch(\n        \"https://84l4s5m4ik.execute-api.ap-northeast-2.amazonaws.com/default/newso-subscribe\",\n        requestOptions\n      ).then((response) => response.json());\n      const subscribeResult = response.body.result;\n      return subscribeResult;\n    } catch (error) {\n      throw new Error(error);\n    }\n  }\n\n  async addSubscriber(user) {\n    const result = await this.postSubscribe(user);\n    const { Ok, Value } = result;\n    if (!Ok) {\n      return \"failUnknown\";\n    }\n    const subscribeResults = Value;\n    for (let subscribeResult in subscribeResults) {\n      if (subscribeResults[subscribeResult].length !== 0) {\n        return subscribeResult;\n      }\n    }\n  }\n}\n\nconst subscribeAPI = new SubscribeAPI();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (subscribeAPI);\n\n\n//# sourceURL=webpack://newso/./assets/js/subscribeAPI.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/js/subscribe.js");
/******/ 	
/******/ })()
;