var table;

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

function initializePage() {
    table = $('#table').DataTable();

    function checkFunction(inputData) {
        return false;
    }

    function successFunction(inputData) {
        alert('success!');
    }

    function errorFunction(inputData) {
        alert('error!');
    }

    setEditableColumns(table, [0, 1], checkFunction, successFunction, errorFunction);
}

//TODO give and use different functions for different columns enabled
//TODO disable editor on all columns
//TODO disable editor on some columns

function setEditableColumns(table, columns, checkFunction, successFunction, errorFunction) {
    table.on('click', 'td', function() {
        var cell = table.cell(this);

        var rowIndex = cell.index().row;
        var columnIndex = cell.index().column;
        console.log('row index: ' + rowIndex);
        console.log('column index: ' + columnIndex);

        if (columns && !columns.includes(columnIndex)) {
            return;
        }

        var cellData = cell.data();
        var rowData = table.row(rowIndex).data();

        table
            .cell(rowIndex, columnIndex)
            .data('<input class="form-control" type="text" id="edit-area">');

        $('#edit-area').focus();
        $('#edit-area').blur(resetTableRow);

        $('#edit-area').keypress(function (event) {
            if (event.which === ENTER_KEY_CODE) {
                var input = $('#edit-area').val();

                if (checkFunction(input)) {
                    rowData[columnIndex] = input;
                    table.row(rowIndex).remove();
                    table.row.add(rowData);
                    table.draw();

                    successFunction(input);
                } else {
                    errorFunction();
                }
            } else if (event.which === ESC_KEY_CODE) {
                resetTableRow();
            }
        });

        function resetTableRow() {
            table
                .cell(rowIndex, columnIndex)
                .data(cellData)
                .draw(false)
        }
    });
}
