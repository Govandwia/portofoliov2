"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 3D Isometric Typographic Box / Room Hero
 * Faithfully reverse-engineered from https://333southwabash.com/architecture (WebGL 'red-1' scene):
 *
 *  - 4-sided 3D typographic architectural corridor / room (72 planes across 18 staggered lines).
 *  - Left-handed axonometric orthographic projection (-30° Z, 38° Y, -43° X).
 *  - Continuous idle typographic sliding + interactive scroll scrubbing.
 *  - Monochromatic dark obsidian aesthetic matching the portfolio's Experience design system.
 */

const WORD_LONG = "EXPERIENCE &";
const WORD_SHORT = "IMPACT";

const BG_HEX = "#09090b"; // Deep obsidian zinc
const BG: [number, number, number] = [9 / 255, 9 / 255, 11 / 255];
const FG: [number, number, number] = [255 / 255, 255 / 255, 255 / 255]; // Pure crisp white

const S0 = 1214;
const S1 = 596;
const IM_W = 1810;
const IM_H = 163;
const IM_HW = IM_H / IM_W;

const SCALE_0 = S0 / IM_W; // ~0.6707
const SCALE_1 = S1 / IM_W; // ~0.3293
const TR_BOLD = SCALE_0;

const LINE_COUNT = 18;
const PLANE_COUNT = 4 * LINE_COUNT; // 72
const LINE_MAX = LINE_COUNT - 1;
const DEG_TO_RAD = Math.PI / 180;

const T = (x: number, y: number, z = 0) => new THREE.Matrix4().makeTranslation(x, y, z);
const S = (x: number, y: number, z = 1) => new THREE.Matrix4().makeScale(x, y, z);
const Rx = (rad: number) => new THREE.Matrix4().makeRotationX(rad);
const Ry = (rad: number) => new THREE.Matrix4().makeRotationY(rad);
const Rz = (rad: number) => new THREE.Matrix4().makeRotationZ(rad);

// Generate dual-word typographic texture matching reference 1810x163 aspect ratio
function makeArchitectureTexture() {
  const w = 4096;
  const h = Math.round((w * IM_H) / IM_W);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, w, h);

  const fontSize = 110;
  ctx.font = `900 ${fontSize}px "Arial Black", Impact, Inter, system-ui, sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";

  const part0Width = w * SCALE_0;
  const part1Width = w * SCALE_1;

  // Draw long word "EXPERIENCE &" in Part 0
  ctx.save();
  ctx.translate(part0Width / 2, h / 2);
  const mLong = ctx.measureText(WORD_LONG).width;
  const sxLong = (part0Width * 0.94) / mLong;
  const syLong = (h * 0.8) / (fontSize * 0.75);
  ctx.scale(sxLong, syLong);
  ctx.textAlign = "center";
  ctx.fillText(WORD_LONG, 0, 0);
  ctx.restore();

  // Draw short word "IMPACT" in Part 1
  ctx.save();
  ctx.translate(part0Width + part1Width / 2, h / 2);
  const mShort = ctx.measureText(WORD_SHORT).width;
  const sxShort = (part1Width * 0.92) / mShort;
  const syShort = (h * 0.8) / (fontSize * 0.75);
  ctx.scale(sxShort, syShort);
  ctx.textAlign = "center";
  ctx.fillText(WORD_SHORT, 0, 0);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 16;
  tex.generateMipmaps = true;
  return tex;
}

const vertexShader = /* glsl */ `
  uniform mat4 pM4;
  uniform mat4 viewM4;
  uniform mat4 mM4;
  uniform float uScale;
  uniform float uTr;
  varying vec2 vD;

  void main() {
    vec4 p = viewM4 * mM4 * vec4(position, 1.0);
    gl_Position = pM4 * p;
    vD = vec2(uv.x * uScale + uTr, uv.y);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D tex;
  uniform int txt;
  uniform vec3 bg;
  uniform vec3 fg;
  varying vec2 vD;

  void main() {
    float a = 0.0;
    if (txt == 1) {
      // Disappear outside [0.0, 1.0] texture space (no continuous fract loop)
      if (vD.x >= 0.0 && vD.x <= 1.0 && vD.y >= 0.0 && vD.y <= 1.0) {
        a = texture2D(tex, vD).r;
      }
    }
    gl_FragColor = vec4(mix(bg, fg, a), 1.0);
  }
`;

type PlaneData = {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  tO: [number, number];
  r: [number, number, number];
  t: [number, number];
  txt: number;
  trS: number;
  trE: number;
  m4: THREE.Matrix4;
};

function buildArchitecturePlanes(W: number, H: number) {
  const isLandscape = W >= H;
  const n = (isLandscape ? 0.97 : 1.45) * W;
  const r = ((n * IM_W) / S0) * IM_HW;
  const a = (r * S1) / IM_H;
  const l = 0.082 * r;

  const hRot = Math.PI / 2;
  const oRot = 2 * hRot;

  const planes: PlaneData[] = [];

  for (let tIdx = 0; tIdx < PLANE_COUNT; tIdx++) {
    const s = Math.floor(tIdx / 4);
    const isHeader = s === 0;
    const e = tIdx % 4;
    const c: Partial<PlaneData> = {
      y: isHeader ? 0 : r * (s - 1) + l,
      h: isHeader ? l : r,
      txt: isHeader ? 0 : 1,
    };

    if (e === 0) {
      c.x = n - a;
      c.z = 0;
      c.w = a;
      c.tO = [n, 0];
      c.r = [0, -hRot, 0];
      c.t = [a, 0];
    } else if (e === 1) {
      c.x = -n;
      c.z = -a;
      c.w = n;
      c.tO = [0, 0];
      c.r = [0, oRot, 0];
      c.t = [0, 0];
    } else if (e === 2) {
      c.x = n - 2 * a;
      c.z = -n;
      c.w = a;
      c.tO = [n, 0];
      c.r = [0, hRot, 0];
      c.t = [a, 0];
    } else if (e === 3) {
      c.x = 0;
      c.z = 0;
      c.w = n;
      c.tO = [0, 0];
      c.r = [0, 0, 0];
      c.t = [0, 0];
    }

    const p = new THREE.Matrix4();
    if (c.tO![0] || c.tO![1]) p.multiply(T(c.tO![0], -c.tO![1], 0));
    if (c.r![2]) p.multiply(Rz(c.r![2]));
    if (c.r![1]) p.multiply(Ry(c.r![1]));
    if (c.r![0]) p.multiply(Rx(c.r![0]));
    if (c.t![0] || c.t![1]) p.multiply(T(c.t![0], c.t![1], 0));
    if (c.tO![0] || c.tO![1]) p.multiply(T(-c.tO![0], c.tO![1], 0));
    p.multiply(T(c.x!, -c.y!, c.z!));
    p.multiply(S(c.w!, c.h!, 1));

    c.m4 = p;
    if (isHeader) {
      c.trS = 0;
      c.trE = 0;
    } else {
      c.trS = 0.03 * (s - 1);
      c.trE = 1 - 0.03 * (LINE_MAX - s);
    }

    planes.push(c as PlaneData);
  }

  return { planes, n, r, a, l };
}

function makeOrthLH(W: number, H: number, near = -10000, far = 10000) {
  const a = 1 / W;
  const l = 1 / H;
  const c = 1 / (far - near);
  const m = new THREE.Matrix4();
  m.set(
    2 * a, 0, 0, -1,
    0, 2 * l, 0, -1,
    0, 0, c, -near * c,
    0, 0, 0, 1
  );
  return m;
}

function io2(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function mapLinear(inMin: number, inMax: number, outMin: number, outMax: number, val: number) {
  if (inMax === inMin) return outMin;
  const t = clamp((val - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

function ArchitectureRoom({
  scrollProgressRef,
}: {
  scrollProgressRef: React.MutableRefObject<number>;
}) {
  const { size } = useThree();
  const W = size.width;
  const H = size.height;

  const texture = useMemo(() => makeArchitectureTexture(), []);

  const state = useRef({
    factor: 0,
    smoothScroll: 0,
  });

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([
          0, -1, 0,
          1, -1, 0,
          0, 0, 0,
          1, 0, 0,
        ]),
        3
      )
    );
    g.setAttribute(
      "uv",
      new THREE.BufferAttribute(
        new Float32Array([
          0, 0,
          1, 0,
          0, 1,
          1, 1,
        ]),
        2
      )
    );
    g.setIndex([0, 1, 2, 2, 1, 3]);
    return g;
  }, []);

  const layout = useMemo(() => {
    return buildArchitecturePlanes(W, H);
  }, [W, H]);

  const pM4 = useMemo(() => makeOrthLH(W, H), [W, H]);

  const viewM4 = useMemo(() => {
    const m = new THREE.Matrix4();
    m.multiply(new THREE.Matrix4().makeTranslation(0, H, -H));
    m.multiply(new THREE.Matrix4().makeRotationZ(-30 * DEG_TO_RAD));
    m.multiply(new THREE.Matrix4().makeRotationY(38 * DEG_TO_RAD));
    m.multiply(new THREE.Matrix4().makeRotationX(-43 * DEG_TO_RAD));
    return m;
  }, [H]);

  const dynamicViewM4 = useMemo(() => new THREE.Matrix4(), []);

  const meshes = useMemo(() => {
    return layout.planes.map((p, i) => {
      const isLongWall = i % 2 === 1;
      const initialScale = isLongWall ? SCALE_0 : SCALE_1;
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        depthTest: true,
        toneMapped: false,
        uniforms: {
          pM4: { value: pM4 },
          viewM4: { value: dynamicViewM4 },
          mM4: { value: p.m4 },
          uScale: { value: initialScale },
          uTr: { value: 0 },
          tex: { value: texture },
          txt: { value: p.txt },
          bg: { value: new THREE.Vector3(...BG) },
          fg: { value: new THREE.Vector3(...FG) },
        },
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      return mesh;
    });
  }, [layout, geometry, pM4, dynamicViewM4, texture]);

  useFrame((_, delta) => {
    const k = Math.min(delta * 60, 4);
    const s = state.current;

    // Smooth scroll interpolation
    const target = scrollProgressRef.current;
    s.smoothScroll += (target - s.smoothScroll) * Math.min(1, 0.12 * k);

    // Continuous idle motion
    s.factor += 2.5e-4 * k;

    // Combined loop factor
    const e = (((0.45 * s.smoothScroll + s.factor) % 1) + 1) % 1;

    // Subtle scroll-driven Y parallax in view space
    const scrollOffsetY = s.smoothScroll * (H * 0.45);
    dynamicViewM4.copy(viewM4);
    dynamicViewM4.multiply(new THREE.Matrix4().makeTranslation(0, scrollOffsetY, 0));

    // Update uniforms for all 72 planes
    for (let hIdx = 0; hIdx < layout.planes.length; hIdx++) {
      const plane = layout.planes[hIdx];
      const mat = meshes[hIdx].material as THREE.ShaderMaterial;

      const normProgress = io2(mapLinear(plane.trS, plane.trE, 0, 1, e));
      let lVal = normProgress < 0.5
        ? mapLinear(0, 0.38, 0, -1.2, normProgress)
        : mapLinear(0.62, 1, 1.2, 0, normProgress);

      if (hIdx % 2 === 0) {
        lVal += TR_BOLD;
      }

      mat.uniforms.uTr.value = lVal;
      mat.uniforms.uScale.value = hIdx % 2 === 1 ? SCALE_0 : SCALE_1;
    }
  });

  return (
    <>
      {meshes.map((m, i) => (
        <primitive key={`${W}x${H}-${i}`} object={m} />
      ))}
    </>
  );
}

export default function ExperienceArchitectureHero() {
  const scrollProgressRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const maxScroll = track.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) {
        scrollProgressRef.current = 0;
        setScrollPercent(0);
        return;
      }
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
      scrollProgressRef.current = progress;
      setScrollPercent(Math.round(progress * 100));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fade out bottom overlay smoothly before entering the timeline section
  const barOpacity = Math.max(0, Math.min(1, 1 - (scrollPercent - 88) / 10));

  return (
    <div
      ref={trackRef}
      id="experience-hero"
      className="relative w-full h-[220vh] select-none"
      style={{ background: BG_HEX }}
    >
      {/* Sticky Fullscreen Viewport Window */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <Canvas
          flat
          frameloop={visible ? "always" : "never"}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 10] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <color attach="background" args={[BG_HEX]} />
          <ArchitectureRoom scrollProgressRef={scrollProgressRef} />
        </Canvas>

        {/* Ambient Corner Branding / Accent */}
        <div className="absolute top-28 md:top-32 left-6 md:left-12 pointer-events-none z-10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-zinc-400 uppercase">
            3D ARCHITECTURAL ROOM // EXPERIENCE
          </span>
        </div>

        {/* Caption bar with scroll indicator & skip button */}
        <div
          className="absolute left-0 bottom-0 w-full px-6 md:px-12 pb-6 flex justify-between items-center pointer-events-none text-white font-bold uppercase text-xs md:text-sm tracking-widest z-10 transition-opacity duration-150"
          style={{ opacity: barOpacity }}
        >
          {/* Scroll Buffer Meter / Loading Bar */}
          <div className="flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-700/80 shadow-lg text-[11px] font-mono text-zinc-300">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">LOADING</span>
            <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>
            <span className="w-8 text-right font-bold text-white">{scrollPercent}%</span>
          </div>

          <button
            type="button"
            onClick={() => {
              document.getElementById("experience-timeline")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-mono text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-700/80 hover:border-white pointer-events-auto transition-all cursor-pointer flex items-center gap-2 shadow-lg"
          >
            <span>Explore Timeline</span>
            <span>↓</span>
          </button>
        </div>
      </div>
    </div>
  );
}
