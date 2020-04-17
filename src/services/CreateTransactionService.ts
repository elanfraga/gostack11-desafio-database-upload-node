import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const createCategory = new CreateCategoryService();

    if (type === 'outcome') {
      const transactions = await transactionsRepository.find();

      const balance = transactionsRepository.getBalance(transactions);

      if (value > (await balance).total) {
        throw new AppError('Outcome does not available.');
      }
    }

    const findCategory = await createCategory.execute({ title: category });

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: findCategory.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
