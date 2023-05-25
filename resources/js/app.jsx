/* Main */
import $ from 'jquery';
import _ from 'lodash';
import * as bootstrap from 'bootstrap'
import Waves from 'node-waves';
import TomSelect from 'tom-select';
import 'metismenu';


window.$ = window.jQuery = $;
window._ = _;
window.TomSelect = TomSelect;

/* Inertia & Vue */
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import axios from 'axios';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/* Just for TEST */
window.dd = console.log; // just for debugging

/**/
// var language = localStorage.getItem('language');
// // Default Language
// var default_lang = 'en';
//
// function setLanguage(lang) {
//     if (document.getElementById("header-lang-img")) {
//         if (lang == 'en') {
//             document.getElementById("header-lang-img").src = "assets/images/flags/us.jpg";
//         } else if (lang == 'sp') {
//             document.getElementById("header-lang-img").src = "assets/images/flags/spain.jpg";
//         }
//         else if (lang == 'gr') {
//             document.getElementById("header-lang-img").src = "assets/images/flags/germany.jpg";
//         }
//         else if (lang == 'it') {
//             document.getElementById("header-lang-img").src = "assets/images/flags/italy.jpg";
//         }
//         else if (lang == 'ru') {
//             document.getElementById("header-lang-img").src = "assets/images/flags/russia.jpg";
//         }
//         localStorage.setItem('language', lang);
//         language = localStorage.getItem('language');
//         getLanguage();
//     }
// }
//
// // Multi language setting
// function getLanguage() {
//     (language == null) ? setLanguage(default_lang) : false;
//     $.getJSON('assets/lang/' + language + '.json', function (lang) {
//         $('html').attr('lang', language);
//         $.each(lang, function (index, val) {
//             (index === 'head') ? $(document).attr("title", val['title']) : false;
//             $("[key='" + index + "']").text(val);
//         });
//     });
// }

//metis menu
function initMetisMenu() {
    $("#side-menu").metisMenu();
}

function initLeftMenuCollapse() {
    $('#vertical-menu-btn').on('click', function (event) {
        event.preventDefault();
        $('body').toggleClass('sidebar-enable');
        if ($(window).width() >= 992) {
            $('body').toggleClass('vertical-collpsed');
        } else {
            $('body').removeClass('vertical-collpsed');
        }
    });
}

function initActiveMenu() {
    // === following js will activate the menu in left side bar based on url ====
    $("#sidebar-menu a").each(function () {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href == pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("mm-active"); // add active to li of the current link
            $(this).parent().parent().addClass("mm-show");
            $(this).parent().parent().prev().addClass("mm-active"); // add active class to an anchor
            $(this).parent().parent().parent().addClass("mm-active");
            $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
            $(this).parent().parent().parent().parent().parent().addClass("mm-active");
        }
    });
}

function initMenuItemScroll() {
    // focus active menu in left sidebar
    $(document).ready(function () {
        if ($("#sidebar-menu").length > 0 && $("#sidebar-menu .mm-active .active").length > 0) {
            var activeMenu = $("#sidebar-menu .mm-active .active").offset().top;
            if (activeMenu > 300) {
                activeMenu = activeMenu - 300;
                $(".vertical-menu .simplebar-content-wrapper").animate({ scrollTop: activeMenu }, "slow");
            }
        }
    });
}

function initHoriMenuActive() {
    $(".navbar-nav a").each(function () {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href == pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("active");
            $(this).parent().parent().addClass("active");
            $(this).parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().parent().parent().addClass("active");
        }
    });
}

function initFullScreen() {
    $('[data-bs-toggle="fullscreen"]').on("click", function (e) {
        e.preventDefault();
        $('body').toggleClass('fullscreen-enable');
        if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    });
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    function exitHandler() {
        if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            $('body').removeClass('fullscreen-enable');
        }
    }
}

function initRightSidebar() {
    // right side-bar toggle
    $('.right-bar-toggle').on('click', function (e) {
        $('body').toggleClass('right-bar-enabled');
    });

    $(document).on('click', 'body', function (e) {
        if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
            return;
        }

        $('body').removeClass('right-bar-enabled');
        return;
    });
}

function initDropdownMenu() {
    if (document.getElementById("topnav-menu-content")) {
        var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
        for (var i = 0, len = elements.length; i < len; i++) {
            elements[i].onclick = function (elem) {
                if (elem.target.getAttribute("href") === "#") {
                    elem.target.parentElement.classList.toggle("active");
                    elem.target.nextElementSibling.classList.toggle("show");
                }
            }
        }
        window.addEventListener("resize", updateMenu);
    }
}

function updateMenu() {
    var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
    for (var i = 0, len = elements.length; i < len; i++) {
        if (elements[i].parentElement.getAttribute("class") === "nav-item dropdown active") {
            elements[i].parentElement.classList.remove("active");
            if (elements[i].nextElementSibling !== null) {
                elements[i].nextElementSibling.classList.remove("show");
            }
        }
    }
}

function initComponents() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });

    var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
    var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
        return new bootstrap.Offcanvas(offcanvasEl)
    })
}

function initPreloader() {
    $(window).on('load', function () {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
    });
}

function initSettings() {
    if (window.sessionStorage) {
        var alreadyVisited = sessionStorage.getItem("is_visited");
        if (!alreadyVisited) {
            if ($('html').attr('dir') === 'rtl' && $('body').attr('data-layout-mode') === 'dark') {
                $("#dark-rtl-mode-switch").prop('checked', true);
                $("#light-mode-switch").prop('checked', false);
                sessionStorage.setItem("is_visited", "dark-rtl-mode-switch");
                updateThemeSetting(alreadyVisited);
            }else if ($('html').attr('dir') === 'rtl') {
                $("#rtl-mode-switch").prop('checked', true);
                $("#light-mode-switch").prop('checked', false);
                sessionStorage.setItem("is_visited", "rtl-mode-switch");
                updateThemeSetting(alreadyVisited);
            }else if ($('body').attr('data-layout-mode') === 'dark') {
                $("#dark-mode-switch").prop('checked', true);
                $("#light-mode-switch").prop('checked', false);
                sessionStorage.setItem("is_visited", "dark-mode-switch");
                updateThemeSetting(alreadyVisited);
            } else {
                sessionStorage.setItem("is_visited", "light-mode-switch");
            }
        } else {
            $(".right-bar input:checkbox").prop('checked', false);
            $("#" + alreadyVisited).prop('checked', true);
            updateThemeSetting(alreadyVisited);
        }
    }
    $("#light-mode-switch, #dark-mode-switch, #rtl-mode-switch, #dark-rtl-mode-switch").on("change", function (e) {
        updateThemeSetting(e.target.id);
    });

    // show password input value
    $("#password-addon").on('click', function () {
        if ($(this).siblings('input').length > 0) {
            $(this).siblings('input').attr('type') == "password" ? $(this).siblings('input').attr('type', 'input') : $(this).siblings('input').attr('type', 'password');
        }
    })
}

function updateThemeSetting(id) {
    if ($("#light-mode-switch").prop("checked") == true && id === "light-mode-switch") {
        $("html").removeAttr("dir");
        $("#dark-mode-switch").prop("checked", false);
        $("#rtl-mode-switch").prop("checked", false);
        $("#dark-rtl-mode-switch").prop("checked", false);
        $("#bootstrap-style").attr('href', 'assets/css/bootstrap.min.css');
        $('body').attr('data-layout-mode', 'light');
        $("#app-style").attr('href', 'assets/css/app.min.css');
        sessionStorage.setItem("is_visited", "light-mode-switch");
    } else if ($("#dark-mode-switch").prop("checked") == true && id === "dark-mode-switch") {
        $("html").removeAttr("dir");
        $("#light-mode-switch").prop("checked", false);
        $("#rtl-mode-switch").prop("checked", false);
        $("#dark-rtl-mode-switch").prop("checked", false);
        $('body').attr('data-layout-mode', 'dark');
        sessionStorage.setItem("is_visited", "dark-mode-switch");
    } else if ($("#rtl-mode-switch").prop("checked") == true && id === "rtl-mode-switch") {
        $("#light-mode-switch").prop("checked", false);
        $("#dark-mode-switch").prop("checked", false);
        $("#dark-rtl-mode-switch").prop("checked", false);
        $("#bootstrap-style").attr('href', 'assets/css/bootstrap-rtl.min.css');
        $("#app-style").attr('href', 'assets/css/app-rtl.min.css');
        $("html").attr("dir", 'rtl');
        $('body').attr('data-layout-mode', 'light');
        sessionStorage.setItem("is_visited", "rtl-mode-switch");
    }
    else if ($("#dark-rtl-mode-switch").prop("checked") == true && id === "dark-rtl-mode-switch") {
        $("#light-mode-switch").prop("checked", false);
        $("#rtl-mode-switch").prop("checked", false);
        $("#dark-mode-switch").prop("checked", false);
        $("#bootstrap-style").attr('href', 'assets/css/bootstrap-rtl.min.css');
        $("#app-style").attr('href', 'assets/css/app-rtl.min.css');
        $("html").attr("dir", 'rtl');
        $('body').attr('data-layout-mode', 'dark');
        sessionStorage.setItem("is_visited", "dark-rtl-mode-switch");
    }

}

function initLanguage() {
    // Auto Loader
    if (language != null && language !== default_lang)
        setLanguage(language);
    $('.language').on('click', function (e) {
        setLanguage($(this).attr('data-lang'));
    });
}

function initCheckAll() {
    $('#checkAll').on('change', function () {
        $('.table-check .form-check-input').prop('checked', $(this).prop("checked"));
    });
    $('.table-check .form-check-input').change(function () {
        if ($('.table-check .form-check-input:checked').length == $('.table-check .form-check-input').length) {
            $('#checkAll').prop('checked', true);
        } else {
            $('#checkAll').prop('checked', false);
        }
    });
}

// Modal
const initBootstrap = () => {

    // モーダル内で Livewire によるレンダリングが実行されたときのフリーズ対策（必ずモーダルに id="*****" がセットされている必要がある）
    document.addEventListener('DOMContentLoaded', () => {

        Livewire.hook('message.processed', () => {

            const body = document.body;
            const isModalOpen = body.classList.contains('modal-open'); // モーダルが開いている（べき）かどうか

            if(isModalOpen === true) { // 失われたパラメータを再設定

                const openingModalId = body.getAttribute('bs-opening-modal-id');
                const el = document.getElementById(openingModalId);
                el.style.display = 'block';
                el.classList.add('show');

            }

        });

    });

    const elements = document.querySelectorAll('.modal');

    [].forEach.call(elements, el => {

        el.addEventListener('shown.bs.modal', () => { // 現在開いているモーダル ID を body で保持

            let modalId = el.getAttribute('id');

            if(! modalId) {

                modalId = 'modal-' + Math.random().toString(36).slice(2, 7);
                el.setAttribute('id', modalId);

            }

            document.body.setAttribute(`bs-opening-modal-id`, modalId);

        });
        el.addEventListener('hidden.bs.modal', () => {

            document.body.removeAttribute('bs-opening-modal-id');

        });

    });

    // モーダルの hide() が呼ばれたときに、バックレイヤーが残るのを防ぐ
    class CustomBootstrapModal extends bootstrap.Modal
    {
        hide() {

            super.hide();
            $('div.modal-backdrop').remove();

        }
    }

    window.bootstrap = {
        ...bootstrap,
        Modal: CustomBootstrapModal
    };

};

// Inertia
const setInertiaLocale = (locales) => { // Inertia で翻訳データが使えるようにする。

    // 例： __('validation.required') or trans('validation.required')

    window.__ = window.trans = (key, replacements = {}) => {

        let translatedText = _.get(locales, key, '');

        for(let replacementKey in replacements) {

            const replacement = replacements[replacementKey];
            translatedText = translatedText.replace(`:${replacementKey}`, replacement);

        }

        return translatedText;

    };

}
const setInertiaEnumConstants = (enumValues) => { // Enums/Status/*** で定義したステータスを Inertia で使えるようにする。

    for(let key in enumValues) {

        const enumItem = enumValues[key];
        window[key] = enumItem;

        let collection = [];

        for(let subKey in enumItem) {

            collection.push(enumItem[subKey])

        }

        window[key +'Collection'] = collection; // for Collection

    }

};
const setInertiaColor = () => {

    window.Color = {
        confirmationModalYes: '#34c38f',
        confirmationModalNo: '#f46a6a',
    };

};
const initInertia = () => {

    createInertiaApp({
        title: (title) => `KURAMIE V2 - ${title}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
        setup({ el, App, props, plugin }) {

            setInertiaLocale(props.initialPage.props.locale);
            setInertiaEnumConstants(props.initialPage.props.enum);
            setInertiaColor();

            return createApp({ render: () => h(App, props) })
                .use(plugin)
                //.use(ZiggyVue, Ziggy)
                .mount(el);

        },
        progress: {
            color: '#4B5563',
        },
    });

    window.bootstrap = bootstrap;

};

function init() {
    // from template
    initMetisMenu();
    initLeftMenuCollapse();
    initActiveMenu();
    initMenuItemScroll();
    initHoriMenuActive();
    initFullScreen();
    initRightSidebar();
    initDropdownMenu();
    initComponents();
    initSettings();
    initLanguage();
    initPreloader();
    Waves.init();
    initCheckAll();
    // Custom
    initInertia();

    // if(typeof Livewire !== 'undefined') { // Livewire
    //
    //     initBootstrap();
    //     initPagination();
    //     initValidation();
    //     // initSimpleBar();
    //
    // } else { // Inertia
    //
    //     initInertia();
    //
    // }

}

init();
