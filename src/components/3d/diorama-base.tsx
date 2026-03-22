"use client";

const PLATFORM_W = 26;
const PLATFORM_D = 22;

export function DioramaBase() {
  // Sidewalk runs along Z=4.9..6.1 — path stops before it, driveway sits above it
  return (
    <group>
      {/* Solid ground slab — top face at Y = -0.01 */}
      <mesh receiveShadow position={[0, -0.16, 0]}>
        <boxGeometry args={[PLATFORM_W, 0.3, PLATFORM_D]} />
        <meshStandardMaterial color="#7daa5e" roughness={0.9} metalness={0.02} />
      </mesh>

      {/* Sidewalk — lowest layer of paved surfaces */}
      <mesh receiveShadow position={[0, 0.03, 5.5]}>
        <boxGeometry args={[16, 0.04, 1.2]} />
        <meshStandardMaterial color="#d0cdc8" roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Driveway — above sidewalk so overlap doesn't flicker */}
      <mesh receiveShadow position={[3.5, 0.06, 6.5]}>
        <boxGeometry args={[3.6, 0.04, 9]} />
        <meshStandardMaterial color="#aaa8a3" roughness={0.85} metalness={0.03} />
      </mesh>

      {/* Path to front door — stops at sidewalk edge (Z=4.85), no overlap */}
      <mesh receiveShadow position={[0, 0.03, 3.55]}>
        <boxGeometry args={[1.6, 0.04, 1.5]} />
        <meshStandardMaterial color="#d0cdc8" roughness={0.85} metalness={0.02} />
      </mesh>
    </group>
  );
}
