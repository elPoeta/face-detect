const app = new Clarifai.App({
  apiKey: 'your_api_key'
 });

 const input = document.querySelector('#url');
 const btn = document.querySelector('#btn');
 const panel = document.querySelector('#panel-img');

 input.addEventListener('change', e =>{
    const url = e.target.value;
    let template =
    `<img src="${url}" alt="image"/>
    <div class="face-box"></div>`;
    document.querySelector('#panel-img').innerHTML=template;
    btn.addEventListener('click', e =>{
       e.preventDefault();
       console.log('url',url);
       app.models.predict(Clarifai.FACE_DETECT_MODEL, url)
       .then( response => {
        console.log(response);
          const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
          console.log(clarifaiFace);
          const image = document.querySelector('img');
          const box = document.querySelector('.face-box');
          const width = Number(image.width);
          const height = Number(image.height);
          const leftCol = clarifaiFace.left_col * width;
          const topRow = clarifaiFace.top_row * height;
          const rightCol = width - (clarifaiFace.right_col * width);
          const bottomRow = height - (clarifaiFace.bottom_row * height);
          box.style.top = topRow+"px";
          box.style.bottom = bottomRow+"px";
          box.style.right = rightCol+"px";
          box.style.left = leftCol+"px";
      },
      function(err) {
   
        console.log(err);
      }
    );
    });
 });
