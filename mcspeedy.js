javascript:(function() {
  const ticks = [0.25, 0.5, 1, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3, 3.5, 4, 8, 12, 16];
  const video = document.querySelector('video');
  if (typeof(video) === 'undefined') {
    return;
  }
  const currentSpeed = video.playbackRate;
  const currentIndex = ticks.indexOf(currentSpeed);

  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.zIndex = 1000;
  popup.style.padding = '1em';
  popup.style.backgroundColor = '#FFF';
  popup.style.border = '1px solid #000';
  popup.style.textAlign = 'center';
  popup.style.cursor = 'pointer';

  const input = document.createElement('input');
  input.type = 'range';
  input.min = 0;
  input.max = ticks.length - 1;
  input.step = 1;
  input.value = currentIndex != -1 ? currentIndex : 1;
  input.style.flexGrow = "1";
  input.setAttribute("list", "steplist");
  popup.appendChild(input);

  const datalist = document.createElement('datalist');
  datalist.id = "steplist";
  for (var i = 0; i < ticks.length; i++) {
    const option = document.createElement('option');
    option.innerText = i;
    datalist.appendChild(option);
  }
  popup.appendChild(datalist);

  const labels = document.createElement('div');
  labels.style.display = 'flex';
  labels.style.justifyContent = 'space-between';
  popup.appendChild(labels);

  ticks.forEach(tick => {
    const label = document.createElement('div');
    label.innerText = tick;
    label.style.flex = '1';
    label.style.textAlign = 'center';
    label.style.width = `${100 / ticks.length}%`;
    label.style.transform = 'rotate(90deg)';
    label.addEventListener('mousedown', () => {
      input.value = ticks.indexOf(tick);
    });
    label.addEventListener('mouseup', () => {
      document.body.removeChild(popup);
    });
    labels.appendChild(label);
  });

  input.addEventListener('input', () => {
    video.playbackRate = ticks[input.value];
  });

  input.addEventListener('mouseup', () => {
    document.body.removeChild(popup);
  });

  input.style.width = `400px`;

  document.body.appendChild(popup);
})();
