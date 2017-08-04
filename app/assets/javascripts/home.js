var table;

function initializePage() {
    table = $('#table').DataTable();

    $('#table tbody').on('click', 'tr', function (xyz) {
        var data = table.row( this ).data();
        console.log(xyz);
        for (var i in data)
            console.log(data[i]);

        // alert( 'You clicked on '+data[0]+'\'s row' );
    } );
}