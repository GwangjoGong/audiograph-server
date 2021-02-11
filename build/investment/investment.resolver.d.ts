import { User } from '../user/entities/user.entity';
import { CreateInvestmentInput, CreateInvestmentOutput } from './dtos/create-investment.dto';
import { Investment } from './entities/investment.entity';
import { InvestmentService } from './investment.service';
export declare class InvestmentResolver {
    private readonly investmentService;
    constructor(investmentService: InvestmentService);
    createInvestment(user: User, createInvestmentInput: CreateInvestmentInput): Promise<CreateInvestmentOutput>;
    getMyInvestments(user: User): Investment[];
    checkInvestments(): void;
}
