// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch data asynchronously
    const fetchData = async () => {
      try {
        const response = await fetch("data.json");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Failed to load data:", error);
        return null;
      }
    };
  
    // Function to update the UI based on the selected frequency
    const updateUI = (data, frequency) => {
      data.forEach((item) => {
        // Find the container that corresponds to the current item
        const container = document.querySelector(
          `.${item.title.toLowerCase().replace(" ", "-")}-details-container`
        );
  
        if (container) {
          // Update the current and previous time values
          container.querySelector(".recent-time").textContent =
            `${item.timeframes[frequency].current}hrs`;
          container.querySelector(".previous-time").textContent =
            `Previous - ${item.timeframes[frequency].previous}hrs`;
        }
      });
    };
  
    // Main function to initialize the application
    const init = async () => {
      const data = await fetchData();
      if (!data) return;
  
      // Add event listeners to the radio buttons
      const radioButtons = document.querySelectorAll("input[name='frequency']");
      radioButtons.forEach((radio) => {
        radio.addEventListener("change", (event) => {
          updateUI(data, event.target.value);
        });
      });
  
      // Initialize the UI with the default frequency (weekly)
      updateUI(data, "weekly");
    };
  
    // Run the main function
    init();
  });
  