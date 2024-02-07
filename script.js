document.addEventListener('DOMContentLoaded', function() {
    var tfConfig = {
        base_path: 'https://unpkg.com/tablefilter@latest/dist/tablefilter/',
        col_0: 'select',
        col_1: 'select',
        col_2: 'none',
        col_3: 'select',
        col_4: 'none', // Treat familiarity and interest differently due to custom handling
        col_5: 'none',
        extensions: [{ name: 'sort' }]
    };

    var tf = new TableFilter('toolsTable', tfConfig);
    tf.init();

    // Add event listeners for dropdowns in 'Familiarity' and 'Interest' columns
    document.querySelectorAll('.rating-dropdown').forEach(function(select) {
        const identifier = select.dataset.identifier; // Use data-identifier for unique identification
        // Load saved selections
        const savedValue = localStorage.getItem(identifier);
        if (savedValue) {
            select.value = savedValue;
        }

        select.addEventListener('change', function() {
            localStorage.setItem(identifier, select.value);
        });
    });
});
