import './bootstrap';

//Inertia
import { createApp, h } from 'vue';
import { createInertiaApp, plugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';

createInertiaApp({
    resolve: (name) => import(`./Pages/${name}.vue`),
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .mount(el);
    },
});

// プログレスバーの設定
InertiaProgress.init()
