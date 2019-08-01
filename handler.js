var popupcode = '<div id="wp-popup"><button id="wp-hide-show">WP Carry Help</button><div id="wp-infobox"><div><strong>WP carry over filler</strong> </br>To ensure that this plugin works:<ol><li>Paste the links into the box</li><li>If pages are selected instead of blog, then make sure you provide a content ID </li><li>Hit start to fill up the data </li></ol></div><label><strong>Choose carryover type:</strong></label> <br><input type="radio" name="title" value="Blog-Title" id="showBlog">Blog Post<br><input type="radio" name="title" value="Page-Title" id="showTitle">Internal Page<br><input type="text" id="uname" name="name" placeholder="Enter the content ID"><br><textarea id="wp-carry-help-input"></textarea><button id="wp-startFiller" style="display:none">Fetch URLs for Blog</button><button id="fetch-title" style="display:none">Fetch URLs for Pages</button></div></div>';

var lines;
(function () {
	if ($(".flco-bulk-submit").length) {
		//Show popup if it is a carry page
		$("body").append(popupcode);
		$("#wp-popup").show();
	}
	$("#wp-startFiller").on('click', fillLines);
	$("#fetch-title").on('click', getTitles);

	// Select the option for Title/Blog
	var blogButton = document.querySelector("#showBlog");
	var titleButton = document.querySelector("#showTitle");
	var pageTitle = document.querySelector("#uname");

	blogButton.addEventListener('click', checkBlog);
	titleButton.addEventListener('click', checkTitle);
	pageTitle.style.display = 'none';

	function checkBlog() {
		document.querySelector('#wp-startFiller').style.display = 'block';
		document.querySelector('#fetch-title').style.display = 'none';
		pageTitle.style.display = "none";
	}

	function checkTitle() {
		document.querySelector('#wp-startFiller').style.display = 'none';
		document.querySelector('#fetch-title').style.display = 'block';
		pageTitle.style.display = "block";
	}

	$("#wp-hide-show").on('click', function () {
		$("#wp-infobox").fadeToggle();
	});

	// Code for title that comes from last slug of the URL
	function titleFilter(ur) {
		var extention = {
			".shtml": "/",
			".html": "/",
			".cfm": "/",
			".cfml": "/",
		};
		var filUrl = ur.replace(/\.shtml|\.html|\.cfm|\.cfml/gi, function (matched) {
			return extention[matched];
		}).replace(/[0-9]*/gi, "").split("/");
	
		var title = '';
	
		for(var i = 0; i < filUrl.length; i++) {
			filUrl[i] === "" ? title = filUrl[filUrl.length - 2] : title = filUrl[filUrl.length - 1]
		}
	
		title = title.split("-");
		var capitalize = [];
		for (var j = 0; j < title.length; j++) {
			capitalize.push(title[j].charAt(0).toUpperCase() + title[j].slice(1));
		}
		return capitalize.join(" ");
	}
	

	//Function For Blog
	function fillLines() {
		lines = $("#wp-carry-help-input").val().split("\n");
		lines.map((line) => {
			document.querySelector(".flco-bulk-form-wrap .flco-bulk-row:last-child .flco-bulk-row-field-wrap input").value = line;
			document.querySelector("a.flco-add").click();
		});
	}

	//Function For Title
	function getTitles() {
		lines = $("#wp-carry-help-input").val().split("\n");
		var pageTitle = document.querySelector("#uname").value;
		lines.map((line) => {
			// document.querySelector(".flco-bulk-form-wrap .flco-bulk-row:last-child .flco-new-post-type .flco-checkbox").classList.remove("on");
			// document.querySelector("a.flco-add").click();
			document.querySelector(".flco-bulk-form-wrap .flco-bulk-row:last-child .flco-new-post-type .flco-checkbox:last-child input").click();
			document.querySelector(".flco-bulk-form-wrap .flco-bulk-row:last-child .flco-bulk-row-field-wrap input").value = line;
			document.querySelector(".flco-bulk-form-wrap .flco-bulk-row:last-child .flco-bulk-row-field-wrap input[name=flco_content_id]").value = pageTitle;
			document.querySelector(".flco-bulk-form-wrap .flco-bulk-row:last-child .flco-checkbox-label .flco-bulk-row-field-wrap input").value = titleFilter(line);
			document.querySelector("a.flco-add").click();
		});
	}
})();
