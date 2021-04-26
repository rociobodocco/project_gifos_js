const contairerCam = document.querySelector('.containerVideoCam');
const btnStartCam = document.querySelector('.button-cam');
const btnStartRecord = document.querySelector('.button-record');
const btnStopRecord = document.querySelector('.button-stopRecord');
const btnUploadRecord = document.querySelector('.button-uploadRecord');

const createVideo = () => {
    const videoCam = document.createElement('video');
    videoCam.setAttribute('id', 'video');
    contairerCam.appendChild(videoCam);
    document.querySelector('.bot1').style.background = '#572EE5';
    document.querySelector('.bot1').style.color = '#FFFFFF';
    document.querySelector('.titleCamSection').innerHTML = `¿Nos das acceso a tu cámara?`;
    document.querySelector('.subtitleCamSection').innerHTML = `El acceso a tu camara será válido sólo
    por el tiempo en el que estés creando el GIFO.`;
};

const uploadEndpoint = 'http://upload.giphy.com/v1/gifs?api_key=W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I';

function showPreviewGif({ id }) {
    console.log(id);
    contairerCam.innerHTML = `<img class='preview-gif' data-id='${id}' src='https://i.giphy.com/${id}.gif'>`;
};

btnUploadRecord.addEventListener('click', function (ev) {
    const newGifoid = document.querySelector('.preview-gif').getAttribute('data-id');
    const localMyGifs = JSON.parse(localStorage.getItem('myGifos')) || [];
    localMyGifs.push(newGifoid);
    localStorage.setItem('myGifos', JSON.stringify(localMyGifs));
    document.querySelector('.bot2').style.background = '#FFFFFF';
    document.querySelector('.bot2').style.color = '#572EE5';
    document.querySelector('.bot3').style.background = '#572EE5';
    document.querySelector('.bot3').style.color = '#FFFFFF';
});

async function uploadGif(formData) {
    const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData
    });
    return response.json();
};

const startUpVideo = () => {
    createVideo();
    const video = document.querySelector('video');
    navigator.mediaDevices.getUserMedia({
        audio: false, //cambiar a true cuando este ok 
        video: true
    }).then(stream => {
        document.querySelector('.titleCamSection').style.display = 'none';
        document.querySelector('.subtitleCamSection').style.display = 'none';
        btnStartCam.style.display = 'none';
        alert('¿Nos das acceso a tu cámara? - El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO');
        video.srcObject = stream;
        video.play();
        contairerCam.style.display = 'block';
        document.querySelector('.bot1').style.background = '#FFFFFF';
        document.querySelector('.bot1').style.color = '#572EE5';
        document.querySelector('.bot2').style.background = '#572EE5';
        document.querySelector('.bot2').style.color = '#FFFFFF';
        btnStartRecord.style.display = 'block';

        const recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: () => { console.log('started') }
        });

        const startRecord = () => {
            console.log('Recording...');
            btnStartRecord.style.display = 'none';
            btnStopRecord.style.display = 'block';
            recorder.startRecording();
            // const sleep = m => new Promise(r => setTimeout(r, m));
            // sleep(3000);
        };

        btnStartRecord.addEventListener('click', startRecord);

        btnStopRecord.addEventListener('click', function stopRecording() {
            recorder.stopRecording(async function () {
                const blob = this.blob;
                console.log('End record.');
                let form = new FormData();
                form.append('file', recorder.getBlob(), 'myGif.gif');
                console.log(form.get('file'));
                btnStopRecord.style.display = 'none';
                const { data: gifData } = await uploadGif(form);
                btnUploadRecord.style.display = 'block';
                showPreviewGif(gifData)
            });
        });

    }).catch(e => console.log(e.name + "Se detectó un error. Por favor vuelva a intentar." + e.message));
};

btnStartCam.addEventListener('click', startUpVideo);

