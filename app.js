var url = "https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/videos?startIndex=30\u0026count=5";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);


xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();

// fetch('https://ign-apis.herokuapp.com/videos?startIndex=30\u0026count=5',
//    {
//        method: 'GET',
//        mode: 'no-cors',
//     //    headers: {
//     //     'Content-Type': 'application/json',
//     //     'Content-Type': 'application/x-www-form-urlencoded',
//     //   },
//     //   credentials: 'same-origin',
//    }
// )
// // .then(res => res.json())
// .then(data=>console.log(data))