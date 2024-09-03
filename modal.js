document.addEventListener('DOMContentLoaded', function () {
    // Function to handle showing numbered modals and updating the number display
    function showModal(modalNumber) {
        // Hide all modals
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
        // Show the targeted modal by number
        const targetModal = document.getElementById(`myModal-${modalNumber}`);
        if (targetModal) {
            targetModal.style.display = 'block';
            // Update the modal number display if the element exists
            const modalNumberDisplay = targetModal.querySelector('.modal-number');
            if (modalNumberDisplay) {
                modalNumberDisplay.textContent = `${modalNumber}`;
            }
        }
    }

    // Function to handle showing modals by specific ID (like the Simboli modal)
    function openModalById(modalId) {
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // Detect all navigable modals on the page and get their numbers dynamically
    const modals = document.querySelectorAll('.modal[id^="myModal-"]');
    const modalNumbers = Array.from(modals).map(modal => parseInt(modal.id.replace('myModal-', ''), 10)).sort((a, b) => a - b);

    // Event listeners for modal triggers to open modals by data-modal attribute
    document.querySelectorAll('.modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const modalTarget = this.getAttribute('data-modal');

            // Check if the target is a numbered modal or a specific modal by ID
            if (modalTarget && !isNaN(modalTarget)) {
                // Open numbered modals
                showModal(parseInt(modalTarget, 10));
            } else if (modalTarget) {
                // Open non-numbered modals like "Simboli"
                openModalById(`myModal-${modalTarget}`);
            }
        });
    });

    // Adding event listeners to next, prev, and close buttons for navigable modals
    modals.forEach((modal) => {
        modal.addEventListener('click', function (e) {
            const action = e.target.getAttribute('data-action');

            // Prevent the default anchor behavior for navigation buttons inside the modal
            if (action === 'next' || action === 'prev' || action === 'close') {
                e.preventDefault();
            }

            const currentModalNumber = parseInt(modal.id.replace('myModal-', ''), 10);

            if (action === 'next') {
                e.stopPropagation();
                let nextIndex = currentModalNumber + 1;
                if (!modalNumbers.includes(nextIndex)) nextIndex = modalNumbers[1];
                showModal(nextIndex);
            } else if (action === 'prev') {
                e.stopPropagation();
                let prevIndex = currentModalNumber - 1;
                if (!modalNumbers.includes(prevIndex)) prevIndex = modalNumbers[modalNumbers.length - 1];
                showModal(prevIndex);
            } else if (action === 'close') {
                modal.style.display = 'none';
            }
        });
    });

    // Event listener to close modals when clicking outside the modal content
    window.addEventListener('click', function (event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
