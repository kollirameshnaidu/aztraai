(function(){class BreakdanceHeaderBuilder{element=null;stickyScrollHideAfter=!1;stickyHideUntilScrollDistance=!1;stickyRevealOnScrollUp=!1;isBuilder=!1;lastScroll=0;timeout=null;initialHiddenClass="bde-header-builder--sticky-scroll-start-off-hidden";hiddenClass="bde-header-builder--sticky-scroll-hide";stylesClass="bde-header-builder--sticky-styles";constructor(selector,id,isBuilder){this.handleScroll=this.handleScroll.bind(this);this.isBuilder=isBuilder;this.element=document.querySelector(selector);this.stickyScrollHideAfter=this.getProp("stickyScrollHideAfter");this.stickyHideUntilScrollDistance=this.getProp("stickyHideUntilScrollDistance");this.stickyRevealOnScrollUp=this.getBooleanProp("stickyRevealOnScrollUp");this.handleScroll();this.setupListeners();this.createMarkers()}
refresh(){this.handleSticky()}
destroy(){this.unbindListeners();document.querySelectorAll(".bde-header-builder-marker").forEach((marker)=>marker.remove())}
getProp(key){return parseInt(this.element.dataset[key])||!1}
getBooleanProp(key){return!!this.element.dataset[key]}
setupListeners(){if(!this.isSticky()){this.clearStickyStyles();return}
window.addEventListener("scroll",this.handleScroll,{passive:!0})}
unbindListeners(){window.removeEventListener("scroll",this.handleScroll)}
clearStickyStyles(){this.removeClass(this.initialHiddenClass);this.removeClass(this.hiddenClass);this.removeClass("bde-header-builder--sticky-styles");this.removeClass("is-animating");this.removeClass("is-before")}
addClass(x){this.element.classList.add(x)}
hasClass(x){return this.element.classList.contains(x)}
removeClass(x){this.element.classList.remove(x)}
isSticky(){return this.hasClass("bde-header-builder--sticky")}
isHidden(){return this.hasClass(this.hiddenClass)}
shouldHide(scrollTop){const hideAfterDistance=this.stickyScrollHideAfter!=!1&&scrollTop>this.stickyScrollHideAfter;const hideUntilDistance=this.stickyHideUntilScrollDistance!=!1&&scrollTop<this.stickyHideUntilScrollDistance;return hideAfterDistance||hideUntilDistance}
shouldShowAfterACertainDistance(scrollTop){return(this.stickyHideUntilScrollDistance!=!1&&scrollTop>this.stickyHideUntilScrollDistance)}
shouldShowOnScrollUp(scrollTop){if(!this.stickyRevealOnScrollUp){return!1}
if(this.stickyHideUntilScrollDistance>scrollTop)return!1;return scrollTop<this.lastScroll}
handleScroll(){this.removeClass(this.initialHiddenClass);this.handleSticky();this.handleBuilderBehaviorOnScroll()}
handleSticky(){const scrollTop=document.documentElement.scrollTop;if(scrollTop>0){this.addClass(this.stylesClass)}else if(this.stickyHideUntilScrollDistance==!1){this.removeClass(this.stylesClass)}
if(this.shouldShowAfterACertainDistance(scrollTop)){this.removeClass(this.hiddenClass)}
if(this.shouldHide(scrollTop)){this.addClass(this.hiddenClass)}else if(this.isHidden()){this.removeClass(this.hiddenClass)}
if(this.shouldShowOnScrollUp(scrollTop)){this.removeClass(this.hiddenClass)}
this.lastScroll=scrollTop}
handleBuilderBehaviorOnScroll(){const scrollTop=document.documentElement.scrollTop;if(!this.isBuilder)return;if(this.shouldHide(scrollTop)){this.addClass("is-before");this.removeClass("is-animating")}else{this.addClass("is-animating");this.removeClass("is-before")}
window.clearTimeout(this.timeout);this.timeout=setTimeout(()=>{this.removeClass("is-animating")},200)}
createMarkers(){if(!this.isBuilder)return;if(this.stickyScrollHideAfter&&this.stickyHideUntilScrollDistance&&this.stickyScrollHideAfter<this.stickyHideUntilScrollDistance){this.createMarker(this.stickyScrollHideAfter,`Error: 'Hide' must be higher than 'Show'`)}else if(this.stickyScrollHideAfter){this.createMarker(this.stickyScrollHideAfter,`Hide (${this.stickyScrollHideAfter}px)`)}
if(this.stickyHideUntilScrollDistance){this.createMarker(this.stickyHideUntilScrollDistance,`Show (${this.stickyHideUntilScrollDistance}px)`)}}
createMarker(position,text){const marker=document.createElement("span");marker.style.top=`${position}px`;marker.classList.add("bde-header-builder-marker");const textNode=document.createTextNode(text);marker.append(textNode);document.body.append(marker)}}
window.BreakdanceHeaderBuilder=BreakdanceHeaderBuilder})()
;