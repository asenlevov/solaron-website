"use client";

interface EvChargerProps {
  position?: [number, number, number];
}

function ChargerPedestal() {
  return (
    <group position={[0, 0.6, 0]}>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[0.25, 1.2, 0.15]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Front face accent */}
      <mesh position={[0, 0.1, 0.076]}>
        <boxGeometry args={[0.2, 0.9, 0.002]} />
        <meshStandardMaterial color="#383838" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.25, 0.077]}>
        <boxGeometry args={[0.15, 0.1, 0.002]} />
        <meshStandardMaterial
          color="#1a3a1a"
          emissive="#2a5a2a"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Status LED */}
      <mesh position={[0, 0.45, 0.077]}>
        <boxGeometry args={[0.1, 0.008, 0.005]} />
        <meshStandardMaterial
          color="#3B7A2A"
          emissive="#3B7A2A"
          emissiveIntensity={2}
        />
      </mesh>

      {/* SOLARON branding on charger */}
      <mesh position={[0, -0.3, 0.077]}>
        <boxGeometry args={[0.12, 0.015, 0.002]} />
        <meshStandardMaterial color="#555" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Cable connector hanging from side */}
      <mesh position={[0.13, -0.1, 0.05]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Connector plug end */}
      <mesh position={[0.22, -0.23, 0.05]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.03, 0.025, 0.08, 8]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Ground base pad */}
      <mesh receiveShadow position={[0, -0.62, 0]}>
        <boxGeometry args={[0.35, 0.04, 0.25]} />
        <meshStandardMaterial color="#444" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  );
}

function CarSilhouette() {
  const bodyColor = "#2a2a2e";
  const wheelPositions: [number, number, number][] = [
    [-1.2, 0.15, 0.75],
    [-1.2, 0.15, -0.75],
    [1.0, 0.15, 0.75],
    [1.0, 0.15, -0.75],
  ];

  return (
    <group position={[1.8, 0, 0]}>
      {/* Lower body */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[3.5, 0.5, 1.5]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Upper cabin */}
      <mesh castShadow position={[0.2, 0.85, 0]}>
        <boxGeometry args={[2.0, 0.5, 1.3]} />
        <meshPhysicalMaterial
          color={bodyColor}
          roughness={0.2}
          metalness={0.7}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Side mirrors */}
      <mesh position={[-0.4, 0.75, 0.82]} castShadow>
        <boxGeometry args={[0.08, 0.04, 0.15]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[-0.4, 0.75, -0.82]} castShadow>
        <boxGeometry args={[0.08, 0.04, 0.15]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Windshield */}
      <mesh position={[-0.65, 0.85, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.6, 0.45, 1.28]} />
        <meshPhysicalMaterial
          color="#1a3040"
          transmission={0.4}
          ior={1.5}
          roughness={0.05}
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Rear window */}
      <mesh position={[1.05, 0.85, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.45, 0.4, 1.25]} />
        <meshPhysicalMaterial
          color="#1a3040"
          transmission={0.4}
          ior={1.5}
          roughness={0.05}
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Headlights */}
      {[-0.5, 0.5].map((z) => (
        <mesh key={z} position={[-1.76, 0.4, z]}>
          <boxGeometry args={[0.02, 0.08, 0.25]} />
          <meshStandardMaterial
            color="#ffe8c0"
            emissive="#ffe8c0"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Taillights */}
      {[-0.5, 0.5].map((z) => (
        <mesh key={`t-${z}`} position={[1.76, 0.4, z]}>
          <boxGeometry args={[0.02, 0.06, 0.2]} />
          <meshStandardMaterial
            color="#ff2020"
            emissive="#ff2020"
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Tire */}
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
          </mesh>
          {/* Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, pos[2] > 0 ? 0.065 : -0.065]}>
            <cylinderGeometry args={[0.08, 0.08, 0.01, 12]} />
            <meshStandardMaterial color="#aaa" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Charging port glow on left side */}
      <mesh position={[-1.0, 0.45, 0.76]}>
        <boxGeometry args={[0.12, 0.08, 0.01]} />
        <meshStandardMaterial
          color="#3B7A2A"
          emissive="#3B7A2A"
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export function EvCharger({ position = [0, 0, 0] }: EvChargerProps) {
  return (
    <group position={position}>
      <ChargerPedestal />
      <CarSilhouette />
    </group>
  );
}
