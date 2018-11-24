const cors = require('@koa/cors');
const koa = require('koa');
const app = new koa();

const Raspistill = require('node-raspistill').Raspistill;
const camera = new Raspistill({
    width: 640,
    height: 480,
    noFileSave: true
});

let lastImage = '';

cameraTimeLapse();
setInterval(cameraTimeLapse,5000);

function cameraTimeLapse() {
    camera.timelapse(500, 5000, (image) => {
	lastImage = image;
	console.log(image);
    }).then(() => {
    }).catch((error) => {
	console.log('An error occured with the raspberry pi camera');
    });
}

app.use(cors());

app.use(async ctx => {
    ctx.status = 200;
    ctx.body = lastImage.toString('base64');
});

app.listen(8080);
console.log('Yellow API Image Server started');
