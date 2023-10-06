// photographer.js

export function createPhotographerCard(data) {
    const { name, portrait, city, country, tagline, price, altname } = data;
    const picture = `assets/photographers/${portrait}`;
  
    const img = createImage(picture, altname);
    const h2 = createHeading('h2', name);
    const h3 = createHeading('h3', `${city}, ${country}`);
    const tag = createParagraph(tagline);
    const prix = createParagraph(`${price}€/jour`);
  
    const imgcontainer = createCardContainer([img]);
  
    const article = document.createElement('article');
    article.appendChild(imgcontainer);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(tag);
    article.appendChild(prix);
  
    return article;
  }
  
  function createImage(src, alt) {
    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    return img;
  }
  
  function createHeading(headingType, text) {
    const heading = document.createElement(headingType);
    heading.textContent = text;
    return heading;
  }
  
  function createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
  }
  
  function createCardContainer(children) {
    const imgcontainer = document.createElement('div');
    imgcontainer.classList.add('photographer_card');
    imgcontainer.setAttribute('tabindex', '0');
    children.forEach((child) => {
      imgcontainer.appendChild(child);
    });
    return imgcontainer;
  }
  
  export function createUserCardDOM(data) {
    return createPhotographerCard(data);
  }
  