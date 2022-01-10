let ExpenseController = (() => {
    let total = 0, savings = 0, expenses = 0, investments = 0;

    return {
        inputEntry(userInput) {
            if (userInput['expenseType'] === 'savings') {
                savings += userInput['value'];
                total += userInput['value'];
            }
            if (userInput['expenseType'] === 'investment') {
                investments += userInput['value'];
                total -= userInput['value'];
            }
            if (userInput['expenseType'] === 'expense') {
                expenses += userInput['value'];
                total -= userInput['value'];
            }
        },

        getSavingsData() {
            return savings;
        },

        getExpensesData() {
            return expenses;
        },

        getInvestmentData() {
            return investments;
        },

        getTotalData() {
            return total;
        }
    }

})();

let UIController = (() => {
    let expenseType = 'savings';

    let HTMLStrings = {
        inExpenseDescription: '.input-expense-description',
        inExpenseValue: '.input-expense-value',
        twdSubmitExpense: '.twd-submit-expense',
        expenseList: '.expense-list',
        currentMonth: '#current-month',
        typeExpense: '#type-expense',
        typeSavings: '#type-savings',
        typeInvestment: '#type-investment',
        trackingText: '.tracking-text',
        expenseChart: '#expense-chart',
        monthBudget: '#month-budget'
    };

    return {
        numberFormat(number) {
            return Intl.NumberFormat('en-IN').format(number);
        },
        showCurrentMonth() {
            let now, month, year, months, date;

            now = new Date();
            month = now.getMonth();
            year = now.getFullYear();
            date = now.getDate();
            months = [
                '1 月', '2 月', '3 月', '4 月', '5 月', '6 月', ' 7月', ' 8月', ' 9月', ' 10月',
                '11 月', '12 月'
            ];
            document.querySelector(HTMLStrings.currentMonth).textContent = year + " " +"年" + " " + months[month]+ " " + date+ " " +"日";
        },

        getHTMLStrings() {
            return HTMLStrings;
        },

        setExpenseType(type) {
            console.log('here', type);
            this.expenseType = type;
            let emoji ="💰";
            if (type === 'savings') {
                itemName = "存款";
                emoji ="💰";
                if (document.querySelector(HTMLStrings.twdSubmitExpense).classList.contains('btn-warning')) {
                    document.querySelector(HTMLStrings.twdSubmitExpense).classList.remove('btn-warning');
                }
                if (document.querySelector(HTMLStrings.twdSubmitExpense).classList.contains('btn-danger')) {
                    document.querySelector(HTMLStrings.twdSubmitExpense).classList.remove('btn-danger');
                }
                if (!document.querySelector(HTMLStrings.twdSubmitExpense).classList.contains('btn-success')) {
                    document.querySelector(HTMLStrings.twdSubmitExpense).classList.add('btn-success');
                }
            }

            if (type === 'expense') {
                itemName = "開支";
                emoji = "🧾";
                if (document.querySelector(HTMLStrings.twdSubmitExpense).classList.contains('btn-warning')) {
                    document.querySelector(HTMLStrings.twdSubmitExpense).classList.remove('btn-warning');
                }
                if (document.querySelector(HTMLStrings.twdSubmitExpense).classList.contains('btn-success')) {
                    document.querySelector(HTMLStrings.twdSubmitExpense).classList.remove('btn-success');
                }
                if (!document.querySelector(HTMLStrings.twdSubmitExpense).classList.contains('btn-danger')) {
                    document.querySelector(HTMLStrings.twdSubmitExpense).classList.add('btn-danger');
                }
            }
            if (type === 'investment') {
                itemName = "投資";
                emoji = "🏠";
                if (document.querySelector(HTMLStrings.twdSubmitExpense).classList.contains('btn-danger')) {
                    document.querySelector(HTMLStrings.twdSubmitExpense).classList.remove('btn-danger');
                }
                if (document.querySelector(HTMLStrings.twdSubmitExpense).classList.contains('btn-success')) {
                    document.querySelector(HTMLStrings.twdSubmitExpense).classList.remove('btn-success');
                }
                if (!document.querySelector(HTMLStrings.twdSubmitExpense).classList.contains('btn-warning')) {
                    document.querySelector(HTMLStrings.twdSubmitExpense).classList.add('btn-warning');
                }
            }

            document.querySelector(HTMLStrings.trackingText).textContent = "您的" + itemName + " " + emoji;

        },

        getUserExpenseInput() {
            return {
                description: document.querySelector(HTMLStrings.inExpenseDescription).value,
                value: parseInt(document.querySelector(HTMLStrings.inExpenseValue).value),
                date: new Date().toLocaleDateString(),
                expenseType: this.expenseType ? this.expenseType : 'savings'
            }
        },

        addListItem (inputObj) {
            let html, element;
            element = HTMLStrings.expenseList;

            if (inputObj['expenseType'] === 'savings') {
                html = '<div class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-8 expense-text fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-saving fs-15"> NT$ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
            } else if (inputObj['expenseType'] === 'expense') {
                html = '<div class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-8 expense-text fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-cost fs-15"> NT$ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
            } else if (inputObj['expenseType'] === 'investment') {
                html = '<div class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-8 expense-text fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-investment fs-15"> NT$ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
            }

            
            document.querySelector(element).insertAdjacentHTML('beforeend', html);

            
            document.querySelector(HTMLStrings.inExpenseValue).value = "";
            document.querySelector(HTMLStrings.inExpenseDescription).value = "";
        },

        updateOverallTotal(totalValue) {
            document.querySelector(HTMLStrings.monthBudget).textContent  = "NT$ " + this.numberFormat(totalValue);

            if (totalValue > 0) {
                if (document.querySelector(HTMLStrings.monthBudget).classList.contains('expense-cost')) {
                    document.querySelector(HTMLStrings.monthBudget).classList.remove('expense-cost');
                }
                document.querySelector(HTMLStrings.monthBudget).classList.add('expense-saving');
            } else {
                if (document.querySelector(HTMLStrings.monthBudget).classList.contains('expense-saving')) {
                    document.querySelector(HTMLStrings.monthBudget).classList.remove('expense-saving');
                }
                document.querySelector(HTMLStrings.monthBudget).classList.add('expense-cost');
            }
        },

        displayChart(savings = 0, expenses = 0, investments = 0) {
            let ctx = document.querySelector(HTMLStrings.expenseChart);
            let expenseChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['存款', '開支', '投資'],
                    datasets: [{
                        data: [savings, expenses, investments],
                        backgroundColor: [
                            'rgba(32, 137, 56, 1)',
                            'rgba(255, 84, 98, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 0.5
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'white'
                        }
                    }
                }
            });
        }
    }
})();

((UIController, ExpenseController) => {

    let HTMLStrings = UIController.getHTMLStrings();
    let setupEventListeners = () => {
        document.querySelector(HTMLStrings.twdSubmitExpense).addEventListener('click', addExpense);
        document.querySelector(HTMLStrings.typeExpense).addEventListener('click', () => {
            setExpenseType('expense')
        });
        document.querySelector(HTMLStrings.typeInvestment).addEventListener('click', () => {
            setExpenseType('investment')
        });
        document.querySelector(HTMLStrings.typeSavings).addEventListener('click', () => {
            setExpenseType('savings')
        });
    };

    let setExpenseType = (type) => {
        UIController.setExpenseType(type);
    }

    let addExpense = () => {
        let input = UIController.getUserExpenseInput();
        console.log(input);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            console.log('Adding item');
            UIController.addListItem(input);
            ExpenseController.inputEntry(input);
            UIController.updateOverallTotal(ExpenseController.getTotalData());
            UIController.displayChart(ExpenseController.getSavingsData(), ExpenseController.getExpensesData(),
                ExpenseController.getInvestmentData());
        }
    }

    let init = () => {
        console.log('Initializing...');
        setupEventListeners();
        UIController.showCurrentMonth();
    }

    init();

})(UIController, ExpenseController);
