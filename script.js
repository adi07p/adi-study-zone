// script.js

let questionCount = 0;

function updateTitle() {
    const title = document.getElementById('title').value;
    document.getElementById('titleText').textContent = title;
}

function updateSubject() {
    const subject = document.getElementById('subject').value;
    document.getElementById('subjectText').textContent = subject;
}

function previewLogo() {
    const file = document.getElementById('logo').files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('logoPreview').src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}

function addQuestion() {
    const questionText = document.getElementById('questionText').value;
    const optionsText = document.getElementById('optionsText').value;
    const options = optionsText.split(',');
    const file = document.getElementById('questionImage').files[0];
    let imageHtml = '';

    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            imageHtml = `<img src="${reader.result}" alt="Question Image" style="max-width: 100%; margin-top: 10px;">`;
            appendQuestion(questionText, options, imageHtml);
        }
        reader.readAsDataURL(file);
    } else {
        appendQuestion(questionText, options, imageHtml);
    }

    // Clear input fields
    document.getElementById('questionText').value = '';
    document.getElementById('optionsText').value = '';
    document.getElementById('questionImage').value = '';
}

function appendQuestion(questionText, options, imageHtml) {
    const questionHtml = `
        <div class="question">
            <p>${++questionCount}. ${questionText}</p>
            ${imageHtml}
            <div class="options">
                ${options.map((option, index) => `<p>(${index + 1}) ${option.trim()}</p>`).join('')}
            </div>
        </div>
    `;

    if (questionCount % 2 === 1) {
        document.getElementById('leftColumn').innerHTML += questionHtml;
    } else {
        document.getElementById('rightColumn').innerHTML += questionHtml;
    }

    // Update page numbers
    updatePageNumbers();
}

function updatePageNumbers() {
    const pages = document.querySelectorAll('.columns');
    pages.forEach((page, index) => {
        page.nextElementSibling.querySelector('.page-number').textContent = index + 1;
    });
}

function generatePDF() {
    const element = document.getElementById('questionPaper');
    
    // Using a more reliable PDF generation API
    const opt = {
        margin: 1,
        filename: 'question-paper.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Using html2pdf library to generate the PDF
    html2pdf().from(element).set(opt).save();
}
