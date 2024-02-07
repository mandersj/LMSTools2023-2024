document.addEventListener('DOMContentLoaded', function() {
    const tools = [
        {
            name: 'H5P',
            link: 'https://h5p.org',
            classification: 'Content Creation Tools',
            description: 'H5P enables educators to create, share, and reuse interactive HTML5 content. Its versatility ranges from interactive videos to quizzes and presentations.',
            integration: 'Direct plugin/LTI',
        },
        {
            name: 'Genially',
            link: 'https://genial.ly',
            classification: 'Content Creation Tools',
            description: 'Genially offers a platform for creating interactive and animated presentations, infographics, and more, focusing on engagement and creativity.',
            integration: 'LTI, possibly others',
        }
    ];

    const familiarityOptions = ['Unawareness', 'Awareness', 'Knowledge', 'Preference', 'Loyalty'];
    const interestOptions = ['⛔ Not Interested', '🧐 Curious', '🤔 Interested', '🤩 Purchase!', '🙂 In Use', 'N/A'];

    const tableBody = document.getElementById('toolsTable');

    tools.forEach((tool, index) => {
        const row = tableBody.insertRow();
        row.insertCell().innerHTML = `<a href="${tool.link}" target="_blank">${tool.name}</a>`;
        row.insertCell().textContent = tool.classification;
        row.insertCell().textContent = tool.description;
        row.insertCell().textContent = tool.integration;

        const familiarityCell = row.insertCell();
        const interestCell = row.insertCell();

        const familiaritySelect = createDropdown(`familiarity-${index}`, familiarityOptions);
        const interestSelect = createDropdown(`interest-${index}`, interestOptions);

        familiarityCell.appendChild(familiaritySelect);
        interestCell.appendChild(interestSelect);

        // Load saved ratings if they exist
        familiaritySelect.value = localStorage.getItem(`familiarity-${index}`) || 'Unawareness';
        interestSelect.value = localStorage.getItem(`interest-${index}`) || '⛔ Not Interested';

        familiaritySelect.addEventListener('change', () => saveRating(`familiarity-${index}`, familiaritySelect.value));
        interestSelect.addEventListener('change', () => saveRating(`interest-${index}`, interestSelect.value));
    });

    function createDropdown(id, options) {
        const select = document.createElement('select');
        select.id = id;
        select.className = 'rating-dropdown';
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = opt.textContent = option;
            select.appendChild(opt);
        });
        return select;
    }

    function saveRating(key, value) {
        localStorage.setItem(key, value);
    }
});
// Add these lines at the end of the document.addEventListener block

document.getElementById('sortFamiliarity').addEventListener('click', function() {
    sortTable('familiarity');
});

document.getElementById('sortInterest').addEventListener('click', function() {
    sortTable('interest');
});

function sortTable(criteria) {
    let rows, switching, i, x, y, shouldSwitch;
    switching = true;
    // Make a loop that will continue until no switching has been done
    while (switching) {
        // Start by saying: no switching is done
        switching = false;
        rows = tableBody.rows;
        // Loop through all table rows (except the first, which contains table headers)
        for (i = 0; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching
            shouldSwitch = false;
            // Get the two elements you want to compare, one from current row and one from the next
            x = rows[i].getElementsByTagName("SELECT")[criteria === 'familiarity' ? 0 : 1];
            y = rows[i + 1].getElementsByTagName("SELECT")[criteria === 'familiarity' ? 0 : 1];
            // Check if the two rows should switch place, based on the direction, asc or desc
            if (x.value.toLowerCase() > y.value.toLowerCase()) {
                // If yes, mark as a switch and break the loop
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark that a switch has been done
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
