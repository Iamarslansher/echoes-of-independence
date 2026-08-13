import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const MODEL_URL = '/models/minar-e-pakistan/scene.gltf'

export default function MinarPakistan3D() {
  const containerRef = useRef(null)
  const [loadFailed, setLoadFailed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId
    let renderer
    let controls
    let resizeObserver
    let disposed = false

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    )

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0x9aa79f, 0.7))
    const keyLight = new THREE.DirectionalLight(0xe0c470, 1.4)
    keyLight.position.set(5, 8, 6)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0x6ee7a8, 0.6)
    rimLight.position.set(-6, 3, -4)
    scene.add(rimLight)

    const loader = new GLTFLoader()
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return
        const model = gltf.scene

    
        const box = new THREE.Box3().setFromObject(model)
        const size = new THREE.Vector3()
        box.getSize(size)
        const center = new THREE.Vector3()
        box.getCenter(center)

        const maxDim = Math.max(size.x, size.y, size.z) || 1
        const scale = 3.2 / maxDim
        model.scale.setScalar(scale)

        model.position.x -= center.x * scale
        model.position.y -= box.min.y * scale
        model.position.z -= center.z * scale

        scene.add(model)

        const controlsTarget = new THREE.Vector3(0, (size.y * scale) / 2.2, 0)
        camera.position.set(3.2, size.y * scale * 0.55, 4.6)

        controls = new OrbitControls(camera, renderer.domElement)
        controls.target.copy(controlsTarget)
        controls.enableDamping = true
        controls.dampingFactor = 0.08
        controls.enablePan = false
        controls.minDistance = 2
        controls.maxDistance = 12
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.6
        controls.update()

        function handlePointerDown() {
          controls.autoRotate = false
        }
        renderer.domElement.addEventListener('pointerdown', handlePointerDown)

        function animate() {
          controls.update()
          renderer.render(scene, camera)
          rafId = requestAnimationFrame(animate)
        }
        animate()

        setLoading(false)

        container._cleanupPointer = () =>
          renderer.domElement.removeEventListener('pointerdown', handlePointerDown)
      },
      undefined,
      (err) => {
        console.error('Minar-e-Pakistan model failed to load', err)
        setLoadFailed(true)
        setLoading(false)
      }
    )

    function handleResize() {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      resizeObserver?.disconnect()
      container._cleanupPointer?.()
      controls?.dispose()
      renderer?.dispose()
      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-pk-gold/20 bg-black/30">
      <div ref={containerRef} className="h-72 w-full sm:h-96" />

      {loading && !loadFailed && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <span className="font-mono text-xs uppercase tracking-widest text-pk-mist/60">
            Loading monument…
          </span>
        </div>
      )}

      {loadFailed && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-6 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-pk-mist/60">
            Model couldn't load check the internet connection or try again later.
          </span>
        </div>
      )}

      {!loadFailed && (
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-pk-mist/70 backdrop-blur-sm">
          Drag to rotate · Minar-e-Pakistan
        </span>
      )}
    </div>
  )
}
