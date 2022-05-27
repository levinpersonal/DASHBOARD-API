import express, { Express } from "express";
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/user.controller';
import { ExceptionFilter } from './errors/exeption.filter';


export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userController: UserController;
    exceptionFilter: ExceptionFilter;

    constructor(
        logger: LoggerService,
        userController: UserController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExeptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExeptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started on localHost: ${this.port}`);
    }
}