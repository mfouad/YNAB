
var dimenssions = {};
var groups = {};
var charts = {};
var scale = {};


function transactionFilter() {
    charts.transactions = dc.barChart("#chart-transactions");
    charts.transactions
        .height(500)
        .dimension(dimenssions.months)
        .group(groups.income)
        .elasticY(true)
        .x(d3.time.scale().domain([new Date(2015, 1, 1), new Date(2016, 1, 1)]))
        .round(d3.time.month.round)
        .xUnits(d3.time.months)
        .title(function (d) {
            return d.value + " $"
        })
        .xAxisLabel('time')
        .yAxisLabel('Ammount $')
}


function transactionTable() {
    charts.transactionsTable = dc.dataTable("#table-transactions");
    
    charts.transactionsTable
        .dimension(dimenssions.months)
        .group(function (d) {
            var format = d3.format('02d');
            return d.month;
        })
        .columns([
            'date',
            {
                label: 'Account', format: function (d) {
                    return d.account.accountName;
                }
            },
            {
                label: 'Client', format: function (d) {
                    return d.client.name;
                }
            },
            'memo',
            'amount',
        ])
        .sortBy(function (d) {
            return d.dd;
        })
        .order(d3.ascending)
        .on('renderlet', function (table) {
            table.selectAll('.dc-table-group').classed('info', true);
        });

}

function clientFilter() {
    charts.clients = dc.pieChart("#chart-clients");
    
    charts.clients
//        .slicesCap(4)
//        .innerRadius(100)
//        .externalLabels(50)
//        .externalRadiusPadding(50)
//        .drawPaths(true)
        .dimension(dimenssions.clients)
        .group(groups.clients)
//        .legend(dc.legend());
}

function accountFilter() {
    charts.accounts = dc.pieChart("#chart-accounts");
    
    charts.accounts
//        .slicesCap(4)
//        .innerRadius(100)
//        .externalLabels(50)
//        .externalRadiusPadding(50)
//        .drawPaths(true)
        .dimension(dimenssions.accounts)
        .group(groups.accounts)
//        .legend(dc.legend());
}

