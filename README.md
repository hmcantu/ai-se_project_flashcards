# Flashcard App

My first project in TripleTen's AI-Assisted Software Engineering program. This application allows users to organize knowledge into a gallery of flashcards, which can be navigated through an interactive carousel interface for efficient studying.

## 🚀 Recent Updates: Sprint 3

The project has been significantly expanded to include a multi-view routing system, advanced interactive components, and a custom responsive framework.

### 🆕 New Features

* **Multi-View Routing:** Implemented a custom hash-based router (`#home`, `#deck/:id`, `#carousel/:id`) to handle navigation between the main gallery, individual decks, and the study mode.
* **Open Deck Views:** Users can now open specific decks to manage cards within that category. The view dynamically renders based on the selected deck's ID.
* **Confirmation Modal:** Added a custom-built modal system to prevent accidental deletions. The modal requires user confirmation before removing any deck or card from the UI.
* **Responsive "State-Aware" Mobile Bar:** Designed a custom mobile navigation bar that adapts its layout automatically. It features a single centered action on the home screen and a dual-button "Deck View" layout when exploring specific categories.
* **Flashcard Carousel:** A dedicated study view with a 3-column CSS Grid layout on mobile, featuring "flip" mechanics to toggle between questions and answers.

### 🛠️ Technical Improvements

* **CSS Grid & Flexbox:** Advanced use of `grid-template-areas` to reposition navigation buttons on mobile without changing the HTML structure.
* **BEM Methodology:** Strict adherence to Block-Element-Modifier naming conventions for scalable and maintainable CSS.
* **State Management:** Used JavaScript to manage global page states (e.g., hiding the navigation bar and gradient on the carousel page) via CSS modifier classes.
* **Visual Depth:** Integrated multi-layered `box-shadow` specs (Drop Shadows and Inset Bevels) directly from Figma to achieve a premium UI feel.

## 💻 Technologies Used

* **Frontend:** Vanilla JavaScript (ES6+ Modules)
* **HTML/CSS:** Semantic HTML5, CSS3 (Flexbox & Grid)
* **Design:** Figma (Source of truth for layouts and shadows)
* **Version Control:** Git & GitHub

## 🎥 Project Pitch

Watch a walkthrough of the features and technical challenges: [Project Demo Video](https://www.loom.com/share/f49fc8621040481f93910c5f5f7966af)

## 🔗 Deployed Site

Check out the live application here: [Flashcard App](https://hmcantu.github.io/ai-se_project_flashcards/)