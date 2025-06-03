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

	$('#stop').on('click', () => {
		hush();
		console.log('stop');
	});
});