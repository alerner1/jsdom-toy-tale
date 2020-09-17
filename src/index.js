let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const fetchObjects = () => {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => renderToys(json))
  }

  const renderToys = (toys) => {
    for (toy of toys) {
      const newToy = document.createElement('div');
      newToy.className = 'card';

      const newID = document.createElement('h6');
      newID.textContent = toy.id;
      newID.hidden = true;
      newToy.append(newID)

      const newHead = document.createElement('h2');
      newHead.textContent = toy.name;
      newToy.append(newHead);

      const newImg = document.createElement('img');
      newImg.className = 'toy-avatar';
      newImg.src = toy.image;
      newToy.append(newImg);

      const newLikes = document.createElement('p');
      newLikes.textContent = toy.likes;
      newToy.append(newLikes);

      const newButton = document.createElement('button');
      newButton.className = 'like-btn';
      newButton.textContent = "Like";
      newToy.append(newButton);

      document.getElementById('toy-collection').append(newToy);
    }
  }

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  


  const clickHandler = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        let formData = {
          "name": form.name.value,
          "image": form.image.value,
          "likes": 0
        }

        const configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(formData)
        }

        console.log(configObj.body)
        fetch('http://localhost:3000/toys', configObj)
          .then(resp => resp.json())
          .then(json => renderToys([json]))
          .catch(error => console.log(error.message))
      
    })
    document.addEventListener('click', e => {
      if (e.target.matches('.like-btn')) {
        const formData = {
          "likes": parseInt(e.target.previousElementSibling.innerText, 10) + 1
        }

        const configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(formData)
        }

        fetch(`http://localhost:3000/toys/${parseInt(e.target.parentNode.firstChild.textContent, 10)}`, configObj)
          .then(resp => resp.json())
          .then(json => e.target.previousElementSibling.innerText++)
          .catch(error => console.log(error.message))
      }
    })
  }

  fetchObjects();
  clickHandler();
});
