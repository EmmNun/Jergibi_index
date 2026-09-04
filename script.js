// Dados detalhados dos trabalhos para exibição no Modal Expandido
const projectData = {
    trabalho1: {
        title: "Criação Digital no Computador",
        desc: "Desenvolvimento completo de identidade visual e mascotes utilizando mesas digitalizadoras e softwares profissionais. Cores principais aplicadas: azul vibrante e vermelho marcante sobre fundo contrastante.",
        img: "trabalho1.jpg"
    },
    trabalho2: {
        title: "Printing de Alta Precisão",
        desc: "Processo de impressão em larga escala focado em fidelidade de cores corporativas (preto, branco, vermelho e azul). Material vinil resistente a intempéries.",
        img: "trabalho2.jpg"
    },
    trabalho3: {
        title: "Wrapping Automotivo Profissional",
        desc: "Aplicação minuciosa de adesivos em veículos comerciais, garantindo acabamento sem bolhas, durabilidade e destaque visual nas ruas.",
        img: "trabalho3.jpg"
    }
};

// Função para alternar páginas simulando efeito de virar a página do gibi
function showPage(pageId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funções para abrir o Modal detalhado da galeria
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const data = projectData[projectId];

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalDesc').innerText = data.desc;
    document.getElementById('modalImg').src = data.img;

    modal.classList.add('active');
}

// Função para fechar o Modal
function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
}

// Fechar modal ao clicar fora da caixa de conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
}