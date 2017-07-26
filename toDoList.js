(function () {

  var todos = [
    { title: 'to wash dog', done: true, id: 1 },
    { title: 'to clean kitchen', done: false, id: 2 },
    { title: 'to repair the bike', done: true, id: 3 },
    { title: 'to play basketball on the clean playground', done: false, id: 4 }
  ];

  var KEYS = {
    ENTER: 13
  };

  var fieldValue = $('#newCase');
  var newMet = $('.newMetter').text();
  var doneMet = $('.doneMetter').text();

  fieldValue.keydown(event => {
    if (event.keyCode === KEYS.ENTER)
      addNewItem();
  });

  $('#plus').click(() => { addNewItem() });

  $(".clear").on('click', () => {
    if ('ol:has(li)')
      clearList();
    todos.length = 0;
  });

  $('ol').on('click', 'span, input', event => {
    if ($(event.target).is(".del")) {
      removeItem.call(this);
    } else if ($(event.target).is(".check")) {
      crossOutItem.call(this);
    }
  });

  function createList() {
    clearList();

    var todoList = todos.map(todo => (`
      <li class="todo" data-uuid="${todo.id}"> 
        <span> ${todo.title} </span>
        <span class="del"> &#10060 </span>
        <input type="checkbox" class="check"${todo.done ? ' checked' : ''} />
      </li>`
    )).join('');

    $('#caseList').append(todoList);
    checked();
    countItems();
  }

  function checked() {
    $('input[type=checkbox]:checked').parent('li').addClass('checked');
  }

  function countItems() {
    var j = 0;
    var k = 0
    for (var i = 0; i < todos.length; i++) {
      if (!todos[i].done) {
        j++;
        $('.newMetter').text(newMet + j);
      } else k++
      $('.doneMetter').text(doneMet + k);
    }
  }

  function addNewObjectToArray() {
    var worth = Math.floor(Math.random() * 10000);
    var value = fieldValue.val();
    var newItem = new Object();

    newItem.title = value;
    newItem.done = false;
    newItem.id = worth;
    todos.push(newItem);
  }

  function addNewItem() {
    var value = fieldValue.val();

    if (value.length === 0) {
      fieldValue.addClass('shadow');
    } else if (value.length >= 1) {
      addNewObjectToArray();
      createList();
      fieldValue.val('').removeClass('shadow');
    }
  }

  function crossOutItem() {
    var ident = +event.target.parentNode.dataset.uuid;

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id === ident) {
        todos[i].done = !todos[i].done;
        createList();
        countItems();
      }
    }
  }

  function removeItem() {
    var ident = +event.target.parentNode.dataset.uuid;

    todos = todos.filter(object => {
      return object.id !== ident;
    });

    createList();
  }


  function clearList() {
    $('ol').children('li').remove();
    $('.newMetter').text(newMet + '0');
    $('.doneMetter').text(doneMet + '0');
  }

  function init() {
    createList();
  }

  init();

})();
