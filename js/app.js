// const elements
const navTitle = document.querySelector('.nav-title');
const tableTasks = document.querySelector('#tasks-list');
const cardSearchResult = document.querySelector('#card-search');
const tableSearchResult = document.querySelector('#search-result');
const inputSearch = document.querySelector('#task-search');
const formCard = document.querySelector('#formCard');
const formCollapse = document.querySelector('#formCollapse');

const formTemplate = document.querySelector('#form-template');
const taskTemplate = document.querySelector('#task-template');
const fragment = new DocumentFragment();
// <-

function fetchTasks() {
    $.ajax({
        url: './TasksActions/task-list.php',
        type: 'GET',
        success: function (res) {
            let tasks = JSON.parse(res);
            $('#tasks-list tr').remove();

            tasks.forEach(task => {
                const clone = taskTemplate.content.cloneNode(true);

                clone.querySelector('tr').setAttribute('taskid', task.id);
                clone.querySelector('.task-id').textContent = task.id;
                clone.querySelector('.task-item').textContent = task.name;
                clone.querySelector('.task-desc').textContent = task.description;
                clone.querySelector('button').setAttribute('value', task.id);
                
                fragment.appendChild(clone);
            });

            tableTasks.appendChild(fragment);
        }
    })
}

function fetchTasksInSearch(search)
{
    $.ajax({
        url: './TasksActions/task-search.php',
        type: 'POST',
        data: {search},
        success: function (res) {
            let tasks = JSON.parse(res);

            if (tasks.length == 0)
            {
                cardSearchResult.style.display = "none";
            }
            else
            {
                $('#search-result tr').remove();
                
                tasks.forEach(task => {
                    const clone = taskTemplate.content.cloneNode(true);

                    clone.querySelector('tr').setAttribute('taskid', task.id);
                    clone.querySelector('.task-id').textContent = task.id;
                    clone.querySelector('.task-item').textContent = task.name;
                    clone.querySelector('.task-desc').textContent = task.description;
                    clone.querySelector('button').setAttribute('value', task.id);
                    
                    fragment.appendChild(clone);
                });

                tableSearchResult.appendChild(fragment);
                cardSearchResult.style.display = "block";
            }
        }
    })
}

function searchTask()
{
    if ($('#task-search').val()) {
        let search = $('#task-search').val();

        if (search.length == 0) {
            cardSearchResult.style.display = "none";
        }
        else {
            fetchTasksInSearch(search)
        }
    }
    else
    {
        cardSearchResult.style.display = "none"; 
    }
}

$(function () {
    if ($(window).width() < 992)
    {
        const clone = formTemplate.content.cloneNode(true);
        fragment.appendChild(clone);
        formCollapse.appendChild(fragment);
        navTitle.style.display = "none";
    }
    else
    {
        const clone = formTemplate.content.cloneNode(true);
        fragment.appendChild(clone);
        formCard.appendChild(fragment);
    }

    let edit = false;
    fetchTasks();
    $(document).on('click', '.task-delete', function () {
        let element = $(this)[0].parentElement.parentElement.parentElement;
        
        if (confirm('Are you sure you want to delete it?'))
        {
            let id = $(this).val();
            $.post('./TasksActions/task-delete.php', {id}, function (res) {
                fetchTasks();

                if ($(element).getAttribute('id') == 'search-result') // error acá
                {
                    let search = inputSearch.val();
                    fetchTasksInSearch(search);
                }
            })
        }
    })

    $('#task-search').keyup(function (event) {
        searchTask();
    })

    $('form').submit(function (e) {
        let url = edit === false ? './TasksActions/task-add.php' : './TasksActions/task-edit.php';
        
        const postData = {
            id: $('#task-id').val(),
            name: $('#task-name').val(),
            description: $('#task-description').val()
        };

        $.post(url, postData, function (res) {
            fetchTasks();
            $('form').trigger("reset");
        })

        edit = false;
        e.preventDefault();
    })

    $(document).on('click', '.task-item', function () {
        let element = $(this)[0].parentElement.parentElement;
        let id = element.getAttribute('taskid');
        $.post('./TasksActions/task-single.php', { id }, function (res) {
            let task = JSON.parse(res);
            edit = true;
            
            $('#task-id').val(task[0].id);
            $('#task-name').val(task[0].name);
            $('#task-description').val(task[0].description);
        })
    })
});