
console.log( "init script base" );

function template() {

    let prom = new Promise( (resolve,reject) => {

        $(function(){
            $("#headerWrap").load("/components/header.html"); 
        });
        $(function(){
            $("#footerWrap").load("/components/footer.html"); 
        });

        setTimeout(() => {
            resolve( true )
        }, 300);

    })
    return prom;

}

function currLoja() {

    let prom = new Promise( (resolve,reject) => {

        const body = document.body;
    
        if( body.className.includes("lentesplus") ) {
            console.log(`Body: lentesplus`);
            body.classList.add("lentesplus");
        } else if( body.className.includes("newlentes") ) {
            console.log(`Body: newlentes`);
            body.classList.add("newlentes");
        } else {
            console.log(`Body: N/A`);
            body.classList.add("lentesplus");
        }

        setTimeout(() => {
            resolve( true )
        }, 3000);

    })
    return prom;
    

}
function changeLoja() {

    const body = document.body;

    const lojaBtn_lp = document.getElementById("js_lojaLentesplus");
    const lojaBtn_nl = document.getElementById("js_lojaNewlentes");

    lojaBtn_lp.addEventListener("click", () => {
        body.classList.remove("newlentes");
        body.classList.add("lentesplus");
    })
    lojaBtn_nl.addEventListener("click", () => {
        body.classList.remove("lentesplus");
        body.classList.add("newlentes");
    })

}

function changePage( elem ) {
    // console.log( elem.dataset.html );

    $("#contentWrap").load( elem.dataset.html ); 
}




// functions

template().then( () => {
    currLoja().then( () => {
        changeLoja();
    });
});
