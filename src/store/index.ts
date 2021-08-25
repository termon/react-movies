export * from './useStateHook'
export * from './reducer'

export const debounce = (func: any, wait: number) => {
    let timeout: any;
    // This is the function that is returned and will be executed many times
    // We spread (...args) to capture any number of parameters we want to pass
    return function executedFunction(...args: any[]) {
      // The callback function to be executed after the debounce time has elapsed
      const later = () => {
        // null timeout to indicate the debounce ended
        timeout = null;
        console.log('calling func')
        // Execute the callback
        func(...args);
      };
      // This will reset the waiting every function execution. This is the step that prevents the function from
      // being executed because it will never reach the inside of the previous setTimeout
      clearTimeout(timeout);

      // Restart the debounce waiting period. setTimeout returns a truthy value (it differs in web vs Node)
      timeout = setTimeout(later, wait);
    };
  };