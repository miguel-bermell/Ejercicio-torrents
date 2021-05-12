//EventListeners
document.addEventListener('DOMContentLoaded', () => {
  paintTorrents();
  sortByTorrentsPercentage();
  sortByTorrentTitle();
  resetForm();
});

function createTorrent() {
  const title = document.querySelector('#title').value;
  const percentage = document.querySelector('#percentage').value;
  const size = document.querySelector('#size').value;
  const type = document.querySelector('#type_of_file').value;
  const form = document.querySelector('#form');
  
  if(title != "" && title != null && percentage != undefined && percentage != "" && isNaN(percentage) == false
    && percentage >= 0 && percentage <= 100 && isNaN(size) == false) {
    let torrent1 = new Torrent(null,title,percentage,size,parseInt(type));
    StorageManager.saveTorrent(torrent1);
    
    paintTorrents();
    form.reset();
  }else {
		if(title == undefined || title == ""){
			document.querySelector('#title').classList.add('alert');
		}
    if(percentage == undefined || percentage == ""){
			document.querySelector('#percentage').classList.add('alert');
		}
    if(percentage < 0 || percentage > 100){
			document.querySelector('#percentage').classList.add('alert');
      document.querySelector('#texto2').classList.add('texto');
		}
    if(size == undefined || size == ""){
      document.querySelector('#size').classList.add('alert');
    }
    
		document.querySelector('#texto').classList.add('texto');
	}
    if(document.querySelector('#texto').classList.contains('texto')) {
    setTimeout(() => document.querySelector('#texto').classList.remove('texto'), 5000);
    };
}

function resetForm() {
  document.querySelector('#title').onclick = () => {
    document.querySelector('#title').classList.remove('alert');
  }
  document.querySelector('#percentage').onclick = () => {
    document.querySelector('#percentage').classList.remove('alert');
    document.querySelector('#texto2').classList.remove('texto');
  }
  document.querySelector('#size').onclick = () => {
    document.querySelector('#size').classList.remove('alert');
  }
}



let paintTorrents = () => {
	document.querySelector('#table').innerHTML = "";
  printObj(StorageManager.getTorrents());
}

function printTorrent(torrent) {
  if(torrent != null && torrent != undefined) {
    const table = document.querySelector('#table');
    const tr = document.createElement('tr');
    const btnDelete = document.createElement('td');
    
    btnDelete.classList.add('delete-torrent');
    btnDelete.innerText = 'X';

    let tdTitle = createTd(torrent.title);
    tr.appendChild(tdTitle);
    
    let tdPercentage = createTd(torrent.percentage + "%");
    tr.appendChild(tdPercentage);
    
    let tdSize = createTd(torrent.size);
    tr.appendChild(tdSize);

    let tdType = createTd(Torrent.getTypeOfFile(torrent.type));
    tr.appendChild(tdType);
    
    tr.appendChild(btnDelete);
    table.appendChild(tr);
    btnDelete.onclick = () => {
      deleteTorrent((torrent.id))
    };
  };
}

function createTd(text) {
  const td = document.createElement('td');
  td.innerText = text;
  return td;
}

function deleteTorrent(id) {
	StorageManager.deleteTorrent(id)
	paintTorrents();
}

function sortByTorrentTitle() {

  const arrow = document.querySelector('.title');
  arrow.onclick = () => {
    document.querySelector('#table').innerHTML = "";
    let torrents = StorageManager.getTorrents();
    torrents.sort(
      (a,b) => {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        let res = 0;
        if(a > b) {
          res = 1;
        }else if(a < b) {
          res = -1
        }
        return res;
      });

      printObj(torrents);
  };
}

function sortByTorrentsPercentage() {
	
  const arrow = document.querySelector('.percentage');
	arrow.onclick = () => {
    document.querySelector('#table').innerHTML = "";
    let torrents = StorageManager.getTorrents();
    
    torrents.sort((a,b) => b.percentage - a.percentage);
    
    printObj(torrents);
  };
}

function printObj(data) {
  for(let t of data) {
    printTorrent(t);
  }
}