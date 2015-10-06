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
        <script src="bower_components/angular-csv-export/dist/csv-export.min.js"></script>
        ...
```

Adicione o módulo 'CsvExportModule' na sua aplicação:
```javascript
    ...
        angular
            .module('myApp', [
                ...
                'CsvExportModule',
                ...
            ])
    ...
```

Adicione a diretiva **csv-export-directive** como um elemento ou um atributo com a seguinte opção:
```
    html
        ...
        <csv-export-directive source="products"></csv-export-directive>
        ...
```
- **source**

    A lista de objetos que deverão ser exportados como arquivo '.csv'.
    
    