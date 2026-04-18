import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employees } from './employees.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() body: Partial<Employees>): Promise<Employees> {
    return this.employeeService.create(body);
  }

  @Get()
  async findAll(): Promise<Employees[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employees> {
    return this.employeeService.findOne(id);
  }
}
