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
		<label>Offset (ms)</label>
		<input class="offset" type="number" value="0">
	</div>
	<audio class="sample__preview" hidden controls autoplay preload="auto"></audio>
	<input class="sample__file" type="text" hidden>
`;

const data = {
	samples: ['Roland A Line 02.wav','cw_junobass04.wav', 'Arp A C1.wav'],
};
const addBtn = document.querySelector('.add_samples');
const playBtn = document.querySelector('.play');

document.body.addEventListener('change', function (e) {
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
		let offset = el.querySelector('.offset').value;

		setTimeout((offset)=>{
			sound.play();
		},(offset));

	})

});
