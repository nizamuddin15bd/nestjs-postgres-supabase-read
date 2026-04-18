import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
  ) {}

  //Create a new employee
  async create(employeeData: Partial<Employees>): Promise<Employees> {
    const employee = this.employeesRepository.create(employeeData);
    return this.employeesRepository.save(employee);
  }

  //Get all employees
  async findAll(): Promise<Employees[]> {
    return this.employeesRepository.find();
  }

  //Get an employee by ID
  async findOne(id: number): Promise<Employees> {
    const employee = await this.employeesRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  //   Update an employee
  async update(
    id: number,
    updatedData: Partial<Employees>,
  ): Promise<Employees> {
    const employee = await this.employeesRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    const updated = Object.assign(employee, updatedData);
    return this.employeesRepository.save(updated);
  }
}
