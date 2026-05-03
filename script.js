const container = document.getElementById("container");
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");

let count = 1;

// adicionar card dinamicamente
addBtn.addEventListener("click", () => {
    const dado = gerarCuriosidade();

    if(dado){
        criarCardPersonalizado(dado);
    }
    
});

// remover cards
removeBtn.addEventListener("click", () => {
    const lastCard = container.lastElementChild;
    if (lastCard) {
        container.removeChild(lastCard);
        if(count > 0){
            count--;
        } 
    }
});

//Base de curiosidades
let curiosidadesBase = [];

addBtn.disable = true;

//Carrega as curiosidades do arquivo json
async function carregarCuriosidades(){
    const response = await fetch("curiosidades.json")
    const dados = await response.json();

    curiosidadesBase = dados;

    addBtn.disable = false;

    console.log("Dados carregados: ", curiosidadesBase);
}

carregarCuriosidades();

//Essa função gera aleatoriamente uma curiosidade do objeto curiosidadesBase
function gerarCuriosidade() {

    if(curiosidadesBase.length === 0){
        console.warn("Ainda não carregou o JSON");
        return null;
    }

    const index = Math.floor(Math.random() * curiosidadesBase.length);
    return curiosidadesBase[index];
}


const botaoAdd = document.getElementById("newCuriosidade");
const formulario = document.getElementById("formulario");

botaoAdd.addEventListener("click", () => {
    formulario.style.display = "block";
})

//Criando novos cards com formulario
const form = document.getElementById("formCuriosidade");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const imagem = document.getElementById("imagem").value;
    const texto = document.getElementById("texto").value;

    const novaCuriosidade = {
        id: Date.now(),
        titulo,
        texto,
        imagem
    };

    curiosidadesBase.push(novaCuriosidade);

    // cria o card com esses dados
    criarCardPersonalizado(novaCuriosidade);

    form.reset();
    formulario.style.display = "none"; // esconde depois
});



//Função que cria os cards
function criarCardPersonalizado(dado){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${dado.titulo}</h3>
        <img src="${dado.imagem}">
        <p>${dado.texto}</p>
    `;

    container.appendChild(card);
}

function openMenu(){
    document.getElementById("menu_aba").style.display = "block";
}

function closeMenu(){
    document.getElementById("menu_aba").style.display = "none";
}

function temaDefault(){
    document.documentElement.style.setProperty('--cor-fundo', '#9932cc');
    document.documentElement.style.setProperty('--cor-texto', 'white');
    document.documentElement.style.setProperty('--cor-fonte', 'purple');
    document.documentElement.style.setProperty('--cor-fontetexto', 'white');


}

function temaDark(){
    document.documentElement.style.setProperty('--cor-fundo', 'black');
    document.documentElement.style.setProperty('--cor-texto', 'white');
    document.documentElement.style.setProperty('--cor-fonte', 'white');
    document.documentElement.style.setProperty('--cor-fontetexto', 'black');
}

const estruturaCarrosel = [
    {
        endereco: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
        texto: "Astronautas relatam que o espaço tem cheiro — quando voltam da caminhada espacial, o traje fica com odor de: metal quente / carne grelhada / pólvora" 
    },
    {
        endereco: "https://images.unsplash.com/photo-1545670723-196ed0954986",
        texto: "Programação é muito divertido porém tbm é difícil"
    },
    {
        endereco: "https://images.unsplash.com/photo-1508182314998-3bd49473002f",
        texto: "Montanhas ao entardecer"
    },
    {
        endereco: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        texto: "Chalé bonito"
    },
    {
        endereco: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
        texto: "Puta estrela foda"
    }
]
    


const carrosel = document.querySelector(".carrosel");

const track = document.createElement("div");
track.classList.add("track")

carrosel.appendChild(track);


estruturaCarrosel.forEach((item) => {
    const img = document.createElement("img");
    const texto = document.createElement("p");
    let containerCarrossel = document.createElement("div");

    containerCarrossel.classList.add("containerCarrosel");

    img.src = item.endereco;
    texto.textContent = item.texto;

    containerCarrossel.appendChild(img);
    containerCarrossel.appendChild(texto);

    track.appendChild(containerCarrossel);
    

}); 

let index = 0;
const total = estruturaCarrosel.length;


function moverCarrosel(){
    
    index++;

    if(index >= total){
        index = 0;
    }
    
    atualizarCarrosel();
}

let intervalo = setInterval(moverCarrosel, 3000);


carrosel.addEventListener("mouseenter", () => {
    clearInterval(intervalo);
}
)

carrosel.addEventListener("mouseleave", () => {
    intervalo = setInterval(moverCarrosel, 3000);
})

const next = document.getElementById("next");
const prev = document.getElementById("prev");

next.addEventListener("click", () => {
    index++;

    if(index >= total){
        index = 0;
    }

    atualizarCarrosel();
})

prev.addEventListener("click", () => {
    index--;

    if(index < 0){
        index = total - 1;
    }

    atualizarCarrosel();
})

function atualizarCarrosel(){
    track.style.transform = `translateX(-${index * 100}%)`;
}