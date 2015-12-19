
function ready(error, data) {

    if (error) {
		console.error(error);
		throw error;
	}
	data.transactions.forEach(function(trans) {
        trans.account = data.accounts.find(function (e) {return (e.entityId == trans.accountId);});
        if (trans.account == undefined)
            trans.account = {name: "unknown"};
        trans.client = data.payees.find(function (e) { return (e.entityId == trans.payeeId);});
        if (trans.client == undefined)
            trans.client = {accountName: "unknown"};
        
        trans.month = d3.time.month(new Date(trans.date));
	});
    
    console.log(data.transactions);
    
    data.income = data.transactions.filter(function(trans) {
        var isValid;
        isValid = 
            (trans.amount > 0)  &&
            (trans.isTombstone === undefined || trans.isTombstone != true)
        ;
        console.log(trans.amount , trans.isTombstone, isValid)
        return isValid;    
    
    } );
    

//    colors = ["#E68000", "#d4511a"];
//    scale.color = d3.scale.linear().domain([0, lookup.cities.size]).range(colors);
//    //scale.city = d3.scale.linear().domain(buyersExtent).range([0, 5000]);
//    scale.city = d3.scale.linear().domain([0, lookup.cities.size]).range([0, 300]);
//
//    scale.opacity = d3.scale.linear().domain([0, 20]).range([0.5, 0.08]);
//    scale.radius = d3.scale.pow().exponent(2).domain([0, 20]).range([1, 50]);
 
    // Filters
    var filter = crossfilter(data.income);
    all = filter.groupAll();
    dimenssions.months = filter.dimension(function (d) { return d.month; });
    //dimenssions.transactions = filter.dimension(function (d) { return d.amount; });
    dimenssions.clients = filter.dimension(function (d) { return d.client.name; });
    dimenssions.accounts = filter.dimension(function(d){return d.account.accountName;});
    
    groups.income = dimenssions.months.group().reduceSum(function (d) { return d.amount; });
    groups.clients = dimenssions.clients.group();//.reduceSum(function (d) { return d.buyers; });
    groups.accounts = dimenssions.accounts.group(),

    transactions = groups.income.all();
    console.log("trasactions groups: ", transactions);

//    moneyExtent = d3.extent(winners, function(d) {return d.PrizeValue;});
//    winnersExtent = [0,2500];
//    console.log(winnersExtent);
    //scale.money = d3.scale.ordinal().domain(prizes.map(function(d) {return d.key;}))//.range([100, 50000,100000, 150000, 250000])
    //scale.money = d3.scale.ordinal().domain([50000, d3.max(winners, function(d) {return d.PrizeValue;})])//.range([50000, 250000])
    //scale.winners = d3.scale.pow().exponent(0.8).domain(winnersExtent);
    //scale.winners = d3.scale.linear().domain(winnersExtent);
   
    createFilters();
}



function createFilters() {
    transactionTable();
    transactionFilter();
    clientFilter();
    accountFilter();
    
    function renderAll() {
        dc.renderAll();
    } 

    window.reset = function (i) {
        renderAll();
    }
    
    d3.selectAll(".reset").on("click", function() {
        dc.filterAll();
        dc.renderAll();
    });

    renderAll();
}

// load data
$(document).ready(function() {
    ready(null, ynab);
});