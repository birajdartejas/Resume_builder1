document.addEventListener('DOMContentLoaded', () => {
    // Show the "Personal Information" section by default
    document.getElementById('personalInfo').classList.add('active');
    
    // Add event listeners for the navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove 'active' class from all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Add 'active' class to the target section
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.classList.add('active');
        });
    });

    // Generate PDF resume
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        // Set margins
        const margin = 10;
        const pageWidth = 210; // A4 width in mm
        const contentWidth = pageWidth - (2 * margin);
        
        doc.setFont("Arial", "normal");

        let y = margin;
        
        // Add resume title
        doc.setFontSize(16);
        doc.setFont("Arial", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text("Resume Builder", pageWidth / 2, y, { align: "center" });
        y += 10; // Space after the title

        // Helper function for section headers
        function addSectionHeader(headerText) {
            doc.setFontSize(12);
            doc.setFont("Arial", "bold");
            doc.setTextColor(0, 0, 255); // Blue color for section headers
            doc.text(headerText, margin, y);
            doc.setLineWidth(0.5);
            doc.line(margin, y + 2, pageWidth - margin, y + 2); // Draw underline
            y += 6; // Space after header
        }

        // Helper function for subsection content
        function addSubSectionContent(label, content, gap = 6) {
            doc.setFontSize(11);
            doc.setFont("Arial", "bold");
            doc.setTextColor(0, 0, 0); // Black color for subsection labels
            if (label) {
                doc.text(label, margin, y);
                doc.setFontSize(10);
                doc.setFont("Arial", "normal");
                doc.setTextColor(0, 0, 0); // Black color for content
                doc.text(content, margin + 50, y); // Align content
            } else {
                doc.setFontSize(10);
                doc.setFont("Arial", "normal");
                doc.setTextColor(0, 0, 0); // Black color for content
                doc.text(content, margin, y); // Align content to the left
            }
            y += gap; // Small gap after each subsection
        }

        // Helper function for section content
        function addContent(contentData) {
            contentData.forEach(({ label, content }, index) => {
                const gap = label === "Project Overview:" && index < contentData.length - 1 && contentData[index + 1].label === "Deployed Link:" ? 10 : 6;
                addSubSectionContent(label, content, gap);
            });
            y += 6; // Space after each section
        }

        // Add sections to the PDF
        function addSection(title, contentData) {
            addSectionHeader(title);
            addContent(contentData);
        }

        // Personal Information
        const personalInfo = [
            { label: "Full Name:", content: document.getElementById('name').value },
            { label: "Address:", content: document.getElementById('address').value },
            { label: "Email:", content: document.getElementById('email').value },
            { label: "Phone:", content: document.getElementById('phone').value },
            { label: "GitHub:", content: document.getElementById('github').value },
            { label: "LinkedIn:", content: document.getElementById('linkedin').value }
        ];
        addSection("Personal Information", personalInfo);

        // Education
        const education = [
            { label: "School/University:", content: document.getElementById('school').value },
            { label: "Degree:", content: document.getElementById('degree').value },
            { label: "Start Date:", content: document.getElementById('startDate').value },
            { label: "End Date:", content: document.getElementById('endDate').value },
            { label: "CGPA:", content: document.getElementById('cgpa').value }
        ];
        addSection("Education", education);

        // Experience
        const experience = [
            { label: "Company:", content: document.getElementById('company').value },
            { label: "Role:", content: document.getElementById('role').value },
            { label: "Start Date:", content: document.getElementById('startExpDate').value },
            { label: "End Date:", content: document.getElementById('endExpDate').value }
        ];
        addSection("Experience", experience);

        // Skills
        const skills = [
            { label: "", content: document.getElementById('skill1').value },
            { label: "", content: document.getElementById('skill2').value },
            { label: "", content: document.getElementById('skill3').value }
        ];
        addSection("Skills", skills);

        // Projects
        const projects = [
            { label: "Project Title:", content: document.getElementById('projectTitle').value },
            { label: "Project Overview:", content: document.getElementById('projectOverview').value },
            { label: "Deployed Link:", content: document.getElementById('deployedLink').value },
            { label: "GitHub Link:", content: document.getElementById('projectGithub').value }
        ];
        addSection("Projects", projects);

        // Achievements
        const achievements = [
            { label: "", content: document.getElementById('achievement1').value },
            { label: "", content: document.getElementById('achievement2').value },
            { label: "", content: document.getElementById('achievement3').value }
        ];
        addSection("Achievements", achievements);

        return doc;
    }

    function previewPDF() {
        const doc = generatePDF();
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        window.open(url);
    }

    // Event listener for generate resume button
    document.getElementById('generateResume').addEventListener('click', () => {
        const doc = generatePDF();
        doc.save('resume.pdf');
    });

    // Event listener for preview resume button
    document.getElementById('previewResume').addEventListener('click', previewPDF);
});
