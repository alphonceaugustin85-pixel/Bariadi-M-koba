const form = document.getElementById('registrationForm');

const addFamilyBtn = document.getElementById('addFamilyBtn');

const familyMembersContainer = document.getElementById('familyMembersContainer');

const profilePhoto = document.getElementById('profilePhoto');

const photoPreview = document.getElementById('photoPreview');

let memberCount = 0;

/* =========================================
   PROFILE PHOTO PREVIEW
========================================= */

profilePhoto.addEventListener('change', function (e) {

    const file = e.target.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (event) {

            photoPreview.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});

/* =========================================
   ADD FAMILY MEMBER
========================================= */

addFamilyBtn.addEventListener('click', function () {

    memberCount++;

    const memberCard = document.createElement('div');

    memberCard.classList.add('family-member');

    memberCard.innerHTML = `
    
        <div class="family-header">
            <h3>Family Member ${memberCount}</h3>

            <button
                type="button"
                class="remove-btn"
            >
                Remove
            </button>
        </div>

        <div class="grid">

            <div class="input-group">
                <label>Full Name</label>
                <input
                    type="text"
                    name="family_name_${memberCount}"
                    required
                >
            </div>

            <div class="input-group">
                <label>Relationship</label>

                <select
                    name="family_relationship_${memberCount}"
                    required
                >
                    <option value="">
                        Select Relationship
                    </option>

                    <option>Father</option>
                    <option>Mother</option>
                    <option>Brother</option>
                    <option>Sister</option>
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Other</option>

                </select>
            </div>

            <div class="input-group">
                <label>Age</label>

                <input
                    type="number"
                    min="0"
                    name="family_age_${memberCount}"
                    required
                >
            </div>

            <div class="input-group">
                <label>Phone Number</label>

                <input
                    type="tel"
                    name="family_phone_${memberCount}"
                >
            </div>

        </div>
    `;

    familyMembersContainer.appendChild(memberCard);

    updateProgress();

    /* REMOVE FAMILY MEMBER */

    const removeBtn = memberCard.querySelector('.remove-btn');

    removeBtn.addEventListener('click', function () {

        memberCard.remove();

        updateProgress();
    });
});

/* =========================================
   FORM SUBMIT
========================================= */

form.addEventListener('submit', function (e) {

    e.preventDefault();

    alert(
        'Registration submitted successfully!'
    );

    form.reset();

    familyMembersContainer.innerHTML = '';

    photoPreview.src =
        'https://via.placeholder.com/150';

    memberCount = 0;

    updateProgress();
});

/* =========================================
   PROGRESS BAR
========================================= */

const progress = document.querySelector('.progress');

function updateProgress() {

    const inputs = form.querySelectorAll(
        'input, select, textarea'
    );

    let filled = 0;

    inputs.forEach(input => {

        if (
            input.type === 'checkbox'
        ) {

            if (input.checked) {
                filled++;
            }

        } else {

            if (
                input.value.trim() !== ''
            ) {
                filled++;
            }
        }
    });

    const percentage =
        (filled / inputs.length) * 100;

    progress.style.width =
        percentage + '%';
}

/* =========================================
   LIVE PROGRESS UPDATE
========================================= */

document.addEventListener('input', updateProgress);

document.addEventListener('change', updateProgress);

/* =========================================
   PHONE NUMBER VALIDATION
========================================= */

const phoneInputs =
    document.querySelectorAll(
        'input[type="tel"]'
    );

phoneInputs.forEach(input => {

    input.addEventListener('input', () => {

        input.value =
            input.value.replace(/[^0-9+]/g, '');
    });
});

/* =========================================
   SMOOTH SCROLL TO NEW MEMBER
========================================= */

const observer = new MutationObserver(() => {

    const members =
        document.querySelectorAll(
            '.family-member'
        );

    if (members.length > 0) {

        members[members.length - 1]
            .scrollIntoView({
                behavior: 'smooth'
            });
    }
});

observer.observe(
    familyMembersContainer,
    {
        childList: true
    }
);