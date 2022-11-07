const PORT = 8000

const axios = require('axios')
const cheerio =  require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const films = []
        
        $('.titleColumn', html).each(function() {
            const rank = $(this).text().trim().split('.')[0]
            const title = $(this).text().split('\n')[2].trim()
            const year = $(this).text().split("\n")[3].trim()
            films.push({
                rank,
                title,
                year
            })
        })
        console.log(films)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))