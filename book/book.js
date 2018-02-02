var Book= {

    init : function(frame, store){

        var editSVG='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><g id="icomoon-ignore"> </g> <path class="edit" d="M410 32c38.659 0 70 31.34 70 70 0 15.759-5.211 30.3-14 42l-28 28-98-98 28-28c11.7-8.789 26.24-14 42-14zM59.999 354l-28 126 126-28 259-259-98-98-259 259zM345.065 191.065l-196 196-24.131-24.131 196-196 24.131 24.131z"></path> </svg>';
        var list= frame[0].children[0];
        var detail=frame[0].children[1];

        //adds a spinner while character details are fetched
        list.children[0].classList.add('spin');

        //fetches character information
        store.getCharacters().then(function(chars){
            list.children[0].classList.remove('spin');
            list.children[0].style.display='none';
            displayCharacters(chars);
        },function(err){
            console.error("can not fetch characters");
        });

        function displayCharacters(chars){
            for(var char in chars){
                if(chars.hasOwnProperty(char)){

                    var item=document.createElement('li');
                    item.classList.add('item');

                    item.addEventListener('click',displayCharacterDetails.bind(null,chars[char].id));

                    var name=document.createElement('div');
                    name.classList.add('name');
                    name.innerText= chars[char].name;

                    var species=document.createElement('div');
                    species.classList.add('species');
                    species.innerText=chars[char].species;

                item.appendChild(name);
                item.appendChild(species);
                list.appendChild(item)
                }
            }

        }

        //Displays Character Details
        function displayCharacterDetails(id){
            detail.innerHTML="";
            var selectedChar="";

            store.getCharacterDetails(id).then(function(character){

                var img=document.createElement('img');
                img.src=character.picture;
                img.alt="";
                img.classList.add('characterImage');

                var name=document.createElement('p');
                name.classList.add('characterName');
                name.innerText=character.name;

                var species=document.createElement('p');
                species.classList.add('characterDetail');
                species.innerText=character.species;

                var desc=document.createElement('p');
                desc.classList.add('characterDetail');
                desc.innerText=character.description;

                var editButton=document.createElement('button');
                editButton.addEventListener('click', editDetails);
                editButton.classList.add('editButton');
                editButton.innerHTML=editSVG;

                detail.appendChild(img);
                detail.appendChild(name);
                detail.appendChild(species);
                detail.appendChild(desc);
                detail.appendChild(editButton);

            },function(err){
                console.error("can not fetch character for ID" +id);
            });

        }

        function editDetails(){
        //not implemented
        }
    }

};