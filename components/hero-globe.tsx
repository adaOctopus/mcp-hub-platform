"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sphere, Html, Line } from "@react-three/drei"
import { useTheme } from "next-themes"
import * as THREE from "three"

// Dot material for the globe points
const DotMaterial = ({ color }: { color: string }) => {
  return <meshBasicMaterial color={color} />
}

// Connection line between points
const ConnectionLine = ({
  start,
  end,
  color,
}: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.4}
    />
  )
}

// Icon point with tiny icon
const IconPoint = ({
  position,
  icon,
  color,
}: {
  position: [number, number, number]
  icon: string
  color: string
}) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.015, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
      <Html distanceFactor={25} position={[0, 0, 0]} transform>
        <div className="flex items-center justify-center w-3 h-3 rounded-full">
          <div
            className="text-white"
            style={{ fontSize: "6px", transform: "scale(0.5)" }}
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        </div>
      </Html>
    </mesh>
  )
}

// Pulse effect around a point
const PulseEffect = ({
  position,
  color,
  size = 0.02,
}: {
  position: [number, number, number]
  color: string
  size?: number
}) => {
  const pulseRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const t = clock.getElapsedTime()
      const scale = 1 + 0.3 * Math.sin(t * 2)
      pulseRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <mesh position={position} ref={pulseRef}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

// Main globe component with dots
const Globe = ({ theme }: { theme: string }) => {
  const globeRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  // Colors based on theme
  const dotColor = theme === "dark" ? "#ffffff" : "#333333"
  const primaryColor = "#8B5CF6" // Purple (primary)
  const secondaryColor = "#10B981" // Green (secondary)
  const accentColor = "#8B5CF6" // Purple accent

  // Slow rotation animation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001
    }
  })

  // Generate points for the globe
  const generateGlobePoints = () => {
    const points = []
    const totalPoints = isMobile ? 500 : 1000

    for (let i = 0; i < totalPoints; i++) {
      // Random spherical coordinates
      const phi = Math.acos(-1 + (2 * i) / totalPoints)
      const theta = Math.sqrt(totalPoints * Math.PI) * phi

      // Convert to cartesian
      const x = Math.sin(phi) * Math.cos(theta) * 1
      const y = Math.sin(phi) * Math.sin(theta) * 1
      const z = Math.cos(phi) * 1

      // Skip some points to create continent-like patterns
      if (Math.random() > 0.3 && Math.random() < 0.8) {
        points.push([x, y, z])
      }
    }

    return points
  }

  const globePoints = generateGlobePoints()

  // Define icon positions
  const iconPositions = {
    // User icons (people)
    users: [
      [0.7, 0.5, 0.5],
      [-0.6, 0.3, 0.7],
      [0.2, -0.8, 0.5],
    ],
    // AI system icons
    ai: [
      [0.5, 0.8, 0.3],
      [-0.7, -0.2, 0.6],
      [0.6, -0.4, 0.7],
    ],
    // MCP server icons
    servers: [
      [-0.3, -0.5, -0.8],
      [0.8, 0.1, -0.6],
      [-0.5, 0.7, -0.5],
    ],
  }

  // Create connections between elements
  const connections = [
    // User to AI connections
    { start: iconPositions.users[0], end: iconPositions.ai[0], color: primaryColor },
    { start: iconPositions.users[1], end: iconPositions.ai[1], color: primaryColor },
    { start: iconPositions.users[2], end: iconPositions.ai[2], color: primaryColor },

    // AI to Server connections
    { start: iconPositions.ai[0], end: iconPositions.servers[0], color: secondaryColor },
    { start: iconPositions.ai[1], end: iconPositions.servers[1], color: secondaryColor },
    { start: iconPositions.ai[2], end: iconPositions.servers[2], color: secondaryColor },

    // Server to User connections (completing the triangle)
    { start: iconPositions.servers[0], end: iconPositions.users[2], color: accentColor },
    { start: iconPositions.servers[1], end: iconPositions.users[0], color: accentColor },
    { start: iconPositions.servers[2], end: iconPositions.users[1], color: accentColor },
  ]

  // SVG icons as strings - simplified versions
  const icons = {
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 1 0-16 0"></path></svg>`,
    ai: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"></rect><rect x="2" y="14" width="20" height="8" rx="2"></rect><line x1="6" x2="6.01" y1="6" y2="6"></line><line x1="6" x2="6.01" y1="18" y2="18"></line></svg>`,
    server: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H3v5h18z"></path><path d="M3 7v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7"></path><line x1="7.5" y1="12" x2="7.51" y2="12"></line><line x1="12" y1="12" x2="12.01" y2="12"></line><line x1="16.5" y1="12" x2="16.51" y2="12"></line></svg>`,
  }

  return (
    <group ref={globeRef}>
      {/* Base sphere with slight transparency */}
      <Sphere args={[0.99, 64, 64]}>
        <meshBasicMaterial color={theme === "dark" ? "#111111" : "#f0f0f0"} transparent opacity={0.3} />
      </Sphere>

      {/* Dots representing the globe */}
      {globePoints.map((point, i) => (
        <mesh key={i} position={[point[0], point[1], point[2]]}>
          <sphereGeometry args={[0.005, 8, 8]} />
          <DotMaterial color={dotColor} />
        </mesh>
      ))}

      {/* Connection lines */}
      {connections.map((connection, i) => (
        <ConnectionLine
          key={`connection-${i}`}
          start={connection.start as [number, number, number]}
          end={connection.end as [number, number, number]}
          color={connection.color}
        />
      ))}

      {/* User points (purple) */}
      {iconPositions.users.map((position, i) => (
        <mesh key={`user-${i}`} position={position as [number, number, number]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshBasicMaterial color={primaryColor} />
        </mesh>
      ))}

      {/* AI points (green) */}
      {iconPositions.ai.map((position, i) => (
        <mesh key={`ai-${i}`} position={position as [number, number, number]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshBasicMaterial color={secondaryColor} />
        </mesh>
      ))}

      {/* Server points (purple) */}
      {iconPositions.servers.map((position, i) => (
        <mesh key={`server-${i}`} position={position as [number, number, number]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      ))}

      {/* Pulse effects on key nodes */}
      <PulseEffect position={iconPositions.users[0] as [number, number, number]} color={primaryColor} />
      <PulseEffect position={iconPositions.ai[1] as [number, number, number]} color={secondaryColor} />
      <PulseEffect position={iconPositions.servers[2] as [number, number, number]} color={accentColor} />
    </group>
  )
}

// Main component that renders the 3D scene
export default function HeroGlobe() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"

  return (
    <div className="w-full h-[300px] md:h-[350px]">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <Globe theme={theme} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI / 2 + 0.5}
        />
      </Canvas>
    </div>
  )
}
