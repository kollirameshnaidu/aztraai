class NextArrowIcon{static instances=[];constructor(element,index){Object.assign(this,{element:element,trigger:element.getAttribute("data-trigger"),dataToggle:element.getAttribute("data-toggle"),closeClick:element.getAttribute("data-closeclick")==="1"||element.getAttribute("data-closeclick")==="true",closeEsc:element.getAttribute("data-closeesc")==="1"||element.getAttribute("data-closeesc")==="true",index:index,toggleElements:[],eventListeners:[],dropdownWrapper:null});this.initialize()}
initialize(){this.setupToggleElements();this.setupEventListeners()}
setupToggleElements(){if(!this.dataToggle&&this.element.closest(".dan-dropdown-wrapper")){this.dropdownWrapper=this.trigger==="click"?this.element.closest(".dan-dropdown-wrapper").querySelector(".dan-dropdown-toggle"):this.element.closest(".dan-dropdown-wrapper");this.dataToggle=`dan-dropdown-wrapper--arrow-icon-${this.index}`;this.dropdownWrapper.classList.add(this.dataToggle);this.toggleElements=[this.dropdownWrapper]}else{this.toggleElements=Array.from(document.querySelectorAll(`${this.dataToggle}`))}}
handleClickOutside=(event)=>{if(this.closeClick&&this.trigger==="click"){if(!this.element.contains(event.target)&&!this.toggleElements.some(toggle=>toggle.contains(event.target))){this.deactivate()}}}
handleEscKey=(event)=>{if(this.closeEsc&&event.key==="Escape"){this.deactivate()}}
handleEnterKey=(event)=>{if(event.key==="Enter"){this.toggleActive()}}
handleToggleClick=()=>{this.toggleActive()}
handleHoverEnter=()=>{this.activate()}
handleHoverLeave=()=>{this.deactivate()}
toggleActive(){if(this.element.getAttribute("data-active")==='1'||this.element.getAttribute("data-active")==='true'){this.deactivate()}else{this.activate()}}
activate(){this.element.setAttribute("data-active","true");if(this.trigger==="click"){document.addEventListener("mousedown",this.handleClickOutside);document.addEventListener("keydown",this.handleEscKey)}}
deactivate(){this.element.removeAttribute("data-active");document.removeEventListener("mousedown",this.handleClickOutside);document.removeEventListener("keydown",this.handleEscKey)}
setupEventListeners(){this.toggleElements.forEach(toggle=>{if(this.trigger==="click"){toggle.addEventListener("mousedown",this.handleToggleClick);this.eventListeners.push({element:toggle,type:"mousedown",handler:this.handleToggleClick})}else if(this.trigger==="hover"){toggle.addEventListener("mouseenter",this.handleHoverEnter);toggle.addEventListener("mouseleave",this.handleHoverLeave);this.eventListeners.push({element:toggle,type:"mouseenter",handler:this.handleHoverEnter},{element:toggle,type:"mouseleave",handler:this.handleHoverLeave})}
toggle.addEventListener("keydown",this.handleEnterKey);this.eventListeners.push({element:toggle,type:"keydown",handler:this.handleEnterKey})})}
destroy(){this.eventListeners.forEach(({element,type,handler})=>{element.removeEventListener(type,handler)});document.removeEventListener("mousedown",this.handleClickOutside);document.removeEventListener("keydown",this.handleEscKey);if(this.dropdownWrapper&&this.dataToggle){this.dropdownWrapper.classList.remove(this.dataToggle)}
this.element.removeAttribute("data-active")}
static destroyAll(){NextArrowIcon.instances.forEach(instance=>instance.destroy());NextArrowIcon.instances=[]}}
const dancepad_arrow_icon=()=>{NextArrowIcon.destroyAll();document.querySelectorAll(".dan-arrow-icon").forEach((element,index)=>NextArrowIcon.instances.push(new NextArrowIcon(element,index)))}
;