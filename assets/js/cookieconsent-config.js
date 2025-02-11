import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';


// function loadGoogleAnalytics() {
//     if (window.gtag) return; // Prevents multiple loads

//     // Create Google Analytics script dynamically
//     var script = document.createElement('script');
//     script.src = 'https://www.googletagmanager.com/gtag/js?id=G-KPHHTGL5LH'; // Replace with your GA ID
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = function () {
//         window.dataLayer = window.dataLayer || [];
//         function gtag() { dataLayer.push(arguments); }
//         window.gtag = gtag;

//         gtag('js', new Date());
//         gtag('config', 'G-KPHHTGL5LH'); // Replace with your GA ID
//     };
// }

// function disableGoogleAnalytics() {
//     document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     document.cookie = "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     document.cookie = "_gat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//     console.log("Google Analytics disabled, cookies removed.");

//     // Optionally, reload the page to ensure tracking is disabled
//     location.reload();
// }


document.documentElement.classList.add('cc--darkmode');


CookieConsent.run({

    disablePageInteraction: true,
    autoShow: true,
    hideFromBots: true,
    mode: 'opt-in',
    revision: 0,
    current_lang: 'en',
    autoclear_cookies: true, // Automatically clear cookies if the user declines
    page_scripts: false,      // Enable page scripts based on consent

    cookie: {
        name: 'cc_cookie_demo2',
        expiresAfterDays: 182,
    },

    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
        consentModal: {
            layout: 'bar',
            position: 'bottom left',
            flipButtons: false,
            equalWeightButtons: false
        },
        preferencesModal: {
            layout: 'box',
            equalWeightButtons: false,
            flipButtons: false
        }
    },



    onFirstConsent: ({ cookie }) => {
        console.log('onFirstConsent fired', cookie);
    },

    onConsent: ({ cookie }) => {
        console.log('onConsent fired!', cookie)
    },

    onChange: ({ changedCategories, changedServices }) => {
        console.log('onChange fired!', changedCategories, changedServices);
    },

    onModalReady: ({ modalName }) => {
        console.log('ready:', modalName);
    },

    onModalShow: ({ modalName }) => {
        console.log('visible:', modalName);
    },

    onModalHide: ({ modalName }) => {
        console.log('hidden:', modalName);
    },


    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
            enabled: false,  // Analytics cookies are disabled by default
            readOnly: false,

            // Delete specific cookies when the user opts-out of this category
            autoClear: {
                cookies: [
                    { name: /^_ga/ }, // Match all cookies starting with '_ga'
                    { name: '_gid' },   // Exact cookie name
                    { name: '_gat' }   // Exact cookie name

                ]
            },

            // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
            services: {
                ga: {
                    label: 'Google Analytics',
                    onAccept: () => { // enable ga
                        console.log("Google Analytics accepted");
                        window.loadGoogleAnalytics();
                    },
                    onReject: () => { // disable ga
                        console.log("Google Analytics rejected");
                        window.disableGoogleAnalytics();
                    },
                    cookies: [
                        { name: /^_ga/ },
                        { name: '_gid' },
                        { name: '_gat' }
                    ]
                }
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
                            linkedCategory: 'analytics',
                            cookieTable: {
                                headers: {
                                    name: "Name",
                                    domain: "Service",
                                    description: "Description",
                                    expiration: "Expiration"
                                },
                                body: [
                                    {
                                        name: "_ga",
                                        domain: "Google Analytics",
                                        description: "Cookie set by <a href=\"#das\">Google Analytics</a>",
                                        expiration: "Expires after 12 days"
                                    },
                                    {
                                        name: "_gid",
                                        domain: "Google Analytics",
                                        description: "Cookie set by <a href=\"#das\">Google Analytics</a>",
                                        expiration: "Session"
                                    }
                                ]
                            }
                        },


                        {
                            title: 'More information',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a href="/contact/contact-4">contact us</a>'
                        }
                    ]
                }
            }
        }
    }



});
