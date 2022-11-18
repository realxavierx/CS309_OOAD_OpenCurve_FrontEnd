<template>
</template>

<script>
export default {
    
    data() {
        return {
            
        }
    },
    mounted() {
        const s = document.createElement('script');
        s.type = 'module';
        s.id = 'bg'
        s.innerHTML = "import {particlesCursor} from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'\nconst pc = particlesCursor({\nel: document.getElementById('app'),\ngpgpuSize: 512,\ncolors: [0x00ff00, 0x0000ff],\ncolor: 0xff0000,\ncoordScale: 0.5,\nnoiseIntensity: 0.001,\nnoiseTimeCoef: 0.0001,\npointSize: 5,\npointDecay: 0.0025,\nsleepRadiusX: 250,\nsleepRadiusY: 250,\nsleepTimeCoefX: 0.001,\nsleepTimeCoefY: 0.002\n})\ndocument.body.addEventListener('click', () => {\npc.uniforms.uColor.value.set(Math.random() * 0xffffff)\npc.uniforms.uCoordScale.value = 0.001 + Math.random() * 2\npc.uniforms.uNoiseIntensity.value = 0.0001 + Math.random() * 0.001\npc.uniforms.uPointSize.value = 1 + Math.random() * 10\n})"
        document.body.appendChild(s);
    },
    destroyed() {
        var s = document.getElementById("bg")
        s.remove()
    }
}
</script>

<style scoped>
</style>