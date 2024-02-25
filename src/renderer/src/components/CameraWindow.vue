<template>
    <!-- <div :class="'MainClass'">
Greetings <br/>
Let's go! <br/>
    </div> -->
    <div>
        <h1><b><i>CAMERA</i></b></h1>
        <video class="video" id="videoElement" ref="videoElement" width="640" height="480" autoplay></video>
        <canvas></canvas>

    </div>
</template>




<script>

//import dgram from 'dgram';
//import { createSocket } from 'dgram';
//import dgram from '../../../../node_modules/dgram/package.json';
import io from 'socket.io-client';
import axios from 'axios';
//import socketIo from 'socket.io';
export default {
    name: 'CameraWindow',
    data() {
        return {
            messageFromServer: null,
            pc: null,
            remoteStream: null,
            video:[],
        }
    },
    mounted() {
        //this.initCamera();
        //const socket = io('http://localhost:5555');
        //const videoPlayer = this.$refs.videoPlayer;

        //this.game();
        //this.fetchData();
        /*const videoPlayer = this.$refs.videoElement;
        videoPlayer.srcObject = this.video;*/
        /*navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                var video = document.getElementById("videoElement");
                video.srcObject = stream;
            })
            .catch(function(err) {
                console.log("Kamera erişim hatası: ", err);
            });*/
        //this.initWebRTC();
        //this.magic();
        //this.last();
        this.getVideo();
    },
    methods: {
        async getVideo() {
            try{
                const res = await axios.get('http://localhost:3000/api/video');
                this.video = res.data;
                console.log(this.video);
                this.updateVideo();
            }catch (error) {
                console.error('Kamera erişimi reddedildi: ', error);
            }
            
    },
    updateVideo(){
        const videoPlayer = this.$refs.videoElement;
        videoPlayer.srcObject = this.video;
    },
    
        /*last() {
            const socket = io('http://localhost:6060');
            
            
            socket.on('/api/sendOffer', (req, res) => {
                console.log("hi");
                console.log(res);
            });
            
            /*axios.get('http://localhost:6060', {
                withCredentials: true
            }) .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },*/
        decodeAndShowVideo(encodedData) {
            // Burada kütüphanenin decode işlemini gerçekleştirecek fonksiyonlarını çağırın
            let decodedVideoData = decodeFunction(encodedData);

            // Decode edilmiş veriyi <video> elementine yerleştirme
            // Örneğin, decodedVideoData, bir Blob nesnesi veya bir URL olabilir
            videoElement.src = URL.createObjectURL(decodedVideoData);
        }, receiveEncodedVideoData(encodedData) {
            // Alınan kodlanmış video verisini decode edip gösterme
            decodeAndShowVideo(encodedData);
        },
        magic() {
            let video = this.$refs.videoElement;
            let mediaStream;

            let peerConnection = new RTCPeerConnection();

            const socket = io('http://localhost:6000');
            socket.onmessage = function (event) {
                let encodedVideoData = event.data;
                (encodedVideoData) => {
                    // Burada kütüphanenin decode işlemini gerçekleştirecek fonksiyonlarını çağırın
                    let decodedVideoData = decodeFunction(encodedData);

                    // Decode edilmiş veriyi <video> elementine yerleştirme
                    // Örneğin, decodedVideoData, bir Blob nesnesi veya bir URL olabilir
                    videoElement.src = URL.createObjectURL(decodedVideoData);
                };


                // Alınan kodlanmış video verisini decode etme ve gösterme
                //decodeAndShowVideo(encodedVideoData);
                //hi();
            };
        },

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



        },
        async initWebRTC() {
            this.pc = new RTCPeerConnection();

            this.pc.ontrack = (event) => {
                this.remoteStream = event.streams[0];
                this.$refs.remoteVideo.srcObject = this.remoteStream;
            };

            const offer = await this.pc.createOffer();
            await this.pc.setLocalDescription(offer);

            // globalMsg'deki veriyi alıp offer'a ekleyin (örneğin, bunu bir Base64 dizesi olarak düşünebilirsiniz)
            // Ardından, sunucuya geri göndermek için bir istek yapın ve globalMsg'i ekleyin

            var config = {
                method: 'get',
                url: 'http://localhost:6000',
            }

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });



            /*const answer = await fetch('/api/sendOffer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ offer, globalMsg: this.globalMsg }),
            }).then((res) => res.json());*/


            await this.pc.setRemoteDescription("Hİ");

            console.log('WebRTC connection established');
        },
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