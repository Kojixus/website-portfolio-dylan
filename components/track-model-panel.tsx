"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TrackModelPanel() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const fallbackRef = useRef<HTMLDivElement | null>(null);
  const speedRef = useRef<HTMLSpanElement | null>(null);
  const throttleRef = useRef<HTMLParagraphElement | null>(null);
  const brakeRef = useRef<HTMLParagraphElement | null>(null);
  const loadRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId = 0;
    let disposed = false;
    let lastHudUpdate = 0;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      fallbackRef.current?.classList.remove("hidden");
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x040914, 120, 320);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 900);
    camera.position.set(0, 44, 128);
    camera.lookAt(0, 0, 0);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "track3d-canvas";
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x79c7ff, 0.42));

    const keyLight = new THREE.PointLight(0x4daefc, 1.24, 320);
    keyLight.position.set(52, 70, 48);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xf0d9a5, 0.84, 280);
    fillLight.position.set(-72, 36, -62);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x7fd0ff, 0.56);
    rimLight.position.set(0, 60, -130);
    scene.add(rimLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(120, 64),
      new THREE.MeshStandardMaterial({
        color: "#08172a",
        roughness: 0.72,
        metalness: 0.32,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -18;
    scene.add(ground);

    const grid = new THREE.GridHelper(230, 26, 0x2f6ca4, 0x1c3d60);
    grid.position.y = -17.9;
    if (Array.isArray(grid.material)) {
      grid.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = 0.3;
      });
    } else {
      grid.material.transparent = true;
      grid.material.opacity = 0.3;
    }
    scene.add(grid);

    const telemetryBars: THREE.Mesh[] = [];
    for (let index = 0; index < 10; index += 1) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(2.35, 14, 2.35),
        new THREE.MeshStandardMaterial({
          color: "#6ec6ff",
          roughness: 0.18,
          metalness: 0.78,
          emissive: new THREE.Color("#3ea6ff"),
          emissiveIntensity: 0.48,
        }),
      );
      bar.position.set(-31 + index * 6.9, -11, -17.5);
      telemetryBars.push(bar);
      scene.add(bar);
    }

    const circleLines: THREE.Line[] = [];
    const circleRadii = [20, 30, 42];
    circleRadii.forEach((radius, index) => {
      const points: THREE.Vector3[] = [];
      const segments = 120;
      for (let step = 0; step <= segments; step += 1) {
        const angle = (step / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            -6,
            Math.sin(angle) * radius,
          ),
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: index % 2 === 0 ? "#8fd4ff" : "#f0d9a5",
        transparent: true,
        opacity: 0.28,
      });
      const line = new THREE.LineLoop(geometry, material);
      line.rotation.x = Math.PI / 2;
      circleLines.push(line);
      scene.add(line);
    });

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: "#7fcfff",
      roughness: 0.25,
      metalness: 0.7,
      emissive: new THREE.Color("#2d7cb3"),
      emissiveIntensity: 0.4,
    });
    const dataNodes: THREE.Mesh[] = [];
    for (let index = 0; index < 16; index += 1) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.9, 16, 16),
        nodeMaterial,
      );
      node.position.set(
        -44 + (index % 8) * 12,
        -9 + (index % 3) * 1.3,
        -8 + Math.floor(index / 8) * 10,
      );
      dataNodes.push(node);
      scene.add(node);
    }

    const wavePointCount = 84;
    const wavePositions = new Float32Array(wavePointCount * 3);
    for (let index = 0; index < wavePointCount; index += 1) {
      const offset = index * 3;
      wavePositions[offset] = -70 + index * 1.68;
      wavePositions[offset + 1] = -8;
      wavePositions[offset + 2] = -30;
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(wavePositions, 3),
    );
    const waveLine = new THREE.Line(
      waveGeometry,
      new THREE.LineBasicMaterial({
        color: "#9cdcff",
        transparent: true,
        opacity: 0.95,
      }),
    );
    scene.add(waveLine);

    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 16, 16),
      new THREE.MeshStandardMaterial({
        color: "#f0d9a5",
        emissive: new THREE.Color("#8d6c30"),
        emissiveIntensity: 0.75,
        roughness: 0.22,
        metalness: 0.7,
      }),
    );
    marker.position.set(-70, -8, -30);
    scene.add(marker);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const clock = new THREE.Clock();

    let pointerX = 0;
    let pointerY = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;

    const resize = () => {
      if (!renderer) {
        return;
      }
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
    };

    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    const render = () => {
      if (!renderer || disposed) {
        return;
      }
      frameId = window.requestAnimationFrame(render);

      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;

      pointerX += (pointerTargetX - pointerX) * 0.08;
      pointerY += (pointerTargetY - pointerY) * 0.08;

      if (!reducedMotion) {
        circleLines.forEach((line, index) => {
          line.rotation.z += 0.0012 + index * 0.0004;
          const material = line.material as THREE.LineBasicMaterial;
          material.opacity = 0.2 + Math.sin(elapsed * 1.3 + index) * 0.08;
        });

        dataNodes.forEach((node, index) => {
          node.position.y = -9 + Math.sin(elapsed * 2 + index) * 0.9;
        });
      }

      telemetryBars.forEach((bar, index) => {
        const level =
          0.26 + (Math.sin(elapsed * 2.5 + index * 0.58) * 0.5 + 0.5) * 0.78;
        bar.scale.y = level;
        bar.position.y = -11 + (14 * level) / 2;
      });

      const waveAttr = waveGeometry.getAttribute("position");
      const waveArray = waveAttr.array as Float32Array;
      for (let index = 0; index < wavePointCount; index += 1) {
        const offset = index * 3;
        waveArray[offset + 1] =
          -8 +
          Math.sin(elapsed * 2.8 + index * 0.24) * 4.6 +
          Math.cos(elapsed * 1.14 + index * 0.12) * 1.9;
      }
      waveAttr.needsUpdate = true;

      const markerIndex = Math.floor((elapsed * 24) % wavePointCount);
      const markerOffset = markerIndex * 3;
      marker.position.set(
        waveArray[markerOffset],
        waveArray[markerOffset + 1],
        waveArray[markerOffset + 2],
      );

      camera.position.x = pointerX * 5.4;
      camera.position.y = 44 + pointerY * -2.6;
      camera.lookAt(0, -3, 0);

      lastHudUpdate += delta;
      if (lastHudUpdate > 0.09) {
        const speed =
          146 + Math.sin(elapsed * 1.35) * 18 + Math.sin(elapsed * 0.43) * 7;
        const throttle = 64 + Math.sin(elapsed * 2.3 + 0.35) * 31;
        const brake = Math.max(0, 22 + Math.sin(elapsed * 1.7 + 2.2) * 28);
        const load = 1.32 + Math.sin(elapsed * 1.45 + 0.9) * 0.43;

        if (speedRef.current) {
          speedRef.current.textContent = `${Math.round(speed)}`;
        }
        if (throttleRef.current) {
          throttleRef.current.textContent = `${Math.round(
            Math.max(0, Math.min(100, throttle)),
          )}%`;
        }
        if (brakeRef.current) {
          brakeRef.current.textContent = `${Math.round(
            Math.max(0, Math.min(100, brake)),
          )}%`;
        }
        if (loadRef.current) {
          loadRef.current.textContent = `${load.toFixed(2)}g`;
        }

        lastHudUpdate = 0;
      }

      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);

      observer.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);

      scene.traverse((object) => {
        const meshLike = object as THREE.Object3D & {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };
        meshLike.geometry?.dispose();
        if (Array.isArray(meshLike.material)) {
          meshLike.material.forEach((material) => material.dispose());
        } else {
          meshLike.material?.dispose();
        }
      });

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="w-full rounded-[1.35rem] border border-white/15 bg-zinc-950/85 p-2 shadow-xl">
      <div
        ref={mountRef}
        className="track3d-stage relative h-57.5 overflow-hidden rounded-[1.05rem] sm:h-80 lg:h-100"
      >
        <div className="track3d-fade pointer-events-none absolute inset-0" />

        <div className="pointer-events-none absolute left-4 right-4 top-3 z-20 flex items-center justify-between text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-zinc-200/80 sm:left-5 sm:right-5 sm:top-4 sm:text-[0.62rem] sm:tracking-[0.22em]">
          <p>Telemetry Analytics // 3D</p>
          <p className="gold-accent">WebGL Active</p>
        </div>

        <div className="telemetry-hud pointer-events-none absolute bottom-3 left-3 right-3 z-20 grid grid-cols-2 gap-2 sm:bottom-4 sm:left-4 sm:right-4 sm:grid-cols-4">
          <div className="telemetry-pill">
            <p>Speed</p>
            <p>
              <span ref={speedRef}>149</span> mph
            </p>
          </div>
          <div className="telemetry-pill">
            <p>Throttle</p>
            <p ref={throttleRef}>67%</p>
          </div>
          <div className="telemetry-pill">
            <p>Brake</p>
            <p ref={brakeRef}>19%</p>
          </div>
          <div className="telemetry-pill">
            <p>Lateral</p>
            <p ref={loadRef}>1.34g</p>
          </div>
        </div>

        <div
          ref={fallbackRef}
          className="track3d-fallback absolute inset-0 z-20 hidden place-items-center bg-zinc-950/90 p-6 text-center"
        >
          <div className="space-y-2">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Telemetry Preview
            </p>
            <p className="font-display text-2xl uppercase tracking-[0.08em] text-sky-200">
              WebGL not available
            </p>
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-300">
              Enable hardware acceleration to view 3D animation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
