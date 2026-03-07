/*************************************************************
 * JavaScript Script using jQuery for Front-End Functionality
************************************************************** */

$(document).ready(() => {


    //Clear and Populate the UL Initially from a GET Request.
    $('#container ul').empty()

    let baseUrl = 'http://localhost:3000/api/items'
    let userid = 3

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

    //Checks Off Completed Items when you Click on Them
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

    //Removes Item from List when you click on Trash Icon
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

    //Add a New BucketList Item Using Button
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