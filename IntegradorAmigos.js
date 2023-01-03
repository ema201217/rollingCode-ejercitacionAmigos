// Se debe crear un sistema que permita al usuario cargar los datos de sus amigos.
// Constara de una sola pantalla donde aparecerá la lista de amigos que  el usuario va ingresando en un formulario. Los datos que necesito de cada amigo son: nombre, foto (url) y sexo.

// Cada card de amigo debería tener un botón para borrarlo de mis amigos si me peleo.

// Debería tener un botón que permitiera borrar todos los amigos

const formCarga = document.getElementById("form-carga");
const cardsContainer = document.getElementById("cards-container");
const btnsModify = Array.from(document.getElementsByClassName("btn-modify"));
const inputName = document.getElementById("input-name");
const inputImage = document.getElementById("input-image");
const inputsGender = Array.from(
  document.getElementsByClassName("input-gender")
);
const btnSubmit = document.getElementById("btn-submit");
const inputId = document.getElementById("input-id");
const btnRemoveAll = document.getElementById("btn-remove-all");
let amigos = [];

class Amigo {
  constructor([name, img, gender]) {
    this.name = name;
    this.gender = gender;
    this.img = img;
    this.id = this.generateId();
  }

  generateId() {
    return Math.random().toString(36).substring(2, 18);
  }
}

const pintarCards = (amigos = []) => {
  cardsContainer.innerHTML = "";
  amigos.forEach((amigo) => {
    const template = `<div class="card col-6 col-md-4 col-lg-3" style="width: 18rem;">
    <button type="button" class="btn-close align-self-end" aria-label="Close" onclick="removeAmigo('${
      amigo.id
    }')"></button>
    <img src="${amigo.img}" class="card-img-top my-2">
    <div class="card-body">
      <h5 class="card-title fw-light">Amigo: <span class="fw-bold">${amigo.name?.toUpperCase()}</span></h5>
      <p class="card-text">Genero: <span class="fw-bold">${
        amigo.gender
      }</span></p>
      <a href="#" class="btn btn-info btn-modify" onclick="modifyAmigo('${
        amigo.id
      }')">Modificar</a>
    </div>
  </div>`;
    cardsContainer.innerHTML += template;
  });
};

// PROCESO

// ADD OR MODIFY CARD
formCarga.addEventListener("submit", (event) => {
  event.preventDefault();
  btnSubmit.textContent = 'Cargar'
  if (!inputId.value) {
    // Si el input id no esta vació hacer ...
    const inputs = Array.from(event.target.elements).slice(0, 4);
    const values = [];
    inputs.forEach((input) => {
      if (input.type === "text" || input.checked) {
        values.push(input.value);
      }
    });
    const newAmigo = new Amigo(values);
    amigos = [...amigos, newAmigo];
  } else {
    amigos = amigos.map((amigo) => {
      if (amigo.id === inputId.value) {
        return {
          name: inputName.value,
          img: inputImage.value,
          gender: inputsGender.find((input) => input.checked).value,
        };
      }
      return amigo;
    });
  }
  event.target.reset();
  pintarCards(amigos);
});

// REMOVE CARDS
btnRemoveAll.addEventListener("click", () => {
  amigos = [];
  pintarCards(amigos);
});

// REMOVE CARD BY ID
const removeAmigo = (id) => {
  const updateAmigos = amigos.filter((amigo) => amigo.id !== id);
  amigos = updateAmigos;
  pintarCards(amigos);
};

// MODIFY CARD
const modifyAmigo = (id) => {
  const amigoFind = amigos.find((amigo) => amigo.id === id);
  if (amigoFind) {
    btnSubmit.innerHTML = 'Actualizar'
    inputName.value = amigoFind.name;
    inputImage.value = amigoFind.img;
    inputsGender.forEach((gender) => {
      if (gender.value === amigoFind.gender) {
        gender.checked = true;
      }
    });
    inputId.value = id;
  }
};


