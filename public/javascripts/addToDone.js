$(function() {

	let loading = false;

	$(document).on('click', '.add-as-done', function () {
		addAsDoneAjax($(this));
	});

	function addAsDoneAjax(element) {

		let data = {
			"_id": $(element).attr('id')
		}
		if (loading == true) {
			return false;
		}

		loading = true;

		$(element).empty();
		$(element).append('<img class="add-as-done-loading" src="/images/loading.gif">');

		$.ajax({
			type: 'PUT',
			url: '/todo',
			contentType: 'application/json',
			data: JSON.stringify(data),
		}).done(function (dataServer) {
			loading = false;

			$(element).empty();
			$(element).append(' <span class="glyphicon glyphicon-ok"></span>');
			$(element).closest('li').remove();
			doneTodo(dataServer[0].todo, dataServer[0]._id);

		}).fail(function (dataServer) {
			loading = false;

			$(element).empty();
			$(element).append(' <span class="glyphicon glyphicon-ok"></span>');
		});
	}
	function doneTodo(doneItem, id){
		var done = doneItem;
		var markup = '<li>'+ done +'<button id="'+ id +'" class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
		$('#done-items').append(markup);
		let count = parseInt($('.count-todos').text());
		if (count > 0) {
			count -= 1;
		}
		$('.count-todos').text(count);
	}
});
