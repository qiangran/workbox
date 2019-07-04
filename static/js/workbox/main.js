class Main {
    /**注册SW */
    register() {
        //我们在DOM加载完成之后注册 ,以防止 阻塞其加载过程

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then((registration) => {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    send_message_to_sw("我是来自主线程的消息！！！");
                }, function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }

    }

};



(() => {
    new Main().register();

    // fetch('/data/mock.json')
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(myJson) {
    //         console.log(myJson);
    //     });
    //console.log("修改JS文件");
})();


























function send_message_to_sw(msg) {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage("Client 1 says '" + msg + "'");
    }
}