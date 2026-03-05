$(document).ready(() => {

    //api address
    let baseUrl = 'http://localhost:3000/api/items'

    //user id
    let userid = 3

    //empty out the list
    $('#container ul').empty()

    //Populate the UL from a GET Request
    fetch(`${baseUrl}?userid=${userid}`, { method: 'GET' })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        data.data.forEach((obj) => {
            let completedClass = obj.isComplete ? 'completed' : ''
            $('#container ul').append(`
                <li data-id="${obj._id}" class="${completedClass}">
                    ${obj.description} <span><i class="fa-solid fa-trash-can"></i></span>
                </li>`)
        })
    })
    .catch((error) => {
        console.error(error)
    })

    //Checks Off Completed Items
    $('#container ul').on('click', 'li', function () {
        let id = $(this).data('id')
        fetch(`${baseUrl}?user_id=${userid}&item_id=${id}`, {method: 'PUT'})
        .then((response) => {
            return response.json()
        })
        .then(() => {
            $(this).toggleClass('completed')
        })
        .catch((error) => {
            console.error(error)
        })
    })

    //Removes Item from List
    $('#container ul').on('click', 'span', function (event) {
        event.stopPropagation();
        let id = $(this).parent().data('id')
        fetch(`${baseUrl}?user_id=${userid}&item_id=${id}`, {method: 'DELETE'})
        .then((response) => {
            return response.json()
        })
        .then(() => {
            $(this).parent().remove()
        })
        .catch((error) => {
            console.error(error)
        })
    })

    /*
    //Functionality for Enter Key in INput
    $('#container input').keyup(function (event) {
        if (event.which == 13 && $(this).val().trim()) {
            $('#container ul').append(`<li>${$(this).val()}  <span><i class="fa-solid fa-trash-can"></i></span></li>`)
            $(this).val('')
        }
    })
    */

    //Add a New Item Using Button
    $('#container button').on('click', function (event) {
        if ($('#container input').val().trim()) {
            fetch(`${baseUrl}`, { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: `${userid}`,
                    description: `${$('#container input').val()}`
                })
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let item = data.data
                $('#container ul').append(`
                    <li data-id="${item._id}" class="${item.isComplete?'completed':''}">
                        ${item.description} <span><i class="fa-solid fa-trash-can"></i></span>
                    </li>
                `)
                $('#container input').val('')
            })
            .catch((error) => {
                console.error(error)
            })
        }
    })













})