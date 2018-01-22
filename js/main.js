const template = data => `
	<div class="column">
		<label>Select sample</label>
		<select class="sample__sound" name="">
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
		<label>Next (ms)</label>
		<input class="delay" type="number" value="0">
	</div>
	<audio class="sample__preview" hidden controls autoplay preload="auto"></audio>
	<input id="sample__file" type="number" hidden>
`;

const data = {
	samples: ['Roland A Line 02.wav','cw_junobass04.wav', 'Arp A C1.wav'],
	title: "My New Post",
	body: "This is my first post!"
};

document.body.addEventListener( 'change', function (e) {
  if(e.target && e.target.classList.contains('sample__sound') ) {
    console.log('yo');
  };
});

// document.addEventListener('DOMContentLoaded', () => {
// 	const sampler = document.getElementById('sampler');
// 	const sounds = document.getElementById('sounds');
// 	const preview = document.getElementById('preview');
// 	const duration = document.getElementById('duration');
// 	sounds.addEventListener('change', () => {
// 		preview.src = './audio/' + sounds.options[sounds.selectedIndex].value;
// 		preview.oncanplay = () => {
// 			duration.value = Math.round(preview.duration*1000);
// 		}
// 	});
// });

const addBtn = document.querySelector('.add_samples');
addBtn.addEventListener('click', () => {
	let line = document.createElement('div')
	line.classList.add('sample');
	line.innerHTML = template(data);
	sampler.appendChild(line);
});
