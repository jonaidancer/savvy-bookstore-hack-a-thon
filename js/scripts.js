// Put all of your jQuery and JavaScript in this document.
/* globals $ */

function appendToPage( productObject ){
    var $newContent = $( "<div>" );
    var $sellingPoints = $( "<div>" );
    var imageSrc = productObject.pictureUrl || productObject.picture;
    var $editButton = $( "<button>" + "Edit" + "</button>" );

    if( productObject.sellingPoints ){
        productObject.sellingPoints.forEach(
            ( sellingPoint ) => $sellingPoints.append( "<p>" + sellingPoint + "</p>" )
        );

        $newContent
            .append( "<h1>" + productObject.name + "</h1>" )
            .append( "<h2>" + productObject.author + "</h2>" )
            .append( "<img src='" + productObject.pictureUrl + "'/>" )
            .append( "<h2>$" + productObject.price + "</h2>" )
            .append( $sellingPoints )
            .append( "<button>" + "Delete" + "</button>" );
            $( "#content" ).append( $newContent );

            $( "button" ).on("click",(event) => {
              console.log("we deleted! \o/")
            });
    }
}


$.ajax( "https://api.savvycoders.com/books" ).then(
    ( products ) => products.forEach( appendToPage )
);

$( ".category" ).on( "click", ( event ) => {
    event.preventDefault();

    $( "#content" ).empty();

    $.ajax( "https://api.savvycoders.com" + event.target.attributes.href.value ).then(
        ( products ) => products.forEach( appendToPage )
    );
} );

$( "form" ).on( "submit", ( event ) => {
    var data = $( event.target ).serializeArray();
    var formObject = {};
    var postOptions = {
        "method": "POST"
    };

    event.preventDefault();

    formObject.sellingPoints = [];

    data.forEach( ( field ) => {
        if( field.name === "sellingPoints" ){
            formObject.sellingPoints.push( ...field.value.split( "\n" ) );
        }
        else{
            formObject[ field.name ] = field.value;
        }
    } );

    appendToPage( formObject );

    postOptions.data = formObject;

    $.ajax( "https://api.savvycoders.com/books", postOptions )
        .then(
            console.log
        )
        .catch(
            () => console.log( "Error!" )
        );
} );
