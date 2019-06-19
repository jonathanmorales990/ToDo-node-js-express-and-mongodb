$(function() {

	$(document).on('click', '.add-as-done', function () {
		addAsDoneAjax($(this));
	});

	function addAsDoneAjax(element) {

		let data = {
			"_id": $(element).attr('id')
		}

		$.ajax({
			type: 'POST',
			url: '/todo',
			contentType: 'application/json',
			data: JSON.stringify(data),
		}).done(function (dataServer) {

			$(element).closest('li').remove();
			doneTodo(dataServer[0].todo, dataServer[0]._id);

		}).fail(function (dataServer) {
			console.log(dataServer);
		});
	}
	function doneTodo(doneItem, id){
		var done = doneItem;
		var markup = '<li>'+ done +'<button id="'+ id +'" class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
		$('#done-items').append(markup);
    	}
});
