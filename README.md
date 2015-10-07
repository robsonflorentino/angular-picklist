# angular-picklist
Biblioteca angular para exibir um componente multiselect.

## instalação
Execute a instalação das dependências utilizando o bower:

```
bower install angular-picklist
```

Adicione a biblioteca na sua aplicação:
```
    html
        ...
        <script src="bower_components/angular-picklist/dist/angular-picklist.min.js"></script>
        ...
```

Adicione o módulo 'CsvExportModule' na sua aplicação:
```javascript
    ...
        angular
            .module('myApp', [
                ...
                'PickList',
                ...
            ])
    ...
```

Adicione a diretiva **pick-list** como um elemento ou um atributo com a seguinte opção:
```
    html
        ...
        <pick-list ng-model="productList" source="products" group="Teste"></pick-list>
        ...
```
- **source**

    A lista de objetos que devera popular o combobox.
    
- **group**
    
    O grupo de identificação desta lista.
    
    