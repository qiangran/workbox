class Main {
    /**注册SW */
    register() {
            //我们在DOM加载完成之后注册 以防止 阻塞其加载过程

            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/js/sw/sw.js').then(function(registration) {
                        // Registration was successful
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    }, function(err) {
                        // registration failed :(
                        console.log('ServiceWorker registration failed: ', err);
                    });
                });
            }

        }
        /**注销SW */
    unRegister() {

    }
};

(() => {
    new Main().register();

})();