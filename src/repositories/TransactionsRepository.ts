import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, currentval) => {
      if (currentval.type === 'income') {
        const currIncome = total + currentval.value;
        return currIncome;
      }
      return total;
    }, 0);
    const outcome = this.transactions.reduce((total, currentval) => {
      if (currentval.type === 'outcome') {
        const currOutcome = total + currentval.value;
        return currOutcome;
      }
      return total;
    }, 0);
    const total = income - outcome;
    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
