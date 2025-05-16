// Add this code to a new file named card_stack.js

document.addEventListener('DOMContentLoaded', () => {
    const cardStackContainer = document.getElementById('card-stack-container');
    const shuffleButton = document.getElementById('shuffle-button');

    // --- Deck Data ---
    // Array of objects, each representing a card/category
    // This data is populated from the HTML you provided for the masonry layout
    const deck = [
        { name: "Ice Category", image: "images/ice.jpeg", link: "ice.html" },
        { name: "Eyes Category", image: "images/eyes.png", link: "eyes.html" },
        { name: "Water Category", image: "images/water.png", link: "water.html" },
        { name: "Fire Category", image: "images/fire.jpeg", link: "fire.html" },
        { name: "Salt Category", image: "images/salt.png", link: "salt.html" },
        { name: "Tree Category", image: "images/tree.jpeg", link: "tree.html" },
        { name: "Hands Category", image: "images/hands.jpeg", link: "hands.html" },
        { name: "Rain Category", image: "images/rain.png", link: "rain.html" },
        { name: "Milk Category", image: "images/milk.png", link: "milk.html" },
        { name: "Wood Category", image: "images/wood.png", link: "wood.html" },
        { name: "Rice Category", image: "images/rice.png", link: "rice.html" },
        { name: "Fish Category", image: "images/fish.png", link: "fish.html" },
        { name: "Monkey Category", image: "images/monkey.png", link: "monkey.html" },
        { name: "Bird Category", image: "images/bird.png", link: "bird.html" },
        { name: "Drink Category", image: "images/drink.png", link: "drink.html" },
        { name: "Gold Category", image: "images/gold.png", link: "gold.html" },
        { name: "Lion Category", image: "images/lion.png", link: "lion.html" },
        { name: "Fruit Category", image: "images/fruit.png", link: "fruit.html" },
        { name: "Cow Category", image: "images/cow.png", link: "cow.html" },
        { name: "Moon Category", image: "images/moon.png", link: "moon.html" },
        { name: "Dog Category", image: "images/dog.png", link: "dog.html" },
        { name: "Spoon Category", image: "images/spoon.png", link: "spoon.html" },
        { name: "Sun Category", image: "images/sun.png", link: "sun.html" },
        { name: "Mountain Category", image: "images/mountain.png", link: "mountain.html" },
        { name: "Flower Category", image: "images/flower.png", link: "flower.html" }
    ];

    let currentDeck = [...deck]; // Create a mutable copy of the deck

    // --- Shuffle Function (Fisher-Yates Algorithm) ---
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    // --- Render Cards in Stack ---
    function renderDeck(deckToRender) {
        cardStackContainer.innerHTML = ''; // Clear previous cards

        deckToRender.forEach((cardData, index) => {
            const cardElement = document.createElement('a');
            cardElement.href = cardData.link; // Set the link
            cardElement.classList.add('card');
            cardElement.dataset.category = cardData.name; // Store category name
            cardElement.style.setProperty('--i', index); // Set custom property for staggering

            // Create image element
            const imgElement = document.createElement('img');
            imgElement.src = cardData.image;
            imgElement.alt = cardData.name; // Use category name as alt text

            // Create title element
            const titleElement = document.createElement('span');
            titleElement.classList.add('card-title');
            titleElement.textContent = cardData.name.replace(' Category', ''); // Display name without " Category"

            // Append image and title to the card element
            cardElement.appendChild(imgElement);
            cardElement.appendChild(titleElement);

            // Add click listener for selecting a card
            cardElement.addEventListener('click', handleCardClick);

            cardStackContainer.appendChild(cardElement);
        });

        // Apply initial pile staggering after rendering
        staggerPile();
    }

    // --- Stagger Cards in a Pile Visually ---
    function staggerPile() {
        const cards = cardStackContainer.querySelectorAll('.card');
        const totalCards = cards.length;

        cards.forEach((card, index) => {
            // Calculate staggering based on index
            const offsetFactor = (totalCards - 1 - index) * 0.5; // Adjust 0.5 for tighter/looser pile
            const rotationFactor = (totalCards - 1 - index) * 0.2; // Adjust 0.2 for more/less rotation

            const offsetX = Math.random() * 10 - 5; // Small random horizontal offset
            const offsetY = offsetFactor; // Vertical offset based on index
            const rotate = Math.random() * 4 - 2; // Small random rotation

            // Apply staggering using CSS custom properties for smooth transitions
            card.style.setProperty('--offsetX', `${offsetX}px`);
            card.style.setProperty('--offsetY', `${offsetFactor}px`); // Use offsetFactor for consistent vertical spread
            card.style.setProperty('--rotate', `${rotate}deg`);
            card.style.setProperty('--z', totalCards - index); // Set z-index so lower cards are behind
        });
    }


    // --- Handle Card Click ---
    function handleCardClick(event) {
        event.preventDefault(); // Prevent default link navigation initially

        const clickedCard = event.currentTarget;
        const cards = cardStackContainer.querySelectorAll('.card');

        // Check if the clicked card is the top card (the last one in the HTML)
        // Or if it's the only card left after shuffling/selection
        const isTopCard = clickedCard === cards[cards.length - 1];

        if (isTopCard) {
            // This is the top card, navigate to its link
            console.log(`Selected: ${clickedCard.dataset.category}`);
            // Remove click listeners from all cards to prevent multiple navigations
            cards.forEach(card => card.removeEventListener('click', handleCardClick));
            // Navigate to the category page
            window.location.href = clickedCard.href;
        } else {
            // Not the top card, maybe trigger a shuffle or re-stagger?
            // For this simple version, clicking a non-top card does nothing.
            // You could add logic here to bring the clicked card to front, etc.
             console.log(`Clicked: ${clickedCard.dataset.category} (Not the top card)`);
             // Optional: Bring clicked card to front temporarily (more complex animation needed)
             // clickedCard.style.zIndex = 100;
        }
    }


    // --- Handle Shuffle Button Click ---
    shuffleButton.addEventListener('click', () => {
        // Shuffle the current deck
        currentDeck = shuffleArray(currentDeck);
        // Re-render the deck in the new order
        renderDeck(currentDeck);
        // Re-apply staggering to the newly ordered pile
        staggerPile();
    });

    // --- Initial Setup ---
    // Render the deck when the page loads
    renderDeck(currentDeck);
});
