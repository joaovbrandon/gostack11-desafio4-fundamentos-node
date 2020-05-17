import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
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
    return this.transactions.reduce(
      ({ income, outcome, total }: Balance, { type, value }: Transaction) => ({
        income: type === 'income' ? income + value : income,
        outcome: type === 'outcome' ? outcome + value : outcome,
        total: type === 'income' ? total + value : total - value,
      }),
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
