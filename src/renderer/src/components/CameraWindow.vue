<template>
    <!-- <div :class="'MainClass'">
Greetings <br/>
Let's go! <br/>
    </div> -->
    <div>
        <h1><b><i>CAMERA</i></b></h1>
        <video class="video" ref="videoElement" width="640" height="480" autoplay></video>

    </div>
</template>




<script>

//import dgram from 'dgram';
//import { createSocket } from 'dgram';
//import dgram from '../../../../node_modules/dgram/package.json';
import io from 'socket.io-client';
export default {
    name: 'CameraWindow',
    data() {
        return {
            messageFromServer: null,
        }
    },
    mounted() {
        //this.initCamera();
        //const socket = io('http://localhost:5555');
        //const videoPlayer = this.$refs.videoPlayer;

        //this.game();
        this.fetchData();
        const videoPlayer = this.$refs.videoElement;
        videoPlayer.srcObject = this.video;
    },
    methods: {
        game() {
            const socket = io('http://localhost:5555');

            const dgram = required('node:dgram');
            const server = dgram.createSocket('udp4');

            server.on('error', (err) => {
                console.error(`server error:\n${err.stack}`);
                server.close();
            });

            server.on('message', (msg, rinfo) => {
                //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
                const videoPlayer = this.$refs.videoPlayer;
                videoPlayer.srcObject = msg;

            });

            server.on('listening', () => {
                const address = server.address();
                console.log(`server listening ${address.address}:${address.port}`);
            });

            server.bind(3333);
            // Prints: server listening 0.0.0.0:41234
        },
        fetchData() {
                /*axios
                    .get('localhost:6000')
                    .then(response => {
                        res = response.data;
                        console.log(res.globalMsg);

                    })
                    .catch(error => {
                        console.log(error);
                    });*/
                

         
        }
        /*async initCamera() {
            try {
                //const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                this.$refs.videoElement.srcObject = stream;
            } catch (error) {
                console.error('Kamera erişimi reddedildi: ', error);
            }
        }*/
    },



}
</script>



<style scoped>
/*.MainClass {}*/

h1 {
    text-align: center;
    color: #fff;
    font-family: comic;
    font-size: 2rem;
}

.video {
    display: block;
    margin: 0 auto;
    border: 1px solid #000;
}
</style>