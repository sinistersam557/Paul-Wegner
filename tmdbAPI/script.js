$(document).ready(() => {

    // Function to find movies using a fetch request to the TMDB API
    const findMovies = () => {

        const options = {
            method: "GET",
            headers: {
                accept: "application.json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWExMTA3MjIyNDU4MDEwM2RkNDY3YzM1ZWIxNGMyMiIsIm5iZiI6MTc1OTI2MzQzOS4xNiwic3ViIjoiNjhkYzNhY2YzMmZlMTQ3ZWU3ZTFkM2ZlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rzGdN9SE52hH-agnbxXXdgzY5hBQBTxyJCZ0spDwawA"
            }
        }

        // Retrieve the movie title from the input field and construct the API endpoint URL
        let title = $('#movie').val()
        let endpoint = `https://api.themoviedb.org/3/search/movie?query=${title}`

        fetch(endpoint, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`cannot connect because status is ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            let htmlStr = ''
            // Check if there are results from the API Call
            if (data.results.length == 0) {
                htmlStr = `<strong>No Results Found</strong>`
            } else {
                // If there are results, loop through them and construct an HTML string to display the movie information
                data.results.forEach((result, index) => {
                    let movTitle = result.title
                    let movDescription = result.overview
                    htmlStr += `<strong>Result ${index+1} of ${data.results.length}</strong><br><img src='https://image.tmdb.org/t/p/original/${result.poster_path}' height=100><br><strong>Title:</strong> ${movTitle}<br><strong>Description:</strong> ${movDescription}<br><br>`
                })
            }
            $('#displayMovs').html(htmlStr)
        })
        .catch(error => {
            console.log("Error:", error)
            $('#displayMovs').html(`Error: ${error.message}`)
        })
    }

    // Run the findMovies function when the button is clicked
    $("input[type='button']").on('click', findMovies)







})