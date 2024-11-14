import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';


// Get configuration values from the data attributes
const configElement = document.getElementById('config');
const googleAnalyticsEnabled = configElement.getAttribute('data-ga-enable') === 'true';
const googleAnalyticsKey = configElement.getAttribute('data-ga-key');


/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */

document.documentElement.classList.add('cc--darkmode');



CookieConsent.run({

    disablePageInteraction: true,

    guiOptions: {
        consentModal: {
            layout: 'bar',
            position: 'bottom left',
            flipButtons: false,
            equalWeightButtons: false
        }
    },

    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
			enabled: googleAnalyticsEnabled,  // Enables based on the config setting,
            readOnly: false,
            
            // Delete specific cookies when the user opts-out of this category
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    },
                    {
                        name: '_gid',   // string: exact cookie name
                    }
                ]
            }
            
		}
    },

    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'Cookies Parameters',
                    description: 'We use cookies to improve your browsing experience. You are free to choose the categories you wish to authorize. Access to certain functions of the website is affected by the settings you choose. Read more about our <a href="/legal-details">Cookies Policy</a>.',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences'
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    sections: [
                        {
                            title: 'Cookies',
                            description: 'Cookies help us improve your experience!'
                        },
                        {
                            title: 'Strictly Necessary cookies',
                            description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Performance and Analytics',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'More information',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a href="/contact/contact-4">contact us</a>'
                        }
                    ]
                }
            }
        }
    },


    onAccept: (cookie) => {
        if (cookie.categories.analytics) {
            loadGoogleAnalytics(googleAnalyticsKey);
        }
    },
    onChange: (cookie) => {
        if (cookie.categories && cookie.categories.analytics) {
            // Only load Google Analytics if consent is given
            loadGoogleAnalytics(googleAnalyticsKey);
        } else {
            // Optional: disable Google Analytics if the user revokes consent
            window['ga-disable-' + googleAnalyticsKey] = true;
            // Optional: Remove Google Analytics cookies if consent is revoked
            document.cookie = '_ga=; Max-Age=0; path=/;';
            document.cookie = '_gid=; Max-Age=0; path=/;';
        }
    }

});


// Function to load Google Analytics
function loadGoogleAnalytics(trackingId) {
    // if (window.ga) return;  // Prevent loading multiple times if already loaded
    if (window['ga-disable-' + gaKey]) return; // Exit if GA is disabled
    console.log("Google Analytics is loading...");

    // (function(i, s, o, g, r, a, m) {
    //     i['GoogleAnalyticsObject'] = r;
    //     i[r] = i[r] || function() {
    //         (i[r].q = i[r].q || []).push(arguments)
    //     }, i[r].l = 1 * new Date();
    //     a = s.createElement(o),
    //     m = s.getElementsByTagName(o)[0];
    //     a.async = 1;
    //     a.src = g;
    //     m.parentNode.insertBefore(a, m)
    // })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    // // ga('create', 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID', 'auto');
    // ga('create', trackingId, 'auto');
    // ga('send', 'pageview');
    // Add the Google Analytics script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaKey}`;
    document.head.appendChild(script);

    // Initialize GA only after loading the script
    script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', gaKey, { 'anonymize_ip': true });
    };
}