document.addEventListener('DOMContentLoaded', function() {
    // Configuration for TableFilter
    var tfConfig = {
        base_path: 'https://unpkg.com/tablefilter@latest/dist/tablefilter/',
        col_0: 'select', // Dropdown filter for the first column
        col_1: 'select', // Dropdown filter for the second column
        col_2: 'none',   // No filter for the description
        col_3: 'select', // Dropdown filter for the integration
        col_4: 'select', // Dropdown filter for familiarity
        col_5: 'select', // Dropdown filter for interest
        extensions: [{ name: 'sort' }] // Enable sorting extension
    };

    // Initialize TableFilter on your table
    var tf = new TableFilter('toolsTable', tfConfig);
    tf.init();

     // Add event listeners for saving selections
    document.querySelectorAll('.rating-dropdown').forEach(function(select) {
        select.addEventListener('change', function() {
            const key = select.parentElement.parentElement.firstElementChild.textContent + '_' + select.name;
            localStorage.setItem(key, select.value);

            // Update the visible selection to match the dropdown (if using a display approach)
            updateVisibleSelection(select);
        });

        // Load saved selections
        const savedValue = localStorage.getItem(select.parentElement.parentElement.firstElementChild.textContent + '_' + select.name);
        if (savedValue) {
            select.value = savedValue;
            updateVisibleSelection(select);
        }
    });

    function updateVisibleSelection(select) {
        // Implementation depends on how you choose to display the selection
    }
});

});
