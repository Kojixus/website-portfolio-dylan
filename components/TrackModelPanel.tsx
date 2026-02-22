"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const outerTrackPoints: [number, number][] = [
  [20, 170],
  [32, 204],
  [272, 204],
  [318, 156],
  [302, 130],
  [282, 122],
  [272, 92],
  [268, 62],
  [246, 42],
  [198, 36],
  [182, 20],
  [106, 20],
  [80, 34],
  [62, 58],
  [36, 72],
  [28, 104],
  [38, 126],
  [58, 136],
  [66, 152],
];

const innerTrackPoints: [number, number][] = [
  [52, 162],
  [60, 178],
  [254, 178],
  [286, 144],
  [272, 122],
  [252, 116],
  [244, 90],
  [238, 72],
  [222, 60],
  [184, 58],
  [164, 48],
  [118, 50],
  [98, 64],
  [90, 82],
  [66, 98],
  [60, 118],
  [74, 130],
  [88, 140],
];

const TRACK_SCALE = 0.65;
const TRACK_DEPTH = 16;

function normalizePoints(points: [number, number][]) {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
  const centerY = (Math.min(...ys) + Math.max(...ys)) / 2;

  return points.map(
    ([x, y]) =>
      new THREE.Vector2((x - centerX) * TRACK_SCALE, (y - centerY) * TRACK_SCALE)
  );
}

export default function TrackModelPanel() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(0, 116, 210);
    camera.lookAt(0, 4, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "track3d-canvas";
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.88));

    const keyLight = new THREE.DirectionalLight(0x9fd8ff, 1.18);
    keyLight.position.set(110, 180, 92);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf0d9a5, 0.65);
    fillLight.position.set(-150, 100, -80);
    scene.add(fillLight);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(132, 154, 14, 56, 1, false),
      new THREE.MeshStandardMaterial({
        color: "#091323",
        roughness: 0.58,
        metalness: 0.45,
      })
    );
    base.position.y = -16;
    scene.add(base);

    const outer = normalizePoints(outerTrackPoints);
    const inner = normalizePoints(innerTrackPoints);
    if (!THREE.ShapeUtils.isClockWise(outer)) {
      outer.reverse();
    }
    if (THREE.ShapeUtils.isClockWise(inner)) {
      inner.reverse();
    }

    const trackShape = new THREE.Shape(outer);
    trackShape.holes.push(new THREE.Path(inner));

    const trackGeometry = new THREE.ExtrudeGeometry(trackShape, {
      depth: TRACK_DEPTH,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1.6,
      bevelOffset: 0,
      bevelSegments: 3,
      curveSegments: 28,
    });

    const trackBody = new THREE.Mesh(
      trackGeometry,
      new THREE.MeshStandardMaterial({
        color: "#d8dfe8",
        roughness: 0.3,
        metalness: 0.52,
      })
    );
    trackBody.rotation.x = -Math.PI / 2;

    const accentMaterial = new THREE.LineBasicMaterial({
      color: "#ff3d3d",
      linewidth: 1.6,
    });

    const outerLoop = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        outer.map((point) => new THREE.Vector3(point.x, point.y, TRACK_DEPTH + 1.9))
      ),
      accentMaterial
    );
    outerLoop.rotation.x = -Math.PI / 2;

    const innerLoop = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        inner.map((point) => new THREE.Vector3(point.x, point.y, TRACK_DEPTH + 1.9))
      ),
      accentMaterial
    );
    innerLoop.rotation.x = -Math.PI / 2;

    const trackGroup = new THREE.Group();
    trackGroup.add(trackBody);
    trackGroup.add(outerLoop);
    trackGroup.add(innerLoop);
    trackGroup.rotation.x = 0.42;
    trackGroup.rotation.y = -0.72;
    scene.add(trackGroup);

    let pointerX = 0;
    let pointerY = 0;
    let frameId = 0;
    let autoSpin = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);
    resize();

    const render = () => {
      frameId = window.requestAnimationFrame(render);
      if (!reducedMotion) {
        autoSpin += 0.0014;
      }
      const targetY = -0.72 + autoSpin + pointerX * 0.14;
      const targetX = 0.42 + pointerY * 0.05;
      trackGroup.rotation.y += (targetY - trackGroup.rotation.y) * 0.07;
      trackGroup.rotation.x += (targetX - trackGroup.rotation.x) * 0.07;
      renderer.render(scene, camera);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);

      trackGeometry.dispose();
      accentMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return (
    <div className="w-full rounded-[1.35rem] border border-sky-200/20 bg-gradient-to-b from-[#07111f] to-[#060d17] p-2 shadow-2xl">
      <div
        ref={mountRef}
        className="track3d-stage relative h-[250px] overflow-hidden rounded-[1.05rem] sm:h-[360px] lg:h-[460px]"
      >
        <div className="track3d-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="track3d-halo pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="pointer-events-none absolute left-5 right-5 top-4 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-200/85">
          <p>Sebring Track Model // 3D</p>
          <p className="gold-accent">Reference Build</p>
        </div>
      </div>
    </div>
  );
}
