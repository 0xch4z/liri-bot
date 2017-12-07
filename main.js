import twitter from 'twitter'
import request from 'request'
import spotify from 'node-spotify-api'
import axios from 'axios'
import moment from 'moment'

import fs from 'fs'
import readline from 'readline'

import credentials from './keys.json'
import mocks from './mocks.json'

const args = process.argv.slice(2)

const OMDB_API_URL = (
  `http://www.omdbapi.com/?apikey=${credentials.omdb.key}`
)

const twitterClient = new twitter(credentials.twitter)
const spotifyClient = new spotify(credentials.spotify)


/**
 * Fetch tweets
 * 
 * outputs last 20 of tweets
 */
async function fetchTweets() {
  console.log('Fetching tweets...')
  try {
    // get tweets
    const tweets = await twitterClient
      .get('statuses/user_timeline', {
        screen_name: 'unc_liri',
        count: 20,
      })
    // output tweets
    for (const tweet of tweets.reverse()) {
      const { text, created_at } = tweet
      const date = moment(new Date(tweet.created_at)).calendar()
      console.log(`
        \n${text}
        \nvia Twitter - ${date}\n
      `)
    }
  } catch ({ message }) {
    console.error(`Error fetching tweets: ${message}`)
  }
}


/**
 * Fetch song
 * @param {string} query Song to query for
 * 
 * outputs info about a given song
 */
async function fetchSong(query) {
  console.log(`fetching song ${query}`)
  try {
    // get tracks
    const { tracks } = await spotifyClient.search({
      type: 'track',
      query,
    })
    // get most popular track | mock track
    const { items } = tracks
    const song = items.length ? 
      items.sort((a, b) => a.popularity + b.popularity)[0] : mocks.song
    // output track
    console.log(`
      Name: ${song.name}
      Artists: ${song.artists.map(a => a.name).join(', ')}
      Album: ${song.album.name}
      Preview URL: ${song.preview_url}
    `)
  } catch ({ message }) {
    console.error(`Error fetching song: ${message}`)
  } 
}


/**
 * Fetch movie
 * @param {string} query
 * 
 * outputs infor about a given movie
 */
async function fetchMovie(query) {
  console.log(`fetching movie ${query}`)
  try {
    // get movie
    let { data } = await axios.get(`${OMDB_API_URL}&t=${encodeURIComponent(query)}`)
    // if error; use mock
    if (data.Error) data = mocks.movie
    // output movie
    console.log(`
      Title: ${data.Title}
      Released: ${data.Released}
      Rating: ${data.Ratings[1].Value}
      Country: ${data.Country}
      Language: ${data.Language}
      Plot: ${data.Plot}
      Actors: ${data.Actors}
    `)
  } catch ({ message }) {
    console.error(`Error fetching movie: ${message}`)
  }
}


/**
 * Execute random txt
 * 
 * parses and executes cmds from `random.txt`
 */
function executeRandomTxt() {
  fs.readFile('random.txt', 'utf8', async (err, file) => {
    if (err) return console.error(`Error reading random.txt`)
    // handle each line
    const lines = file.split(/\n/)
    for (const line of lines) {
      // parse command
      const parts = line.split(' ')
      const cmd = parts[0]
      const query = parts.slice(1).join(' ')
      // execute command
      console.log(`\n\n\n[*] Executing command: "${line}"\n\n\n`)
      switch (cmd) {
        case 'my-tweets': await fetchTweets(); break
        case 'spotify-this-song': await fetchSong(query); break
        case 'movie-this': await fetchMovie(query); break
        default:
          console.error(`Error: '${cmd}' is not a valid command!`)
      }
    }
  })
}


(function () {
  const cmd = args[0]
  const query = args.slice(1).join(' ')
  switch (cmd) {
    case 'my-tweets': return fetchTweets()
    case 'spotify-this-song': return fetchSong(query)
    case 'movie-this': return fetchMovie(query)
    case 'do-what-it-says': return executeRandomTxt()
    default:
      console.error(`Error: '${cmd}' is not a valid command!`)
      process.exit(1)
  }
})()
