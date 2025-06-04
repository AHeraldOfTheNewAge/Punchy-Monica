$(document).ready(() => {
	initStrudel();

	document.getElementById('play').addEventListener('click', () => {
		// Try _punchcard again. The issue might be that the Strudel context
		// wasn't fully initialized for inline visuals without a target.
		strudel.evaluate(`note("c3 bb2 f3 eb3 bb4, [55 57]/6")
	.sound("sawtooth").lpf(400)
	.attack(1)
	.decay(1)
	.sustain(1)
	.release(2).echo(2, 1/6, .8).color("gray").spectrum().play()`);
		// strudel.setVisual('punchcard');
	});

	$('#attack').on('click', () => {
		var noteGroup1 = [];

		for (var index = 1; index <= 6; index++) {
			var note = $('#g1n' + index).text();

			if (note == 0) {
				continue;
			}

			noteGroup1.push(note);
		}

		var noteGroup2 = [];

		for (var index = 1; index <= 3; index++) {
			var note = $('#g2n' + index).text();

			if (note == 0) {
				continue;
			}

			noteGroup2.push(note);
		}

		console.log(noteGroup1, noteGroup2);
	});

	$('#stop').on('click', () => {
		hush();
		console.log('stop');
	});

	$('.note').on('click', (evt) => { // Reset note
		$('#' + evt.target.id).text('0');
	});

	$('.noteD').on('click', (evt) => { // Up the note
		var idTarget = evt.target.id.replace('p', '');
		var currentValue = parseInt($('#' + idTarget).text());
		currentValue++;

		if (currentValue > 99) {
			currentValue = 0;
		}

		$('#' + idTarget).text(currentValue);
	});
});