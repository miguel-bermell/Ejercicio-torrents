class Torrent {
  constructor(jTorrent,title,percentage,size,type) {
    if(jTorrent != undefined) {
      this.title = jTorrent.title;
      this.percentage = jTorrent.percentage;
      this.size = jTorrent.size;
      this.type = jTorrent.type;
      this.id = jTorrent.id;
    }else {
      this.title = title;
      this.percentage = percentage;
      this.size = size;
      this.type = type;
      this.id = this.getId();
    }
  }

  getId() {
    return Date.now();
  }

  static getTypeOfFile(typeId) {
    let text = "Error";

    switch(typeId) {
      case Torrent.TYPE_JPG:
        text = "JPG";
        break;
      case Torrent.TYPE_AVI:
        text = "AVI";
        break;
      case Torrent.TYPE_MP4:
        text = "MP4";
        break;
    }
    return text;
  }
}

// Type of files.
Torrent.TYPE_JPG = 1;
Torrent.TYPE_AVI = 2;
Torrent.TYPE_MP4 = 3;