"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

/**
 * Intro animation ported from the boot sequence of https://333southwabash.com/
 * (reverse-engineered from its WebGL "red-boot" scene):
 *
 *  - 28 text "rows": 7 on the ceiling, 7 on the floor, 7 on the left wall and
 *    7 on the right wall, stacked one behind another to form a static tunnel
 *    seen through a 90deg camera.
 *  - Every row is a plane whose texture window is scrolled horizontally:
 *      u = uv.x * scale + tr
 *    The text strip is clamped, so it slides into the plane, rests, then
 *    slides out again.
 *  - Each row k (0 = nearest, 6 = farthest) starts 250ms * k after the first,
 *    slide-in 2600ms, hold 1250ms, slide-out 2600ms,
 *    all with cubic-bezier(.87, 0, .13, 1).
 *  - When row 5 finishes sliding out (7700ms) the scene is done: the page is
 *    revealed while the solid background fades away over 1200ms
 *    with cubic-bezier(.16, 1, .3, 1). Clicking skips straight to that point.
 */

const BG_HEX = "#E4E4E7";
const BG_RGB: [number, number, number] = [228 / 255, 228 / 255, 231 / 255];
const FG_RGB: [number, number, number] = [17 / 255, 17 / 255, 17 / 255];
const FLOOR_WORD = "SAY";
const WALL_WORD = "HELLO";

const HH = 9; // half height of the tunnel cross-section
const ROWS = 7; // rows per wall
const ROW_DEPTH = (HH * 1.79) / ROWS; // depth of one row => end of tunnel at ~1.79 * HH

const STAGGER = 250; // ms between rows
const SLIDE = 2600; // ms for one slide
const HOLD = 1250; // ms between slide-in and slide-out
const REVEAL_AT = 5 * STAGGER + SLIDE + HOLD + SLIDE; // 7700ms
const FADE_DURATION = 1.2; // s

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 32; i++) {
      const fx = ((ax * t + bx) * t + cx) * t;
      if (fx < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return ((ay * t + by) * t + cy) * t;
  };
}

const easeSlide = cubicBezier(0.87, 0, 0.13, 1);

/** White text on black strip, text fills ~90% width / ~78% height per cell. */
function makeStrip(text: string, aspect: number, cells: number) {
  const height = Math.max(64, Math.min(512, Math.floor(4096 / aspect)));
  const width = Math.round(height * aspect);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);

  const fontSize = 100;
  ctx.font = `900 ${fontSize}px "Arial Black", Inter, system-ui, sans-serif`;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const cap = fontSize * 0.72;
  const cellW = width / cells;
  const sx = (cellW * 0.9) / ctx.measureText(text).width;
  const sy = (height * 0.78) / cap;

  for (let i = 0; i < cells; i++) {
    ctx.save();
    ctx.translate(cellW * (i + 0.5), height / 2);
    ctx.scale(sx, sy);
    ctx.fillText(text, 0, cap / 2);
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  // Clamp: window outside the strip samples the blank edge => nothing drawn
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.anisotropy = 8;
  return tex;
}

const vertexShader = /* glsl */ `
  uniform float tr;
  varying vec2 vUv;
  void main() {
    vUv = vec2(uv.x + tr, uv.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D tex;
  uniform vec3 bg;
  uniform vec3 fg;
  varying vec2 vUv;
  void main() {
    float a = texture2D(tex, vUv).r;
    gl_FragColor = vec4(mix(bg, fg, a), 1.0);
  }
`;

type Row = { group: number; k: number; material: THREE.ShaderMaterial; mesh: THREE.Mesh };

function TunnelScene({
  runningRef,
  startRef,
}: {
  runningRef: React.MutableRefObject<boolean>;
  startRef: React.MutableRefObject<number | null>;
}) {
  const { size } = useThree();
  const aspect = Math.round((size.width / size.height) * 100) / 100;

  const rows = useMemo<Row[]>(() => {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const hw = HH * aspect;
    const c = ROW_DEPTH;

    const floorAspect = (hw * 2) / c;
    const wallAspect = (HH * 2) / c;
    const floorCells = Math.max(1, Math.round(floorAspect / 3.4));
    const floorTex = makeStrip(FLOOR_WORD, floorAspect, floorCells);
    const wallTex = makeStrip(WALL_WORD, wallAspect, 1);

    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    // [local x axis, local y axis, wall centre, width, texture]
    const groups = [
      // ceiling (mirrored upside-down like the reference)
      { x: V(1, 0, 0), y: V(0, 0, 1), n: V(0, -1, 0), pos: V(0, HH, 0), w: hw * 2, tex: floorTex },
      // floor
      { x: V(1, 0, 0), y: V(0, 0, -1), n: V(0, 1, 0), pos: V(0, -HH, 0), w: hw * 2, tex: floorTex },
      // left wall (text reads downward)
      { x: V(0, -1, 0), y: V(0, 0, -1), n: V(1, 0, 0), pos: V(-hw, 0, 0), w: HH * 2, tex: wallTex },
      // right wall (text reads upward)
      { x: V(0, 1, 0), y: V(0, 0, -1), n: V(-1, 0, 0), pos: V(hw, 0, 0), w: HH * 2, tex: wallTex },
    ];

    const out: Row[] = [];
    groups.forEach((g, gi) => {
      for (let k = 0; k < ROWS; k++) {
        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          side: THREE.DoubleSide,
          toneMapped: false,
          uniforms: {
            tex: { value: g.tex },
            tr: { value: 1 },
            bg: { value: new THREE.Vector3(...BG_RGB) },
            fg: { value: new THREE.Vector3(...FG_RGB) },
          },
        });
        const matrix = new THREE.Matrix4().makeBasis(
          g.x.clone().multiplyScalar(g.w),
          g.y.clone().multiplyScalar(c),
          g.n.clone()
        );
        matrix.setPosition(g.pos.x, g.pos.y, -(k + 0.5) * c);
        const mesh = new THREE.Mesh(geometry, material);
        matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
        mesh.frustumCulled = false;
        out.push({ group: gi, k, material, mesh });
      }
    });
    return out;
  }, [aspect]);


  useFrame(() => {
    if (!runningRef.current) {
      rows.forEach((r) => (r.material.uniforms.tr.value = -1));
      return;
    }
    if (startRef.current === null) startRef.current = performance.now();
    const ms = performance.now() - startRef.current;

    rows.forEach((r) => {
      const inStart = STAGGER * r.k;
      const outStart = inStart + SLIDE + HOLD;
      const pIn = easeSlide((ms - inStart) / SLIDE);
      const pOut = easeSlide((ms - outStart) / SLIDE);
      r.material.uniforms.tr.value = 1 - pIn - pOut;
    });
  });

  return (
    <>
      {rows.map((r, i) => (
        <primitive key={`${aspect}-${i}`} object={r.mesh} />
      ))}
    </>
  );
}

export default function WebGLTunnel({
  onReveal,
  onComplete,
}: {
  /** Fired when the animation ends and the overlay starts fading out. */
  onReveal?: () => void;
  /** Fired when the overlay has fully faded and can be unmounted. */
  onComplete: () => void;
}) {
  const [fading, setFading] = useState(false);
  const runningRef = useRef(true);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);
  const revealRef = useRef(onReveal);
  const completeRef = useRef(onComplete);
  revealRef.current = onReveal;
  completeRef.current = onComplete;

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      runningRef.current = false;
      revealRef.current?.();
      setFading(true);
      setTimeout(() => completeRef.current(), FADE_DURATION * 1000);
    };

    let timer: ReturnType<typeof setTimeout> | undefined;
    // Timeline starts when the first frame renders; poll for it.
    const poll = setInterval(() => {
      if (startRef.current !== null) {
        clearInterval(poll);
        const remaining = REVEAL_AT - (performance.now() - startRef.current);
        timer = setTimeout(finish, Math.max(0, remaining));
      }
    }, 16);

    document.addEventListener("click", finish);
    return () => {
      clearInterval(poll);
      if (timer) clearTimeout(timer);
      document.removeEventListener("click", finish);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9995]"
      style={{ background: BG_HEX, pointerEvents: fading ? "none" : "auto" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: FADE_DURATION, ease: [0.16, 1, 0.3, 1] }}
    >
      <Canvas
        flat
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ fov: 90, near: 0.01, far: 100, position: [0, 0, 0] }}
      >
        <color attach="background" args={[BG_HEX]} />
        <TunnelScene runningRef={runningRef} startRef={startRef} />
      </Canvas>
    </motion.div>
  );
}
