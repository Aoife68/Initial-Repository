    let form = document.getElementById('formAdd');
    let itemList = document.getElementById('items');
    let filter = document.getElementById('filter');
    let select = document.getElementById('select');


    //Form Submit Event
    form.addEventListener('submit', addForm);

    //Delete Event
    itemList.addEventListener('click', deleteItem);

    //Filter Event
    filter.addEventListener('keyup', filterItems);

    //Select Event
    select.addEventListener('click', filterSelect);

    //Add Form
    function addForm(e){
      //prevent default submission of form
      e.preventDefault();

      // console.log('Event Type: '+e.type);

      //Get input values
      let newBookTitle = document.getElementById('bookTitle').value;
      let newBookAuthor = document.getElementById('bookAuthor').value;

      //Validation required two values
      //Output to display errors
      let output = document.getElementById('output');
      output.innerHTML = "";

      if(newBookTitle !="" && newBookAuthor != ""){
        //Create new li items
        let li = document.createElement('li');
        li.className = 'list-group-item';

        //Set Anchors
        let a = document.createElement('a');
        a.textContent= newBookTitle;
        a.setAttribute('href','#');

        let a2 = document.createElement('a');
        a2.textContent= newBookAuthor;
        a2.className = 'author';
        // a2.classList.add('modal');
        a2.setAttribute('href','#');

        //Set Delete Button
        let button = document.createElement('button');
        button.className = "btn-danger btn-sm float-right delete";
        button.appendChild(document.createTextNode('X'));

        //Add anchor to li
        li.appendChild(a);
        li.appendChild(document.createTextNode(' written by '));
      //  console.log(a2);
        li.appendChild(a2);

        //Add button to li
        li.appendChild(button);
      //  console.log(li);
        //Add li to ul(itemList)
        itemList.appendChild(li);

        //Add to select options
        addOption(newBookAuthor);

        let odd = document.querySelectorAll('li:nth-child(odd)');
        for(let i = 0; i <odd.length; i++){
          odd[i].style.backgroundColor = '#eee';//'#f4f4f4';
        }

        let even = document.querySelectorAll('li:nth-child(even)');

        for(let i = 0; i <even.length; i++){
          even[i].style.backgroundColor = '#ccc';
        }
      } else {
        output.innerHTML = 'Error: Both Book Title and Author required';
        output.style.color = 'red';
        // alert('Both Book Title and Author required');
      }
      form.reset();
    }

      //Add Select Option
      function addOption(newBookAuthor){
        //console.log('addOption called');
          let option = document.createElement('option');
          option.textContent = newBookAuthor;
          option.setAttribute('value', newBookAuthor);
          var i = 0;
          Array.from(select).forEach((opt)=>{
            let optionName = opt.firstChild.textContent;
            i++;
            //if(optionName.toLowerCase() != newBookAuthor.toLowerCase()){
            if(optionName.toLowerCase().indexOf(newBookAuthor.toLowerCase()) != -1){
              select.remove(i);
            } else{
              select.appendChild(option);
            }
          });
      }

    //Delete Items
    function deleteItem(e){
      if(e.target.classList.contains('delete')){
        if(confirm('Are you sure you want to delete this book?')){
          let li = e.target.parentElement;
          itemList.removeChild(li);
        }
      }
    }

    //Filter Items Title
    function filterItems(e){
      //Convert to lower case
      let text = e.target.value.toLowerCase();
      //Get all li elements
      let items = document.getElementsByTagName('li');

      //Convert items to Array
      Array.from(items).forEach((item)=>{
        let itemName = item.firstChild.textContent;

        if(itemName.toLowerCase().indexOf(text) != -1){
          item.style.display = 'block';
        } else{
          item.style.display = 'none';
        }
      });
    }

    //Filter Select Author
    function filterSelect(e){
      //Convert to lower case
      let text = e.target.value.toLowerCase();

      //Get all li elements
      let items = document.querySelectorAll('.author');
      // let items = document.classList.contains('.author');

      for(var i= 0; i<items.length; i++){
        if(text === '#'){
          items[i].parentElement.style.display = 'block';
        } else{
          if(items[i].textContent.toLowerCase() === text){
            items[i].parentElement.style.display = 'block';
          } else{
            items[i].parentElement.style.display = 'none';
          }
        }
      }
    }

  
