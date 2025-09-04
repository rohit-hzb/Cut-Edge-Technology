 document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('registration-form');
            const dobDay = document.getElementById('dobDay');
            const dobMonth = document.getElementById('dobMonth');
            const dobYear = document.getElementById('dobYear');

            // Function to dynamically populate date of birth dropdowns
            function populateDob() {
                // Populate Days
                for (let i = 1; i <= 31; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    dobDay.appendChild(option);
                }
                
                // Populate Months
                const months = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                months.forEach((month, index) => {
                    if (index === 0) {
                        const option = document.createElement('option');
                        option.value = "";
                        option.textContent = month;
                        dobMonth.appendChild(option);
                    } else {
                        const option = document.createElement('option');
                        option.value = index;
                        option.textContent = month;
                        dobMonth.appendChild(option);
                    }
                });

                // Populate Years
                const currentYear = new Date().getFullYear();
                const startYear = currentYear - 100;
                for (let i = currentYear; i >= startYear; i--) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    dobYear.appendChild(option);
                }
            }

            populateDob();

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Simple validation
                const requiredInputs = form.querySelectorAll('[required]');
                let isValid = true;
                requiredInputs.forEach(input => {
                    if (!input.value) {
                        isValid = false;
                        input.style.borderColor = 'red';
                    } else {
                        input.style.borderColor = '#ccc';
                    }
                });

                if (!isValid) {
                    alert('Please fill out all required fields.');
                    return;
                }

                // Gather all form data
                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });

                // Add hobbies and qualification data
                const hobbies = [];
                form.querySelectorAll('input[name="hobbies"]:checked').forEach(checkbox => {
                    hobbies.push(checkbox.value);
                });
                data.hobbies = hobbies;

                const qualifications = [];
                const qualificationRows = form.querySelectorAll('.qualification-table tbody tr');
                qualificationRows.forEach((row, index) => {
                    const inputs = row.querySelectorAll('input');
                    qualifications.push({
                        sNo: index + 1,
                        examination: inputs[0].value,
                        board: inputs[1].value,
                        percentage: inputs[2].value,
                        yearOfPassing: inputs[3].value
                    });
                });
                data.qualifications = qualifications;

                console.log(JSON.stringify(data, null, 2));
                alert('Form submitted successfully! Check the console for data.');
            });
        });

        // Simple alert replacement function
        function alert(message) {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                text-align: center;
                max-width: 90%;
            `;
            
            const messageP = document.createElement('p');
            messageP.textContent = message;
            modal.appendChild(messageP);

            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'OK';
            closeBtn.style.cssText = `
                margin-top: 15px;
                padding: 8px 16px;
                border-radius: 4px;
                background-color: #007bff;
                color: white;
                border: none;
                cursor: pointer;
            `;
            closeBtn.onclick = () => modal.remove();
            modal.appendChild(closeBtn);

            document.body.appendChild(modal);
        }