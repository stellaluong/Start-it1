var count = 0;
 
function next(){
	

	
	document.getElementById('next').onclick = function () {
        window.location.href = "index2.html";
    }
}

 
function startRating(item){
	count=item.id[0];
	sessionStorage.star = count;
	for (var i = 0; i < 6; i++){
		if( i < count){
			document.getElementById((i+1)).style.color = 'yellow';
		}
		else{
			document.getElementById((i+1)).style.color = 'black';
		}
	}
}