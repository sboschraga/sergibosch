'use client';
import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from 'ogl';
import './FlyingPosters.css';

// 1. VERTEX SHADER (Zona morta i rotació)
const vertexShader = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform float uPosition;
uniform float uDistortion;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
varying vec2 vUv;
float PI = 3.141592653589793238;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat4(
      oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                              0.0,                                0.0,                                1.0
    );
}
vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}
void main() {
    vUv = uv;
    vec3 newpos = position;
    float norm = 0.5;
    float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
    float deadzone = 0.25; 
    float progress = uPosition * 1.5; 
    float signProgress = sign(progress);
    float absProgress = abs(progress);
    if (absProgress < deadzone) {
        progress = 0.0; 
    } else {
        progress = signProgress * (absProgress - deadzone); 
    }
    progress += offset * 0.02 * uDistortion;
    float angle = progress * PI;
    newpos = rotate(newpos, rotationAxis, angle);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

// 2. FRAGMENT SHADER (Efecte mirall al revés)
const fragmentShader = `
precision highp float;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;
varying vec2 vUv;
void main() {
    vec2 imageSize = uImageSize;
    vec2 planeSize = uPlaneSize;
    float imageAspect = imageSize.x / imageSize.y;
    float planeAspect = planeSize.x / planeSize.y;
    vec2 scale = vec2(1.0, 1.0);
    if (planeAspect > imageAspect) {
        scale.x = imageAspect / planeAspect;
    } else {
        scale.y = planeAspect / imageAspect;
    }
    vec2 uv = vUv * scale + (1.0 - scale) * 0.5;
    if (!gl_FrontFacing) {
        uv.x = 1.0 - uv.x;
    }
    gl_FragColor = texture2D(tMap, uv);
}
`;

function AutoBind(self, { include, exclude } = {}) {
  const getAllProperties = object => {
    const properties = new Set();
    do {
      for (const key of Reflect.ownKeys(object)) {
        properties.add([object, key]);
      }
    } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);
    return properties;
  };
  const filter = key => {
    const match = pattern => (typeof pattern === 'string' ? key === pattern : pattern.test(key));
    if (include) return include.some(match);
    if (exclude) return !exclude.some(match);
    return true;
  };
  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === 'constructor' || !filter(key)) continue;
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
    if (descriptor && typeof descriptor.value === 'function') {
      self[key] = self[key].bind(self);
    }
  }
  return self;
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

class Media {
  constructor({ gl, geometry, scene, screen, viewport, image, length, index, planeWidth, planeHeight, distortion }) {
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.image = image;
    this.length = length;
    this.index = index;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      fragment: fragmentShader,
      vertex: vertexShader,
      uniforms: {
        tMap: { value: texture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] },
        uDistortion: { value: this.distortion },
      },
      cullFace: false
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  setScale() {
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;
    this.plane.position.x = 0;
    this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }
    this.setScale();
    this.padding = 2;
    this.height = this.plane.scale.y + this.padding;
    this.y = -this.index * this.height; // El segon element va a sota
  }

  update(scroll) {
    this.plane.position.y = this.y + scroll.current;
    let normY = this.plane.position.y / this.viewport.height;
    this.program.uniforms.uPosition.value = normY;
  }
}

class Canvas {
  constructor({ container, canvas, items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ }) {
    this.container = container;
    this.canvas = canvas;
    this.items = items;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.distortion = distortion;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.maxScroll = 0;
    this.cameraFov = cameraFov;
    this.cameraZ = cameraZ;
    this.rafId = null; // Guardem l'ID per aturar l'animació si cal
    AutoBind(this);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    this.update();
    this.addEventListeners();
    this.createPreloader();
  }

  createRenderer() {
    this.renderer = new Renderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2)
    });
    this.gl = this.renderer.gl;
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = this.cameraFov;
    this.camera.position.z = this.cameraZ;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 1, widthSegments: 100 });
  }

  createMedias() {
    this.medias = this.items.map((image, index) => {
      return new Media({
        gl: this.gl, geometry: this.planeGeometry, scene: this.scene,
        screen: this.screen, viewport: this.viewport, image,
        length: this.items.length, index, planeWidth: this.planeWidth,
        planeHeight: this.planeHeight, distortion: this.distortion
      });
    });
  }

  createPreloader() {
    this.loaded = 0;
    if (!this.items.length) return;
    this.items.forEach(src => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = src;
      image.onload = () => {
        this.loaded += 1;
        if (this.loaded === this.items.length) {
          document.documentElement.classList.remove('loading');
          document.documentElement.classList.add('loaded');
        }
      };
    });
  }

  onResize() {
    const rect = this.container.getBoundingClientRect();
    this.screen = { width: rect.width, height: rect.height };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { height, width };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  onWheel(e) {
    if (window.scrollY > 10) {
      this.scroll.target = this.maxScroll;
      return;
    }
    const speed = e.deltaY;
    const newTarget = this.scroll.target + speed * 0.005;

    if (newTarget <= 0 && speed < 0) {
      this.scroll.target = 0;
      return; 
    }
    if (newTarget >= this.maxScroll && speed > 0) {
      this.scroll.target = this.maxScroll;
      return; 
    }
    e.preventDefault();
    this.scroll.target = Math.max(0, Math.min(newTarget, this.maxScroll));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    if (this.medias && this.medias.length > 0) {
        this.itemHeight = this.medias[0].height;
        this.maxScroll = (this.items.length - 1) * this.itemHeight;
    }
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    
    // Evitem memory leaks de React guardant el requestAnimationFrame
    this.rafId = requestAnimationFrame(this.update); 
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('wheel', this.onWheel, { passive: false });
  }

  destroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
    if (this.rafId) {
        cancelAnimationFrame(this.rafId);
    }
  }
}

export default function FlyingPosters({
  items = [], planeWidth = 320, planeHeight = 320, distortion = 3,
  scrollEase = 0.05, cameraFov = 45, cameraZ = 20, className, ...props
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    instanceRef.current = new Canvas({
      container: containerRef.current, canvas: canvasRef.current,
      items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ
    });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [items, planeWidth, planeHeight, distortion, scrollEase, cameraFov, cameraZ]);

  return (
    <div ref={containerRef} className={`posters-container ${className || ''}`} {...props}>
      <canvas ref={canvasRef} className="posters-canvas" />
    </div>
  );
}