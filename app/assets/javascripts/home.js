var table;

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

function initializePage() {
    table = $('#table').DataTable();

    function checkFunction(inputData) {
        return inputData !== '';
    }

    function successFunction(inputData) {
        alert('success!');
    }

    function errorFunction(inputData) {
        alert('error!');
    }

    var options = {
        columns: [0, 1],
        checkFunction: checkFunction,
        successFunction: successFunction,
        errorFunction: errorFunction
    };

    setEditableColumns(table, options);
}

//TODO give and use different functions for different columns enabled
//TODO disable editor on all columns
//TODO disable editor on some columns

function setEditableColumns(table, options) {
    table.on('click', 'td', setEditableColumns);

    var enabled = false;
    var last_row, last_column;

    function setEditableColumns() {
        var cell = table.cell(this);

        var rowIndex = cell.index().row;
        var columnIndex = cell.index().column;
        console.log('row index: ' + rowIndex);
        console.log('column index: ' + columnIndex);

        if (options['columns'] && !options['columns'].includes(columnIndex)) {
            return;
        }

        var cellData = cell.data();
        var rowData = table.row(rowIndex).data();

        if (enabled) {
            if (last_row === rowIndex && last_column === columnIndex) {
                return;
            } else {
                $('.inline-edit-area').blur();
            }
        }

        table
            .cell(rowIndex, columnIndex)
            .data('<input style="margin:-8px 0; background-color: #B7EBE3; padding: 6px 4px;" ' +
                'class="form-control inline-edit-area" type="text" id="edit-area">');

        $('#edit-area').focus().val(cellData);

        enabled = true;
        last_row = rowIndex;
        last_column = columnIndex;

        $('.inline-edit-area').blur(resetTableRow);

        $('#edit-area').keypress(function (event) {
            if (event.which === ENTER_KEY_CODE) {
                var input = $('#edit-area').val();

                if (options['checkFunction'](input)) {
                    rowData[columnIndex] = input;
                    table.row(rowIndex).remove();
                    table.row.add(rowData);
                    table.draw();

                    options['successFunction'](input);
                } else {
                    options['errorFunction']();
                }
            } else if (event.which === ESC_KEY_CODE) {
                resetTableRow();
            }
        });

        function resetTableRow() {
            console.log('blur event received for (' + rowIndex + ',' + columnIndex + ')');
            table
                .cell(rowIndex, columnIndex)
                .data(cellData)
                .draw(false);

            enabled = false;
        }
    }
}
