let index = 0;
let fetchData = async () => {
  magazines.forEach(async (magazineurl) => {
    let response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazineurl}`);
    let data = await response.json();
    console.log(data);
    addAccordionToDom(data, index);
    index++;

    return data;
  });
};
fetchData();

function addAccordionToDom(data, index) {
  let item1 = `<div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne${index}">
                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne${index}" aria-expanded="${index?false: true}" aria-controls="collapseOne${index}">
                       ${data.feed.title}
                     </button>
                  </h2>
                 <div id="collapseOne${index}" class="accordion-collapse collapse ${index? 'hide': 'show'} " aria-labelledby="headingOne${index}" data-bs-parent="#accordionExample">
                   <div class="accordion-body">
                    <div id="carouselExample${index}" class="carousel slide" data-bs-ride="carousel">
                      <div class="carousel-inner">`;
                      
                      let item2 = "";
                      data.items.forEach((imgitem, indexx) => {
                        let d = new Date(imgitem.pubDate);
                        let day = d.getDate();
                        let year = d.getFullYear();
                        let month = d.getMonth()+1;
                        let date = day + "/" + month + "/" + year;
                        
                        if (indexx == 0) {
                          item2 += `<div class="carousel-item active" >`;
                        }
                        else {
                          item2 += `<div class="carousel-item" >`;
                        }
                        
                        item2 += `  <div class="card d-block ">
                        <img src="${imgitem.enclosure.link}" class="card-img-top img-fluid carousel-img" style="height:500px" alt="...">
                        <div class="card-body">
                           <p class="card-title title">${imgitem.title}</p>
                           <h6 class="author mb-2 text-muted">${imgitem.author}
                              <ul><li>${date}</ul>
                           </h6>
                           <p class="card-text description">${imgitem.description}</p>
                           <a href="${imgitem.link}" class="stretched-link" target="_blank"></a>
                        </div>
                   </div>
                </div>`;
                      });
                      
                      let item3 = `
                    </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
           </div>
       </div>`;
  
  document.getElementById("accordionExample").innerHTML =
    document.getElementById("accordionExample").innerHTML +item1 +item2 +item3;
}
