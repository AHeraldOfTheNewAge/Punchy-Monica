$(document).ready(() => {
	initStrudel();

	// document.getElementById('play').addEventListener('click', () => {
	// 	// Try _punchcard again. The issue might be that the Strudel context
	// 	// wasn't fully initialized for inline visuals without a target.
	// 	strudel.evaluate(`note("c3 bb2 f3 eb3 bb4, [55 57]/6")
	// .sound("sawtooth").lpf(400)
	// .attack(1)
	// .decay(1)
	// .sustain(1)
	// .release(2).echo(2, 1/6, .8).color("gray").spectrum()`);
	// 	// strudel.setVisual('punchcard');
	// });

	$('#play').on('click', () => {
		var noteGroup1 = [];
		var isAnyValidNote = false;

		for (var index = 0; index <= 5; index++) {
			var note = $('#g1n' + index).text();

			if (note == 'X') {
				continue;
			}

			if (note != '-') {
				isAnyValidNote = true;
			}

			noteGroup1.push(note);
		}

		var noteGroup2 = [];

		for (var index = 3; index <= 5; index++) {
			var note = $('#g2n' + index).text();

			if (note == 'X') {
				continue;
			}

			if (note != '-') {
				isAnyValidNote = true;
			}

			noteGroup2.push(note);
		}

		if (!isAnyValidNote) {
			alert('Punch-in some numbers!');

			return;
		}

		toEval = '';

		if (noteGroup1.length) {
			noteGroup1 = noteGroup1.join(' ');
			noteGroup1 = `[${noteGroup1}]`;

			var speedModifier = parseInt($('#g1SLD').text());

			if (speedModifier > 1) {
				noteGroup1 += '/' + speedModifier;
			}

			toEval += noteGroup1;
		}

		if (noteGroup2.length) {
			if (toEval.length) {
				toEval += ', ';
			}

			noteGroup2 = noteGroup2.join(' ');
			noteGroup2 = `[${noteGroup2}]`;

			var speedModifier = parseInt($('#g2SLD').text());

			if (speedModifier > 1) {
				noteGroup2 += '/' + speedModifier;
			}

			toEval += noteGroup2;
		}

		var wave = $('#waveD').text();
		var attack = $('#attackD').text();
		var decay = $('#decayD').text();
		var sustain = $('#sustainD').text();
		var release = $('#releaseD').text();

		toEval = `note("${toEval}").sound("${wave}").lpf(400).attack(${attack}).decay(${decay}).sustain(${sustain}).release(${release}).echo(2, 1/6, .8).color("gray").spectrum()`;

		strudel.evaluate(toEval);

		$('#output').addClass('active');
		$('#input').removeClass('active');
	});

	$('#stop').on('click', () => {
		strudel.evaluate('hush()');

		$('#input').addClass('active');
		$('#output').removeClass('active');
	});

	$('.note').on('click', (evt) => { // Reset note
		$('#' + evt.target.id).text('X');
	});

	$('.noteD').on('click', (evt) => { // Up the note
		var idTarget = evt.target.id.replace('p', '');
		var currentValue = $('#' + idTarget).text();

		if (currentValue == '-' || currentValue == 'X') {
			currentValue = currentValue == 'X' ? '-' : 1;

			$('#' + idTarget).text(currentValue);

			return;
		}

		currentValue = parseInt(currentValue);
		currentValue++;

		if (currentValue > 99) {
			currentValue = 'X';
		}

		$('#' + idTarget).text(currentValue);
	});


	$('#g1SL').on('click', () => {
		var currentValue = parseInt($('#g1SLD').text());

		if (currentValue == 10) {
			$('#g1SLD').text(1);

			return;
		}

		$('#g1SLD').text(currentValue + 1);
	});

	$('#g2SL').on('click', () => {
		var currentValue = parseInt($('#g2SLD').text());

		if (currentValue == 10) {
			$('#g2SLD').text(1);

			return;
		}

		$('#g2SLD').text(currentValue + 1);
	});

	$('#attack').on('click', () => {
		var currentValue = parseFloat($('#attackD').text());

		if (currentValue == 5) {
			$('#attackD').text(0);

			return;
		}

		$('#attackD').text(currentValue + 0.25);
	});

	$('#decay').on('click', () => {
		var currentValue = parseFloat($('#decayD').text());

		if (currentValue == 3) {
			$('#decayD').text(0);

			return;
		}

		$('#decayD').text(currentValue + 0.25);
	});

	$('#sustain').on('click', () => {
		var currentValue = parseFloat($('#sustainD').text());

		if (currentValue == 1) {
			$('#sustainD').text(0);

			return;
		}

		$('#sustainD').text((currentValue + 0.05).toFixed(2));
	});

	$('#release').on('click', () => {
		var currentValue = parseFloat($('#releaseD').text());

		if (currentValue == 5) {
			$('#releaseD').text(0);

			return;
		}

		$('#releaseD').text(currentValue + 0.5);
	});

	$('#fx').on('click', () => {
		return; // TODO -> must find a way to do this properly!

		var currentValue = $('#echoD').text();

		if (currentValue == '2, 1/6, .8') {
			$('#echoD').text(0);

			return;
		}

		if (currentValue == '0') {
			$('#echoD').text(1);

			return;
		}
		$('#releaseD').text(currentValue);
	});

	$('#wave').on('click', () => {
		var currentValue = $('#waveD').text();

		switch (currentValue) {
			case 'sawtooth':
				$('#waveD').text('square');

				break;
			case 'square':
				$('#waveD').text('triangle');

				break;
			case 'triangle':
				$('#waveD').text('sine');

				break;
			default:
				$('#waveD').text('sawtooth');

				break;
		}
	});
});