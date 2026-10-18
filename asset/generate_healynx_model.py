import math, random, os
import numpy as np
import trimesh
from trimesh.visual.material import PBRMaterial

OUT = os.path.dirname(os.path.abspath(__file__))
random.seed(18)
np.random.seed(18)

# Materials use glTF metallic/roughness PBR properties. Translucency is supported by glTF viewers.
glass = PBRMaterial(name='EmeraldTranslucentGlass', baseColorFactor=[80, 255, 205, 105], metallicFactor=0.18, roughnessFactor=0.22, alphaMode='BLEND', doubleSided=True, emissiveFactor=[0.01, 0.12, 0.07])
glow = PBRMaterial(name='MintNeuralGlow', baseColorFactor=[70, 255, 190, 255], metallicFactor=0.05, roughnessFactor=0.3, emissiveFactor=[0.08, 0.9, 0.48])
soft_glow = PBRMaterial(name='SoftMintHighlights', baseColorFactor=[150, 255, 225, 235], metallicFactor=0.1, roughnessFactor=0.28, emissiveFactor=[0.025, 0.32, 0.2])
dark = PBRMaterial(name='DeepGlassDetails', baseColorFactor=[7, 28, 25, 255], metallicFactor=0.3, roughnessFactor=0.25)


def uv_sphere(name, center, scale, material, subdivisions=2):
    m = trimesh.creation.icosphere(subdivisions=subdivisions, radius=1.0)
    m.apply_scale(scale)
    m.apply_translation(center)
    m.visual = trimesh.visual.TextureVisuals(material=material)
    m.metadata['name'] = name
    return m


def cylinder_between(a, b, radius, material, sections=7):
    a, b = np.array(a, dtype=float), np.array(b, dtype=float)
    vec = b - a
    length = np.linalg.norm(vec)
    if length < 1e-6:
        return None
    m = trimesh.creation.cylinder(radius=radius, height=length, sections=sections)
    m.apply_transform(trimesh.geometry.align_vectors([0, 0, 1], vec / length))
    m.apply_translation((a+b)/2)
    m.visual = trimesh.visual.TextureVisuals(material=material)
    return m


def tube_polyline(points, radius, material, sections=5):
    pieces=[]
    for a,b in zip(points[:-1], points[1:]):
        c=cylinder_between(a,b,radius,material,sections)
        if c is not None: pieces.append(c)
    return pieces


def make_scene(mobile=False):
    scene = trimesh.Scene()
    def add(mesh, name):
        if mesh is None: return
        scene.add_geometry(mesh, node_name=name, geom_name=name)

    # Bust silhouette: shoulders, chest, neck, cranium and jaw.
    add(uv_sphere('ShoulderSilhouette',(0,0,0.88),(1.23,0.48,0.62),glass,2),'shoulders')
    add(uv_sphere('UpperChest',(0,0.015,0.48),(0.82,0.40,0.48),glass,2),'chest')
    neck = trimesh.creation.cone(radius=0.39, height=1.18, sections=24)
    neck.apply_translation((0,0,1.55))
    neck.visual=trimesh.visual.TextureVisuals(material=glass)
    add(neck,'neck')
    add(uv_sphere('Cranium',(0,0.0,2.72),(0.66,0.57,0.91),glass,3),'head_cranium')
    add(uv_sphere('Jaw',(0,0.13,2.25),(0.49,0.48,0.47),glass,2),'jaw')
    # Facial anatomy, kept intentionally stylized for a clean, non-photoreal 3D hero.
    add(uv_sphere('NoseBridge',(0,0.52,2.57),(0.105,0.19,0.27),soft_glow,2),'nose_bridge')
    add(uv_sphere('NoseTip',(0,0.63,2.43),(0.14,0.13,0.10),glass,2),'nose_tip')
    for side in [-1,1]:
        add(uv_sphere('Ear',(side*0.64,0.02,2.52),(0.12,0.16,0.23),glass,2),f'ear_{side}')
        add(uv_sphere('EyeSocket',(side*0.235,0.49,2.70),(0.115,0.045,0.065),dark,2),f'eye_socket_{side}')
        add(uv_sphere('EyeGlow',(side*0.235,0.535,2.70),(0.035,0.018,0.025),glow,2),f'eye_glow_{side}')
        add(uv_sphere('Brow',(side*0.235,0.48,2.80),(0.16,0.055,0.035),glass,2),f'brow_{side}')
    # A subtle mouth line.
    add(uv_sphere('MouthLine',(0,0.53,2.28),(0.16,0.025,0.025),dark,2),'mouth')

    # Neural mesh mapped over the front of the cranium; green points and connecting filaments.
    # Surface points sit on a front-facing ellipsoid, with slight offsets for dimensionality.
    n = 42 if mobile else 78
    pts=[]
    for i in range(n):
        # bias points toward the visible frontal hemisphere and temple/brain region
        x=random.uniform(-0.54,0.54)
        z=random.uniform(2.32,3.48)
        nx=x/0.66; nz=(z-2.72)/0.91
        q=nx*nx+nz*nz
        if q > 0.92: continue
        y=-0.57*math.sqrt(max(0.03,1-q))-0.018
        pts.append(np.array([x,y,z]))
    # Connect each point to nearby points, creating a neural-network pattern.
    max_edges = 70 if mobile else 145
    edges=[]
    for i,p in enumerate(pts):
        dists=sorted([(np.linalg.norm(p-q),j) for j,q in enumerate(pts) if j!=i and np.linalg.norm(p-q)<0.36])
        for d,j in dists[:2]:
            e=tuple(sorted((i,j)))
            if e not in edges: edges.append(e)
    random.shuffle(edges)
    for idx,(i,j) in enumerate(edges[:max_edges]):
        for seg in tube_polyline([pts[i],pts[j]], 0.008 if mobile else 0.009, glow if idx%4 else soft_glow, 5):
            add(seg,f'neural_filament_{idx}_{len(scene.geometry)}')
    for i,p in enumerate(pts):
        add(uv_sphere('NeuralNode',p,(0.025,0.025,0.025) if i%5==0 else (0.014,0.014,0.014),glow,1),f'neural_node_{i}')

    # Delicate vascular / neural traces over neck and upper chest.
    for side in [-1,1]:
        path=[(side*0.20,-0.34,2.10),(side*0.26,-0.40,1.75),(side*0.40,-0.42,1.30),(side*0.65,-0.39,1.08),(side*0.88,-0.31,0.95)]
        for k,seg in enumerate(tube_polyline(path,0.012,soft_glow,5)):
            add(seg,f'vascular_trace_{side}_{k}')
    # Orbit rings around the head/shoulders, like the reference asset. They are part of the model.
    ring1=trimesh.creation.torus(major_radius=0.91, minor_radius=0.008 if mobile else 0.01, major_sections=64 if mobile else 96, minor_sections=6)
    ring1.apply_transform(trimesh.transformations.rotation_matrix(math.radians(73),[1,0,0]))
    ring1.apply_translation((0,0,2.67)); ring1.visual=trimesh.visual.TextureVisuals(material=soft_glow); add(ring1,'head_orbit_ring')
    ring2=trimesh.creation.torus(major_radius=1.18, minor_radius=0.008 if mobile else 0.011, major_sections=64 if mobile else 96, minor_sections=6)
    ring2.apply_transform(trimesh.transformations.rotation_matrix(math.radians(17),[0,1,0]))
    ring2.apply_transform(trimesh.transformations.rotation_matrix(math.radians(78),[1,0,0]))
    ring2.apply_translation((0,0,1.30)); ring2.visual=trimesh.visual.TextureVisuals(material=glow); add(ring2,'shoulder_orbit_ring')
    # A few brighter anchor nodes on orbit paths.
    for i,loc in enumerate([(-0.90,-0.10,2.92),(0.88,-0.06,2.48),(0.0,-0.55,3.40),(-0.54,-0.25,1.28),(0.72,-0.25,1.47)]):
        add(uv_sphere('OrbitLight',loc,(0.035,0.035,0.035),glow,1),f'orbit_light_{i}')

    scene.metadata['asset'] = 'Healynx translucent neural bust hero model'
    scene.metadata['usage'] = 'WebGL / Three.js / mobile and desktop web'
    return scene

for mobile, filename in [(False,'healynx_hero_desktop.glb'),(True,'healynx_hero_mobile.glb')]:
    scene=make_scene(mobile=mobile)
    path=os.path.join(OUT,filename)
    scene.export(path, file_type='glb')
    print(filename, os.path.getsize(path))
