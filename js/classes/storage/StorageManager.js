class StorageManager {

  static saveTorrent(file) {
    let torrents = StorageManager.getTorrents();
    torrents.push(file);

    let jTorrents = JSON.stringify(torrents);
    sessionStorage.setItem("torrents", jTorrents);
  }

  static getTorrents() {
    let jTorrentsText = sessionStorage.getItem("torrents");

    let jTrrnts = [];

    if(jTorrentsText != null) {
      jTrrnts = JSON.parse(jTorrentsText);
    }

    let trrnts = [];

    for(const jTr of jTrrnts) {
      let tr = new Torrent(jTr);
      trrnts.push(tr);
    }

    return trrnts;
  }

  static getTorrent(id) {
    let trrnt = StorageManager.getTorrents();
    let trId = null;

    for(let i = 0; i < trrnt.length && trId == null; i++) {
      if(trrnt[i].id == id) {
        trId = trrnt[i];
      }
    }
    return trId;
  }

  static deleteTorrent(id) {
    let torrents = StorageManager.getTorrents();
    let remainingTorrents = [];

    for(let t of torrents) {
      if(t.id != id) {
        remainingTorrents.push(t);
      }
    }

    let jTorrents = JSON.stringify(remainingTorrents);
    sessionStorage.setItem("torrents",jTorrents);
  }
}
