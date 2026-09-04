```javascript
/* =========================================
   GALERIAS DOS PROJETOS
========================================= */

const projectsSubGallery = {

    digital: {

        title: "Criação Digital no Computador",

        desc:
            "Processo criativo com sketch inicial, estruturação de vetores e arte final vetorizada.",

        photos: [
            "trabalho1.jpg",
            "digital-detalhe1.jpg",
            "digital-detalhe2.jpg"
        ]

    },


    printing: {

        title: "Printing de Alta Precisão",

        desc:
            "Configuração de perfis de cor, corte eletrônico de vinil e verificação de rolos.",

        photos: [
            "trabalho2.jpg",
            "printing-detalhe1.jpg",
            "printing-detalhe2.jpg"
        ]

    },


    wrapping: {

        title: "Wrapping Automotivo Profissional",

        desc:
            "Limpeza da lataria, aplicação aquecida com soprador térmico e acabamento.",

        photos: [
            "trabalho3.jpg",
            "wrapping-detalhe1.jpg",
            "wrapping-detalhe2.jpg"
        ]

    }

};


/* =========================================
   CONTROLE DA NAVEGAÇÃO
========================================= */

let currentPage = "home";

let isChangingPage = false;


/* =========================================
   MOSTRAR PÁGINA
========================================= */

function showPage(pageId) {

    if (pageId === currentPage || isChangingPage) {
        return;
    }


    const current = document.getElementById(currentPage);

    const next = document.getElementById(pageId);


    if (!next) {
        return;
    }


    isChangingPage = true;


    /*
       Coloca a nova página no topo.
    */

    next.classList.remove("page-leaving");

    next.classList.add("active");


    /*
       A página anterior sai para a esquerda.
    */

    if (current) {

        current.classList.add("page-leaving");

        current.classList.remove("active");

    }


    /*
       Atualiza a página atual.
    */

    currentPage = pageId;


    /*
       Pequeno delay para deixar a animação terminar.
    */

    setTimeout(() => {

        if (current) {

            current.classList.remove("page-leaving");

        }

        isChangingPage = false;

    }, 850);


    /*
       Volta para o topo.
    */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    /*
       Atualiza a URL.
    */

    history.pushState(
        null,
        "",
        "#" + pageId
    );

}


/* =========================================
   ABRIR PROJETO
========================================= */

let currentSubIndex = 0;

let currentPhotosArray = [];


function openProjectModal(projectId) {

    const modal =
        document.getElementById("subGalleryModal");


    const project =
        projectsSubGallery[projectId];


    if (!project) {
        return;
    }


    /*
       Título
    */

    document.getElementById(
        "subModalTitle"
    ).innerText = project.title;


    /*
       Descrição
    */

    document.getElementById(
        "subModalDesc"
    ).innerText = project.desc;


    /*
       Fotos
    */

    currentPhotosArray = project.photos;

    currentSubIndex = 0;


    const track =
        document.getElementById("subPhotosTrack");


    track.innerHTML = "";


    currentPhotosArray.forEach(
        function(imgSrc) {

            const item =
                document.createElement("div");

            item.className =
                "sub-photo-item";


            const img =
                document.createElement("img");

            img.src = imgSrc;

            img.alt =
                "Detalhe do trabalho";


            /*
               Se a imagem não existir,
               mostra uma mensagem.
            */

            img.onerror = function() {

                this.style.display = "none";

                item.innerHTML +=
                    "<p style='color:white;padding:40px;'>Imagem não encontrada: "
                    + imgSrc +
                    "</p>";

            };


            item.appendChild(img);

            track.appendChild(item);

        }
    );


    updateSubSliderPosition();


    /*
       Abre modal
    */

    modal.classList.add("active");


    /*
       Impede scroll da página
    */

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   SLIDER DOS PROJETOS
========================================= */

function slideSubPhotos(direction) {

    if (currentPhotosArray.length === 0) {
        return;
    }


    currentSubIndex += direction;


    if (
        currentSubIndex < 0
    ) {

        currentSubIndex =
            currentPhotosArray.length - 1;

    }


    if (
        currentSubIndex >=
        currentPhotosArray.length
    ) {

        currentSubIndex = 0;

    }


    updateSubSliderPosition();

}


/* =========================================
   ATUALIZAR POSIÇÃO
========================================= */

function updateSubSliderPosition() {

    const track =
        document.getElementById(
            "subPhotosTrack"
        );


    if (!track) {
        return;
    }


    track.style.transform =
        `translateX(-${currentSubIndex * 100}%)`;

}


/* =========================================
   FECHAR MODAL
========================================= */

function closeProjectModal() {

    const modal =
        document.getElementById(
            "subGalleryModal"
        );


    modal.classList.remove("active");


    document.body.style.overflow =
        "";

}


/* =========================================
   CLICAR FORA DO MODAL
========================================= */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "subGalleryModal"
            );


        if (
            event.target === modal
        ) {

            closeProjectModal();

        }

    }
);


/* =========================================
   ESC PARA FECHAR MODAL
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        /*
           ESC fecha o modal
        */

        if (
            event.key === "Escape"
        ) {

            closeProjectModal();

        }


        /*
           Setas controlam a galeria
        */

        if (
            document
                .getElementById(
                    "subGalleryModal"
                )
                .classList.contains("active")
        ) {

            if (
                event.key === "ArrowLeft"
            ) {

                slideSubPhotos(-1);

            }


            if (
                event.key === "ArrowRight"
            ) {

                slideSubPhotos(1);

            }

        }

    }
);


/* =========================================
   QUANDO O SITE ABRE
========================================= */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           Verifica se existe uma página
           na URL.

           Exemplo:

           index.html#about
        */

        const hash =
            window.location.hash
                .replace("#", "");


        const validPages = [
            "home",
            "about",
            "works",
            "contact"
        ];


        if (
            validPages.includes(hash)
        ) {

            /*
               Começa pela Home e depois
               muda para a página solicitada.
            */

            if (hash !== "home") {

                setTimeout(
                    function() {

                        showPage(hash);

                    },
                    300
                );

            }

        }

    }
);


/* =========================================
   BOTÃO VOLTAR DO NAVEGADOR
========================================= */

window.addEventListener(
    "popstate",
    function() {

        const hash =
            window.location.hash
                .replace("#", "") ||
            "home";


        if (
            hash !== currentPage
        ) {

            /*
               Remove bloqueio para permitir
               a navegação pelo botão voltar.
            */

            isChangingPage = false;

            showPage(hash);

        }

    }
);
```
