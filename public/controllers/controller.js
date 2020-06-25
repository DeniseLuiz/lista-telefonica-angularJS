angular.module('Lista').controller('controleGeral', function($scope, $http){
    
    $scope.titulo = 'Lista Telefônica';
    $scope.classe="selecionado";
    $scope.contatos =[];
    $scope.postContato = {};
    $scope.operadoras = [];

    // $scope.contatos =[
    //     {nome: "Pedro", telefone: "999999999"},
    //     {nome: "Tania", telefone: "999999998"},
    //     {nome: "Goret", telefone: "999999997"},
    // ];

    // $scope.operadoras = [
    //     {nome: 'Oi', codigo: 14},
    //     {nome: 'Tim', codigo: 12},
    //     {nome: 'Vivo', codigo: 15},
    // ];

    var carregarContatos = function() {
        $http.get('https://demo9373699.mockable.io/lista-telefonica').then(function(data) {
            $scope.contatos=data.data;
        });
    };
    
    var carregarOperadoras = function (){
        $http.get('http://demo9373699.mockable.io/operadoras').then (function(data){
            $scope.operadoras = data.data; 
        });
    };

    $scope.adicionar = function (postContato){
        $http.post(' http://demo9373699.mockable.io/contatos-adicionados', postContato).then(function(data){
            console.log(data);
        });
        // $scope.contatos.push(contato);
        // delete $scope.contato;
        // $scope.contatoForm.$setPristine();
        console.log(postContato);
    };

    $scope.apagar = function (contatos){
      $scope.contatos = contatos.filter(function (contato){
            if (!contato.selecionado) return contato;
        });
    };

    $scope.isContatoSelecionado = function(contatos){
        return contatos.some (function(contato){
            return contato.selecionado;
        });
    };
        
    $scope.ordenarPor = function(campo){
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;

    };
    
    carregarContatos();
    carregarOperadoras();
});
