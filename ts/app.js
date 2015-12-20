/// <reference path="../typings/tsd.d.ts" />
define(["require", "exports", './backbone/views/app_view'], function (require, exports, app_view) {
    $(function () {
        new app_view.AppView();
    });
});
