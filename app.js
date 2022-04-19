var script = document.createElement('script');
script.src = 'https://ign-apis.herokuapp.com/videos?callback=processVideos'
document.getElementsByTagName('head')[0].appendChild(script);

var index = 0;

function processVideos(res) {
   var currVideo = res.data[index];
   console.log(currVideo)
   console.log(res.data)

   /*
   Video Player
   */
   var mainVideo = document.getElementById("playerContainer");
   var player = document.createElement("video");
   player.setAttribute('id', "player");
   player.setAttribute('controls', true);
   var sourceTag = document.createElement('source');
   sourceTag.setAttribute('src', currVideo.assets[0].url);
   sourceTag.setAttribute('type', 'video/mp4');
   player.appendChild(sourceTag);
   player.onended = () => {
      index++;
      if (index < res.data.length) {
         updatePlayer(res.data[index].assets[0].url, res.data[index].metadata);
      }
      
   }
   mainVideo.appendChild(player);
   /*
   Title for Video Playing
   */
   var mainTitle = document.createElement("h2");
   mainTitle.setAttribute("id", "mainTitle")
   mainTitle.innerHTML = currVideo.metadata.title;
   mainVideo.appendChild(mainTitle);

   /*
   Description for Video Playing
   */
   var description = document.createElement("p");
   description.setAttribute("id", "mainDescription")
   description.innerHTML = currVideo.metadata.description;
   mainVideo.appendChild(description);

   /*
   Playlist Queue
   */
   var nextVideos = [...res.data].splice(1, 4);
   var queue = document.getElementById("playlistQueue");
   nextVideos.forEach(element => {
      var nextVid = document.createElement('div');
      nextVid.setAttribute('class', 'nextVid');

      var thumbnail = document.createElement('img');
      thumbnail.setAttribute('src', element.thumbnails[0].url);
      nextVid.appendChild(thumbnail);

      var nextVidTitle = document.createElement('h5');
      nextVidTitle.innerHTML = element.metadata.title;
      nextVid.append(nextVidTitle);

      queue.appendChild(nextVid);
      queue.appendChild(document.createElement("hr"));
      // console.log(element);
   })

   /*
   Load More Button
   */
   const loadMoreButton = document.createElement('button');
   loadMoreButton.setAttribute('id', 'loadMoreBtn');
   loadMoreButton.textContent = "Load More";
   queue.appendChild(loadMoreButton);

   /*
   Load More Videos in Queue
   */
   var nextVideos = [...res.data].splice(5);
   var loadMore = document.createElement('div');
   loadMore.setAttribute('id', 'loadMore');
   nextVideos.forEach(element => {
      var nextVid = document.createElement('div');
      nextVid.setAttribute('class', 'nextVid');

      var thumbnail = document.createElement('img');
      thumbnail.setAttribute('src', element.thumbnails[0].url);
      nextVid.appendChild(thumbnail);

      var nextVidTitle = document.createElement('h5');
      nextVidTitle.innerHTML = element.metadata.title;
      nextVid.append(nextVidTitle);

      loadMore.appendChild(nextVid);
      loadMore.appendChild(document.createElement("hr"));
      queue.appendChild(loadMore);
   })

   loadMoreButton.onclick = () => {
      loadMore.style.display = 'initial';
      loadMoreButton.style.display = 'none';
   }

}

function updatePlayer(url, metadata) {
   let player = document.getElementById('player');
   player.setAttribute('src', url);
   document.getElementById('mainTitle').innerHTML = metadata.title
   document.getElementById('mainDescription').innerHTML = metadata.description
   player.load();
   player.play();
} 
