class NextSpotlightV2{constructor(spotlightWrapper){this.element=spotlightWrapper.querySelector(".dan-spotlight-v2");this.timeline=null;this.config={trigger:spotlightWrapper.getAttribute("data-trigger"),duration:parseFloat(spotlightWrapper.getAttribute("data-duration")),delay:parseFloat(spotlightWrapper.getAttribute("data-delay")),easing:spotlightWrapper.getAttribute("data-easing"),start:spotlightWrapper.getAttribute("data-start"),toggleActions:spotlightWrapper.getAttribute("data-toggleactions"),};this.init()}
static instances=[];static destroyAll(){NextSpotlightV2.instances.forEach((instance)=>instance.destroy());NextSpotlightV2.instances=[]}
init(){const trigger=this.resolveTrigger();const containerAnimation=this.getContainerAnimation();this.createTimeline(trigger,containerAnimation)}
resolveTrigger(){return this.config.trigger==="this"?this.element.parentNode:this.config.trigger}
getContainerAnimation(){let containerName=null;document.querySelectorAll(".dan-horizontal-scroll").forEach((horizontalScroll,index)=>{if(horizontalScroll.contains(this.element)){containerName=`NextHorizontalScroll${index}`}});return containerName?window[containerName]:undefined}
createTimeline(trigger,containerAnimation){this.timeline=gsap.timeline({scrollTrigger:{trigger:trigger,containerAnimation:containerAnimation,start:this.config.start,toggleActions:this.config.toggleActions}});this.timeline.add([gsap.to(this.element,{duration:this.config.duration,opacity:1,ease:this.config.easing,delay:this.config.delay}),gsap.to(this.element,{duration:this.config.duration,transform:"translate(-50%, -40%) scale(1)",ease:this.config.easing,delay:this.config.delay}),],0)}
destroy(){if(this.timeline){if(this.timeline.scrollTrigger){this.timeline.scrollTrigger.kill()}
this.timeline.kill();this.timeline=null}
if(this.element){gsap.set(this.element,{clearProps:"all"})}
this.element=null}}
function dancepad_spotlight_v2(){if(document.querySelector(".dan-site-loader")&&!window.location.href.includes("breakdance_iframe")){return}
NextSpotlightV2.destroyAll();document.querySelectorAll(".dan-spotlight-v2-wrapper").forEach((spotlightWrapper)=>{const instance=new NextSpotlightV2(spotlightWrapper);NextSpotlightV2.instances.push(instance)})}
function dancepad_spotlight_v2_site_loader(){NextSpotlightV2.destroyAll();document.querySelectorAll(".dan-spotlight-v2-wrapper").forEach((spotlightWrapper)=>{const instance=new NextSpotlightV2(spotlightWrapper);NextSpotlightV2.instances.push(instance)})}
;