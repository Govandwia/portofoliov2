"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Typographic 3D folding wall hero ported directly from https://333southwabash.com/the-red
 * (reverse-engineered from the site's WebGL "red-0" scene):
 *
 *  - 82 text planes forming an isometric origami folded surface of typography.
 *  - Vertically centered on the viewport.
 *  - Generous scroll buffer track (250vh) so the user can scrub through the folding animation.
 *  - Continuous idle rotation + scroll-linked folding/turning.
 *  - Seamless loop where rotation repeats every 90deg modulo.
 */

const WORD = "PROJECTS";
const BG_HEX = "#F4F4F6";
const BG: [number, number, number] = [244 / 255, 244 / 255, 246 / 255];
const FG: [number, number, number] = [17 / 255, 17 / 255, 17 / 255];
const TEX_ASPECT = 1168 / 163; // ~7.1656
const PLANE_COUNT = 82;
const D90 = Math.PI / 2;

const T = (x: number, y: number, z = 0) => new THREE.Matrix4().makeTranslation(x, y, z);
const S = (x: number, y: number, z = 1) => new THREE.Matrix4().makeScale(x, y, z);

function makeWordTexture() {
  const w = 4096;
  const h = Math.round(w / TEX_ASPECT);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  const fontSize = 100;
  ctx.font = `900 ${fontSize}px "Arial Black", Impact, Inter, system-ui, sans-serif`;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const cap = fontSize * 0.72;
  const sx = (w * 0.985) / ctx.measureText(WORD).width;
  const sy = (h * 0.76) / cap;
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(sx, sy);
  ctx.fillText(WORD, 0, cap / 2);
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
  uniform mat4 uM;
  uniform vec2 uRes;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 p = uM * vec4(position, 1.0);
    gl_Position = vec4(
      (p.x / uRes.x) * 2.0 - 1.0,
      (p.y / uRes.y) * 2.0 - 1.0,
      clamp(-p.z / 20000.0, -0.99, 0.99),
      1.0
    );
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D tex;
  uniform float txt;
  uniform vec3 bg;
  uniform vec3 fg;
  varying vec2 vUv;
  void main() {
    float a = txt > 0.5 ? texture2D(tex, vUv).r : 0.0;
    gl_FragColor = vec4(mix(bg, fg, a), 1.0);
  }
`;

type PlaneData = {
  x: number;
  y: number;
  w: number;
  h: number;
  tO: [number, number];
  r: [number, number, number];
  t: [number, number];
  txt: number;
};

function buildPlanes(W: number, H: number, e: number) {
  const i = W;
  const h = i + e;
  const o = W > H ? 1 : 1.7;
  const rx = -e;
  // Center the 3D origami structure so "PROJECTS" is at eye-level hero height,
  // with the floor planes cascading down to the bottom without being cut off.
  const ry = W > H ? Math.round(H * 0.28) : Math.round(H * 0.34);
  const a = D90;

  const planes: PlaneData[] = [];
  for (let t = 0; t < PLANE_COUNT; t++) {
    const d: PlaneData = {
      x: 0, y: 0, w: i, h: e, tO: [0, 0], r: [0, 0, 0], t: [0, 0], txt: 1,
    };
    if (t === 0) {
      Object.assign(d, { x: rx + e, y: ry, txt: 1 });
    } else if (t <= 9) {
      // Floor planes under the main middle text - keep txt: 1 as in reference example
      Object.assign(d, { x: rx + e, y: ry + e, tO: [0, ry + e], r: [a, 0, 0], t: [0, -e * (t - 1)], txt: 1 });
    } else if (t === 10) {
      Object.assign(d, { x: rx + e + h, y: ry, txt: 1 });
    } else if (t <= 19) {
      Object.assign(d, { x: rx + e + h, y: ry + e, tO: [0, ry + e], r: [a, 0, 0], t: [0, -e * (t - 11)], txt: 1 });
    } else if (t === 20) {
      Object.assign(d, { x: rx, y: ry, tO: [-e, ry + e], r: [0, 0, -a], txt: 1 });
    } else if (t <= 29) {
      Object.assign(d, {
        x: rx, y: ry, tO: [-e, ry + e], r: [a, 0, -a], t: [0, -e * (t - 20)], txt: t === 21 ? 1 : 0,
      });
    } else if (t === 30) {
      Object.assign(d, { x: rx + h, y: ry, tO: [-e + h, ry + e], r: [0, 0, -a], txt: 1 });
    } else if (t <= 39) {
      Object.assign(d, { x: rx + h, y: ry, tO: [-e + h, ry + e], r: [a, 0, -a], t: [0, -e * (t - 30)], txt: 1 });
    } else if (t === 40) {
      Object.assign(d, { x: rx + h, y: ry, tO: [-e + h, ry + e], r: [0, 0, -a], t: [-h, 0], txt: 1 });
    } else if (t <= 49) {
      Object.assign(d, { x: rx + h, y: ry, tO: [-e + h, ry + e], r: [a, 0, -a], t: [-h, -e * (t - 40)], txt: 1 });
    } else if (t === 50) {
      Object.assign(d, { x: rx + 2 * h, y: ry, tO: [2 * h - e, ry + e], r: [0, 0, -a], txt: 1 });
    } else if (t <= 59) {
      Object.assign(d, { x: rx + 2 * h, y: ry, tO: [2 * h - e, ry + e], r: [a, 0, -a], t: [0, -e * (t - 50)], txt: 1 });
    } else if (t === 60) {
      Object.assign(d, { x: rx + 2 * h, y: ry, tO: [2 * h - e, ry + e], r: [0, 0, -a], t: [-h, 0], txt: 1 });
    } else if (t <= 69) {
      Object.assign(d, { x: rx + 2 * h, y: ry, tO: [2 * h - e, ry + e], r: [a, 0, -a], t: [-h, -e * (t - 60)], txt: 1 });
    } else if (t === 70) {
      Object.assign(d, { x: rx, y: ry, tO: [-e, ry + e], r: [0, 0, -a], t: [i, 0], txt: 0 });
    } else if (t <= 79) {
      Object.assign(d, { x: rx, y: ry, tO: [-e, ry + e], r: [a, 0, -a], t: [i, -e * (t - 70)], txt: 0 });
    } else if (t === 80) {
      Object.assign(d, { x: rx + h, y: ry, w: e, txt: 0 });
    } else {
      Object.assign(d, { x: rx, y: ry, w: e, txt: 0 });
    }
    planes.push(d);
  }

  // Static per-plane matrices
  const matrices = planes.map((d) => {
    const m = new THREE.Matrix4();
    if (d.tO[0] || d.tO[1]) m.multiply(T(d.tO[0], -d.tO[1]));
    if (d.r[2]) m.multiply(new THREE.Matrix4().makeRotationZ(d.r[2]));
    if (d.r[1]) m.multiply(new THREE.Matrix4().makeRotationY(d.r[1]));
    if (d.r[0]) m.multiply(new THREE.Matrix4().makeRotationX(d.r[0]));
    if (d.t[0] || d.t[1]) m.multiply(T(d.t[0], d.t[1]));
    if (d.tO[0] || d.tO[1]) m.multiply(T(-d.tO[0], d.tO[1]));
    m.multiply(T(d.x, -d.y));
    m.multiply(S(d.w, d.h));
    return m;
  });

  // Camera pre/post matrices
  const pre = new THREE.Matrix4()
    .multiply(T(0, -ry))
    .multiply(S(o, o, o))
    .multiply(T(0, ry))
    .multiply(T(rx, -ry));
  const post = T(-rx, ry);

  return { planes, matrices, pre, post };
}

function Wall({ scrollProgressRef }: { scrollProgressRef: React.MutableRefObject<number> }) {
  const { size } = useThree();
  const W = size.width;
  const H = size.height;

  const texture = useMemo(() => makeWordTexture(), []);
  const resUniform = useRef(new THREE.Vector2(W, H));
  const state = useRef({ factor: 0, smooth: 0 });
  const camM = useMemo(() => new THREE.Matrix4(), []);
  const fullCamM = useMemo(() => new THREE.Matrix4(), []);
  const viewM4 = useMemo(() => new THREE.Matrix4().makeTranslation(0, H, -H), [H]);
  const tmp = useMemo(() => new THREE.Matrix4(), []);

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
    const e = (W * 1) / TEX_ASPECT; // plane height = width * (h / w)
    return buildPlanes(W, H, e);
  }, [W, H]);

  const meshes = useMemo(() => {
    return layout.planes.map((d) => {
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        depthTest: true,
        toneMapped: false,
        uniforms: {
          uM: { value: new THREE.Matrix4() },
          uRes: { value: resUniform.current },
          tex: { value: texture },
          txt: { value: d.txt },
          bg: { value: new THREE.Vector3(...BG) },
          fg: { value: new THREE.Vector3(...FG) },
        },
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      return mesh;
    });
  }, [layout, geometry, texture]);

  useEffect(() => {
    resUniform.current.set(W, H);
  }, [W, H]);

  useFrame((_, delta) => {
    const k = Math.min(delta * 60, 4);
    const s = state.current;
    // Map the 0..1 buffer scroll progress smoothly to rotation folds.
    // Completing 1.0 (90 deg modulo) lands squarely on the unskewed front face at 100% scroll.
    const target = scrollProgressRef.current * 1.0;
    s.smooth += (target - s.smooth) * Math.min(1, 0.14 * k);

    // Gently taper idle rotation near the end of the scroll buffer for an exact square arrival
    const idleTaper = 1 - Math.min(1, Math.max(0, (scrollProgressRef.current - 0.7) / 0.3));
    s.factor += 2.5e-4 * idleTaper * k;

    const e = (((s.smooth + s.factor) % 1) + 1) % 1;
    const hAng = D90 * e;

    camM.copy(layout.pre);
    camM.multiply(tmp.makeRotationY(hAng));
    camM.multiply(tmp.makeRotationX(-hAng));
    camM.multiply(layout.post);

    fullCamM.multiplyMatrices(viewM4, camM);

    for (let i = 0; i < meshes.length; i++) {
      const m = (meshes[i].material as THREE.ShaderMaterial).uniforms.uM.value as THREE.Matrix4;
      m.multiplyMatrices(fullCamM, layout.matrices[i]);
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

export default function TypeWallHero() {
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

  // Fade out bottom bar near the end of the scroll buffer (88% - 98%) so it doesn't overlap the incoming section
  const barOpacity = Math.max(0, Math.min(1, 1 - (scrollPercent - 88) / 10));

  return (
    <div
      ref={trackRef}
      id="project-hero"
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
          <Wall scrollProgressRef={scrollProgressRef} />
        </Canvas>

        {/* Caption bar with scroll indicator (fades smoothly before the project list enters) */}
        <div
          className="absolute left-0 bottom-0 w-full px-6 md:px-12 pb-6 flex justify-between items-center pointer-events-none text-zinc-950 font-bold uppercase text-xs md:text-sm tracking-widest z-10 transition-opacity duration-150"
          style={{ opacity: barOpacity }}
        >
          {/* Scroll Buffer Meter / Loading Bar (The Red pill removed as requested) */}
          <div className="flex items-center gap-2.5 bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-full border border-zinc-300 shadow-sm text-[11px] font-mono text-zinc-600">
            <div className="w-16 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-950 transition-all duration-75"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>
            <span className="w-8 text-right font-bold text-zinc-900">{scrollPercent}%</span>
          </div>

          <button
            type="button"
            onClick={() => {
              document.getElementById("project-list")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-mono text-xs font-semibold text-zinc-700 hover:text-black bg-white/85 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-300 hover:border-black pointer-events-auto transition-all cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <span>Skip to List</span>
            <span>↓</span>
          </button>
        </div>
      </div>
    </div>
  );
}
