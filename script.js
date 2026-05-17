const form = document.getElementById('registrationForm');

const addFamilyBtn = document.getElementById('addFamilyBtn');

const familyMembersContainer = document.getElementById('familyMembersContainer');

const profilePhoto = document.getElementById('profilePhoto');

const photoPreview = document.getElementById('photoPreview');

const progress = document.querySelector('.progress');

const submitBtn = document.querySelector('.submit-btn');

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

            <h3>
                Family Member ${memberCount}
            </h3>

            <button
                type="button"
                class="remove-btn"
            >
                Remove
            </button>

        </div>

        <div class="grid">

            <div class="input-group">

                <label>
                    Full Name
                </label>

                <input
                    type="text"
                    name="family_name_${memberCount}"
                    required
                >

            </div>

            <div class="input-group">

                <label>
                    Relationship
                </label>

                <select
                    name="family_relationship_${memberCount}"
                    required
                >

                    <option value="">
                        Select Relationship
                    </option>

                    <option>
                        Father
                    </option>

                    <option>
                        Mother
                    </option>

                    <option>
                        Brother
                    </option>

                    <option>
                        Sister
                    </option>

                    <option>
                        Son
                    </option>

                    <option>
                        Daughter
                    </option>

                    <option>
                        Other
                    </option>

                </select>

            </div>

            <div class="input-group">

                <label>
                    Age
                </label>

                <input
                    type="number"
                    min="0"
                    name="family_age_${memberCount}"
                    required
                >

            </div>

            <div class="input-group">

                <label>
                    Phone Number
                </label>

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
   GET FAMILY MEMBERS
========================================= */

function getFamilyMembers() {

    const members = [];

    document
        .querySelectorAll('.family-member')
        .forEach(member => {

            members.push({

                name:
                    member.querySelector(
                        'input[name^="family_name"]'
                    ).value,

                relationship:
                    member.querySelector(
                        'select[name^="family_relationship"]'
                    ).value,

                age:
                    member.querySelector(
                        'input[name^="family_age"]'
                    ).value,

                phone:
                    member.querySelector(
                        'input[name^="family_phone"]'
                    ).value
            });
        });

    return JSON.stringify(members);
}

/* =========================================
   FORM SUBMIT
========================================= */

form.addEventListener('submit', async function (e) {

    e.preventDefault();

    submitBtn.innerText = 'Submitting...';

    submitBtn.disabled = true;

    const data = {

        fullName:
            document.getElementById('fullName').value,

        gender:
            document.getElementById('gender').value,

        dob:
            document.getElementById('dob').value,

        maritalStatus:
            document.getElementById('maritalStatus').value,

        nationality:
            document.getElementById('nationality').value,

        occupation:
            document.getElementById('occupation').value,

        phone:
            document.getElementById('phone').value,

        email:
            document.getElementById('email').value,

        address:
            document.getElementById('address').value,

        spouseName:
            document.getElementById('spouseName').value,

        children:
            document.getElementById('children').value,

        emergencyContact:
            document.getElementById('emergencyContact').value,

        emergencyRelationship:
            document.getElementById(
                'emergencyRelationship'
            ).value,

        emergencyPhone:
            document.getElementById('emergencyPhone').value,

        emergencyAddress:
            document.getElementById(
                'emergencyAddress'
            ).value,

        reason:
            document.getElementById('reason').value,

        skills:
            Array.from(
                document.querySelectorAll(
                    '.skills input:checked'
                )
            ).map(el => el.value),

        familyMembers:
            getFamilyMembers()
    };

    try {

        await fetch(
            'https://script.google.com/macros/s/AKfycbzdbl-JAEzefx2tHa2D3Zek41w47KzKWqRBFVP1WQLjPjYWspA9O8TCWvGTGOAE2mud/exec',
            {
                method: 'POST',

                mode: 'no-cors',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            }
        );

        alert(
            'Registration submitted successfully!'
        );

        form.reset();

        familyMembersContainer.innerHTML = '';

        photoPreview.src =
            'https://via.placeholder.com/150';

        memberCount = 0;

        updateProgress();

    } catch (error) {

        console.error(error);

        alert(
            'Submission failed. Please try again.'
        );
    }

    submitBtn.innerText =
        'Submit Registration';

    submitBtn.disabled = false;
});

/* =========================================
   PROGRESS BAR
========================================= */

function updateProgress() {

    const inputs = form.querySelectorAll(
        'input, select, textarea'
    );

    let filled = 0;

    inputs.forEach(input => {

        if (input.type === 'checkbox') {

            if (input.checked) {
                filled++;
            }

        } else {

            if (input.value.trim() !== '') {
                filled++;
            }
        }
    });

    const percentage =
        inputs.length > 0
            ? (filled / inputs.length) * 100
            : 0;

    progress.style.width =
        percentage + '%';
}

/* =========================================
   LIVE PROGRESS UPDATE
========================================= */

document.addEventListener(
    'input',
    updateProgress
);

document.addEventListener(
    'change',
    updateProgress
);

/* =========================================
   PHONE VALIDATION
========================================= */

document.addEventListener('input', function (e) {

    if (e.target.type === 'tel') {

        e.target.value =
            e.target.value.replace(
                /[^0-9+]/g,
                ''
            );
    }
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

        members[
            members.length - 1
        ].scrollIntoView({
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

/* =========================================
   INITIALIZE PROGRESS
========================================= */

updateProgress();