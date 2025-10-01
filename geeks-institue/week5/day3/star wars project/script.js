   // Starfield animation
   const canvas = document.getElementById("starfield");
   const ctx = canvas.getContext("2d");
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

   const stars = [];
   for (let i = 0; i < 200; i++) {
     stars.push({
       x: Math.random() * canvas.width,
       y: Math.random() * canvas.height,
       size: Math.random() * 2,
       speed: Math.random() * 1 + 0.5
     });
   }

   function animate() {
     ctx.fillStyle = "black";
     ctx.fillRect(0, 0, canvas.width, canvas.height);

     ctx.fillStyle = "white";
     stars.forEach(star => {
       ctx.beginPath();
       ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
       ctx.fill();

       star.y += star.speed;
       if (star.y > canvas.height) {
         star.y = 0;
         star.x = Math.random() * canvas.width;
       }
     });

     requestAnimationFrame(animate);
   }
   animate();

   // Fetch Star Wars character
   const info = document.getElementById("info");
   const btn = document.getElementById("findsomeone");

   btn.addEventListener("click", () => {
     async function fetchData() {
       try {
         info.innerHTML = `<p><i class="fas fa-spinner fa-spin"></i> Loading...</p>`;
         
         const id = Math.floor(Math.random() * 83) + 1;
         const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
         const data = await response.json();
         const character = data.result.properties;

         // Fetch homeworld
         const homeworldResponse = await fetch(character.homeworld);
         const homeworldData = await homeworldResponse.json();
         const homeworldName = homeworldData.result.properties.name;

         info.innerHTML = `
           <h2>${character.name}</h2>
           <p><strong>Height:</strong> ${character.height}</p>
           <p><strong>Gender:</strong> ${character.gender}</p>
           <p><strong>Birth Year:</strong> ${character.birth_year}</p>
           <p><strong>Homeworld:</strong> ${homeworldName}</p>
         `;
       } 
       catch (error) {
         info.innerHTML = "<p>Oh no! That person is not available.</p>";
       }
     }
     fetchData();
   });
