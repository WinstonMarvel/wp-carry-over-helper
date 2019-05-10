var popupcode = '<div id="wp-popup"><button id="wp-hide-show">WP Carry Help</button><div id="wp-infobox"><div><strong>WP carry over filler</strong> </br>To ensure that this plugin works:<ol><li>Paste the links into the box</li><li>Hit start to fill up the data </li></ol></div><textarea id="wp-carry-help-input"></textarea><button id="wp-startFiller">Start</button></div></div>';
var lines;
(function() {
	if( $(".flco-bulk-submit").length ) {
		//Show popup if it is a carry page
		$("body").append(popupcode);
		$("#wp-popup").show();
	}
	$("#wp-startFiller").on('click', fillLines);
	$("#wp-hide-show").on('click', function(){
			$("#wp-infobox").fadeToggle();
	});

	function titleFilter(ur) {
	    var filUrl = ur.replace('.shtml', "").split("/");
	    var title = filUrl[filUrl.length - 1];
	    title = title.split("-");
	    var capitalize = [];
	    for (var j = 0; j < title.length; j++) {
	        capitalize.push(title[j].charAt(0).toUpperCase() + title[j].slice(1));
	    }
	    return capitalize;
	}
	
	function fillLines() { 
		lines = $("#wp-carry-help-input").val().split("\n");
		lines.map((line)=>{
			document.querySelector(".flco-bulk-form-wrap .flco-bulk-row:last-child .flco-bulk-row-field-wrap input").value = line;
			document.querySelector("a.flco-add").click();
		});
	}
})();

