"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/api/apiRequests.ts":
/*!**********************************!*\
  !*** ./pages/api/apiRequests.ts ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAccessToken: function() { return /* binding */ getAccessToken; },\n/* harmony export */   getExplanationOfBenefit: function() { return /* binding */ getExplanationOfBenefit; },\n/* harmony export */   getPatientId: function() { return /* binding */ getPatientId; }\n/* harmony export */ });\n// Get request - get access token\nconst getAccessToken = async (publicToken)=>{\n    try {\n        const { href } = new URL(\"http://localhost:9000/\");\n        const response = await fetch(\"\".concat(href, \"link/exchange\"), {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify({\n                publicToken\n            })\n        });\n        console.log(\"Flexpa Public API Base URL - \", \"https://api.flexpa.com\");\n        console.log(\"getAccessToken - Response:\", response);\n        if (!response.ok) {\n            const errorMessage = \"Failed to obtain access token.\";\n            const status = response.status;\n            throw Object.assign(new Error(errorMessage), {\n                status\n            });\n        }\n        const exchangeTokenData = await response.json();\n        console.log(\"Exchange Token Data:\", exchangeTokenData);\n        return exchangeTokenData.data.access_token;\n    } catch (error) {\n        console.error(\"Error in getAccessToken:\", {\n            message: error instanceof Error ? error.message : error,\n            status: error instanceof Error && \"status\" in error ? error.status : undefined\n        });\n        return null;\n    }\n};\n// Get request - get patient ID\nconst getPatientId = async (accessToken)=>{\n    try {\n        const response = await fetch(\"/link/introspect\", {\n            method: \"POST\",\n            headers: {\n                \"Access-Token\": accessToken,\n                \"Content-Type\": \"application/json\"\n            }\n        });\n        console.log(\"getPatientId - Response:\", response); // Log the response\n        if (!response.ok) {\n            const errorMessage = \"Failed to obtain patient ID\";\n            const status = response.status;\n            console.error(\"getPatientId - HTTP Error:\", {\n                message: errorMessage,\n                status\n            });\n            throw Object.assign(new Error(errorMessage), {\n                status\n            });\n        }\n        const introspectTokenData = await response.json();\n        // use URL constructor to extract the pathname\n        const url = new URL(introspectTokenData.data.sub);\n        // extract last part of the pathname\n        const patientId = url.pathname.split(\"/\").pop();\n        return patientId || null;\n    } catch (error) {\n        console.error(\"Error in getPatientId:\", {\n            message: error instanceof Error ? error.message : error,\n            status: error instanceof Error && \"status\" in error ? error.status : undefined\n        });\n        return null;\n    }\n};\n// Get request - get explanation of benefit\nconst getExplanationOfBenefit = async (patientId, accessToken)=>{\n    try {\n        const response = await fetch(\"/fhir/ExplanationOfBenefit?patient=\".concat(patientId), {\n            method: \"GET\",\n            headers: {\n                \"Access-Token\": accessToken,\n                \"Content-Type\": \"application/json\"\n            }\n        });\n        console.log(\"getExplanationOfBenefit - Response:\", response); // Log the response\n        if (!response.ok) {\n            const errorMessage = \"Failed to obtain Explanation of Benefit data.\";\n            const status = response.status;\n            console.error(\"getExplanationOfBenefit - HTTP Error:\", {\n                message: errorMessage,\n                status\n            });\n            throw Object.assign(new Error(errorMessage), {\n                status\n            });\n        }\n        // parse JSON data from response\n        const eobData = await response.json();\n        // return data property from parsed JSON or null if data is not present\n        return eobData.data || null;\n    } catch (error) {\n        console.error(\"Error in getExplanationOfBenefit:\", {\n            message: error instanceof Error ? error.message : error,\n            status: error instanceof Error && \"status\" in error ? error.status : undefined\n        });\n        return null;\n    }\n};\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU1DLFNBQVNkLFNBQVNjLE1BQU07WUFDOUJQLFFBQVFlLEtBQUssQ0FBQyx5Q0FBeUM7Z0JBQ3JEQyxTQUFTVjtnQkFDVEM7WUFDRjtZQUNBLE1BQU1DLE9BQU9DLE1BQU0sQ0FBQyxJQUFJQyxNQUFNSixlQUFlO2dCQUFFQztZQUFPO1FBQ3hEO1FBQ0EsZ0NBQWdDO1FBQ2hDLE1BQU1xQixVQUFVLE1BQU1uQyxTQUFTbUIsSUFBSTtRQUNuQyx1RUFBdUU7UUFDdkUsT0FBT2dCLFFBQVFmLElBQUksSUFBSTtJQUN6QixFQUFFLE9BQU9FLE9BQU87UUFDZGYsUUFBUWUsS0FBSyxDQUFDLHFDQUFxQztZQUNqREMsU0FBVUQsaUJBQWlCTCxRQUFRSyxNQUFNQyxPQUFPLEdBQUdEO1lBQ25EUixRQUFTUSxpQkFBaUJMLFNBQVMsWUFBWUssUUFBUUEsTUFBTVIsTUFBTSxHQUFHVTtRQUN4RTtRQUNBLE9BQU87SUFDVDtBQUNGO0FBRStEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2FwaS9hcGlSZXF1ZXN0cy50cz81MTZhIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEdldCByZXF1ZXN0IC0gZ2V0IGFjY2VzcyB0b2tlblxuY29uc3QgZ2V0QWNjZXNzVG9rZW4gPSBhc3luYyAocHVibGljVG9rZW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGhyZWYgfSA9IG5ldyBVUkwoJ2h0dHA6Ly9sb2NhbGhvc3Q6OTAwMC8nKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7aHJlZn1saW5rL2V4Y2hhbmdlYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgICAgcHVibGljVG9rZW4sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKCdGbGV4cGEgUHVibGljIEFQSSBCYXNlIFVSTCAtICcsIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZMRVhQQV9QVUJMSUNfQVBJX0JBU0VfVVJMKTtcbiAgICAgIGNvbnNvbGUubG9nKCdnZXRBY2Nlc3NUb2tlbiAtIFJlc3BvbnNlOicsIHJlc3BvbnNlKTtcbiAgXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdGYWlsZWQgdG8gb2J0YWluIGFjY2VzcyB0b2tlbi4nO1xuICAgICAgICBjb25zdCBzdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHRocm93IE9iamVjdC5hc3NpZ24obmV3IEVycm9yKGVycm9yTWVzc2FnZSksIHsgc3RhdHVzIH0pO1xuICAgICAgfVxuICBcbiAgICAgIGNvbnN0IGV4Y2hhbmdlVG9rZW5EYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgY29uc29sZS5sb2coJ0V4Y2hhbmdlIFRva2VuIERhdGE6JywgZXhjaGFuZ2VUb2tlbkRhdGEpO1xuICAgICAgcmV0dXJuIGV4Y2hhbmdlVG9rZW5EYXRhLmRhdGEuYWNjZXNzX3Rva2VuO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBnZXRBY2Nlc3NUb2tlbjonLCB7XG4gICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IsXG4gICAgICAgIHN0YXR1czogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAnc3RhdHVzJyBpbiBlcnJvciA/IGVycm9yLnN0YXR1cyA6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4vLyBHZXQgcmVxdWVzdCAtIGdldCBwYXRpZW50IElEXG5jb25zdCBnZXRQYXRpZW50SWQgPSBhc3luYyAoYWNjZXNzVG9rZW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2xpbmsvaW50cm9zcGVjdFwiLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2Vzcy1Ub2tlbic6IGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgXG4gICAgICBjb25zb2xlLmxvZygnZ2V0UGF0aWVudElkIC0gUmVzcG9uc2U6JywgcmVzcG9uc2UpOyAvLyBMb2cgdGhlIHJlc3BvbnNlXG4gIFxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnRmFpbGVkIHRvIG9idGFpbiBwYXRpZW50IElEJztcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdnZXRQYXRpZW50SWQgLSBIVFRQIEVycm9yOicsIHtcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgc3RhdHVzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKSwgeyBzdGF0dXMgfSk7XG4gICAgICB9XG4gIFxuICAgICAgY29uc3QgaW50cm9zcGVjdFRva2VuRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgXG4gICAgICAvLyB1c2UgVVJMIGNvbnN0cnVjdG9yIHRvIGV4dHJhY3QgdGhlIHBhdGhuYW1lXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGludHJvc3BlY3RUb2tlbkRhdGEuZGF0YS5zdWIpO1xuICAgICAgLy8gZXh0cmFjdCBsYXN0IHBhcnQgb2YgdGhlIHBhdGhuYW1lXG4gICAgICBjb25zdCBwYXRpZW50SWQgPSB1cmwucGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgIHJldHVybiBwYXRpZW50SWQgfHwgbnVsbDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gZ2V0UGF0aWVudElkOicsIHtcbiAgICAgICAgbWVzc2FnZTogKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IpLFxuICAgICAgICBzdGF0dXM6IChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICdzdGF0dXMnIGluIGVycm9yID8gZXJyb3Iuc3RhdHVzIDogdW5kZWZpbmVkKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuICBcbiAgLy8gR2V0IHJlcXVlc3QgLSBnZXQgZXhwbGFuYXRpb24gb2YgYmVuZWZpdFxuICBjb25zdCBnZXRFeHBsYW5hdGlvbk9mQmVuZWZpdCA9IGFzeW5jIChcbiAgICBwYXRpZW50SWQ6IHN0cmluZyxcbiAgICBhY2Nlc3NUb2tlbjogc3RyaW5nXG4gICk6IFByb21pc2U8b2JqZWN0IHwgbnVsbD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvZmhpci9FeHBsYW5hdGlvbk9mQmVuZWZpdD9wYXRpZW50PSR7cGF0aWVudElkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2Nlc3MtVG9rZW4nOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gIFxuICAgICAgY29uc29sZS5sb2coJ2dldEV4cGxhbmF0aW9uT2ZCZW5lZml0IC0gUmVzcG9uc2U6JywgcmVzcG9uc2UpOyAvLyBMb2cgdGhlIHJlc3BvbnNlXG4gIFxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnRmFpbGVkIHRvIG9idGFpbiBFeHBsYW5hdGlvbiBvZiBCZW5lZml0IGRhdGEuJztcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdnZXRFeHBsYW5hdGlvbk9mQmVuZWZpdCAtIEhUVFAgRXJyb3I6Jywge1xuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSxcbiAgICAgICAgICBzdGF0dXMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aHJvdyBPYmplY3QuYXNzaWduKG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpLCB7IHN0YXR1cyB9KTtcbiAgICAgIH1cbiAgICAgIC8vIHBhcnNlIEpTT04gZGF0YSBmcm9tIHJlc3BvbnNlXG4gICAgICBjb25zdCBlb2JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgLy8gcmV0dXJuIGRhdGEgcHJvcGVydHkgZnJvbSBwYXJzZWQgSlNPTiBvciBudWxsIGlmIGRhdGEgaXMgbm90IHByZXNlbnRcbiAgICAgIHJldHVybiBlb2JEYXRhLmRhdGEgfHwgbnVsbDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gZ2V0RXhwbGFuYXRpb25PZkJlbmVmaXQ6Jywge1xuICAgICAgICBtZXNzYWdlOiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvciksXG4gICAgICAgIHN0YXR1czogKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgJ3N0YXR1cycgaW4gZXJyb3IgPyBlcnJvci5zdGF0dXMgOiB1bmRlZmluZWQpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbmV4cG9ydCB7IGdldEFjY2Vzc1Rva2VuLCBnZXRQYXRpZW50SWQsIGdldEV4cGxhbmF0aW9uT2ZCZW5lZml0IH07Il0sIm5hbWVzIjpbImdldEFjY2Vzc1Rva2VuIiwicHVibGljVG9rZW4iLCJocmVmIiwiVVJMIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfRkxFWFBBX1BVQkxJQ19BUElfQkFTRV9VUkwiLCJvayIsImVycm9yTWVzc2FnZSIsInN0YXR1cyIsIk9iamVjdCIsImFzc2lnbiIsIkVycm9yIiwiZXhjaGFuZ2VUb2tlbkRhdGEiLCJqc29uIiwiZGF0YSIsImFjY2Vzc190b2tlbiIsImVycm9yIiwibWVzc2FnZSIsInVuZGVmaW5lZCIsImdldFBhdGllbnRJZCIsImFjY2Vzc1Rva2VuIiwiaW50cm9zcGVjdFRva2VuRGF0YSIsInVybCIsInN1YiIsInBhdGllbnRJZCIsInBhdGhuYW1lIiwic3BsaXQiLCJwb3AiLCJnZXRFeHBsYW5hdGlvbk9mQmVuZWZpdCIsImVvYkRhdGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/apiRequests.ts\n"));

/***/ })

});