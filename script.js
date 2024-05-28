class RoznameEntry {
    constructor(date, description, debitAccount, creditAccount, debitAmount, creditAmount) {
        this.date = date;
        this.description = description;
        this.debitAccount = debitAccount;
        this.creditAccount = creditAccount;
        this.debitAmount = debitAmount;
        this.creditAmount = creditAmount;
    }
}

class RoznameJournal {
    constructor() {
        this.entries = [];
    }

    addEntry(entry) {
        this.entries.push(entry);
        this.displayJournal();
    }

    displayJournal() {
        const tbody = document.getElementById('journalBody');
        tbody.innerHTML = '';
        let totalDebit = 0;
        let totalCredit = 0;
        this.entries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.description}</td>
                <td>${entry.debitAccount}</td>
                <td>${entry.creditAccount}</td>
                <td>${entry.debitAmount}</td>
                <td>${entry.creditAmount}</td>
            `;
            tbody.appendChild(row);
            totalDebit += entry.debitAmount;
            totalCredit += entry.creditAmount;
        });
        document.getElementById('totalDebit').innerText = totalDebit;
        document.getElementById('totalCredit').innerText = totalCredit;
    }
}

function determineAccountType(accountName) {
    const debitAccounts = ['نقد', 'بانک', 'حسابهای دریافتنی', 'موجودی مواد و کالا'];
    const creditAccounts = ['حسابهای پرداختنی', 'وام', 'درآمد', 'سرمایه'];

    if (debitAccounts.includes(accountName)) {
        return 'بدهکار';
    } else if (creditAccounts.includes(accountName)) {
        return 'بستانکار';
    } else {
        alert('نام حساب نامعتبر است.');
        return null;
    }
}

function addEntry() {
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const accountName = document.getElementById('accountName').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    const accountType = determineAccountType(accountName);
    if (!accountType) return;

    const debitAccount = accountType === 'بدهکار' ? accountName : '';
    const creditAccount = accountType === 'بدهکار' ? '' : accountName;
    const entry = new RoznameEntry(date, description, debitAccount, creditAccount, accountType === 'بدهکار' ? amount : 0, accountType === 'بستانکار' ? amount : 0);
    journal.addEntry(entry);
}

const journal = new RoznameJournal();
