$(document).ready(function() {
       var gridSize;
       $("#set-level").on("change", function() {
              gridSize = $(this).val();
              console.log(gridSize);
       });
});
