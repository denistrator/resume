(function() {
	var blockToCollapse = document.querySelector(".portfolio-list");
    var collapsedHeight = document.querySelector(".portfolio-collapse-pos").offsetTop +
   						  document.querySelector(".portfolio-collapse-pos").offsetHeight;

    blockToCollapse.style.height = collapsedHeight +"px";      
    // setTimeout(function() {
    //   blockToCollapse.style.height = collapsedHeight +"px";      
    // }, 3000);

    var expander = document.querySelector(".portfolio-expander");
    expander.addEventListener('click', function() {
   	  var initialHeight =  blockToCollapse.scrollHeight;
    	blockToCollapse.style.height = initialHeight - expander.offsetHeight +"px";
    	expander.classList.add("hide");
    }, false);
})();

