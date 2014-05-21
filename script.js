
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
}


//creates new empty section
function make_section(id_num){
	var section = document.createElement("ul");
	section.innerHTML = "<h4>Section Name<h4>";
	//section.setAttribute('class', 'sections');
	section.setAttribute('id', 'section_' + id_num);
	section.setAttribute('onclick', 'change_selection(this.id)');
	
	var wrapper = document.createElement("li");
	wrapper.setAttribute('class', 'sections');
	$(wrapper).append(section);
	
	return wrapper;
}

//creates a question box
function make_question(id_num){
	var question = document.createElement("li");
	question.innerHTML = '<h3>Question Name<h3>';
	question.innerHTML += '<input type="text" name="fname" value="Type question here">';
	question.setAttribute('class', 'questions');
	question.setAttribute('id', 'question_' + id_num);
	return question;
}


//code to and sections and questions
function add_section(){
	tmp_selcetion = 'section_' + sec_count;
	$('#form_display').append(make_section(sec_count++));
	change_selection(tmp_selcetion);
}

function add_question(){
	$('#' + curr_selcetion).append(make_question(ques_count++));

}





