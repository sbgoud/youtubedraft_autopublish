const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function automateYoutubePublishing() {
  const driver = new Builder().forBrowser('chrome').build();

  try {

    await driver.get('https://accounts.google.com/signin/v2/identifier?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fstudio.youtube.com%252F&hl=en&ec=65620&flowName=GlifWebSignIn&flowEntry=ServiceLogin'); // Or the direct YouTube login page

    // *** Interactive Login ***
    await waitForUserInput("Please log in to YouTube in the opened tab. Press Enter when done.");


    while (true) { // Loop until no more "EDIT DRAFT" buttons
      // Assuming you have an existing Chrome window open



      // Continue with the URL after login
      await driver.get('https://studio.youtube.com/channel/UCgw0bMwNVJJTnf7yr5hLLOg/videos/short?filter=%5B%7B%22name%22%3A%22VISIBILITY%22%2C%22value%22%3A%5B%22DRAFT%22%5D%7D%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D');

      try {
        // Find the first "EDIT DRAFT" button and click 
        const firstEditDraftButton = await driver.wait(until.elementLocated(By.className('edit-draft-button')), 10000); 
        await firstEditDraftButton.click();

        // Find and click "Visibility"
        const visibilityButton = await driver.wait(until.elementLocated(By.id('step-badge-3')), 10000); 
        await visibilityButton.click();

        // Find and click "Public"
        const publicOptions = await driver.wait(until.elementsLocated(By.name('PUBLIC')), 5000); 
        const publicOption = publicOptions[0];
        await publicOption.click();

        // Find and click the "Publish" button
        const publishButton = await driver.wait(until.elementLocated(By.id('done-button')), 5000); 
        await publishButton.click();

        // Wait for 3 seconds
        await driver.sleep(1000);

        

      } catch (error) {
        // No more "EDIT DRAFT" buttons found - process is complete
        console.log("All drafts published! or there is an unexpected error");
        break; 
      }
    } 

  } finally {
    await driver.quit();
  }
}

// Helper function
function waitForUserInput(message) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => readline.question(message, () => {
    readline.close();
    resolve();
  }));
}

automateYoutubePublishing();
