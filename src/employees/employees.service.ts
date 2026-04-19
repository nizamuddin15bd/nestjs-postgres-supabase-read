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

  //   Delete an employee
  async delete(id: number): Promise<{ message: string }> {
    const result = await this.employeesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return { message: `Employee with ID ${id} has been successfully deleted!` };
  }

  //   Query employees by department
  async search(filters: {
    name?: string;
    department?: string;
  }): Promise<Employees[]> {
    const query = this.employeesRepository.createQueryBuilder('employees');

    if (filters.name) {
      query.andWhere('employees.name ILIKE :name', {
        name: `%${filters.name}%`, // nizam, nizamuddin, nizamuddin ahmed
      });
    }
    if (filters.department) {
      query.andWhere('employees.department = :dept', {
        dept: filters.department,
      });
    }
    return query.getMany();
  }
}
