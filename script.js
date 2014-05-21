
//question object
function Question(id,val,slot) {
	this.id = id;
	this.val = val;
	this.slot = slot;
}

//Section object stores an array of questions
function Section(id,slot){
	this.id = id;
	this.q = [];
	this.slot = slot;
	this.count = 0;
	this.slot_finder = [];
}

//Survey object stores an array of sections
function Survey(){
	this.s = [];
	this.count = 0;
	this.slot_finder = [];
}


var mySurvey = new Survey();

//global variables for selectors
var sec_count = 0;
var ques_count = 0;
var curr_selcetion = null;

//Responsible for changing which section is selected.
function change_selection(new_id){
	if(curr_selcetion != null){
		$('#' + curr_selcetion).css('border','1px solid cyan');
	}
	curr_selcetion = new_id;
	$('#' + curr_selcetion).css('border','1px solid blue');
	
	//makes only the current selection sortable
	$('#' + new_id).sortable({
		update: function(event, ui) {
			//var Order = $(".sections").sortable('toArray').toString();
			var arr = $('#' + new_id).sortable('toArray');
			var sec_slot = mySurvey.slot_finder[curr_selcetion];
			mySurvey.s[sec_slot].q = update_ques_order(arr, curr_selcetion);
			alert(mySurvey.s[sec_slot].q[0].id);
			//var clill = $('#' + arr[1]).children('input').val();
			//alert(clill);
		}
	
	});
	$('#' + new_id).disableSelection();
}

function update_ques_order(array, sec_id){
	var i = 2;
	var j = 0;
	var newOrder = []; 
	//mySurvey.s[0].q[0].val
	var sec_slot = mySurvey.slot_finder[sec_id];
	
	alert("Section: " + sec_id);// mySurvey.s[sec_id].id);// + " Question: " + mySurvey.s[sec_id].q[0].id);
	while(i <= array.length){
		
		var oldSlot = mySurvey.s[sec_slot].slot_finder[array[i]];
		newOrder[j++] = mySurvey.s[sec_slot].q[oldSlot];

	i++;
	}
	return newOrder;

}

//creates new empty section
function make_section(id_num){
	var section = document.createElement("ul");
	section.innerHTML = "<h4>Section Name<h4>";
	section.setAttribute('class', 'sections');
	section.setAttribute('id', 'section_' + id_num);
	section.setAttribute('onclick', 'change_selection(this.id)');
	
	//essentially <li><ul>...Ques...</ul></li>  the "li" is part of a bigger list that 
	//enables the sections to be sortable 
	var wrapper = document.createElement("li");
	wrapper.setAttribute('class', 'form_sections');
	$(wrapper).append(section);
	
	//Creates Section object and adds it to Survey Object
	var tmp = new Section('section_' + id_num, mySurvey.count);
	mySurvey.slot_finder['section_' + id_num] = mySurvey.count;
	mySurvey.s[mySurvey.count++] = tmp;
	
	return wrapper;
}

//creates a question box
function make_question(id_num, sec_id, sec_slot){
	var question = document.createElement("li");
	question.innerHTML = '<h3>Question Name<h3>';
	question.innerHTML += '<input type="text" name="fname" value="Type question here">';
	question.setAttribute('class', 'questions');
	question.setAttribute('id', 'question_' + id_num);
	
	//make Question object and add it to section object
	var tmp = new Question('question_' + id_num, "Type question here", mySurvey.s[sec_slot].count);
	mySurvey.s[sec_slot].slot_finder['question_' + id_num] = mySurvey.s[sec_slot].count;
	mySurvey.s[sec_slot].q[mySurvey.s[sec_slot].count++] = tmp;
	
	return question;
}


//code to and sections and questions
function add_section(){
	tmp_selcetion = 'section_' + sec_count;
	$('#form_display').append(make_section(sec_count++));
	change_selection(tmp_selcetion);
}

function add_question(){
	$('#' + curr_selcetion).append(make_question(ques_count++, curr_selcetion, mySurvey.slot_finder[curr_selcetion]));

}


$(function() {
	$('#form_display').sortable();
	$('#form_display').disableSelection();

});


//miscellaneous function for debugging
function debug(){
	alert(mySurvey.s[0].q[0].val);

}

