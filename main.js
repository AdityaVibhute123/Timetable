const courseSlots = {};

document.getElementById('courseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const courseCode = document.getElementById('courseCode').value;
    const slot = document.getElementById('slot').value;
    const color = document.getElementById('color').value;
    const venue = document.getElementById('venue').value;

    // Clear previous slot if it exists
    if (courseSlots[courseCode]) {
        const previousSlotsToUpdate = document.querySelectorAll(`[id^='slot${courseSlots[courseCode]}']`);
        previousSlotsToUpdate.forEach(slotElement => {
            if (slotElement.id.match(new RegExp(`^slot${courseSlots[courseCode]}[A-Z]*$`))) {
                slotElement.innerHTML = slotElement.id.replace('slot', '');
                slotElement.style.backgroundColor = '';
            }
        });
    }

    // Update all slots that match the given slot number exactly
    const slotsToUpdate = document.querySelectorAll(`[id^='slot${slot}']`);
    let validSlot = false;
    slotsToUpdate.forEach(slotElement => {
        if (slotElement.id.match(new RegExp(`^slot${slot}[A-Z]*$`))) {
            slotElement.innerHTML = `${courseCode}<br>${venue}`;
            slotElement.style.backgroundColor = color;
            validSlot = true;
        }
    });

    if (validSlot) {
        courseSlots[courseCode] = slot;
    } else {
        alert('Invalid slot');
    }
});

document.getElementById('exportButton').addEventListener('click', function() {
    html2canvas(document.querySelector('#timetable-container')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'timetable.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
