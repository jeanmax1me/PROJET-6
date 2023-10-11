class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.type = data.image ? 'image' : 'video';
    this.url = data.image
      ? `assets/images/${data.photographerId}/${data.image}`
      : `assets/images/${data.photographerId}/${data.video}`;
  }

  createMediaElement() {
    const mediaElement = document.createElement(this.type === 'image' ? 'img' : 'video');
    if (this.type === 'image') {
      mediaElement.src = this.url;
      mediaElement.alt = this.title;
    } else if (this.type === 'video') {
      mediaElement.setAttribute('controls', ''); // Add video controls
      const sourceElement = document.createElement('source');
      sourceElement.src = this.url;
      sourceElement.type = 'video/mp4';
      mediaElement.appendChild(sourceElement);
    }

    return mediaElement;
  }
}

export function createMedia(data) {
return new Media(data);
}
