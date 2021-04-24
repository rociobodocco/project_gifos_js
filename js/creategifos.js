const btnAccionsCam = document.querySelector('.button-cam');
const contairerCam = document.querySelector('.containerVideoCam');

const createVideo = () => {
    const videoCam = document.createElement('video');
    videoCam.setAttribute('id', 'video');
    contairerCam.appendChild(videoCam);
    document.querySelector('.bot1').style.background = '#572EE5';
    document.querySelector('.bot1').style.color = '#FFFFFF';
    document.querySelector('.titleCamSection').innerHTML = `¿Nos das acceso a tu cámara?`;
    document.querySelector('.subtitleCamSection').innerHTML = `El acceso a tu camara será válido sólo
    por el tiempo en el que estés creando el GIFO.`;
    
}

const startUpVideo = () => {
    createVideo();
    const video = document.querySelector('video');
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(stream => {
        document.querySelector('.titleCamSection').style.display = 'none';
        document.querySelector('.subtitleCamSection').style.display = 'none';
        alert('¿Nos das acceso a tu cámara? - El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO');
        video.srcObject = stream
        contairerCam.style.display = 'block';
    }).catch(e => console.log(e.name + ": Se detectó un error. Por favor vuelva a intentar."+ e.message))
};

btnAccionsCam.addEventListener('click', startUpVideo);
