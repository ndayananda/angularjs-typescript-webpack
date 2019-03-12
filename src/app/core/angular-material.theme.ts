/**
 * Configuring of the default theme is done by using the $mdThemingProvider during application configuration.
 *
 * @param {angular.material.IThemingProvider} $mdThemingProvider
 *
 * @return void
 */

export const customThemeConfig = ($mdThemingProvider: angular.material.IThemingProvider): void => {
    'ngInject';
 
     $mdThemingProvider.definePalette('appGreyThemePalette', getGreyThemePalette());
     $mdThemingProvider.definePalette('appBlueThemePalette', getBlueThemePalette());
 
     $mdThemingProvider.theme('default')
         .primaryPalette('appBlueThemePalette')
         .accentPalette('appBlueThemePalette');
 };
 
 const commonPaletteConfig = {
     'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
     // on this palette should be dark or light
 
     'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400'],
     'contrastLightColors': undefined    // could also specify this if default was 'dark'
 };
 
 const getGreyThemePalette = () => {
     var palette = {
         '50': 'f2f2f2',
         '100': 'e6e6e6',
         '200': 'cccccc',
         '300': 'b3b3b3',
         '400': '999999',
         '500': '808080',
         '600': '666666',
         '700': '4d4d4d',
         '800': '333333',
         '900': '1a1a1a',
         'A100': '9E9E9E',
         'A200': '757575',
         'A400': '616161',
         'A700': '424242'
     }
 
     palette = Object.assign({}, palette, commonPaletteConfig);
 
     return palette;
 };
 
 const getBlueThemePalette = () => {
     var palette = {
         '50': '76c3f6',
         '100': '5eb8f5',
         '200': '2ea3f2',
         '300': '0e8bdf',
         '400': '0b6daf',
         '500': '095e97',
         '600': '084f7f',
         '700': '064067',
         '800': '05314f',
         '900': '032237',
         'A100': '0b6daf',
         'A200': '066eb4',
         'A400': '026fb8',
         'A700': '2962FF',
     }
 
     palette = Object.assign({}, palette, commonPaletteConfig);
 
     return palette;
 };