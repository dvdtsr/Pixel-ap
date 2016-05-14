var Datas = {};

$(document).ready(function() {
       var    gridSize,
              wrapperDim,
              cubeDim,
              lvl = 0;

       gridSize = 10; // TODO : fix tile and cube XY attribution
       wrapperDim = $("#pixel-area").innerWidth();
       cubeDim = wrapperDim / gridSize;

       // create as many object "datas" property than there are gridsize-lvl
       (function() { // TODO OBJECT FFS
              Datas.levels = gridSize;
              var i = 0;
              while(i < gridSize) {
                     Object.defineProperty(Datas, "level-"+i, {value : "tagrossmer"});
                     i++;
              }
       })();

       // tiles & radios creation
       (function() {
              var    k = 0,
                     l = 0,
                     tileWidth = Math.floor($("#tiles-pad").innerWidth()/gridSize);
              while (k < gridSize*gridSize) {
                     // inject tiles
                     var tile = document.createElement("div");
                     $(tile).attr({
                            "class" : "tile",
                            "data-tile-index" : k,
                            "data-tile-lvl" : lvl,
                            "style" : "width:"+tileWidth+"px;height:"+tileWidth+"px"
                     });
                     $("#tiles-pad").append(tile);
                     k++;
              }
              while(l < gridSize) {
                     // inject radio
                     var radio = document.createElement("input");
                     $(radio).attr({
                            "type" : "radio",
                            "name" : "level",
                            "value" : l
                     });
                     $("#menu > form").append(radio);
                     l++;
              }
              $("#menu > form > input[type='radio']:nth-child(1)").attr("checked", "checked");
       })();

       // inject cube
       $(".tile").click(function() {
              var    current = $(this).attr("data-tile-index"),
                     tileX,
                     tileY;
              if($(".cube-"+current).length){
                     $(this).removeClass("filled");
                     $(".cube-"+current).remove();
              }
              else{ // TODO fix tileX and tileY calcul logic
                     if(current.length === 1) {
                            tileX = current;
                            tileY = 0;
                     }
                     else {
                            tileX = Math.floor(current%gridSize);
                            tileY = current.substr(0, 1);
                     }
                     $(this).addClass("filled");
                     createSetInjectCube(tileX, tileY, lvl, current);
              }
       });

       // manage levels
       $("input").click(function() {
              var previousLvl = lvl.toString();
              lvl = $(this).val();
              var tilesFromThisLvl = $("div.filled");
       });

       // create cube
       function createSetInjectCube(x, y, z, id) {
              var xPos = x*cubeDim;
              var yPos = y*cubeDim;
              var zPos = z*cubeDim;
              var elem = document.createElement("div");
              $(elem).attr({
                     "class" : "cube-"+id,
                     "data-cube-index" : id,
                     "data-cube-lvl" : lvl
              });
              var j = 0;
              while (j < 6) {
                     var face = document.createElement("div");
                     $(face).attr("class", "face-"+j);
                     elem.appendChild(face);
                     j++;
              }
              $("#pixel-area").append(elem);
              var zStart = zPos+1000;
              $(elem).css({
                     "transform" : "translate3d("+xPos+"px, "+yPos+"px, "+zStart+"px)",
                     "-ms-transform" : "translate3d("+xPos+"px, "+yPos+"px, "+zStart+"px)",
                     "-webkit-transform" : "translate3d("+xPos+"px, "+yPos+"px, "+zStart+"px)",
              });
              setTimeout(function() {
                     $(elem).css({
                            "transform" : "translate3d("+xPos+"px, "+yPos+"px, "+zPos+"px)",
                            "-ms-transform" : "translate3d("+xPos+"px, "+yPos+"px, "+zPos+"px)",
                            "-webkit-transform" : "translate3d("+xPos+"px, "+yPos+"px, "+zPos+"px)",
              }, 500);
              });
       }
});
