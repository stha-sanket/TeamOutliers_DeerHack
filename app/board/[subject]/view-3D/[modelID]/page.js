"use client";

import { useEffect, useState } from "react";
import InsertScript from "@/app/bundles/components/common/InsertScript";

export default function ARPage({ params }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const waitForAFRAME = () => {
            if (window.AFRAME && !AFRAME.components["manipulator"]) {
                AFRAME.registerComponent("manipulator", {
                    init: function () {
                        const self = this;
                        self.isDragging = false;
                        self.previousTouch = null;
                        self.rotateMode = false;

                        const model = self.el;

                        function copyTouches(touches) {
                            return Array.from(touches).map(t => ({
                                clientX: t.clientX,
                                clientY: t.clientY,
                            }));
                        }

                        self.el.sceneEl.addEventListener("markerFound", function () {
                            const canvas = self.el.sceneEl.canvas;
                            const modeButton = document.getElementById("mode-button");
                            const scaleUp = document.getElementById("scale-up-button");
                            const scaleDown = document.getElementById("scale-down-button");

                            modeButton.style.display = "block";
                            document.getElementById("scale-buttons").style.display = "flex";

                            modeButton.onclick = function (e) {
                                e.stopPropagation();
                                self.rotateMode = !self.rotateMode;
                                modeButton.textContent = self.rotateMode
                                    ? "Switch to Move Mode"
                                    : "Switch to Rotate Mode";
                            };

                            scaleUp.onclick = function (e) {
                                e.stopPropagation();
                                const scale = model.getAttribute("scale");
                                scale.x += 0.5;
                                scale.y += 0.5;
                                scale.z += 0.5;
                                model.setAttribute("scale", scale);
                            };

                            scaleDown.onclick = function (e) {
                                e.stopPropagation();
                                const scale = model.getAttribute("scale");
                                if (scale.x > 0.5) {
                                    scale.x -= 0.5;
                                    scale.y -= 0.5;
                                    scale.z -= 0.5;
                                    model.setAttribute("scale", scale);
                                }
                            };

                            canvas.addEventListener("touchstart", function (e) {
                                self.isDragging = true;
                                self.previousTouch = copyTouches(e.touches);
                            });

                            canvas.addEventListener("touchend", function () {
                                self.isDragging = false;
                                self.previousTouch = null;
                            });

                            canvas.addEventListener("touchmove", function (e) {
                                if (!self.isDragging) return;

                                const touches = e.touches;
                                if (touches.length === 1 && self.previousTouch.length === 1) {
                                    const dx = touches[0].clientX - self.previousTouch[0].clientX;
                                    const dy = touches[0].clientY - self.previousTouch[0].clientY;

                                    if (self.rotateMode) {
                                        let rot = model.getAttribute("rotation");
                                        rot.y += dx * 0.5;
                                        rot.x += dy * 0.5;
                                        rot.z += dx * 0.1;
                                        model.setAttribute("rotation", rot);
                                    } else {
                                        let pos = model.getAttribute("position");
                                        pos.x += dx * 0.005;
                                        pos.z += dy * 0.005;
                                        model.setAttribute("position", pos);
                                    }
                                }

                                self.previousTouch = copyTouches(touches);
                            });
                        });

                        self.el.sceneEl.addEventListener("markerLost", function () {
                            document.getElementById("mode-button").style.display = "none";
                            document.getElementById("scale-buttons").style.display = "none";
                        });
                    },
                });

                setReady(true);
            } else if (!window.AFRAME) {
                setTimeout(waitForAFRAME, 100);
            }
        };

        waitForAFRAME();
    }, []);

    return (
        <>
            <InsertScript src="https://aframe.io/releases/1.5.0/aframe.min.js" />
            <InsertScript src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js" />

            {ready && (
                <>
                    <a-scene
                        embedded
                        arjs="sourceType: webcam; debugUIEnabled: false;"
                        style={{ width: "100vw", height: "100vh", margin: 0, overflow: "hidden" }}
                    >
                        <a-assets>
                            <a-asset-item
                                id="digestive-model"
                                src={`http://localhost:2000/v1/source/public/model/${params?.modelID}.glb?key=__global__access__`}
                            ></a-asset-item>
                        </a-assets>

                        <a-entity light="type: ambient; color: #BBB"></a-entity>
                        <a-entity
                            light="type: directional; color: #FFF; intensity: 0.6"
                            position="-0.5 1 1"
                        ></a-entity>

                        <a-marker preset="hiro">
                            <a-entity
                                gltf-model="#digestive-model"
                                scale="0.1 0.1 0.1"
                                position="0 0 0"
                                rotation="-90 0 0"
                                manipulator
                            ></a-entity>
                        </a-marker>

                        <a-entity camera></a-entity>
                    </a-scene>

                    <div
                        id="mode-button"
                        style={{
                            position: "absolute",
                            bottom: 20,
                            left: 20,
                            padding: 12,
                            borderRadius: 8,
                            background: "rgba(0,0,0,0.7)",
                            color: "white",
                            fontSize: 16,
                            fontFamily: "sans-serif",
                            textAlign: "center",
                            cursor: "pointer",
                            zIndex: 10,
                            display: "none",
                        }}
                    >
                        Switch to Rotate Mode
                    </div>

                    <div
                        id="scale-buttons"
                        style={{
                            position: "absolute",
                            bottom: 20,
                            right: 20,
                            zIndex: 10,
                            display: "none",
                            flexDirection: "column",
                        }}
                    >
                        <button
                            id="scale-up-button"
                            style={{
                                padding: 12,
                                borderRadius: 8,
                                background: "rgba(0,0,0,0.7)",
                                color: "white",
                                fontSize: 20,
                                fontFamily: "sans-serif",
                                textAlign: "center",
                                cursor: "pointer",
                                marginTop: 5,
                            }}
                        >
                            +
                        </button>
                        <button
                            id="scale-down-button"
                            style={{
                                padding: 12,
                                borderRadius: 8,
                                background: "rgba(0,0,0,0.7)",
                                color: "white",
                                fontSize: 20,
                                fontFamily: "sans-serif",
                                textAlign: "center",
                                cursor: "pointer",
                                marginTop: 5,
                            }}
                        >
                            -
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
