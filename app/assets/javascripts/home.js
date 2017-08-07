var table;

function initializePage() {
    table = $('#table').DataTable();

    $('#table tbody').on('click', 'td', function (xyz) {
        var cell = table.cell(this);

        var rowIndex = cell.index().row;
        var columnIndex = cell.index().column;
        console.log('clicked cell row: ' + rowIndex);
        console.log('clicked cell column: ' + columnIndex);

        var cellData = cell.data();
        console.log('clicked cell content: "' + cellData + '"');

        table
            .cell(rowIndex, columnIndex)
            .data('<p style="color:red">' + cellData + '</p>')
            .draw(false);
    });
}