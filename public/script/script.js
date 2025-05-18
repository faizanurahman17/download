const p = document.querySelector('p');
const btn = document.querySelector('.button');
const h1 = document.querySelector('h1');
const img = document.querySelector('img');
const msg = document.querySelector('.msg');
const send = document.querySelector('.send');
const sendLink = document.querySelector('.sendLink');

send.addEventListener('click', sendMessage);

msg.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e);
    }
});

let onbtn = true;
btn.addEventListener('click', () => {
    if (onbtn) {
        p.style.color = '';
        p.classList.add('p');
        setTimeout(() => {
            downloaded();
        }, 3000);
        const isConfirm = confirm('Do you want to download this file?');
        if (isConfirm) {
            downloadThis();
        } else {
            notDownloded();
        }
    }
});

function downloadThis() {
    h1.classList.add('h1');
    btn.classList.add('btn');
    p.textContent = 'downloading';
    p.style.bottom = '5%';
    setTimeout(() => {
        p.style.bottom = '5%';
        p.textContent = 'Downloaded';

        const photoLink = document.createElement('a');
        photoLink.href = img.src;
        photoLink.download = 'meme.jpg';
        document.body.appendChild(photoLink);
        photoLink.click();
        document.body.removeChild(photoLink);
    }, 3000);
    setTimeout(() => {
        p.style.bottom = '-10%';
    }, 4500);
}

function downloaded() {
    p.style.bottom = '-10%';
    h1.classList.remove('h1');
    btn.classList.remove('btn');
}

function notDownloded() {
    p.style.color = 'red';
    p.style.bottom = '5%';
    p.textContent = 'Download failed!';
    setTimeout(() => {
        p.style.bottom = '-10%';
    }, 2000);
    onbtn = true;
}

async function getNumNSend() {
    const res = await fetch('/api/number');
    const data = await res.json();
    console.log(data.myNum);
    return data.myNum;

}

async function sendMessage(e) {
    e.preventDefault();

    const message = msg.value.trim();
    if (!message) {
        alert('Please enter a Message');
        return;
    }

    const encodedMessage = encodeURIComponent(message);
    const myNum = await getNumNSend();

    window.location.href = `https://wa.me/${myNum}?text=${encodedMessage}`;
}