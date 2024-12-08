// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import Rails from "@rails/ujs";
Rails.start();

document.addEventListener("turbo:load", () => {
  const event = new Event("stimulus:connect");
  document.dispatchEvent(event);
});
