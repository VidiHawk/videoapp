let deferredPrompt;
window.PWA = {
    isStandAlone: function(){
        let opened_in_app = false;
        if (window.matchMedia('(display-mode: standalone)').matches) {
            opened_in_app = true;
        }
        return opened_in_app;
    },
    showAddToHome: function(){
        document.querySelector('.emk-lite') && document.querySelector('.emk-lite').classList.remove('d-none');
    },
    hideAddToHome: function(){
        document.querySelector('.emk-lite') && document.querySelector('.emk-lite').classList.add('d-none');
    },
    installEventListeners: function(){
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            PWA.showAddToHome();
        });
    
        window.addEventListener('appinstalled', (evt) => {
            //console.log('App Installed in User Device');
            Util.setCookie('pwa_installed', true, 30);
        });
    },
    promptToUser: function(){
        deferredPrompt.prompt();
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    PWA.hideAddToHome();
                }
                deferredPrompt = null;
            });
    },
    addToHomeScreen: function(){
        if(document.querySelector('.emk-lite')){
            PWA.hideAddToHome();
            if(Util.getCookie('pwa_installed')){
                return;
            }

            if(!PWA.isStandAlone() && 'serviceWorker' in navigator) {
                PWA.installEventListeners();
                document.querySelector('.emk-lite').addEventListener('click', (e)=>PWA.promptToUser());
            }
        }
    }
}
PWA.addToHomeScreen();