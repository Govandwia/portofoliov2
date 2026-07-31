"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// 1. Generate an optimized single-line text texture
function createTextTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 4096;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#111111"; // Background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const fontSize = 400;
  ctx.font = `900 ${fontSize}px "Inter", system-ui, sans-serif`;
  ctx.fillStyle = "#202020"; // Text color (subtle dark mode)
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  // The text that repeats
  const text = " SAY HELLO  ·  CONTACT ME  ·  LET'S TALK  ·  GOVAN DWI  · ";
  
  // Draw it in the center
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 20);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  // Use linear filtering to match the sharp, massive look
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  return texture;
}

// 2. Custom Shader Material for continuous scrolling
const TunnelShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uSpeedX: { value: 0.0 },
    uSpeedY: { value: 0.0 },
    uRepeatX: { value: 1.0 },
    uRepeatY: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uSpeedX;
    uniform float uSpeedY;
    uniform float uRepeatX;
    uniform float uRepeatY;

    varying vec2 vUv;

    void main() {
      // Scale UVs
      vec2 scaledUv = vec2(vUv.x * uRepeatX, vUv.y * uRepeatY);
      
      // Scroll UVs
      scaledUv.x += uTime * uSpeedX;
      scaledUv.y += uTime * uSpeedY;
      
      gl_FragColor = texture2D(uTexture, fract(scaledUv));
    }
  `,
};

// 3. Wall Component
function ShaderWall({
  position,
  rotation,
  args,
  texture,
  repeatX,
  repeatY,
  speedX,
  speedY,
}: any) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={args} />
      <shaderMaterial
        ref={materialRef}
        args={[TunnelShaderMaterial]}
        uniforms-uTexture-value={texture}
        uniforms-uRepeatX-value={repeatX}
        uniforms-uRepeatY-value={repeatY}
        uniforms-uSpeedX-value={speedX}
        uniforms-uSpeedY-value={speedY}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 4. Camera Controller
function CameraController({ duration, onProgress }: { duration: number, onProgress: (t: number) => void }) {
  const { camera } = useThree();
  const startTime = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (startTime.current === null) startTime.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - startTime.current;
    const t = Math.min(elapsed / duration, 1);

    // Smooth ease-out cubic
    const eased = 1 - Math.pow(1 - t, 3);

    // Fly smoothly through the tunnel
    camera.position.z = 50 - eased * 120; // Fly from +50 to -70
    camera.position.x = 0;
    camera.position.y = 0;
    // Look straight ahead
    camera.lookAt(0, 0, camera.position.z - 10);

    onProgress(t);
  });
  return null;
}

// 5. Main Scene
function TunnelScene({ duration, onProgress }: { duration: number, onProgress: (t: number) => void }) {
  const texture = useMemo(() => createTextTexture(), []);

  // Dimensions
  const hw = 16;  // Half width of tunnel (matches ~16:9 ratio)
  const hh = 9;   // Half height of tunnel
  const len = 300; // Tunnel depth

  // Texture repetition to match the massive text look
  const textAspect = 4096 / 512; // 8
  
  // For top/bottom: X axis is width (32), Y axis is depth (300)
  // We want text to stretch full width, and repeat densely in depth
  const tbRepeatX = 1;
  const tbRepeatY = Math.floor(len / (32 / textAspect)); 

  // For left/right: X axis is depth (300), Y axis is height (18)
  // We want text to wrap around the depth, and stack vertically
  const lrRepeatX = tbRepeatY; // Match the depth density
  const lrRepeatY = Math.floor(18 / (32 / textAspect));

  return (
    <>
      <CameraController duration={duration} onProgress={onProgress} />
      
      {/* Top Ceiling */}
      {/* Plane is XY. Rotated X by -90: X is world X, Y is world -Z */}
      <ShaderWall
        position={[0, hh, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[hw * 2, len]}
        texture={texture}
        repeatX={tbRepeatX}
        repeatY={tbRepeatY}
        speedX={-0.3} // Text scrolls left
        speedY={0}
      />
      
      {/* Bottom Floor */}
      {/* Plane is XY. Rotated X by 90: X is world X, Y is world Z */}
      <ShaderWall
        position={[0, -hh, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        args={[hw * 2, len]}
        texture={texture}
        repeatX={tbRepeatX}
        repeatY={tbRepeatY}
        speedX={0.3} // Text scrolls right
        speedY={0}
      />
      
      {/* Left Wall */}
      {/* Plane is XY. Rotated Y by 90: X is world -Z, Y is world Y */}
      <ShaderWall
        position={[-hw, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        args={[len, hh * 2]}
        texture={texture}
        repeatX={lrRepeatX}
        repeatY={lrRepeatY}
        speedX={0}
        speedY={0.3} // Text stacks scroll up
      />
      
      {/* Right Wall */}
      {/* Plane is XY. Rotated Y by -90: X is world Z, Y is world Y */}
      <ShaderWall
        position={[hw, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        args={[len, hh * 2]}
        texture={texture}
        repeatX={lrRepeatX}
        repeatY={lrRepeatY}
        speedX={0}
        speedY={-0.3} // Text stacks scroll down
      />
    </>
  );
}

export default function WebGLTunnel({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  const handleProgress = (t: number) => {
    setProgress(Math.round(t * 100));
    if (t >= 1 && !completedRef.current) {
      completedRef.current = true;
      setTimeout(onComplete, 400); // Wait a bit after 100% before closing
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#111111]">
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ fov: 90, near: 0.1, far: 400 }}
      >
        <TunnelScene duration={3.5} onProgress={handleProgress} />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent">
          <div
            className="h-full bg-white transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Center Text with Left-to-Right Fill Animation */}
        <div className="text-center relative">
          {/* 1. Base Outline Text */}
          <h1 className="text-[#111111] text-6xl md:text-8xl font-black font-heading uppercase tracking-[0.1em] leading-none"
              style={{
                WebkitTextStroke: "2px #333333",
                textShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}>
            SAY<br />HELLO
          </h1>
          
          {/* 2. Filled Text that reveals from left to right */}
          <h1 className="absolute top-0 left-0 w-full text-white text-6xl md:text-8xl font-black font-heading uppercase tracking-[0.1em] leading-none"
              style={{
                clipPath: `inset(0 ${100 - progress}% 0 0)`,
                transition: "clip-path 0.1s ease-out"
              }}>
            SAY<br />HELLO
          </h1>
        </div>

        {/* The loader bar from reference isn't a percentage, but we keep it minimal */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden flex items-center gap-4">
          <span className="text-white/30 text-xs font-mono tracking-widest uppercase">Loading</span>
          <div className="w-24 h-[1px] bg-white/20 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-white transition-[width] duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
