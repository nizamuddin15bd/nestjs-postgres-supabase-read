import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
  //   search employees by department
  @Get('search')
  async searchEmployees(
    @Query('name') name?: string,
    @Query('department') department?: string,
  ): Promise<Employees[]> {
    return this.employeeService.search({ name, department });
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employees> {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  async updatedEmployee(
    @Param('id') id: number,
    @Body() body: Partial<Employees>,
  ): Promise<Employees> {
    return this.employeeService.update(id, body);
  }

  @Delete(':id')
  async deletedEmployee(@Param('id') id: number): Promise<{ message: string }> {
    return this.employeeService.delete(id);
  }
}
