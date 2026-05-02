# Flashcard App

My first project in TripleTen's AI-Assisted Software Engineering program. This application allows users to organize knowledge into study decks, which are persisted to a cloud database and navigated through an interactive carousel interface for efficient studying.

## 🚀 Recent Updates: Sprint 3 & Final Polishes

The project has transitioned from a static prototype to a full-stack dynamic application. It now interacts with a remote REST API to ensure study materials are saved and accessible from anywhere.

### 🆕 New Features

* **Remote Data Persistence:** Full integration with a remote REST API. All deck creation and deletion actions are synced with a database in real-time.
* **New Deck Creation:** Users can create custom decks by providing a JSON array of cards, allowing for rapid loading of study materials.
* **Multi-View Routing:** Implemented a custom hash-based router (`#home`, `#deck/:id`, `#carousel/:id`, `#about`) to handle navigation between the main gallery, individual decks, and study mode.
* **About View:** A dedicated information page featuring a styled JSON schema example to guide users in creating their own decks.
* **Confirmation & Error Modals:** * **Accidental Deletion Protection:** A custom-built modal system prevents the accidental removal of decks. 
    * **Error Handling:** Robust feedback system that displays descriptive error messages via a modal if an API request fails or input is invalid.
* **Responsive "State-Aware" Mobile Bar:** A custom mobile navigation bar that adapts its layout automatically based on the active route.
* **Flashcard Carousel:** A dedicated study view with a 3-column CSS Grid layout on mobile, featuring "flip" mechanics to toggle between questions and answers.

### 🛠️ Technical Improvements

* **JSDoc Documentation:** Every named function in the project is fully documented using JSDoc, providing clear descriptions of parameters, return types, and logic for improved maintainability.
* **Asynchronous JavaScript:** Extensive use of `fetch`, `async/await`, and Promises to handle server-side communication and UI updates.
* **CSS Grid & Flexbox:** Advanced use of `grid-template-areas` to reposition navigation buttons on mobile without changing the HTML structure.
* **BEM Methodology:** Strict adherence to Block-Element-Modifier naming conventions for scalable and maintainable CSS.
* **Visual Depth:** Integrated multi-layered `box-shadow` specs directly from Figma to achieve a premium UI feel.

## 💻 Technologies Used

* **Frontend:** Vanilla JavaScript (ES6+ Modules)
* **API/Backend:** RESTful API (TripleTen Services)
* **Documentation:** JSDoc
* **HTML/CSS:** Semantic HTML5, CSS3 (Flexbox & Grid)
* **Design:** Figma (Source of truth for layouts and shadows)
* **Version Control:** Git & GitHub

## 🎥 Project Pitch

Watch a walkthrough of the features and technical challenges: [Project Demo Video](https://www.loom.com/share/f49fc8621040481f93910c5f5f7966af)

## 🔗 Deployed Site

Check out the live application here: [Flashcard App](https://hmcantu.github.io/ai-se_project_flashcards/)