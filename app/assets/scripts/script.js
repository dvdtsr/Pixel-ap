var Datas = {}, hslColor = [197, 75, 47];

// create 3 hsl luminance from one given hue
function hslLuminance(hslColor, select) {
       var medium = hslColor[2];
       if(medium <= 16) {medium = 16};
       var dark = medium - 15;
       var border = medium - 16;
       switch(select) {
              case "medium" :
                     return "hsl("+hslColor[0]+", "+hslColor[1]+"%, "+medium+"%)";
                     break;
              case "dark" :
                     return "hsl("+hslColor[0]+", "+hslColor[1]+"%, "+dark+"%)";
                     break;
              case "border" :
                     return "hsl("+hslColor[0]+", "+hslColor[1]+"%, "+border+"%)";
                     break;
              default :
                     return "hsl("+hslColor[0]+", "+hslColor[1]+"%, "+hslColor[2]+"%)";
       }
}

// translate RGB to HSL ( see https://codepen.io/pankajparashar/pen/oFzIg )
function rgbToHsl(r, g, b){
       r /= 255, g /= 255, b /= 255;
       var max = Math.max(r, g, b), min = Math.min(r, g, b);
       var h, s, l = (max + min) / 2;
       if (max == min) { h = s = 0; }
       else {
              var d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch (max){
                     case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                     case g: h = (b - r) / d + 2; break;
                     case b: h = (r - g) / d + 4; break;
              }
              h /= 6;
       }
       return [(h*360)|0, ((s*100+0.5)|0), ((l*100+0.5)|0)];
}
$(document).ready(function() {
       var    gridSize,
              wrapperDim,
              cubeDim,
              lvl = 0;

       gridSize = 15; // TODO : fix tile and cube XY attribution
       wrapperDim = $("#pixel-area").innerWidth();
       cubeDim = wrapperDim / gridSize;

       // create as many object "level-N" property than there are gridsize-lvl
       (function() {
              Datas.levels = gridSize;
              var i = 0;
              while(i < gridSize) {
                     Object.defineProperty(Datas, "level_"+i, {
                                   value : {
                                          "position" : [],
                                          "color" : []
                                   }
                            }
                     );
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
              if($(".cube[data-cube-index='"+current+"'][data-cube-lvl='"+lvl+"']").length){ // remove cube if exist
                     $(this).removeClass("filled");
                     $(".cube[data-cube-index='"+current+"'][data-cube-lvl='"+lvl+"']").remove();
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
       $("input[type='radio']").click(function() {
              var    previousLvl = lvl,
                     tilesFromThisLvl = $("div.filled");
              lvl = $(this).val();
              if(previousLvl != lvl) {
                     storeLvlDatas(previousLvl, lvl, tilesFromThisLvl);
              }
       });

       // store Lvl datas on changed
       function storeLvlDatas(a, b, c) {
              var currentTilesPosition = Datas["level_"+a].position;
              var previousTilesPosition = Datas["level_"+b].position;
              $(".filled").removeClass("filled");
              if(previousTilesPosition.length) { // check if clicked level have already been populated and if so, fill this level tiles to show where
                     populatePreviousTiles(currentTilesPosition, previousTilesPosition);
              }
              var x = $.map(c, function(el) {
                     return $(el).attr("data-tile-index");
              });
              var k = 0;
              while(k < x.length) {
                     currentTilesPosition.push(x[k]);
                     k++;
              }
       }

       // populate previous tiles
       function populatePreviousTiles(c, p) {
              var i;
              for(i=0;i<p.length;i++) {
                     var    j,
                            currentTiles = $(".tile");
                     for(j=0;j < currentTiles.length;j++) {
                            var    el = $(".tile").eq(j),
                                   pos = p[i];
                            if(el.attr("data-tile-index") == pos) {
                                   $(el).addClass("filled");
                            }
                     }
              }
       }

       // create cube
       function createSetInjectCube(x, y, z, id) {
              var    xPos = x*cubeDim,
                     yPos = y*cubeDim,
                     zPos = z*cubeDim,
                     elem = document.createElement("div");
              $(elem).attr({
                     "class" : "cube",
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
              $("div.cube[data-cube-index="+id+"][data-cube-lvl="+lvl+"] > div[class^='face-']").css({
                     "background" : "radial-gradient("+hslLuminance(hslColor)+", "+hslLuminance(hslColor, 'dark')+")",
                     "box-shadow" : "inset 0 0 5px 3px "+hslLuminance(hslColor, 'border')
              });
              setTimeout(function() {
                     $(elem).css({
                            "transform" : "translate3d("+xPos+"px, "+yPos+"px, "+zPos+"px)",
                            "-ms-transform" : "translate3d("+xPos+"px, "+yPos+"px, "+zPos+"px)",
                            "-webkit-transform" : "translate3d("+xPos+"px, "+yPos+"px, "+zPos+"px)",
                     }, 500);
              });
       }

       // get clicked cube color
       $(".cube > div").click(function() {
              console.log("allo"); // TODO get cube color
       });

       // get selected color
       $("input.jscolor").on("change", function() {
              var rgbColor = $(this).css("background-color").match(/\b\d[,\d]*\b/g).toString().split(",");
              hslColor = rgbToHsl(rgbColor[0], rgbColor[1], rgbColor[2]);
       });

       // Rotate view on keydown
       var    rotateX = 10,
              rotateY = -12;
       $("body").keydown(function(e) {
              if(e.keyCode == 37) {
                     rotateY += 20;
              }
              if(e.keyCode == 38) {
                     rotateX -= 20;
              }
              if(e.keyCode == 39) {
                     rotateY -= 20;
              }
              if(e.keyCode == 40) {
                     rotateX += 20;
              }
              $("#pixel-area").css({
                     "transform" : "rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)",
                     "-ms-transform" : "rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)",
                     "-webkit-transform" : "rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)"
              });
       });
       $("button").click(function() { // reset ALL
              rotateX = 10,
              rotateY = -12;
              var i = 0;
              $("#pixel-area").css({
                     "transform" : "rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)",
                     "-ms-transform" : "rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)",
                     "-webkit-transform" : "rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)"
              });
              $("div[class^='face-']").addClass("explode");
              setTimeout(function() {
                     //$(".cube").remove();
              }, 900);
              // reset Object "Datas"
              $(".filled").removeClass("filled");
              while(i < gridSize) {
                     Datas["level_"+i].position = [];
                     Datas["level_"+i].color = [];
                     i++;
              }
       });
});
