const courseSlots = {};

document.getElementById('courseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const courseCode = document.getElementById('courseCode').value;
    const slotInput = document.getElementById('slot').value;
    const color = document.getElementById('color').value;
    const venue = document.getElementById('venue').value;

    // Split the slot input by commas and trim any whitespace
    const slots = slotInput.split(',').map(slot => slot.trim());

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

    let validSlot = false;

    slots.forEach(slot => {
        // Update all slots that match the given slot number exactly or partially (for L-type slots)
        const slotsToUpdate = document.querySelectorAll(`[id^='slot${slot}']`);
        slotsToUpdate.forEach(slotElement => {
            if (slotElement.id.match(new RegExp(`^slot${slot}[A-Z]*$`))) {
                slotElement.innerHTML = `${courseCode}<br>${venue}`;
                slotElement.style.backgroundColor = color;
                validSlot = true;
            }
        });
    });

    if (validSlot) {
        courseSlots[courseCode] = slotInput;
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

        link.href = canvas.toDataURL();
        link.click();
    });
});
