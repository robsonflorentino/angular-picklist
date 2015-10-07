/*global angular: false*/
/*global csvExportService: false*/
/*global csvExportController: false*/
/*global csvExportDirective: false*/

if (angular) {

    var pickListModule = angular.module('PickList', ['ngCookies', 'pascalprecht.translate', 'tmh.dynamicLocale']);

    // Configurando o módulo
    pickListModule.config(['$translateProvider', 'tmhDynamicLocaleProvider', function($translateProvider, tmhDynamicLocaleProvider){

        console.debug('[CONFIG: PickList]', 'Configurando a aplicação.');

        console.debug('[CONFIG: PickList]','Configurando tradutores');
        $translateProvider.useStaticFilesLoader({
            prefix: '/src/lang/',
            suffix: '.json'
        });

        console.debug('[CONFIG: PickList]','Configurando l10n.');
        $translateProvider.preferredLanguage('pt-br');
        $translateProvider.fallbackLanguage(['en-us']);
        $translateProvider.useCookieStorage();

        console.debug('[CONFIG: PickList]','Configurando i18n.');
        tmhDynamicLocaleProvider.defaultLocale("pt-br");
        tmhDynamicLocaleProvider.localeLocationPattern('/vendor/angular-i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.useStorage('$cookieStore');
    }]);

    pickListModule.directive('pickList', ['$filter', AngularPickListDirective]);

    // Inicializando o módulo
    pickListModule.run(['$rootScope', function ($rootScope) {
        'use strict';
        console.debug('[RUN: PickList]', 'Inicializando a aplicação.');
    }]);
}
