
//question object
function Question(id,val,slot) {
	this.id = id;		//stores element id
	this.val = val;		//stores value in input field
	this.slot = slot;	//stores the order that the questions in
}

//Section object stores an array of questions
function Section(id,slot){
	this.id = id;			//stores id of section
	this.q = [];			//stores array of questions q[0] being the first q in the survey
	this.slot = slot;		//use to keep track of the order of elements
	this.count = 0;			//count of questions made so far
	this.slot_finder = [];	//used as a hash to find slot value of a question from id
}

//Survey object stores an array of sections
function Survey(){
	this.s = [];			//array of sections
	this.count = 0;			//count of sections made so far
	this.slot_finder = [];	//slot_finder[section_id] will give section_slot (see above)
}

//function to update questions
Survey.prototype.editquestion = function (sec_id, q_id, new_val) {
  var sec_slot = mySurvey.slot_finder[sec_id];
  var q_slot = mySurvey.s[sec_slot].slot_finder[q_id];
  this.s[sec_slot].q[q_slot].id = new_val;
  //alert("value changed to " + mySurvey.s[sec_slot].q[q_slot].val);
};

//the main form object
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
	$('.sections').sortable({
		update: function(event, ui) {
			//alert($(this).attr('id'));
			var arr = $(this).sortable('toArray');
			var sec_slot = mySurvey.slot_finder[$(this).attr('id')];
			//alert(sec_slot);
			mySurvey.s[sec_slot].q = update_ques_order(arr, $(this).attr('id'));
			//alert(mySurvey.s[sec_slot].q[0].id);

		}
	
	});
	$('.sections').disableSelection();
}

//Known bugs: can't update the value of slot in each question object
function update_ques_order(array, sec_id){
	var i = 2;
	var j = 0;
	var newOrder = []; 
	var sec_slot = mySurvey.slot_finder[sec_id];
	
	while(i <= array.length){
		
		var oldSlot = mySurvey.s[sec_slot].slot_finder[array[i]];
		newOrder[j++] = mySurvey.s[sec_slot].q[oldSlot];
		alert("Q: " + mySurvey.s[sec_slot].q[oldSlot].val);
		//newOrder[j-1].val = j-1;
		//alert("Q: " + newOrder[j-1].val);
	i++;
	}
	return newOrder;

}

//creates new empty section
function make_section(id_num){
	var section = document.createElement("ul");
	section.setAttribute('class', 'sections');
	section.setAttribute('id', 'section_' + id_num);
	section.setAttribute('onclick', 'change_selection(this.id)');
	
	//essentially <li><ul>...Ques...</ul></li>  the "li" is part of a bigger list that 
	//enables the sections to be sortable 
	var wrapper = document.createElement("li");
	wrapper.setAttribute('class', 'form_sections');
	wrapper.innerHTML = "<h4>Section Name<h4>";
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


//code to add sections and questions
function add_section(){
	tmp_selcetion = 'section_' + sec_count;
	$('#form_display').append(make_section(sec_count++));
	change_selection(tmp_selcetion);
}

function add_question(){
	$('#' + curr_selcetion).append(make_question(ques_count++, curr_selcetion, mySurvey.slot_finder[curr_selcetion]));
	
	$( "input" ).keypress(function() {
		var value = $( this ).val();
		mySurvey.editquestion(curr_selcetion, 'question_' + (ques_count-1), value);
		//alert("New value is: " + value);
	});
}


//makes sections sortable
$(function() {
	$('#form_display').sortable();
	$('#form_display').disableSelection();	

});



//miscellaneous function for debugging
function debug(){
	alert(mySurvey.s[0].q[0].val);

}

