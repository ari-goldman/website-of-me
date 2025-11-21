document.addEventListener('DOMContentLoaded', () => {
    function isChromiumBased() {
        // 1. Check for the modern User-Agent Client Hints API support
        if (navigator.userAgentData && Array.isArray(navigator.userAgentData.brands)) {
            const isChromium = navigator.userAgentData.brands.some(brand => {
                return brand.brand.includes("Chromium");
            });
            
            return isChromium;
        } 
        
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('chrome') && !userAgent.includes('safari') && !userAgent.includes('firefox');
    }

    // --- Check and Display Warning ---
    const warningElement = document.getElementById('chrome-warning');

    console.log(isChromiumBased())
    if (!isChromiumBased()) {
        warningElement.classList.remove('hidden');
    }
});