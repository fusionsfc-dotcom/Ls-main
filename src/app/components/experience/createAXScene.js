import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Procedural illustration of the data-analysis workflow; no invented metrics.
export function createAXScene(canvas, hero, initialMode, initiallyPaused, callbacks = {}) {
  const mobile = matchMedia('(max-width:767px)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.35 : 1.65));
  renderer.setClearColor(0, 0); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.3;
  const scene = new THREE.Scene();
  const glowCanvas = document.createElement('canvas'); glowCanvas.width = glowCanvas.height = 64;
  const glowContext = glowCanvas.getContext('2d');
  const gradient = glowContext.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)'); gradient.addColorStop(0.2, 'rgba(255,255,255,.95)'); gradient.addColorStop(0.5, 'rgba(255,255,255,.3)'); gradient.addColorStop(1, 'rgba(255,255,255,0)');
  glowContext.fillStyle = gradient; glowContext.fillRect(0, 0, 64, 64);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 70); camera.position.set(0, 0.2, 12);
  const environment = new RoomEnvironment(), pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(environment, 0.04); scene.environment = envTarget.texture;
  environment.dispose(); pmrem.dispose();
  const key = new THREE.DirectionalLight(0xc0e3ff, 4); key.position.set(2, 4, 5); scene.add(key);
  const rim = new THREE.PointLight(0x36d0f4, 40, 15); rim.position.set(-2, 0, 3); scene.add(rim);
  const assembly = new THREE.Group(); scene.add(assembly);
  const pickables = [], focusNodes = [], raycaster = new THREE.Raycaster();
  const focusMaterial = new THREE.MeshBasicMaterial({ color: 0xf4deb6 });
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x4288a9, transparent: true, opacity: 0.25 });
  const fineMaterial = new THREE.LineBasicMaterial({ color: 0x93d8e8, transparent: true, opacity: 0.2 });
  const cyanMaterial = new THREE.MeshBasicMaterial({ color: 0x97e1eb });
  const metal = new THREE.MeshPhysicalMaterial({ color: 0x163c55, metalness: 0.75, roughness: 0.23, clearcoat: 1 });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 3), metal); assembly.add(core); core.userData.section = 'analysis'; pickables.push(core);
  const coreEdges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.79, 1)), fineMaterial); assembly.add(coreEdges);
  const coreLattice = new THREE.Group(); assembly.add(coreLattice);
  const orbGeometry = new THREE.SphereGeometry(0.025, 8, 6);
  for (let i = 0; i < 75; i++) {
    const a = i * 2.399963, y = 1 - i / 74 * 2, r = Math.sqrt(1 - y * y);
    const dot = new THREE.Mesh(orbGeometry, cyanMaterial); dot.position.set(Math.cos(a) * r * 0.91, y * 0.91, Math.sin(a) * r * 0.91); coreLattice.add(dot);
  }
  const halo = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.012, 6, 150), cyanMaterial);
  halo.rotation.set(0.6, 0.8, 0.2); assembly.add(halo);
  const halo2 = new THREE.Mesh(new THREE.TorusGeometry(1.23, 0.009, 6, 150), cyanMaterial);
  halo2.rotation.set(-0.7, 0.3, 0.5); assembly.add(halo2);

  // A neural lattice with source, analysis and output nodes.
  const nodes = [], connections = [], neural = new THREE.Group(); assembly.add(neural);
  const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x74c3e0 });
  const nodeGeometry = new THREE.SphereGeometry(0.045, 8, 6);
  for (let layer = 0; layer < 5; layer++) for (let i = 0; i < 7; i++) {
    const a = i / 7 * Math.PI * 2 + layer * 0.24;
    const radius = layer === 2 ? 1.55 : 1.25 + Math.abs(2 - layer) * 0.18;
    const position = new THREE.Vector3((layer - 2) * 1.26, Math.cos(a) * radius, Math.sin(a) * radius);
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial); node.position.copy(position); neural.add(node); nodes.push(position); node.userData.section = layer < 2 ? 'input' : layer === 2 ? 'analysis' : 'output'; pickables.push(node); focusNodes.push(node);
    if (layer) for (let offset = 0; offset < 3; offset++) { connections.push(...nodes[(layer - 1) * 7 + (i + offset) % 7].toArray(), ...position.toArray()); }
  }
  neural.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(connections, 3)), lineMaterial));
  const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0x9adeef, transparent: true, opacity: 0, depthWrite: false });
  const pulseRing = new THREE.Mesh(new THREE.TorusGeometry(1, 0.018, 6, 100), pulseMaterial); assembly.add(pulseRing);
  const stages = Array.from({ length: 4 }, () => new THREE.Group()); stages.forEach(group => assembly.add(group));
  const paths = [], streamGroups = [], streamMaterials = [];
  // Each chapter changes the topology, retaining the central AI analysis layer.
  for (let chapter = 0; chapter < 4; chapter++) {
    const chapterPaths = [];
    const count = mobile ? 14 : 22;
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2, y = Math.cos(a) * 2.1, z = Math.sin(a) * 1.5;
      let curve;
      if (chapter === 0) {
        curve = new THREE.CubicBezierCurve3(new THREE.Vector3(-3.8, y, z), new THREE.Vector3(-2.25, y * 0.85, z), new THREE.Vector3(1.7, y * 0.22, z * 0.35), new THREE.Vector3(3.5, y * 0.45, z * 0.6));
      } else if (chapter === 1) {
        curve = new THREE.CubicBezierCurve3(new THREE.Vector3(-3.5, y * 0.65, z), new THREE.Vector3(-0.9, -y, z * 0.3), new THREE.Vector3(0.9, y, -z * 0.3), new THREE.Vector3(3.5, y * 0.65, -z));
      } else if (chapter === 2) {
        const lane = (i - count / 2) * 0.14;
        curve = new THREE.CubicBezierCurve3(new THREE.Vector3(-3.7, y, z), new THREE.Vector3(-1.2, y * 0.35, z * 0.35), new THREE.Vector3(1.6, lane, 0), new THREE.Vector3(3.8, lane, 0));
      } else {
        const r = 1.8 + (i % 5) * 0.18, points = [];
        for (let j = 0; j <= 70; j++) { const t = j / 70 * Math.PI * 2; points.push(new THREE.Vector3(Math.cos(t) * r * 1.32, Math.sin(t) * r * 0.66, Math.sin(t + a) * 0.65)); }
        curve = new THREE.CatmullRomCurve3(points, true);
      }
      chapterPaths.push(curve);
      const wire = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(90)), i % 4 === 0 ? fineMaterial : lineMaterial); stages[chapter].add(wire);
      const startNode = new THREE.Mesh(nodeGeometry, nodeMaterial); startNode.position.copy(curve.getPoint(0)); stages[chapter].add(startNode);
      const endNode = new THREE.Mesh(nodeGeometry, cyanMaterial); endNode.position.copy(curve.getPoint(1)); stages[chapter].add(endNode);
    }
    paths.push(chapterPaths);
    const trailLength = 20, array = new Float32Array(count * trailLength * 3), colors = new Float32Array(array.length);
    for (let i = 0; i < count; i++) for (let j = 0; j < trailLength; j++) {
      const intensity = Math.pow(1 - j / trailLength, 1.4);
      const color = new THREE.Color(i % 6 === 0 ? 0xebd8b4 : 0x92dced).multiplyScalar(0.16 + intensity * 0.84);
      color.toArray(colors, (i * trailLength + j) * 3);
    }
    const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(array, 3)).setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const streams = new THREE.Points(geometry, new THREE.PointsMaterial({ map: glowTexture, size: 0.16, vertexColors: true, transparent: true, opacity: 0.96, blending: THREE.AdditiveBlending, depthWrite: false }));
    streamMaterials.push(streams.material); streams.frustumCulled = false; stages[chapter].add(streams); streamGroups.push({ array, geometry, trailLength });
  }
  const dustArray = new Float32Array((mobile ? 100 : 220) * 3);
  for (let i = 0; i < dustArray.length / 3; i++) { const a = i * 2.39996; dustArray[i * 3] = Math.cos(a) * (3 + i % 9 * 0.23); dustArray[i * 3 + 1] = Math.sin(a * 1.4) * 2.8; dustArray[i * 3 + 2] = Math.sin(a) * 2.2; }
  const dust = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(dustArray, 3)), new THREE.PointsMaterial({ size: 0.014, color: 0x5489a8, transparent: true, opacity: 0.55 })); scene.add(dust);

  let mode = initialMode, paused = initiallyPaused, visible = true, stopped = false, lost = false;
  let frame = 0, last = 0, elapsed = 0, flowTime = 0, intro = 0, scroll = 0;
  let speed = 1, burst = 0, zoom = 1, smoothZoom = 1, dragYaw = 0, dragPitch = 0, guided = false, guidedTime = 0;
  let activePointer = null, originX = 0, originY = 0, lastX = 0, lastY = 0, moved = false, selected = null;
  const anchors = { input: new THREE.Vector3(-2.5, 1.95, 0), analysis: new THREE.Vector3(0, 1.95, 0), output: new THREE.Vector3(2.5, 1.95, 0) };
  const projected = new THREE.Vector3();
  const focus = section => {
    selected = section;
    canvas.dataset.focus = section || 'overview';
    focusNodes.forEach(node => { node.material = node.userData.section === section ? focusMaterial : nodeMaterial; node.scale.setScalar(node.userData.section === section ? 1.7 : 1); });
  };
  const pointer = new THREE.Vector2(), smoothPointer = new THREE.Vector2(), sample = new THREE.Vector3();
  const select = next => { mode = next; stages.forEach((group, index) => { group.visible = index === next; }); intro = paused ? 1 : 0; };
  select(mode);
  const draw = (now, force = false) => {
    if (stopped || lost) return;
    const dt = Math.min((now - last) / 1000 || 0.016, 0.05); last = now;
    if (!paused) {
      elapsed += dt; flowTime += dt * (speed + burst * 2.5); burst = Math.max(0, burst - dt * 0.55);
      intro = Math.min(1, intro + dt * 1.5);
      if (guided) { guidedTime += dt; if (guidedTime >= 6) { guidedTime = 0; callbacks.onMode?.((mode + 1) % 4); burst = 1; } }
    } else intro = 1;
    const eased = 1 - Math.pow(1 - intro, 3);
    smoothPointer.lerp(pointer, 0.045);
    assembly.scale.setScalar(0.83 + eased * 0.17);
    assembly.rotation.set(0.15 + dragPitch + (paused ? 0 : smoothPointer.y * 0.13), -0.2 + dragYaw + (paused ? 0 : smoothPointer.x * 0.22) + Math.sin(elapsed * 0.18) * 0.08, -0.12 + scroll * 0.18);
    assembly.position.y = Math.sin(elapsed * 0.45) * 0.07 + scroll * 0.2;
    core.rotation.y = elapsed * 0.13; coreLattice.rotation.y = -elapsed * 0.1; coreEdges.rotation.y = core.rotation.y;
    halo.rotation.z = elapsed * 0.14; halo2.rotation.z = -elapsed * 0.1;
    neural.rotation.x = Math.sin(elapsed * 0.12) * 0.12;
    core.scale.setScalar(1 + Math.sin(elapsed * 1.6) * 0.025);
    smoothZoom += (zoom - smoothZoom) * (paused ? 1 : 0.09);
    camera.position.z = (Math.max(9.5, 11.2 / camera.aspect) - scroll * 0.6) / smoothZoom;
    core.material.emissive.setHex(selected === 'analysis' ? 0x2c687c : 0x163647); core.material.emissiveIntensity = 0.25 + burst * 1.5;
    pulseRing.visible = burst > 0; pulseRing.scale.setScalar(1 + (1 - burst) * 2.4); pulseMaterial.opacity = burst * 0.7;
    streamMaterials[mode].size = 0.16 + burst * 0.1;
    canvas.dataset.zoom = zoom.toFixed(2);
    canvas.dataset.speed = speed.toFixed(1); canvas.dataset.guided = String(guided);
    const group = streamGroups[mode];
    paths[mode].forEach((curve, i) => {
      for (let j = 0; j < group.trailLength; j++) {
        const t = ((flowTime * (0.075 + i % 4 * 0.008) + i * 0.071 - j * 0.006) % 1 + 1) % 1;
        curve.getPoint(t, sample); sample.toArray(group.array, (i * group.trailLength + j) * 3);
      }
    });
    group.geometry.attributes.position.needsUpdate = true;
    dust.rotation.y = elapsed * 0.012;
    if (visible || force) {
      renderer.render(scene, camera);
      const locations = {};
      for (const [name, anchor] of Object.entries(anchors)) { projected.copy(anchor).applyMatrix4(assembly.matrixWorld).project(camera); locations[name] = { x: (projected.x * 0.5 + 0.5) * canvas.clientWidth, y: (-projected.y * 0.5 + 0.5) * canvas.clientHeight }; }
      callbacks.onProject?.(locations);
    }
  };
  const wake = () => { if (!stopped && !lost && !paused && visible && !document.hidden && !frame) { last = performance.now(); frame = requestAnimationFrame(loop); } };
  const loop = now => { frame = 0; if (stopped || lost || paused || !visible || document.hidden) return; draw(now); frame = requestAnimationFrame(loop); };
  const resize = () => { const rect = canvas.getBoundingClientRect(); if (!rect.width || !rect.height || lost) return; renderer.setSize(rect.width, rect.height, false); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); draw(performance.now(), true); };
  const onPointer = event => {
    if (activePointer === event.pointerId) {
      if (Math.hypot(event.clientX - originX, event.clientY - originY) > 5) moved = true;
      dragYaw += (event.clientX - lastX) * 0.006;
      dragPitch = THREE.MathUtils.clamp(dragPitch + (event.clientY - lastY) * 0.003, -0.65, 0.65);
      lastX = event.clientX; lastY = event.clientY;
      if (paused) draw(performance.now(), true);
      canvas.dataset.dragged = 'true';
    }
    if (event.pointerType === 'touch') return;
    const r = canvas.getBoundingClientRect(); pointer.set((event.clientX - r.left) / r.width * 2 - 1, -((event.clientY - r.top) / r.height * 2 - 1));
  };
  const onDown = event => {
    if (event.button !== 0 || activePointer !== null) return;
    activePointer = event.pointerId; originX = lastX = event.clientX; originY = lastY = event.clientY; moved = false;
    canvas.setPointerCapture(event.pointerId); canvas.classList.add('ax-dragging');
  };
  const onUp = event => {
    if (activePointer !== event.pointerId) return;
    if (!moved && event.type !== 'pointercancel') {
      const r = canvas.getBoundingClientRect();
      raycaster.setFromCamera(new THREE.Vector2((event.clientX - r.left) / r.width * 2 - 1, -((event.clientY - r.top) / r.height * 2 - 1)), camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      if (hit) callbacks.onSelect?.(hit.object.userData.section);
    }
    activePointer = null; canvas.classList.remove('ax-dragging');
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  };
  const onLeave = () => pointer.set(0, 0);
  const onScroll = () => { const r = hero.getBoundingClientRect(); scroll = Math.min(1, Math.max(0, -r.top / r.height)); };
  const io = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) { draw(performance.now(), true); wake(); } else { cancelAnimationFrame(frame); frame = 0; } }); io.observe(hero);
  const ro = new ResizeObserver(resize); ro.observe(canvas);
  const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake(); };
  const onLost = event => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; canvas.dataset.state = 'fallback'; };
  const onRestored = () => { lost = false; canvas.dataset.state = 'ready'; resize(); wake(); };
  canvas.addEventListener('pointermove', onPointer, { passive: true }); canvas.addEventListener('pointerdown', onDown); canvas.addEventListener('pointerup', onUp); canvas.addEventListener('pointercancel', onUp);
  hero.addEventListener('pointermove', onPointer, { passive: true }); hero.addEventListener('pointerleave', onLeave);
  window.addEventListener('scroll', onScroll, { passive: true }); document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onLost); canvas.addEventListener('webglcontextrestored', onRestored);
  resize(); wake(); canvas.dataset.state = 'ready';
  return {
    select(next) { select(next); draw(performance.now(), true); wake(); },
    focus(section) { focus(section); draw(performance.now(), true); },
    speed(value) { speed = THREE.MathUtils.clamp(value, 0.3, 2.5); draw(performance.now(), true); },
    zoom(delta) { zoom = THREE.MathUtils.clamp(zoom + delta, 0.7, 1.65); draw(performance.now(), true); },
    turn(dx, dy) { dragYaw += dx; dragPitch = THREE.MathUtils.clamp(dragPitch + dy, -0.65, 0.65); draw(performance.now(), true); },
    pulse() { burst = 1; canvas.dataset.pulse = String(Number(canvas.dataset.pulse || 0) + 1); draw(performance.now(), true); wake(); },
    auto(value) { guided = value; guidedTime = 0; draw(performance.now(), true); },
    reset() { dragYaw = dragPitch = 0; zoom = 1; focus(null); draw(performance.now(), true); },
    pause(value) { paused = value; if (paused) { cancelAnimationFrame(frame); frame = 0; draw(performance.now(), true); } else wake(); },
    dispose() {
      stopped = true; cancelAnimationFrame(frame); io.disconnect(); ro.disconnect();
      canvas.removeEventListener('pointermove', onPointer); canvas.removeEventListener('pointerdown', onDown); canvas.removeEventListener('pointerup', onUp); canvas.removeEventListener('pointercancel', onUp);
      hero.removeEventListener('pointermove', onPointer); hero.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll); document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost); canvas.removeEventListener('webglcontextrestored', onRestored);
      const geometries = new Set([orbGeometry,nodeGeometry]), materials = new Set([lineMaterial,fineMaterial,cyanMaterial,metal,nodeMaterial,focusMaterial]);
      scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); });
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose()); envTarget.dispose(); glowTexture.dispose(); renderer.dispose();
      // Release detached contexts, retaining connected canvases during development refresh.
      if (!canvas.isConnected) renderer.forceContextLoss();
    },
  };
}
