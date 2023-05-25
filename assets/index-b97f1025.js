(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const v="a79bbef9",m=document.querySelector("input"),C=document.querySelector(".search-btn"),r=document.querySelector(".movies"),p=document.querySelector(".tool-bar"),d=document.querySelector("h1"),h=document.querySelector("h3");let o,a=[];function w(t){o.push(a[t]),localStorage.setItem("watchlist",JSON.stringify(o))}window.addToWatchlist=w;window.deleteItemFromWatchlist=y;h.addEventListener("click",L);d.addEventListener("click",u);m.addEventListener("keypress",t=>{t.key==="Enter"&&f()});C.addEventListener("click",f);u();function u(){d.textContent="Find your film",h.textContent="My Watchlist",p.classList.remove("hidden"),r.innerHTML=`
        <div class="default-state">
            <svg width="70" height="62" viewBox="0 0 70 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 0C3.91751 0 0 3.9175 0 8.75V52.5C0 57.3325 3.91751 61.25 8.75 61.25H61.25C66.0825 61.25 70 57.3325 70 52.5V8.75C70 3.9175 66.0825 0 61.25 0H8.75ZM21.875 8.75H48.125V26.25H21.875V8.75ZM56.875 43.75V52.5H61.25V43.75H56.875ZM48.125 35H21.875V52.5H48.125V35ZM56.875 35H61.25V26.25H56.875V35ZM61.25 17.5V8.75H56.875V17.5H61.25ZM13.125 8.75V17.5H8.75V8.75H13.125ZM13.125 26.25H8.75V35H13.125V26.25ZM8.75 43.75H13.125V52.5H8.75V43.75Z" fill="#DFDDDD"/>
              </svg>
            <p>Start exploring</p>
          </div>
        `,H()}function H(){localStorage.getItem("watchlist")?o=JSON.parse(localStorage.getItem("watchlist")):o=[]}async function f(){let t="";a.length=0;const i=await(await fetch(`https://www.omdbapi.com/?apikey=${v}&s=${m.value}&type=movie&r=json`)).json();if(i.Response==="True"){let c=0;for(const e of i.Search){r.innerHTML="";try{const l=await(await fetch(`https://www.omdbapi.com/?apikey=${v}&i=${e.imdbID}`)).json();t+=`<article class="movie">
                <img src="${l.Poster}" alt="${l.Title} Poster">
                <div>
                    <div class="movie-head">
                    <h4 ${l.Title.length>60&&'class="smaller"'}>${l.Title}</h4>
                    <small class="score"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                        </svg>${l.imdbRating}</small>
                    </div>
                    <div class="movie-details">
                    <p class="length">${l.Runtime}</p>
                    <p class="genres">${l.Genre}</p>
                    <button onclick="addToWatchlist(${c})"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="#111827"/>
                        </svg>Watchlist</button>
                    </div>
                    <p class="description">${l.Plot}.</p>
                </div>
                </article>`,r.innerHTML+=r.innerHTML+t,c++,a.push(l)}catch(s){console.log(s.message)}}}}function L(){d.textContent="My Watchlist",h.textContent="Search for movies",p.classList.add("hidden"),g()}function g(){let t="",n=0;o.length?(o=JSON.parse(localStorage.getItem("watchlist")),o.forEach(i=>{console.log(i),t+=`<article class="movie">
            <img src="${i.Poster}" alt="${i.Title} Poster">
            <div>
                <div class="movie-head">
                <h4 ${i.length>60&&'class="smaller"'}>${i.Title}</h4>
                <small class="score"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                    </svg>${i.imdbRating}</small>
                </div>
                <div class="movie-details">
                <p class="length">${i.Runtime}</p>
                <p class="genres">${i.Genre}</p>
                <button onclick="deleteItemFromWatchlist(${n})"><svg width="16" height="16" vie Box="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="#111827"/>
                </svg>
                Remove</button>
                </div>
                <p class="description">${i.Plot}.</p>
            </div>
        </article>`,n++,r.innerHTML=t})):(t=`
        <div class="default-state">
            <p>Your watchlist is looking a little empty...</p>
            <a href="#" class=""><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="#111827"/>
            </svg>Let’s add some movies!</a>
        </div>
        `,r.innerHTML=t,document.querySelector("a").addEventListener("click",u))}function y(t){o.splice(t,1),localStorage.setItem("watchlist",JSON.stringify(o)),console.log(o),g()}
