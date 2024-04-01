import { useEffect } from "react";

const useSaveShortcut = (action: () => void, dependecyArray: unknown[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the Ctrl key (or Cmd key on Mac) is pressed along with the 's' key
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault(); // Prevent the default browser save action
        // Perform your save action here
        action();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup: Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependecyArray);
};

export default useSaveShortcut;
