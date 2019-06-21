$(function() {

	let loading = false;

	$(document).on('click', '#add-new-todo', function () {
		addTodoAjax();
	});

	$(document).on('keypress', function(e) {
		if(e.which == 13) {
			addTodoAjax();
		}
	});

	function addTodoAjax(button) {

		let data = {
			"todo": $('.todo-input').val()
		}

		if( data.todo == '' || data.todo == ' ') {
			return false;
		}

		if (loading == true) {
			return false;
		}

		loading = true;

		$('.add-todo-loading').css({'display': 'inline-block'});
		$.ajax({
		    type: 'POST',
		    url: '/todo',
		    contentType: 'application/json',
		    data: JSON.stringify(data),
		}).done(function (dataServer) {
			loading = false;
			$('.add-todo-loading').css({'display': 'none'});
			createTodo( data.todo, dataServer[dataServer.length-1]._id );
		}).fail(function (dataServer) {
			loading = false;
			$('.add-todo-loading').css({'display': 'none'});
		});
	}

	function createTodo(text, id){
		let markup = '<li class="ui-state-default"><div class="checkbox"><label> <button id="'+ id +'" class="item btn btn-default btn-xs pull-left add-as-done"><span class="glyphicon glyphicon-ok"></span></button><span style="margin-left: 5px; line-height: 1.7;">'+ text +'</span></label></div></li>';
		$('#sortable').append(markup);
		$('.add-todo').val('');
    	let count = parseInt($('.count-todos').text());
    	count += 1;
    	$('.count-todos').text(count);
    }

});
