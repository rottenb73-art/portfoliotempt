'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stage, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function RotatingModel({ url }: { url: string }) {
  const gltf = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <group ref={group} rotation={[0.3, -0.4, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export function GlbViewer({ src, height = 400 }: { src: string; height?: number }) {
  return (
    <div style={{ width: '100%', height, background: '#111', position: 'relative', border: '1px solid var(--black)' }}>
      {/* HUD labels */}
      <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 3, pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em', color: 'var(--beige-dark)', opacity: 0.7 }}>○ 3D_MODEL</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>INTERACTIVE_ROTATION.glb</span>
      </div>
      <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 3, pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'var(--gray-700)', letterSpacing: '0.1em' }}>r3f</span>
      </div>

      <Canvas camera={{ position: [0, 1.8, 5.4], fov: 28 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={1.8} />
        <directionalLight position={[-4, 2, -4]} intensity={0.6} />
        <Suspense fallback={null}>
          <Stage environment={null} intensity={0.3} shadows={false}>
            <RotatingModel url={src} />
          </Stage>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
