# Healynx 3D hero asset

Two real glTF Binary (`.glb`) 3D assets for the Healynx website hero:

- `healynx_hero_desktop.glb` — higher-detail version for desktop and larger screens (about 237 KB).
- `healynx_hero_mobile.glb` — reduced-detail version for phones and lower-powered devices (about 165 KB).

The model is a stylized translucent emerald human bust with neural filaments, glowing nodes, vascular traces, and orbit rings. It is a procedural design asset, not a medically accurate anatomical model.

## Three.js integration

Install `three`, then use the GLTF loader. Select the lighter model on narrow screens and update on resize:

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
let currentModel;
let currentPath = '';
const desktopPath = '/models/healynx_hero_desktop.glb';
const mobilePath = '/models/healynx_hero_mobile.glb';

async function loadHeroModel(scene) {
  const path = window.matchMedia('(max-width: 767px)').matches
    ? mobilePath
    : desktopPath;
  if (path === currentPath) return;
  const gltf = await loader.loadAsync(path);
  if (currentModel) scene.remove(currentModel);
  currentModel = gltf.scene;
  currentModel.position.set(0, 0, 0);
  currentModel.scale.setScalar(1);
  scene.add(currentModel);
  currentPath = path;
}

// Call loadHeroModel(scene) after creating your Three.js scene.
// On resize, call loadHeroModel(scene) again to switch quality variants if needed.
```

## Rendering notes

- Use a dark forest-green or charcoal scene background to match the design.
- Enable soft ambient and directional lighting; the filaments use emissive materials.
- GLB supports physically based materials. Transparency and emissive appearance can vary by viewer/renderer, so tune material opacity and tone mapping to suit your art direction.
- The model has no animation baked in. For subtle motion, rotate the model slightly or animate orbit rings in Three.js.
- The asset is intended for web/mobile hero visuals. It is not rigged and is not a production medical/educational anatomy model.

## Included source

`generate_healynx_model.py` procedurally generates both GLB variants with Python and trimesh.
