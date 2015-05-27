var pointsArray = document.getElementsByClassName('point');

var animatePoints= function(points) {

 points.forEach(revealPoint);
    
  function revealPoint(i) {
    
                    points[i].style.opacity = 1;
                    points[i].style.transform = "scaleX(index) translateY(0)";
                    points[i].style.msTransform = "scaleX(index) translateY(0)";
                    points[i].style.WebkitTransform = "scaleX(index) translateY(0)";   
    
 };
                              
};
  


window.onload = function() {
    
    if(window.innerHeight > 950) {
        nimatePoints(pointsArray);
    
    }
    
    
    window.addEventListener("scroll", function(event) {
        
        if(pointsArray[0].getBoundingClientRect().top <= 500) {
            animatePoints(pointsArray);
        }
    });
}