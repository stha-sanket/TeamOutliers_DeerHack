"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { apiSlug } from "@/app/bundles/Hooks/useAppAPI";

export default function ARPage({ params }) {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const modelName = params?.modelName || "default.gltf";

  useEffect(() => {
    if (window.AFRAME && window.ARjs) {
      setScriptsLoaded(true);
    }
  }, []);

  // Register manipulator safely after scripts load
  useEffect(() => {
    if (!scriptsLoaded) return;

    if (!window.AFRAME.components["manipulator"]) {
      window.AFRAME.registerComponent("manipulator", {
        init: function () {
          this.isDragging = false;
          this.previousTouch = null;
          this.rotateMode = false;

          this.el.sceneEl.addEventListener("markerFound", () => {
            console.log("Marker found - show controls");
            const canvas = this.el.sceneEl.canvas;
            const modeButton = document.getElementById("mode-button");
            const scaleUpButton = document.getElementById("scale-up-button");
            const scaleDownButton = document.getElementById("scale-down-button");
            const model = this.el;

            modeButton.style.display = "block";
            document.getElementById("scale-buttons").style.display = "flex";

            modeButton.onclick = (e) => {
              e.stopPropagation();
              this.rotateMode = !this.rotateMode;
              modeButton.textContent = this.rotateMode
                ? "Switch to Move Mode"
                : "Switch to Rotate Mode";
            };

            scaleUpButton.onclick = (e) => {
              e.stopPropagation();
              let scale = model.getAttribute("scale");
              scale.x += 0.5;
              scale.y += 0.5;
              scale.z += 0.5;
              model.setAttribute("scale", scale);
            };

            scaleDownButton.onclick = (e) => {
              e.stopPropagation();
              let scale = model.getAttribute("scale");
              if (scale.x > 0.5) {
                scale.x -= 0.5;
                scale.y -= 0.5;
                scale.z -= 0.5;
                model.setAttribute("scale", scale);
              }
            };

            canvas.addEventListener("touchstart", (e) => {
              this.isDragging = true;
              this.previousTouch = Array.from(e.touches).map((t) => ({
                clientX: t.clientX,
                clientY: t.clientY,
              }));
            });

            canvas.addEventListener("touchend", () => {
              this.isDragging = false;
              this.previousTouch = null;
            });

            canvas.addEventListener("touchmove", (e) => {
              if (!this.isDragging) return;

              const touches = e.touches;
              const robot = this.el;

              if (touches.length === 1 && this.previousTouch.length === 1) {
                const dx = touches[0].clientX - this.previousTouch[0].clientX;
                const dy = touches[0].clientY - this.previousTouch[0].clientY;

                if (this.rotateMode) {
                  let rotation = robot.getAttribute("rotation");
                  rotation.y += dx * 0.5;
                  rotation.x += dy * 0.5;
                  rotation.z += dx * 0.1;
                  robot.setAttribute("rotation", rotation);
                } else {
                  let position = robot.getAttribute("position");
                  position.x += dx * 0.005;
                  position.z += dy * 0.005;
                  robot.setAttribute("position", position);
                }
              }

              this.previousTouch = Array.from(touches).map((t) => ({
                clientX: t.clientX,
                clientY: t.clientY,
              }));
            });
          });

          this.el.sceneEl.addEventListener("markerLost", () => {
            console.log("Marker lost - hide controls");
            document.getElementById("mode-button").style.display = "none";
            document.getElementById("scale-buttons").style.display = "none";
          });
        },
      });
    }
  }, [scriptsLoaded]);

  return (
    <>
      <Script
        src="https://aframe.io/releases/1.5.0/aframe.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("A-Frame loaded");
          if (window.AFRAME && window.ARjs) setScriptsLoaded(true);
        }}
      />
      <Script
        src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("AR.js loaded");
          if (window.AFRAME && window.ARjs) setScriptsLoaded(true);
        }}
      />

      <div
        id="mode-button"
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          padding: 12,
          borderRadius: 8,
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          fontSize: 16,
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
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            fontSize: 20,
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
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            fontSize: 20,
            textAlign: "center",
            cursor: "pointer",
            marginTop: 5,
          }}
        >
          -
        </button>
      </div>

      {scriptsLoaded && (
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
          vr-mode-ui="enabled: false"
          style={{ width: "100vw", height: "100vh" }}
        >
          <a-assets>
            <a-asset-item id="ar-model" src={`${apiSlug}/v1/source/public/model/${params?.modelID}?key=asdfasdf`}></a-asset-item>
          </a-assets>

          <a-entity light="type: ambient; color: #BBB"></a-entity>
          <a-entity light="type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1"></a-entity>

          <a-marker preset="hiro">
            <a-entity
              gltf-model="#ar-model"
              scale="1 1 1"
              position="0 0.5 0"
              rotation="-90 0 0"
              manipulator
            ></a-entity>
          </a-marker>

          <a-entity camera></a-entity>
        </a-scene>
      )}
    </>
  );
}
