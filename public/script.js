document.addEventListener('DOMContentLoaded', function() {
    const directory = document.getElementById('directory');

    const fileStructure = {
        'Aakash Modules': {
            'Botany': ['Study Package 1.pdf', 'Study Package 2.pdf'],
            // Add more files and subfolders as needed
        },
        'Catalyst': {},
        'Crash Course Modules': {},
    };

    const renderFolderContents = (folderContents, parentElement) => {
        Object.keys(folderContents).forEach(subFolder => {
            const folderDiv = document.createElement('div');
            folderDiv.classList.add('folder');
            folderDiv.textContent = subFolder;
            folderDiv.addEventListener('click', () => {
                folderDiv.classList.toggle('expanded');
                const files = folderContents[subFolder];
                if (typeof files === 'object' && !Array.isArray(files)) {
                    renderFolderContents(files, folderDiv);
                } else {
                    files.forEach(file => {
                        const fileDiv = document.createElement('div');
                        fileDiv.classList.add('file');
                        fileDiv.innerHTML = `<div class="details"><span>${file}</span><span>1.25 MB</span></div><button>Download</button>`;
                        parentElement.appendChild(fileDiv);
                    });
                }
            });
            parentElement.appendChild(folderDiv);
        });
    };

    renderFolderContents(fileStructure, directory);

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const folderElements = directory.getElementsByClassName('folder');
        Array.from(folderElements).forEach(folderElement => {
            const folderName = folderElement.textContent.toLowerCase();
            if (folderName.includes(query)) {
                folderElement.style.display = '';
            } else {
                folderElement.style.display = 'none';
            }
        });
    });
});
