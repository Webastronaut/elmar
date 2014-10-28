var timemachine = timemachine || {};

timemachine.app = function() {
	var that = {},
		entry = '<li data-start="0" data-stop="0" data-worktime="0"><img src="assets/img/drag.gif" alt="" title="Drag" class="drag" /><div contenteditable="true">Text ...</div><div class="icon btn icon-minus"><div class="icon-minus-circle"></div><div class="icon-minus-line"></div></div><div class="time"><span>00:00:00</span><div class="icon icon-clock btn stop"><div class="icon-clock-circle"></div><div class="icon-clock-line-1"></div><div class="icon-clock-line-2"></div></div></div></li>',
		tracklist = $('.entries'),
		add = $('.icon-plus'),
		edit = $('.edit'),
		isEditable = false,
		del,
		clear = $('.clear'),
		clock,
		editable,
		newWorktime,
		oldWorktime,
		hrs,
		min,
		sec,
		time,
		dragOptions = {},
		dropOptions = {},
		timeSpan,
		storeCount;


	that.init = function() {
		dragOptions = {
			revert : 'invalid',
			handle : '.drag',
			opacity : .8,
			axis : 'y',
			start : toggleDragNDrop,
			stop : toggleDragNDrop
		},
		dropOptions = {
			hoverClass: "dropover",
			drop : mergeItems,
			tolerance: 'intersect',
			accept : ':not(.tracking)'
		};

		$.storage = new $.store();
		restoreEntries();
		storeCount = window.setInterval(storeEntries, 30000);

		tracklist.find('> li').draggable(dragOptions).droppable(dropOptions);

		add.on('click', setNewEntry);
		edit.on('click', toggleEdit);
		$('.time span').live('dblclick', toggleEdit);
		clear.on('click', clearAll);

		clock = $('.icon-clock'),
		editable = $('[contenteditable]');
		del = $('.icon-minus');

		clock.live('click', toggleStartStop);
		editable.live('focusin focusout', toggleValue);

		$('.time span[contenteditable]').live('focusout', setNewTime);

		del.live('click', deleteItem);
	};

	var setEntryData = function(t) {
		var curTimestamp;

		(!t) ? curTimestamp = new Date().getTime() : curTimestamp = t;

		var newEntry = tracklist.find('li:first-child');

		newEntry.addClass('current');

		newEntry.find('.icon-clock').addClass('stop');
		newEntry.attr('data-start', curTimestamp);

		newEntry.draggable(dragOptions);
		newEntry.droppable(dropOptions);

		newEntry.addClass('tracking');
	};

	var setNewEntry = function() {
		var curTimestamp = new Date().getTime();

		if(isEditable) toggleEdit();

		$('.current').removeClass('current');

		tracklist.prepend(entry);

		window.setTimeout(function() {
			stopOldTracker(curTimestamp);
		}, 5);

		window.setTimeout(function() {
			setEntryData(curTimestamp);
		}, 10);
	};

	var stopOldTracker = function(t) {
		if($('.tracking').hasClass('.current')) return;

		$('.tracking').attr('data-stop', t);

		setTime();
	};

	var toggleStartStop = function() {
		var curTimestamp = new Date().getTime();

		if(isEditable) toggleEdit();

		($(this).hasClass('stop')) ? stopTracker(curTimestamp, $(this)) : startTracker(curTimestamp, $(this));
	};

	var startTracker = function(t, o) {
		stopOldTracker(t);

		window.setTimeout(function() {
			o.parent().parent().addClass('current');

			var current = $('.current');

			current.find('.icon-clock').addClass('stop');
			current.attr('data-start', t);
			current.addClass('tracking');
		}, 100);
	};

	var stopTracker = function(t, o) {
		$('.tracking').attr('data-stop', t);

		setTime();
	};

	// TODO must be better, but it works though
	var getTime = function(t) {
		hrs = Math.floor(t / 3600) % 24;
		min = Math.floor(t / 60) % 60;
		sec = Math.floor(t) % 60;

		time = (hrs < 10 ? '0' + hrs : hrs) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);

		return time;
	};

	var setTime = function() {
		var tracking = $('.tracking');

		newWorktime = Math.floor(parseInt(tracking.attr('data-stop'), 10) / 1000 - parseInt(tracking.attr('data-start'), 10) / 1000);
		oldWorktime = parseInt(tracking.attr('data-worktime'), 10);

		worktime = oldWorktime + newWorktime;

		tracking.attr('data-worktime', worktime);

		tracking.find('.time span').html(getTime(worktime));

		tracking.find('.icon-clock').removeClass('stop');
		tracking.removeClass();

		setFullTime();
	};

	var setFullTime = function() {
		var timeAll = 0;

		tracklist.find('li').each(function(i) {
			timeAll += parseInt($(this).attr('data-worktime'), 10);
		});

		$('.amount').html('<strong>Gesamt:</strong> ' + getTime(timeAll));
	};

	var setNewTime = function(e) {
		var curParent = $(this).parent().parent();

		if(e.type === 'focusout') {
			var newWorktime = $(this).text().split(':');

			hrs = parseInt(newWorktime[0], 10);
			min = parseInt(newWorktime[1], 10);
			sec = parseInt(newWorktime[2], 10);

			newWorktime = (hrs * 60 * 60) + (min * 60) + sec;

			curParent.attr('data-worktime', newWorktime);

			setFullTime();
		}
	};

	var mergeItems = function(e, d) {
		var dragged = d.draggable,
			dropped = $(this),
			draggedText = dragged.find('[contenteditable]').html(),
			droppedText = dropped.find('[contenteditable]').html(),
			draggedWorktime = parseInt(dragged.attr('data-worktime'), 10),
			droppedWorktime = parseInt(dropped.attr('data-worktime'), 10);

		dropped.find('[contenteditable]').html(droppedText + '<br />' + draggedText);

		dragged.remove();

		window.setTimeout(function() {
			worktime = droppedWorktime + draggedWorktime;

			dropped.attr('data-worktime', worktime);

			dropped.find('.time span').html(getTime(worktime));
		}, 10);

		window.setTimeout(function() {
			window.clearInterval(storeCount);
			storeCount = window.setInterval(storeEntries, 30000);
			storeEntries();

			setFullTime();

		}, 20);
	};
	// End TODO

	var toggleValue = function(e) {
		if(e.type === 'focusin') {
			$(this).parent().addClass('hasFocus');
		} else if(e.type === 'focusout') {
			$(this).parent().removeClass('hasFocus');
		}

		if(e.type === 'focusin' && $(this).text() == 'Text ...') {
			$(this).text('').parent().addClass('hasFocus');
		} else if(e.type === 'focusout' && $(this).text() == '') {
			$(this).text('Text ...').parent().removeClass('hasFocus');
		}
	};

	var toggleDragNDrop = function(e) {
		if(e.type === 'dragstart') {
			$(this).addClass('isDragged');
		} else {
			$(this).removeClass('isDragged');
		}
	};

	var toggleEdit = function(e) {
		e.preventDefault();

		if(!isEditable) {
			edit.text('Fertig');
			$('.amount').hide();
			$('.clear').show();
			tracklist.find('.icon-minus').fadeIn(100);
			$('.time span').css('opacity', '1').attr('contenteditable', 'true');
			isEditable = true;
		} else {
			edit.text('Bearbeiten');
			$('.clear').hide();
			$('.amount').show();
			$('.time span').removeAttr('contenteditable').removeAttr('style');
			tracklist.find('.icon-minus').fadeOut(100);
			isEditable = false;
			window.clearInterval(storeCount);
			storeCount = window.setInterval(storeEntries, 30000);
			storeEntries();
		}
	};

	var clearAll = function() {
		var check = confirm('Willst du wirklich alle Einträge löschen?');

		if(check) {

			var deleteme = tracklist.find('> li');

			deleteme.fadeTo(100, 0, function() {
				$(this).slideUp(function() {
					$(this).remove();
					tracklist.empty();
				});
			});

			toggleEdit();
		}
	};

	var deleteItem = function() {
		var deleteme = $(this).parent();

		deleteme.fadeTo(100, 0, function() {
			$(this).slideUp(function() {
				$(this).remove();
			});
		});
	};

	// TODO
	var storeEntries = function() {
		$.storage.flush();

		if($('.tracking').length !== 0) {
			var tempTimestamp = new Date().getTime();

			var tracking = $('.tracking');
			tracking.attr('data-stop', tempTimestamp);

			newWorktime = Math.floor(parseInt(tracking.attr('data-stop'), 10) / 1000 - parseInt(tracking.attr('data-start'), 10) / 1000);
			oldWorktime = parseInt(tracking.attr('data-worktime'), 10);

			worktime = oldWorktime + newWorktime;

			tracking.attr('data-worktime', worktime);
			tracking.attr('data-start', tempTimestamp);

			tracking.find('.time span').html(getTime(worktime));

			setFullTime();
		}

		var entries = [];

		// Add expire date?
		tracklist.find('> li').each(function(i) {
			entries[i] = {
				entryText : $(this).find('[contenteditable]').html(),
				entryTime : $(this).find('.time span').html(),
				entryStart : $(this).attr('data-start'),
				entryStop : $(this).attr('data-stop'),
				entryWorktime : $(this).attr('data-worktime'),
				tracking : $(this).hasClass('current') && $(this).hasClass('tracking') ? true : false
			};
		});

		$.storage.set('elmar', entries);
	};

	var restoreEntries = function() {
		var oldEntries = $.storage.get('elmar');

		if(oldEntries) {
			$.each(oldEntries, function(k, v) {
				tracklist.append('<li data-start="' + v.entryStart + '" data-stop="' + v.entryStop + '" data-worktime="' + v.entryWorktime + '"' + (v.tracking ? ' class="current tracking"' : '') + '><img src="/assets/img/drag.gif" alt="" title="Drag" class="drag" /><div contenteditable="true">' + v.entryText + '</div><div class="icon btn icon-minus"><div class="icon-minus-circle"></div><div class="icon-minus-line"></div></div><div class="time"><span>'  + v.entryTime + '</span><div class="icon icon-clock btn' + (v.tracking ? ' stop' : '') + '"><div class="icon-clock-circle"></div><div class="icon-clock-line-1"></div><div class="icon-clock-line-2"></div></div></div></li>');
			});

			setFullTime();
		} else {
			tracklist.append(entry);
			setEntryData();
		}
	};
	// End TODO

	var clearStorage = function() {
		tracklist.empty();
		$.storage.flush();
	};

	return that;
}();
