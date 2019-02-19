<template>
	<div id="board" @click="CreateSticker">
		<img :src="img" class="sticker" v-for="s in stickers" :style="{left:s.left+'px', top:s.top+'px'}"/>
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	import io from "socket.io-client";

	//https://nextshark-vxdsockgvw3ki.stackpathdns.com/wp-content/uploads/2017/12/Milo.jpg
	export default {
		name: 'home',
		data(){
			return{
				socket:io("http://localhost:8800"),
				img:"https://nextshark-vxdsockgvw3ki.stackpathdns.com/wp-content/uploads/2017/12/Milo.jpg",
				stickers:[]
			}
		},
		mounted(){
			//Listen for other user's stickers from the server
			this.socket.on("sticker_on", (data)=>{
				console.log(data);
				this.stickers.push(data);
			})
		},
		methods:{
			CreateSticker:function(){
				console.log(event);
				var obj = {
					left:event.pageX,
					top:event.pageY
				};
				//Send the sticker to the server so that others can receive it
				this.socket.emit("mySticker", obj);
			}
		}
	}
</script>

<style>
	#board {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0px;
		left: 0px;
	}
	
	.sticker {
		position: absolute;
		max-height: 200px;
	}
</style>