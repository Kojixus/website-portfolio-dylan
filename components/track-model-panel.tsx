"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** A stylised circuit loop, not a survey of any real track. */
const TRACK_POINTS: [number, number, number][] = [
  [0.0, 0, -3.2],
  [2.4, 0, -2.6],
  [3.4, 0, -0.6],
  [2.6, 0, 1.2],
  [3.2, 0, 2.8],
  [1.4, 0, 3.4],
  [-0.6, 0, 2.6],
  [-1.2, 0, 1.0],
  [-2.8, 0, 0.8],
  [-3.4, 0, -0.8],
  [-2.2, 0, -2.6],
];

const SKY = 0x5abaff;
const GOLD = 0xf3deb0;

export default function TrackModelPanel() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const speedRef = useRef<HTMLParagraphElement | null>(null);
  const loadRef = useRef<HTMLParagraphElement | null>(null);
  const lapRef = useRef<HTMLParagraphElement | null>(null);
  const fallbackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      if (fallbackRef.current) fallbackRef.current.hidden = false;
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    renderer.domElement.classList.add("track3d-canvas");
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      46,
      mount.clientWidth / Math.max(mount.clientHeight, 1),
      0.1,
      100,
    );

    const curve = new THREE.CatmullRomCurve3(
      TRACK_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      true,
      "catmullrom",
      0.5,
    );

    // Track surface plus a soft halo underneath it.
    const ribbonGeo = new THREE.TubeGeometry(curve, 420, 0.085, 8, true);
    const ribbonMat = new THREE.MeshBasicMaterial({ color: SKY });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);

    const haloGeo = new THREE.TubeGeometry(curve, 220, 0.22, 8, true);
    const haloMat = new THREE.MeshBasicMaterial({
      color: SKY,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);

    const carGeo = new THREE.SphereGeometry(0.13, 20, 20);
    const carMat = new THREE.MeshBasicMaterial({ color: GOLD });
    const car = new THREE.Mesh(carGeo, carMat);

    const carGlowGeo = new THREE.SphereGeometry(0.3, 20, 20);
    const carGlowMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const carGlow = new THREE.Mesh(carGlowGeo, carGlowMat);

    const grid = new THREE.GridHelper(16, 16, 0x1d3a5c, 0x142942);
    grid.position.y = -0.45;
    const gridMat = grid.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.4;

    scene.add(grid, halo, ribbon, car, carGlow);

    let progress = 0;
    let frameId = 0;
    let lap = 1;
    let lastSpeed = -1;
    let lastLoad = -1;
    const clock = new THREE.Clock();
    // Own running total so time spent paused off-screen doesn't jump the camera.
    let elapsed = 0;

    const tangent = new THREE.Vector3();
    const tangentAhead = new THREE.Vector3();
    const point = new THREE.Vector3();

    const setCamera = (elapsed: number) => {
      const angle = reduceMotion ? 0.6 : elapsed * 0.12;
      camera.position.set(
        Math.sin(angle) * 7.4,
        5.1,
        Math.cos(angle) * 7.4,
      );
      camera.lookAt(0, 0, 0);
    };

    const step = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      elapsed += delta;

      curve.getTangentAt(progress, tangent);
      curve.getTangentAt((progress + 0.012) % 1, tangentAhead);

      // Tighter corners mean less speed and more lateral load.
      const turn = tangent.angleTo(tangentAhead);
      const straightness = 1 - Math.min(turn / 0.32, 1);
      const speed = Math.round(62 + straightness * 118);
      const load = 0.35 + (1 - straightness) * 2.15;

      const previous = progress;
      progress = (progress + delta * (0.028 + straightness * 0.045)) % 1;
      if (progress < previous) lap += 1;

      curve.getPointAt(progress, point);
      car.position.copy(point);
      carGlow.position.copy(point);

      if (speedRef.current && speed !== lastSpeed) {
        speedRef.current.textContent = `${speed} mph`;
        lastSpeed = speed;
      }
      const roundedLoad = Math.round(load * 10) / 10;
      if (loadRef.current && roundedLoad !== lastLoad) {
        loadRef.current.textContent = `${roundedLoad.toFixed(1)} g`;
        lastLoad = roundedLoad;
      }
      if (lapRef.current) {
        lapRef.current.textContent = String(lap).padStart(2, "0");
      }

      setCamera(elapsed);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(step);
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();

    if (reduceMotion) {
      // One static frame: the shape is the point, the motion is optional.
      curve.getPointAt(0.18, point);
      car.position.copy(point);
      carGlow.position.copy(point);
      setCamera(0);
      renderer.render(scene, camera);
      if (speedRef.current) speedRef.current.textContent = "142 mph";
      if (loadRef.current) loadRef.current.textContent = "1.2 g";
      if (lapRef.current) lapRef.current.textContent = "01";
    }

    // Only animate while the panel is on screen and the tab is visible;
    // there's no reason to spend GPU on a loop nobody is looking at.
    let onScreen = false;
    const sync = () => {
      const shouldRun = !reduceMotion && onScreen && !document.hidden;
      if (shouldRun && !frameId) {
        clock.getDelta(); // drop the time spent paused
        frameId = requestAnimationFrame(step);
      } else if (!shouldRun && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    visibility.observe(mount);
    document.addEventListener("visibilitychange", sync);

    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(frameId);
      visibility.disconnect();
      document.removeEventListener("visibilitychange", sync);
      observer.disconnect();
      renderer.domElement.remove();
      renderer.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      carGeo.dispose();
      carMat.dispose();
      carGlowGeo.dispose();
      carGlowMat.dispose();
      grid.geometry.dispose();
      gridMat.dispose();
    };
  }, []);

  return (
    <figure className="m-0">
      <div className="track3d-stage relative h-[260px] overflow-hidden rounded-[4px] border border-white/10 sm:h-[320px]">
        <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />

        {/* Revealed from the effect if WebGL isn't available. */}
        <div
          ref={fallbackRef}
          hidden
          className="track3d-fallback place-items-center [&:not([hidden])]:grid"
        >
          <p className="meta px-6 text-center">
            This browser can&apos;t render the 3D view.
          </p>
        </div>

        <div className="track3d-fade pointer-events-none absolute inset-0 z-20" />

        <div className="telemetry-hud absolute bottom-3 left-3 right-3 z-30 grid grid-cols-3 gap-2">
          <div className="telemetry-pill">
            <p>Speed</p>
            <p ref={speedRef}>— mph</p>
          </div>
          <div className="telemetry-pill">
            <p>Lateral load</p>
            <p ref={loadRef}>— g</p>
          </div>
          <div className="telemetry-pill">
            <p>Lap</p>
            <p ref={lapRef}>—</p>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-[0.82rem] leading-relaxed text-zinc-400">
        A simulated lap, not logged data. The marker slows through the corners
        and the load figure rises with them.
      </figcaption>
    </figure>
  );
}
