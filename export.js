//export data table as a .csv
function exportify() {
	//make sure there's actually data to export
	if (success == true) {
		//turn the date into a string because it makes a reasonably good naming scheme
		var d = new Date();
		var nombre = str(d.getTime());

		var csv = "x,y,vx,vy,t\n";

		//fill up a csv text file
		for (var i = 0; i < points.length-1; i++) {
			for (var j = 0; j < 4; j++) {
				csv += str(points[i][j]) + ",";
			}

			csv += str(points[i][4]) + "\n";
		}

		//force a download when the button is pressed
	    var hiddenElement = document.createElement('a');
	    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
	    hiddenElement.target = '_blank';
	    hiddenElement.download = d + ".csv";
	    hiddenElement.click();
	}

	success = false;
}

function screenshot() {
	var d = new Date();
	var nombre = str(d.getTime());
	save(canvas, nombre + ".png");
}