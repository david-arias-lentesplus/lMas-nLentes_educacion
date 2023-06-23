
console.log( "init script base" );

function template() {
    
    $(function(){
        $("#headerWrap").load("/components/header.html"); 
    });
    $(function(){
        $("#footerWrap").load("/components/footer.html"); 
    });

}




// functions

template();