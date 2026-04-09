import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Torus, Box } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (boxRef.current) {
      boxRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      boxRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  const cyanColor = useMemo(() => new THREE.Color("#00d4ff"), []);
  const purpleColor = useMemo(() => new THREE.Color("#a855f7"), []);

  return (
    <>
      {/* Main icosahedron */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron ref={meshRef} args={[1.5, 1]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={cyanColor}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive={cyanColor}
            emissiveIntensity={0.2}
          />
        </Icosahedron>
      </Float>

      {/* Orbiting torus */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Torus ref={torusRef} args={[0.8, 0.15, 16, 32]} position={[3, 1, -1]}>
          <meshStandardMaterial
            color={purpleColor}
            roughness={0.3}
            metalness={0.9}
            emissive={purpleColor}
            emissiveIntensity={0.3}
          />
        </Torus>
      </Float>

      {/* Floating box */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
        <Box ref={boxRef} args={[0.6, 0.6, 0.6]} position={[-3, -0.5, 0.5]}>
          <meshStandardMaterial
            color={cyanColor}
            roughness={0.2}
            metalness={0.9}
            emissive={cyanColor}
            emissiveIntensity={0.15}
            wireframe
          />
        </Box>
      </Float>

      {/* Small floating particles */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} floatIntensity={0.3 + i * 0.1}>
          <mesh
            position={[
              Math.sin(i * 0.8) * 4,
              Math.cos(i * 0.6) * 2,
              Math.sin(i * 0.4) * 2 - 2,
            ]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? cyanColor : purpleColor}
              emissive={i % 2 === 0 ? cyanColor : purpleColor}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#00d4ff"
        />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
