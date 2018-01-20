import React, { Component } from 'react'

import './CrowLightBoxReader.css'

class CrowLightBoxReader extends Component {
  constructor(props){
    super(props)
    this.poolItems = props.items || [] // this is all items audio image or video pool 
    this.isRead =  props.isRead|| 0 // this is index of pool we  display in lightbox
    this.closeCallBack = props.closeCallBack || false //this is the close callBack we need to write to change state for render the lightbox

    // pass object settings to change lightbox configuration
    this.settings = props.settings || {}
    this.showPool = this.settings.showPool || true //show thumbnail of pool in lightbox
    this.showBtn = this.settings.showBtn || true // show next and prev button
    this.showCloseBtn = this.settings.showCloseBtn || true // show close button
    this.showDesc = this.settings.showDesc || true // show text descripton on lightbox
    this.showPagination = this.settings.showPagination || true // show pagination of pool on lightbox
    this.nodeToHide = this.settings.nodeToHide || false // hide node content before show the lightbox
    this.showLightBox = this.settings.showLightBox || false //show lightbox
    this.debug = this.settings.debug || false // enable debug mode to show console msg

    //construct props
    this.nodes={
      main : null,
      thumb : [],
      desc : null,
      video : null,
      audio : null
    }
    this.poolHideNode=[]
    this.state={
      changeItem : false,
    }
  }
  console(msg=""){
    if(this.debug !== false){
      console.log(msg)
    }
  }
  componentDidMount(){ 

    //show item selected by default
    if(this.showLightBox !==false){
      document.body.classList.add('crow-lightbox-reader-bg')
      this.nodes.desc.style.maxWidth = this.poolItems[this.isRead].width+"px"
      this.nodes.thumb[this.isRead].classList.add('current')
    }
    if(this.nodeToHide !== false){
      this.deleteBody()
    }
  }
  deleteBody(){ // hide body and show lightbox
    if(this.nodeToHide !== false){
      let node = document.getElementById(this.nodeToHide)
      node.classList.add('crow-hide')
      while(node.firstChild){
          this.poolHideNode.push(node.firstChild)
          node.removeChild(node.firstChild)
      }
      node.prepend(this.nodes.main)
      node.classList.remove('crow-hide')
      if(this.nodes.video!==null){
        this.nodes.video.play()
      }
      if(this.nodes.audio !== null){
        this.nodes.audio.play()
      }

    }
      
  }
  restoreBody(){// restore body for hidebody
    if(this.nodeToHide !== false && this.poolHideNode.length>0){
      let node = document.getElementById(this.nodeToHide)
      node.classList.add('crow-hide')
      while(node.firstChild){
         
          node.removeChild(node.firstChild)
      }

      this.poolHideNode.map((nodeC)=>{
       node.appendChild(nodeC)
      })
      
      node.classList.remove('crow-hide')
    }
  }
  closeLightBox(){ // go to close light box
    if(this.closeCallBack!==false && this.showLightBox !== false){

        this.closeCallBack()
    }
    if(this.showLightBox !== false){
      document.body.classList.remove('crow-lightbox-reader-bg')
      this.showLightBox = false
      this.restoreBody()
      this.setState({renderItem : false })
    }

  }

  changeItem(index){ // change item on click of item pull 
    this.nodes.thumb[this.isRead].classList.remove('current')

    this.isRead = index
    this.nodes.thumb[this.isRead].classList.add('current')

    this.setState({renderItem : true })
  }
  changeNextItem(){ // go to next item on click of next button
    
    if(this.isRead < this.poolItems.length-1 ){
      this.nodes.thumb[this.isRead].classList.remove('current')
      this.isRead ++
      this.nodes.thumb[this.isRead].classList.add('current')
      this.setState({renderItem : true })
    }
    
  }
  changePrevItem(){ // go to prev item on click of prev button
    if(this.isRead > 0){
      this.nodes.thumb[this.isRead].classList.remove('current')
      this.isRead --
      this.nodes.thumb[this.isRead].classList.add('current')
      this.setState({renderItem : true })
    }
  }
  renderPagination(){ // render pagination of pool
    if(this.showPagination !== false){
      let current = this.isRead+1
      let pool = this.poolItems.length

      return(
        <p className="crow-lightbox-reader-pagination">
          {current} / {pool}
        </p>
      )
    }
  }
  renderDesc(item=""){ // render description
    if(this.showDesc !== false){
      if(this.nodes.desc!== null){
        this.nodes.desc.style.maxWidth = item.width+"px"
        
      }
      return(
        <p ref={(p)=>{this.nodes.desc = p}} className="crow-lightbox-reader-desc">{item.desc}</p>
      )
    }
  }
  renderCloseBtn(){ // render close button
    if(this.showCloseBtn !== false){
      return(
        <span className="lightbox-close-btn" onClick={()=>{this.closeLightBox()}}>
          &#10060;
        </span>
      )      
    }

  }
  renderBtn(){ // render next and prev button 
    if(this.showBtn !==false){
      return(
        <div>
          <div className="crow-lightbox-reader-prev" onClick={()=>{this.changePrevItem()}}>
            <p className="lightbox-btn">&#10096;</p>
            
          </div>
          <div className="crow-lightbox-reader-next" onClick={()=>{this.changeNextItem()}}>
            <p className="lightbox-btn">&#10095;</p>
          </div>
        </div>
          
      )
    }
  }
  renderVideoItemThumb(item="",i){ // render video item for type "video"

    if(item.type==="video" ){
      return(
        <li onClick={()=>{this.changeItem(i)}} ref={(li)=>{this.nodes.thumb.push(li)}} key={i.toString()} className="pool-item"><video src={item.src} width={item.thumbWidth} height={item.thumbHeight} onPlay={(evt)=>{evt.preventDefault()}}></video></li>
      )
    }
    else if (item.type =="" || item.type ==undefined){
      this.console("Bug on CrowLightBoxReader => renderVideoItemThumb func || you need to write type ('video', 'image', 'song') property in items pool ")
      return
    }
  }
  renderImageItemThumb(item="",i){ // render image item for type "image"
    if(item.type==="image" ){
      return(
        <li onClick={()=>{this.changeItem(i)}} ref={(li)=>{this.nodes.thumb.push(li)}} key={i.toString()} className="pool-item"><img src={item.src} width={item.thumbWidth} height={item.thumbHeight} alt={item.alt}/></li>
      )
    }
    if (item.type =="" || item.type ==undefined){
      this.console("Bug on CrowLightBoxReader => renderImageItemThumb func || you need to write type ('video', 'image', 'song') property in items pool ")
      return
    }
  }
  renderAudioItemThumb(item="",i){ // render audio item for type "audio"
    if(item.type==="audio" ){
      return(
        <li onClick={()=>{this.changeItem(i)}} ref={(li)=>{this.nodes.thumb.push(li)}} key={i.toString()} className="pool-item"><img src={item.thumbSrc} width={item.thumbWidth} height={item.thumbHeight} alt="thumbnail of audio content"/></li>
      )
    }
    else if (item.type =="" || item.type ==undefined){
      this.console("Bug on CrowLightBoxReader => renderAudioItemThumb func || you need to write type ('video', 'image', 'song') property in items pool ")
      return
    }
  }

  renderItem(item=""){ //render main item

    if(item.type === "video"){
      return(
        <div className="render-content">
          {this.renderDesc(item)}
          {this.renderBtn()}
           <video ref={(video)=>{this.nodes.video = video}}  width={item.width} height={item.height} src={item.src} autoPlay controls ></video>
          {this.renderPagination()}
        </div>
       
      )
    }
    if(item.type === "audio"){
      return(
        <div className="render-content">
          {this.renderDesc(item)}
          {this.renderBtn()}
          <img  width={item.width} height={item.height} src={item.thumbSrc} alt="image of song reader"/>
          <audio ref={(audio)=>{this.nodes.audio = audio}} className="audio" src={item.src} autoPlay controls></audio>
          {this.renderPagination()}
        </div>
      )
    }
    if(item.type === "image"){
      return(
        <div className="render-content">
          {this.renderDesc(item)}
          {this.renderBtn()}
          <img width={item.width} height={item.height} className="render-content" src={item.src} alt={item.alt}/>
          {this.renderPagination()}
        </div>
      )
    }
    if(item == "" || item.type == undefined){
      this.console("Bug on CrowLightBoxReader => renderItemRender func || you need to write type ('video', 'image', 'song') property in items pool ")
      return
    }
  }
  renderItemRenderer(){ // show item in main render item of lightbox
   
    return(
      <div key="r0" className="crow-lightbox-reader-render">
        {this.renderItem(this.poolItems[this.isRead])}
      </div>
    )
  }
  renderPoolItemsThumb(){ // render items
    if(this.poolItems != ""){
      let poolItems = []
      this.poolItems.map((item,i)=>{
        if(this.renderVideoItemThumb(item,i) !== undefined){

          poolItems.push(this.renderVideoItemThumb(item,i))
        }
        if(this.renderImageItemThumb(item,i) !== undefined){

          poolItems.push(this.renderImageItemThumb(item,i))          
        }
        if(this.renderAudioItemThumb(item,i)!== undefined){

          poolItems.push(this.renderAudioItemThumb(item,i))
        }
      })
      return(
        poolItems
      )
    
    }
    else{
      this.console("Bug on CrowLightBoxReader => renderPoolItemsThumb func || you need to pass not empty items into items props on lightbox")
      return
    }
  }

  renderPoolListThumb(){ // render pool list 
    if(this.showPool !== false){
      return(
        <ul key="r1" className="crow-lightbox-reader-pool-list">
          {this.renderPoolItemsThumb()}
        </ul>
      )
    }
  }

  showRenderer(){ // render all render
    if(this.showLightBox !== false){

      
      let render = []
      render.push(this.renderItemRenderer())
      render.push(this.renderPoolListThumb())
      return(
        <div ref={(div)=>{this.nodes.main = div}} className="crow-lightbox-reader">
          {this.renderCloseBtn()}
          {render}
          
        </div>
      )
    }
    else{
      return null
    }
    
  }
  render() {
    return (
      <div>
        {this.showRenderer()}
      </div>
    )
  }
}

export default CrowLightBoxReader
