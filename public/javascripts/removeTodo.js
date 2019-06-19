$(function() {
	$(document).on('click', '.remove-item', function () {
		removeAjax($(this));
	});
	function removeAjax (element) {
		let data = {
			"_id": $(element).attr('id')
		}

		$.ajax({
			type: 'DELETE',
			url: '/todo',
			contentType: 'application/json',
			data: JSON.stringify(data),
		}).done(function (dataServer) {

		/*	$(element).closest('li').remove();*/
			console.log(dataServer);

		}).fail(function (dataServer) {
			console.log(dataServer);
		});
	}
});