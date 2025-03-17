
// This script prevents flashing of the wrong theme on page load
(function() {
  // Check if user has a theme preference
  const storedTheme = localStorage.getItem('theme') || 'system';
  
  // Check for system preference
  if (storedTheme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', systemTheme === 'dark');
  } else {
    // Apply stored theme
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }
})();
