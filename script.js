document.addEventListener("DOMContentLoaded", function() {
    let questionCount = 0;

    // Function to add a new question
    document.getElementById('add-question-btn').addEventListener('click', function() {
        questionCount++;
        const questionPaper = document.getElementById('question-paper');
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.setAttribute('data-question-id', questionCount);
        
        questionDiv.innerHTML = `
            <h3>Question ${questionCount}</h3>
            <textarea placeholder="Enter your question here..." rows="3" class="question-text"></textarea>
            <p>LaTeX Support: <input type="checkbox" class="latex-toggle"></p>
            <div class="latex-input" style="display:none;">
                <textarea placeholder="Enter LaTeX here..." rows="3" class="latex-text"></textarea>
                <div class="latex-preview"></div>
            </div>
            <input type="file" accept="image/*" class="image-upload">
            <button class="remove-question-btn">Remove</button>
        `;
        
        questionPaper.appendChild(questionDiv);
        
        // Bind events for the newly added question
        bindEvents(questionDiv);
    });

    // Function to bind events to the question elements
    function bindEvents(questionDiv) {
        // LaTeX toggle
        questionDiv.querySelector('.latex-toggle').addEventListener('change', function() {
            const latexInput = questionDiv.querySelector('.latex-input');
            if (this.checked) {
                latexInput.style.display = 'block';
            } else {
                latexInput.style.display = 'none';
            }
        });

        // LaTeX live preview
        questionDiv.querySelector('.latex-text').addEventListener('input', function() {
            const previewDiv = questionDiv.querySelector('.latex-preview');
            previewDiv.innerHTML = this.value;
            MathJax.typesetPromise([previewDiv]); // Rerender LaTeX
        });

        // Remove question
        questionDiv.querySelector('.remove-question-btn').addEventListener('click', function() {
            questionDiv.remove();
        });
    }

    // Function to generate PDF
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let content = document.querySelector('#question-paper').cloneNode(true);
        let questions = content.querySelectorAll('.question');

        questions.forEach((q, index) => {
            doc.text(20, 30 + (index * 20), `Question ${index + 1}: ${q.querySelector('.question-text').value}`);
            const latexText = q.querySelector('.latex-text').value;
            if (latexText) {
                doc.text(20, 40 + (index * 20), `LaTeX: ${latexText}`);
            }
        });

        doc.save('question-paper.pdf');
    }

    window.generatePDF = generatePDF;
});
