import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

export const ThreeBackground = () => {
  const { activeTheme } = useTheme();
  const containerRef = useRef(null);
  const targetColorRef = useRef(new THREE.Color(activeTheme.primary));

  // Keep target color in sync with active theme
  useEffect(() => {
    targetColorRef.current.set(activeTheme.primary);
  }, [activeTheme.primary]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080c14, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    camera.position.z = 700;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 3. 3D Particle Grid / Spatial Nodes
    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const initialPositions = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 1600;
      const y = (Math.random() - 0.5) * 1200;
      const z = (Math.random() - 0.5) * 1000;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      scales[i] = Math.random() * 2.5 + 1.0;
      initialPositions.push({ x, y, z, speed: Math.random() * 0.002 + 0.001 });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Particle Material with Soft Glow Sprite
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.6)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 14,
      map: texture,
      transparent: true,
      opacity: 0.7,
      color: targetColorRef.current.clone(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 4. Subtle Ambient Floating Geometric Ring (Wireframe System Node)
    const ringGeo = new THREE.IcosahedronGeometry(220, 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: targetColorRef.current.clone(),
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(200, 50, -100);
    scene.add(ringMesh);

    // 5. Mouse Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.3;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 6. Responsive Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 7. Animation Loop with Color Lerping
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      camera.position.x = mouseX;
      camera.position.y = -mouseY;
      camera.lookAt(scene.position);

      // Rotate geometric node
      ringMesh.rotation.x = elapsedTime * 0.06;
      ringMesh.rotation.y = elapsedTime * 0.08;

      // Smooth color lerp to active theme
      material.color.lerp(targetColorRef.current, 0.05);
      ringMat.color.lerp(targetColorRef.current, 0.05);

      // Gentle wave on particles
      const posArray = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const init = initialPositions[i];
        posArray[i * 3 + 1] =
          init.y + Math.sin(elapsedTime * 0.8 + init.x * 0.01) * 20;
        posArray[i * 3] =
          init.x + Math.cos(elapsedTime * 0.6 + init.y * 0.01) * 15;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup on Unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Soft Ambient Radial Vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-700 opacity-25"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${activeTheme.primary} 0%, transparent 65%)`,
        }}
      />
    </div>
  );
};
