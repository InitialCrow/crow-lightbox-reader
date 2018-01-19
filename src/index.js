import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CrowLightBoxReader from './CrowLightBoxReader';
import registerServiceWorker from './registerServiceWorker';


const settings = {
	showPool : true,
	showBtn : true,
	showDesc : true,
	showLightBox : true,
	nodeToHide : false,
	debug : true,
}

const items = [
	{
		type : "image",
		src : "https://static.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg",
		desc : "my desc here",
		alt : "my alt here",
		width : 4928,
		height :3264,
		thumbWidth: 50,
		thumbHeight : 50,
	},
	{
		type : "image",
		src : "https://www.w3schools.com/w3css/img_fjords.jpg",
		desc : "my desc2 here",
		alt : "my alt here",
		width : 300,
		height :300,
		thumbWidth: 50,
		thumbHeight : 50,
	},
	
	{
		type : "image",
		src : "http://reparation-materiel-montagne.fr/wp-content/uploads/2017/09/trial-300x300.jpg",
		desc : "my desc here",
		alt : "my alt here",
		width : 300,
		height :300,
		thumbWidth: 50,
		thumbHeight : 50,
	},
	{
		type : "video",
		src : "http://vjs.zencdn.net/v/oceans.mp4",
		desc : "my desc here4",
		thumbWidth: 50,
		width : 1080,
		height :450,
		thumbHeight : 50,
	},
	{
		type : "audio",
		src : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
		thumbSrc : "https://au.yamaha.com/en/files/front%20page%20banner_1200x480_d5a393465b9094b78c6cde73d642f31e.jpg",
		desc : "my desc here",
		thumbWidth: 50,
		thumbHeight : 50,
	},
]

ReactDOM.render(<CrowLightBoxReader settings={settings} items={items} />, document.getElementById('root'));
registerServiceWorker();
