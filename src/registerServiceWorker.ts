export function registerServiceWorker() {
    // Check if the current environment is the browser
    if (typeof window !== "undefined") {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
              return;
            })
            .catch((registrationError) => {
              console.error(
                "Service Worker registration failed: ",
                registrationError
              );
            });
        });
      }
    }
  }
  