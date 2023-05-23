import './normalize.css'
import './style.css'
import { key } from './key.js'

const input = document.querySelector('input')
const submitBtn = document.querySelector('.search-btn')
const movieSection = document.querySelector('.movies')
const toolbar = document.querySelector('.tool-bar')
const mainTitle = document.querySelector('h1')
const secondaryTitle = document.querySelector('h3')
let watchlist;
let arrayOfFoundMovies = [];




function addToWatchlist(index) {
    watchlist.push(arrayOfFoundMovies[index])
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
}


window.addToWatchlist = addToWatchlist;
window.deleteItemFromWatchlist = deleteItemFromWatchlist;

secondaryTitle.addEventListener('click', showWatchlist)
mainTitle.addEventListener('click', init)
input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        renderFoundMovies()
    }
} )
submitBtn.addEventListener('click', renderFoundMovies)



init()


function init() {
    mainTitle.textContent = 'Find your film'
    secondaryTitle.textContent = 'My Watchlist'
    toolbar.classList.remove('hidden')
    movieSection.innerHTML = `
        <div class="default-state">
            <svg width="70" height="62" viewBox="0 0 70 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 0C3.91751 0 0 3.9175 0 8.75V52.5C0 57.3325 3.91751 61.25 8.75 61.25H61.25C66.0825 61.25 70 57.3325 70 52.5V8.75C70 3.9175 66.0825 0 61.25 0H8.75ZM21.875 8.75H48.125V26.25H21.875V8.75ZM56.875 43.75V52.5H61.25V43.75H56.875ZM48.125 35H21.875V52.5H48.125V35ZM56.875 35H61.25V26.25H56.875V35ZM61.25 17.5V8.75H56.875V17.5H61.25ZM13.125 8.75V17.5H8.75V8.75H13.125ZM13.125 26.25H8.75V35H13.125V26.25ZM8.75 43.75H13.125V52.5H8.75V43.75Z" fill="#DFDDDD"/>
              </svg>
            <p>Start exploring</p>
          </div>
        `
    setWatchlist()
}

function setWatchlist() {
    if (localStorage.getItem('watchlist')){ 
        watchlist = JSON.parse(localStorage.getItem('watchlist'))
    } else {
        watchlist = []
    }
}

async function renderFoundMovies() {
    let html = '';
    arrayOfFoundMovies.length = 0;
    const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${input.value}&type=movie&r=json`)
    const searchResult = await res.json()

    if(searchResult.Response === 'True'){
        let index = 0
        console.log(arrayOfFoundMovies)
        for (const record of searchResult.Search) {
            movieSection.innerHTML = ''
            const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${record.imdbID}`)
            const data = await res.json()
            html += 
            `<article class="movie">
            <img src="${data.Poster}" alt="${data.Title} Poster">
            <div>
                <div class="movie-head">
                <h4 ${data.Title.length > 60 && 'class="smaller"'}>${data.Title}</h4>
                <small class="score"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                    </svg>${data.imdbRating}</small>
                </div>
                <div class="movie-details">
                <p class="length">${data.Runtime}</p>
                <p class="genres">${data.Genre}</p>
                <button onclick="addToWatchlist(${index})"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="#111827"/>
                    </svg>Watchlist</button>
                </div>
                <p class="description">${data.Plot}.</p>
            </div>
        </article>`
        movieSection.innerHTML += movieSection.innerHTML + html
        index++
        arrayOfFoundMovies.push(data)
        }
    } else {
        // TODO: "No data found for the query" mark-up
        
    }
}

function showWatchlist() {
    mainTitle.textContent = 'My Watchlist'
    secondaryTitle.textContent = 'Search for movies'
    toolbar.classList.add('hidden')
    renderWatchlist()
}

function renderWatchlist() {
    let html = ''
    let index = 0
    if(watchlist.length) {
        watchlist = JSON.parse(localStorage.getItem('watchlist'))
        watchlist.forEach(element => {
            console.log(element)
            html += 
            `<article class="movie">
            <img src="${element.Poster}" alt="${element.Title} Poster">
            <div>
                <div class="movie-head">
                <h4 ${element.length > 60 && 'class="smaller"'}>${element.Title}</h4>
                <small class="score"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                    </svg>${element.imdbRating}</small>
                </div>
                <div class="movie-details">
                <p class="length">${element.Runtime}</p>
                <p class="genres">${element.Genre}</p>
                <button onclick="deleteItemFromWatchlist(${index})"><svg width="16" height="16" vie Box="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="#111827"/>
                </svg>
                Remove</button>
                </div>
                <p class="description">${element.Plot}.</p>
            </div>
        </article>`
        index++
        movieSection.innerHTML = html
        })
    } else {
        html = `
        <div class="default-state">
            <p>Your watchlist is looking a little empty...</p>
            <a href="#" class=""><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="#111827"/>
            </svg>Let’s add some movies!</a>
        </div>
        `
        movieSection.innerHTML = html
        document.querySelector('a').addEventListener('click',init)
    }
}

function deleteItemFromWatchlist(index) {
    watchlist.splice(index, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    console.log(watchlist)
    renderWatchlist()
}