<script setup>
  import {onMounted, ref} from "vue"
  import * as THREE from "three"
  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
  import {registerDragEvents} from "../urdfScripts/ArmPreviewDragAndDrop"
  import URDFManipulator from "../urdfScripts/urdf-manipulator-element"
  customElements.define('urdf-viewer', URDFManipulator);

  const viewer = ref(null)
  const sliders = ref({})
  const originalNoAutoRecenter = ref(null)
  const sliderList = ref(null)
  const radiansToggle = ref(null)
  const animToggle = ref(null)
  const controlsel = ref(null)

  const DEG2RAD = Math.PI / 180
  const RAD2DEG = 1 / DEG2RAD

  const setColor = color => {
    document.body.style.backgroundColor = color;
    viewer.value.highlightColor = '#' + (new THREE.Color(0xffffff)).lerp(new THREE.Color(color), 0.35).getHexString();
  }

  const handleLimitsToggle = (e) => {
    e.target.classList.toggle('checked');
    viewer.value.ignoreLimits = e.target.classList.contains('checked');
  }

  const handleRadiansToggle = (e) => {
    e.target.classList.toggle('checked');
    Object
      .values(sliders.value)
      .forEach(sl => sl.update());
  }

  const handleCollisionToggle = (e) => {
    e.target.classList.toggle('checked');
    viewer.value.showCollision = e.target.classList.contains('checked');
  }

  const handleAutocenterToggle = (e) => {
    e.target.classList.toggle('checked');
    viewer.value.noAutoRecenter = !e.target.classList.contains('checked');
  }

  const upSelectHandler = (e) => {
    viewer.value.up = e.target.value
  }

  const handleControlsToggle = () => {
    controlsel.value.classList.toggle('hidden')
  }

  const updateAngles = () => {

    if (!viewer.value.setJointValue) return;

    // reset everything to 0 first
    const resetJointValues = viewer.value.angles;
    for (const name in resetJointValues) resetJointValues[name] = 0;
    viewer.value.setJointValues(resetJointValues);

    // animate the legs
    const time = Date.now() / 3e2;
    for (let i = 1; i <= 6; i++) {

      const offset = i * Math.PI / 3;
      const ratio = Math.max(0, Math.sin(time + offset));

      viewer.value.setJointValue(`HP${ i }`, THREE.MathUtils.lerp(30, 0, ratio) * DEG2RAD);
      viewer.value.setJointValue(`KP${ i }`, THREE.MathUtils.lerp(90, 150, ratio) * DEG2RAD);
      viewer.value.setJointValue(`AP${ i }`, THREE.MathUtils.lerp(-30, -60, ratio) * DEG2RAD);

      viewer.value.setJointValue(`TC${ i }A`, THREE.MathUtils.lerp(0, 0.065, ratio));
      viewer.value.setJointValue(`TC${ i }B`, THREE.MathUtils.lerp(0, 0.065, ratio));

      viewer.value.setJointValue(`W${ i }`, window.performance.now() * 0.001);
    }

  }

  const updateLoop = () => {

      if (animToggle.value.classList.contains('checked')) {
        updateAngles()
      }

      requestAnimationFrame(updateLoop);
  }


  const updateList = () => {

    document.querySelectorAll('#urdf-options li[urdf]').forEach(el => {

      el.addEventListener('click', e => {

        const urdf = e.target.getAttribute('urdf');
        const color = e.target.getAttribute('color');

        viewer.value.up = '+Z';
        document.getElementById('up-select').value = viewer.value.up;
        viewer.value.urdf = urdf;
        animToggle.value.classList.add('checked');
        setColor(color);
      })


    })

  }

  const initializeWebComponentsScript = () => {
    const script = document.createElement('script')
    script.setAttribute("src", "https://unpkg.com/@webcomponents/webcomponentsjs@2.4.3/webcomponents-bundle.js")
    document.body.appendChild(script)
  }

  onMounted(() => {
    initializeWebComponentsScript()

    viewer.value.addEventListener("urdf-change", () => {
      Object
        .values(sliders.value)
        .forEach(sl => sl.remove())
      sliders.value = {}
    })

    viewer.value.addEventListener("angle-change", e => {
      console.log("test")
      if (sliders.value[e.detail]) sliders.value[e.detail].update()
    })

    viewer.value.addEventListener("joint-mouseover", e => {
      console.log("test")
      const j = document.querySelector(`controls li[joint-name="${ e.detail }"]`);
      if (j) j.setAttribute('robot-hovered', true);
    })

    viewer.value.addEventListener('joint-mouseout', e => {
      console.log("test")
      const j = document.querySelector(`controls li[joint-name="${ e.detail }"]`);
      if (j) j.removeAttribute('robot-hovered');
    })

    viewer.value.addEventListener('manipulate-start', e => {
      console.log("test")
      const j = document.querySelector(`controls li[joint-name="${ e.detail }"]`);
      if (j) {
        j.scrollIntoView({ block: 'nearest' });
        window.scrollTo(0, 0);
      }

      originalNoAutoRecenter.value = viewer.value.noAutoRecenter;
      viewer.value.noAutoRecenter = true;

    });

    viewer.value.addEventListener('manipulate-end', () => {
      console.log("test")
      viewer.value.noAutoRecenter = originalNoAutoRecenter.value;
    })

    viewer.value.addEventListener('urdf-processed', () => {
      console.log("test")
      const r = viewer.value.robot;
      Object
        .keys(r.joints)
        .sort((a, b) => {

          const da = a.split(/[^\d]+/g).filter(v => !!v).pop();
          const db = b.split(/[^\d]+/g).filter(v => !!v).pop();

          if (da !== undefined && db !== undefined) {
            const delta = parseFloat(da) - parseFloat(db);
            if (delta !== 0) return delta;
          }

          if (a > b) return 1;
          if (b > a) return -1;
          return 0;

        })
        .map(key => r.joints[key])
        .forEach(joint => {
          const li = document.createElement('li');
          li.innerHTML =
            `
            <span title="${ joint.name }">${ joint.name }</span>
            <input type="range" value="0" step="0.0001"/>
            <input type="number" step="0.0001" />
            `;
          li.setAttribute('joint-type', joint.jointType);
          li.setAttribute('joint-name', joint.name);

          sliderList.value.appendChild(li);

          // update the joint display
          const slider = li.querySelector('input[type="range"]');
          const input = li.querySelector('input[type="number"]');
          li.update = () => {
            const degMultiplier = radiansToggle.value.classList.contains('checked') ? 1.0 : RAD2DEG;
            let angle = joint.angle;

            if (joint.jointType === 'revolute' || joint.jointType === 'continuous') {
              angle *= degMultiplier;
            }

            if (Math.abs(angle) > 1) {
              angle = angle.toFixed(1);
            } else {
              angle = angle.toPrecision(2);
            }

            input.value = parseFloat(angle);

            // directly input the value
            slider.value = joint.angle;

            if (viewer.value.ignoreLimits || joint.jointType === 'continuous') {
              slider.min = -6.28;
              slider.max = 6.28;

              input.min = -6.28 * degMultiplier;
              input.max = 6.28 * degMultiplier;
            } else {
              slider.min = joint.limit.lower;
              slider.max = joint.limit.upper;

              input.min = joint.limit.lower * degMultiplier;
              input.max = joint.limit.upper * degMultiplier;
            }
          };

          switch (joint.jointType) {

            case 'continuous':
            case 'prismatic':
            case 'revolute':
              break;
            default:
              li.update = () => {};
              input.remove();
              slider.remove();
          }

          slider.addEventListener('input', () => {
            console.log("test")
            viewer.value.setJointValue(joint.name, slider.value);
            li.update();
          });

          input.addEventListener('change', () => {
            console.log("test")
            const degMultiplier = radiansToggle.value.classList.contains('checked') ? 1.0 : RAD2DEG;
            viewer.value.setJointValue(joint.name, input.value * degMultiplier);
            li.update();
          });

          li.update();

          sliders.value[joint.name] = li
        })
    });

    document.addEventListener('WebComponentsReady', () => {
      console.log("test")
      viewer.value.loadMeshFunc = (path, manager, done) => {
        console.log("test")
        const ext = path.split(/\./g).pop().toLowerCase();
        switch (ext) {
          case 'gltf':
          case 'glb':
            new GLTFLoader(manager).load(
              path,
              result => done(result.scene),
              null,
              err => done(null, err),
            );
            break;
          case 'obj':
            new OBJLoader(manager).load(
              path,
              result => done(result),
              null,
              err => done(null, err),
            );
            break;
          case 'dae':
            new ColladaLoader(manager).load(
              path,
              result => done(result.scene),
              null,
              err => done(null, err),
            );
            break;
          case 'stl':
            new STLLoader(manager).load(
              path,
              result => {
                const material = new THREE.MeshPhongMaterial();
                const mesh = new THREE.Mesh(result, material);
                done(mesh);
              },
              null,
              err => done(null, err),
            );
            break;

        }

      };

      document.querySelector('li[urdf]').dispatchEvent(new Event('click'));

      if (/javascript\/example\/bundle/i.test(window.location)) {
        viewer.value.package = '../../../urdf';
      }

      registerDragEvents(viewer.value, () => {
        console.log("test")
        setColor('#263238');
        animToggle.value.classList.remove('checked');
        updateList();
      });

    })
    updateList()
    document.addEventListener('WebComponentsReady', () => {
      animToggle.value.addEventListener('click', () => animToggle.value.classList.toggle('checked'))

      // stop the animation if user tried to manipulate the model
      viewer.value.addEventListener('manipulate-start', e => animToggle.value.classList.remove('checked'))
      viewer.value.addEventListener('urdf-processed', e => updateAngles())
      updateLoop()
      viewer.value.camera.position.set(-5.5, 3.5, 5.5)
    })
  })
</script>

<template>
  <div id="menu">
    <div style="height: 32px"/>
    <ul id="urdf-options">
      <li urdf="/urdf/Ares/urdf/new_arm.urdf" color="#E91E63">Ares</li>
      <li urdf="/urdf/TriATHLETE/urdf/TriATHLETE_flipped.URDF" color="#009688">TriATHLETE</li>
    </ul>

    <div id="controls" ref="controlsel" class="hidden">
      <div @click="handleControlsToggle" id="toggle-controls"></div>
      <div>Drag and drop URDF files or folders! <br/> (Chrome Only)</div>
      <div @click="handleLimitsToggle" id="ignore-joint-limits" class="toggle">Ignore Joint Limits</div>
      <div ref="radiansToggle" @click="handleRadiansToggle" id="radians-toggle" class="toggle">Use Radians</div>
      <div @click="handleAutocenterToggle" id="autocenter-toggle" class="toggle checked">Autocenter</div>
      <div @click="handleCollisionToggle" id="collision-toggle" class="toggle">Show Collision</div>
      <div id="do-animate" ref="animToggle" class="toggle">Animate Joints</div>
      <label>
        Up Axis
        <select @change="upSelectHandler" id="up-select">
          <option value="+X">+X</option>
          <option value="-X">-X</option>
          <option value="+Y">+Y</option>
          <option value="-Y">-Y</option>
          <option value="+Z" selected>+Z</option>
          <option value="-Z">-Z</option>
        </select>
      </label>
      <ul ref="sliderList"></ul>
    </div>
  </div>
  <urdf-viewer ref="viewer" up="+Z" display-shadow tabindex="0"></urdf-viewer>
</template>

<style scoped>

html, body, urdf-viewer {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  font-family: "Roboto", helvetica, arial, sans-serif;
  animation: fade 3s ease;
  color: white;
  user-select: none;
}

select {
  font-family: "Roboto", helvetica, arial, sans-serif;
  background: rgba(255,255,255,0.25);
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 300;
  outline: none;
  float: right;
}

option {
  color: #888;
}

input[type="number"] {
  color: white;
  border: none;
  font-weight: 300;
  background: rgba(255,255,255,0.25);
  padding: 1px 2px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

input[type=range] {
  -webkit-appearance: none;
  border: none;
  outline: none;
  width: 100%;
  flex: 1;
  height: 16px;
  background-color: transparent;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 1px;
  background: white;
  border: none;
  border-radius: 5px;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: white;
  margin-top: -5px;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: white;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 1px;
  background: white;
  border: none;
  border-radius: 5px;
}
input[type=range]::-moz-range-thumb {
  border: none;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: white;
}

input[type=range]:-moz-focusring{
  outline: 1px solid white;
  outline-offset: -1px;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 1px;
  background: white;
  border-radius: 10px;
  color: transparent;
  border: none;
  outline: none;
}
input[type=range]::-ms-thumb {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: white;
  border: none;
  outline: none;
  margin-top: 2px;
}

input:focus {
  outline: none;
  opacity: 1;
}

#up-select {
  width: 70px;
  margin: 0 20px;
}

#menu {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  margin: 20px;
}

#urdf-options {
  text-overflow: ellipsis;
}

#urdf-options li {
  cursor: pointer;
  opacity: 0.5;
  font-size: 20px;
  font-weight: 100;
}

#urdf-options li:hover {
  opacity: 0.75;
}

#controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0;
  transition: 0.5s opacity ease;
  overflow: hidden;
}

#controls > * {
  margin: 5px 0;
}

#controls #toggle-controls {
  margin-top: 0;
  margin-bottom: 10px;
  text-align: right;
  transition: 0.1s opacity linear;
  border-top: 1px solid white;
}

#controls #toggle-controls:hover {
  text-decoration: underline;
  cursor: pointer;
}

#controls #toggle-controls:before {
  content: "hide controls";
  font-size: 12px;
  font-weight: normal;
}

/* hidden state */
#controls.hidden #toggle-controls:before {
  content: "show controls";
}


#controls.hidden > *:not(#toggle-controls) {
  display: none;
}

#controls.hidden #toggle-controls {
  opacity: 0.5;
}

/* list of joint sliders */
#controls ul {
  flex: 1;
  overflow-y: auto;
}

#controls li {
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 1px 0;

  width: 100%;
  user-select: text;

  transition: background 0.25s ease;
}

#controls li[robot-hovered] {
  background: rgba(255,255,255,0.35);
}

#controls li span {

  padding: 0 5px;
  max-width: 125px;
  text-overflow: ellipsis;
  overflow: hidden;

}

#controls li input[type="number"] {
  width: 50px;
  overflow: hidden;
}

/* toggle controls */
.toggle {
  padding-left: 25px;
  position: relative;

  cursor: pointer;
}

.toggle:before {
  content: "";
  position: absolute;
  left: 0;
  width: 15px;
  height: 15px;

  border-radius: 10px;
  border: 2px solid white;

  margin-right: 5px;
}

.toggle:after {
  content: "";
  width: 9px;
  height: 9px;

  position: absolute;
  left: 5px;
  top: 5px;
  background: white;
  border-radius: 10px;
  opacity: 0;
}

.toggle:not(.checked):hover:after {
  opacity: 0.25;
}

.toggle.checked:after {
  opacity: 1;
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 700px) {
  #controls {
    display: none;
  }
}

</style>
