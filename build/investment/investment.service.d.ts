import { Repository } from 'typeorm';
import { HtsService } from '../hts/hts.service';
import { MusicService } from '../music/music.service';
import { TokenService } from '../token/token.service';
import { User } from '../user/entities/user.entity';
import { CreateInvestmentInput, CreateInvestmentOutput } from './dtos/create-investment.dto';
import { Investment } from './entities/investment.entity';
export declare class InvestmentService {
    private readonly investmentRepository;
    private readonly musicService;
    private readonly tokenService;
    private readonly htsService;
    constructor(investmentRepository: Repository<Investment>, musicService: MusicService, tokenService: TokenService, htsService: HtsService);
    createInvestment(user: User, createInvestmentInput: CreateInvestmentInput): Promise<CreateInvestmentOutput>;
    checkInvestment(): Promise<void>;
}
