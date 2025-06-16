"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sphere, Line, Html } from "@react-three/drei"
import { useTheme } from "next-themes"
import type * as THREE from "three"

// Animated connection beam
const ConnectionBeam = ({
  start,
  end,
  color,
  animated = false,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  animated?: boolean
}) => {
  const beamRef = useRef<THREE.Group>(null)
  const [progress, setProgress] = useState(0)

  useFrame(({ clock }) => {
    if (animated && beamRef.current) {
      const t = clock.getElapsedTime()
      setProgress((Math.sin(t * 2) + 1) / 2)
    }
  })

  const points: [number, number, number][] = animated
    ? [
        start,
        [
          start[0] + (end[0] - start[0]) * progress,
          start[1] + (end[1] - start[1]) * progress,
          start[2] + (end[2] - start[2]) * progress,
        ] as [number, number, number],
      ]
    : [start, end]

  return (
    <group ref={beamRef}>
      <Line points={points} color={color} lineWidth={animated ? 3 : 1} transparent opacity={animated ? 0.8 : 0.4} />
      {animated && progress > 0.8 && (
        <mesh position={end}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  )
}

// Data packet traveling along connection
const DataPacket = ({
  start,
  end,
  color,
  speed = 1,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  speed?: number
}) => {
  const packetRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (packetRef.current) {
      const t = (clock.getElapsedTime() * speed) % 2
      const progress = t > 1 ? 2 - t : t

      const x = start[0] + (end[0] - start[0]) * progress
      const y = start[1] + (end[1] - start[1]) * progress
      const z = start[2] + (end[2] - start[2]) * progress

      packetRef.current.position.set(x, y, z)
      ;(packetRef.current.material as THREE.MeshBasicMaterial).opacity = Math.sin(progress * Math.PI) * 0.8
    }
  })

  return (
    <mesh ref={packetRef}>
      <sphereGeometry args={[0.008, 6, 6]} />
      <meshBasicMaterial color={color} transparent />
    </mesh>
  )
}

// High-quality futuristic human icon
const ConnectingHuman = ({
  position,
  targetPosition,
  delay = 0,
}: {
  position: [number, number, number]
  targetPosition: [number, number, number]
  delay?: number
}) => {
  const humanRef = useRef<THREE.Group>(null)
  const [connectionPhase, setConnectionPhase] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() - delay

    if (t > 0 && !isVisible) {
      setIsVisible(true)
    }

    if (t > 2) {
      const phase = Math.floor((t - 2) / 3) % 3
      setConnectionPhase(phase)
    }

    if (humanRef.current && isVisible) {
      const pulseScale = 1 + 0.1 * Math.sin(t * 4)
      humanRef.current.scale.set(pulseScale, pulseScale, pulseScale)
    }
  })

  if (!isVisible) return null

  return (
    <group ref={humanRef} position={position}>
      {/* High-quality human icon */}
      <Html distanceFactor={15} position={[0, 0, 0]} transform>
        <div className="flex items-center justify-center w-1.5 h-1.5 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 shadow-[0_0_4px_#8B5CF6] border border-purple-300/30">
          <svg
            width="2"
            height="2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 2px rgba(139,92,246,0.3))" }}
          >
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M20 21a8 8 0 1 0-16 0"></path>
          </svg>
        </div>
      </Html>

      {/* Connection beam to network */}
      {connectionPhase >= 1 && (
        <ConnectionBeam
          start={[0, 0, 0]}
          end={[targetPosition[0] - position[0], targetPosition[1] - position[1], targetPosition[2] - position[2]]}
          color="#8B5CF6"
          animated={connectionPhase === 1}
        />
      )}

      {/* Success pulse when connected */}
      {connectionPhase >= 2 && (
        <mesh>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  )
}

// Network expansion wave
const NetworkWave = ({ center, trigger }: { center: [number, number, number]; trigger: boolean }) => {
  const waveRef = useRef<THREE.Mesh>(null)
  const [isActive, setIsActive] = useState(false)

  useFrame(({ clock }) => {
    if (trigger && !isActive) {
      setIsActive(true)
    }

    if (waveRef.current && isActive) {
      const t = clock.getElapsedTime() % 2
      const scale = 1 + t * 2
      const opacity = Math.max(0, 1 - t)

      waveRef.current.scale.set(scale, scale, scale)
      ;(waveRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.3
    }
  })

  if (!isActive) return null

  return (
    <mesh ref={waveRef} position={center}>
      <sphereGeometry args={[0.08, 32, 32]} />
      <meshBasicMaterial color="#00FFFF" transparent wireframe />
    </mesh>
  )
}

// Main globe component
const Globe = ({ theme }: { theme: string }) => {
  const globeRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  // Colors
  const dotColor = theme === "dark" ? "#ffffff" : "#333333"
  const primaryColor = "#8B5CF6" // Purple - Users
  const secondaryColor = "#10B981" // Green - AI Systems
  const blueColor = "#3B82F6" // Blue - MCP Servers
  const cyanColor = "#00FFFF" // Cyan - Network effects

  // Animation state
  const [networkExpansion, setNetworkExpansion] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkExpansion((prev) => !prev)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Rotation animation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002
    }
  })

  // Generate globe points
  const generateGlobePoints = () => {
    const points = []
    const totalPoints = isMobile ? 400 : 800

    for (let i = 0; i < totalPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / totalPoints)
      const theta = Math.sqrt(totalPoints * Math.PI) * phi

      const x = Math.sin(phi) * Math.cos(theta) * 1
      const y = Math.sin(phi) * Math.sin(theta) * 1
      const z = Math.cos(phi) * 1

      if (Math.random() > 0.4 && Math.random() < 0.9) {
        points.push([x, y, z])
      }
    }
    return points
  }

  const globePoints = generateGlobePoints()

  // Network nodes
  const networkNodes = {
    servers: [
      [-0.3, -0.5, -0.8],
      [0.8, 0.1, -0.6],
      [-0.5, 0.7, -0.5],
      [0.4, -0.7, 0.6],
      [-0.8, 0.2, 0.5],
    ],
    ai: [
      [0.5, 0.8, 0.3],
      [-0.7, -0.2, 0.6],
      [0.6, -0.4, 0.7],
    ],
  }

  // Connecting humans positions
  const connectingHumans = [
    { pos: [1.3, 0.2, 0.8], target: networkNodes.servers[0], delay: 1 },
    { pos: [-1.2, 0.6, 0.4], target: networkNodes.ai[1], delay: 3 },
    { pos: [0.9, -1.1, 0.3], target: networkNodes.servers[2], delay: 5 },
  ]

  return (
    <group ref={globeRef}>
      {/* Base globe */}
      <Sphere args={[0.99, 64, 64]}>
        <meshBasicMaterial color={theme === "dark" ? "#0a0a0a" : "#f8f8f8"} transparent opacity={0.2} />
      </Sphere>

      {/* Globe surface points */}
      {globePoints.map((point, i) => (
        <mesh key={i} position={[point[0], point[1], point[2]]}>
          <sphereGeometry args={[0.003, 6, 6]} />
          <meshBasicMaterial color={dotColor} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* MCP Server nodes */}
      {networkNodes.servers.map((position, i) => (
        <group key={`server-${i}`}>
          <mesh position={position as [number, number, number]}>
            <sphereGeometry args={[0.015, 12, 12]} />
            <meshBasicMaterial color={blueColor} />
          </mesh>
          <Html distanceFactor={15} position={position as [number, number, number]} transform>
            <div className="flex items-center justify-center w-1.5 h-1.5 rounded shadow-[0_0_4px_#3B82F6] bg-blue-500/10">
              <svg
                width="2"
                height="2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 2px #3B82F6)" }}
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
          </Html>
          <NetworkWave center={position as [number, number, number]} trigger={networkExpansion} />
        </group>
      ))}

      {/* AI System nodes */}
      {networkNodes.ai.map((position, i) => (
        <group key={`ai-${i}`}>
          <mesh position={position as [number, number, number]}>
            <sphereGeometry args={[0.013, 12, 12]} />
            <meshBasicMaterial color={secondaryColor} />
          </mesh>
          <Html distanceFactor={15} position={position as [number, number, number]} transform>
            <div className="flex items-center justify-center w-1.5 h-1.5 rounded shadow-[0_0_4px_#10B981] bg-green-500/10">
              <svg
                width="2"
                height="2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 2px #10B981)" }}
              >
                <rect x="2" y="2" width="20" height="8" rx="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
            </div>
          </Html>
        </group>
      ))}

      {/* Server-to-server connections */}
      {networkNodes.servers.map((server, i) =>
        networkNodes.servers
          .slice(i + 1)
          .map((otherServer, j) => (
            <ConnectionBeam
              key={`server-connection-${i}-${j}`}
              start={server as [number, number, number]}
              end={otherServer as [number, number, number]}
              color={blueColor}
            />
          )),
      )}

      {/* AI-to-server connections */}
      {networkNodes.ai.map((ai, i) =>
        networkNodes.servers
          .slice(0, 2)
          .map((server, j) => (
            <ConnectionBeam
              key={`ai-server-${i}-${j}`}
              start={ai as [number, number, number]}
              end={server as [number, number, number]}
              color={secondaryColor}
            />
          )),
      )}

      {/* Data packets flowing through network */}
      {networkNodes.servers.map((server, i) =>
        networkNodes.ai.map((ai, j) => (
          <DataPacket
            key={`packet-${i}-${j}`}
            start={server as [number, number, number]}
            end={ai as [number, number, number]}
            color={cyanColor}
            speed={0.5 + Math.random() * 0.5}
          />
        )),
      )}

      {/* Humans connecting to the network */}
      {connectingHumans.map((human, i) => (
        <ConnectingHuman
          key={`human-${i}`}
          position={human.pos as [number, number, number]}
          targetPosition={human.target as [number, number, number]}
          delay={human.delay}
        />
      ))}

      {/* Ambient lighting effects */}
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={0.3} color={cyanColor} />
    </group>
  )
}

// Main component
export default function HeroGlobe() {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme || "dark"

  return (
    <div className="w-full h-[300px] md:h-[350px]">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <Globe theme={theme} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          rotateSpeed={0.3}
          minPolarAngle={Math.PI / 2 - 0.7}
          maxPolarAngle={Math.PI / 2 + 0.7}
        />
      </Canvas>
    </div>
  )
}
