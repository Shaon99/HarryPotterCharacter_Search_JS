const List = document.getElementById('mydata');
const search = document.getElementById('search');

let realData=[];


search.addEventListener('keyup',(e)=>{
 const s_String=e.target.value.toLowerCase();
 const filter_Characters=realData.filter((character)=>{
     return(
            character.name.toLowerCase().includes(s_String) ||
            character.house.toLowerCase().includes(s_String)
          );
 });
 displayData(filter_Characters);
});

const loadData = async () => {
    try{
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        realData = await res.json();
        displayData(realData);
    }catch(err){
        console.log(err);
    }
} ;

const displayData = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h4>${character.name}</h4>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join('');

   List.innerHTML = htmlString;
};

loadData();