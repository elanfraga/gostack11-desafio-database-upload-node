import { getCustomRepository } from 'typeorm';
import TransationRepository from '../repositories/TransactionsRepository';
// import AppError from '../error
class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransationRepository);

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
