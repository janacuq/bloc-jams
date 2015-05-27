var pointsArray = document.getElementsByClassName('point');

var animatePoints= function(points) {

var revealPoint = function(index) {
    for(var i = 0; i <= index; i++) {
                    points[i].style.opacity = 1;
                    points[i].style.transform = "scaleX(index) translateY(0)";
                    points[i].style.msTransform = "scaleX(index) translateY(0)";
                    points[i].style.WebkitTransform = "scaleX(index) translateY(0)";   
    }
 };
                           
 revealPoint(2);

};

window.onload = function() {
    window.addEventListener("scroll", function(event) {
        if(pointsArray[0].getBoundingClientRect().top <= 500) {
            animatePoints(pointsArray);
        }
    });
}