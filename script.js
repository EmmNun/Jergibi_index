const projectsSubGallery = {
    digital: {
        title: "Criação Digital no Computador",
        desc: "Processo criativo com sketch inicial, estruturação de vetores e arte final vetorizada.",
        photos: ["trabalho1.jpg", "digital-detalhe1.jpg", "digital-detalhe2.jpg"]
    },
    printing: {
        title: "Printing de Alta Precisão",
        desc: "Configuração de perfis de cor, corte eletrônico de vinil e verificação de rolos.",
        photos: ["trabalho2.jpg", "printing-detalhe1.jpg", "printing-detalhe2.jpg"]
    },
    wrapping: {
        title: "Wrapping Automotivo Profissional",
        desc: "Limpeza da lataria, aplicação aquecida com soprador térmico e acabamento nas maçanetas.",
        photos: ["trabalho3.jpg", "wrapping-detalhe1.jpg", "wrapping-detalhe2.jpg"]
    }
};

let currentSubIndex = 0;
let currentPhotosArray = [];

function showPage(pageId) {
    const pages = document.querySelectorAll('.comic-page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if(targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function openProjectModal(projectId) {
    const modal = document.getElementById('subGalleryModal');
    const project = projectsSubGallery[projectId];

    if(!project) return;

    document.getElementById('subModalTitle').innerText = project.title;
    document.getElementById('subModalDesc').innerText = project.desc;

    currentPhotosArray = project.photos;
    currentSubIndex = 0;

    const track = document.getElementById('subPhotosTrack');
    track.innerHTML = "";

    currentPhotosArray.forEach(imgSrc => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'sub-photo-item';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "Detalhe do trabalho";
        
        itemDiv.appendChild(img);
        track.appendChild(itemDiv);
    });

    updateSubSliderPosition();
    modal.classList.add('active');
}

function slideSubPhotos(direction) {
    currentSubIndex += direction;
    
    if (currentSubIndex < 0) {
        currentSubIndex = currentPhotosArray.length - 1;
    } else if (currentSubIndex >= currentPhotosArray.length) {
        currentSubIndex = 0;
    }

    updateSubSliderPosition();
}

function updateSubSliderPosition() {
    const track = document.getElementById('subPhotosTrack');
    if(track) {
        track.style.transform = `translateX(-${currentSubIndex * 100}%)`;
    }
}

function closeProjectModal() {
    document.getElementById('subGalleryModal').classList.remove('active');
}

window.onclick = function(event) {
    const modal = document.getElementById('subGalleryModal');
    if (event.target == modal) {
        closeProjectModal();
    }
};