/*global angular: false*/
/*global console: false*/
/*global $filter: false*/
var AngularPickListDirective = function ($filter) {
    'use strict';
    return {
        restrict: 'EA',
        replace: true,
        require: 'ngModel',
        scope : {
            source : '=',
            group : '@'
        },
        templateUrl: function (element, attr) {
            return (attr.templateUrl || '../dist/templates/angular-picklist.template.html');
        },
        link : function ($scope, $element, $attrs, ngModel) {

            // Finaliza a execuçao caso não exista sorce definido.
            if (!$scope.source) {
                return;
            }


            // Disponibilize um método de comparação
            function unique(arr, compareFunc) {
                var i;
                arr.sort(compareFunc);
                for (i = 1; i < arr.length; null) {
                    if (compareFunc(arr[i - 1], arr[i]) === true) {
                        arr.splice(i, 1);
                    } else {
                        i = i + 1;
                    }
                }
                return arr;
            }

            function reorder(arrayList) {
                var newArr = unique(arrayList, function (a, b) {
                    return a.id === b.id;
                });
                return $filter('orderBy')(newArr, "value");
            }

            function moverTodosItems(origem, destino) {
                var countOpt, countSel, idx, idx2, n;
                if (origem) {
                    countOpt = origem.length;

                    for (n = 0; n < countOpt; n = n + 1) {
                        destino.push(origem.pop(n));
                    }

                    destino = reorder(destino);
                }
            }

            function moverItems(selecionados, origem, destino) {
                if (selecionados) {
                    var countOpt = origem.length, countSel = selecionados.length, i, n;
                    for (i = 0; i < countSel; i = i + 1) {
                        for (n = 0; n < countOpt; n = n + 1) {
                            if (parseInt(selecionados[i], 10) === origem[n].id) {
                                destino.push(origem.splice(n, 1)[0]);
                                break;
                            }
                        }
                    }
                    destino = reorder(destino);
                }
            }

            function doRender(obj) {
                if (obj !== undefined) {
                    var countOpt = $scope.availableList[$scope.group].length, countSel = obj.length, i, n;
                    for (i = 0; i < countSel; i = i + 1) {
                        for (n = 0; n < countOpt; n = n + 1) {
                            if (parseInt(obj[i], 10) === $scope.availableList[$scope.group][n].id) {
                                $scope.selectedList[$scope.group].push($scope.availableList[$scope.group].splice(n, 1)[0]);
                                break;
                            }
                        }
                    }

                    $scope.selectedList[$scope.group] = reorder($scope.selectedList[$scope.group]);
                }
            }

            function doRead() {
                var item, values = [];
                for (item in $scope.selectedList[$scope.group]) {
                    if ($scope.selectedList[$scope.group].hasOwnProperty(item)) {
                        values.push($scope.selectedList[$scope.group][item].id);
                    }
                }
                ngModel.$setViewValue(values);
                $scope.$digest();
            }

            // Inicializando as listas.
            $scope.availableList = [];
            $scope.selectedList = [];
            $scope.toAdd = [];
            $scope.toRemove = [];
            $scope.toAdd[$scope.group] = [];
            $scope.toRemove[$scope.group] = [];

            // Preenchendo listas.
            $scope.availableList[$scope.group] = angular.copy($scope.source);
            $scope.selectedList[$scope.group] = [];

            // Observadores
            $scope.$watch('source', function (newValue, oldValue) {
                if (newValue) {
                    $scope.availableList[$scope.group] = angular.copy($scope.source);
                }
            }, true);

            $scope.$watch(function (newValue, oldValue) {
                if (ngModel.$viewValue !== undefined) {
                    doRender(ngModel.$viewValue);
                }
            }, true);

            // Ações

            $element.find('#btn-add-all').click(function () {
                moverTodosItems($scope.availableList[$scope.group], $scope.selectedList[$scope.group]);
                doRead();
            });

            $element.find('#btn-remove-all').click(function () {
                moverTodosItems($scope.selectedList[$scope.group], $scope.availableList[$scope.group]);
                doRead();
            });

            $element.find('#btn-add').click(function () {
                if ($scope.toAdd[$scope.group].length > 0) {
                    moverItems($scope.toAdd[$scope.group], $scope.availableList[$scope.group], $scope.selectedList[$scope.group]);
                    doRead();
                }

            });

            $element.find('#btn-remove').click(function () {
                if ($scope.toRemove[$scope.group].length > 0) {
                    moverItems($scope.toRemove[$scope.group], $scope.selectedList[$scope.group], $scope.availableList[$scope.group]);
                    doRead();
                }
            });

            // Setando um valor na tela recebido do model
            ngModel.$render = function () {
                doRender(ngModel.$viewValue);
            };
        }
    };
};
