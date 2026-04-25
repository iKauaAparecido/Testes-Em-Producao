const container = document.getElementById("container");
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");

let count = 1;

// adicionar card dinamicamente
addBtn.addEventListener("click", () => {
    criarCard();
});

// remover cards
removeBtn.addEventListener("click", () => {
    const lastCard = container.lastElementChild;
    if (lastCard) {
        container.removeChild(lastCard);
        count--;
    }
});

//Base de curiosidades
const curiosidadesBase = [
    {
        id: 1,
        titulo: "Polvo tem 3 corações",
        texto: "Polvos possuem três corações e sangue azul. Dois bombeiam sangue para as brânquias e um para o resto do corpo.",
        imagem: "img/polvo.jpg",
    },
    {
        id: 2,
        titulo: "O Espaço é silencioso",
        texto: "No espaço não há ar, então o som não se propaga. Por isso, explosões no espaço seriam totalmente silenciosas. Isso enfatiza que somente ondas eletromagnéticas andam no espaço",
        imagem: "img/space.jpeg"
    },
    {
        id: 3,
        titulo: "Usamos quase 100% do cérebro",
        texto: "O mito de que usamos apenas 10% do cérebro é falso. Exames mostram que praticamente todas as áreas têm alguma função.",
        imagem: "img/brain.jpg"
    },
    {
        id: 4,
        titulo: "A Terra não é perfeitamente redonda",
        texto: "A Terra é levemente achatada nos polos e mais larga no equador, formando um 'geoide' ",
        imagem: "img/earth.jpg"
    },
    {
        id: 5,
        titulo: "Água pode ferver e congelar ao mesmo tempo",
        texto: "Em condições especiais chamadas “ponto triplo”, a água pode existir nos três estados ao mesmo tempo.",
        imagem: "img/waterExperiment.jpg"
    },
]

//Essa função gera aleatoriamente uma curiosidade do objeto curiosidadesBase
function gerarCuriosidade() {
    const index = Math.floor(Math.random() * curiosidadesBase.length);
    return curiosidadesBase[index];
}

const newCuriosidade = document.getElementById("newCuriosidade");

//Evento que cria uma nova curisidade que o usuario deseja colocar
//Inserindo titulo, imagem e texto
newCuriosidade.addEventListener("click", () => {

    //Cria os popups para o usuario digitar
    const titulo = prompt("Digite o título:");
    const imagem = prompt("Digite a URL da imagem:");
    const texto = prompt("Digite o texto:");

    if (!titulo || !imagem || !texto) return; //verfica se é nulo

    //cria um objeto com os valores fornecidos do usuario
    const novaCuriosidade = {
        id: Date.now(),
        titulo,
        texto,
        imagem
    };

    //adiciona na base de curiosidades (não fica salvo local, assim que a pag atualiza)
    //volta para a base de antes
    curiosidadesBase.push(novaCuriosidade);
});

//Função que cria os cards
function criarCard(){
    const card = document.createElement("div");
    card.classList.add("card");
    const conteudoSrc = gerarCuriosidade();

    card.innerHTML = `
        <h3>${conteudoSrc.titulo}</h3>
        <img src="${conteudoSrc.imagem}" alt="Imagem da curiosidade">
        <p>${conteudoSrc.texto}</p>
    `;

    card.addEventListener("mouseenter", () => {
        card.style.background = "#EE82EE";
    });

    card.addEventListener("mouseleave", () => {
        card.style.background = "pink";
    });

    container.appendChild(card);

    count++;
}