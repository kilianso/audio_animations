const template = data => `
	<div class="column">
		<label>Audio snippet</label>
		<select class="sample__sound" name="">
			<option selected="true" disabled="disabled">Select sound</option>
			${
				data.samples.map(
					item => `<option value="${item}">${item}</option>`
				).join('\n')
			}
		</select>
	</div>

	<div class="column">
		<label>Duration (ms)</label>
		<input class="sample__duration" type="number" value="0">
	</div>

	<div class="column">
		<label>Starts at (ms)</label>
		<input class="sample__start" type="number" value="0">
	</div>
	<div class="column">
		<button class="remove">remove</button>
	</div>
	<audio class="sample__preview" hidden controls autoplay preload="auto"></audio>
	<input class="sample__file" type="text" hidden>
`;

const data = {
	samples: [
		'Arp A A1.wav',
		'Arp A C1.wav',
		'Arp D Line 01.wav',
		'cw_junobass01.wav',
		'cw_junobass22.wav',
		'cw_junobass23.wav',
		'cw_junobass24.wav',
		'Roland A Line 02.wav'
	]
};
const addBtn = document.querySelector('.add_samples');
const playBtn = document.querySelector('.play');

// live bindings for dynamically added elements
document.body.addEventListener('change', function (e) {
	e.preventDefault();
  if(e.target && e.target.classList.contains('sample__sound') ) {
		let preview = e.target.parentNode.parentNode.querySelector('.sample__preview');
		let file = e.target.parentNode.parentNode.querySelector('.sample__file');

		preview.src = './audio/' + e.target.options[e.target.selectedIndex].value;
		file.value = './audio/' + e.target.options[e.target.selectedIndex].value;
		preview.oncanplay = () => {
			e.target.parentNode.parentNode.querySelector('.sample__duration').value = Math.round(preview.duration * 1000);
		}
  };
});

document.body.addEventListener('click', function (e) {
	e.preventDefault();
  if(e.target && e.target.classList.contains('remove') ) {
		e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
	};
});

// normal bindigs for static dom elements
addBtn.addEventListener('click', () => {
	let line = document.createElement('div')
	line.classList.add('sample');
	line.innerHTML = template(data);
	sampler.appendChild(line);
});

playBtn.addEventListener('click', () => {
	let samples = document.querySelectorAll('.sample');
	samples.forEach((el, index)=>{
		let sound = el.querySelector('audio');
		let startsAt = el.querySelector('.sample__start').value;

		setTimeout((startsAt)=>{
			sound.play();
		},(startsAt));

	})

});
