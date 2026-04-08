(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/CustomCursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomCursor",
    ()=>CustomCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function CustomCursor() {
    _s();
    const dotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ringRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const ring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const raf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomCursor.useEffect": ()=>{
            const onMove = {
                "CustomCursor.useEffect.onMove": (e)=>{
                    pos.current = {
                        x: e.clientX,
                        y: e.clientY
                    };
                }
            }["CustomCursor.useEffect.onMove"];
            const onEnter = {
                "CustomCursor.useEffect.onEnter": ()=>ringRef.current?.classList.add('hovering')
            }["CustomCursor.useEffect.onEnter"];
            const onLeave = {
                "CustomCursor.useEffect.onLeave": ()=>ringRef.current?.classList.remove('hovering')
            }["CustomCursor.useEffect.onLeave"];
            const tick = {
                "CustomCursor.useEffect.tick": ()=>{
                    ring.current.x += (pos.current.x - ring.current.x) * 0.12;
                    ring.current.y += (pos.current.y - ring.current.y) * 0.12;
                    if (dotRef.current) {
                        dotRef.current.style.left = `${pos.current.x}px`;
                        dotRef.current.style.top = `${pos.current.y}px`;
                    }
                    if (ringRef.current) {
                        ringRef.current.style.left = `${ring.current.x}px`;
                        ringRef.current.style.top = `${ring.current.y}px`;
                    }
                    raf.current = requestAnimationFrame(tick);
                }
            }["CustomCursor.useEffect.tick"];
            window.addEventListener('mousemove', onMove);
            document.querySelectorAll('a, button, [data-hover]').forEach({
                "CustomCursor.useEffect": (el)=>{
                    el.addEventListener('mouseenter', onEnter);
                    el.addEventListener('mouseleave', onLeave);
                }
            }["CustomCursor.useEffect"]);
            const observer = new MutationObserver({
                "CustomCursor.useEffect": ()=>{
                    document.querySelectorAll('a, button, [data-hover]').forEach({
                        "CustomCursor.useEffect": (el)=>{
                            el.addEventListener('mouseenter', onEnter);
                            el.addEventListener('mouseleave', onLeave);
                        }
                    }["CustomCursor.useEffect"]);
                }
            }["CustomCursor.useEffect"]);
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            raf.current = requestAnimationFrame(tick);
            return ({
                "CustomCursor.useEffect": ()=>{
                    window.removeEventListener('mousemove', onMove);
                    cancelAnimationFrame(raf.current);
                    observer.disconnect();
                }
            })["CustomCursor.useEffect"];
        }
    }["CustomCursor.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: dotRef,
                className: "cursor-dot"
            }, void 0, false, {
                fileName: "[project]/components/CustomCursor.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: ringRef,
                className: "cursor-ring"
            }, void 0, false, {
                fileName: "[project]/components/CustomCursor.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(CustomCursor, "vg+1zFUMaoh+lkROvWTKKa4Vw5U=");
_c = CustomCursor;
var _c;
__turbopack_context__.k.register(_c, "CustomCursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_CustomCursor_tsx_07xdh1z._.js.map