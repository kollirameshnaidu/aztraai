class NextTile{constructor(size,position,parent){this.size=size;this.position=position;this.parent=parent;this.element=null;this.init()}
init(){this.createElement();this.setStyles();this.parent.appendChild(this.element)}
createElement(){this.element=document.createElement('div');this.element.classList.add('dan-tiles__square')}
setStyles(){this.element.style.width=`${this.size}px`;this.element.style.height=`${this.size}px`;this.element.style.left=`${this.position.x * this.size}px`;this.element.style.top=`${this.position.y * this.size}px`}
applyMouseEnter(){this.element.classList.add('dan-tiles__square--mouseenter')}
applyMouseLeave(){this.element.classList.remove('dan-tiles__square--mouseenter');this.element.classList.add('dan-tiles__square--mouseleave');setTimeout(()=>{this.element.classList.remove('dan-tiles__square--mouseleave')},100)}
destroy(){this.element.remove();this.element=null;this.parent=null}}
class NextTiles{constructor(element){this.wrapper=element;this.squaresLayout=element.querySelector('.dan-tiles__squares-layout');this.tiles=[];this.currentTile=null;this.config={squareSize:parseFloat(element.getAttribute('data-square-dimensions'))};this.init();this.bindEvents()}
static instances=[];static destroyAll(){NextTiles.instances.forEach(instance=>instance.destroy());NextTiles.instances=[]}
init(){const{numCols,numRows}=this.calculateGrid();this.createTiles(numCols,numRows)}
calculateGrid(){const rect=this.wrapper.getBoundingClientRect();const targetWidth=rect.width*2;const targetHeight=rect.height*2;return{numCols:Math.ceil(targetWidth/this.config.squareSize),numRows:Math.ceil(targetHeight/this.config.squareSize)}}
createTiles(numCols,numRows){for(let row=0;row<numRows;row++){for(let col=0;col<numCols;col++){const tile=new NextTile(this.config.squareSize,{x:col,y:row},this.squaresLayout);this.tiles.push(tile)}}}
findTileAtPosition(x,y){const elements=document.elementsFromPoint(x,y);const element=elements.find(element=>element.classList.contains('dan-tiles__square')&&element.closest('.dan-tiles')===this.wrapper);return this.tiles.find(tile=>tile.element===element)}
handleMouseMove=(e)=>{const tile=this.findTileAtPosition(e.clientX,e.clientY);if(tile!==this.currentTile){if(this.currentTile){this.currentTile.applyMouseLeave()}
if(tile){tile.applyMouseEnter()}
this.currentTile=tile}}
handleMouseLeave=()=>{if(this.currentTile){this.currentTile.applyMouseLeave();this.currentTile=null}}
bindEvents(){this.wrapper.addEventListener('mousemove',this.handleMouseMove);this.wrapper.addEventListener('mouseleave',this.handleMouseLeave)}
destroy(){this.wrapper.removeEventListener('mousemove',this.handleMouseMove);this.wrapper.removeEventListener('mouseleave',this.handleMouseLeave);this.tiles.forEach(tile=>tile.destroy());this.tiles=[];this.wrapper=null;this.squaresLayout=null;this.currentTile=null}}
function dancepad_tiles(){NextTiles.destroyAll();document.querySelectorAll('.dan-tiles').forEach(element=>{const instance=new NextTiles(element);NextTiles.instances.push(instance)})}
;