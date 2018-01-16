# CrowLightBoxReader 
v0.1.3


Hi !! here we have react component I made, its a classic lightbox but we can read image video and song on same poolList of item.
I made another component to work with this, is CrowMediaGallery if you want show media gallery (with images songs and videos) before to show LightBoxReader to see this component go to the [github_project](https://github.com/InitialCrow/crow-media-gallery).

## Install LightBoxReader

First you know need to install the project you have 3 way :

- download on github [download zip](https://github.com/InitialCrow/crow-lightbox-reader/archive/master.zip).
- clone on github `git clone https://github.com/InitialCrow/crow-lightbox-reader `
- install via npm `npm install crow-lightbox-reader --save`

if you need just the component get the lib folder and put CrowLightBoxReader.min.js and CrowLightBoxReader.css in your project

else you can do `npm install` on directory if you clone from github to install dependencies to work on this component
## Use CrowLightBoxReader

CrowLightBoxReader is work with react so make sure you have install react if you get component in lib folder and css to
To use we need :

**load component**

`import CrowLightBoxReader from 'crow-lightbox-reader' //or directory location` 

or

 `let CrowLightBoxReader = require('crow-lightbox-reader')//or directory location`

**use component**

I take simple exemple of use but you can import LightBox on container to 

    import React from 'react';
    import ReactDOM from 'react-dom';
    import CrowLightBoxReader from 'crow-lightbox-reader'; //or directory location
    
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
    		width : 300,
    		height :300,
    		thumbWidth: 50,
    		thumbHeight : 50,
    	},]
    ReactDOM.render(<CrowLightBoxReader settings={{showLightBox : true}} items={items} />, document.getElementById('root'));

like this you will have the lightbox as you can see we have to props needed **items** props is pool of item you want to show follow this items array model

## Options
if you want change LightBox settings you can do like this

    import React from 'react';
    import ReactDOM from 'react-dom';
    import CrowLightBoxReader from 'crow-lightbox-reader'; //or directory location

    const settings = { //this is settings configuration 
    	showPool : true, // if you want render thumbnail on lightBox
    	showBtn : true, // if you want to show next and prev buttin
    	showDesc : true, // if you want to show the top desc
    	showLightBox : true, // if you want to show the CrowLightBoxReader
    	showPagination : true, // if you want to show the pagination
    	showCloseBtn : true, // if you want to show close lightBox Button
    	debug : false, // if you want to show debug messages
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
    		width : 1080,
    		height :450,
    	},
    ]
    
    ReactDOM.render(<CrowLightBoxReader isRead={0// index of pool you want to begin to show} closeCallBack={mycallback //trigger close action} settings={settings} items={items} />, document.getElementById('root'));

here you have all settings you can change now

have good dev :)

## License

**MIT** CrowLightBoxReader is free to use mention is apreciate thank you.


